require( '@babel/polyfill' )

require( 'bootstrap/dist/css/bootstrap.css' )

const $ = require( 'jquery' )
require( 'popper.js' )
require( 'bootstrap' )

const observer = require( './listener-form' )

$( '#form-id' ).on( 'submit', observer )

require( './TagHtmlCustomizada' )
