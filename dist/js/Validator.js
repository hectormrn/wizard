function Validator() {
	this.config = {

	};
	this.init();
}

Validator.prototype.init = function init() {
	this.getDomNodes();
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
	var form_step 		= this.steps_container.find('#form-step-1');
	
	this.nombre 		= form_step.find('#nombre');
	this.a_paterno 		= form_step.find('#apellido_paterno');
	this.a_materno 		= form_step.find('#apellido_materno');
	this.genero 		= form_step.find('[name = genero]'); //array 2
	this.estado_civil 	= form_step.find('[name = estado_civil]');
	this.f_nacimiento 	= form_step.find('#fecha_nacimiento');
	this.correo 		= form_step.find('#correo_personal');
	this.correo_laboral = form_step.find('#correo_laboral');
	this.tipo_persona 	= form_step.find('[name = tipo_persona]');
	this.reginem 		= form_step.find('[name = regimen]');
	this.rfc 			= form_step.find('#rfc');
	this.nss 			= form_step.find('#nss');
	this.curp 			= form_step.find('#curp');

	return false;

};

Validator.prototype.isNumeric = function isNumeric(val) {
	
};

Validator.prototype.isAlphanumeric = function isAlphanumeric(val) {
	
};

Validator.prototype.isString = function isString(val) {
	
};





