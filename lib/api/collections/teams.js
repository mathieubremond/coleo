import {Schema} from '../schemas/index.js';

Teams = new Mongo.Collection('Teams');

Teams.attachSchema(Schema.teamSchema);
