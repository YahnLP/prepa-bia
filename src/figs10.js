(function(){ const B=window.BIA, F=B.figs, G=B.gfx;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); };
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-9*Math.cos(a-.45),y1-9*Math.sin(a-.45)); g.lineTo(x1-9*Math.cos(a+.45),y1-9*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }

/* ===== Structure de l'aile ===== */
const WS={W:640,H:430,cyc:16,
 draw(g,t){ const W=640,H=430,tc=t%16; const skin=ss(4,6,tc)*(1-ss(10,12,tc)); const flex=ss(8,12,tc)*(1-ss(13.5,15.5,tc));
  g.fillStyle='#eef3f8'; g.fillRect(0,0,W,H);
  // vue de dessus : aile gauche->droite, emplanture x=70, saumon x=430
  const x0=70,x1=430,yb=40,yh=190; const lead=x=>yb+ (x-x0)*.05, trail=x=>yh-(x-x0)*.18;
  g.fillStyle='#fff'; g.strokeStyle='#243447'; g.lineWidth=2;
  if(skin<1){ g.globalAlpha=1; }
  // nervures
  const nerv=9; g.strokeStyle='#5b6b7c'; g.lineWidth=3; for(let i=0;i<nerv;i++){ const x=x0+i*(x1-x0)/(nerv-1); g.beginPath(); g.moveTo(x,lead(x)); g.lineTo(x,trail(x)); g.stroke(); }
  // bords
  g.strokeStyle='#243447'; g.lineWidth=2; g.beginPath(); g.moveTo(x0,lead(x0)); g.lineTo(x1,lead(x1)); g.lineTo(x1,trail(x1)); g.lineTo(x0,trail(x0)); g.closePath(); g.stroke();
  // longeron (à 30 % de la corde)
  const sp=x=>lead(x)+(trail(x)-lead(x))*.3; g.strokeStyle='#e4572e'; g.lineWidth=9; g.lineCap='butt'; g.beginPath(); g.moveTo(x0,sp(x0)); g.lineTo(x1,sp(x1)); g.stroke();
  // revêtement
  if(skin>0){ g.globalAlpha=.88*skin; g.fillStyle='#cfd8e3'; g.beginPath(); g.moveTo(x0,lead(x0)); g.lineTo(x1,lead(x1)); g.lineTo(x1,trail(x1)); g.lineTo(x0,trail(x0)); g.closePath(); g.fill(); g.globalAlpha=1; g.strokeStyle='#243447'; g.lineWidth=2; g.stroke(); g.fillStyle='rgba(255,255,255,.5)'; for(let i=0;i<14;i++){ const x=x0+i*26; g.beginPath(); g.arc(x+8,lead(x)+10,2,0,7); g.fill(); } }
  // fuselage (côté)
  g.fillStyle='#dfe6ee'; g.strokeStyle='#243447'; g.lineWidth=2; rr(g,10,10,62,236,22); g.fill(); g.stroke(); T(g,'fuselage',41,132,{s:12,w:'800',a:'center',sh:0,c:'#3b4a5a'});
  // étiquettes
  const lab=(txt,sub,x,y,tx,ty,col)=>{ g.strokeStyle=col; g.lineWidth=2; g.beginPath(); g.moveTo(x,y); g.lineTo(tx,ty); g.stroke(); g.fillStyle=col; g.beginPath(); g.arc(x,y,4,0,7); g.fill(); T(g,txt,tx+6,ty+(ty<y?-4:14),{s:14,w:'800',c:col}); T(g,sub,tx+6,ty+(ty<y?10:28),{s:11,w:'600',c:'#3b4a5a'}); };
  const nx=x0+3*(x1-x0)/(nerv-1);
  lab('Longeron','porte l’effort principal',320,sp(320),440,sp(320)-34,'#c2410c');
  lab('Nervures','donnent la forme du profil',nx,trail(nx)-6,nx+10,236,'#475569');
  lab('Revêtement','la peau qui ferme l’aile',250,lead(250)+8,262,22,'#334155');
  T(g,'Vue de dessus',455,236,{s:12,w:'800',c:'#52606e',sh:0});
  g.fillStyle=skin>.5?'rgba(51,65,85,.95)':'rgba(194,65,12,.95)'; rr(g,455,150,175,40,10); g.fill(); T(g,skin>.5?'avec la peau':'squelette seul',467,176,{s:15,w:'800',c:'#fff',sh:0});
  // vue de face : aile fléchie sous la portance
  const by=318; g.fillStyle='#dfe6ee'; g.strokeStyle='#243447'; g.lineWidth=2; rr(g,300,by-24,40,48,14); g.fill(); g.stroke();
  const tip=-flex*38; for(const s of [-1,1]){ g.fillStyle='#cfd8e3'; g.beginPath(); g.moveTo(320,by-6); g.quadraticCurveTo(320+s*130,by-6+tip*.3,320+s*230,by-6+tip); g.lineTo(320+s*230,by+tip+6); g.quadraticCurveTo(320+s*130,by+6+tip*.3,320,by+6); g.closePath(); g.fill(); g.stroke(); }
  if(flex>.05){ for(const s of [-1,1]) for(let i=1;i<=4;i++){ const x=320+s*i*50; const yy=by-6+tip*(i*50/230)*(i*50/230)*.6+(-8); arrow(g,x,yy+30*0,x,yy-34*flex-4,'#16a34a',3); } T(g,'la portance plie l’aile vers le haut : elle doit être solide mais souple',320,by+64,{s:13,w:'800',a:'center',c:'#15803d'}); } else T(g,'Vue de face : l’aile au repos',320,by+64,{s:13,w:'800',a:'center',c:'#52606e'});
  bar(g,W,H,'Même principe pour le fuselage : cadres + lisses + revêtement.');
 }};
F['wingstruct']={cap:'<b>Comment est faite une aile.</b> Une aile ressemble à un squelette recouvert d’une peau. Le <b>longeron</b> court tout le long de l’aile et supporte l’effort. Les <b>nervures</b> donnent la forme du profil. Le <b>revêtement</b> (la peau) ferme le tout. Le fuselage a le même principe : des <b>cadres</b> et des <b>lisses</b> recouverts d’un revêtement.',svg:'',canvas:WS,alt:'Animation d’une aile : squelette avec longeron et nervures, puis revêtement, puis flexion sous la portance'};

/* ===== Étages de fusée ===== */
const ST={W:640,H:430,cyc:22,
 draw(g,t){ const W=640,H=430,tc=t%22; const phase=tc<7?0:tc<9?1:tc<15?2:tc<17?3:4;
  const top=Math.min(1,tc/22); g.fillStyle=G.lin?'#000':'#000';
  const gr=g.createLinearGradient(0,0,0,H); const k=ss(0,14,tc); gr.addColorStop(0,'#05070f'); gr.addColorStop(.6,k<.5?'#1d5fb0':'#0b1a3a'); gr.addColorStop(1,k<.5?'#bfe0f5':'#16407a'); g.fillStyle=gr; g.fillRect(0,0,W,H);
  G.stars(g,W,H*.7,60); g.globalAlpha=ss(2,12,tc); G.stars(g,W,H,90); g.globalAlpha=1;
  const cx=250; let ry=360-ss(0,7,tc)*60-ss(7,15,tc)*90-ss(15,22,tc)*20;
  // sol qui descend
  const gy=395+ss(0,6,tc)*260; if(gy<H){ g.fillStyle='#5aa245'; g.fillRect(0,gy,W,H-gy); }
  // fusée
  let s1=1; if(phase>=1){ // étage 1 largué : tombe
    const u=(tc-7); const fx=cx-u*14, fy=ry+88+u*u*14, fr=-u*.22; g.save(); g.translate(fx,fy); g.rotate(fr); g.fillStyle=G.metal(g,-13,0,13,0); g.fillRect(-13,-86,26,86); g.fillStyle='#e4572e'; g.fillRect(-13,-22,26,6); g.restore(); if(fy<H-40) T(g,'étage 1 vide : largué',fx-24,fy-30,{s:12,w:'800',a:'right',c:'#fca5a5',sc:'rgba(0,0,0,.6)'}); }
  const thr1=phase===0?1:0, thr2=phase===2?1:0;
  if(phase===0){ G.rocket(g,cx,ry,1,0,{stage:1,thr:1}); }
  else if(phase===1){ G.rocket(g,cx,ry+88,1,0,{stage:2,thr:0}); }
  else if(phase===2){ G.rocket(g,cx,ry+88,1,0,{stage:2,thr:1}); }
  else { G.rocket(g,cx,ry+88,1,0,{stage:2,thr:0}); }
  // satellite libéré
  if(phase>=3){ const u=ss(15,22,tc); const sx=cx+u*120, sy=ry-60-u*30; g.save(); g.translate(sx,sy); g.fillStyle='#ffd23f'; g.fillRect(-9,-9,18,18); g.strokeStyle='#222'; g.lineWidth=1.5; g.strokeRect(-9,-9,18,18); g.fillStyle='#2b6cb0'; g.fillRect(-42,-6,30,12); g.fillRect(12,-6,30,12); g.restore(); T(g,'satellite : la charge utile',sx,sy+34,{s:13,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.6)'}); }
  // masse restante
  const m=[100,37,37,12,3][phase]; const lbl=['Décollage : étage 1 (poussée maximale)','Étage 1 vide → on le largue','Étage 2 allumé : moins lourd, il accélère mieux','Orbite atteinte : l’étage 2 est vide','Le satellite est en orbite'][phase];
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,430,18,200,120,10); g.fill(); T(g,'Masse à accélérer',442,40,{s:12,w:'700',sh:0,c:'#52606e'});
  const mass=[100,34,34,10,10][phase]; const sm=phase===1?(100-66*ss(7,9,tc)):mass; T(g,Math.round(sm)+' %',442,72,{s:28,w:'800',sh:0});
  g.fillStyle='#d6dde5'; g.fillRect(442,88,176,12); g.fillStyle=sm>60?'#dc2626':sm>25?'#f59e0b':'#16a34a'; g.fillRect(442,88,176*sm/100,12); T(g,'altitude',442,124,{s:11,w:'700',sh:0,c:'#52606e'}); T(g,Math.round((ry<360?360-ry:0)*.85*(1+k*3))+' km',500,124,{s:13,w:'800',sh:0,c:'#0b3a66'});
  bar(g,W,H,lbl);
 }};
F['stages']={cap:'<b>Pourquoi une fusée a des étages.</b> Une fusée brûle énormément d’ergols. Quand un étage est vide, il devient du poids inutile : on le largue pour que le reste accélère mieux. À la fin, seule la charge utile (le satellite) atteint l’orbite.',svg:'',canvas:ST,alt:'Animation d’une fusée qui largue son premier étage vide puis libère un satellite en orbite'};
})();
