export let CompanySchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Nom',
        unique: true, // Chaque entreprise doit posséder un nom unique
        autoform: {
            label: false,
            placeholder: "Nom"
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