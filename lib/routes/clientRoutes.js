let authRoutes = FlowRouter.group({
    prefix: '/client',
    triggersEnter: [function (context, redirect) {
        /*if (!Meteor.userId()) {
            // Si l'utilisateur n'est pas connecté du tout
            redirect('/');
        }*/
    }]
});
authRoutes.route('/', {
    name: 'client',
    action() {
        BlazeLayout.render('suiviClientLayout', {main: 'stats'});
    }
});