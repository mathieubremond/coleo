Template.suivi.helpers({
    currentColeoUser: function () {
        // L'utilisateur coleo courant
        return Session.get('currentColeoUser');
    },
    currentCompany: function () {
        // La premiere instance dans la base mongo locale
        return Session.get('currentCompany');
    }
});