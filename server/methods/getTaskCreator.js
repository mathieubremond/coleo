import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function getTaskCreator(id) {

    let task = Tasks.findOne({
        _id:id,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    });
    console.log("task = ", task);

    if(!task) return null;

    let creator = ColeoUsers.findOne({
        userId: task.creatorId,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    });
    console.log("creator = ", creator);

    return !!creator ? creator : null;
}