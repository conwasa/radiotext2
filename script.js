window.onload = function () {
	setTimeout(showRevisionsButton, 10000)
} 



console.log('goose');
function reloadJSON() {
	console.log('in reload json');
    var file = document.getElementById("selectJSON").value;
    var URL = 'http://conwasa.github.io/radiotext2/' + file;
    getAndRenderJSON(URL);
}

console.log('hello');
var ourRequest = new XMLHttpRequest();
/* ourRequest.open('GET', 'http://conwasa.github.io/radiotext2/WorldAtOne-20180816_first_2mins.json'); */
/* ourRequest.open('GET', 'http://conwasa.github.io/radiotext2/womans_hour_2mins.json') */
var URL = 'http://conwasa.github.io/radiotext2/womans_hour_2mins.json';

getAndRenderJSON(URL);

function getAndRenderJSON(URL) { 
  ourRequest.open('GET', URL);
  ourRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is read;
	  console.log('ready state good');
 	  data = JSON.parse(ourRequest.responseText); /* made into a global variable for debugging */
	  console.log('data=' + data);
	  createHTML(data);
    } else {
	   console.log('readyState=' + this.readyState + ' status=' +this.status);
    }
  };
  ourRequest.onerror = function () {
    console.log('connection error');
  }
  ourRequest.send();
} /*end of getAndRenderJSON */
  Handlebars.registerHelper("calculateAge", function(birthYear) {   /* this is from the tutorial */
	  var age = new Date().getFullYear() - birthYear;
	  if (age > 2) {
		  return age + " years old";
	  } else {
		  return "Less than three years old";
	  }
  })

  function createHTML (textData) {
	  var rawTemplate = document.getElementById("textTemplate").innerHTML;
	  var compiledTemplate = Handlebars.compile(rawTemplate);
	  var ourGeneratedHTML = '<div contenteditable="true" id="text1" onfocus="showEditButton()" cols="80" rows="40">' 
							 + compiledTemplate(textData) + '</div>';
	
	  var textContainer = document.getElementById("text-container");
	  textContainer.innerHTML = ourGeneratedHTML;
};
function showEditButton () {
	console.log('in showEditButton');
	var editButton = document.getElementById("edit-button");
	editButton.innerHTML = '<button type="button" onclick="sendEdits()">Send Edits</button>';
	/* make the input box white background */
	document.getElementById("text1").style.background = "white";
	
};
function sendEdits() {
	var editButton = document.getElementById("edit-button");
	editButton.innerHTML = 'Thank You!';
	document.getElementById("text1").style.background = 'linen';


}
/* } */



function showRevisions () { /* textarea code is a cut and paste from createHTML - refactor */
  var URL = 'http://conwasa.github.io/radiotext2/corrected_R4_text.html';
  getAndRenderHTML(URL);
  var revisionsButton = document.getElementById("revisions-button");
  revisionsButton.innerHTML = '';

  }

function getAndRenderHTML(URL) { 
  ourRequest.open('GET', URL);
  ourRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Action to be performed when the document is read;
	  console.log('ready state good in renderHTML');
 	  var htmlRevisedTextBox = '<div contenteditable="true" id="text1" onfocus="showEditButton()" cols="80" rows="40">' 
							 + ourRequest.responseText + '</div>';
							 
	  var textContainer = document.getElementById("text-container");
	  textContainer.innerHTML = htmlRevisedTextBox;
	  
    } else {
	   console.log('readyState=' + this.readyState + ' status=' +this.status);
    }
  };
  ourRequest.onerror = function () {
    console.log('connection error');
  }
  ourRequest.send();
} /*end of getAndRenderHTML */
function showRevisionsButton () {
	console.log('in showRevisonstButton');
	var revisionsButton = document.getElementById("revisions-button");
	revisionsButton.innerHTML = '<button type="button" onclick="showRevisions()">Revised Text is Available</button>';
	/* make the input box white background */
	document.getElementById("text1").style.background = 'Orange';
	
};
