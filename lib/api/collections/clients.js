import {Schema} from '../schemas/index.js';
import './projects.js';
import './teams.js';

// ColeoUsers est une extension de la collection Users (créée et gérée par Meteor)
// C'est dans cette collection que les informations des clients dont on a permi l'accès sont stockées.

Clients = new Mongo.Collection('Clients');

Clients.attachSchema(Schema.clientSchema);

if(Meteor.isClient) {

    Clients.helpers({
        projects() {
            return Projects.find({_id: {$in: this.projectIds}});
        },
        teams() {
            return Teams.find({_id: {$in: this.teamIds}});
        }
    });
}