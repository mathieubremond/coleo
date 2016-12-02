export let UserSchema = new SimpleSchema({
    lastName: {
        type: String,
        label: 'Nom',
        autoform: {
            label: false,
            placeholder: "Nom"
        }
    },
    firstName: {
        type: String,
        label: "Prénom",
        autoform: {
            label: false,
            placeholder: "Prénom"
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
}),

TemporaryUserSchema = new SimpleSchema({
    lastName: {
        type: String,
        label: 'Nom',
        autoform: {
            label: false,
            placeholder: "Nom"
        }
    },
    firstName: {
        type: String,
        label: "Prénom",
        autoform: {
            label: false,
            placeholder: "Prénom"
        }
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        autoform: {
            label: false,
            placeholder: "Email"
        }
    },
    password: {
        type: "String",
        label: "Mot de passe",
        min: 6,
        autoform: {
            label: false,
            placeholder: "Mot de passe"
        }
    }
});