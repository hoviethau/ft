var bcrypt = require( 'bcrypt' );
var mongoose = require( 'mongoose' );
var systemError = require( '../utils/error_messages' ).systemError;
var authorizationError = require( '../utils/error_messages' ).authorizationError;
var conflictError = require( '../utils/error_messages' ).conflictError;
var _ = require('underscore');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var FamilySchema = Schema ( {
    id: ObjectId,
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true	
	},
    description: {
        type: String,
        required: false,
        unique: true,
        trim: true
    }
} );


FamilySchema.statics.add = function ( name, description, callback ) {

    var newFamilyData = {
        name: name,
        description: description
    };

    this.create( newFamilyData, function ( err, newFamily ) {

        if ( err && err.code === 11000 ) {
            return callback( conflictError( "Name address is in use" ) );
        }

        if ( err ) {
            return callback( systemError() );
        }
		
        return callback( null, newFamily );

    } );

};

FamilySchema.statics.updateFamily = function ( name, description, callback ) {
    console.log('-----');
    console.log(callback);
    
    var conditions = { name: name }
        , options = { multi: true };
    var self = this;
    this.update(conditions, {name: name, description: description}, options, function(err, count){
            if (err || count == 0) {
                console.log(err);
                return callback( systemError() );
            }  else {
                self.findOne({name: name}, function(err, family){
                    callback(null, family);    
                });
            }
        });
    
};



exports.Family = mongoose.model( 'Family', FamilySchema );
