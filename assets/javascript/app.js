$(document).ready(function(){
    var game = {
        //array position of the question being asked
        count: 0,
        //total number of questions to be asked
        totalQuestions: 3,
        //time allotted to answer a question
        questionTime: 10,
        //time allotted for the answer page to be displayed
        answerTime: 5,
        //setInterval handle variable
        showQuestion: undefined,
        //variable to hold the user's answer
        userAnswer: undefined,
        //variable to hold the number of correct answers
        correct: 0,
        //variable to hold the number of incorrect answers
        incorrect: 0,
        //array to hold the data object properties
        keyArray: [],
        //method to populate the keyArray with the data object properties
        getKeys: function(object){
            for (var key in object){
                this.keyArray.push(key);
            };
        },
        //method to randomize an array
        shuffle: function(array){
            var i = 0;
            var j = 0;
            var temp = "";
            for (i = array.length - 1; i > 0; i -= 1){
                j = Math.floor(Math.random() * i);
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            };
        },
        //method to start the game
        begin: function(){
            //reset the html and variables
            $(".row").empty();
            this.count = 0;
            this.correct = 0;
            this.incorrect = 0;
            //populate and randomize the keyArray with the properties from questions
            this.getKeys(questions);
            this.shuffle(this.keyArray);
            //display the first question
            this.displayQuestion();
            //set the interval between each subsequent question
            this.showQuestion = setInterval(function(){
                game.nextQuestion()
            }, 1000 * (this.questionTime + this.answerTime));
        },
        //method to display each question
        displayQuestion: function(){
            //set function specific variables
            var q = questions[this.keyArray[this.count]].question;
            var c = questions[this.keyArray[this.count]].choices;
            var remTime = this.questionTime;
            //randomize the choices, clear the html, reset the userAnswer variable
            this.shuffle(c);
            $(".row").empty();
            this.userAnswer = undefined;
            //populate the html with current question of total questions
            document.getElementById("questionNum").innerHTML = "<p>Question " + (this.count + 1) + " of " + this.totalQuestions;
            //display the time left to answer the current question
            document.getElementById("timer").innerHTML = "<p>Remaining Time: " + remTime + " seconds</p>";
            //timer to count down the remaining time and when it hits 0 stop the timer and display the answer page
            var timeId = setInterval(function(){
                remTime -= 1;
                document.getElementById("timer").innerHTML = "<p>Remaining Time: " + remTime + " seconds</p>";
                if (remTime === 0){
                    clearInterval(timeId);
                    game.displayAnswer();
                }
            }, 1000);
            //display the current question and the choices
            document.getElementById("question").innerHTML = "<p>" + q + "</p>";
            for (var i = 0; i < c.length; i += 1){
                var bttn = document.createElement("button");
                bttn.className = "ans btn";
                bttn.setAttribute("data", c[i]);
                var t = document.createTextNode(c[i]);
                bttn.appendChild(t);
                document.getElementById("choices").appendChild(bttn);
            };
            //logs the value of the user's answer (was not able to figure out how to do this with vanilla javascript)
            $(".ans").on("focus", function(){
                game.userAnswer = $(this).attr("data");
            })
        },
        //method to display the answer page
        displayAnswer: function(){
            //set function specific variables and clear the html
            var a = questions[this.keyArray[this.count]].answer;
            var t = questions[this.keyArray[this.count]].trivia;
            var result;
            $(".row").empty();
            //evaluates the user's response and increments the appropriate variable
            if (this.userAnswer === a){
                result = "Correct!";
                this.correct += 1;
            }
            else if (this.userAnswer === undefined){
                result = "Unanswered!";
            }
            else {
                result = "Incorrect!";
                this.incorrect += 1;
            };
            //populate the html with the answer result, correct answer, and trivia tidbit
            document.getElementById("timer").innerHTML = "<p>" + result + "</p>";
            document.getElementById("question").innerHTML = "<p>" + a + "</p>";
            document.getElementById("choices").innerHTML = "<p>" + t + "</p>";
            //displays the final game statistics if this is the last question
            if ((this.count + 1) === this.totalQuestions){
                setTimeout(function(){
                    game.gameStats();
                }, 1000 * this.answerTime);
            };
        },
        //method to increment the count, stop the interval if it's the last question, and display the next question
        nextQuestion: function(){
            this.count += 1;
            if ((this.count + 1) === this.totalQuestions){
                clearInterval(this.showQuestion);
            };
            this.displayQuestion();
        },
        //method to display the final game statistics and add a button to start the game over
        gameStats: function(){
            $(".row").empty();
            document.getElementById("timer").innerHTML = "<p>Number Correct: " + this.correct + "</p>";
            document.getElementById("question").innerHTML = "<p>Number Incorrect: " + this.incorrect + "</p>";
            document.getElementById("choices").innerHTML = "<p>Number Unanswered: " + (this.totalQuestions - (this.correct + this.incorrect)) + "</p>";
            document.getElementById("begin").innerHTML = "<button id = 'start' class = 'btn'>Start Over?</button>";
            document.getElementById("start").onclick = function(){
                game.begin();
            };
        }
    };

    //initial on-load page (button to start the game)
    document.getElementById("begin").innerHTML = "<button id = 'start' class = 'btn'>Start</button>";

    document.getElementById("start").onclick = function(){
        game.begin();
    };
});