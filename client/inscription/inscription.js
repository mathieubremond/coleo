// Global variable pour l'ux (permet de savoir ou l'utilisateur
// en est dans son inscription (est remis à zero  à la fin)
var INSTANCE = null;

// Création d'un variable reactive
Template.inscription.onCreated(function () {
    this.companyId = new ReactiveVar();
    this.companyId.set(null);

    // Permet de faire un lien, et de récupérer ensuite l'instance du template
    INSTANCE = this;
});

// Ajout d'un hook après la creation de l'entreprise dans la bdd
AutoForm.addHooks(['NewCompanyForm'], {
    after: {
        insert: function (error, result) {
            console.log("instance : " + INSTANCE);
            if (!error) {

                // On retient dans la ReactiveVar companyId l'id de
                // la company tout juste créée
                INSTANCE.companyId.set(result);
                console.log("Id : " + result);
            } else {
                INSTANCE.companyId.set(null);
                console.log("error : " + error);
            }
        }
    }
});

AutoForm.addHooks(['NewColeoUserForm'], {
    before: {
        insert: function (doc) {
            console.log("Before inserting the coleo user");
            var userId = Meteor.userId();
            console.log("User id = " + userId);

            // Ajout des clés étrangères au document coleo user avant insertion
            doc.companyId = INSTANCE.companyId.get();
            doc.userId = userId;

            console.log("doc = " + doc);

            // Et maintenant on laisse autoform sauvegardé le document
            // Avec les clés etrangères qui vont bien
            return doc;
        }
    }
});

Template.inscription.helpers({
    // Un helper pour savoir si l'entreprise a déjà été ajoutée ou non,
    // Permet de modifier le dom en conséquence
    companyCreated: function () {
        return !!Template.instance().companyId.get();
    },
    // Un helper pour savoir on nous en sommes dans le processus d'inscription
    // Depuis le html
    userCreated: function () {
        return !!Meteor.userId();
    }
});