export interface CertificationsForm {
    name:string,
    issuingOrganisation:string,
    issueDate : Date | string,
    expiryDate ?: Date | string,
    credentials ?: {
        id:string,
        url:string
    }
    category ?: string 
}
