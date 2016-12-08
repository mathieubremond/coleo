import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function updateColeoUser(u) {

    console.log("u vaut = ", u);

    let user = ColeoUsers.findOne({_id:u._id});
    let meteorUser = Meteor.users.findOne({_id:u.userId});

    if(!!user && !!meteorUser) {
        console.log("okokok");
    } else {
        console.log("oups : ", user);
        console.log("oups 2 = ", meteorUser);
        return;
    }

    let meteorUserEmail = meteorUser.emails[0].address;

    if(u.email != meteorUserEmail) {
        console.log("updating email");
        Accounts.addEmail(meteorUser._id, e.email);
        Accounts.removeEmail(meteorUser._id, u.email);
    }

    // On supprime les champs en trop, et on mets les valeurs
    // par default qui vont bien
    console.log("Schema.userSchema.clean(u)");
    Schema.userSchema.clean(u);

    u.companyId = getCurrentUserCompanyId(Meteor.userId());
    u.userId = meteorUser._id;

    // On vérifie que le schéma est correcte
    console.log("u vaut maintenant = ", u);
    Schema.userSchema.validate(u);

    ColeoUsers.update({
        _id: u._id,
        // Vérifie qu'on ne tente pas de modifier un utilisateur d'une autre entreprise
        companyId: getCurrentUserCompanyId(Meteor.userId())
    }, {
        // Modification des informations en bdd
        $set: u
    });

    console.log("update terminé");
}