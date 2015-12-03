var async = require( 'async' );
var Role = require( './models' ).Role;
var handleRouteError = require( '../utils' ).handleRouteError;
var validationError = require( '../utils/error_messages' ).validationError;
var makeToken = require( '../utils/authentication' ).makeToken;

// Create Members

exports.createRole = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'role_title', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            
            role_title:req.param( "role_title" )
            
        } );

    };

    var data = function ( cleanData, callback ) {

        Role.add(cleanData.role_title, callback );

    };

    async.waterfall( [ validation, data ], function ( err, newRole ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newRole, 201 );

    } );

};

// Update member

exports.updateRole = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'role_title', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            id: req.param( "id" ),
            role_title: req.param( "role_title" )
                       
        } );

    };

    var data = function ( cleanData, callback ) {
        console.log(callback);
        Role.updateRole(cleanData.id, cleanData.role_title, callback  );

    };

    async.waterfall( [ validation, data ], function ( err, newRole ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newRole, 201 );

    } );

};

// Delete Member

exports.deleteRole = function ( req, res ) {
    var validation = function ( callback ) {

        req.checkBody( 'id', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            id: req.param( "id" )
        } );

    };

    var data = function ( cleanData, callback ) {
        console.log(callback);
        Role.deleteRole(cleanData.id, callback  );

    };

    async.waterfall( [ validation, data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( data, 200 );

    } );

    
};

exports.listRole = function ( req, res ) {
  

    var data = function (callback ) {
        var page = req.param('page');
        var numberPerPage = req.param('numberPerPage');
        
        console.log(callback);
        Role.listRole(page,numberPerPage,callback  );

    };

    async.waterfall( [ data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( { data: data.rolemembers,
                        totalPage: data.totalPage}, 200 );

    } );

 
};

exports.getOneRole = function(req, res ){
     
     var data = function ( callback ) {
        // console.log(callback);
     var id = req.params.id;  
        Role.getOneRole(id, callback );

    };

    async.waterfall( [ data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( data, 200 );

    } );
 }