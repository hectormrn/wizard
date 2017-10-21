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
	this.debug = true;
	this.init();
}

Validator.prototype.init = function init() {
	this.getDomNodes();
	this.attachEvents();
};

/**
 * Encadena listeners y callbacks a campos del formulario
 * @return {void} 
 */
Validator.prototype.attachEvents = function attachEvents() {
	$('#smartwizard input').on('keypress', this.hideInvalid.bind(this));
	$('#smartwizard select').on('change', this.hideInvalid.bind(this));
};

Validator.prototype.getDomNodes = function getDomNodes() {
	this.steps_container = $('#steps-container');
};

/**
 * Define cual formulario calidar
 * @param  {Int} stepNum representa el Paso|Numero de formulario
 * @return {Boolean}         True si el formulario paso la validación, false si no.
 */
Validator.prototype.validateForm = function validateForm(stepNum) {
	//Esto no es lo mejor pero bueno. flojera automatizar por ahora.
	var formNumber 	= parseInt(stepNum) + 1;
	var result 		= false;
	switch(stepNum){
		case 0:
			console.log("validando formulario " + formNumber);
			result = this.validateForm1();
			break;
		case 1:
			result = this.validateForm2();
			break;
		case 2:
			result = this.validateForm3();
			break;
		case 3:
			result = this.validateForm4();
			break;
		case 4:
			result = this.validateForm5();
			break;
		case 5:
			result = this.validateForm6();
			break;
		case 6:
			console.log("validando formulario Bitacora!!");
			break;
	}
	return result;
};

/**
 * No es de todo mi agrado pero por ahora asi lo hago, valido el formulario1
 * @return {Boolean} 
 */
Validator.prototype.validateForm1 = function validateForm1() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-1');
	this.arrayStep1 = [
		form_step.find('#nombre'),
		form_step.find('#apellido_paterno'),
		form_step.find('#apellido_materno'), //no obligatorio
		//form_step.find('[name = genero]'), //array 2
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
	
	//Almecenar genero en array data
	if (result) {
		var inputGenero = form_step.find('[name = genero]');
		var genero = $(inputGenero[0]).is(':checked') ? 'masculino': 'femenino';
		this.data_step_1['genero'] = genero;
		result = true;	
	}

	console.log("Datos del primer form: ", this.data_step_1);
	return result;

};

Validator.prototype.validateForm2 = function validateForm2() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-2');
	this.arrayStep2 = [
		form_step.find('#pais'),
		form_step.find('#calle'),
		//form_step.find('#interior'), //no obligatorio
		form_step.find('#exterior'), 
		form_step.find('#cp'),
		form_step.find('#colonia'),
		form_step.find('#municipio_delegacion'),
		form_step.find('#ciudad_poblacion'), // no obligatorio
		form_step.find('#estado'), //tipo fiscal
		form_step.find('#lugar_nacimiento'), //no obligatorio
		form_step.find('#nacionalidad'),
		form_step.find('#escolaridad')
	];

	for (var i = 0; i < this.arrayStep2.length; i++) {
		//console.log("INPUT: ", this.arrayStep1[i].data('eval'));
		var data_type 	= this.arrayStep2[i].data('eval');
		var value 		= this.arrayStep2[i].val();
		var required 	= this.arrayStep2[i].data('required');

		this.data_step_2[this.arrayStep2[i].attr('id')] = this.arrayStep2[i].val();

		var result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep2[i].addClass(this.class_invalid);
			if (this.debug){
				console.log("%c Fallo el campo: ", "background-color:red; color:#fefefe;", '[', this.arrayStep2[i].attr('id'), '] ya no continuamos la validación.');
			}
			break;
		}
	}

	//store data, that is shit but i change later.
	if (result) {
		var interior = form_step.find('#interior').val();
		interior =  this.notEmpty(interior) ? interior: '';
		this.data_step_2['interior'] = interior;
	}
	if (this.debug){
		console.log("%c Datos del 2º form: ", 'background-color:green; color:#FFF;', this.data_step_2);
	}
	return result;
};

Validator.prototype.validateForm3 = function validateForm3() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-3');
	this.arrayStep3 = [
		form_step.find('#tipo_telefono'),
		form_step.find('#lada'),  //no obligatorio
		form_step.find('#numero_telefono'), 
		form_step.find('#extension') //no obligatorio
	];

	for (var i = 0; i < this.arrayStep3.length; i++) {
		//console.log("INPUT: ", this.arrayStep1[i].data('eval'));
		var data_type 	= this.arrayStep3[i].data('eval');
		var value 		= this.arrayStep3[i].val();
		var required 	= this.arrayStep3[i].data('required');
		console.log('value: ', value, ' requerdio: ', required, ' tpo: ', data_type);

		this.data_step_3[this.arrayStep3[i].attr('id')] = this.arrayStep3[i].val();

		result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep3[i].addClass(this.class_invalid);
			if (this.debug){
				console.log("%c Fallo el campo: ", "background-color:red; color:#fefefe;", '[', this.arrayStep3[i].attr('id'), '] ya no continuamos la validación.');
			}
			break;
		}
	}

	if (this.debug){
		console.log("%c Datos del 2º form: ", 'background-color:green; color:#FFF;', this.data_step_3);
	}
	return result;
};

Validator.prototype.validateForm4 = function validateForm4() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-4');
	//muchos datos aqui dependen de selecion de razon social.
	this.arrayStep4 = [
		form_step.find('#razon_social'), 	//no obligatorio
		form_step.find('#rfc'),
		form_step.find('#puesto'), 			//no obligatorio
		form_step.find('#antiguedad'), 		//dependiente
		form_step.find('#tipo_economia'), 	//no obligatorio
		form_step.find('#pais'),	//dependiente
		form_step.find('#calle'),   //dependiente
		form_step.find('#interior'), //no obligatorio
		form_step.find('#exterior'), //dependiente
		form_step.find('#cp'),		//dependiente
		form_step.find('#colonia'),	//dependiente
		form_step.find('#municipio_delegacion'), //dependiente
		form_step.find('#ciudad_poblacion'),    //dependiente
		form_step.find('#estado') //dependiente

	];

	for (var i = 0; i < this.arrayStep4.length; i++) {

		var data_type 	= this.arrayStep4[i].data('eval');
		var value 		= this.arrayStep4[i].val();
		var required 	= this.arrayStep4[i].data('required');

		this.data_step_4[this.arrayStep4[i].attr('id')] = this.arrayStep4[i].val();

		var result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep4[i].addClass(this.class_invalid);
			console.log("Fallo el campo: [", this.arrayStep4[i].attr('id'), '] ya no continuamos la validación.');
			break;
		}
	}

	console.log("Datos del 4º form: ", this.data_step_4);
	return result;
};


Validator.prototype.validateForm5 = function validateForm5() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-5');
	//muchos datos aqui dependen de selecion de razon social.
	this.arrayStep5 = [
		form_step.find('#rfc'), 	
		form_step.find('#razon_social'),   //no obligatorio
		form_step.find('#pais'), 		//dependiente
		form_step.find('#calle'), 		//dependiente
		form_step.find('#interior'), 	//no obligatorio
		form_step.find('#exterior'),	//dependiente
		form_step.find('#cp'),   		//dependiente
		form_step.find('#colonia'), 	//dependiente
		form_step.find('#municipio_delegacion'), //dependiente
		form_step.find('#ciudad_poblacion'),	//dependiente
		form_step.find('#estado')       	//dependiente

	];

	for (var i = 0; i < this.arrayStep5.length; i++) {
		
		var data_type 	= this.arrayStep5[i].data('eval');
		var value 		= this.arrayStep5[i].val();
		var required 	= this.arrayStep5[i].data('required');

		this.data_step_5[this.arrayStep5[i].attr('id')] = this.arrayStep5[i].val();

		var result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep5[i].addClass(this.class_invalid);
			console.log("Fallo el campo: [", this.arrayStep5[i].attr('id'), '] ya no continuamos la validación.');
			break;
		}
	}

	console.log("Datos del 5º form: ", this.data_step_5);
	return result;
};

Validator.prototype.validateForm6 = function validateForm6() {
	var result = true;
	/*var form_step 		= this.steps_container.find('#form-step-6');
	//muchos datos aqui dependen de selecion de razon social.
	this.arrayStep5 = [
		form_step.find('#rfc'), 	
		form_step.find('#razon_social'),   //no obligatorio
		form_step.find('#pais'), 		//dependiente
		form_step.find('#calle'), 		//dependiente
		form_step.find('#interior'), 	//no obligatorio
		form_step.find('#exterior'),	//dependiente
		form_step.find('#cp'),   		//dependiente
		form_step.find('#colonia'), 	//dependiente
		form_step.find('#municipio_delegacion'), //dependiente
		form_step.find('#ciudad_poblacion'),	//dependiente
		form_step.find('#estado')       	//dependiente

	];

	for (var i = 0; i < this.arrayStep6.length; i++) {
		
		var data_type 	= this.arrayStep6[i].data('eval');
		var value 		= this.arrayStep6[i].val();
		var required 	= this.arrayStep6[i].data('required');

		this.data_step_6[this.arrayStep6[i].attr('id')] = this.arrayStep6[i].val();

		var result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep6[i].addClass(this.class_invalid);
			console.log("Fallo el campo: [", this.arrayStep6[i].attr('id'), '] ya no continuamos la validación.');
			break;
		}
	}*/

	console.log("Datos del 5º form: ", this.data_step_6);
	return result;
};
/**
 * Sabe como valiar un campo del formulario, depende de lo que se le especifique como data-attribute	
 * @param  {String} data_type Tipo de validación a aplicar.		
 * @param  {String} value     Valor del input evaluado.
 * @param  {Boolean} required  Sirve para saber si el campo es obligatorio o no
 * @return {Boolean}           true si el input paso la validación, false si no.
 */
Validator.prototype.initializeValidation = function initializeValidation(data_type, value, required) {
	var isValidInput = true;
	if (required === false && !this.notEmpty(value)) {
		if (this.debug) {
			console.info('dato no obligatorio y vacio.');
		}
		return true;
	}
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

/**
 * Valida campos Alfabetico
 * @param  {String}  val      Representa el valor de input
 * @param  {Boolen}  required Nos dice si es obligarotio o no
 * @return {Boolean}          true or false si es valido.
 */
Validator.prototype.isAlphabetic = function isAlphabetic(val, required) {
	if (!this.notEmpty(val) && required === false) { //is null
		return true;
	}
	var pattern = /^[a-z áéíóúñüàè]+$/i;
	return pattern.test(val);
};

/**
 * Valida un campo solo numerico
 * @param  {String}  val Valor del input
 * @return {Boolean}     
 */
Validator.prototype.isNumeric = function isNumeric(val) {
	if (val.length <= 0) {
		return false;
	}
	if (!/^([0-9])*$/.test(val)){
		if (this.debug) { console.log("El valor " + val + " no es un número"); }
		return false;	
	}
	return true;			     
};

/**
 * Valida valores alfanumericos
 * @param  {String}  val el valor del input
 * @return {Boolean}     
 */
Validator.prototype.isAlphanumeric = function isAlphanumeric(val) {
	var pattern = /^([a-zA-ZáéíóúÁÉÍÓÚ0-9 ]+)$/;
	return pattern.test(val);
};

/**
 * Evalua un tipo de dato especifico dado una expresion regular.
 * @param  {String} typeRegex tipo de dato a evaluar
 * @param  {String} val       El valor del input
 * @return {Boolean}           paso o no el regex.
 */
Validator.prototype.validRegex = function validRegex(typeRegex, val) {
	var isValid = true;
	switch(typeRegex) {
		case 'email':
			//validar regex email
			break;
		case 'curp':
			//validar regex curp
			this.
			break;
	}
	return isValid;
};

/**
 * Valida un rfc
 * @param  {String}  rfc Cadena que representa un rfc
 * @return {Boolean}     rfc valido o erroneo
 */
Validator.prototype.isValidRfc = function isValidRfc(rfc) {
	return true;
};

/**
 * Valida un CURP 
 * @param  {String}  curp cadena que representa un curp.
 * @return {Boolean}      curp valido o erroneo.
 */
Validator.prototype.isValidCurp = function isValidCurp(curp) {
	return true;
};

/**
 * Valida un formato de fecha
 * @param  {String}  date Una cadena que represnta una fecha
 * @return {Boolean}      fecha valida o erronea
 */
Validator.prototype.isValidDate = function isValidDate(date) {
	return rfc;
};

/**
 * Valida una candena vacia
 * @param  {String} val el estring a validar
 * @return {Boolean}     True si la cadena no esta vacia, false lo contrario
 */
Validator.prototype.notEmpty = function notEmpty(val) {
	var isNotEmpty = true;
	if (val.length <= 0) {
		isNotEmpty = false;
	}
	return isNotEmpty;
};

/**
 * Lo que hace es poner un input con border rojo
 * @param {JqueryObjec} input node al cual agregarle una clase. 
 */
Validator.prototype.setInvalidInput = function(input) {
	input.addClass(this.class_invalid);
};

/**
 * Remueve la clase error a un dom element
 * @param  {Event} e EventObject que lanzo el evento
 * @return {void}   
 */
Validator.prototype.hideInvalid = function hideInvalid(e) {
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





