import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';
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
import {createClientUser} from './createUser.js';
import {updateProject} from './updateProject.js';
import {getClientUser} from './clients.js';
import {removeClient} from './clients.js';
import {updateClient} from './clients.js';
import {removeProject} from './removeProject.js';
import {updateTeam} from './updateTeam.js';
import {createCompany} from './createCompany.js';
import {createMetorUser} from './createUser.js';
import {updateFirstLoginUser} from './updateUser.js';
import {getTaskCreator} from './getTaskCreator.js';

Meteor.methods({
    'users.findByEmail': function (email) {
        return Accounts.findUserByEmail(email);
    },
    'teams.getTeamByName': function (name) {
        let regex = new RegExp(name, 'i');
        let team = Teams.findOne({
            name: regex, hide: false, companyId: getCurrentUserCompanyId(Meteor.userId())
        });
        if (!!team) {
            return team;
        } else {
            return null;
        }
    },
    'users.create': createColeoUser,
    'users.createFirstUser': createFirstUser,
    'users.createClient': createClientUser,
    'users.getClientUser': getClientUser,
    'users.removeClient': removeClient,
    'projects.create': createProject,
    'projects.markAsDone': markProjectAsDone,
    /*'projects.delete': ({id}) => {
        Projects.remove({_id: id, companyId: getCurrentUserCompanyId(Meteor.userId())});
        Tasks.remove({projectId: id});
    },*/
    'projects.delete': removeProject,
    'teams.markAsDone': markTeamAsDone,
    'teams.create': createTeam,
    'tasks.create': createTask,
    'tasks.update': updateTask,
    'tasks.remove': removeTask,
    'tasks.getCreator': getTaskCreator,
    'users.updateInfo': updateUserInfo,
    'users.updateMail': updateUserMail,
    'users.updatePassword': updateUserPassword,
    'users.remove': removeUser,
    'projects.update': updateProject,
    'teams.update': updateTeam,
    'user.getPath': function () {
        let id = Meteor.userId();
        let coleoUser = ColeoUsers.findOne({userId: id});
        if (!!coleoUser) return "suivi";
        let client = Clients.findOne({userId: id});
        if (!!client) return "client";
        return 'suivi';
    },
    'companies.create': createCompany,
    'companies.findByName': (name) => {
        return Companies.findOne({name:name});
    },
    'users.createMeteorUser': createMetorUser,
    'users.updateFirstLogin': updateFirstLoginUser,
    'clients.update': updateClient
});