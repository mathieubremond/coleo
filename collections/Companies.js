import {defaultValidationMessages} from './defaultValidationMessages';

var Companies = new Mongo.Collection('Companies');

// Autorise l'insertion
Companies.allow({
    insert: () => true
});
// Empeche la suppression ou la modification
Companies.deny({
    remove: () => true,
    update: () => true
});

var CompanySchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Nom',
        unique: true // Chaque entreprise doit posséder un nom unique
    },
    desc: {
        type: String,
        label: 'Description',
        optional: true
    }
});

// Ajout de messages de validation en français,
// plus un message personnalisé pour ce schema
if (Meteor.isClient) {
    CompanySchema.messages(defaultValidationMessages);
    CompanySchema.messages({
        "notUnique name": "Une entreprise du même nom utilise déjà Coleo."
    });
}

// Ajout du schema dans notre collection mongodb
// /!\ MAJ automatique de la base de donnée si modification du schema
// Des ajouts c'est pas trop problématiques, mais attention au suppression !!
Companies.attachSchema(CompanySchema);

