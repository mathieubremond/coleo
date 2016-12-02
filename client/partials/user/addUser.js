import {Schema} from '../../../lib/api/schemas/index.js';
Template.addUser.helpers({
   temporaryUserSchema: function() {
       return Schema.temporaryUserSchema;
   }
});