export let ProjectSchema = new SimpleSchema({
    companyId: {
        type: String,
        label: "Company Id",
        autoform: {
            type: 'hidden'
        }
    },
    name: {
        type: String,
        label: 'Nom du projet'
    },
    desc: {
        type: String,
        label: 'Description',
        optional: true
    },
    hide: {
        type: Boolean,
        defaultValue: false,
        label: "Cacher ce projet"
    }
}),

TemporaryProjectSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Nom du projet',
        autoform: {
            label: false,
            placeholder: "Nom du projet"
        }
    },
    desc: {
        type: String,
        label: 'Description',
        optional: true,
        autoform: {
            label: false,
            placeholder: "Description"
        }
    }
});