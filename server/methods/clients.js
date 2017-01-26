import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function getClientUser(id) {
    return Meteor.users.findOne({_id: Meteor.userId()});
}

export function removeClient(client) {
    let companyId = getCurrentUserCompanyId(client.userId);
    let userId = client.userId;
    // Suppression du client
    Clients.remove({_id: client._id, companyId:companyId});

    // Avant de supprimer l'utilisateur Meteor associé au client,
    // on vérifie qu'il n'a pas un compte payant Coleo
    // (il serait malheureux de supprimer un utilisateur qui paie)
    let coleoUser = ColeoUser.findOne({userId: userId});
    if(!coleoUser) {
        Meteor.users.remove({_id: client.userId});
    } else {
        console.log("Le client "+client.name+" est associé au compte Coleo "+coleoUser.firstName+" "+coleoUser.lastName);
    }
}

export function updateClient(client) {
    let companyId = getCurrentUserCompanyId(Meteor.userId());

    Clients.update({
        _id: client._id,
        companyId: companyId
    }, {$set: {name: client.name, teamIds: client.teamIds, projectIds: client.projectIds}});
}