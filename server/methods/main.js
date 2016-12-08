import {createProject} from './createProject.js';
import {createTask} from './createTask.js';
import {updateTask} from './updateTask.js';
import {removeTask} from './removeTask.js';
import {createTeam} from './createTeam.js';
import {createColeoUser} from './createUser.js';
import {createFirstUser} from './createUser.js';
import {updateColeoUser} from './updateUser.js';

Meteor.methods({
    'users.findByEmail': function(email) {return Accounts.findUserByEmail(email);},
    'teams.getTeamByName': function(name) {
        let regex = new RegExp(name, 'i');
        let team = Teams.findOne({name: regex});
        if(!!team) {
            return team;
        } else {
            return null;
        }
    },
    'users.create': createColeoUser,
    'users.createFirstUser': createFirstUser,
    'projects.create' : createProject,
    'teams.create': createTeam,
    'tasks.create': createTask,
    'users.update': updateColeoUser,
    'tasks.update': updateTask,
    'tasks.remove': removeTask
});