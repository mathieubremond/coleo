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
        unique: true
    },
    hide: {
        type: Boolean,
        defaultValue: false,
        label: "Cacher cette équipe",
        optional: true
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
    }
});