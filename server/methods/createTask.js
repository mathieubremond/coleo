import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function createTask(task) {

    var companyId = getCurrentUserCompanyId(Meteor.userId());

    Schema.taskSchema.clean(task);
    task.companyId = companyId;
    Schema.taskSchema.validate(task);
    let pjt = Projects.findOne({_id: task.projectId});
    let tm = Teams.findOne({_id: task.teamId});
    if (!!tm && !!pjt) {
        Tasks.insert(task);

        /*serverMessages.notify('serverMessage:company', 'Info', 'Tâche ajoutée : ' + task.name, {
            companyId: companyId,
            timeout: 3000
        });*/
    } else {
        throw new Meteor.Error(500, "Un projet et une équipe doivent être renseignée", e);
    }

}