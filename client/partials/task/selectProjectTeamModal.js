Template.selectProjectTeamModal.onCreated(function() {
    this.errorMessage = new ReactiveVar();
});

Template.selectProjectTeamModal.events({
    'click .btn-next-modal'(event, template) {

        let pjt = Session.get('selectedProjectIds');
        let tm = Session.get('selectedTeamIds');
        if(!!pjt && pjt.length > 0 && !!tm && tm.length > 0) {
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