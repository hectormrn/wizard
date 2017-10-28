/**
 * Clase que Valida las etapas del wizard.
 * @author hector.mrn55@gmail.com
 * @version 1.0
 */
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
	this.debug = false; // change to true for show console info.
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
	$('#smartwizard input').on('blur', this.validateInput.bind(this));
	$('#smartwizard select').on('change', this.validateInput.bind(this));
};

Validator.prototype.getDomNodes = function getDomNodes() {
	this.steps_container = $('#steps-container');
};

/**
 * Se encarga de iniciar una validación para un campo de formulario.
 * @param  {JQueryEvent} evt evento que se lazo.
 * @return {void}   
 */
Validator.prototype.validateInput = function validateInput(evt) {
	var input 		= $(evt.target);
	var value 		= input.val();
	var required 	= input.data('required');
	var data_type	= input.data('eval');
	this.initializeValidation(data_type, value, required, input);
};

/**
 * Define cual formulario validar
 * @param  {Int} stepNum representa el Paso|Numero de formulario
 * @return {Boolean}         True si el formulario paso la validación, false si no.
 */
Validator.prototype.validateForm = function validateForm(stepNum) {
	//Esto no es lo mejor pero bueno. flojera automatizar por ahora.
	var formNumber 	= parseInt(stepNum) + 1;
	var result 		= false;
	switch(stepNum){
		case 0:
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
 * No es de todo mi agrado pero por ahora asi lo hago, valido el formulario[N]
 * @return {Boolean} 
 */
Validator.prototype.validateForm1 = function validateForm1() {
	var result 		= true;
	var form_step 	= this.steps_container.find('#form-step-1');
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
			if (this.debug){
				console.log("%c Fallo el campo: ", "background-color:red; color:#fefefe;", '[', this.arrayStep1[i].attr('id'), '] ya no continuamos la validación.');
			}
			this.showFormErrors(this.arrayStep1.slice(i, this.arrayStep1.length));
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
	
	//Almacenar genero en array data
	if (result) {
		var inputGenero = form_step.find('[name = genero]');
		var genero = $(inputGenero[0]).is(':checked') ? 'masculino': 'femenino';
		this.data_step_1['genero'] = genero;
	}

	if (this.debug){
		console.log("%c Datos del 1º form: ", 'background-color:green; color:#FFF;', this.getFormDataByStepNumber(1));
	}
	return result;
};

Validator.prototype.validateForm2 = function validateForm2() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-2');
	this.arrayStep2 = [
		form_step.find('#pais'),
		form_step.find('#calle'),
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
			this.showFormErrors(this.arrayStep2.slice(i, this.arrayStep2.length));
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
		console.log("%c Datos del 2º form: ", 'background-color:green; color:#FFF;', this.getFormDataByStepNumber(2));
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

		this.data_step_3[this.arrayStep3[i].attr('id')] = this.arrayStep3[i].val();

		result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep3[i].addClass(this.class_invalid);
			if (this.debug){
				console.log("%c Fallo el campo: ", "background-color:red; color:#fefefe;", '[', this.arrayStep3[i].attr('id'), '] ya no continuamos la validación.');
			}
			this.showFormErrors(this.arrayStep3.slice(i, this.arrayStep3.length));
			break;
		}
	}

	if (this.debug){
		console.log("%c Datos del 3º form: ", 'background-color:green; color:#FFF;', this.getFormDataByStepNumber(3));
	}
	return result;
};

Validator.prototype.validateForm4 = function validateForm4() {
	var result = true;
	var form_step 		= this.steps_container.find('#form-step-4');

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
			if (this.debug) {
				console.log("Fallo el campo: [", this.arrayStep4[i].attr('id'), '] ya no continuamos la validación.');
			}
			this.showFormErrors(this.arrayStep4.slice(i, this.arrayStep4.length));
			break;
		}
	}

	if (this.debug){
		console.log("%c Datos del 4º form: ", 'background-color:green; color:#FFF;', this.getFormDataByStepNumber(4));
	}
	return result;
};

Validator.prototype.validateForm5 = function validateForm5() {
	var result 		= true;
	var form_step	= this.steps_container.find('#form-step-5');

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
			if (this.debug) {
				console.log("Fallo el campo: [", this.arrayStep5[i].attr('id'), '] ya no continuamos la validación.');
			}
			this.showFormErrors(this.arrayStep5.slice(i, this.arrayStep5.length));
			break;
		}
	}

	if (this.debug){
		console.log("%c Datos del 5º form: ", 'background-color:green; color:#FFF;', this.getFormDataByStepNumber(5));
	}
	return result;
};

Validator.prototype.validateForm6 = function validateForm6() {
	var result 		= true;
	var form_step 	= this.steps_container.find('#form-step-6');
	//muchos datos aqui dependen de selecion de razon social.
	this.arrayStep6 = [
		form_step.find('#origen'), 	
		form_step.find('#medios_publicidad'),   //no obligatorio
		form_step.find('#campana'), 		//dependiente
		form_step.find('#empleado_recomienda')
	];

	for (var i = 0; i < this.arrayStep6.length; i++) {
		
		var data_type 	= this.arrayStep6[i].data('eval');
		var value 		= this.arrayStep6[i].val();
		var required 	= this.arrayStep6[i].data('required');

		this.data_step_6[this.arrayStep6[i].attr('id')] = this.arrayStep6[i].val();

		var result = this.initializeValidation(data_type, value, required);

		if (!result) {
			this.arrayStep6[i].addClass(this.class_invalid);
			if (this.debug) {
				console.log("Fallo el campo: [", this.arrayStep6[i].attr('id'), '] ya no continuamos la validación.');
			}
			this.showFormErrors(this.arrayStep6.slice(i, this.arrayStep6.length));
			break;
		}
	}

	//Almacenar genero en array data
	if (result) {
		var inputRecomendado 	= form_step.find('[name = recomendado]');
		var recomendado 		= $(inputRecomendado[0]).is(':checked') ? 'si': 'no';
		this.data_step_6['recomendado'] = recomendado;
	}

	console.log("Datos del 6º form: ", this.data_step_6);
	return result;
};
/**
 * Sabe como validar un campo del formulario, depende de lo que se le especifique como data-attribute	
 * @param  {String} data_type Tipo de validación a aplicar.		
 * @param  {String} value     Valor del input evaluado.
 * @param  {Boolean} required  Sirve para saber si el campo es obligatorio o no
 * @return {Boolean}           true si el input paso la validación, false si no.
 */
Validator.prototype.initializeValidation = function initializeValidation(data_type, value, required, input) {
	var isValidInput = true;
	if (required === false && this.isEmpty(value)) {
		/*if (this.debug) {
			console.info('dato no obligatorio y vacio.');
		}*/
		return true;
	}
	if (required === true && this.isEmpty(value)) {  //dato vacio y obligatorio
		/*if (this.debug){
			console.log('Dato obligatorio y vacio');
		}*/
		if (input) {
			this.setInvalidInput(input);
		}
		return false;
	}
	switch(data_type) {
			case 'alphabetic':
				isValidInput = this.isAlphabetic(value, required);
				break;
			case 'alphanumeric':
				isValidInput = this.isAlphanumeric(value);
				break;
			case 'date':
				isValidInput = this.isValidDate(value, input);
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

	if (input && !isValidInput) {
		this.setInvalidInput(input);
	}
	if (isValidInput) { //probando el reset err, esto no ira aquí...
		$(input).removeClass('invalid');
		$(input).parent().removeClass('err-msg');
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
		console.log("bandera paso alphabetic vacio");
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
			this.isValidEmail(val);
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
Validator.prototype.isValidDate = function isValidDate(date, input) {
	if (input) {
		$(input).removeClass(this.class_invalid);
	}
	//implementar regex
	return true;
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
 * Determina si una cadena está vacia
 * @param  {String}  str cadena a evaluar
 * @return {Boolean}
 */
Validator.prototype.isEmpty = function isEmpty(str) {
	if (typeof str === 'number' && str != undefined) {
		str = str.toString();
	}
	return str.length <= 0;
};

/**
 * Validando un email
 * @param  {String}  email email a validar
 * @return {Boolean}       
 */
Validator.prototype.isValidEmail = function isValidEmail(email) {
	expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
    	if (this.debug) {
    		console.error("Error: La dirección de correo " + email + " es incorrecta.");
    	}
        return false;
    }
    return true;
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

/**
 * Agrega la clase error a los inputs que se le pasen como arreglo
 * @param  {Array} inputs_form matriz de inputs
 * @return {void}             
 */
Validator.prototype.showFormErrors = function showFormErrors(inputs_form) {
	for (var i = 0; i < inputs_form.length; i++) {
		if ( inputs_form[i].data('required') === true ) {
			var parent = inputs_form[i].parent(); //simulando el setting de errores...
			parent.attr('data-after','aquí referenciamos a un object de errores');
			parent.addClass('err-msg');
			this.showInputError(inputs_form[i]);
		}
	}
};

/**
 * agrega la clase error a un input x
 * @param  {JqueryObject} input representa un input text
 * @return {void} 
 */
Validator.prototype.showInputError = function showInputError(input) {
	input.addClass(this.class_invalid);
};

/**
 * Basicamente regresa los datso que se ingresaron en un formulario del paso N
 * @param  {Int} step Representa del número del formulario.	
 * @return {Object}    Todas los datos del formulario object{key:value}
 */
Validator.prototype.getFormDataByStepNumber = function getFormDataByStepNumber(step) {
	if (step === undefined || step <= 0 || (typeof step != 'number') ) {
		if (this.debug) { console.log('Debes proporcionar un numero de formulario-step'); }
	}
	var key = 'data_step_';
	return this[key + step];
};





