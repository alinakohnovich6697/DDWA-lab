'use string'

var DDWAApp = (function () {
	return {
		Models: {
			Computer: {},
			Ultrabook: {},
			ComputerServise: {}
		},
		MakeupManager: {
			MakeupCreator: {},
			FormReader: {},
            ElementsEventsProvider: {},
            computerFormValidator: {}
		},
		ComputersService: {},
		CONSTANTS: { 
			SERVICE_URL: 'http://localhost:3001/computers',
			TABLE_ID: 'computerList',
            DETAILS_TABLE_ID: 'tableDetails',
            FORM_COMPUTER_ID: 'formComputer',
            CREATE_PART: 'createPart',
            LIST_PART: 'showPart',
            CREATE_COMPUTER_BUTTON: 'createComputer',
            CREATE_ULTRABOOK_BUTTON: 'createUltrabook',
            CREATE_COMPUTER_SERVISE_BUTTON: 'createComputerServise',
            CREATE_BUTTONS_ID: 'createButtons'
		}
	};
})();

DDWAApp.Models.Computer = function (type) {
    var _id;
	var _countCores;
	var _processorType;
	var _frequency;
	var _manufacturer;
	var _hardDisk;
	var _typeOfRAM;
	var _type = type;

	this.initialize = function (data) {
        _id = data.id;
		_countCores = data.countCores;
		_processorType = data.processorType;
		_frequency = data.frequency;
		_manufacturer = data.manufacturer;
		_hardDisk = data.hardDisk;
		_typeOfRAM = data.typeOfRAM;
		_type = data.type;
	}

	this.getId = function () {
		return _id;
	}

	this.getType = function () {
		return _type;
	}

	this.setCountCores = function (countCores) {
		_countCores = countCores;
	}

	this.getCountCores = function () {
		return _countCores;
	}

	this.setProcessorType = function (processorType) {
		_processorType = processorType;
	}

	this.getProcessorType = function () {
		return _processorType;
	}

	this.setFrequency = function (frequency) {
		_frequency = frequency;
	}

	this.getFrequency = function () {
		return _frequency;
	}

	this.setManufacturer = function (manufacturer) {
		_manufacturer = manufacturer;
	}

	this.getManufacturer = function () {
		return _manufacturer;
	}

	this.setHardDisk = function (hardDisk) {
		_hardDisk = hardDisk;
	}

	this.getHardDisk = function () {
		return _hardDisk;
	}

	this.setRAM = function (typeOfRAM) {
		_typeOfRAM = typeOfRAM;
	}

	this.getRAM = function () {
		return _typeOfRAM;
	}
};

DDWAApp.Models.Ultrabook = function () {
	DDWAApp.Models.Computer.call(this, true);

	var _technologyHyperThreading;
	var _bitArchitecture;

	var parentInitialize = this.initialize;
	this.initialize = function (data) {
		parentInitialize.call(this, data);
		_technologyHyperThreading = data.technologyHyperThreading;
        _bitArchitecture = data.bitArchitecture;
	}

	this.setTechnologyHyperThreading = function (technologyHyperThreading) {
		_technologyHyperThreading = technologyHyperThreading;
	}

	this.getTechnologyHyperThreading = function () {
		return _technologyHyperThreading;
	}

	this.setBitArchitecture = function (bitArchitecture) {
        _bitArchitecture = bitArchitecture;
	}

	this.getBitArchitecture = function () {
        return _bitArchitecture;
	}
};

DDWAApp.Models.ComputerServise = function () {
	DDWAApp.Models.Computer.call(this, false);

	var _videoCard;
	var _webcam;

	var parentInitialize = this.initialize;
	this.initialize = function (data) {
		parentInitialize.call(this, data);
		_videoCard= data.videoCard;
		_webcam = data.webcam;
	}

	this.setVideoCard = function (videoCard) {
		_videoCard = videoCard;
	}

	this.getVideoCard = function () {
		return _videoCard;
	}

	this.setWebcam = function (webcam) {
		_webcam = webcam;
	}

	this.getWebcam = function () {
		return _webcam;
	}
};

DDWAApp.MakeupManager.ElementsEventsProvider = function(){
    var self = this || {};
    var isUpdateEvent = false;

    self.moveToComputerDetails = function (id, type) {
        if (isUpdateEvent === true) {
            isUpdateEvent = false;
            return;
        }
        setDisplaySettings('none', 'none', 'inline-table', 'none', 'none');
		DDWAApp.ComputersService.getDetails(id, DDWAApp.MakeupManager.MakeupCreator.createComputerDetails);
    };

    self.moveToUpdateComputer = function (id) {
        isUpdateEvent = true;
        setDisplaySettings('none', 'inline-table', 'none', 'none', 'none');
        DDWAApp.ComputersService.getDetails(id, DDWAApp.MakeupManager.MakeupCreator.createComputerForm);
    }

    self.moveToDeleteComputer = function (id) {
        isUpdateEvent = true;
        DDWAApp.ComputersService.deleteComputer(id);
    }

    self.moveToCreateComputer = function (isUltrabook) {
        setDisplaySettings('none', 'inline-table', 'none', 'none', 'inline-table', isUltrabook);
        DDWAApp.MakeupManager.MakeupCreator.createComputerForm(isUltrabook ? new DDWAApp.Models.Ultrabook() : new DDWAApp.Models.ComputerServise(), false);
    }

    self.moveToListComputers = function () {
     // debugger;
        setDisplaySettings('inline-table', 'none', 'none', 'inline-table', 'none');
        DDWAApp.ComputersService.getAll();
    };

    self.createComputer = function (event) {
       // debugger;
        if (DDWAApp.MakeupManager.computerFormValidator.isValidForm(event)) {
            DDWAApp.ComputersService.addComputer(event);

        } else {
            if (event.preventDefault) event.preventDefault();
        }
	}
	
	self.updateComputerCustom = function (event) {
			debugger;
		 if (DDWAApp.MakeupManager.computerFormValidator.isValidForm(event)) {
			 let id = event["id"].value;
			 DDWAApp.ComputersService.updateComputer(event, id);
 
		 } else {
			 if (event.preventDefault) event.preventDefault();
		 }
	 }

    function setDisplaySettings(listTable, computerForm, detailsTable, createComputerButton, createButtons, isUltrabook) {
        document.getElementById(DDWAApp.CONSTANTS.LIST_PART).style.display = listTable;
        document.getElementById(DDWAApp.CONSTANTS.CREATE_PART).style.display = computerForm;
        document.getElementById(DDWAApp.CONSTANTS.DETAILS_TABLE_ID).style.display = detailsTable;
        document.getElementById(DDWAApp.CONSTANTS.CREATE_COMPUTER_BUTTON).style.display = createComputer;
        document.getElementById(DDWAApp.CONSTANTS.CREATE_BUTTONS_ID).style.display = createButtons;
        document.getElementById(DDWAApp.CONSTANTS.CREATE_ULTRABOOK_BUTTON).classList.value = isUltrabook ? 'btn btn-info' : 'btn btn-default';
        document.getElementById(DDWAApp.CONSTANTS.CREATE_COMPUTER_SERVISE_BUTTON).classList.value = isUltrabook ? 'btn btn-default' : 'btn btn-info';
    }

	return self;
}();

DDWAApp.MakeupManager.MakeupCreator = function () {

	var self = this || {};

	self.createComputerTable = function (computer) {
        var table = document.getElementById(DDWAApp.CONSTANTS.TABLE_ID);
        clearTable(table);

		for (var i = 0; i < computer.length; i++) {
            var tr = document.createElement("tr");
            tr.setAttribute("onclick", "DDWAApp.MakeupManager.ElementsEventsProvider.moveToComputerDetails(" + computer[i].getId() + ", " + computer[i].getType() + ");return false;");
            tr.innerHTML = "<td>" + computer[i].getCountCores() + "</td>" +
                "<td>" + computer[i].getProcessorType() + "</td>" +
                "<td>" + computer[i].getFrequency() + "</td>" +
                "<td>" + (computer[i].getManufacturer()+ "</td>" +
                "<td>" + computer[i].getHardDisk() + "</td>" +
                "<td>" + computer[i].getRAM() + "</td>" +
                "<td><button class='btn btn-default' onclick='DDWAApp.MakeupManager.ElementsEventsProvider.moveToUpdateComputer(" + computer[i].getId() + ");return false;'>Редактировать</button></td>" +
                "<td><button class='btn btn-danger' onclick = 'DDWAApp.MakeupManager.ElementsEventsProvider.moveToDeleteComputer(" + computer[i].getId() + ");return false;'>Удалить</button></td>")

            table.tBodies[0].appendChild(tr);
		}
	};

	self.createComputerDetails = function (computer) {
        var table = document.getElementById(DDWAApp.CONSTANTS.DETAILS_TABLE_ID);
        var inner = "<tr><th>Количество ядер процессора</th><td>" + computer.getCountCores() + "</td></tr>" +
            "<tr><th>Тип процессора</th><td>" + computer.getProcessorType() + "</td></tr>" +
            "<tr><th>Частота</th><td>" + computer.getFrequency() + "</td></tr>" +
            "<tr><th>Производитель</th><td>" + computer.getManufacturer()  + "</td></tr>" +
            "<tr><th>Тип жесткого диска</th><td>" + computer.getHardDisk() + "</td></tr>" +
            "<tr><th>Размер ОЗУ</th><td>" + computer.getRAM() + "</td></tr>";
        if (computer instanceof DDWAApp.Models.Ultrabook) {
            inner += "<tr><th>Наличие технологии Hyper-Threading</th><td>" + (computer.getTechnologyHyperThreading()== true ? "Да" : "Нет") + "</td></tr>";
            inner += "<tr><th>Разрядность архитектуры</th><td>" + (computer.getBitArchitecture() ==  true ? "x64" : "x86")+ "</td></tr>";
        } else {
            inner += "<tr><th>Видеокарта</th><td>" + computer.getVideoCard() + "</td></tr>";
            inner += "<tr><th>Наличие веб-камеры</th><td>" + computer.getWebcam() + "</td></tr>";
        }

        table.innerHTML = inner;
    };

    self.createComputerForm = function (computer, isUpdate) {
        var form = document.getElementById(DDWAApp.CONSTANTS.FORM_COMPUTER_ID);
        var inner = '<div class="form-group">'+
            '<label>Количество ядер процессора</label >' +
            '<label style="color: red; display: none;">Поле не должно быть пустым и должно содержать только цифры.</label >' +
            '<input class="form-control" name="countCores" min="1" type="number" value="' + getValueForField(computer.getCountCores()) + '" required/>' +
            '</div>' +
            '<div class="form-group">' +
            '<label >Тип процессора</label >' +
            '<label style="color: red; display: none;">Поле не должно быть пустым, количеcтво символов не должно превышать 15 символов.</label >' +
            '<input name= "processorType" class="form-control" pattern="^[а-яА-ЯёЁa-zA-Z]+$" type="text" value="' + getValueForField(computer.getProcessorType()) + '" required maxlength="15"/>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Частота</label >' +
            '<label style="color: red; display: none;">Поле не должно быть пустым и должно содержать только цифры.</label >' +
            '<input name="frequency" class="form-control"min="1" type="number" value="' + getValueForField(computer.getFrequency()) + '" required />' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Производитель</label >' +
            '<label style="color: red; display: none;">Поле не должно быть пустым, количеcтво символов не должно превышать 50 символов,поле не должно содержать цифры.</label >' +
            '<input name= "manufacturer" class="form-control" pattern="^[а-яА-ЯёЁa-zA-Z]+$"type="text" value="' + getValueForField(computer.getManufacturer()) + '" required maxlength="50"/>' +
            '</div>' +
            '<div class="form-group">' +
			'<label>Тип жесткого диска</label >' +
			'<label style="color: red; display: none;">Поле не должно быть пустым, количеcтво символов не должно превышать 50 символов,поле не должно содержать цифры.</label >' +
           '<input name="hardDisk" class="form-control" type="text" pattern="^[а-яА-ЯёЁa-zA-Z]+$" value="' + getValueForField(computer.getHardDisk() ) + '" required/>' +
            '</div>' +
            '<div class="form-group">' +
            '<label>Размер ОЗУ</label >' +
            '<label style="color: red; display: none;">Поле не должно быть пустым и должно содержать только цифры..</label >' +
            '<input class="form-control" name="typeOfRAM"  min="1" type="number" value="' + getValueForField(computer.getRAM()) + '" required/>' +
            '</div>' +
            '<div class="form-group">' +
			'<input class="form-control" name="type" style="display: none;" value="' + getValueForField(computer.getType()) + '"/>' +
			'<input class="form-control" name="id" style="display: none;" value="' + getValueForField(computer.getId()) + '"/>' +
            '</div>' ;
       // if (computer.getType() === 'false' || computer.getType() === false) {
		   if(computer instanceof DDWAApp.Models.Ultrabook){
            inner += '<div class="form-group">' +
                '<label>Наличие технологии Hyper-Threading</label >' +
                '<input class="form-control" name="technologyHyperThreading" type="checkbox" ' + (computer.getTechnologyHyperThreading() ? 'checked': '') + ' />' +
            '</div>' ;
            inner += '<div class="form-group">' +
                     '<label>Разрядность архитектуры</label >' +
                     '<input class="form-control" name="bitArchitecture" type="checkbox" ' + (computer.getBitArchitecture() ? 'checked': '') + ' />' +'<output>x64</output><br/>'
            '</div>' ;
        } else {
            inner += '<div class="form-group">' +
                '<label>Видеокарта</label >' +
                '<label style="color: red; display: none;">Поле не должно быть пустым и должно содержать только буквы.</label >' +
                '<input class="form-control" name="videoCard" type="text" pattern="^[а-яА-ЯёЁa-zA-Z]+$" value="' + getValueForField(computer.getVideoCard()) + '" required/>' +
                '</div>';
            inner += '<div class="form-group">' +
                '<label>Наличие веб-камеры</label >' +
                '<select class="form-control" name="webcam" required>' +
            '<option>Да</option>' +
            '<option>Нет</option>' +
            '</select>' +
            '</div>' ;
        }
        if (!isUpdate) {
            inner += '<input type="submit" value="Создать"  class="btn btn-default" onclick="DDWAApp.MakeupManager.ElementsEventsProvider.createComputer(this.form);" />';
        } else {

            inner += '<input type="submit" value="Сохранить"  class="btn btn-default" onclick="DDWAApp.MakeupManager.ElementsEventsProvider.updateComputerCustom(this.form, ' + computer.getId() + ');" />';
        }

        form.innerHTML = inner;
    };

    function getValueForField(data) {
        return typeof data == 'undefined' ? '' : data;
    }

	function clearTable(table) {
        table.tBodies[0].innerHTML = "";
	}

	return self;
}();

DDWAApp.MakeupManager.FormReader = function () {
	var self = this || {};

	self.getDataForm = function (form) {
		var type = form["type"].value;
		var data = {};

		//alert(type);

		if (type == 'true') {  
			data = getDataFormUltrabook(form);
			//alert("ub");
		} else {
			data = getDataFormServiseComputer(form);
			//alert("cc");
		};

		return data;
	};

	function getCommonDataFromForm(form) {
		var body = {
			countCores: form["countCores"].value,
			processorType: form["processorType"].value,
			frequency: form["frequency"].value,
			manufacturer: form["manufacturer"].value,
			hardDisk: form["hardDisk"].value,
			typeOfRAM: form["typeOfRAM"].value
		};

		return body
	};

	function getDataFormUltrabook(form) {
		var data = getCommonDataFromForm(form);
		if (form["technologyHyperThreading"] != undefined || form["bitArchitecture"] != undefined ){
			data.technologyHyperThreading = form["technologyHyperThreading"].checked;
			data.bitArchitecture = form["bitArchitecture"].checked;
			data.type = true;
			//alert("in");
		}else{
			data.type = false;
			//alert("out");
		}
		return data;
	};

	function getDataFormServiseComputer(form) {
		var data = getCommonDataFromForm(form);

		if (form["videoCard"] != undefined || form["webcam"] != undefined ){
        	data.videoCard = form["videoCard"].value;
			data.webcam = form["webcam"].value;
			data.type = false;
		}else{
			data.type = true;
		}
		
		/* data.videoCard = document.getElementsByName("videoCard")[0].value;
		data.webcam=document.getElementsByName("webcam")[0].value; */

		return data;
	};

	function convertChackbocxValueToBool(value) {
		return value === "on" ? true : false;
	}

	return self;
}();

DDWAApp.MakeupManager.computerFormValidator = function() {
    var self = this || {};

    self.isValidForm = function (event) {
        event = (event ? event : window.event);
        var form = event;
        var field;
        var formvalid = true;

        for (var i = 0; i < form.elements.length; i++) {
            field = form.elements[i];
            if (!isInputField(field)) continue;

            if (typeof field.willValidate !== "undefined") {
                if (field.nodeName === "INPUT") {
                    field.setCustomValidity(LegacyValidation(field) ? "" : "error");
                }

                field.checkValidity();
            } else {

                field.validity = field.validity || {};

                field.validity.valid = LegacyValidation(field);
            }

            if (field.validity.valid) {
				field.style.border = "1px solid rgba(0, 0, 0, 0.15)";
                if (field.parentElement.children[1].nodeName !== "INPUT")
                    field.parentElement.children[1].style.display = "none";

            } else {

                field.style.border = "1px solid red";
                field.parentElement.children[1].style.display = "inline-table";

                formvalid = false;
            }

        }

        return formvalid;
    }

    function isInputField(field) {
        return (field.nodeName === "INPUT" || field.nodeName === "TEXTAREA" || field.nodeName !== "SELECT") && field.style.display !== "none" && field.type != "submit";
    }

    function LegacyValidation(field) {

        var
            valid = true,
            val = field.value,
            type = field.getAttribute("type"),
            chkbox = (type === "checkbox" || type === "radio"),
            required = field.getAttribute("required"),
            minlength = field.getAttribute("minlength"),
            maxlength = field.getAttribute("maxlength"),
            pattern = field.getAttribute("pattern");

        if (field.disabled) return valid;

        valid = valid && (!required ||
            (chkbox && field.checked) ||
            (!chkbox && val !== "")
        );

        valid = valid && (chkbox || (
            (!minlength || val.length >= minlength) &&
            (!maxlength || val.length <= maxlength)
        ));

        if (valid && pattern) {
            pattern = new RegExp(pattern);
            valid = pattern.test(val);
        }

        return valid;
    }

    return self;
} ();

DDWAApp.ComputersService = function () {
	var self = this || {};

	self.deleteComputer = function (id) {
		//debugger;
		var url = DDWAApp.CONSTANTS.SERVICE_URL;
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", url + '/' + id, true);
		xhr.onload = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status == 200) {
				//DDWAApp.computerService.getAll();
				self.getAll();
			}
		}
		xhr.send(null);
	};

	self.getAll = function () {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', DDWAApp.CONSTANTS.SERVICE_URL, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status == 200) {
			//	debugger;
				var data = JSON.parse(xhr.responseText);

				var computers = [];
				for (var i = 0; i < data.length; i++) {
					var computer = createComputer(data[i]);
					computers.push(computer);
				}
				DDWAApp.MakeupManager.MakeupCreator.createComputerTable(computers);
			}
		}
	};

	self.addComputer = function (data) {
		//debugger;
		var xhr = new XMLHttpRequest();
		var body = JSON.stringify(DDWAApp.MakeupManager.FormReader.getDataForm(data));

		xhr.open("POST", DDWAApp.CONSTANTS.SERVICE_URL, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			//DDWAApp.computerService.getAll();
			self.getAll();
		};

		xhr.send(body);
	};

	self.updateComputer = function (data, id) {
		var xhr = new XMLHttpRequest();
		var body = JSON.stringify(DDWAApp.MakeupManager.FormReader.getDataForm(data));

		xhr.open("PUT", DDWAApp.CONSTANTS.SERVICE_URL + "/" + id, true);
		xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			//DDWAApp.computerService.getAll();
			self.getAll();
		};

		xhr.send(body);
	};
	
	self.getDetails = function (id, callback) {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', DDWAApp.CONSTANTS.SERVICE_URL + "/" +id, true);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState != 4) return;
			if (xhr.status == 200) {
				//debugger;
				var data = JSON.parse(xhr.responseText);
				var computer = createComputer(data);

				callback(computer, true);
			}
		}
	};

	function createComputer(data) {
		var computer;
		//alert(data.type);
        if (data.type === true || data.type === 'true') {
			computer = new DDWAApp.Models.Ultrabook();
			computer.initialize(data);
		} else {
			computer = new DDWAApp.Models.ComputerServise();
			computer.initialize(data);
		}
		return computer;
	}

	return self;
}();

document.addEventListener("DOMContentLoaded", function (event) {
	DDWAApp.ComputersService.getAll();
});