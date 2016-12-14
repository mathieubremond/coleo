import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function updateUserMail(user) {
    Accounts.addEmail(user._id, user.email);
    Accounts.removeEmail(user._id, user.oldEmail);
}

export function updateUserPassword(user) {
    Accounts.setPassword(user._id, user.password);
}

export function updateUserInfo(user) {
    ColeoUsers.update({
        _id: user._id,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    }, {$set: user.$set});

    // Maj de l'équipe correspondant à l'utilisateur
    let team = Teams.findOne({userId: user._id});
    if(!!team) {
        Teams.update(team, {$set: {name: user.$set.firstName+' '+user.$set.lastName}});
    }
}