/*
AccountsTemplates.configure({

});

AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/inscription',
});

AccountsTemplates.configureRoute('signUp', {
    name: 'join',
    path: '/connexion',
});*/

// Modification de Account (by Meteor)
AccountsTemplates.configure({
    hideSignInLink: true,
    hideSignUpLink: true,
});
AccountsTemplates.avoidRedirect = true;