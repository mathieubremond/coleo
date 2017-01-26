import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function updateUserMail(user) {
    Accounts.addEmail(user._id, user.email);
    Accounts.removeEmail(user._id, user.oldEmail);
    if(user._id == Meteor.userId()) Meteor.logout();
}

export function updateUserPassword(user) {
    Accounts.setPassword(user._id, user.password);
    if(user._id == Meteor.userId()) Meteor.logout();
}

export function updateUserInfo(user) {
    ColeoUsers.update({
        _id: user._id,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    }, {$set: user.$set});

    // Maj de l'équipe correspondant à l'utilisateur
    /*let team = Teams.findOne({userIds: [user._id]});
    console.log("team : ", team);
    if(!!team) {
        Teams.update(team, {$set: {name: user.$set.firstName+' '+user.$set.lastName}});
    }*/
}

export function updateFirstLoginUser({firstLogin}) {
    check(firstLogin, Boolean);
    let userId = Meteor.userId();
    let companyId = getCurrentUserCompanyId(userId);
    ColeoUsers.update({
        userId: userId,
        companyId: companyId
    }, {$set: {firstLogin: firstLogin}});
}