import {Schema} from '../../lib/api/schemas/index.js';

/**
 * Unused !
 *
 * @param project
 */
export function updateProject(project) {

    console.log("updating : ", project);

    Schema.projectSchema.validate(project);

    Projects.update({_id: project.id}, {$set: project});
}