// On écoute les notifications de la part du serveur
serverMessages.listen('serverMessage:company', function (subject, message, options) {
    if(options.companyId == Session.get("currentColeoUser").companyId) {

        // Ne notifie que les utilisateurs de la même entreprise que celle de l'emetteur
        //Notifications.info(subject, message, options);
        showNotification('top', 'right', subject, message);
    }
});
function showNotification(from, align, subject, message){
    let type = ['','info','success','warning','danger'];

    $.notify({
        icon: "ti-gift",
        subject: subject,
        message: message
    },{
        type: 'info',
        timer: 2000,
        placement: {
            from: from,
            align: align
        }
    });
}