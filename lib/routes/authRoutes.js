let authRoutes = FlowRouter.group({
    prefix: '/suivi',
    triggersEnter: [function (context, redirect) {
        if (!Meteor.userId()) {
            // Si l'utilisateur n'est pas connecté du tout
            redirect('/');
        }
    }]
});
// handling /suivi
authRoutes.route('/', {
    name: 'suivi',
    action: function () {
        BlazeLayout.render('suiviLayout', {main: 'suivi'});
    }
});
// handling /suivi/addTeam
authRoutes.route('/addTeam', {
    name: 'addTeam',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'addTeam'});
    }
});
authRoutes.route('/addProject', {
    name: 'addProject',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'addProject'});
    }
});
authRoutes.route('/users', {
    name: 'users',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'usersPage'});
    }
});
