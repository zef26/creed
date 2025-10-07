// ----------------- Logo magnetic effect -----------------
const logoChars = document.querySelectorAll('.logo-char');
const logo = document.getElementById('logo');
let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

document.addEventListener('mousemove', e=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
    const rect = logo.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    logoChars.forEach((char,index)=>{
        const cRect = char.getBoundingClientRect();
        const cX = cRect.left + cRect.width/2;
        const cY = cRect.top + cRect.height/2;
        const dx = mouseX - cX;
        const dy = mouseY - cY;
        const dist = Math.hypot(dx,dy);
        if(dist<200){
            const force = (200 - dist)/200;
            const moveX = dx*force*0.2;
            const moveY = dy*force*0.2;
            const rotate = (index-2)*force*5;
            char.style.transform = `translate(${moveX}px,${moveY}px) rotate(${rotate}deg) scale(${1+force*0.1})`;
        } else char.style.transform='translate(0,0) rotate(0deg) scale(1)';
    });
});

// ----------------- Fluid simulation -----------------
const fluidCanvas = document.getElementById('fluid-canvas');
const ctx = fluidCanvas.getContext('2d');
fluidCanvas.width = window.innerWidth;
fluidCanvas.height = window.innerHeight;

class Particle{
    constructor(){
        this.x=Math.random()*fluidCanvas.width;
        this.y=Math.random()*fluidCanvas.height;
        this.vx=(Math.random()-0.5)*0.5;
        this.vy=(Math.random()-0.5)*0.5;
        this.r=Math.random()*2+1;
        this.life=Math.random();
    }
    update(){
        this.x+=this.vx; this.y+=this.vy;
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx,dy);
        if(dist<150){ 
            const f=(150-dist)/150;
            this.vx+=dx*f*0.01;
            this.vy+=dy*f*0.01;
        }
        this.vx*=0.99; this.vy*=0.99;
        if(this.x<0||this.x>fluidCanvas.width)this.vx*=-1;
        if(this.y<0||this.y>fluidCanvas.height)this.vy*=-1;
        this.life+=0.001; if(this.life>1)this.life=0;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        const hue = (this.life*60+180)%360;
        ctx.fillStyle=`hsla(${hue},70%,60%,${0.3+this.life*0.3})`;
        ctx.fill();
    }
}

const particles=[]; for(let i=0;i<100;i++) particles.push(new Particle());

function animateFluid(){
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,fluidCanvas.width,fluidCanvas.height);
    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            const p1=particles[i], p2=particles[j];
            const dx=p1.x-p2.x, dy=p1.y-p2.y;
            const dist=Math.hypot(dx,dy);
            if(dist<100){
                ctx.beginPath();
                ctx.moveTo(p1.x,p1.y);
                ctx.lineTo(p2.x,p2.y);
                ctx.strokeStyle=`rgba(100,200,255,${(100-dist)/100*0.2})`;
                ctx.lineWidth=0.5;
                ctx.stroke();
            }
        }
    }
    particles.forEach(p=>{p.update(); p.draw();});
    requestAnimationFrame(animateFluid);
}
animateFluid();

// ----------------- Displacement effect -----------------
const dispCanvas = document.getElementById('displacement-canvas');
const dispCtx = dispCanvas.getContext('2d');
dispCanvas.width=window.innerWidth; dispCanvas.height=window.innerHeight;
let time=0;
function animateDisp(){
    dispCtx.clearRect(0,0,dispCanvas.width,dispCanvas.height);
    const grad=dispCtx.createRadialGradient(mouseX,mouseY,0,mouseX,mouseY,300);
    grad.addColorStop(0,`rgba(0,255,200,${0.3+Math.sin(time*0.05)*0.2})`);
    grad.addColorStop(0.5,'rgba(100,150,255,0.1)');
    grad.addColorStop(1,'transparent');
    dispCtx.fillStyle=grad; dispCtx.fillRect(0,0,dispCanvas.width,dispCanvas.height);
    time++; requestAnimationFrame(animateDisp);
}
animateDisp();

// ----------------- Floating elements -----------------
const floatingContainer = document.getElementById('floating-elements');
for(let i=0;i<30;i++){
    const item=document.createElement('div');
    item.className='float-item';
    item.style.left=Math.random()*100+'%';
    item.style.setProperty('--tx',(Math.random()-0.5)*200+'px');
    item.style.animationDelay=Math.random()*20+'s';
    item.style.animationDuration=(15+Math.random()*10)+'s';
    floatingContainer.appendChild(item);
}

// ----------------- Resize -----------------
window.addEventListener('resize',()=>{
    fluidCanvas.width=window.innerWidth;
    fluidCanvas.height=window.innerHeight;
    dispCanvas.width=window.innerWidth;
    dispCanvas.height=window.innerHeight;
});
