 import { BrowserPolicy } from 'meteor/browser-policy-common';
// e.g., BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
BrowserPolicy.content.allowOriginForAll( '*.amazonaws.com' );
BrowserPolicy.content.allowOriginForAll( 'http://bootdey.com' );
