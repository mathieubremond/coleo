import {Schema} from '../../../lib/api/schemas/index.js';

Template.updateUser.onCreated(function() {
    SimpleSchema.debug = true;
    let self = this;
    self.autorun(function () {
        let id = FlowRouter.getParam('id');
        self.subscribe('users.single', id);
        self.subscribe('users.meteor.public');
    });
});

Template.updateUser.helpers({
    temporaryUserSchema: () => Schema.temporaryUserSchema,
    user() {
        let id = FlowRouter.getParam('id');
        let u = ColeoUsers.findOne({_id:id});
        let meteorUser = Meteor.users.findOne({_id: u.userId});
        if (!!meteorUser
            && !!meteorUser.emails
            && Array.isArray(meteorUser.emails)
            && meteorUser.emails.length > 0)
            u.email = meteorUser.emails[0].address;
        return u;
    }
});

Template.updateUser.events({
    'click button'() {FlowRouter.go('users')}
});