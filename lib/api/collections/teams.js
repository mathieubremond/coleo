import {Schema} from '../schemas/index.js';

Teams = new Mongo.Collection('Teams');
Teams.allow({
    update: () => true
});
Teams.attachSchema(Schema.teamSchema);
