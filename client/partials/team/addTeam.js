import {Schema} from '../../../lib/api/schemas/index.js';
Template.addTeam.helpers({
    temporaryTeamSchema: () => Schema.temporaryTeamSchema,
    userOption: () => {
        let users = ColeoUsers.find().fetch();
        let returnArray = [];
        if(!!users)
            users.forEach((user) => {
                //console.log("user = ", user);
                returnArray.push({value: user._id, label: user.firstName+' '+user.lastName});
            });
        return returnArray;
    }
});
Template.addTeam.onCreated(function(){
    Session.set('currentPage', 'Équipes');
    let self = this;
    self.autorun(function(){
        self.subscribe('users.list');
    });
});