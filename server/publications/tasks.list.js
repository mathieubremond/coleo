import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listTasks({projectIds, teamIds}) {
    let query = {},
        projection = {sort: {createdAt: 1, projectId: 1}};
    if(!!teamIds && teamIds.length > 0) {
        query.teamId= {$in: teamIds};
    }
    if(!!projectIds && projectIds.length > 0) {
        query.projectId= {$in: projectIds};
    }
    query.companyId = getCurrentUserCompanyId(this.userId);
    return Tasks.find(query, projection);
}