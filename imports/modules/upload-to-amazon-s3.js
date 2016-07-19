import { Slingshot } from 'meteor/edgee:slingshot';
import { insertAnnonce } from '../api/annonces/methods.js';

export const _uploadFileToAmazon = ( file, annonce ) => {
  const uploader = new Slingshot.Upload( "uploadToAmazonS3" );

  uploader.send( file, ( error, url ) => {
    if ( error ) {
      Bert.alert( error.message, "warning" );
    console.log('error');
    } else {
      annonce.photos[0] = url;
      //annonce.public = true;
      insertAnnonce.call(annonce, (error) => {
        if(error){
          Bert.alert(error.reason, 'warning');
        }else{
          Bert.alert("Votre Annonce est ajouté et sera publier dans quelque instant après la modération Merci", "success");
        }
      });
    }
  });
};
