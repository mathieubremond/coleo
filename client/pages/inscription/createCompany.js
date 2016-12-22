Template.createCompany.events({
    'submit form': verifyForm
});

Template.createCompany.onRendered(()=>{hideError();});

function verifyForm(event) {
    event.preventDefault();

    // On vérifie que les cgv ont été acceptées
    if($('#cgu_agreement').prop('checked') == false) {
        showError("Erreur : Vous devez acceptez les conditions générales de ventes.");
        return;
    }

    let companyName = $('#companyName').val();
    let companyDesc = $('#companyDesc').val();

    if (!companyName) {
        console.log("companyName = ", companyName);
        showError("Attention : Le nom de l'entreprise doit être renseigné !");
        return;
    }

    // Y a t il deja une company avec le meme non en base
    let c = Meteor.call('companies.findByName', companyName, (err, c) => {
        if(!!c) {
            console.log("c = ", c);
            showError("Erreur : Une entreprise du même nom existe déjà.");
            return;
        }

        // Passage à l'étape d'apres
        Session.set('inscriptionCompany', {name:companyName, desc:companyDesc});
        Session.set('inscriptionStep', 'admin');
    });
}

function showError(text) {
    let $error = $('#help-block-create-company');
    let $alertError = $('.alert-danger');
    $error.text(text);
    $alertError.fadeIn( "slow" );
    //setTimeout(hideError, 5000);
}
function hideError() {
    let $alertError = $('.alert-danger');
    $alertError.fadeOut( "slow" );
}