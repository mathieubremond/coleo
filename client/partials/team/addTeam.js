import {Schema} from '../../../lib/api/schemas/index.js';
Template.addTeam.helpers({
    temporaryTeamSchema: () => Schema.temporaryTeamSchema
});
Template.addTeam.onCreated(()=>{
    Session.set('currentPage', 'Équipes');
});