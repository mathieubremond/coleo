import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function markProjectAsDone({id, done}) {
    let companyId = getCurrentUserCompanyId(Meteor.userId());

    let pjt = Projects.findOne({_id:id, companyId: companyId});

    if(!pjt) {
        throw new Meteor.Error(500, 'Le projet n\'existe pas.');
    }

    Projects.update(pjt, {$set: {hide: done}});

    serverMessages.notify('serverMessage:company',
        'Info', 'Projet modifié : ' + pjt.name, {
            companyId: companyId,
            timeout: 500
        });
}