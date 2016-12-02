import {Schema} from '../../../lib/api/schemas/index.js';
Template.addProject.helpers({
    temporaryProjectSchema: () => Schema.temporaryProjectSchema
});
Template.addProject.onCreated(()=>{
    Session.set('currentPage', 'Projets');
});