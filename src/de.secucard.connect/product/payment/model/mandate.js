export class Mandate {

    constructor(merchant, created, updated, iban, bic, type, dateOfSignature, status, identification) {
        this.merchant = merchant;
        this.created = created;
        this.updated = updated;
        this.iban = iban;
        this.bic = bic;
        this.type = type;
        this.date_of_signature = dateOfSignature;
        this.status = status;
        this.identification = identification;
    }

}
