  /*
    • Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
    • Låt användaren bestämma hur många frågor som ska visas.
    • Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
    • Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. 
    (Hur kan vi lösa det?)
    • Lämna in projektet som ett git-repo.
    • VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till 
    frågan och kontrollera vilka alternativ som är korrekt ifyllda.
    • VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
    • VG: Responsiv design (edited) 
    */


//Håller reda på användarens namn, använders antal frågor och vilka frågor som existerar.

class Quiz {
    constructor() {
        this.pName = prompt("Vad heter du?");
        this.nmrOfQuestions = prompt("Hur många frågor vill du spela? 1-3");
        this.sport = [
                "Hur många mål har en fotbollsplan?",
                "Hur många spelare spelar på en fotbollsplan?",
                "Hur lång är en fotbollsmatch?",
                "Hur många poäng är vunnen boll i tennis?"
            ];
        this.teknik = [
                "Vad är en i5-6600k för något?",
                "Hur många hz tar en hdmi?",
                "Vad gör mouseacceleration?"
            ];
        this.historia = [  
                "När skapades första bilen?",
                "När slutade andra väldskriget?",
                "När startade första världskriget?"
            ];
        this.programmering = [
                "Vad är skillnaden mellan en span och en div?",
                "Vad gör en for-loop?",
                "hur anropar jag metoden hej i klassen hälsa?"
            ];

        this.sportAnswers = [
                "fråga1 svar 1",
                "fråga1 svar 2",
                "fråga1 svar 3",
                "fråga1 svar 4",
                "fråga2 svar 1",
                "fråga2 svar 2",
                "fråga2 svar 3",
                "fråga2 svar 4",
                "fråga3 svar 1",
                "fråga3 svar 2",
                "fråga3 svar 3",
                "fråga3 svar 4",
                "fråga4 svar 1",
                "fråga4 svar 2",
                "fråga4 svar 3",
                "fråga4 svar 4",
                "fråga5 svar 1",
                "fråga5 svar 2",
                "fråga5 svar 3",
                "fråga5 svar 4" 
            ];

        this.qAnswered = [];

    }

    back() {
        document.getElementById('catContainer').style.display = "inline-block";
        document.getElementById('questionContainer').style.display = "none";
    }
    


}

//Håller reda på vilken kategori som körs och ger frågor utifrån det.
class Question {
    constructor() {
        this.category = "";
        this.currentQuestion = 0;
        this.correctAnswer = [2, 1, 3, 4];
        this.answers = 0;
        this.counter = 0;
        this.currentAnswer = 0;
    }

    category1 () {
        this.category = document.getElementsByClassName('category')[0].innerHTML;
        this.categoryQuestion();
    }
    category2 () {
        this.category = document.getElementsByClassName('category')[1].innerHTML;
        this.categoryQuestion();
    }
    category3 () {
        this.category = document.getElementsByClassName('category')[2].innerHTML;
        this.categoryQuestion();
    }
    category4 () {
        this.category = document.getElementsByClassName('category')[3].innerHTML;
        this.categoryQuestion();
    }
    categoryQuestion() {
        console.log(this.counter);
        if(this.counter == player.nmrOfQuestions) {
            alert("Spelet är klart!");
        }
        else{
            document.getElementById('catContainer').style.display = "none";
            document.getElementById('questionContainer').style.display = "inline-block";
            if(this.category == "Sport") {
                console.log("Nu äre dags för sport!");
                document.getElementById("question" + this.counter).innerHTML = player.sport[this.counter];
                this.counter++;
                
                for(let i = (0 + this.currentAnswer); i <= (3 + this.currentAnswer); i++) {
                        document.getElementsByClassName('answer')[i].innerHTML = player.sportAnswers[i];
                        //if(player.sportAnswers[i] == )
                        console.log(player.sportAnswers[i].innerHTML);
                    }
                    this.currentAnswer += 4;
            }
            if(this.category == "Teknik") {
                for(let i = 0; i < player.nmrOfQuestions; i++) {
                    document.getElementById("question" + i).innerHTML = player.teknik[i];
                }
                
            }
            if(this.category == "Programmering") {
                for(let i = 0; i < player.nmrOfQuestions; i++) {
                    document.getElementById("question" + i).innerHTML = player.programmering[i];
                }
                
            }
            if(this.category == "Historia") {
                for(let i = 0; i < player.nmrOfQuestions; i++) {
                    document.getElementById("question" + i).innerHTML = player.historia[i];
                }
            }
        }

    }
}


let player = new Quiz();
let playerQ = new Question();


document.getElementById('text1').innerHTML = "Väkommen till matchen : " + player.pName; 


//let Question = [];


console.log(player.pName);

