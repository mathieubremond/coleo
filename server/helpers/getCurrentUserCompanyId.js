export function getCurrentUserCompanyId(id) {
    if(!id) return null;

    let coleoUser = ColeoUsers.findOne(
        {userId: id},
        {fields: {'companyId':1}}
    );

    if(!coleoUser) {
        let client = Clients.findOne(
            {userId: id},
            {fields: {'companyId':1}}
        );
        if(!client) {
            return null;
        } else {
            return client.companyId;
        }
    }
    else return coleoUser.companyId;
}