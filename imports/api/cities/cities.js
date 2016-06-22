import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


export const Cities = new Mongo.Collection('cities');

Cities.schema = new SimpleSchema({
	
	name:{
		type: String,
		label: "The title of the annonce"
	}
});

Cities.attachSchema(Cities.schema);
