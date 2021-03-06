export let TeamSchema = new SimpleSchema({
        companyId: {
            type: String,
            label: "Company Id",
            autoform: {
                type: 'hidden'
            }
        },
        name: {
            type: String,
            label: "Nom de l'équipe",
            autoform: {
                label: false,
                placeholder: "Nom de l'équipe"
            }
        },
        hide: {
            type: Boolean,
            defaultValue: false,
            label: "Cacher cette équipe",
            optional: true,
            autoform: {
                type: 'hidden'
            }
        },
        userIds: {
            type: [String],
            optional: true,
            defaultValue: []
        }
    }),

    TemporaryTeamSchema = new SimpleSchema({
        name: {
            type: String,
            label: "Nom de l'équipe",
            autoform: {
                label: false,
                placeholder: "Nom de l'équipe"
            }
        },
        userIds: {
            type: [String],
            optional: true,
            defaultValue: []
        },
        id: {
            type: String,
            optional: true,
            autoform: {
                type: 'hidden'
            }
        }
    });