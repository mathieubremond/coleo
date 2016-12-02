import {createProject} from './createProject.js';
import {createTask} from './createTask.js';
import {createTeam} from './createTeam.js';
import {createColeoUser} from './createUser.js';

Meteor.methods({
    'users.findByEmail': function(email) {return Accounts.findUserByEmail(email);},

    'users.create': createColeoUser,
    'projects.create' : createProject,
    'teams.create': createTeam,
    'tasks.create': createTask
});