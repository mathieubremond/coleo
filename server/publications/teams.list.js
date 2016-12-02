import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listTeams ({search, selectedIds}) {
    check(search, Match.OneOf(String, null, undefined));
    check(selectedIds, Array);

    let query = {},
        projection = {limit: 50, sort: {name: 1}};
    if (search) {
        let regex = new RegExp(search, 'i');
        query = {
            $or: [
                {name: regex},
                {_id: {$in: selectedIds}}
            ]
        };
        projection.limit = 10;
    }
    query.companyId = getCurrentUserCompanyId(this.userId);
    return Teams.find(query, projection);
}