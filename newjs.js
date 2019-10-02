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
  });


function getInfo() {
    let nmrOfQuestions = document.getElementById('nmrOfQuestions').value;
    let namn = document.getElementById('name').value;
    let theCategory =  document.getElementById('category').value;
    let send;

    if(theCategory == "Sport") {
        send = quizz.Sport;
    }
    else if(theCategory == "Teknik") {
        send = quizz.Teknik;
    }
    else if(theCategory == "Gaming") {
        send = quizz.Gaming;
    }
    else if(theCategory == "Historia") {
        send = quizz.Historia;
    }
    game = new Question(send, nmrOfQuestions, namn);
    game.startGame();
    
    
}
/*function choseCategory2() {
    let nmrOfQuestions = document.getElementById('nmrOfQuestions').value;
    let namn = document.getElementById('name').innerHTML;
    game = new Question(quizz.Teknik, nmrOfQuestions, namn);
    game.categoryy();
    
}
function choseCategory3() {
    let nmrOfQuestions = document.getElementById('nmrOfQuestions').value;
    let namn = document.getElementById('name').innerHTML;
    game = new Question(quizz.Gaming, nmrOfQuestions, namn);
    game.categoryy();
}
function choseCategory4() {
    let nmrOfQuestions = document.getElementById('nmrOfQuestions').value;
    let namn = document.getElementById('name').innerHTML;
    game = new Question(quizz.Historia, nmrOfQuestions, namn);
    game.categoryy();
    
}*/

class Quiz {
    constructor(name, questions, counter) {
        this.name = name;
        this.questions = questions;
        this.counter = counter;
    }
}

class Question {
    constructor(chosenCategory, nmrOfQuestions, name) {
        this.category = chosenCategory;
        this.name = name;
        this.currentQuestion = chosenCategory;
        this.counter = plussare;
        this.i = 0;
        this.nmrOfQuestions = nmrOfQuestions;
        this.responses = "";
        this.score = 0;
        console.log(this.chosenCategory);

        //Check för att se till att användaren följer intruktioner med nummer av frågor
        if(this.nmrOfQuestions > 4 || this.nmrOfQuestions < 1) {
            alert("följ instruktioner tack");
            location.reload();
        }
    }

    //VisstartGamear upp all data från json filen, frågor osv
    startGame() {
        document.getElementById('catContainer').style.display = "none";
        document.getElementById('questionContainer').style.display = "block";      
        document.getElementById('the_header').innerHTML = "Lycka till! " + this.name +  " haha";
            if(this.counter == this.i && this.counter < this.nmrOfQuestions ) {
                document.getElementById('text1').innerHTML = "Fråga " + (this.counter+1) + " av " + this.nmrOfQuestions;
                console.log("Runda: " + this.i);
                document.getElementById('question').innerHTML = this.currentQuestion[this.i].fråga;
                document.getElementById('label1').innerHTML = this.currentQuestion[this.i].answers[0].alternativ1;
                document.getElementById('label2').innerHTML = this.currentQuestion[this.i].answers[1].alternativ2;
                document.getElementById('label3').innerHTML = this.currentQuestion[this.i].answers[2].alternativ3;
                document.getElementById('label4').innerHTML = this.currentQuestion[this.i].answers[3].alternativ4;
                
            } else {
                //Visar totalscore, resettar egenskaperna och gör ett nytt game
                alert("Du fick " + this.score + " poäng!");
                document.getElementById('catContainer').style.display = "block";
                document.getElementById('questionContainer').style.display = "none";
                document.getElementById('score').innerHTML = "";

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
                console.log(this.currentQuestion[this.i].answers[i].correct);
                this.score++;
                document.getElementById('score').innerHTML = "Antal poäng: " + this.score;
            } else if(this.responses[i].checked == true && this.currentQuestion[this.i].answers[i].correct == false){
                console.log("Du fick -poäng!");
                this.score--;
                document.getElementById('score').innerHTML = "Antal poäng: " + this.score;
            }
        }
        console.log("Antal rätt: " + this.score);
        this.counter++;
        this.i++;
        this.startGame();
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


