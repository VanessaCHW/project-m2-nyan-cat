
class item {
    constructor(root,itemType,x,y){
        this.type = itemType;
        this.x = x;
        this.y = y;
        this.found = false;
        this.root = root;

        this.domElement = document.createElement('img');
        this.domElement.src = `images/${itemType}.png`; 
        //'images/${itemType}.gif';
        this.domElement.style.position = 'absolute';
        this.domElement.style.left = `${this.x}px`;
        this.domElement.style.top = ` ${this.y}px`;
        this.domElement.style.zIndex = '10';
        this.domElement.id = 'item';
        this.root.appendChild(this.domElement);
    }

    removeItem(root){
        root.removeChild(this.domElement);
    }

    itemSelected(){
        let player_X = gameEngine.player.x;
        let player_Y = gameEngine.player.y;
        if(this.x == player_X && this.found==false)
        {
            if((this.y+PLAYER_HEIGHT) > player_Y 
            && (this.y+PLAYER_HEIGHT)< (player_Y+PLAYER_HEIGHT)
            || (this.y < (player_Y+PLAYER_HEIGHT) 
              && player_Y<(this.y+PLAYER_HEIGHT)))
              {
                  this.found = true;
                  this.domElement.style.display = 'none';

                if(this.type == 'man'){
                    manSound.play();
                    gameEngine.player.score +=100;
                    document.getElementById('score').innerText = `SCORE: ${gameEngine.player.score}`;   
                } else {
                    mugSound.play();
                    if(gameEngine.player.health<5){
                        gameEngine.player.health +=1;
                        //update health
                        document.getElementById('livesRemaining').innerText = `HEALTH: ${gameEngine.player.health} / ${PLAYER_MAX_HEALTH}`;
                    }
                }//end else
                }
        }
    }
} // end class


class sound {
    constructor (effect, volume,loop=false){
        this.effect = effect;
        this.domElement = document.createElement('audio');
        this.domElement.src = `sounds/${effect}.mp3`;
        this.domElement.setAttribute("preload", "auto");
        this.domElement.setAttribute("controls", "none");
        this.domElement.style.display = 'none';
        this.domElement.volume = `${volume}`;
        this.domElement.loop = loop;
        document.body.appendChild(this.domElement);
    }

    play(){
        this.domElement.play();
    }
    stop(){
        this.domElement.pause();
        this.domElement.currentTime = 0;
    }

    /*turnOnOff(){
        console.log('click');
        music_playing = music_playing ==true? false:true;

        if(music_playing){
            musicToggle.innerText = "music: on";
            this.domElement.play();
        }else{
            musicToggle.innerText = "music: off";
            this.domElement.pause();
        }
    }*/
}
