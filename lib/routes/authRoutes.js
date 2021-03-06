let authRoutes = FlowRouter.group({
    prefix: '/suivi',
    triggersEnter: [function (context, redirect) {
        /*if (!Meteor.userId()) {
            // Si l'utilisateur n'est pas connecté du tout
            redirect('/');
        }*/
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
authRoutes.route('/teams/:id', {
    name: 'team',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'editTeam'});
    }
});
authRoutes.route('/projects', {
    name: 'projects',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'projectsPage'});
    }
});
authRoutes.route('/projects/:id', {
    name: 'project',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'editProject'});
    }
});
authRoutes.route('/users', {
    name: 'users',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'usersPage'});
    }
});
authRoutes.route('/user/:id', {
    name: 'user',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'updateUser'});
    }
});
authRoutes.route('/stats', {
    name: 'stats',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'stats'});
    }
});

authRoutes.route('/clients', {
    name: 'clients',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'clients'});
    }
});

authRoutes.route('/clients/:id', {
    name: 'clientSingle',
    action() {
        BlazeLayout.render('suiviLayout', {main: 'editClient'});
    }
});