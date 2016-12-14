export function removeUser(user) {
    let coleoUser = ColeoUsers.findOne({_id: user._id});
    //console.log("coleoUser : ", coleoUser);
    if(!!coleoUser) {
        ColeoUsers.remove({_id: user._id});
        Meteor.users.remove({_id: coleoUser.userId});
        //console.log("coleoUser.userId : ", coleoUser.userId);
        let team = Teams.findOne({userId: coleoUser._id});
        //console.log("team : ", team);
        if(!!team) {
            Teams.remove({userId: coleoUser._id});
            Tasks.remove({teamId: team._id});
            //console.log("team._id : ", team._id);
        }
    }
}