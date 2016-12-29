Template.suivi.onCreated(()=>{
    Session.set('currentPage', 'Suivi');

    // Affichage du modal de bienvenu si premiere connexion
    let user = Session.get('currentColeoUser');
    if(user.firstLogin === true) {
        Modal.show('firstLogin');
    }
});
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