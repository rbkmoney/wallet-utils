export enum DocumentTypeEnum {
    RUSDomesticPassportData = 'RUSDomesticPassportData',
    RUSRetireeInsuranceCertificateData = 'RUSRetireeInsuranceCertificateData'
}

export class Document {
    type: DocumentTypeEnum;
    token: string;
}
