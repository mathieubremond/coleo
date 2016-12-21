import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function updateProject(project) {

    //console.log("updating : ", project);

    Schema.projectSchema.validate(project);

    Projects.update({
        _id: project.id,
        companyId: getCurrentUserCompanyId(Meteor.userId())
    }, {$set: project});
}