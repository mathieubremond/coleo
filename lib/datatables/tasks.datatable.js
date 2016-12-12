import Tabular from 'meteor/aldeed:tabular';

new Tabular.Table({
    name: "Tasks",
    collection: Tasks,
    columns: [
        {
            data: "done",
            title: "État",
            render: function (val, type, doc) {
                return val ? "Terminée" : "En cours";
            }
        },
        {data: "name", title: "Nom"},
        {data:"createdAt", title: "Date de création", visible: false},
        {
            data: "projectId",
            title: "Projet ID",
            visible: false
        },
        {
            data: "teamId",
            title: "Équipe ID",
            visible: false
        },
        {
            data: "projectName()",
            title: "Projet"
        },
        {
            data: "teamName()",
            title: "Équipe"
        },
        {data: "time", title: "Temps passé",
            render: function (val, type, doc) {
            return val + " h";
        }},
        {data: "deadline", title: "Deadline"},
        {
            title: "Action",
            tmpl: Meteor.isClient && Template.taskActionCell
        }
    ],
    search: {
        caseInsensitive: true,
        smart: true,
        onEnterOnly: true,
    },
    paging: false,
    responsive: true,
    autoWidth: false,
    throttleRefresh: 1000,
    limit: 500,
    language: {
        "decimal":        "",
        "emptyTable":     "Aucune tâche. Sélectionnez un projet ou un équipe.",
        "info":           "_TOTAL_ tâches",
        "infoEmpty":      "0 tâche",
        "infoFiltered":   "(filtré depuis _MAX_ tâches)",
        "infoPostFix":    "",
        "thousands":      " ",
        "lengthMenu":     "Montrer _MENU_ tâches",
        "loadingRecords": "Chargement en cours...",
        "processing":     "Chargement en cours...",
        "search":         "Rechercher:",
        "zeroRecords":    "Aucun résultat correspondant",
        "paginate": {
            "first":      "Premier",
            "last":       "Dernier",
            "next":       "Suivant",
            "previous":   "Précédent"
        },
        "aria": {
            "sortAscending":  ": tri croissant de la colonne",
            "sortDescending": ": tri décroisant de la colonne"
        }
    },

});