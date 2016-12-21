import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listProjects ({search, selectedIds}) {
    check(search, Match.OneOf(String, null, undefined));
    check(selectedIds, Array);

    let query = {},
        projection = {sort: {name: 1}};

    let client = Clients.findOne({userId: this.userId});
    if(!!client) {
        search = true;
        selectedIds = client.projectIds;
    }

    if (search) {
        //console.log("searching...");
        let regex = new RegExp(search, 'i');
        query = {
            $or: [
                {name: regex},
                {_id: {$in: selectedIds}}
            ]
        };
    }
    query.companyId = getCurrentUserCompanyId(this.userId);
    return Projects.find(query, projection);
}

export function singleProject(id) {
    let query = {};
    query.companyId = getCurrentUserCompanyId(this.userId);
    query._id = id;
    return Projects.find(query);
}