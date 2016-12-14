Template.listProjectsEdit.onCreated(function () {
    let arr = Session.get('selectedProjectIds');
    if(!arr || arr.length == 0) {
        Session.set('selectedProjectIds', []);
    }
});

Template.listProjectsEdit.onRendered(function () {
    let self = this;

    self.autorun(function () {
        self.subscribe('projects.list', {
            search: null,
            selectedIds: Session.get('selectedProjectIds') || []
        });
    });
});

Template.listProjectsEdit.helpers({
    projects() {
        if (!Session.get('currentColeoUser')) return null;
        return Projects.find({companyId: Session.get('currentColeoUser').companyId});
    }
});

Template.listProjectsEdit.events({
    'click .changeStatus': changeStatus,
    'click .removeProject': deleteProject,
    'click .editProject': redirectEditProject
});
function redirectEditProject(event, template) {
    FlowRouter.go('project', {id: this._id});
}

function changeStatus () {
    if(this.hide) {
        Modal.show('setProjectNotDone', this);
    } else {
        Modal.show('setProjectDone', this);
    }
}

function deleteProject() {
    Modal.show('deleteProject', this);
}