import {Schema} from '../schemas/index.js';
import './projects.js';
import './teams.js';

Tasks = new Mongo.Collection('Tasks');

Tasks.attachSchema(Schema.taskSchema);

Tasks.helpers({
    project() {
        let project = Projects.findOne({_id: this.projectId});
        if(!!project)
            return project;
        else
            return null;
    },
    projectName() {
        let project = Projects.findOne({_id: this.projectId});
        if(!!project)
            return project.name;
        else
            return "";
    },
    team() {
        let team = Teams.findOne({_id: this.teamId});
        if(!!team)
            return team;
        else
            return null;
    },
    teamName() {
        let team = Teams.findOne({_id: this.teamId});
        if(!!team)
            return team.name;
        else
            return "";
    }
});
