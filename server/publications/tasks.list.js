import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listTasks({projectIds, teamIds}) {
    let query = {
            $or: [
                {teamId: {$in: teamIds}},
                {projectId: {$in: projectIds}}
            ]
        },
        projection = {limit: 100, sort: {createdAt: 1}};

    query.companyId = getCurrentUserCompanyId(this.userId);
    return Tasks.find(query, projection);
}