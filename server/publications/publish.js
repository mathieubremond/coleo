import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';
import {listProjects} from './projects.list.js';
import {singleProject} from './projects.list.js';
import {singleTeam} from './teams.list.js';
import {listTasks} from'./tasks.list.js';
import {listTeams} from'./teams.list.js';
import {listClients} from'./clients.list.js';
import {singleClient} from'./clients.list.js';
import {currentClient} from'./clients.list.js';

Meteor.publish('companies.current', function () {
    let id = getCurrentUserCompanyId(this.userId);
    if(!id) return null;
    return Companies.find({_id: id});
});

Meteor.publish('coleousers.current', function () {
    return ColeoUsers.find({userId: this.userId});
});

Meteor.publish('users.list', function () {
    let id = getCurrentUserCompanyId(this.userId);
    if(!id) return null;
    return ColeoUsers.find({
        companyId: getCurrentUserCompanyId(this.userId)
    });
});

Meteor.publish('projects.list', listProjects);
Meteor.publish('teams.list', listTeams);
Meteor.publish('tasks.list', listTasks);

Meteor.publish('users.meteor.public', function() {
    return Meteor.users.find({}, {fields: {emails: 1, createdAt: 1}});
});

Meteor.publish('users.single', function(id) {
    check(id, String);
    return ColeoUsers.find({_id: id, companyId: getCurrentUserCompanyId(this.userId)});
});

Meteor.publish('projects.single', singleProject);
Meteor.publish('teams.single', singleTeam);

Meteor.publish('clients.list', listClients);
Meteor.publish('clients.single', singleClient);
Meteor.publish('clients.current', currentClient);
