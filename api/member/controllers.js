var async = require( 'async' );
var Member = require( './models' ).Member;
var handleRouteError = require( '../utils' ).handleRouteError;
var validationError = require( '../utils/error_messages' ).validationError;
var makeToken = require( '../utils/authentication' ).makeToken;

// Create Members

exports.createMember = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'title', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            title:req.param( "title" ),
            first_name: req.param( "first_name" ),
            last_name: req.param( "last_name" ),
			sex: req.param( "sex" ),
			birth_date: req.param( "birth_date" ),
			marriage_date: req.param( "marriage_date" ),
			address: req.param( "address" ),
            description: req.param( "description" ),
			death_on: req.param( "death_on" ),
			img: req.param( "img" ),
        } );

    };

    var data = function ( cleanData, callback ) {

        Member.add(cleanData.title, cleanData.first_name, cleanData.last_name, cleanData.sex, cleanData.birth_date, cleanData.marriage_date, cleanData.address, cleanData.description,cleanData.death_on, cleanData.img, callback );

    };

    async.waterfall( [ validation, data ], function ( err, newMember ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newMember, 201 );

    } );

};

// Update member

exports.updateMember = function ( req, res ) {

    var validation = function ( callback ) {

        req.checkBody( 'title', "Field is required" ).notEmpty();
        
        var errors = req.validationErrors();
        if ( errors ) {
            return callback( validationError( errors ) );
        }

        return callback( null, {
            id: req.param( "id" ),
            title:req.param( "title" ),
            first_name: req.param( "first_name" ),
            last_name: req.param( "last_name" ),
			sex: req.param( "sex" ),
			birth_date: req.param( "birth_date" ),
			marriage_date: req.param( "marriage_date" ),
			address: req.param( "address" ),
            description: req.param( "description" ),
			death_on: req.param( "death_on" ),
			img: req.param( "img" ),
           
        } );

    };

    var data = function ( cleanData, callback ) {
        console.log(callback);
        Member.updateMember(cleanData.id, cleanData.title, cleanData.first_name, cleanData.last_name, cleanData.sex, cleanData.birth_date, cleanData.marriage_date, cleanData.address, cleanData.description,cleanData.death_on, cleanData.img, callback  );

    };

    async.waterfall( [ validation, data ], function ( err, newMember ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( newMember, 201 );

    } );

};

// Delete Member

exports.deleteMember = function ( req, res ) {
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
        Member.deleteMember(cleanData.id, callback  );

    };

    async.waterfall( [ validation, data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( data, 200 );

    } );

    
};

exports.listMember = function ( req, res ) {
  

    var data = function (callback ) {
        
        var page = req.param('page');
        var numberPerPage = req.param('numberPerPage');
        
        Member.listMember(page, numberPerPage, callback  );
    };

    async.waterfall( [ data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( { data: data.relationmembers,
                        totalPage: data.totalPage}, 200 );

    } );

    
};

exports.getOneMember = function ( req, res ) {
    
    var data = function (callback ) {
        console.log(callback);
    var id = req.params.id;
        Member.getOneMember(id,callback  );

    };

    async.waterfall( [ data ], function ( err, data ) {

        if ( err ) {
            return handleRouteError( err, res );
        }

        return res.json( data, 200 );

    } );
};