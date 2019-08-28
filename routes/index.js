const express = require('express');
const router = express.Router();

const { GAME_SIZE, setBomb, bombAnalysis } = require('../js');

router.get('/', async (req, res, next) => {
	const GAME_ARR	= new Array(GAME_SIZE);

	for(let i=0; i<GAME_ARR.length; i++){
		GAME_ARR[i] = new Array(GAME_SIZE);
		for(let j=0; j<GAME_ARR[i].length; j++){
			GAME_ARR[i][j] = "0";
		}
	}

	await setBomb(GAME_ARR, 0);

	await bombAnalysis(GAME_ARR);
	res.render('index', { arr: GAME_ARR });

});

module.exports = router;
