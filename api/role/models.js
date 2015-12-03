
var bcrypt = require( 'bcrypt' );
var mongoose = require( 'mongoose' );
var systemError = require( '../utils/error_messages' ).systemError;
var authorizationError = require( '../utils/error_messages' ).authorizationError;
var conflictError = require( '../utils/error_messages' ).conflictError;
var notFoundError = require( '../utils/error_messages' ).notFoundError;
var _ = require('underscore');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


// Create Member Role

var RoleSchema = Schema ( {
    // id: ObjectId,
    role_title:{
      type: String,	
    //   required: true,
	//   unique: true,
	//   trim: true	
    }
} );


RoleSchema.statics.add = function (role_title, callback ) {

    var newRoleData = {
        role_title: role_title
    };

    this.create( newRoleData, function ( err, newRole ) {
    console.log(newRoleData);
        if ( err && err.code === 11000 ) {
            console.log(err);
            return callback( conflictError( "Name address is in use" ) );
        }

        if ( err ) {
            return callback( systemError() );

        }
		
        return callback( null, newRole);

    } );

};

// Update Member Role

RoleSchema.statics.updateRole = function (id, role_title, callback ) {
    console.log('-----');
    console.log(callback);

    var _id = mongoose.Types.ObjectId(id);
    var conditions = { _id: _id }
        , options = { multi: true };
    var self = this;
    this.update(conditions, {role_title:role_title}, options, function(err, count){
            if (err || count == 0) {
                console.log(err);
                return callback( systemError() );
            }  else {
                self.findOne({role_title: role_title}, function(err, role){
                    callback(null, role);    
                });
            }
        });
    
};

// Delete Member Role

RoleSchema.statics.deleteRole = function (id, callback ) {
    var _id = mongoose.Types.ObjectId(id);
    console.log(id);
    this.findOne({_id:_id}, function(err,role){
        if (err) {
            return callback( systemError() );
        } else {
            if (role == undefined) {
                return callback( notFoundError() );
            } else {
                role.remove(function(err){
                    callback(null);
                });    
            }            
        }
    });
    
   
    
};

// Get List Role

RoleSchema.statics.listRole = function (page, numberPerPage,callback ) {
   var self = this;
   this.count(null, function(err, total) {
       self.find(null, null,{ skip: (page-1)*numberPerPage, limit: numberPerPage },function(err, rolemembers){
            if (err) {
                return callback( systemError() );
            } else {
                if (rolemembers == undefined) {
                    return callback( notFoundError() );
                } else {
                    var data =  {rolemembers:rolemembers, totalPage: Math.ceil(total/numberPerPage)};
                     callback(null,data);
                        
                }            
            }
        });
   });
        
};

// Get One Role

RoleSchema.statics.getOneRole = function (id, callback ) {
   var _id = mongoose.Types.ObjectId(id);
   
    this.find({_id:_id},function(err, role){
        if (err) {
            return callback( systemError() );
        }  
        if (role == undefined) {
                return callback( notFoundError() );
            }     
        return callback(null,role);               
        
    });    
};

exports.Role = mongoose.model( 'Role', RoleSchema );