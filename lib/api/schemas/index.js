import {TemporaryUserSchema, UserSchema} from  './coleoUsers.schema.js';
import {CompanySchema} from './companies.schema.js';
import {ProjectSchema, TemporaryProjectSchema} from './projects.schema.js';
import {TeamSchema, TemporaryTeamSchema} from './teams.schema.js';
import {TaskSchema, TemporaryTaskSchema} from './tasks.schema.js';
import {defaultValidationMessages} from '../../helpers/defaultValidationMessages.js';

if (Meteor.isClient) {
    CompanySchema.messages(defaultValidationMessages);
    CompanySchema.messages({
        "notUnique name": "Une entreprise du même nom utilise déjà Coleo."
    });

    UserSchema.messages(defaultValidationMessages);
    TemporaryUserSchema.messages(defaultValidationMessages);

    ProjectSchema.messages(defaultValidationMessages);
    TemporaryProjectSchema.messages(defaultValidationMessages);

    TeamSchema.messages(defaultValidationMessages);
    TemporaryTeamSchema.messages(defaultValidationMessages);

    TaskSchema.messages(defaultValidationMessages);
    TemporaryTaskSchema.messages(defaultValidationMessages);
}

export let Schema = {
    temporaryUserSchema: TemporaryUserSchema,
    temporaryProjectSchema: TemporaryProjectSchema,
    userSchema: UserSchema,
    companySchema: CompanySchema,
    projectSchema: ProjectSchema,
    teamSchema: TeamSchema,
    temporaryTeamSchema: TemporaryTeamSchema,
    taskSchema: TaskSchema,
    temporaryTaskSchema: TemporaryTaskSchema
};