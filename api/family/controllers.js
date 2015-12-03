var async = require( 'async' );
var Family = require( './models' ).Family;
var handleRouteError = require( '../utils' ).handleRouteError;
var validationError = require( '../utils/error_messages' ).validationError;
var makeToken = require( '../utils/authentication' ).makeToken;


exports.createFamily = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'name', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            name: req.param( "name" ),
            description: req.param( "description" )
        } );

    };

    var data = function ( cleanData, callback ) {

        Family.add( cleanData.name, cleanData.description, callback );

    };

    async.waterfall( [ validation, data ], function ( err, newFamily ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newFamily, 201 );

    } );

};

exports.updateFamily = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'name', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            name: req.param( "name" ),
            description: req.param( "description" )
        } );

    };

    var data = function ( cleanData, callback ) {
        console.log(callback);
        Family.updateFamily( cleanData.name, cleanData.description, callback );

    };

    async.waterfall( [ validation, data ], function ( err, newFamily ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newFamily, 201 );

    } );

};
