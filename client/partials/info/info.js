Template.info.helpers({
/*    createdStr: () => {
        let yesterday = new Date((new Date()).getDate() - 1);
        console.log("yesterday = ", yesterday);
        let nb = Tasks.find({createdAt: {$gt: yesterday}}).count();
        if(!!nb && nb > 0) {
            return nb + " tâches ajoutées depuis hier.";
        } else {
            return "Aucun tâche ajoutée depuis hier.";
        }
    },*/
    userName: () => {
        let u = Session.get('currentColeoUser');
        if(!!u)
            return ' ' + u.firstName + ' ' + u.lastName;
        else
            return "";
    }
});