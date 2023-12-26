// =================================================================== Déplacement du canard ===================================================================

var speed = 50;
var game = true;
var canard = document.querySelector('#canard');
var imageDuck = document.querySelector('#duckImage');
canard.style.top = '0px';
canard.style.left = '0px';
canard.style.backgroundImage = 'url("../img/duck/right1.png")';
document.addEventListener('keypress', function(evt) {
  var top = parseInt(canard.style.top);
  var left = parseInt(canard.style.left);
  
  if(game == true){
    if(evt.key == 'd') {
      left = left + speed;

      if(canard.style.backgroundImage == 'url("../img/duck/right1.png")') {
        canard.style.backgroundImage = 'url("../img/duck/right2.png")';
      } else if(canard.style.backgroundImage == 'url("../img/duck/right2.png")') {
        canard.style.backgroundImage = 'url("../img/duck/right3.png")';
      } else if(canard.style.backgroundImage == 'url("../img/duck/right3.png")') {
        canard.style.backgroundImage = 'url("../img/duck/right1.png")';
      } else {
        canard.style.backgroundImage = 'url("../img/duck/right1.png")';
      }
    }
  
    if(evt.key == 'q') {
      left = left - speed;

      if(canard.style.backgroundImage == 'url("../img/duck/left1.png")') {
        canard.style.backgroundImage = 'url("../img/duck/left2.png")';
      } else if(canard.style.backgroundImage == 'url("../img/duck/left2.png")') {
        canard.style.backgroundImage = 'url("../img/duck/left3.png")';
      } else if(canard.style.backgroundImage == 'url("../img/duck/left3.png")') {
        canard.style.backgroundImage = 'url("../img/duck/left1.png")';
      } else {
        canard.style.backgroundImage = 'url("../img/duck/left1.png")';
      }

    }
  
    if(evt.key == 'z') {
      top = top - speed;
    }
  
    if(evt.key == 's') {
      top = top + speed;
    }
  
    if(top < 0) {
      top = 0;
      canard.style.top = top + 'px';
    } else if(top > 540) {
      top = 540;
      canard.style.top = top + 'px';
    } else {
      canard.style.top = top + 'px';
    }
  
    if(left < 0) {
      left = 0;
      canard.style.left = left + 'px';
    } else if(left >= 1200) {
      left = 1200;
      canard.style.left = left + 'px';
    } else {
      canard.style.left = left + 'px';
    }
  }
});


// =================================================================== Déroulement partie ===================================================================

var hunt = document.querySelector('#hunt');
var duck = document.querySelector('#duck'); 
var timer = document.querySelector('#time');
var textWin = document.querySelector('#textWin');
var screen = document.querySelector('#screen');
var scoreHunt = 0, scoreDuck = 0;
var timerInterval;

function resetTimer() {
  window.clearTimeout(timerInterval);
  game = true;
  timer.innerHTML = '00:00';
  hunt.innerHTML = 0;
  duck.innerHTML = 0;
  scoreHunt = 0;
  scoreDuck = 0;
  textWin.innerHTML = "";
  screen.style.display = "none";
}

function startTimer() {
  var second = 0, minute = 0;
  resetTimer();
  timerInterval = setInterval(function (){
      second++;
      timer.innerHTML = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
      if(second == 59) {
        minute++;
        second = -1;
      }
      if((second % 10) == 0) { // ajouter 1 point au canard toutes les 10 secondes
        duck.innerHTML = scoreDuck +=1;
      }
      if(minute >= 2 && second >= 0) { // la partie s'arrête au bout de 2 minutes
        screen.style.display = "contents";
        clearInterval(timerInterval);
        game = false;
        if(scoreDuck > scoreHunt) textWin.innerHTML = "Le canard a gagné !";
        if(scoreDuck < scoreHunt) textWin.innerHTML = "Le chasseur a gagné !";
        if(scoreDuck == scoreHunt) textWin.innerHTML = "Egalité !";
      }
  }, 1000);
} 

startTimer(); // commencer la partie dès que l'écran charge

canard.addEventListener('click', function() {
  if(game == true){
    scoreHunt += 1;
    hunt.innerHTML = scoreHunt;
    canard.style.backgroundImage = 'url("../img/duck/shoot.png")';
  }
});

// =================================================================== Bouton reset ===================================================================

var reset = document.querySelector('#reset');

reset.addEventListener('click', function() {
  startTimer()
});