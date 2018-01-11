$(document).ready(function(){
    var game = {
        keyArray: [],
        getKeys: function(object){
            for (var key in object){
                this.keyArray.push(key);
            };
        },
        shuffle: function (array){
            var i = 0;
            var j = 0;
            var temp = "";
    
            for (i = array.length - 1; i > 0; i -= 1){
            j = Math.floor(Math.random() * i);
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            };
        }
    };

    game.getKeys(questions);
    game.shuffle(game.keyArray);

    console.log(game.keyArray);
    console.log(questions[game.keyArray[0]]);

});