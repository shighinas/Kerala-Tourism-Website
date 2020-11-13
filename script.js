function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];
	this.inputNode = input;
	this.registerListener();
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
    },
    
	getInvalidities: function() {
		return this.invalidities.join('. \n');
    },
    
	checkValidity: function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {
			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}
			var requirementElement = this.validityChecks[i].element;
			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}
			}
		}
    },
    
	checkInput: function() {
		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);
		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
    },
    
	registerListener: function() {
		var CustomValidation = this;
		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
		});

	}

};

var emailValidityChecks = [
    {
		isInvalid: function() {
			return !(emailInput.value.match(/^([a-zA-Z0-9\-.]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/))
		},
		invalidityMessage: 'Invalid Email'
	}
];


var phoneValidityChecks = [
	{
		isInvalid: function(input) {
			return (input.value.match(/[a-zA-Z\+\*\@\#\$\%\^\&\(\)\[\]\{\,\}]/g));
		},
		invalidityMessage: 'Only Numbers are allowed'
	},
	{
		isInvalid: function(input){
			return !((input.value.match(/^[0-9]{10}$/)) || (input.value.match(/^([0-9]{3})\-([0-9]{3})\-([0-9]{4})$/)) || (input.value.match(/^([0-9]{3})\.([0-9]{3})\.([0-9]{4})$/)) || (input.value.match(/^([0-9]{3})\s([0-9]{3})\s([0-9]{4})$/)));
		},
		invalidityMessage: 'Invalid Number'
	}
]


var passwordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 100;
		},
		invalidityMessage: 'This input needs to be atleast 8 characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[0-9]/g);
		},
		invalidityMessage: 'At least 1 number is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[a-z]/g);
		},
		invalidityMessage: 'At least 1 lowercase letter is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[A-Z]/g);
		},
		invalidityMessage: 'At least 1 uppercase letter is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
		},
		invalidityMessage: 'You need one of the required special characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
	}
];

var emailInput = document.getElementById('email');
emailInput.CustomValidation = new CustomValidation(emailInput);
emailInput.CustomValidation.validityChecks = emailValidityChecks;

var phoneInput = document.getElementById('phone');
phoneInput.CustomValidation = new CustomValidation(phoneInput);
phoneInput.CustomValidation.validityChecks = phoneValidityChecks;

var passwordInput = document.getElementById('password');
passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;


var inputs = document.querySelectorAll('input:not([type="submit"])');
var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('registration');
function validate() {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].CustomValidation.checkInput();
	}
}
submit.addEventListener('click', validate());
form.addEventListener('submit', validate);
