var quizz;

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
    quizz = actual_JSON;
  });

function choseCategory1() {
    //let nmrOfQuestions = document.getElementById('antalFrågor').value;
    game = new Question(quizz.Sport, 4);
    game.categoryy();
    
}
function choseCategory2() {
    //let nmrOfQuestions = document.getElementById('antalFrågor').value;
    game = new Question(quizz.Teknik, 4);
    game.categoryy();
    
}
function choseCategory3() {
    //let nmrOfQuestions = document.getElementById('antalFrågor').value;
    game = new Question(quizz.Gaming, 4);
    game.categoryy();
}
function choseCategory4() {
    //let nmrOfQuestions = document.getElementById('antalFrågor').value;
    game = new Question(quizz.Historia, 4);
    game.categoryy();
    
}


class Quiz {
    constructor(name) {
        this.name = name;
        this.chosen = "Odefinerad";
        }
        restart() {
            location.reload();
        }
}

class Question {
    constructor(chosenCategory, nmrOfQuestions) {
        this.chosenCat = chosenCategory;
        //console.log(chosenCategory)
        this.currentQuestion = chosenCategory;
        this.counter = plussare;
        this.i = 0;
        this.nmrOfQuestions = nmrOfQuestions;
        this.responses = "";
        this.score = 0;
    }

    categoryy() {
        document.getElementById('catContainer').style.display = "none";
        document.getElementById('questionContainer').style.display = "block";      
            if(this.counter == this.i && this.counter < this.nmrOfQuestions ) {
                document.getElementById('text1').innerHTML = "Fråga " + (this.counter+1) + " av " + this.nmrOfQuestions;
                console.log("Runda: " + this.i);
                document.getElementById('question').innerHTML = this.currentQuestion[this.i].fråga;
                document.getElementById('label1').innerHTML = this.currentQuestion[this.i].answers[0].alternativ1;
                document.getElementById('label2').innerHTML = this.currentQuestion[this.i].answers[1].alternativ2;
                document.getElementById('label3').innerHTML = this.currentQuestion[this.i].answers[2].alternativ3;
                document.getElementById('label4').innerHTML = this.currentQuestion[this.i].answers[3].alternativ4;
                
            } else {
                //Visar score, resettar egenskaperna och gör ett nytt game
                alert("Du fick " + this.score + " poäng!");
                document.getElementById('catContainer').style.display = "block";
                document.getElementById('questionContainer').style.display = "none";
                this.i = 0;
                this.nmrOfQuestions = 0;
                this.counter = 0;
                this.chosenCat = "";
                let game = new Question();
                

            }     
    }

    //Checkar om checkboxes som "skickas in" och kollar om dem är true / false i jämförelse med jsonfilen
    checking() {
        this.responses = document.getElementsByName("response");
        for (let i = 0; i < this.responses.length; i++) {
            if(this.responses[i].checked == true && this.currentQuestion[this.i].answers[i].correct == true) {
                console.log("Du fick +poäng!");
                console.log(this.currentQuestion[this.i].answers[i].correct);
                this.score++;
            } else if(this.responses[i].checked == true && this.currentQuestion[this.i].answers[i].correct == false){
                console.log("Du fick -poäng!");
                this.score--;
            }
        }
        console.log("Antal rätt: " + this.score);
        this.counter++;
        this.i++;
        this.categoryy();
        console.log("hej");

        //Tömmer checkboxes
        for(let i = 0; i < this.responses.length; i++) {
            this.responses[i].checked = false;
        }
    }

}

let plussare = 0;


function changeColor() {
    console.log("gonna do something here");
}


//let test = getJSON('http://www.mocky.io/v2/5d90a9ad3000007000cacf96.json');

let itsTime = new Quiz();
let game = new Question();
//question.category == question.chosenCat;

//////////

