Template.listUsers.onCreated(function () {
    let self = this;
    self.autorun(function () {
        self.subscribe('users.list');
        self.subscribe('users.meteor.public');
    });
});

Template.listUsers.helpers({
    users: () => {
        if (!Session.get('currentColeoUser')) return null;
        return ColeoUsers.find({companyId: Session.get('currentColeoUser').companyId});
    },
    email(id) {
        let u = Meteor.users.findOne({_id: id});
        if(!u) return 'nc';
        if(Array.isArray(u.emails) && u.emails.length > 0) {
            return u.emails[0].address;
        } else {
            return 'nc';
        }
    },
    createdAt(id) {
        let u = Meteor.users.findOne({_id: id});
        if(!u) return '...';
        if(!u.createdAt) return '...';
        return u.createdAt.toLocaleDateString();
    }
});