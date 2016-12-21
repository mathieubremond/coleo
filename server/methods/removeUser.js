import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function removeUser(user) {
    let coleoUser = ColeoUsers.findOne({
        _id: user._id,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    });
    if(!!coleoUser && coleoUser.userId == Meteor.userId()) {
        throw new Meteor.Error(500, 'Impossible de se supprimer soi même.');
    }
    //console.log("coleoUser : ", coleoUser);
    if (!!coleoUser) {
        ColeoUsers.remove({_id: user._id});
        Meteor.users.remove({_id: coleoUser.userId});
        /*//console.log("coleoUser.userId : ", coleoUser.userId);
        let team = Teams.findOne({userIds: [coleoUser._id]});
        console.log("team : ", team);
        if (!!team) {
            Teams.remove({userIds: [coleoUser._id]});
            Tasks.remove({teamId: team._id});
            Teams.update({})
            //console.log("team._id : ", team._id);
        }*/
    }
}