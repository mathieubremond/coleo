Template.listTeams.onCreated(function () {
    let template = Template.instance();

    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);
    Session.set('selectedTeamIds', []);
});

Template.listTeams.onRendered(function () {
    let self = this;
    let template = Template.instance();

    self.autorun(function () {
        self.subscribe('teams.list', {
            search: template.searchQuery.get(),
            selectedIds: Session.get('selectedTeamIds') || []
        }, function () {
            setTimeout(() => {
                template.searching.set(false);
            }, 300);
        });
    });
});

Template.listTeams.helpers({
    teams: () => {
        if (!Session.get('currentColeoUser')) return null;
        else return Teams.find({companyId: Session.get('currentColeoUser').companyId});
    },
    searching() {
        return Template.instance().searching.get();
    },
    query() {
        return Template.instance().searchQuery.get();
    },
    checked() {
        let arr = Session.get('selectedTeamIds');
        return Array.isArray(arr) && arr.indexOf(this._id) > -1;
    },
    selected() {
        let arr = Session.get('selectedTeamIds');
        if(Array.isArray(arr) && arr.indexOf(this._id) > -1) {
            return "selected";
        } else {
            return "";
        }
    }
});

Template.listTeams.events({
    'click .list-checkbox': teamClickEvent,
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
function teamClickEvent(event) {
    let selectedIds = Session.get('selectedTeamIds');
    let id = event.target.value;
    let index = selectedIds.indexOf(id);
    if (event.target.checked && index < 0) {
        selectedIds.push(id);
    } else if (index > -1) {
        selectedIds.splice(index, 1);
    }
    Session.set('selectedTeamIds', selectedIds);
}
