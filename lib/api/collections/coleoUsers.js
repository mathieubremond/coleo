import {Schema} from '../schemas/index.js';

// ColeoUsers est une extension de la collection Users (créée et gérée par Meteor)
// C'est dans cette collection que les informations des utilisateurs de Coleo sont stockés

ColeoUsers = new Mongo.Collection('ColeoUsers');

ColeoUsers.attachSchema(Schema.userSchema);


