Template.createAdmin.onRendered(() => {
    $('.info-password').tooltip({title: "6 caractères minimum", animation: true});
    hideError();
});
Template.createAdmin.events({
    'submit form': verifyForm
});
function verifyForm(event) {
    event.preventDefault();

    let company = Session.get('inscriptionCompany');
    if (!company) {
        showError("Erreur : une erreur s'est produite. Veuillez recharger la page. (0)");
        return;
    }

    let lastName = $('#adminLastName').val();
    let firstName = $('#adminFirstName').val();
    let password = $('#adminPassword').val();
    let passwordConfirmation = $('#adminPasswordConfirmation').val();
    let email = $('#adminEmail').val();

    // Divers check de la cohérence des données saisies

    if (!lastName || !firstName) {
        showError("Attention : vous devez renseigner votre prénom et votre nom.");
        return;
    }

    if (!validatePasswordComplexity(password)) {
        showError("Attention : le mot de passe doit contenir au moins 6 caractères.");
        return;
    }

    if (!validatePasswordConfirmation(password, passwordConfirmation)) {
        showError("Attention : le mot de passe et sa confirmation doivent être identiques.");
        return;
    }

    if (!validateEmail(email)) {
        showError("Attention : votre adresse mail n'est pas valide.");
        return;
    }

    if(!checkStringLength([lastName,firstName,password,passwordConfirmation,email])) {
        showError("Attention : au moins une des chaînes de caractères est trop grande.");
        return;
    }

    // Sauvegarde

    checkEmail(email, () => {
        // Le compte n'existe pas
        createCompany({name: company.name, desc: company.desc}, ({companyId}) => {
            console.log("arg companyId = ", companyId);
            createUser({email: email, password: password, companyId:companyId}, ({userId}) => {
                console.log("arg userId = ", userId);
                createColeoUser({
                    firstName: firstName,
                    lastName: lastName,
                    companyId: companyId,
                    userId: userId
                }, () => {
                    console.log("Inscription completed !");
                    Session.set('inscriptionStep', 'confirmation');
                });
            });
        });
    }, () => {
        // Cas ou le mail est déjà utilisé
        // On vérifie qu'il ne s'agit pas d'un compte de type 'Client'
        // Dans ce cas, on pourra créer un compte Coleo classique
        // TODO Chemin pour création compte Coleo classique si compte Client existe déjà
    });
}

function createCompany({name, desc}, callback) {
    Meteor.call('companies.create', {name: name, desc: desc}, (err, companyId) => {
        console.log("err = ", err);
        console.log("companyId = ", companyId);
        if (!!err || !companyId) {
            showError("Erreur : une erreur s'est produite. Veuillez recharger la page. (1)");
            return;
        }
        callback({companyId:companyId});
    });
}

function createUser({email, password, companyId}, callback) {
    Meteor.call('users.createMeteorUser',{
        email: email,
        password: password
    }, (err, userId) => {
        console.log("companyId, ", companyId, " & userId, ", userId);
        console.log("err = ", err);
        if (!!err) {
            showError("Erreur : une erreur s'est produite. Veuillez recharger la page. (2)");
            return;
        }
        callback({userId:userId});
    });
}


function createColeoUser({
    firstName,
    lastName,
    companyId,
    userId
}, callback) {
    Meteor.call('users.createFirstUser', {
        firstName: firstName,
        lastName: lastName,
        companyId: companyId,
        userId: userId
    }, (err, coleoUserId) => {
        console.log("err = ", err);
        console.log("coleoUserId = ", coleoUserId);
        if (!!err || !coleoUserId) {
            showError("Erreur : une erreur s'est produite. Veuillez recharger la page. (3)");
            return;
        }
        callback();
    });
}


function showError(text) {
    let $error = $('#help-block-create-company');
    let $alertError = $('.alert-danger');
    $error.text(text);
    $alertError.fadeIn("slow");
    //setTimeout(hideError, 5000);
}

function hideError() {
    let $alertError = $('.alert-danger');
    $alertError.fadeOut("slow");
}

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function checkEmail(mail, callback, callbackError) {
    Meteor.call('users.findByEmail', mail, (err, user) => {
        console.log("err = ", err);
        console.log("user = ", user);
        if (!!err || !!user) {
            showError("Erreur : cette adresse mail est déjà utilisée.");
            callbackError();
            return;
        }
        callback();
    });
}

function validatePasswordComplexity(password) {
    let re = /^[ -~]{6,50}$/;
    return re.test(password);
}

function validatePasswordConfirmation(password, passwordConfirmation) {
    return password === passwordConfirmation;
}

function checkStringLength(str) {
    //let re = /^[ -~]{1,50}$/;
    let isOk = true;
    str.forEach((item) => {
         if(str.length >= 50) {
             console.log("item ", item, " est trop grand!");
             isOk = false;
         }
    });
    return isOk;
}