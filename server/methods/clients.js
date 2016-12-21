import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function getClientUser(id) {
    return Meteor.users.findOne({_id: Meteor.userId()});
}

export function removeClient(client) {
    let companyId = getCurrentUserCompanyId(client.userId);
    Clients.remove({_id: client._id, companyId:companyId});
    Meteor.users.remove({_id: client.userId});
}