import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function createColeoUser(user) {
    let userId = Accounts.createUser({
        email: user.email,
        password: user.password
    });

    Schema.userSchema.clean(user);

    user.userId = userId;
    let companyId = getCurrentUserCompanyId(Meteor.userId());
    user.companyId = companyId;
    user.firstLogin = true;

    Schema.userSchema.validate(user);
    let newId = ColeoUsers.insert(user);

    serverMessages.notify('serverMessage:company', 'Info',
        'Utilisateur ajouté : ' + user.firstName + ' ' + user.lastName, {
            companyId: companyId,
            timeout: 3000
        });

    // On crée une equipe avec le nom de l'utilisateur
    let newTeam = {
        name: user.firstName + " " + user.lastName,
        companyId: user.companyId,
        userIds: [newId]
    };

    Schema.teamSchema.clean(newTeam);
    Teams.insert(newTeam);
}

export function createFirstUser(user) {
    console.log("first user = ", user);

    Schema.userSchema.clean(user);
    user.firstLogin = true;
    Schema.userSchema.validate(user);
    let newId = ColeoUsers.insert(user);


    // On crée une equipe avec le nom de l'utilisateur
    let newTeam = {
        name: user.firstName + " " + user.lastName,
        companyId: user.companyId,
        userIds: [newId]
    };

    Schema.teamSchema.clean(newTeam);
    Teams.insert(newTeam);

    return newId;
}

export function createClientUser(newClient) {
    //console.log("create client : ", newClient);
    let companyId = getCurrentUserCompanyId(Meteor.userId());
    newClient.userId = null;
    newClient.companyId = companyId;
    try {
        let userId = Accounts.createUser({
            email: newClient.email,
            password: newClient.password
        });

        newClient.userId = userId;

        Schema.clientSchema.clean(newClient);
        Schema.clientSchema.validate(newClient);

        //console.log("create clean client : ", newClient);

        let client =  Clients.insert(newClient);

        serverMessages.notify('serverMessage:company', 'Info',
            'Client ajouté : ' + newClient.name, {
                companyId: companyId,
                timeout: 3000
            });

        return client;

    } catch (e) {
        //console.log("e = ", e);

        if(!!newClient.userId)
            Meteor.users.remove({_id: newClient.userId});

        throw e;
    }
}

export function createMetorUser({email, password}) {
    return Accounts.createUser({
        email: email,
        password: password
    });
}