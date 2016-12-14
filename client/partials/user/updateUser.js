import {Schema} from '../../../lib/api/schemas/index.js';

Template.updateUser.onCreated(function () {
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
    user: () => {
        let id = FlowRouter.getParam('id');
        let u = ColeoUsers.findOne({_id: id});
        if (!u) return null;
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
    'click .delete'(){
        Modal.show('removeUserModal');
    },
    'click .updateInfo'(event, template) {

        let valueInfo = AutoForm.getFormValues('editUserInfo');
        let valueMail = AutoForm.getFormValues('editUserMail');
        let valuePassword = AutoForm.getFormValues('editUserPassword');

        let id = FlowRouter.getParam('id');
        if (!id) return null;
        let coleoUser = ColeoUsers.findOne({_id: id});
        if (!coleoUser) return null;
        let meteorUser = Meteor.users.findOne({_id: coleoUser.userId});
        if (!meteorUser) return null;

        console.log("values : ", [valueInfo, valueMail, valuePassword]);

        if (coleoUser.firstName != valueInfo.insertDoc.firstName
            || coleoUser.lastName != valueInfo.insertDoc.lastName) {
            valueInfo.updateDoc._id = coleoUser._id;
            Meteor.call('users.updateInfo', valueInfo.updateDoc,
                (err) => {
                    console.log("err info : ", err);
                });
        }

        if (!!valuePassword.insertDoc && !!valuePassword.updateDoc.$set) {
            valuePassword.insertDoc._id = meteorUser._id;
            Meteor.call('users.updatePassword', valuePassword.insertDoc,
                (err) => {
                    console.log("err password : ", err);
                });
        }

        // Modification de l'adresse mail
        // TODO FIX
        /*if (!!meteorUser
         && !!meteorUser.emails
         && Array.isArray(meteorUser.emails)
         && meteorUser.emails.length > 0) {

         let originalEmail = meteorUser.emails[0].address;
         if (originalEmail != valueMail.email) {
         valueMail.insertDoc.oldEmail = originalEmail;
         valueMail.insertDoc._id = meteorUser._id;
         Meteor.call('users.updateMail', valueMail.insertDoc,
         (err) => {
         console.log("err mail : ", err);
         });
         }
         }*/

        FlowRouter.go('users');
    }
});