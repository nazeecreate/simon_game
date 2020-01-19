var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern + " user");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  console.log(gamePattern + " game");
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.volume = 0.03;
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("game end");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}
