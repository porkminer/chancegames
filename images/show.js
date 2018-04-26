var canvas = null;
var ctx = null;
var cWidth = document.documentElement.clientWidth;
var cHeight = document.documentElement.clientHeight;
var time = Date.now();
var images = [];
var current = 0;
function init(){
    
    for(let i = 1; i <= 233; i++){
        let img = new Image();
        if(i < 10){
            img.src='./srcimg/watertest000' + i + '.png';
        } else {
            img.src='./srcimg/watertest00' + i + '.png';
        }
        img.width = cWidth * 0.9;
        img.height = cHeight * 0.9;
        images.push(img);
    }
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = cWidth * 0.9;
    canvas.height = cHeight * 0.9;
    loadNext();
    window.requestAnimationFrame(imageSwap);
}

function imageSwap(){
    
    let delta = Date.now();
    if(delta - time > 41){
        time = delta;
        loadNext();
    }
    window.requestAnimationFrame(imageSwap);
}

function loadNext(){
    ctx.drawImage(images[current], 0, 0);
    current++;
    if(current>232){
        current = 0;
    }
    
}