console.log(secucardTokenizer);
let tokenizer = secucardTokenizer.create();

tokenizer.createToken({
    type: "creditcard",
    data: {
        pan: "1234567890123456",
        cvc: "123",
        expiry_month: parseInt("12"),
        expiry_year: parseInt("2018"),
        card_holder: "Name Karte"
    }
}, function (result, xhr) {
    console.log('test token', result, xhr);
});
