import {mailTemplate} from './mailTemplate.js';

// Modification de Account (by Meteor)
AccountsTemplates.configure({
    hideSignInLink: true,
    hideSignUpLink: true,
    sendVerificationEmail: true,
});
AccountsTemplates.avoidRedirect = true;
Accounts.emailTemplates = mailTemplate;

if(Meteor.isServer) {
    let loginAttemptVerifier = function(parameters) {
        if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
            // return true if verified email, false otherwise.
            let found = _.find(
                parameters.user.emails,
                function (thisEmail) {
                    return thisEmail.verified
                }
            );

            if (!!found) {
                return found && parameters.allowed;
            } else {
                Meteor.setTimeout(function() {
                    console.log('Mail de confirmation envoyé à ', parameters.user.emails);
                    Accounts.sendVerificationEmail(parameters.user._id);
                }, 1000);
                throw new Meteor.Error(500, 'Un mail de confirmation vient de vous être envoyé.');
            }
        }
    };
    Accounts.validateLoginAttempt(loginAttemptVerifier);

    Accounts.onCreateUser(function(options, user) {
        console.log("passage dans OnCreateUser : ", user);
        user.profile = {};

        // we wait for Meteor to create the user before sending an email
        Meteor.setTimeout(function() {
            Accounts.sendVerificationEmail(user._id);
        }, 2 * 1000);

        return user;
    });
}
