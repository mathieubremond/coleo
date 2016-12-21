export let ClientSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Nom du client"
    },
    teamIds: {
        type: [String],
        minCount: 1,
        label: "Team Ids",
        autoform: {
            type: 'hidden'
        }
    },
    projectIds: {
        type: [String],
        minCount: 1,
        label: "Project Ids",
        autoform: {
            type: 'hidden'
        }
    },
    companyId: {
        type: String,
        label: "Company Id",
        autoform: {
            type: 'hidden'
        }
    },
    userId: {
        type: String,
        label: "Meteor User Id",
        autoform: {
            type: 'hidden' // Cache le champ dans les formulaires générés automatiquement
        },
        unique: true
    }
});