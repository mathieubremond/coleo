Template.listClients.onCreated(function() {
    let self = this;
    self.autorun(()=>{
        self.subscribe('clients.list');
        self.subscribe('users.meteor.public');
    });
});

Template.listClients.helpers({
    clients: () => {
        return Clients.find();
    }
});

Template.listClientsRow.events({
    'click .delete-client'(event, template) {
        Modal.show('deleteClient', this);
    }
});

Template.listClientsRow.helpers({
    email(id) {
        let u = Meteor.users.findOne({_id: id});
        if (!u
            || !u.emails
            || !Array.isArray(u.emails)
            || u.emails.length <= 0)
            return 'nc';
        else return u.emails[0].address;
    }
});