export function createProject (project) {

    Schema.projectSchema.clean(project);

    let companyId = getCurrentUserCompanyId(Meteor.userId());
    project.companyId = companyId;

    Schema.projectSchema.validate(project);
    Projects.insert(project);

    serverMessages.notify('serverMessage:company', 'Info',
        'Projet ajouté : ' + project.name, {
            companyId: companyId,
            timeout: 5000
        });
}