import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function updateTeam(team) {

    let id = team.id;

    Schema.temporaryTeamSchema.clean(team);
    Schema.temporaryTeamSchema.validate(team);

    Teams.update({
        _id: id,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    }, {$set: {name: team.name, userIds: team.userIds}});
}