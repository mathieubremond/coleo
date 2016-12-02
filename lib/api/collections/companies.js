import {Schema} from '../schemas/index.js';

Companies = new Mongo.Collection('Companies');

// Autorise l'insertion uniquement
Companies.allow({
    'insert': function (userId,doc) {
        /* user and doc checks ,
         return true to allow insert */
        return true;
    }
});

// Ajout du schema pour notre collection mongodb
Companies.attachSchema(Schema.companySchema);

