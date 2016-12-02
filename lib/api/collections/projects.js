import {Schema} from '../schemas/index.js';

Projects = new Mongo.Collection('Projects');

if ( Meteor.isServer ) {
    Projects._ensureIndex( { name: 1 } );
}

Projects.deny({
    insert: () => true,
    update: () => true,
    remove: () => true
});

Projects.attachSchema(Schema.projectSchema);
