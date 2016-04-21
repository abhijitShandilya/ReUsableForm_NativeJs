
/* ========== User Configuration ========== */
var formElems = {
    width: "500px",
    textFieldLabel: "username",
    addBtnLabel: "add",
    successMessage: "Successfully added to the list",
    errorMessageBlank: "Error : Entry cannot be blank",
    errorMessageInvalid: "Error : Please enter a valid input",
    deleteAllBtnLabel: "delete all",
    countLabel: "total no. of entries :",
    submitBtnLabel: "submit"
}

/* ========== Function on a Row ========== */
function editRow(e) {
    showEditMode(e);
}

function saveRow(e) {
    //save edited value to label
	e.parentNode.parentNode.getElementsByTagName('label')[0].innerHTML =
        e.parentNode.parentNode.getElementsByClassName('edit-name')[0].value;
    hideEditMode(e);
}

function deleteRow(e) {
    e.parentNode.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode.parentNode);
    var count = document.getElementById("count");
    count.innerHTML = parseInt(count.innerHTML) - 1; // decrease count
	
	if (parseInt(count.innerHTML) == 0) { // hide delete all button if list is empty
	document.getElementById("deleteAll").style.visibility = "hidden";
	}
}

function discardEditRow(e) {
    //discard edit : reset text input to original value in label
	e.parentNode.parentNode.getElementsByClassName('edit-name')[0].value =
        e.parentNode.parentNode.getElementsByTagName('label')[0].innerHTML;
    hideEditMode(e);
}

/* ========== Change Row Content : Edit and Non-Edit Mode ========== */
function showEditMode(e) {
	// hide - label value, edit + remove row button
	// show - prepopulated input box to edit, save + cancel button
    e.parentNode.parentNode.getElementsByTagName('label')[0].className = "custom-label hide";
    e.parentNode.parentNode.getElementsByClassName('edit-name')[0].className = "edit-name";
    e.parentNode.parentNode.getElementsByClassName('edit')[0].className = "edit hide";
    e.parentNode.parentNode.getElementsByClassName('remove')[0].className = "remove hide";
    e.parentNode.parentNode.getElementsByClassName('save')[0].className = "save";
    e.parentNode.parentNode.getElementsByClassName('cancel')[0].className = "cancel";
}

function hideEditMode(e) {
	// hide - input text box, save + cancel button
	// show - updated label value, edit + remove row button
    e.parentNode.parentNode.getElementsByTagName('label')[0].className = "custom-label";
    e.parentNode.parentNode.getElementsByClassName('edit-name')[0].className = "edit-name hide";
    e.parentNode.parentNode.getElementsByClassName('save')[0].className = "save hide";
    e.parentNode.parentNode.getElementsByClassName('cancel')[0].className = "cancel hide";
    e.parentNode.parentNode.getElementsByClassName('edit')[0].className = "edit";
    e.parentNode.parentNode.getElementsByClassName('remove')[0].className = "remove";
}

/* ========== Dynamically populating the form Component ========== */

window.onload = function() {
	
	var forms = document.getElementsByClassName("form-container");
    if (forms.length > 0) { // if at least one form coponent called, then fill up that component
        loadForm();
    }

    /* ========== Delete All Rows ========== */
	document.getElementById("deleteAll").onclick = function() {
        var ul = document.getElementById('list');
        var li = ul.getElementsByTagName('li');
        
		//iterate via and delete all li
		if (li.length > 0) {
            if (confirm("Are You Sure ? ") == true) { // confirm befre delete all
                document.getElementById("list").innerHTML = "";
                document.getElementById("count").innerHTML = "0"; // Entry count becomes 0
				document.getElementById("deleteAll").style.visibility = "hidden";
				
            } else {
                return false;
            }
        } else { // show appropriate error message
            document.getElementById("errorMsg").style.visibility = "visible";
            document.getElementById("errorMsg").className = "msg error-msg";
            document.getElementById("errorMsg").innerHTML = "Error in Delete";
            return false;
        }
    }

    /* ========== Hide error message on clicking on text input ========== */
	document.getElementById("name").onkeydown = function() {
        document.getElementById("errorMsg").innerHTML = "";
        document.getElementById("errorMsg").style.visibility = "hidden";
    }

    /* ========== add the entered value to list ========== */
	document.getElementById("add").onclick = function() {
        var textElem = document.getElementById("name");
        var text = textElem.value;
        
		// append li to ul
		if (/\S/.test(text)) { // if input contains at least 1 non white space char
            var ul = document.getElementById("list");
            var li = document.createElement("li"); // create li node
            
			li.innerHTML = // fill li with this html
			'<div>'
			+ 	'<label class="custom-label">' 
			+ 	text 
			+ 	'</label>' 
			+ '<input class="edit-name hide" type="text" value="">' 
			+ 	'<span class="remove"><input type="button" value="Remove" onClick="deleteRow(this)" /></span>' 
			+ 	'<span class="edit" ><input type="button" value="Edit" onClick="editRow(this)" /></span>' 
			+ 	'<span class="cancel hide"><input type="button" class="cancel" value="Cancel" onClick="discardEditRow(this)" /></span>' 
			+ 	'<span class="save hide"><input type="button" value="Save" onClick="saveRow(this)" /></span>' 
			+ '</div>';
			li.getElementsByClassName('edit-name')[0].value = text;
            
			ul.appendChild(li); // apend li
            
			var count = document.getElementById("count");
            count.innerHTML = parseInt(count.innerHTML) + 1; // increase count of entries
	
			document.getElementById("deleteAll").style.visibility = "visible";
			        
			// show success message
			document.getElementById("errorMsg").style.visibility = "visible";
            document.getElementById("errorMsg").className = "msg success-msg";
            document.getElementById("errorMsg").innerHTML = formElems.successMessage;
        } else if (text.length > 0) {
			// white space entry -- show appropriate error message
            document.getElementById("errorMsg").style.visibility = "visible";
            document.getElementById("errorMsg").className = "msg error-msg";
            document.getElementById("errorMsg").innerHTML = formElems.errorMessageInvalid;
        } else {
			// blank entry -- show appropriate error message
            document.getElementById("errorMsg").style.visibility = "visible";
            document.getElementById("errorMsg").className = "msg error-msg";
            document.getElementById("errorMsg").innerHTML = formElems.errorMessageBlank;
        }
        textElem.value = ""; // reset input box
    }

    /* ========== fill <form> tag with html ========== */
	function loadForm() {
		
		var forms = document.getElementsByClassName("form-container");
		for (var i = 0; i < forms.length; i++) {
			
		forms[i].innerHTML =  // ========== Form Template Start ========== 
									'<div>'
										+ '<div>'
											+ '<div class="data-entry"><label class="custom-label" id="inputLabel">enter text</label>'
												+ '<div>'
													+ '<input type="text" id="name" name="firstname" value="">'
												+ '</div>'
												+ '<span><input type="button" class="add-btn" value="add to list" id="add" /></span>'
											+ '</div>'
											+ '<div class="msg" id="errorMsg"></div>'
											+ '<div class="name-list">'
												+ '<label class="custom-label" id="columnName">Names</label>'
													+ '<span>'
														+ '<input type="button" class="delete-all" value="delete all" id="deleteAll" /></span>'
											+ '</div>'
											+ '<ul id="list"></ul>'
											+ '<div class="count-wrpper custom-label">'
												+ '<label id="countLabel">total no. of entries : </label><span id="count"></span>'
											+ '</div>'
										+ '</div>'
										+ '<div class="submit-wrapper">'
											+ '<input type="submit" id="submit" value="Submit">'
										+ '</div>'
									+ '</div>'
									// ========== Form Template End ==========
			forms[i].style.width = formElems.width;
			document.getElementById("count").innerHTML = "0";
			document.getElementById("deleteAll").style.visibility = "hidden";
		}
		
		// set user configurations
        document.getElementById("inputLabel").innerHTML = formElems.textFieldLabel;
        document.getElementById("columnName").innerHTML = "List of " + formElems.textFieldLabel + "s";
        document.getElementById("countLabel").innerHTML = formElems.countLabel;
        document.getElementById("add").value = formElems.addBtnLabel;
        document.getElementById("deleteAll").value = formElems.deleteAllBtnLabel;
        document.getElementById("submit").value = formElems.submitBtnLabel;
    }
	
	/* ========== submit form ========== */

    document.getElementById("submit").onclick = function() {
        var ul = document.getElementById('list');
        var li = ul.getElementsByTagName('li');
        
		// if ul is not empty
		if (li.length > 0) {
            var array = new Array();
			
			// iterate through ul and fill array with li entry
            for (var i = 0; i < li.length; i++) {
                var label = li[i].getElementsByTagName('label');
                var text = label[0].innerText;
                array.push(text);
            }
			alert ("The array you submitted contains the following elements \n \n"+  array);
            return array;
        } else {
			// if lis is empty - show error message
            document.getElementById("errorMsg").style.visibility = "visible";
            document.getElementById("errorMsg").className = "msg error-msg";
            document.getElementById("errorMsg").innerHTML = "Nothing to Submit : List is Empty";
            return false;
        }
    }
};