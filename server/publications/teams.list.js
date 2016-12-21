import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listTeams ({search, selectedIds}) {
    check(search, Match.OneOf(String, null, undefined));
    check(selectedIds, Array);

    //console.log("args = ", {search:search,selectedIds:selectedIds});

    let query = {},
        projection = {sort: {name: 1}};

    let client = Clients.findOne({userId: this.userId});
    if(!!client) {
        search = true;
        selectedIds = client.teamIds;
    }

    if (search) {
        let regex = new RegExp(search, 'i');
        query = {
            $or: [
                {name: regex},
                {_id: {$in: selectedIds}}
            ]
        };
    }
    query.companyId = getCurrentUserCompanyId(this.userId);
    query.hide = false;
    return Teams.find(query, projection);
}



export function singleTeam(id) {
    let query = {};
    query.companyId = getCurrentUserCompanyId(this.userId);
    query._id = id;
    return Teams.find(query);
}