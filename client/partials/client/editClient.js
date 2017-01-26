import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';
import {showNotification} from '../../notifications/index.js';

Template.editClient.onCreated(function() {
    Session.set('currentPage', 'Accès Client');
    let self = this;
    self.autorun(function () {

        let id = FlowRouter.getParam('id');

        self.subscribe('clients.single', id, function() {

            // Une fois les informations du client récupérée, on sélectionne dans l'ui
            // les projets et équipes dont il fait parti
            let client = Clients.findOne({userId: id});
            if(!!client) {
                Session.set('selectedProjectIds', client.projectIds);
                Session.set('selectedTeamIds', client.teamIds);
            }
        });
    });
});


Template.editClient.helpers({
    client: () => {
        let id = FlowRouter.getParam('id');
        return Clients.findOne({userId: id});
    },
    clientSchema: () => Schema.clientSchema
});

Template.editClient.events({
    'submit #editClientForm'(e) {
        e.preventDefault();
        console.log("Sauvegarde du client");

        let id = FlowRouter.getParam('id');
        let client = Clients.findOne({userId: id});

        if(!client) {return null;}

        client.teamIds = Session.get('selectedTeamIds');
        client.projectIds = Session.get('selectedProjectIds');
        client.name = $('#clientName').val();

        console.log("client = ", client);

        Meteor.call('clients.update', client, function(err) {
            if(!!err) showNotificationError('bottom', 'right', 'Erreur', err.reason);
            else showNotification('bottom', 'right', "Info", "Client "+client.name+" modifié.");
        });
    }
});