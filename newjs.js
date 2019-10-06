//Variabeln som ska spara all JSON data.
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
  
  //tar datan från json-filen och lägger i variabeln "quizz"
  loadJSON('my_data.json', function(response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    
    quizz = actual_JSON;
  });


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

            document.getElementById('the_header').innerHTML = "Bra jobbat "  + this.name + " du fick " + this.correct + " poäng";
            alert("Bra jobbat "  + this.name + " du fick " + this.correct + " poäng");
            this.done = 0;
            this.correct = 0;
            this.nmrOfQuestions = 0;
            let game = new Quiz();
           
        } 
        //Om spelet inte är klart så plussas variabler och kör ut nästa frågax
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
        this.chosenCategory = chosenCategory;
        this.i = -1;
        this.nmrOfQuestions = nmrOfQuestions;
        this.score = 0;
        this.counter = -1;
        
    }

    //Visar upp all data från json filen, frågor osv om spelet inte är klart
    nextQuestion() {
            if(this.counter == this.i && this.counter < this.nmrOfQuestions ) {
                document.getElementById('text1').innerHTML = "Fråga " + (this.counter+1) + " av " + this.nmrOfQuestions;
                console.log("Runda: " + this.i);
                document.getElementById('question').innerHTML = this.chosenCategory[this.i].fråga;
                document.getElementById('label1').innerHTML = this.chosenCategory[this.i].answers[0].alternativ1;
                document.getElementById('label2').innerHTML = this.chosenCategory[this.i].answers[1].alternativ2;
                document.getElementById('label3').innerHTML = this.chosenCategory[this.i].answers[2].alternativ3;
                document.getElementById('label4').innerHTML = this.chosenCategory[this.i].answers[3].alternativ4;
                
            } else {
                console.log("Gick inte in");
                game.done = 1;
                game.startGame();  
            }     
    }

    //Checkar om checkboxes som "skickas in" och kollar om dem är true / false i jämförelse med jsonfilen 
    // Om något av svaren är fel så den ur loopen och man får man 0 poäng, sedan anropas nästa
    checking() {
        let right = 0;
        let wrong = 0;
        let responses = document.getElementsByName("response");
        for (let i = 0; i < responses.length && wrong == 0; i++) {  
            if(responses[i].checked == true && this.chosenCategory[this.i].answers[i].correct == true) {
                right = 1;
                console.log("Snyggt");
                
            } else if(responses[i].checked == true && this.chosenCategory[this.i].answers[i].correct == false){
                console.log("Du hade minst 1 fel och därför fick du inte poäng");
                right = 0;
                wrong = 1;
            }
        }
        game.correct = (game.correct + right);
        document.getElementById('score').innerHTML = "Antal poäng: " + game.correct;
        console.log("totala frågor rätt "+ game.correct);
        
        //Tömmer checkboxes
        for(let i = 0; i < responses.length; i++) {
            responses[i].checked = false;
        }
        game.startGame();
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
        //Allmän funktion som hämtar in data och skapar objekt med user-data, skulle kunna ha något liknande som en metod.
        function getInfo() {
        let nmrOfQuestions = document.getElementById('nmrOfQuestions').value;
        let namn = document.getElementById('name').value;
        let theCategory =  document.getElementById('category').value;
        let cat;

        if(theCategory == "Sport") {
            document.getElementById('categoryDisplay').innerHTML = "Kategori: Sport";
            cat = quizz.Sport;
        }
        else if(theCategory == "Teknik") {
            document.getElementById('categoryDisplay').innerHTML = "Kategori: Teknik";
            cat = quizz.Teknik;
        }
        else if(theCategory == "Gaming") {
            document.getElementById('categoryDisplay').innerHTML = "Kategori: Gaming";
            cat = quizz.Gaming;
        }
        else if(theCategory == "Historia") {
            document.getElementById('categoryDisplay').innerHTML = "Kategori: Historia";
            cat = quizz.Historia;
        }
        //Här skickas datan in
        game = new Quiz(namn, nmrOfQuestions);
        question = new Question(cat, nmrOfQuestions);
        game.startGame();   
    }


    let getData = document.getElementById('start');
    getData.addEventListener("click", getInfo);
});
