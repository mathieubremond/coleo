import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listProjects ({search, selectedIds}) {
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
    query.hide = false;
    return Projects.find(query, projection);
}