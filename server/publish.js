Meteor.publish('companies.find', function() {
    return Companies.find({});
});