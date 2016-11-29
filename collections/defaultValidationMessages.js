// Surcharge en langue française des messages de validations par default
// Dans les formulaires auto générés
export const defaultValidationMessages = {
    required: "[label] doit être renseigné",
    minString: "[label] doit contenir au moins [min] caractères",
    maxString: "[label] ne peut pas dépasser [max] caractères",
    minNumber: "[label] ne peut être inférieur à [min]",
    maxNumber: "[label] ne peut être supérieur à [max]",
    minDate: "[label] ne peut être avant le [min]",
    maxDate: "[label] ne peut être après le [max]",
    badDate: "[label] n'est pas une date valide",
    minCount: "Vous devez spécifiez au moins [minCount] valeurs",
    maxCount: "Vous devez spécifiez au plus [maxCount] valeurs",
    noDecimal: "[label] doit être un entier",
    notAllowed: "[value] n'est pas autorisé",
    expectedString: "[label] doit être une chaîne de caractères",
    expectedNumber: "[label] doit être un nombre",
    expectedBoolean: "[label] doit être un booléen (1 ou 0, vrai ou faux)",
    expectedArray: "[label] doit être un tableau",
    expectedObject: "[label] doit être un objet",
    expectedConstructor: "[label] doit être du type '[type]'",
    regEx: [
        {msg: "[label] a échoué lors de la vérification de l'expression régulière"},
        {exp: SimpleSchema.RegEx.Email, msg: "[label] doit être une adresse amil valide"},
        {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] doit être une adresse amil valide"},
        {exp: SimpleSchema.RegEx.Domain, msg: "[label] doit être un domaine valide"},
        {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] doit être un domaine valide"},
        {exp: SimpleSchema.RegEx.IP, msg: "[label] doit être une adresse IPv4 ou IPv6"},
        {exp: SimpleSchema.RegEx.IPv4, msg: "[label] doit être une adresse IPv4 valide"},
        {exp: SimpleSchema.RegEx.IPv6, msg: "[label] doit être une adresse IPv6 valide"},
        {exp: SimpleSchema.RegEx.Url, msg: "[label] doit être une URL valide"},
        {exp: SimpleSchema.RegEx.Id, msg: "[label] doit être un ID valide"}
    ],
    keyNotInSchema: "[key] n'est pas autorisé dans ce schéma"
};