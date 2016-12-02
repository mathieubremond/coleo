import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';
import {listProjects} from './projects.list.js';
import {listTasks} from'./tasks.list.js';
import {listTeams} from'./teams.list.js';

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