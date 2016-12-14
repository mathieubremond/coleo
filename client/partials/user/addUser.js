import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';

Template.addUser.helpers({
   temporaryUserSchema: function() {
       return Schema.temporaryUserSchema;
   }
});

AutoForm.hooks({
    AddColeoUserForm: {
        onError: function(formType, err) {
            if(!!err && !!err.reason) {
                showNotificationError('top', 'right', 'Erreur', err.reason);
            }
        }
    }
});