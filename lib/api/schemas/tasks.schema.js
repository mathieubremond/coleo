export let TaskSchema = new SimpleSchema({
        name: {
            type: String,
            label: "Nom de la tâche"
        },
        desc: {
            type: String,
            label: 'Description',
            optional: true
        },
        done: {
            type: Boolean,
            label: 'Terminé',
            defaultValue: false,
            autoform: {
                type: 'hidden'
            }
        },
        time: {
            type: Number,
            label: "Temps passé",
            defaultValue: 0,
            min: 0,
            decimal: true

        },
        createdAt: {
            type: Date,
            label: "Date de creation",
            defaultValue: new Date(),
            autoform: {
                type: 'hidden'
            }
        },
        completedAt: {
            type: Date,
            label: "Date de fin",
            optional: true,
            autoform: {
                type: 'hidden'
            }
        },
        deadline: {
            type: String,
            label: "Deadline",
            defaultValue:
                "..."
        },
        companyId: {
            type: String,
            label: "Company Id",
            autoform: {
                type: 'hidden'
            }
        },
        projectId: {
            type: String,
            label: "Project Id",
            autoform: {
                type: 'hidden'
            }
        },
        teamId: {
            type: String,
            label: "Team Id",
            autoform: {
                type: 'hidden'
            }
        }
    }),

    TemporaryTaskSchema = new SimpleSchema({
        name: {
            type: String,
            label: "Nom de la tâche"
        },
        desc: {
            type: String,
            label: 'Description',
            optional: true
        },
        deadline: {
            type: String,
            label: "Deadline",
            defaultValue:
                "..."
        },
        time: {
            type: Number,
            label: "Temps passé",
            defaultValue: 0,
            min: 0,
            decimal: true
        },
        done: {
            type: Boolean,
            label: 'Terminé',
            defaultValue: false
        },
        projectId: {
            type: String,
            label: "Projet"
        },
        teamId: {
            type: String,
            label: "Équipe"
        }
    });