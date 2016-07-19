import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

import { _uploadFileToAmazon } from './upload-to-amazon-s3.js';


let component;

_getFileFromInput = (component) => getInputValue(component);

const addAnnonce = () => {
     let file = component.refs.addAnnonce.image.files[0]; //_getFileFromInput(component.refs.addAnnonce.image);
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
      case "Motos":
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
         break;
     }

    // let years = getInputValue(component.refs.addAnnonce.years);
    //  let km = getInputValue(component.refs.addAnnonce.km);

//   let typeAnnonce = getInputValue(component.refs.addAnnonce.typeAnnonce);



    //  console.log(annonce);

     console.log(annonce);
    _uploadFileToAmazon(annonce.photos[0], annonce);

    // insertAnnonce.call(annonce, (error) => {
    //   if(error){
    //     Bert.alert(error.reason, 'warning');
    //   }else{
    //     Bert.alert("Votre Annonce est ajouté et sera publier dans quelque instant après la modération Merci", "success");
    //   }
    // });
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
    invalidHandler(event, validator) {
      // 'this' refers to the form
      var errors = validator.numberOfInvalids();
      if (errors) {
        var message = errors == 1
          ? 'You missed 1 field. It has been highlighted'
          : 'You missed ' + errors + ' fields. They have been highlighted';
      //  $("div.error span").html(message);
        //$("div.error").show();
        console.log(message);
      } else {
        $("div.error").hide();
      }
    },

    // success: function(label) {
    //   console.log(label);
    //   label.addClass("valid").text("Ok!")
    // },

    highlight: function(element, errorClass) {
      console.log($(element).parent());
      $(element).parent().removeClass('has-success');
      $(element).parent().addClass('has-error');
          $(element).parent().removeClass('has-feedback');
          $(element).parent().addClass('has-feedback');
     },

     unhighlight: function(element, errorClass) {
       console.log($(element).parent());
      $(element).parent().removeClass('has-error');

      $(element).parent().addClass('has-success');
      $(element).parent().removeClass('has-feedback');
      $(element).parent().addClass('has-feedback');
      console.log('success');
      //console.log(element);
    }

  });
};

export const handleAddAnnonce = (options) => {
  component = options.component;
  validate();
};
