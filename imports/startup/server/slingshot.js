import { Slingshot } from 'meteor/edgee:slingshot';

Slingshot.fileRestrictions( "uploadToAmazonS3", {
  allowedFileTypes: [ "image/png", "image/jpeg", "image/gif" ],
  maxSize: 1 * 1024 * 1024
});

Slingshot.createDirective( "uploadToAmazonS3", Slingshot.S3Storage, {
  bucket: "annoncio-photos",
  acl: "public-read",
  //region: "s3.eu-central-1.amazonaws.com",
  region: 'eu-central-1',
  authorize: function () {
    //let userFileCount = Files.find( { "userId": this.userId } ).count();
    //return userFileCount < 3 ? true : false;
    return 3;
  },
  key: function ( file ) {
     var user = Meteor.users.findOne( this.userId );
     return user.emails[0].address + "/" + file.name;
    //return file.name;
  }
});
