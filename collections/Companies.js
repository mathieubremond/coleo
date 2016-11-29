import {defaultValidationMessages} from './defaultValidationMessages';

Companies = new Mongo.Collection('Companies');

// Autorise l'insertion uniquement
Companies.allow({
    'insert': function (userId,doc) {
        /* user and doc checks ,
         return true to allow insert */
        return true;
    }
});

CompanySchema = new SimpleSchema({
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

// Ajout du schema pour notre collection mongodb
Companies.attachSchema(CompanySchema);

