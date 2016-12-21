import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function createTeam(team) {
    //console.log("team = ", team);
    Schema.teamSchema.clean(team);
    let companyId = getCurrentUserCompanyId(Meteor.userId());
    team.companyId = companyId;
    Schema.teamSchema.validate(team);
    Teams.insert(team);
    serverMessages.notify('serverMessage:company', 'Info', 'Équipe ajoutée : ' + team.name, {
        companyId: companyId,
        timeout: 5000
    });
}