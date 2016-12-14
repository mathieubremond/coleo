Template.listProjects.onCreated(function () {
    let template = Template.instance();

    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

    let arr = Session.get('selectedProjectIds');
    if(!arr || arr.length == 0) {
        Session.set('selectedProjectIds', []);
    }
});

Template.listProjects.onRendered(function () {
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

Template.listProjects.helpers({
    projects() {
        if (!Session.get('currentColeoUser')) return null;
        return Projects.find({hide:false,companyId: Session.get('currentColeoUser').companyId});
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
    btnSelected() {
        let arr = Session.get('selectedProjectIds');
        if(Array.isArray(arr) && arr.indexOf(this._id) > -1) {
            return "btn-fill";
        } else {
            return "";
        }
    }
});

Template.listProjects.events({
    'click .projects-item li': projectClickEvent,
    'keyup [name="search"]': searchKeyUpEvent,
    'click button[name="searchButton"]': searchClickEvent,
    'click .selectAll': (evt, template) => {
        let pjtIds = Projects.find({hide:false}).map((item)=>{return item._id;});
        Session.set('selectedProjectIds', pjtIds);
    },
    'click .unselectAll': (evt, template) => {
        Session.set('selectedProjectIds', []);
    },
    'click .cancelSearch': (evt, template) => {
        template.searchQuery.set('');
        $('.searchProject').val('');
        Session.set('selectedProjectIds', []);
    }
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