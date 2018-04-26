var MainMenuState = new State();
MainMenuState.name = "MainMenuState";
MainMenuState.canvas = getCanvas();
MainMenuState.dimensions = getGameDimensions();
MainMenuState.backgroundColor = "#000";
MainMenuState.textColor = "#000";
MainMenuState.buttons = [];
MainMenuState.render = () => {
    if (!MainMenuState.canvas){
        MainMenuState.canvas = getCanvas();
    }
    let cEl = getCanvasElement();
    if (cEl.width != 768){
        cEl.width = 768;
        cEl.height = 768;
    }
    if (MainMenuState.buttons.length === 0){
        MainMenuState.buttons = [
            new MenuButton(256, 256, 256, 128, '#f00', "Letters", () => {game.gameMode.push(LettersState)}),
            new MenuButton(256, 386, 256, 128, '#0f0', "Images", () => {game.gameMode.push(ImagesState)}),
            new MenuButton(256, 516, 256, 128, '#229', "Numbers", () => {game.gameMode.push(ImagesState)})
        ];
    }
    
    MainMenuState.canvas.fillStyle = MainMenuState.backgroundColor;
    MainMenuState.canvas.fillRect(0,0,MainMenuState.dimensions.width, MainMenuState.dimensions.height);
    
    
    
    
    
    for(let i = 0; i < MainMenuState.buttons.length; i++){
        MainMenuState.buttons[i].draw();
    }
};


var ImagesState = new State();
ImagesState.name = "ImagesState";
ImagesState.canvas = getCanvas();
ImagesState.canvasElement = getCanvasElement();
ImagesState.dimensions = getGameDimensions();
ImagesState.backgroundColor = "#fff";
ImagesState.textColor = "#fff";
ImagesState.buttons = [];
ImagesState.picsflipped = 0;
ImagesState.indices = [];
ImagesState.score = 0;
ImagesState.scoreDiv = document.getElementById('score');
ImagesState.clickSound = new Howl({src: ['/games/memory/sounds/click.wav']});
ImagesState.badSound = new Howl({src: ['/games/memory/sounds/badclick.wav'],
                                volume: 0.2});
ImagesState.matchSound = new Howl({src: ['/games/memory/sounds/match.wav']});
ImagesState.winSound = new Howl({src: ['/games/memory/sounds/win.wav'], volume: 0.5});
ImagesState.pics = ['captain.png', 'cassie.png', 'catboy.png', 'dora.png', 
'dumptruck.png', 'dumptruck2.png', 'emmy.png', 'excavator.png', 
'excavator2.png', 'frontendloader.png', 'gecko.png', 'max.png', 
'mobilecrane.png', 'owlette.png', 'phineas.png', 'pikachu.png', 
'poohbear.png', 'zak-weezie.png',
'captain.png', 'cassie.png', 'catboy.png', 'dora.png', 
'dumptruck.png', 'dumptruck2.png', 'emmy.png', 'excavator.png', 
'excavator2.png', 'frontendloader.png', 'gecko.png', 'max.png', 
'mobilecrane.png', 'owlette.png', 'phineas.png', 'pikachu.png', 
'poohbear.png', 'zak-weezie.png'];
ImagesState.cards = [];
ImagesState.initCards = () => {
    for(let i = 0; i < 36; i++){
        let tIndex = random(0, ImagesState.pics.length);
        let picsquare = new PicSquare(ImagesState.pics[tIndex], i+1);
        
        ImagesState.pics.splice(tIndex, 1);
        ImagesState.cards.push(picsquare);
    }
};

ImagesState.render = () => {
    if (ImagesState.cards.length === 0){
        ImagesState.initCards();
    }
    if (!ImagesState.indices){
        ImagesState.indices = [];
    }
    if (!ImagesState.canvas){
        ImagesState.canvas = getCanvas();
    }
    if (!ImagesState.dimensions){
        ImagesState.dimensions = getGameDimensions();
    }
    if (!ImagesState.canvasElement){
        ImagesState.canvasElement = getCanvasElement();
    }
    let numdone = 0;
    for(let i = 0; i < ImagesState.cards.length; i++){
        if (ImagesState.cards[i].matched){
            numdone++;
        }
        if (ImagesState.cards[i].flipped && !ImagesState.cards[i].matched){
            if(ImagesState.indices.length === 0 || 
                (ImagesState.indices.length === 1 && ImagesState.indices[0] != ImagesState.cards[i].index)){
            ImagesState.picsflipped++;
            ImagesState.indices.push(ImagesState.cards[i].index);
            }
        }
    }
    if (numdone === 36){
        if(!ImagesState.winSound.playing()){
            ImagesState.winSound.play();
            ImagesState.scoreDiv.innerText = 0;
            setTimeout(() => {game.gameMode.push(MainMenuState)},3000);
        }
    }
    
    ImagesState.canvas.fillStyle = "#fff";
    ImagesState.canvas.fillRect(0,0,ImagesState.canvasElement.width, ImagesState.canvasElement.height);
    for(let i = 0; i < ImagesState.cards.length; i++){
        
        if(ImagesState.cards[i].flipped){
            ImagesState.canvas.drawImage(ImagesState.cards[i].img, ImagesState.cards[i].x, ImagesState.cards[i].y);
            ImagesState.canvas.strokeStyle = "#000";
            ImagesState.canvas.lineWidth = 1;
            ImagesState.canvas.strokeRect(ImagesState.cards[i].x, ImagesState.cards[i].y, ImagesState.cards[i].img.width, ImagesState.cards[i].img.height);
        } else {
            ImagesState.canvas.strokeStyle = "#000";
            ImagesState.canvas.lineWidth = 1;
            ImagesState.canvas.strokeRect(ImagesState.cards[i].x, ImagesState.cards[i].y, ImagesState.cards[i].img.width, ImagesState.cards[i].img.height);
        }
    }

    
    
    
    
    if (ImagesState.picsflipped === 2){
    
        
        
        if(ImagesState.cards[ImagesState.indices[0]-1].pic === ImagesState.cards[ImagesState.indices[1]-1].pic){
            ImagesState.cards[ImagesState.indices[0]-1].matched = true;
            ImagesState.cards[ImagesState.indices[1]-1].matched = true;
            ImagesState.matchSound.play();
            
            ImagesState.score++;
        }
        ImagesState.picsflipped = 0;
        ImagesState.indices = [];
        setTimeout(ImagesState.unflip, 1000);
        
    }
    
    ImagesState.scoreDiv.innerText = ImagesState.score;
};
ImagesState.start = () => {
    ImagesState.canvas.fillStyle = "#fff";
    ImagesState.canvas.fillRect(0,0,ImagesState.canvasElement.width, ImagesState.canvasElement.height);
    for(let i = 0; i < ImagesState.cards.length; i++){
        ImagesState.canvas.drawImage(ImagesState.cards[i].img, ImagesState.cards[i].x, ImagesState.cards[i].y);
        ImagesState.canvas.strokeStyle = "#000";
        ImagesState.canvas.lineWidth = 1;
        ImagesState.canvas.strokeRect(ImagesState.cards[i].x, ImagesState.cards[i].y, ImagesState.cards[i].img.width, ImagesState.cards[i].img.height);
    }
    
};
ImagesState.unflip = () => {
    for(let i = 0; i < ImagesState.cards.length; i++){
        if (ImagesState.cards[i].flipped && !ImagesState.cards[i].matched){
            ImagesState.cards[i].flip();
            ImagesState.badSound.play();
        }
    }
    ImagesState.picsflipped = 0;
    ImagesState.indices = [];
};
ImagesState.onEnter = () => {
    ImagesState.initCards();
}


var LettersState = new State();
LettersState.name = "LettersState";
LettersState.canvas = getCanvas();
LettersState.canvasElement = getCanvasElement();
LettersState.dimensions = getGameDimensions();
LettersState.backgroundColor = "#fff";
LettersState.textColor = "#fff";
LettersState.buttons = [];
LettersState.picsflipped = 0;
LettersState.indices = [];
LettersState.score = 0;
LettersState.iteration = 0;
LettersState.scoreDiv = document.getElementById('score');
LettersState.clickSound = new Howl({src: ['/games/memory/sounds/click.wav']});
LettersState.badSound = new Howl({src: ['/games/memory/sounds/badclick.wav'],
                                volume: 0.2});
LettersState.matchSound = new Howl({src: ['/games/memory/sounds/match.wav']});
LettersState.winSound = new Howl({src: ['/games/memory/sounds/win.wav'], volume: 0.5});
LettersState.pics = [
    'biga.png', 'littlea.png', 'bigb.png', 'littleb.png',
    'bigc.png', 'littlec.png', 'bigd.png', 'littled.png',
    'bige.png', 'littlee.png', 'bigf.png', 'littlef.png',
    'bigg.png', 'littleg.png', 'bigh.png', 'littleh.png',
    'bigi.png', 'littlei.png', 'bigj.png', 'littlej.png',
    'bigk.png', 'littlek.png', 'bigl.png', 'littlel.png',
    'bigm.png', 'littlem.png', 'bign.png', 'littlen.png',
    'bigo.png', 'littleo.png', 'bigp.png', 'littlep.png',
    'bigq.png', 'littleq.png', 'bigr.png', 'littler.png',
    'bigs.png', 'littles.png', 'bigt.png', 'littlet.png',
    'bigu.png', 'littleu.png', 'bigv.png', 'littlev.png',
    'bigw.png', 'littlew.png', 'bigx.png', 'littlex.png',
    'bigy.png', 'littley.png', 'bigz.png', 'littlez.png',
    'biga.png', 'littlea.png', 'bigb.png', 'littleb.png',
    'bigc.png', 'littlec.png', 'bigd.png', 'littled.png',
    'bige.png', 'littlee.png', 'bigf.png', 'littlef.png',
    'bigg.png', 'littleg.png', 'bigh.png', 'littleh.png',
    'bigi.png', 'littlei.png', 'bigj.png', 'littlej.png',
    'bigk.png', 'littlek.png', 'bigl.png', 'littlel.png',
    'bigm.png', 'littlem.png', 'bign.png', 'littlen.png',
    'bigo.png', 'littleo.png', 'bigp.png', 'littlep.png',
    'bigq.png', 'littleq.png', 'bigr.png', 'littler.png',
    'bigs.png', 'littles.png', 'bigt.png', 'littlet.png',
    'bigu.png', 'littleu.png', 'bigv.png', 'littlev.png',
    'bigw.png', 'littlew.png', 'bigx.png', 'littlex.png',
    'bigy.png', 'littley.png', 'bigz.png', 'littlez.png'
    ];
LettersState.cards = [];
LettersState.initCards = () => {
    for(let j = 0; j < 13; j++){
        for(let i = 0; i < 8; i++){
            let tIndex = random(0, 8-i);
            let picsquare = new PicSquare(LettersState.pics[tIndex], (j*8)+i+1, 128, 4, 1, 2);
            picsquare.letter = LettersState.pics[tIndex][LettersState.pics[tIndex].indexOf('.')-1];
            
            LettersState.pics.splice(tIndex, 1);
            LettersState.cards.push(picsquare);
        }
    }
    
};

LettersState.checkSettings = () => {
    if (LettersState.cards.length === 0){
        LettersState.initCards();
    }
    if (!LettersState.indices){
        LettersState.indices = [];
    }
    if (!LettersState.canvas){
        LettersState.canvas = getCanvas();
    }
    if (!LettersState.dimensions){
        LettersState.dimensions = getGameDimensions();
    }
    if (!LettersState.canvasElement){
        LettersState.canvasElement = getCanvasElement();
    }
}

LettersState.render = () => {
    LettersState.checkSettings();
    LettersState.canvasElement.width = 128*4;
    LettersState.canvasElement.height = 128*2;
    let numdone = 0;
    for(let i = (LettersState.iteration*8); i < ((LettersState.iteration*8)+8); i++){
        if (LettersState.cards[i].matched){
            numdone++;
        }
        if (LettersState.cards[i].flipped && !LettersState.cards[i].matched){
            if(LettersState.indices.length === 0 || 
                (LettersState.indices.length === 1 && LettersState.indices[0] != LettersState.cards[i].index)){
                    LettersState.picsflipped++;
                    
                    LettersState.indices.push(LettersState.cards[i].index);
            }
        }
    }
    if (numdone === 8){
        if(!LettersState.winSound.playing()){
            LettersState.winSound.play();
            
            
        }
        if(LettersState.iteration < 8){
            LettersState.iteration++;
            
        } else {
            setTimeout(() => {game.gameMode.push(MainMenuState)},3000);
        }
        numdone = 0;
        LettersState.picsflipped = 0;
        LettersState.indices = [];
        LettersState.scoreDiv.innerText = 0;
        LettersState.start();
    } else {
        
        LettersState.canvas.fillStyle = "#fff";
        LettersState.canvas.fillRect(0,0,LettersState.canvasElement.width, LettersState.canvasElement.height);
        
        for(let i = (LettersState.iteration*8); i < ((LettersState.iteration*8)+8); i++){
        
            if(LettersState.cards[i].flipped){
                LettersState.canvas.drawImage(LettersState.cards[i].img, LettersState.cards[i].x, LettersState.cards[i].y, LettersState.cards[i].img.width*LettersState.cards[i].scaleSize,LettersState.cards[i].img.height*LettersState.cards[i].scaleSize);
                LettersState.canvas.strokeStyle = "#000";
                LettersState.canvas.lineWidth = 1;
                LettersState.canvas.strokeRect(LettersState.cards[i].x, LettersState.cards[i].y, LettersState.cards[i].img.width, LettersState.cards[i].img.height);
            } else {
                LettersState.canvas.strokeStyle = "#000";
                LettersState.canvas.lineWidth = 1;
                LettersState.canvas.strokeRect(LettersState.cards[i].x, LettersState.cards[i].y, LettersState.cards[i].img.width, LettersState.cards[i].img.height);
            }
        }

        
        
        
        
        if (LettersState.picsflipped === 2){
        
            LettersState.picsflipped = 0;
        
            if(LettersState.cards[LettersState.indices[0]-1].letter === LettersState.cards[LettersState.indices[1]-1].letter){
                LettersState.cards[LettersState.indices[0]-1].matched = true;
                LettersState.cards[LettersState.indices[1]-1].matched = true;
                LettersState.matchSound.play();
                
                LettersState.score++;
            }
            setTimeout(LettersState.unflip, 1000);
            
        }
        
    }
    LettersState.scoreDiv.innerText = LettersState.score;
};
LettersState.start = () => {
    LettersState.canvas.fillStyle = "#fff";
    LettersState.canvas.fillRect(0,0,LettersState.canvasElement.width, LettersState.canvasElement.height);
    for(let i = 0; i < LettersState.cards.length; i++){
        LettersState.cards[i].flipped = false;
    }
    for(let i = (LettersState.iteration*8); i < ((LettersState.iteration*8)+8); i++){
        if (LettersState.cards[i].flipped){
        LettersState.canvas.drawImage(LettersState.cards[i].img, LettersState.cards[i].x, LettersState.cards[i].y);
        LettersState.canvas.strokeStyle = "#000";
        LettersState.canvas.lineWidth = 1;
        LettersState.canvas.strokeRect(LettersState.cards[i].x, LettersState.cards[i].y, LettersState.cards[i].img.width, LettersState.cards[i].img.height);
        }
        else {
            LettersState.canvas.strokeStyle = "#000";
            LettersState.canvas.lineWidth = 1;
            LettersState.canvas.strokeRect(LettersState.cards[i].x, LettersState.cards[i].y, LettersState.cards[i].img.width, LettersState.cards[i].img.height);
        }
    }
    
};
LettersState.unflip = () => {
    for(let i = (LettersState.iteration*8); i < ((LettersState.iteration*8)+8); i++){
        if (LettersState.cards[i].flipped && !LettersState.cards[i].matched){
            LettersState.cards[i].flip();
            LettersState.badSound.play();
        }
    }
    LettersState.picsflipped = 0;
    LettersState.indices = [];
};
LettersState.onEnter = () => {
    LettersState.initCards();
}
