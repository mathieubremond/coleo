Template.clients.onCreated(() => {
    Session.set('currentPage', 'Accès client');
    let template = Template.instance();
    template.error = new ReactiveVar();
});

Template.clients.helpers({
    error: () => {return Template.instance().error.get();}
});

Template.clients.events({
    'click button.add-client'(event, template) {
        let selectedProjectIds = Session.get('selectedProjectIds') || [];
        let selectedTeamIds = Session.get('selectedTeamIds') || [];

        if(selectedProjectIds.length == 0 || selectedTeamIds.length == 0) {
            template.error.set("Sélectionnez au moins un projet et une équipe.");
            return;
        }

        let name = $('input[name=signupName]').val().trim();
        let email = $('input[name=signupEmail]').val().trim();
        let password = $('input[name=signupPassword]').val().trim();
        if(!name || !email || !password) {
            template.error.set("Tous les champs doivent être renseignés.");
            return;
        }

        Meteor.call('users.createClient', {
            projectIds: selectedProjectIds,
            teamIds: selectedTeamIds,
            name: name,
            email: email,
            password: password
        }, function (err) {
            //console.log("err =", err);
            if(!!err) {
                template.error.set(err.reason);
            } else {
                template.error.set(null);
                $('input[name=signupName]').val('');
                $('input[name=signupEmail]').val('');
                $('input[name=signupPassword]').val('');
            }
        });
    }
});