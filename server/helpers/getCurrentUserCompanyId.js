export function getCurrentUserCompanyId(id) {
    if(!id) return null;

    let coleoUser = ColeoUsers.findOne(
        {userId: id},
        {fields: {'companyId':1}}
    );

    if(!coleoUser) return null;
    else return coleoUser.companyId;
}