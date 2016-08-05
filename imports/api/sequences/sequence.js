import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';


export const Sequence = new Mongo.Collection('sequence');

Sequence.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Sequence.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

Sequence.Schema = new SimpleSchema({
	 _id:{
     type:String,
     label: "the name of document that will use increment value"
   },
   seq:{
     type:Number,
     label: "the value of the Sequence"
   }
});

Sequence.attachSchema(Sequence.Schema);
