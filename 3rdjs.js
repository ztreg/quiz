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
  
  loadJSON('my_data.json', function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    var quizz = actual_JSON;

    console.log(quizz.Sport[0].fråga);

  });


  class Quiz {
    constructor() {
        this.name = "Jonas";
        this.howManyQuestions = 6;
        this.chosen = "Odefinerad";

        }
}

class Question {
    constructor(chosenCategory) {
        this.chosenCat = [chosenCategory];
        //console.log(chosenCategory)
        this.currentQuestion = chosenCategory;
    }

    categoryy() {
        for(let x = 0; x < this.currentQuestion.length; x++) {
            if(this.chosenCat[x] == this.currentQuestion)
            {
                //console.log(this.chosenCat[x]);
                for(let i = 0; i < this.currentQuestion.length; i++) {

                    document.getElementById('text1').innerHTML = this.currentQuestion[i].fråga;
                    document.getElementById('label1').innerHTML = this.currentQuestion[i].alternativ1;
                    document.getElementById('label2').innerHTML = this.currentQuestion[i].alternativ2;
                    document.getElementById('label3').innerHTML = this.currentQuestion[i].alternativ3;
                    document.getElementById('label4').innerHTML = this.currentQuestion[i].alternativ4;
                    console.log(this.currentQuestion[i].fråga);
                    console.log(this.currentQuestion[i].alternativ1);
                    console.log(this.currentQuestion[i].alternativ2);
                    console.log(this.currentQuestion[i].alternativ3);
                    console.log(this.currentQuestion[i].alternativ4);
                    console.log(this.currentQuestion[i].svar);
                    //let quezt = this.sportQuestions[0].fråga;
                    //document.getElementById('question').innerHTML = quezt;
                    //document.getElementsByClassName('');
                }
            }
        }   
    }
}