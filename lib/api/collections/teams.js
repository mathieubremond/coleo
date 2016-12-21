import {Schema} from '../schemas/index.js';

Teams = new Mongo.Collection('Teams');
Teams.allow({
    update: () => true
});
Teams.attachSchema(Schema.teamSchema);

Teams.helpers({
    users() {
        if(!this.userIds) this.userIds = [];
        let users = ColeoUsers.find({_id: {$in: this.userIds}});
        if(!!users) return users.fetch();
        else return null;
    }
});
