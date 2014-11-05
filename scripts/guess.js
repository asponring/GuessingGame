var game = {
    wordIndex: 0, 
    currentWord: "",
    currentDisplayWord: "",
    wrongLetters: "",
    gameOver: false,
    wordList: [
       'JavaScript', 
       'document', 
       'element', 
       'object', 
       'property', 
       'event', 
       'propagation',
       'listener', 
       'transition', 
       'animation'
    ]
};

game.nextWord = function () {
    if (game.wordIndex >= game.wordList.length) {
        game.wordIndex = 0;
    }
    
    return game.wordList[game.wordIndex++];
}

game.displayWord = function () {
    game.currentWord = game.nextWord();
    game.currentDisplayWord = "";
    for (var i = 0; i < game.currentWord.length; i++) {
        game.currentDisplayWord += "-";
    }
    $("h2").text(game.currentDisplayWord);
}

game.restart = function () {
    game.displayWord();
    game.gameOver = false;
    game.wrongLetters = "";
    $("progress").val(game.wrongLetters.length);
    $("#wrong").text("");
    $("#guess").val("");
    $('#guess').focus();
}

game.check = function () {
    if (game.wrongLetters.length >= 10) {
        $("#wrong").text("No more guesses - the correct answer was " + game.currentWord);
        game.gameOver = true;
    } else if (game.currentDisplayWord === game.currentWord) {
        game.gameOver = true;
        $("#wrong").text("Congratulations! You win!");
    } else {
        
    }
}

game.play = function () {
    if (game.gameOver === true) {
        
    } else {
    var theGuess = $("#guess").val().toLowerCase();
    var found = false;
    var tempWord = "";
    for (var i = 0; i < game.currentWord.length; i++) {
        if (theGuess === game.currentWord[i].toLowerCase()) {
            tempWord += game.currentWord[i];
            found = true;
        } else {
            tempWord += game.currentDisplayWord[i];
        }
    }
    game.currentDisplayWord = tempWord;
    $("h2").text(game.currentDisplayWord);
    
    if (found === false) {
        game.wrongLetters += theGuess;
        $("progress").val(game.wrongLetters.length);
        $("#wrong").text(game.wrongLetters);
    }
    }
    
    $("#guess").val("");
    $('#guess').focus();
    game.check();
}

$(document).ready(function () {
    game.restart();
    $('#submit').click(game.play);
    $('#restart').click(game.restart);
});