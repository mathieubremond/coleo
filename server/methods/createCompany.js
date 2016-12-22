import {Schema} from '../../lib/api/schemas/index.js';
/*
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';
*/

export function createCompany (company) {

    //console.log("company = ", company);

    Schema.projectSchema.clean(company);

    return Companies.insert(company);
}