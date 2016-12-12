import {Schema} from '../schemas/index.js';
import './projects.js';
import './teams.js';

Tasks = new Mongo.Collection('Tasks');

Tasks.attachSchema(Schema.taskSchema);

Tasks.helpers({
    project() {
        let project = Projects.findOne({_id: this.projectId});
        return project;
    },
    projectName() {
        let project = Projects.findOne({_id: this.projectId});
        return project.name;
    },
    team() {
        let team = Teams.findOne({_id: this.teamId});
        return team;
    },
    teamName() {
        let team = Teams.findOne({_id: this.teamId});
        return team.name;
    }
});
