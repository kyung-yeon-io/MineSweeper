var express = require('express');
var router = express.Router();


var GAME_SIZE	= 10;
var BUMB_COUNT	= 10;

var GAME_ARR	= new Array(GAME_SIZE);

router.get('/', (req, res, next) => {

	for(var i=0; i<GAME_ARR.length; i++){
		GAME_ARR[i] = new Array(GAME_SIZE);
		for(var j=0; j<GAME_ARR[i].length; j++){
			GAME_ARR[i][j] = "0";
		}
	}

	setBumb(0, (result) => {

		if(result.code == "0000")
		{
			res.render('index', { result:result, arr:GAME_ARR });		
			return;
		}

		bumbAnalysis(() => {
			res.render('index', { result:result, arr:GAME_ARR });	
		});

	});
});


const setBumb = (cnt, incallback) => {

	if(GAME_SIZE * GAME_SIZE < BUMB_COUNT){
		incallback({code:"0000", msg:"BUMB_COUNT ERR!"});
		return;
	}

	var x = parseInt(Math.random()*10);
	var y = parseInt(Math.random()*10);

	if(GAME_ARR[x][y] != "*"){

		GAME_ARR[x][y] = "*";
		cnt += 1;


		if(cnt == BUMB_COUNT) {
			incallback({code:1000});
		}

	}

	setBumb(cnt, incallback);
}


const bumbAnalysis = (incallback) => {


	for(var i=0; i<GAME_ARR.length; i++){
		for(var j=0; j<GAME_ARR.length; j++){
			if(GAME_ARR[i][j] == "*")
				setBumbCount(i, j);
			
		}
	}

	incallback();
}

const setBumbCount = (i, j) => {

	for(var x = i-1; x <= i+1; x++){
		for(var y = j-1; y <= j+1; y++){

			if(x >= 0 && x < GAME_SIZE && y >= 0 && y < GAME_SIZE && GAME_ARR[x][y] != "*"){
				GAME_ARR[x][y]++;
			}
		}
	}

}



module.exports = router;
