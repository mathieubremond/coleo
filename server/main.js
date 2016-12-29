/*
 import { Email } from 'meteor/email';
 */

Meteor.startup(() => {

    // Test de l'envoi de mail !
    /*let mail = {
     to: 'math.bre@gmail.com',
     from: 'contact@ocelo.fr',
     subject: 'Test de l\'envoi de mail',
     text: "Bonjour,\n" +
     "Ceci est un test d'envoi de mail.\n" +
     "Cordialement,\n" +
     "Mathieu"
     };


     Email.send(mail);*/

    // MAJ de tous les ColeoUsers pour ajout d'un champ en base de donnée
    ColeoUsers.update({}, {$set: {firstLogin: true}});
});
