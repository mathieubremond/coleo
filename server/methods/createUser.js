import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function createColeoUser (user) {
    var userId = Accounts.createUser({
        email: user.email,
        password: user.password
    });

    Schema.userSchema.clean(user);

    user.userId = userId;
    let companyId = getCurrentUserCompanyId(Meteor.userId());
    user.companyId = companyId;

    Schema.userSchema.validate(user);
    ColeoUsers.insert(user);

    serverMessages.notify('serverMessage:company', 'Info',
        'Utilisateur ajouté : ' + user.firstName + ' ' + user.lastName, {
            companyId: companyId,
            timeout: 5000
        });

    // On crée une equipe avec le nom de l'utilisateur
    var newTeam = {
        name: user.firstName + " " + user.lastName,
        companyId: user.companyId
    };

    Schema.teamSchema.validate(newTeam);
    Teams.insert(newTeam);
}

export function CreateFirstUser(user) {
    Schema.userSchema.clean(user);
    Schema.userSchema.validate(user);
    ColeoUsers.insert(user);
}