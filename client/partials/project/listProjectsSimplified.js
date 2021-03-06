Template.listProjectsSimplified.onCreated(function () {
    let template = Template.instance();

    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

    let arr = Session.get('selectedProjectIds');
    if(!arr || arr.length == 0) {
        Session.set('selectedProjectIds', []);
    }
});

Template.listProjectsSimplified.onRendered(function () {
    let self = this;
    let template = Template.instance();

    self.autorun(function () {
        self.subscribe('projects.list', {
            search: template.searchQuery.get(),
            selectedIds: Session.get('selectedProjectIds') || []
        }, function () {
            setTimeout(() => {
                template.searching.set(false);
            }, 300);
        });
    });
});

Template.listProjectsSimplified.helpers({
    projects() {
        let coleo = Session.get('currentColeoUser');
        let client = Session.get('currentClientUser');
        if (!coleo && !client) return null;
        if(!!coleo) {
            return Projects.find({companyId: Session.get('currentColeoUser').companyId});
        } else if(!!client) {
            return Projects.find({companyId: Session.get('currentClientUser').companyId});
        }
    },
    searching() {
        return Template.instance().searching.get();
    },
    query() {
        return Template.instance().searchQuery.get();
    },
    checked() {
        let arr = Session.get('selectedProjectIds');
        return Array.isArray(arr) && arr.indexOf(this._id) > -1;
    },
    selected() {
        let arr = Session.get('selectedProjectIds');
        if(Array.isArray(arr) && arr.indexOf(this._id) > -1) {
            return "selected";
        } else {
            return "";
        }
    },
    liSelected() {
        let arr = Session.get('selectedProjectIds');
        if(Array.isArray(arr) && arr.indexOf(this._id) > -1) {
            return "liSelected";
        } else {
            return "";
        }
    }
});

Template.listProjectsSimplified.events({
    'click .projects-item li': projectClickEvent,
    'keyup [name="search"]': searchKeyUpEvent,
    'click button[name="searchButton"]': searchClickEvent
});

function searchKeyUpEvent(event, template) {
    let value = event.target.value.trim();
    // Si la valeur de la recherche a pas changée,
    // et que le keyup = Return
    if (value !== template.searchQuery.get() && event.keyCode === 13) {
        if (value !== '')
            template.searching.set(true);
        template.searchQuery.set(value);
    } else if (value !== template.searchQuery.get() && value === '') {
        template.searchQuery.set(value);
    }
}
function searchClickEvent(event, template) {
    let value = $('input[name=search]').val().trim();
    // Si la valeur de la recherche n'a pas changée,
    // on ne fait rien
    if (value !== template.searchQuery.get()) {
        if (value !== '') template.searching.set(true);
        template.searchQuery.set(value);
    }
}
function projectClickEvent(event) {
    let selectedIds = Session.get('selectedProjectIds');
    let id = event.currentTarget.id.substr(15);
    let index = selectedIds.indexOf(id);
    if (index < 0) {
        selectedIds.push(id);
    } else if (index > -1) {
        selectedIds.splice(index, 1);
    }
    Session.set('selectedProjectIds', selectedIds);
}