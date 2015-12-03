var express = require('express'),
  path = require('path'),
  logger = require('morgan');
var app = express();


var bcrypt = require( 'bcrypt' );
var mongoose = require( 'mongoose' );
var systemError = require( '../utils/error_messages' ).systemError;
var authorizationError = require( '../utils/error_messages' ).authorizationError;
var conflictError = require( '../utils/error_messages' ).conflictError;
var notFoundError = require( '../utils/error_messages' ).notFoundError;
var _ = require('underscore');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


// Create Member

var MemberSchema = Schema ( {
    
    title:{
      type: String	
    },
	first_name: {
		type: String	
	},
    last_name: {
        type: String
     
    },
    sex: {
		type: String
	},
    birth_date: {
        type: [Date]
    },
    marriage_date: {
		type: [Date]
	},
    address: {
        type: String
    },
    description: {
		type: String
	},
    death_on: {
		type: String
	},
    img: {
        type: String
    }
} );


MemberSchema.statics.add = function (title, first_name, last_name, sex, birth_date, marriage_date, address, description, death_on, img, callback ) {

    var newMemberData = {
        title: title,
        first_name: first_name,
        last_name: last_name,
        sex: sex,
        birth_date: birth_date,     
        marrige_date: marriage_date,
        address:address,
        description:description,
        death_on: death_on,
        img:img
    };

    this.create( newMemberData, function ( err, newMember ) {
    console.log(newMemberData);
        if ( err && err.code === 11000 ) {
            console.log(err);
            return callback( conflictError( "Name address is in use" ) );
        }

        if ( err ) {
            return callback( systemError() );
        }
		
        return callback( null, newMember);

    } );

};

// Update Member

MemberSchema.statics.updateMember = function (id, title, first_name, last_name, sex, birth_date, marriage_date, address, description, death_on, img, callback ) {
    console.log('-----');
    console.log(callback);

    var _id = mongoose.Types.ObjectId(id);
    var conditions = { _id: _id }
        , options = { multi: true };
    var self = this;
    this.update(conditions, {title:title, first_name:first_name, last_name:last_name, sex:sex, birth_date:birth_date, marriage_date:marriage_date, address:address, description:description, death_on:death_on, img:img }, options, function(err, count){
            if (err || count == 0) {
                console.log(err);
                return callback( systemError() );
            }  else {
                self.findOne({_id: _id}, function(err, member){
                    callback(null, member);    
                });
            }
        });
    
};

// Delete Member

MemberSchema.statics.deleteMember = function (id, callback ) {
    var _id = mongoose.Types.ObjectId(id);
    console.log(id);
    this.findOne({_id:_id}, function(err, member){
        if (err) {
            return callback( systemError() );
        } else {
            if (member == undefined) {
                return callback( notFoundError() );
            } else {
                member.remove(function(err){
                    callback(null);
                });    
            }            
        }
    });
    
   
    
};

MemberSchema.statics.listMember = function (page, numberPerPage, callback ) {
    var self = this;
    this.count(null, function(err, total) {
        
        self.find(null, null, { skip: (page-1)*numberPerPage, limit: numberPerPage }, function(err, members){
            
            if (err) {
                return callback( systemError() );
            } else {
                if (members == undefined) {
                    return callback( notFoundError() );
                } else {                
                    var data =  {members:members, totalPage: Math.ceil(total/numberPerPage)};
                    callback(null,data);                    
                }            
            }
        
        });
    });
    
};


MemberSchema.statics.getOneMember = function(id,callback){
    var _id = mongoose.Types.ObjectId(id);
    this.find({_id: _id},function (err, member){
        if (err) {
            return callback(systemError());
        }
        if (member == undefined) {
            return callback(notFoundError());
        }
        return callback(null, member);
    });
    
    
       
};



exports.Member = mongoose.model( 'Member', MemberSchema );