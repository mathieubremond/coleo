Template.mainLayout.onCreated(function () {
    var self = this;
    self.autorun(function () {
        if(Meteor.userId()) {
            // On subscribe a l'utilisateur courant et à l'entreprise courante
            // Permettra de ne récupérer que les taches qui concerne l'entreprise
            // et l'utilisateur connecté
            self.subscribe('coleousers.current', function() {
                let currentColeoUser = ColeoUsers.findOne({userId: Meteor.userId()});
                Session.set('currentColeoUser', currentColeoUser);
            });
            self.subscribe('companies.current', function() {
                let currentCompany = Companies.findOne({});
                Session.set('currentCompany', currentCompany);
            });
        }
    });
});