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
// handling /suivi/teams
authRoutes.route('/teams', {
    name: 'teams',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'teamsPage'});
    }
});
authRoutes.route('/projects', {
    name: 'projects',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'projectsPage'});
    }
});
authRoutes.route('/users', {
    name: 'users',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'usersPage'});
    }
});
