import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function markTeamAsDone(id) {
    let companyId = getCurrentUserCompanyId(Meteor.userId());

    let team = Teams.findOne({_id:id, companyId: companyId});

    if(!team) {
        throw new Meteor.Error(500, 'L\'équipe n\'existe pas.');
    }

    //Teams.update(team, {$set: {hide: true}});
    Tasks.remove({teamId: id});
    Teams.remove({_id: id});

    serverMessages.notify('serverMessage:company',
        'Info', 'Équipe supprimée : ' + team.name, {
            companyId: companyId,
            timeout: 500
        });
}