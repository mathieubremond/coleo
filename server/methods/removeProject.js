import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function removeProject({id}) {
    let companyId = getCurrentUserCompanyId(Meteor.userId());

    let project = Projects.findOne({_id:id, companyId: companyId});

    if(!project) {
        throw new Meteor.Error(500, 'Le projet n\'existe pas.', e);
    }

    Tasks.remove({projectId: project._id});
    Projects.remove(project);

    serverMessages.notify('serverMessage:company',
        'Info', 'Projet supprimé : ' + project.name, {
            companyId: companyId,
            timeout: 1000
        });
}