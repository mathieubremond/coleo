import {defaultValidationMessages} from './defaultValidationMessages';

// ColeoUsers est une extension de la collection Users (créée et gérée par Meteor)
// C'est dans cette collection que les informations des utilisateurs de Coleo sont stockés

var ColeoUsers = new Mongo.Collection('ColeoUsers');

ColeoUsers.allow({
    insert: () => true
});

var UserSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Nom'
    },
    firstname: {
        type: String,
        label: "Prénom"
    },
    companyId: {
        type: String,
        label: "Company Id",
        autoform: {
            type: 'hidden'
        }
    },
    userId: {
        type: String,
        label: "Meteor User Id",
        autoform: {
            type: 'hidden' // Cache le champ dans les formulaires générés automatiquement
        }
    }
});

// Ajout de messages de validation en français,
// plus un message personnalisé pour ce schema
if (Meteor.isClient) {
    UserSchema.messages(defaultValidationMessages);
}

ColeoUsers.attachSchema(UserSchema);

