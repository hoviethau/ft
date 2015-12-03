var express = require('express');
var router = express.Router();
var User = require( '../api/user/controllers' );
var Family = require( '../api/family/controllers' );
var Member = require( '../api/member/controllers' );
var Role = require( '../api/role/controllers' );
var Relation = require( '../api/relation/controllers' );


var roleRequired = function ( allowedLevels ) {
    return function ( req, res, next ) {
        if ( allowedLevels.indexOf( req.user.role ) > -1 ) {
            next();
        } else {
            return res.json( {
                message: "You are not authorized"
            }, 403 );
        }
    };
};


/* Map URLs to handlers in this file */
router.post( '/api/signup', User.signup );
router.post( '/api/authenticate', User.authenticate );
router.post( '/admin', User.createAdmin );

router.post('/api/family',Family.createFamily);
router.put('/api/family',Family.updateFamily);

router.get('/api/member',Member.listMember);
router.get('/api/member/:id', Member.getOneMember);
router.post('/api/member',Member.createMember);
router.put('/api/member',Member.updateMember);
router.delete('/api/member',Member.deleteMember);

router.get('/api/role', Role.listRole);
router.get('/api/role/:id',Role.getOneRole);
router.post('/api/role',Role.createRole);
router.put('/api/role',Role.updateRole);
router.delete('/api/role',Role.deleteRole);

router.get('/api/relation',Relation.listRelation);
router.get('/api/relation/:id', Relation.getOneRelation);
router.post('/api/relation',Relation.createRelation);
router.put('/api/relation',Relation.updateRelation);
router.delete('/api/relation',Relation.deleteRelation);

module.exports = router;
