Template.listTeams.onCreated(function () {
    let template = Template.instance();
    let self = this;

    template.searchQuery = new ReactiveVar();
    template.searching = new ReactiveVar(false);

    let arr = Session.get('selectedTeamIds');
    if(!arr || arr.length == 0) {
        Session.set('selectedTeamIds', []);
        setTimeout(()=> {
            // Recherche des équipes dont fait parti l'utilisateur actuel
            let currUser = Session.get('currentColeoUser');
            if(!!currUser) {
                let currId = currUser._id;
                let teamsCursor = Teams.find({userIds: {$in: [currId]}});
                if(!!teamsCursor) {
                    let teamIds = teamsCursor.map((team)=>{return team._id});
                    //console.log("teams = ", teamIds);
                    Session.set('selectedTeamIds', teamIds);
                } else {
                    //console.log("l'utilisateur ne fait parti d'aucune équipe");
                }
            } else {
                //console.log("pas d'utilisateur trouvé");
            }
        }, 500);
    }

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

Template.listTeams.onRendered(function () {

});

Template.listTeams.helpers({
    teams: () => {
        if (!Session.get('currentColeoUser')) return null;
        return Teams.find({companyId: Session.get('currentColeoUser').companyId});
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
    },
    btnSelected() {
        let arr = Session.get('selectedTeamIds');
        if(Array.isArray(arr) && arr.indexOf(this._id) > -1) {
            return "btn-fill";
        } else {
            return "";
        }
    }
});

Template.listTeams.events({
    'click .team-members li': teamClickEvent,
    'keyup [name="search"]': searchKeyUpEvent,
    'click button[name="searchButton"]': searchClickEvent,
    'click .selectAll': (evt, template) => {
        let tmIds = Teams.find({hide:false}).map((item)=>{return item._id;});
        Session.set('selectedTeamIds', tmIds);
    },
    'click .unselectAll': (evt, template) => {
        Session.set('selectedTeamIds', []);
    },
    'click .cancelSearch': (evt, template) => {
        template.searchQuery.set('');
        $('.searchTeam').val('');
        Session.set('selectedTeamIds', []);
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
function teamClickEvent(event) {
    let selectedIds = Session.get('selectedTeamIds');
    let id = event.currentTarget.id.substr(15);
    let index = selectedIds.indexOf(id);
    if (index < 0) {
        selectedIds.push(id);
    } else if (index > -1) {
        selectedIds.splice(index, 1);
    }
    Session.set('selectedTeamIds', selectedIds);
}