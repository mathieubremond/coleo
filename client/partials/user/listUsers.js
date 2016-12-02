Template.listUsers.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('users.list');
    });
});

Template.listUsers.helpers({
    users: () => {
        if(!Session.get('currentColeoUser')) return null;
        return ColeoUsers.find({companyId: Session.get('currentColeoUser').companyId});
    }
});