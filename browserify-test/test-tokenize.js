console.log(secucardTokenizer);
var tokenizer = secucardTokenizer.create({
    host: "https://tokenizer.testing.secupay-ag.net", 
    clientId: undefined,
    hiddenInputName: 'secupayToken'
});

var form = document.getElementById('payment-form');
tokenizer.validate(form);

// setup handler for submit button, submit only when token is created
var submit = document.getElementById('submit');
submit.onclick = function () {
    
    console.log('Check token here');
    
    tokenizer.validate(form, function (result) {
        console.log(result);
    }, function(errors) {
        console.error(errors);
    });
    
    return false;
    
};