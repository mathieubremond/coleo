Template.selectProjectTeamModal.onCreated(function() {
    this.errorMessage = new ReactiveVar();
});

Template.selectProjectTeamModal.events({
    'click .btn-next-modal'(event, template) {

        let pjt = Session.get('selectedProjectIds');
        let tm = Session.get('selectedTeamIds');
        let pjtOk = !!pjt && pjt.length > 0;
        let tmOk = !!tm && tm.length > 0;
        if(pjtOk && tmOk) {
            Modal.hide(template);
            setTimeout(function() {
                Modal.show('addTask');
            }, 600);
            template.errorMessage.set(null);
        } else {
            template.errorMessage.set("Vous devez sélectionner un projet et une équipe.");
        }
    }
});

Template.selectProjectTeamModal.helpers({
    errorMessage: () => {
        return Template.instance().errorMessage.get();
    }
});

function lookForIncorrectIds() {
    let projects = Session.get('selectedProjectIds');
    let teams = Session.get('selectedTeamIds');
    let pjtOk = !!projects && projects.length > 0;
    let tmOk = !!teams && teams.length > 0;
    if(pjtOk) {
        let index = projects.indexOf("");
        if (index > -1) {
            projects.splice(index, 1);
            Session.set('selectedProjectIds', projects);
        }
    }
    if(tmOk) {
        let index = teams.indexOf("");
        if (index > -1) {
            teams.splice(index, 1);
            Session.set('selectedTeamIds', teams);
        }
    }
}