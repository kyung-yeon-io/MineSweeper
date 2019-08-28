const GAME_SIZE	= 10;
const BOMB_COUNT	= 10;

const setBomb = async (GAME_ARR, cnt) => {

  if(GAME_SIZE * GAME_SIZE < BOMB_COUNT){
    throw Error("bomb count err!");
  }

  const x = parseInt(Math.random()*10);
  const y = parseInt(Math.random()*10);

  if(GAME_ARR[x][y] !== "*"){

    GAME_ARR[x][y] = "*";
    cnt += 1;

    if(cnt == BOMB_COUNT) {
      return;
    }

  }

  return setBomb(GAME_ARR, cnt);
};

const bombAnalysis = async GAME_ARR => {


  for(let i=0; i<GAME_ARR.length; i++){
    for(let j=0; j<GAME_ARR.length; j++){
      if(GAME_ARR[i][j] === "*")
        await setBombCount(GAME_ARR, i, j);

    }
  }

  return;
};

const setBombCount = async (GAME_ARR, i, j) => {

  for(let x = i-1; x <= i+1; x++){
    for(let y = j-1; y <= j+1; y++){

      if(x >= 0 && x < GAME_SIZE && y >= 0 && y < GAME_SIZE && GAME_ARR[x][y] !== "*"){
        GAME_ARR[x][y]++;
      }
    }
  }

};

module.exports = {
  GAME_SIZE,
  setBomb,
  bombAnalysis,
};