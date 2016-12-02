import {Schema} from '../schemas/index.js';

Tasks = new Mongo.Collection('Tasks');

Tasks.attachSchema(Schema.taskSchema);
