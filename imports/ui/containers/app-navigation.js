import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';
import { ConversationMessages } from '../../api/messagerie/conversation-messages/conversation-messages';
import { setNotificationSoundOff } from '../../api/messagerie/conversation-messages/methods';

const composer = (props, onData) => {
  const sub = Meteor.subscribe("newMessage");
  console.log("sub from app navigationready", sub.ready());
  if(sub.ready()){
    let message = ConversationMessages.find({"to.userId": Meteor.userId(), "to.read": false , notificationSound: true}, { sort:{ order: -1 } , limit: 1}).fetch();

    if( message && message.length > 0){
      var playSound = (function beep() {
      var sound = new Audio("https://s3.eu-central-1.amazonaws.com/annoncio-photos/knob.ogg");
      		return function() {
      				sound.play();
      			}
      			})();
      	playSound(); // Play first time
        console.log("message from app navigation container", message[0]._id);
        setNotificationSoundOff.call({conversationMessagesId: message[0]._id});
    }

  }

  onData(null, { hasUser: Meteor.user() });

};

export default composeWithTracker(composer, {}, {}, { pure: false })(AppNavigation);
