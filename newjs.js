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

//Allmän funktion som hämtar in data och skapar objekt med user-data, skulle kunna ha något liknande som en metod.
function getInfo() {
    let nmrOfQuestions = document.getElementById('nmrOfQuestions').value;
    let namn = document.getElementById('name').value;
    let theCategory =  document.getElementById('category').value;
    let cat;

    if(theCategory == "Sport") {
        cat = quizz.Sport;
    }
    else if(theCategory == "Teknik") {
        cat = quizz.Teknik;
    }
    else if(theCategory == "Gaming") {
        cat = quizz.Gaming;
    }
    else if(theCategory == "Historia") {
        cat = quizz.Historia;
    }
    game = new Quiz(namn, nmrOfQuestions);
    question = new Question(cat, nmrOfQuestions);
    game.startGame();
    
    
}
//Klasen Quiz håller reda på användarens Namn, antalet frågor, antalet rätt/fel och om det är klart.
class Quiz {
    constructor(name, nmrOfQuestions) {
        this.name = name;
        this.nmrOfQuestions = nmrOfQuestions; 
        this.correct = 0;
        this.done = 0;
    }
    startGame() {
        document.getElementById('catContainer').style.display = "none";
        document.getElementById('questionContainer').style.display = "block";      
        document.getElementById('the_header').innerHTML = "Lycka till! " + this.name;
        //Om spelet är klart
        if(this.done == 1) {
            document.getElementById('catContainer').style.display = "block";
            document.getElementById('questionContainer').style.display = "none";
            document.getElementById('score').innerHTML = "";
            document.getElementById('the_header').innerHTML = "";
            if(this.correct > 4) {
                alert("Bra jobbat "  + this.name + " du fick " + this.correct + " poäng");
            }
            else if (this.correct < 4 && this.correct > 0) {
                alert("inte okej " + this.name +  " du fick " + this.correct + " poäng");
            } else {
                alert("Du behöver öva quiz... " + this.name +  " du fick " + this.correct + " poäng");
            } 
            this.done = 0;
            this.correct = 0;
            question.chosenCat = "";
            let game = new Quiz();
           
        } 
        //Om spelet inte är klart så plussas variabler och kör
        else {
            console.log("Antal rätt: " + this.correct);
            question.i++;
            question.counter++;
            question.nextQuestion();
        }
       
    }
}

//Klassen Question håller redan på frågekategori, frågan, 
//svartsalternativen och en check-metod för att kolla om svaren är rätt eller inte
class Question {
    constructor(chosenCategory, nmrOfQuestions) {
        this.currentQuestion = chosenCategory;
        this.i = -1;
        this.nmrOfQuestions = nmrOfQuestions;
        this.responses = "";
        this.score = 0;
        this.counter = -1;
        
    }

    //Visar upp all data från json filen, frågor osv om spelet inte är klart
    nextQuestion() {
            if(this.counter == this.i && this.counter < this.nmrOfQuestions ) {
                console.log("Gick in");
                document.getElementById('text1').innerHTML = "Fråga " + (this.counter+1) + " av " + this.nmrOfQuestions;
                console.log("Runda: " + this.i);
                document.getElementById('question').innerHTML = this.currentQuestion[this.i].fråga;
                document.getElementById('label1').innerHTML = this.currentQuestion[this.i].answers[0].alternativ1;
                document.getElementById('label2').innerHTML = this.currentQuestion[this.i].answers[1].alternativ2;
                document.getElementById('label3').innerHTML = this.currentQuestion[this.i].answers[2].alternativ3;
                document.getElementById('label4').innerHTML = this.currentQuestion[this.i].answers[3].alternativ4;
                
            } else {
                console.log("Gick inte in");
                game.done = 1;
                game.startGame();  
            }     
    }

    //Checkar om checkboxes som "skickas in" och kollar om dem är true / false i jämförelse med jsonfilen
    checking() {
        this.responses = document.getElementsByName("response");
        for (let i = 0; i < this.responses.length; i++) {  
            if(this.responses[i].checked == true && this.currentQuestion[this.i].answers[i].correct == true) {
                console.log("denna checbox va rätt");
                game.correct++;
                
                document.getElementById('score').innerHTML = "Antal poäng: " + game.correct;
            } else if(this.responses[i].checked == true && this.currentQuestion[this.i].answers[i].correct == false){
                console.log("Denna checkbox va fel");
                game.correct--;
                document.getElementById('score').innerHTML = "Antal poäng: " + game.correct;
            }
        }
        //Plussar på variabler för att visa nästa rad i json(quizz)
        

        //Tömmer checkboxes
        for(let i = 0; i < this.responses.length; i++) {
            this.responses[i].checked = false;
        }
        game.startGame();
    }

}

function changeColor() {
    console.log("gonna do something here");
}


let game = new Quiz();
let question = new Question();


/*document.addEventListener('DOMContentLoaded', (event) => {
    let check = document.getElementById('nextQuestion');
    check.addEventListener("click", question.checking);
});*/
