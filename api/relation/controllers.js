var async = require( 'async' );
var Relation = require( './models' ).Relation;
var handleRouteError = require( '../utils' ).handleRouteError;
var validationError = require( '../utils/error_messages' ).validationError;
var makeToken = require( '../utils/authentication' ).makeToken;

// Create Members

exports.createRelation = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'family_name', "Field is required" ).notEmpty();
        req.checkBody( 'member_one', "Field is required" ).notEmpty();
        req.checkBody( 'member_two', "Field is required" ).notEmpty();
        req.checkBody( 'relation_type', "Field is required" ).notEmpty();
        req.checkBody( 'role_one',  "Field is required" ).notEmpty();
        req.checkBody( 'role_two',  "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            id: req.param( "id" ),
            family_name:req.param( "family_name" ),
            member_one:req.param( "member_one" ),
            member_two:req.param( "member_two" ),
            relation_type:req.param( "relation_type" ),
            role_one:req.param( "role_one" ),
            role_two:req.param( "role_two" )
            
        } );

    };

    var data = function ( cleanData, callback ) {

        Relation.add(cleanData.family_name, cleanData.member_one, cleanData.member_two, cleanData.relation_type, cleanData.role_one, cleanData.role_two, callback );

    };

    async.waterfall( [ validation, data ], function ( err, newRelation ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newRelation, 201 );

    } );

};

// Update member

exports.updateRelation = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'family_name', "Field is required" ).notEmpty();
        req.checkBody( 'member_one', "Field is required" ).notEmpty();
        req.checkBody( 'member_two', "Field is required" ).notEmpty();
        req.checkBody( 'relation_type', "Field is required" ).notEmpty();
        req.checkBody( 'role_one',  "Field is required" ).notEmpty();
        req.checkBody( 'role_two',  "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            id: req.param( "id" ),
            family_name:req.param( "family_name" ),
            member_one:req.param( "member_one" ),
            member_two:req.param( "member_two" ),
            relation_type:req.param( "relation_type" ),
            role_one:req.param( "role_one" ),
            role_two:req.param( "role_two" )
        } );

    };

    var data = function ( cleanData, callback ) {
        console.log(callback);
        Relation.updateRelation(cleanData.id, cleanData.family_name, cleanData.member_one, cleanData.member_two, cleanData.relation_type, cleanData.role_one, cleanData.role_two, callback  );

    };

    async.waterfall( [ validation, data ], function ( err, newRelation) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newRelation, 201 );

    } );

};

// Delete Member Relation

exports.deleteRelation = function ( req, res ) {
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
        Relation.deleteRelation(cleanData.id, callback  );

    };

    async.waterfall( [ validation, data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( data, 200 );

    } );

    
};

exports.listRelation = function ( req, res ) {
  

    var data = function (callback ) {
        var page = req.param('page');
        var numberPerPage = req.param('numberPerPage');
        
        console.log(callback);
        Relation.listRelation(page, numberPerPage, callback  );

    };

    async.waterfall( [ data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( { data: data.relationmembers,
                        totalPage: data.totalPage}, 200 );

    } );   
};

exports.getOneRelation = function(req, res ){
     
     var data = function ( callback ) {
        // console.log(callback);
     var id = req.params.id;  
        Relation.getOneRelation(id, callback );

    };

    async.waterfall( [ data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( data, 200 );

    } );
 }