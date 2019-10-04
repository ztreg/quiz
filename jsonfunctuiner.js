//Variabeln som ska spara all JSON data.
var quizz;

//Funktionen loadJSON som gör error checks om inte saker hämtas som det ska.
function loadJSON(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);  
  }
  
  //tar datan från json-filen och lägger i variabeln "quizz"
  loadJSON('my_data.json', function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    
    quizz = actual_JSON;
    return quizz;
  });