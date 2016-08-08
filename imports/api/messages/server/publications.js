import { Meteor } from 'meteor/meteor';
import { Messages } from '../messages.js';
import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';

Meteor.publishComposite('messages', function(limit){

	check(limit, Number);

		if(!limit)
			limit = 20;
	return {
    find: function(){
      return Messages.find({
        $or:[
          { sender: this.userId },
          { receiver: this.userId }
        ]
      },
			{sort:{ order: -1 }, limit: limit });
    },
    children:[
        {
	          find: function(message){
							if(message.sender === this.userId)
	            	return Meteor.users.find({ _id: message.receiver });

							if(message.receiver === this.userId)
								return Meteor.users.find({ _id: message.sender });
	        }
				},

    ]
  }
});

// les messages que j'ai recu regroupé par l'envoyeur
Meteor.publish('countReceivedMessagesByUser', function(){
	var subscription = this;
	var initiated = false;
	var userId = this.userId;
	var users = {};
	var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
	var pipeline = [{
		$match:{
			receiver:userId
		}
	},{
		$group: {
			_id: "$sender",
			count:{$sum:1}
		}
	}, {
		$sort: {
			"count": -1
		}
	}] ;
	db.collection('messages').aggregate(
		pipeline,
		Meteor.bindEnvironment(
			function(err, result){
				console.log('result countReceivedMessagesByUser', result);
				_.each(result, function(r){
					users[r._id] = r.count;
					subscription.added('countReceivedMessagesByUser', r._id, {
						count: r.count,
						user: Meteor.users.findOne({_id: r._id}, { fields: { profile: 1 } }),
						sender: Meteor.users.findOne({_id: r._id}, { fields: { profile: 1 } }),
						receiver: Meteor.users.findOne({_id: userId}, { fields: { profile: 1 } }),
						total: Messages.find({sender: r._id, read: false}).count()
					});// added subscription
				}); // _.each
			}// bindEnvironment function
		)// bindEnvironment
	)// aggregate

	var messageHandle = Messages.find({
		receiver: userId
	}).observeChanges({
		added: function(id, fields){
			if(!initiated) return ;
			console.log("users from countReceivedMessagesByUser",users);

			if(_.isEmpty(users) || _.isUndefined(users[fields.sender])){
				users[fields.sender] = 1;
				lastMessage = fields.content;
				subscription.added('countReceivedMessagesByUser', fields.sender, {
					count: users[fields.sender],
					user: Meteor.users.findOne({_id: fields.sender}, { fields: { profile: 1 } }),
					sender : Meteor.users.findOne({_id: fields.sender}, { fields: { profile: 1 } }),
					receiver: Meteor.users.findOne({_id: userId}, { fields: { profile: 1 } }),
					//lastMessage: fields.content,
					total: Messages.find({sender: fields.sender, read: false}).count()
				})
			}else{
				lastMessage = fields.content;
				users[fields.sender] += 1;
				subscription.changed('countReceivedMessagesByUser', fields.sender, {
					count: users[fields.sender],
					user: Meteor.users.findOne({_id: fields.sender}, { fields: { profile: 1 } }),
					sender : Meteor.users.findOne({_id: fields.sender}, { fields: { profile: 1 } }),
					receiver: Meteor.users.findOne({_id: userId}, { fields: { profile: 1 } }),
				//	lastMessage: fields.content,
					total: Messages.find({sender: fields.sender, read: false}).count()
				});
			}
		}, // added
		changed: function(id, fields){
			if(!initiated) return ;
			var message = Messages.findOne({ _id: id });
			subscription.changed('countReceivedMessagesByUser', message.sender, {
				count: users[message.sender],
				user: Meteor.users.findOne({_id: message.sender}, { fields: { profile: 1 } }),
				sender : Meteor.users.findOne({_id: message.sender}, { fields: { profile: 1 } }),
				receiver: Meteor.users.findOne({_id: message.receiver}, { fields: { profile: 1 } }),
				total: Messages.find({sender: message.sender, read: false}).count()
			})
		}
	});
	initiated = true;
	subscription.onStop(function(){
		messageHandle.stop();
	});

	subscription.ready();
});

// les mesages que j'ai envoyé regroupé par le récepteur
Meteor.publish('countSendedMessagesByUser', function(){
	var subscription = this;
	var initiated = false;
	var userId = this.userId;
	var users = {};
	var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
	var pipeline = [{
		$match:{
			sender:userId
		}
	},{
		$group: {
			_id: "$receiver",
			count:{$sum:1}
		}
	}, {
		$sort: {
			"count": -1
		}
	}] ;
	db.collection('messages').aggregate(
		pipeline,
		Meteor.bindEnvironment(
			function(err, result){
				console.log('result countSendedMessagesByUser', result);
				_.each(result, function(r){
					users[r._id] = r.count;
					subscription.added('countSendedMessagesByUser', r._id, {
						count: r.count,
						user: Meteor.users.findOne({_id: r._id}, { fields: { profile: 1 } }),
						sender: Meteor.users.findOne({_id: userId}, { fields: { profile: 1 } }),
						receiver: Meteor.users.findOne({_id: r._id}, { fields: { profile: 1 } }),
						total: Messages.find({sender: userId, read: false}).count()
					})
				})
			}
		)
	)

	var messageHandle = Messages.find({
		sender: userId
	}).observeChanges({
		added: function(id, fields){
			if(!initiated) return ;
				console.log('users', users);
				console.log('fields', fields);
			lastMessage = fields.content;
			if(_.isEmpty(users) || _.isUndefined(users[fields.receiver])){

				users[fields.receiver] = 1;
				subscription.added('countSendedMessagesByUser', fields.receiver, {
					count: users[fields.receiver],
					user: Meteor.users.findOne({_id: fields.receiver}, { fields: { profile: 1 } }),
					sender: Meteor.users.findOne({_id: userId}, { fields: { profile: 1 } }),
					receiver: Meteor.users.findOne({_id: fields.receiver}, { fields: { profile: 1 } }),
					//lastMessage: fields.content,
					total: Messages.find({sender: userId, read: false}).count()

				})
			}else{
				users[fields.receiver] += 1;
				subscription.changed('countSendedMessagesByUser', fields.receiver, {
					count: users[fields.receiver],
					user: Meteor.users.findOne({_id: fields.receiver}, { fields: { profile: 1 } }),
					sender: Meteor.users.findOne({_id: userId}, { fields: { profile: 1 } }),
					receiver: Meteor.users.findOne({_id: fields.receiver}, { fields: { profile: 1 } }),
				//	lastMessage: fields.content,
					total: Messages.find({sender: userId, read: false}).count()
				});
			}
		}
	});
	initiated = true;
	subscription.onStop(function(){
		messageHandle.stop();
	});

	subscription.ready();
});
