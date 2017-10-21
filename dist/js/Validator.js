function Validator() {
	this.data_step_1 = {};
	this.data_step_2 = {};
	this.data_step_3 = {};
	this.data_step_4 = {};
	this.data_step_5 = {};
	this.data_step_6 = {};
	this.data_step_7 = {};
	this.class_invalid = 'invalid';
	this.class_default = 'form-control';
	this.init();
}

Validator.prototype.init = function init() {
	this.getDomNodes();
	this.attachEvents();
};

Validator.prototype.attachEvents = function attachEvents() {
	$('#smartwizard input').on('keypress', this.hideInvalid.bind(this));
	$('#smartwizard select').on('change', this.hideInvalid.bind(this));
};

Validator.prototype.getDomNodes = function getDomNodes() {
	this.steps_container = $('#steps-container');
};


Validator.prototype.validateForm = function validateForm(stepNum) {
	//Esto no es lo mejor pero bueno. flojera automatizar por ahora.
	var formNumber 	= parseInt(stepNum) + 1;
	var result 		= false;
	switch(stepNum){
		case 0:
			console.log("validando formulario " + formNumber);
			result = this.isValidFormOne();
			break;
		case 1:
			console.log("validando formulario " + formNumber);
			break;
		case 2:
			console.log("validando formulario " + formNumber);
			break;
		case 3:
			console.log("validando formulario " + formNumber);
			break;
		case 4:
			console.log("validando formulario " + formNumber);
			break;
		case 5:
			console.log("validando formulario " + formNumber);
			break;
		case 6:
			console.log("validando formulario " + formNumber);
			break;
	}
	return result;
};

Validator.prototype.isValidFormOne = function isValidFormOne() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-1');
	this.arrayStep1 = [
		form_step.find('#nombre'),
		form_step.find('#apellido_paterno'),
		form_step.find('#apellido_materno'), //no obligatorio
		form_step.find('[name = genero]'), //array 2
		form_step.find('#estado_civil'),
		form_step.find('#fecha_nacimiento'),
		form_step.find('#correo_personal'),
		form_step.find('#correo_laboral'), // no obligatorio
		form_step.find('#tipo_persona'), //tipo fiscal
		form_step.find('#regimen_conyugal'), //no obligatorio
		//form_step.find('#rfc'),
		form_step.find('#nss'), // no obligatorio
		form_step.find('#curp')
	];

	for (var i = 0; i < this.arrayStep1.length; i++) {
		//console.log("INPUT: ", this.arrayStep1[i].data('eval'));
		var data_type 	= this.arrayStep1[i].data('eval');
		var value 		= this.arrayStep1[i].val();
		var required 	= this.arrayStep1[i].data('required');

		this.data_step_1[this.arrayStep1[i].attr('id')] = this.arrayStep1[i].val();

		var result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep1[i].addClass(this.class_invalid);
			console.log("Fallo el campo: [", this.arrayStep1[i].attr('id'), '] ya no continuamos la validación.')
			break;
		}
	}
	//validar rfc
	if (result) {
		this.data_step_1['rfc'] = form_step.find('#rfc').val();
		result = this.isValidRfc(this.data_step_1['rfc']);	
		if (!result) {
			this.setInvalidInput( form_step.find('#rfc') );
		}
	}
	
	/*validar Genero
	if (result) {
		this.data_step_1['rfc'] = form_step.find('#rfc').val();
		result = this.isValidRfc(this.data_step_1['rfc']);	
		if (!result) {
			this.setInvalidInput( form_step.find('#rfc') );
		}
	}*/

	console.log(this.data_step_1);
	return result;

};

Validator.prototype.initializeValidation = function initializeValidation(data_type, value, required) {
	var isValidInput = true;
	switch(data_type) {
			case 'alphabetic':
				isValidInput = this.isAlphabetic(value, required);
				break;
			case 'alphanumeric':
				isValidInput = this.isAlphanumeric(value);
				break;
			case 'date':
				isValidInput = this.isValidDate(value);
				break;
			case 'numeric':
				isValidInput = this.isNumeric(value);
				break;
			case 'email':
			case 'nss':
			case 'curp':
				isValidInput = this.validRegex(data_type, value);
				break;
			case 'not-empty':
				isValidInput = this.notEmpty(value);
				break;
		}
	return isValidInput;
};

Validator.prototype.isAlphabetic = function isAlphabetic(val, required) {
	if (!this.notEmpty(val) && required === false) { //is null
		return true;
	}
	var pattern = /^[a-z áéíóúñüàè]+$/i;
	return pattern.test(val);
};


Validator.prototype.isNumeric = function isNumeric(val) {
	if (!/^([0-9])*$/.test(val)){
		console.log("El valor " + val + " no es un número");
		return false;	
	}
	return true;			     
};


Validator.prototype.isAlphanumeric = function isAlphanumeric(val) {
	var pattern = /^([a-zA-ZáéíóúÁÉÍÓÚ0-9 ]+)$/;
	return pattern.test(val);
};

Validator.prototype.validRegex = function validRegex(typeRegex, val) {
	var isValid = true;
	switch(typeRegex) {
		case 'email':
			//validar regex email
			break;
		case 'rfc':
			//this.isValidRfc(val);
			break;
		case 'curp':
			//validar regex curp
			break;
	}
	return isValid;
};

Validator.prototype.isValidRfc = function isValidRfc(rfc) {
	if (!rfc){
		return false;
	}
	if (rfc) {

	}
	return true;
};

Validator.prototype.isValidDate = function isValidDate(date) {
	return rfc;
};

Validator.prototype.notEmpty = function notEmpty(val) {
	var isNotEmpty = true;
	if (val.length <= 0) {
		isNotEmpty = false;
	}
	return isNotEmpty;
};

Validator.prototype.setInvalidInput = function(input) {
	input.addClass(this.class_invalid);
};

Validator.prototype.hideInvalid = function hideInvalid(e) {
	//hago el cambio con vanilla para que sea aún más rapido.
	e.target.className = this.class_default;
};


/* 
	this.nombre 		= form_step.find('#nombre');
	this.a_paterno 		= form_step.find('#apellido_paterno');
	this.a_materno 		= form_step.find('#apellido_materno'); //no obligatorio
	this.genero 		= form_step.find('[name = genero]'); //array 2
	this.estado_civil 	= form_step.find('[name = estado_civil]');
	this.f_nacimiento 	= form_step.find('#fecha_nacimiento');
	this.correo 		= form_step.find('#correo_personal');
	this.correo_laboral = form_step.find('#correo_laboral'); // no obligatorio
	this.tipo_persona 	= form_step.find('[name = tipo_persona]');
	this.reginem 		= form_step.find('[name = regimen]'); //no obligatorio
	this.rfc 			= form_step.find('#rfc');
	this.nss 			= form_step.find('#nss'); // no obligatorio
	this.curp 			= form_step.find('#curp');
*/





