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
    }
});

Template.userLine.helpers({
    email(id) {
        let u = Meteor.users.findOne({_id: id});
        if (!u
            || !u.emails
            || !Array.isArray(u.emails)
            || u.emails.length <= 0)
            return 'nc';
        else return u.emails[0].address;
    },
    createdAt(id) {
        let u = Meteor.users.findOne({_id: id});
        if (!u || !u.createdAt) return '...';
        return u.createdAt.toLocaleDateString();
    }
});