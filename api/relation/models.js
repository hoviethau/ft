var bcrypt = require( 'bcrypt' );
var mongoose = require( 'mongoose' );
var systemError = require( '../utils/error_messages' ).systemError;
var authorizationError = require( '../utils/error_messages' ).authorizationError;
var conflictError = require( '../utils/error_messages' ).conflictError;
var notFoundError = require( '../utils/error_messages' ).notFoundError;
var _ = require('underscore');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Create Member Relation

var RelationSchema = Schema ( {
    id: ObjectId,
    family_name:{
      type: String,	
      required: true,
    },
    member_one:{
      type: String,	
      required: true,
    },
    member_two:{
      type: String,	
      required: true,
    },
    relation_type:{
      type: String,	
      required: true
    },
    role_one:{
      type: String,	
      required: true
    },
    role_two:{
      type: String,	
      required: true
    }
} );


RelationSchema.statics.add = function (family_name, member_one, member_two, relation_type, role_one, role_two, callback ) {

    var newRelationData = {
        family_name: family_name,
        member_one: member_one,
        member_two: member_two,
        relation_type: relation_type,
        role_one: role_one,
        role_two: role_two
    };

    this.create( newRelationData, function ( err, newRelation ) {
    console.log(newRelationData);
        if ( err && err.code === 11000 ) {
            console.log(err);
            return callback( conflictError( "Name address is in use" ) );
        }

        if ( err ) {
            return callback( systemError() );

        }
		
        return callback( null, newRelation);

    } );

};

// Update Member Relation

RelationSchema.statics.updateRelation = function (id, family_name, member_one, member_two, relation_type, role_one, role_two, callback ) {
    console.log('-----');
    console.log(callback);

    var _id = mongoose.Types.ObjectId(id);
    var conditions = { _id: _id }
        , options = { multi: true };
    var self = this;
    this.update(conditions, {family_name: family_name, member_one: member_one, member_two: member_two, relation_type: relation_type, role_one: role_one, role_two: role_two}, options, function(err, count){
            if (err || count == 0) {
                console.log(err);
                return callback( systemError() );
            }  else {
                self.findOne({family_name: family_name}, function(err, relation){
                    callback(null, relation);    
                });
            }
        });
    
};

// Delete Member relation

RelationSchema.statics.deleteRelation = function (id, callback ) {
    var _id = mongoose.Types.ObjectId(id);
    console.log(id);
    this.findOne({_id:_id}, function(err,relation){
        if (err) {
            return callback( systemError() );
        } else {
            if (relation == undefined) {
                return callback( notFoundError() );
            } else {
                relation.remove(function(err){
                    callback(null);
                });    
            }            
        }
    });
    
   
    
};

//  List Relation Members

RelationSchema.statics.listRelation = function (page, numberPerPage,callback ) {
    var self = this;
    this.count(null, function(err, total){
        self.find(null, null,{ skip: (page-1)*numberPerPage, limit: numberPerPage }, function(err, relationmembers){
            if (err) {
                return callback( systemError() );
            } else {
                if (relationmembers == undefined) {
                    return callback( notFoundError() );
                } else {
                    var data =  {relationmembers:relationmembers, totalPage: Math.ceil(total/numberPerPage)};
                    callback(null,data);
                        
                }            
            }
        }); 
    });
       
};

// Get One relation

RelationSchema.statics.getOneRelation = function (id, callback ) {
   var _id = mongoose.Types.ObjectId(id);
   
    this.find({_id:_id},function(err, relation){
        if (err) {
            return callback( systemError() );
        }  
        if (relation == undefined) {
                return callback( notFoundError() );
            }     
        return callback(null,relation);               
        
    });    
};
exports.Relation = mongoose.model( 'Relation', RelationSchema );