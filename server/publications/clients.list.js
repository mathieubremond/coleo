import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listClients () {

    let query = {},
        projection = {sort: {name: 1}};
    query.companyId = getCurrentUserCompanyId(this.userId);

    return Clients.find(query, projection);
}

export function singleClient(id) {
    check(id, String);
    return Clients.find({userId: id, companyId: getCurrentUserCompanyId(id)});;
}
export function currentClient() {
    return Clients.find({userId: this.userId});
}