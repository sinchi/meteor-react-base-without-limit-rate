import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';
import { insertAnnonce } from '../api/annonces/methods.js';


let component;

_getFileFromInput = (component) => getInputValue(component);

const addAnnonce = () => {
     let file = _getFileFromInput(component.refs.addAnnonce.image);
     let category = getInputValue(component.refs.addAnnonce.category);
     let title = getInputValue(component.refs.addAnnonce.title);
     let description = getInputValue(component.refs.addAnnonce.description);
     let price = getInputValue(component.refs.addAnnonce.price);
     let city = getInputValue(component.refs.addAnnonce.city);


     let brand ;
     let model;
     let carbs;
     let annonce ;
     switch(category){
       case "Voitures":
         brand  = getInputValue(component.refs.addAnnonce.brand);
         model = getInputValue(component.refs.addAnnonce.model);
         carbs = getInputValue(component.refs.addAnnonce.carbs);
         annonce = {
           category: { name: category },
           title: title,
           description: description,
           price: parseInt(price),
           typeAnnonce: "offre",
           owner: Meteor.userId(),
           city: { name: city },
           photos: [
             file
           ],
           publication: new Date(),
           brand:  brand ,
            model: model ,
           carbs: carbs,
           yearOfModel: 2000,
           km: 30000
         };
         break;
         default:
         annonce = {
           category: { name: category },
           title: title,
           description: description,
           price: parseInt(price),
           typeAnnonce: "offre",
           owner: Meteor.userId(),
           city: { name: city },
           photos: [
             file
           ],
           publication: new Date()
         };
     }

    // let years = getInputValue(component.refs.addAnnonce.years);
    //  let km = getInputValue(component.refs.addAnnonce.km);

//   let typeAnnonce = getInputValue(component.refs.addAnnonce.typeAnnonce);

     

    //  console.log(annonce);

     console.log(annonce);
    insertAnnonce.call(annonce, (error) => {
      if(error){
        Bert.alert(error.reason, 'warning');
      }else{
        Bert.alert("Votre Annonce est ajouté et sera publier dans quelque instant après la modération nMerci");
      }
    });
};

const validate = () => {
  $(component.refs.addAnnonce).validate({
    rules: {
      title: {
        required: true,
      },
      price:{
        required: true
      },
      description: {
        required: true,
      },
      typeAnnonce:{
        required: true,
      },
      city:{
        required: true
      },
      image:{
        required: true
        //accept: "image/jpeg,application/pdf".
      }
    },
    messages: {
      title: {
        required: 'Title?',
      },
      price:{
        required: 'Le prix et obligatoir'
      },
      description: {
        required: 'Description?',
      },
      typeAnnonce:{
        required: 'Vous devez choisir le type d\'annonce'
      },
      city:{
        require: 'Vous devez choisir la ville de votre annonce'
      },
      image:{
        required: "tu dois selectionner au moins une image"
      }
    },
    submitHandler() { addAnnonce(); },
  });
};

export const handleAddAnnonce = (options) => {
  component = options.component;
  validate();
};
