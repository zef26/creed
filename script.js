const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
const hackerGif = document.getElementById('hackerGif');
const finalText = document.getElementById('finalText');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== параметры гифки =====
let width = 150;
let height = 150;
let x = Math.random()*(canvas.width-width);
let y = Math.random()*(canvas.height-height);
let dx = 4 + Math.random()*2;
let dy = 4 + Math.random()*2;

// ===== trail и частицы =====
let trail = [];
let particles = [];

// ===== финал =====
let hits = 0;
const maxHits = 50;
let finale = false;

// ===== цвета =====
function randomColor(){
  const colors = ['#00d8c9','#ff3c3c','#ffd300','#ff6cff','#00ff6b'];
  return colors[Math.floor(Math.random()*colors.length)];
}
let currentColor = randomColor();

// ===== частицы =====
function addParticle(px,py,color){
  particles.push({x:px,y:py,r:2+Math.random()*3,alpha:1,speedY:-1-Math.random(),speedX:(Math.random()-0.5),color});
}

// ===== hex -> rgb =====
function hexToRgb(hex){
  hex = hex.replace('#','');
  let r = parseInt(hex.substring(0,2),16);
  let g = parseInt(hex.substring(2,4),16);
  let b = parseInt(hex.substring(4,6),16);
  return r+','+g+','+b;
}

// ===== финальная траектория в угол =====
function goToCorner(){
  let targetX = canvas.width - width;
  let targetY = canvas.height - height;
  let step = 10;

  function move(){
    if(x<targetX) x+=step;
    if(y<targetY) y+=step;

    hackerGif.style.left = x+"px";
    hackerGif.style.top = y+"px";

    addParticle(x+width/2,y+height/2,currentColor);

    if(x<targetX || y<targetY){
      requestAnimationFrame(move);
    } else {
      finalText.style.transform = 'translate(-50%,-50%) scale(1)';
      finalText.style.opacity = 1;
      for(let i=0;i<100;i++) addParticle(x+width/2,y+height/2,currentColor);
    }
  }
  move();
}

// ===== анимация =====
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // trail
  trail.push({x:x+width/2, y:y+height/2, alpha:0.2, color:currentColor});
  if(trail.length>20) trail.shift();
  trail.forEach(p=>{
    ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,width*0.35,0,Math.PI*2);
    ctx.fill();
  });

  // частицы
  particles.forEach((p,i)=>{
    ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -=0.03;
    if(p.alpha<=0) particles.splice(i,1);
  });

  if(!finale){
    x += dx;
    y += dy;

    let hit=false;
    if(x+width>canvas.width || x<0){ dx*=-1; hit=true; }
    if(y+height>canvas.height || y<0){ dy*=-1; hit=true; }

    if(hit){
      hits++;
      currentColor = randomColor();
      hackerGif.style.transform = `scale(${1+Math.random()*0.15}) rotate(${(Math.random()-0.5)*10}deg)`;
      for(let i=0;i<15;i++) addParticle(x+width/2,y+height/2,currentColor);
    } else {
      hackerGif.style.transform = 'scale(1) rotate(0deg)';
    }

    hackerGif.style.left = x+"px";
    hackerGif.style.top = y+"px";

    if(hits>=maxHits){
      finale = true;
      goToCorner();
    }
  }

  requestAnimationFrame(draw);
}

draw();

// ===== resize =====
window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if(x+width>canvas.width) x = canvas.width-width;
  if(y+height>canvas.height) y = canvas.height-height;
});
