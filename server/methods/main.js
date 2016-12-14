import {createProject} from './createProject.js';
import {createTask} from './createTask.js';
import {updateTask} from './updateTask.js';
import {removeTask} from './removeTask.js';
import {createTeam} from './createTeam.js';
import {createColeoUser} from './createUser.js';
import {createFirstUser} from './createUser.js';
import {updateUserPassword} from './updateUser.js';
import {updateUserMail} from './updateUser.js';
import {updateUserInfo} from './updateUser.js';
import {markProjectAsDone} from './markProjectAsDone.js';
import {markTeamAsDone} from './markTeamAsDone.js';
import {removeUser} from './removeUser.js';
import {updateProject} from './updateProject.js';

Meteor.methods({
    'users.findByEmail': function (email) {
        return Accounts.findUserByEmail(email);
    },
    'teams.getTeamByName': function (name) {
        let regex = new RegExp(name, 'i');
        let team = Teams.findOne({name: regex, hide: false});
        if (!!team) {
            return team;
        } else {
            return null;
        }
    },
    'users.create': createColeoUser,
    'users.createFirstUser': createFirstUser,
    'projects.create': createProject,
    'projects.markAsDone': markProjectAsDone,
    'projects.delete': ({id}) => {
        Projects.remove({_id: id});
        Tasks.remove({projectId: id});
    },
    'teams.markAsDone': markTeamAsDone,
    'teams.create': createTeam,
    'tasks.create': createTask,
    'tasks.update': updateTask,
    'tasks.remove': removeTask,
    'users.updateInfo': updateUserInfo,
    'users.updateMail': updateUserMail,
    'users.updatePassword': updateUserPassword,
    'users.remove': removeUser,
    'projects.update': updateProject
});