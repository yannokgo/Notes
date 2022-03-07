const object = document.getElementById("svg-in");
const output = document.getElementById("canvas");
  
// File to XML DOM ********************************************

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    myFunction(this);
    }
};
xhttp.open("GET", "plain.svg", true);
xhttp.send();

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    document.getElementById("output").innerHTML += xmlDoc.getElementsByTagName("text")[0].childNodes[0].nodeValue;
}
  
// JS to XML DOM ***********************************************

var text, parser, xmlDoc;

text = "<bookstore><book>" +
"<title>Everyday Italian</title>" +
"<author>Giada De Laurentiis</author>" +
"<year>2005</year>" +
"</book></bookstore>";

parser = new DOMParser();
xmlDoc = parser.parseFromString(text,"text/xml");

document.getElementById("output").innerHTML +=
xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;



object.addEventListener('click', () => {
    myFunction();
});
