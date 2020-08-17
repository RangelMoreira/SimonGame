var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(window).keydown(function() {

    if (started === false) {
        nextSequence();
        started = true;
    }
});


$('.btn').click(function() {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    // console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;

    $('#level-title').text('Level ' + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // console.log(gamePattern);

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour);

    // nextSequence();

}


function animatePress(currentColour) {

    $('#' + currentColour).addClass('pressed').delay(100).queue(function(next) {
        $(this).removeClass('pressed');
        next();
    })

}

function playSound(name) {

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);

            userClickedPattern = [];
        }
    } else {
        playSound("wrong");

        $('body').addClass('game-over').delay(200).queue(function(next) {
            $(this).removeClass('game-over');
            next();
        });

        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();

    }



}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    // console.log(gamePattern);
}