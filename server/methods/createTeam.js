export function createTeam (team) {
    Schema.teamSchema.clean(team);
    let companyId = getCurrentUserCompanyId(Meteor.userId());
    team.companyId = companyId;
    Schema.teamSchema.validate(team);
    Teams.insert(team);
    serverMessages.notify('serverMessage:company', 'Info', 'Équipe ajoutée : ' + team.name, {
        companyId: companyId,
        timeout: 5000
    });
};