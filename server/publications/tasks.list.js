import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function listTasks({projectIds, teamIds}) {
    check(projectIds, Array);
    check(teamIds, Array);

    // On charge le client (peut etre null s'il s'agit d'un user lambda)
    let client = Clients.findOne({userId: this.userId});

    if (teamIds.length == 0 && projectIds.length == 0) return null;

    let companyId = getCurrentUserCompanyId(this.userId);

    let query = {},
        projection = {sort: [["done", "asc"], ["projectId", "asc"], ["createdAt", "desc"]]};

    if (!!projectIds && projectIds.length > 0) {
        query.projectId = {$in: projectIds};
    } else if (!!client) {
        query.projectId = {$in: client.projectIds};
    }
    query.companyId = companyId;

    // on ne prends pas en compte les taches dont l'equipe est cachée
    let hiddenTeamIds = Teams.find({hide: true, companyId: companyId}).map((item) => {
        return item._id
    });
    if (!!hiddenTeamIds && hiddenTeamIds.length > 0) {
        if (!!teamIds && teamIds.length > 0) {
            query.$and = [
                {teamId: {$in: teamIds}},
                {teamId: {$ne: hiddenTeamIds}}
            ];
        } else if (!!client) {
            query.$and = [
                {teamId: {$in: client.teamIds}},
                {teamId: {$ne: hiddenTeamIds}}
            ];
        } else {
            query.teamId = {$ne: hiddenTeamIds};
        }
    } else if (!!teamIds && teamIds.length > 0) {
        query.teamId = {$in: teamIds};
    } else if (!!client) {
        query.teamId = {$in: client.teamIds};
    }

    return Tasks.find(query, projection);
}