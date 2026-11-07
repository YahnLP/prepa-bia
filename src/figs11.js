(function(){ const B=window.BIA, F=B.figs, G=B.gfx;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); }, mix=(a,b,k)=>a+(b-a)*k;
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-9*Math.cos(a-.45),y1-9*Math.sin(a-.45)); g.lineTo(x1-9*Math.cos(a+.45),y1-9*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }
function rnd(i){ const s=Math.sin(i*127.1+311.7)*43758.5453; return s-Math.floor(s); }
function skyBg(g,W,H,b){ const l=g.createLinearGradient(0,0,0,H); l.addColorStop(0,'#2d78cf'); l.addColorStop(1,b||'#d6ecf8'); g.fillStyle=l; g.fillRect(0,0,W,H); }
const keep=id=>F[id];

/* ===== Pourquoi une aile porte ===== */
const AF={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430,tc=t%24; const al=tc<3?2:tc<9?mix(2,11,ss(3,9,tc)):tc<12?11:tc<15?mix(11,19,ss(12,15,tc)):tc<18?19:mix(19,2,ss(18,23,tc)); const a=al*Math.PI/180; const stall=al>15.5;
  skyBg(g,W,H,'#bfe1f5'); const cx=270,cy=215,c=320;
  // épaisseur
  const prof=(x)=>{ const t=.13; return 5*t*c*(.2969*Math.sqrt(x)-.126*x-.3516*x*x+.2843*x*x*x-.1015*x*x*x*x); }; const cam=x=>.045*c*(1-(2*x-1)*(2*x-1))*.9;
  // lignes de courant (monde) ; v : particules
  const nl=15; for(let i=0;i<nl;i++){ const y0=-150+i*(300/(nl-1)); if(Math.abs(y0)<20) continue; const up=y0<0; const dist=Math.abs(y0);
    const fy=x=>{ const bump=(up?-1:1)*0; const lead=Math.exp(-Math.pow((x-(cx-40))/(c*.55),2)); const push=(up?-1:1)*(40*Math.exp(-dist/55))*lead*(0.7+0.3*(al/12)); const dw=(x>cx+c*.4?1:0)*0; const dwx=1/(1+Math.exp(-(x-(cx+c*.45))/45)); const down=al*1.1*dwx*Math.exp(-dist/110)*(stall&&up?.3:1); return y0+push+down+ (up?-1:1)*al*1.1*lead*Math.exp(-dist/90)*.0; };
    const colr=up?'rgba(37,99,235,.5)':'rgba(220,38,38,.38)'; g.strokeStyle=colr; g.lineWidth=1.6; g.beginPath(); for(let x=0;x<=W;x+=6){ let y=cy+fy(x); if(stall&&up&&x>cx-30){ y+= Math.sin(x*.07+t*9+i)*10*ss(cx-30,cx+c*.9,x)*(1-dist/220); } x?g.lineTo(x,y):g.moveTo(x,y); } g.stroke();
    // particules
    const sp=(up?1+.55*Math.min(al,15)/15:1-.12*Math.min(al,15)/15)*(stall&&up?.55:1)*130; for(let k=0;k<6;k++){ let x=((t*sp+(k*W/6+i*47))%(W+20))-10; let y=cy+fy(x); if(stall&&up&&x>cx-30) y+=Math.sin(x*.07+t*9+i)*10*ss(cx-30,cx+c*.9,x)*(1-dist/220); g.fillStyle=up?'#1d4ed8':'#b91c1c'; g.beginPath(); g.arc(x,y,2.4,0,7); g.fill(); } }
  // aile
  g.save(); g.translate(cx+c*.25,cy); g.rotate(-a); g.translate(-c*.25,0);
  g.beginPath(); for(let i=0;i<=40;i++){ const x=i/40; g.lineTo(x*c,-(prof(x)+cam(x))); } for(let i=40;i>=0;i--){ const x=i/40; g.lineTo(x*c,prof(x)-cam(x)); } g.closePath(); const gg=g.createLinearGradient(0,-40,0,30); gg.addColorStop(0,'#f3f6fa'); gg.addColorStop(1,'#98a6b6'); g.fillStyle=gg; g.fill(); g.strokeStyle='#243447'; g.lineWidth=2; g.stroke();
  // signes de pression
  const pa=Math.min(al,15)/15; g.globalAlpha=.25+.75*pa; T(g,'−  −  −',c*.45,-48,{s:20,w:'800',a:'center',c:'#1d4ed8',sc:'rgba(255,255,255,.9)'}); T(g,'+  +  +',c*.5,66,{s:20,w:'800',a:'center',c:'#b91c1c',sc:'rgba(255,255,255,.9)'}); g.globalAlpha=1; g.restore();
  // portance
  const L=stall?30:20+pa*100; arrow(g,cx+c*.25,cy,cx+c*.25,cy-L,'#16a34a',6); T(g,'Portance',cx+c*.25+12,cy-L-4,{s:15,w:'800',c:'#15803d'});
  // vent relatif + incidence
  arrow(g,24,cy,86,cy,'#0b3a66',4); T(g,'vent relatif',22,cy-12,{s:12,w:'800',c:'#0b3a66'});
  // courbe Cz
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,448,14,184,148,10); g.fill(); const gx=462,gy=140,gw=156,gh=96; g.strokeStyle='#52606e'; g.lineWidth=1.5; g.beginPath(); g.moveTo(gx,gy-gh); g.lineTo(gx,gy); g.lineTo(gx+gw,gy); g.stroke(); T(g,'Portance',gx+2,gy-gh-4,{s:11,w:'800',sh:0,c:'#15803d'}); T(g,'incidence →',gx+gw,gy+12,{s:10,w:'700',a:'right',sh:0,c:'#52606e'});
  const cz=al=>al<15.5?(.1+.1*al)/2.0:Math.max(.25,(.1+.1*15.5)/2.0-.35*(al-15.5)/3.5*.7); g.strokeStyle='#16a34a'; g.lineWidth=3; g.beginPath(); for(let q=0;q<=19;q+=.5){ const x=gx+q/19*gw, y=gy-cz(q)*gh*1.15; q?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); g.fillStyle=stall?'#dc2626':'#16a34a'; g.beginPath(); g.arc(gx+al/19*gw,gy-cz(al)*gh*1.15,6,0,7); g.fill(); T(g,Math.round(al)+'°',gx+al/19*gw,gy-cz(al)*gh*1.15-10,{s:12,w:'800',a:'center',sh:0});
  g.strokeStyle='rgba(220,38,38,.6)'; g.setLineDash([4,3]); g.beginPath(); g.moveTo(gx+15.5/19*gw,gy); g.lineTo(gx+15.5/19*gw,gy-gh); g.stroke(); g.setLineDash([]); T(g,'décrochage',gx+15.5/19*gw-4,gy-gh+12,{s:10,w:'800',a:'right',sh:0,c:'#b91c1c'});
  if(stall){ g.fillStyle='#dc2626'; rr(g,14,14,250,44,10); g.fill(); T(g,'DÉCROCHAGE',26,38,{s:18,w:'800',c:'#fff',sh:0}); T(g,'l’écoulement se décolle : la portance chute',26,52,{s:11,w:'700',c:'#fff',sh:0}); }
  bar(g,W,H,stall?'Trop d’incidence : l’air ne suit plus l’aile.':al<4?'Peu d’incidence : peu de portance.':'Plus l’incidence augmente, plus l’air est dévié vers le bas et plus l’aile porte.');
 }};
{ const o=keep('airfoil'); F['airfoil']={cap:o.cap,svg:'',canvas:AF,alt:'Animation d’un profil d’aile avec lignes de courant, pressions, portance et décrochage quand l’incidence augmente'}; }

/* ===== Moteur 4 temps ===== */
const PC={W:640,H:430,cyc:8,
 draw(g,t){ const W=640,H=430; const th=(t%8)/8*4*Math.PI; const st=Math.floor(th/Math.PI)%4; const u=(th%Math.PI)/Math.PI;
  g.fillStyle='#e8eef4'; g.fillRect(0,0,W,H); const cx=230, top=60, r=44, l=124, by=330; const ph=th; const pist=()=>by-(l+r)+ (r*(1-Math.cos(ph))+ (l-Math.sqrt(l*l-r*r*Math.sin(ph)*Math.sin(ph)))*-1 )*1; const py=top+60+ (r*(1-Math.cos(ph)) - (l-Math.sqrt(l*l-r*r*Math.sin(ph)*Math.sin(ph))))*1.0+ (0);
  // position piston : haut quand th=0 => y min
  const pyy=top+78+ r*(1-Math.cos(ph)) - (l-Math.sqrt(l*l-r*r*Math.sin(ph)*Math.sin(ph)))+ (l-Math.sqrt(l*l-0)); const pTop=top+60, pistY=top+60+ (r*(1-Math.cos(ph)) + (Math.sqrt(l*l-r*r*Math.sin(ph)*Math.sin(ph))-l)*-1)*0 + (r*(1-Math.cos(ph)) - (l-Math.sqrt(l*l-r*r*Math.sin(ph)*Math.sin(ph))))*-1*0;
  const y=top+50+ (r+l) - (r*Math.cos(ph)+Math.sqrt(l*l-r*r*Math.sin(ph)*Math.sin(ph))) ; // y piston (haut = petit)
  const pyH=y; const cyl0=top, cyl1=top+210;
  // culasse + cylindre
  g.fillStyle='#6b7785'; g.fillRect(cx-70,cyl0-30,140,36); g.fillStyle='#d3dae2'; g.fillRect(cx-58,cyl0+6,10,cyl1-cyl0); g.fillRect(cx+48,cyl0+6,10,cyl1-cyl0);
  // gaz
  const gasCol=st===0?'rgba(125,190,255,.45)':st===1?'rgba(70,130,235,.7)':st===2?`rgba(${255},${Math.round(150+60*(1-u))},40,.85)`:'rgba(120,125,135,.6)'; g.fillStyle=gasCol; g.fillRect(cx-48,cyl0+6,96,pyH-cyl0-6);
  if(st===2&&u<.25){ const k=1-u/.25; const gr=g.createRadialGradient(cx,cyl0+14,2,cx,cyl0+14,60); gr.addColorStop(0,`rgba(255,255,255,${.9*k})`); gr.addColorStop(1,'rgba(255,200,40,0)'); g.fillStyle=gr; g.fillRect(cx-48,cyl0+6,96,100); }
  // bougie
  g.fillStyle='#e4e8ee'; g.fillRect(cx-5,cyl0-52,10,30); g.fillStyle='#b9c2cc'; g.fillRect(cx-3,cyl0-22,6,26); if(st===2&&u<.12){ g.strokeStyle='#fde047'; g.lineWidth=3; g.beginPath(); g.moveTo(cx,cyl0+6); g.lineTo(cx-8,cyl0+16); g.lineTo(cx+6,cyl0+22); g.stroke(); } T(g,'bougie',cx,cyl0-58,{s:12,w:'800',a:'center'});
  // soupapes
  const vi=st===0?1:0, ve=st===3?1:0; const valve=(x,open,col)=>{ const d=open?14:0; g.fillStyle=col; g.fillRect(x-2,cyl0-24+d,4,30); g.beginPath(); g.moveTo(x-18,cyl0+6+d); g.lineTo(x+18,cyl0+6+d); g.lineTo(x+14,cyl0+d+0); g.lineTo(x-14,cyl0+d); g.fill(); };
  valve(cx-34,vi,'#2563eb'); valve(cx+34,ve,'#6b7280');
  // conduits
  g.fillStyle=vi?'rgba(125,190,255,.55)':'#cfd8e2'; g.fillRect(cx-100,cyl0-18,70,22); T(g,'admission',cx-100,cyl0-26,{s:12,w:'800',c:'#1d4ed8'}); g.fillStyle=ve?'rgba(120,125,135,.7)':'#cfd8e2'; g.fillRect(cx+42,cyl0-18,70,22); T(g,'échappement',cx+112,cyl0-26,{s:12,w:'800',a:'right',c:'#4b5563'});
  if(vi) for(let k=0;k<5;k++){ const x=((t*70+k*14)%70); g.fillStyle='#38bdf8'; g.beginPath(); g.arc(cx-100+x,cyl0-7+Math.sin(k)*5,3,0,7); g.fill(); }
  if(ve) for(let k=0;k<5;k++){ const x=((t*70+k*14)%70); g.fillStyle='#6b7280'; g.beginPath(); g.arc(cx+42+x,cyl0-7+Math.sin(k)*5,3,0,7); g.fill(); }
  // piston
  g.fillStyle=G.metal(g,cx-48,0,cx+48,0); g.fillRect(cx-48,pyH,96,44); g.fillStyle='#4b5563'; for(let i=0;i<3;i++) g.fillRect(cx-48,pyH+6+i*7,96,3);
  // bielle & vilebrequin
  const crx=cx, cry=by+60-30+30; const cry2=top+50+r+l+0; const ax=crx+r*Math.sin(ph), ay=cry2-r*Math.cos(ph)*-1*-1; // maneton
  const mx=cx+r*Math.sin(ph), my=top+50+(r+l)-0+ -r*Math.cos(ph)*0 + 0; const crankY=top+50+r+l; const mpx=cx+r*Math.sin(ph), mpy=crankY-r*Math.cos(ph);
  g.strokeStyle='#8b96a3'; g.lineWidth=10; g.lineCap='round'; g.beginPath(); g.moveTo(cx,pyH+30); g.lineTo(mpx,mpy); g.stroke(); g.fillStyle='#5b6573'; g.beginPath(); g.arc(cx,crankY,r+14,0,7); g.fill(); g.strokeStyle='#cfd8e2'; g.lineWidth=2; g.beginPath(); g.arc(cx,crankY,r+14,0,7); g.stroke(); g.fillStyle='#e4572e'; g.beginPath(); g.arc(mpx,mpy,9,0,7); g.fill(); g.fillStyle='#243447'; g.beginPath(); g.arc(cx,crankY,6,0,7); g.fill();
  // panneau des 4 temps
  const names=[['1','Admission','le piston descend et aspire le mélange air + essence'],['2','Compression','le piston monte et comprime le mélange'],['3','Combustion – détente','étincelle : le mélange brûle et repousse le piston (temps moteur)'],['4','Échappement','le piston monte et chasse les gaz brûlés']];
  for(let i=0;i<4;i++){ const yy=40+i*70, on=i===st; g.fillStyle=on?(i===2?'#ea580c':'#2563eb'):'rgba(255,255,255,.9)'; rr(g,380,yy,246,60,10); g.fill(); T(g,names[i][0]+' · '+names[i][1],392,yy+24,{s:15,w:'800',c:on?'#fff':'#334155',sh:0}); const words=names[i][2].match(/.{1,36}(\s|$)/g); words.forEach((w,k)=>T(g,w.trim(),392,yy+40+k*12,{s:11,w:'600',c:on?'#fff':'#52606e',sh:0})); }
  bar(g,W,H,'Temps '+names[st][0]+' sur 4 : '+names[st][1].toLowerCase()+(st===2?' — le seul temps qui produit de la puissance':''));
 }};
{ const o=keep('pistoncycle'); F['pistoncycle']={cap:o.cap,svg:'',canvas:PC,alt:'Animation d’un moteur à pistons en coupe avec les quatre temps'}; }

/* ===== Turboréacteur ===== */
const TJ={W:640,H:430,cyc:10,
 half(x){ // demi-hauteur du canal
  if(x<90) return 54+ (x/90)*0; if(x<250) return mix(54,34,(x-90)/160); if(x<330) return 46; if(x<420) return mix(46,50,(x-330)/90); return mix(50,26,ss(420,540,x)); },
 draw(g,t){ const W=640,H=430,cy=190; g.fillStyle='#10202f'; g.fillRect(0,0,W,H);
  const hf=TJ.half; // nacelle
  g.fillStyle='#2b3b4d'; g.beginPath(); g.moveTo(40,cy-hf(40)-14); for(let x=40;x<=560;x+=8) g.lineTo(x,cy-hf(x)-14); for(let x=560;x>=40;x-=8) g.lineTo(x,cy+hf(x)+14); g.closePath(); g.fill(); g.strokeStyle='#8fa3b8'; g.lineWidth=2; g.stroke();
  // intérieur
  const grad=g.createLinearGradient(40,0,560,0); grad.addColorStop(0,'#1a3552'); grad.addColorStop(.45,'#243f60'); grad.addColorStop(.5,'#7a2d0f'); grad.addColorStop(.62,'#8f3a12'); grad.addColorStop(.8,'#5b2a15'); grad.addColorStop(1,'#2a3547');
  g.fillStyle=grad; g.beginPath(); g.moveTo(40,cy-hf(40)); for(let x=40;x<=560;x+=8) g.lineTo(x,cy-hf(x)); for(let x=560;x>=40;x-=8) g.lineTo(x,cy+hf(x)); g.closePath(); g.fill();
  // arbre
  g.fillStyle='#9aa8b8'; g.fillRect(70,cy-8,400,16);
  // compresseur : aubes alternées
  const rot=t*14; const blades=(x0,x1,n,col,hmax)=>{ for(let i=0;i<n;i++){ const x=x0+(x1-x0)*i/(n-1); const h=hf(x)-2; const ph=Math.sin(rot+i*1.7); g.strokeStyle=col; g.lineWidth=4; g.beginPath(); g.moveTo(x,cy-8-ph*3); g.lineTo(x+ph*3,cy-h+6); g.moveTo(x,cy+8+ph*3); g.lineTo(x+ph*3,cy+h-6); g.stroke(); } };
  blades(110,260,9,'#b8c7d8'); blades(380,450,4,'#fbbf24');
  // chambre : flammes
  for(let k=0;k<18;k++){ const x=270+((k*17+t*120)%100)+Math.random()*6; const y=cy+(rnd(k)-.5)*70; const al=.5+.4*Math.random(); g.fillStyle=`rgba(255,${Math.round(120+100*Math.random())},30,${al})`; g.beginPath(); g.arc(x,y,6+Math.random()*7,0,7); g.fill(); }
  // particules d'air
  for(let i=0;i<46;i++){ const sp=70+i%5*8; let x=((t*sp+i*53)%520)+40; const fr=(rnd(i)-.5)*2*.82; const h=hf(x); const y=cy+fr*(h-3); const T0=ss(40,270,x), burn=ss(262,330,x), cool=ss(430,560,x); const r=Math.round(80+175*Math.max(T0*.5,burn)), gg=Math.round(160-60*burn-50*T0*0), b=Math.round(255*(1-burn)*(1-.6*T0)); g.fillStyle=`rgb(${r},${gg},${b})`; g.beginPath(); g.arc(x,y,2.6+burn*1.4,0,7); g.fill(); }
  // gaz sortants
  for(let k=0;k<14;k++){ const x=560+((k*14+t*220)%90); const y=cy+(rnd(k+9)-.5)*40*(1+(x-560)/70); g.fillStyle=`rgba(255,${180-k*5},80,${.5-(x-560)/200})`; g.beginPath(); g.arc(x,y,5,0,7); g.fill(); }
  // étiquettes
  const L=(n,txt,sub,x,y)=>{ g.fillStyle='#ffd23f'; g.beginPath(); g.arc(x,y,13,0,7); g.fill(); T(g,n,x,y+5,{s:15,w:'800',a:'center',c:'#10202f',sh:0}); T(g,txt,x,y+34,{s:14,w:'800',a:'center',c:'#fff',sh:0}); T(g,sub,x,y+49,{s:11,w:'600',a:'center',c:'#c9d6e3',sh:0}); };
  L('1','Compresseur','comprime l’air',185,300); L('2','Chambre','kérosène + flamme',300,300); L('3','Turbine','entraîne le compresseur',415,300); L('4','Tuyère','éjecte les gaz',530,300);
  arrow(g,60,60,110,60,'#7dd3fc',5); T(g,'air frais qui entre',60,45,{s:12,w:'800',c:'#7dd3fc',sc:'rgba(0,0,0,.4)'}); arrow(g,520,60,600,60,'#fb923c',6); T(g,'gaz chauds éjectés vers l’arrière',390,45,{s:12,w:'800',c:'#fdba74',sc:'rgba(0,0,0,.4)'}); T(g,'→ l’avion est poussé en avant',390,78,{s:12,w:'800',c:'#fff',sc:'rgba(0,0,0,.4)'});
  g.strokeStyle='#8fa3b8'; g.lineWidth=2; g.setLineDash([5,4]); g.beginPath(); g.moveTo(180,330+0); g.setLineDash([]);
  // gradient légende
  const lg=g.createLinearGradient(60,0,580,0); lg.addColorStop(0,'#38bdf8'); lg.addColorStop(.5,'#f59e0b'); lg.addColorStop(1,'#ef4444'); g.fillStyle=lg; g.fillRect(60,372,520,8); T(g,'air frais',60,366,{s:11,w:'800',sh:0,c:'#7dd3fc'}); T(g,'très chaud',580,366,{s:11,w:'800',a:'right',sh:0,c:'#fca5a5'});
  bar(g,W,H,'L’air est comprimé, chauffé, détendu dans la turbine, puis éjecté.');
 }};
{ const o=keep('turbojet'); F['turbojet']={cap:o.cap,svg:'',canvas:TJ,alt:'Animation d’un turboréacteur en coupe avec compresseur, chambre de combustion, turbine et tuyère'}; }

/* ===== Hélicoptère et anticouple ===== */
const HE={W:640,H:430,cyc:20,
 draw(g,t){ const W=640,H=430,tc=t%20; const off=tc>=9&&tc<17; const spin=off?ss(9,13,tc)*(tc<15?1:1-ss(15,17,tc)*0):0; if(!this.psi) this.psi=0; const target=off?(tc-9)*.5:0; const psi=-(tc<9?0:tc<17?(tc-9)*.55:(8*.55)*(1-ss(17,20,tc)));
  g.fillStyle='#8fbf6a'; g.fillRect(0,0,W,H); g.fillStyle='rgba(0,0,0,.05)'; for(let i=0;i<8;i++)for(let j=0;j<6;j++) if((i+j)&1) g.fillRect(i*80,j*80,80,80);
  const cx=300,cy=215; g.save(); g.translate(cx,cy);
  // fuselage (tourne avec psi)
  g.save(); g.rotate(psi); g.fillStyle='rgba(0,0,0,.2)'; g.beginPath(); g.ellipse(6,8,46,30,0,0,7); g.fill(); g.fillStyle='#e4572e'; g.beginPath(); g.ellipse(0,0,46,28,0,0,7); g.fill(); g.strokeStyle='#7a2a12'; g.lineWidth=2; g.stroke(); g.fillStyle='#bfe3ff'; g.beginPath(); g.ellipse(-26,0,14,17,0,0,7); g.fill(); g.fillStyle='#cfd8e2'; g.fillRect(40,-5,170,10); g.strokeStyle='#243447'; g.strokeRect(40,-5,170,10); g.fillStyle='#e4572e'; g.beginPath(); g.moveTo(190,-5); g.lineTo(212,-24); g.lineTo(218,-24); g.lineTo(212,5); g.fill();
  // rotor de queue
  const tx=212,ty=-20; g.save(); g.translate(tx,ty); if(!off){ g.rotate(t*30); g.fillStyle='rgba(60,70,90,.45)'; g.beginPath(); g.arc(0,0,20,0,7); g.fill(); g.strokeStyle='#243447'; g.lineWidth=3; g.beginPath(); g.moveTo(-20,0); g.lineTo(20,0); g.moveTo(0,-20); g.lineTo(0,20); g.stroke(); } else { g.strokeStyle='#243447'; g.lineWidth=3; g.beginPath(); g.moveTo(-20,0); g.lineTo(20,0); g.moveTo(0,-20); g.lineTo(0,20); g.stroke(); } g.restore();
  if(!off){ arrow(g,tx,ty-4,tx,ty+44,'#16a34a',5); T(g,'poussée du rotor de queue',tx-8,ty+62,{s:12,w:'800',a:'right',c:'#14532d'}); }
  g.restore();
  // rotor principal (tourne dans le monde)
  g.save(); g.rotate(t*18); g.fillStyle='rgba(30,40,60,.18)'; g.beginPath(); g.arc(0,0,128,0,7); g.fill(); g.strokeStyle='#1c2635'; g.lineWidth=7; g.lineCap='round'; for(let i=0;i<4;i++){ g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(i*Math.PI/2)*128,Math.sin(i*Math.PI/2)*128); g.stroke(); } g.fillStyle='#1c2635'; g.beginPath(); g.arc(0,0,9,0,7); g.fill(); g.restore();
  g.restore();
  // flèches de rotation
  const arc=(r,a0,a1,col,lab,lx,ly,ccw)=>{ g.strokeStyle=col; g.lineWidth=5; g.beginPath(); g.arc(cx,cy,r,a0,a1,ccw); g.stroke(); const ae=a1; const ex=cx+Math.cos(ae)*r, ey=cy+Math.sin(ae)*r; const dir=ccw?-1:1; const tx=-Math.sin(ae)*dir, ty=Math.cos(ae)*dir; g.fillStyle=col; g.beginPath(); g.moveTo(ex+tx*14,ey+ty*14); g.lineTo(ex-ty*8,ey+tx*8); g.lineTo(ex+ty*8,ey-tx*8); g.closePath(); g.fill(); T(g,lab,lx,ly,{s:13,w:'800',c:col}); };
  arc(152,-2.3,-.7,'#2563eb','Le rotor tourne ainsi ↻',cx+40,cy-168,false);
  if(off){ arc(88,2.2,.9,'#dc2626','…donc le fuselage tourne en sens inverse ↺',cx-210,cy+140,true); }
  g.fillStyle=off?'#dc2626':'#16a34a'; rr(g,14,14,250,46,10); g.fill(); T(g,off?'Rotor de queue en panne !':'Rotor de queue actif',26,36,{s:17,w:'800',c:'#fff',sh:0}); T(g,off?'le fuselage part en toupie':'le fuselage garde son cap',26,52,{s:12,w:'700',c:'#fff',sh:0});
  bar(g,W,H,off?'Sans anticouple, impossible de garder le cap : le pilote doit se poser vite.':'Action–réaction : le rotor de queue pousse la queue pour annuler la rotation.');
 }};
{ const o=keep('heli'); F['heli']={cap:o.cap,svg:'',canvas:HE,alt:'Vue de dessus d’un hélicoptère : le fuselage tourne si le rotor anticouple s’arrête'}; }

/* ===== Pitot / statique ===== */
const PS={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430,tc=t%24; const v=mix(75,135,.5+.5*Math.sin(tc/24*Math.PI*2-1.2)); const alt=mix(1500,4500,ss(0,12,tc))-mix(0,3000,ss(12,24,tc)); const vs=Math.cos(tc/24*Math.PI*2)*0+ (tc<12?1:-1)*(tc<2||tc>10&&tc<14||tc>22?0:1)*700*Math.min(1,Math.min(tc%12,12-tc%12)/2);
  skyBg(g,W,H,'#d6ecf8'); g.fillStyle='rgba(255,255,255,.55)'; for(let i=0;i<6;i++){ const x=((i*131-t*v*1.2)%760+760)%760-60; g.fillRect(x,40+i*14,60,3); }
  // avion (coupe de l'avant)
  const px=40,py=130; g.fillStyle='#f5f7fa'; g.strokeStyle='#243447'; g.lineWidth=2.5; g.beginPath(); g.moveTo(px,py+10); g.bezierCurveTo(px,py-34,px+70,py-52,px+190,py-52); g.lineTo(px+250,py-52); g.lineTo(px+250,py+56); g.lineTo(px+190,py+56); g.bezierCurveTo(px+70,py+56,px,py+44,px,py+10); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#bfe3ff'; g.beginPath(); g.moveTo(px+100,py-48); g.lineTo(px+170,py-50); g.lineTo(px+200,py-20); g.lineTo(px+110,py-20); g.closePath(); g.fill(); g.stroke();
  // aile + Pitot
  g.fillStyle='#dfe6ee'; g.fillRect(px+120,py+54,160,10); g.strokeRect(px+120,py+54,160,10);
  g.fillStyle='#4b5563'; g.fillRect(px+156,py+64,5,18); g.fillRect(px+135,py+78,48,5); g.fillStyle='#b91c1c'; g.fillRect(px+120,py+78,18,5);
  T(g,'prise Pitot',px+118,py+104,{s:13,w:'800',c:'#b91c1c'}); T(g,'(face au vent)',px+118,py+119,{s:11,w:'700',c:'#b91c1c'});
  g.fillStyle='#1d4ed8'; g.beginPath(); g.arc(px+200,py+8,5,0,7); g.fill(); T(g,'prise statique',px+212,py+14,{s:13,w:'800',c:'#1d4ed8'}); T(g,'(sur le côté)',px+212,py+28,{s:11,w:'700',c:'#1d4ed8'});
  // flux d’air sur le Pitot
  for(let k=0;k<7;k++){ const x=px+10+((t*v*2+k*38)%200); g.strokeStyle='rgba(255,255,255,.8)'; g.lineWidth=2; g.beginPath(); g.moveTo(x,py+80+(k%3)*4-4); g.lineTo(x+16,py+80+(k%3)*4-4); g.stroke(); }
  // instruments
  const gauge=(cx0,cy0,r,title,ang,col,ticks)=>{ g.fillStyle='#10202f'; g.beginPath(); g.arc(cx0,cy0,r+6,0,7); g.fill(); g.fillStyle='#f4f6f8'; g.beginPath(); g.arc(cx0,cy0,r,0,7); g.fill(); g.strokeStyle='#243447'; g.lineWidth=1.5; for(let i=0;i<=ticks;i++){ const a=-2.35+i/ticks*4.7; g.beginPath(); g.moveTo(cx0+Math.cos(a)*(r-2),cy0+Math.sin(a)*(r-2)); g.lineTo(cx0+Math.cos(a)*(r-9),cy0+Math.sin(a)*(r-9)); g.stroke(); } g.strokeStyle=col; g.lineWidth=4; g.lineCap='round'; g.beginPath(); g.moveTo(cx0,cy0); g.lineTo(cx0+Math.cos(ang)*(r-12),cy0+Math.sin(ang)*(r-12)); g.stroke(); g.fillStyle='#243447'; g.beginPath(); g.arc(cx0,cy0,4,0,7); g.fill(); T(g,title,cx0,cy0+r+24,{s:13,w:'800',a:'center'}); };
  const gy=322,gr=44; const aA=-2.35+(v-40)/(160-40)*4.7, aL=-2.35+((alt%10000)/10000)*4.7, aV=(vs/2000)*2.3-1.57*0;
  gauge(110,gy,gr,'Anémomètre',aA,'#b91c1c',12); gauge(320,gy,gr,'Altimètre',aL,'#1d4ed8',10); gauge(530,gy,gr,'Variomètre',aV-1.57+1.57-1.57+0,'#1d4ed8',10);
  T(g,Math.round(v)+' kt',110,gy+8+gr+0-gr*1.3,{s:12,w:'800',a:'center',sh:0,c:'#b91c1c'}); T(g,Math.round(alt/10)*10+' ft',320,gy-gr*1.3+8,{s:12,w:'800',a:'center',sh:0}); T(g,(vs>=0?'+':'')+Math.round(vs/50)*50+' ft/min',530,gy-gr*1.3+8,{s:12,w:'800',a:'center',sh:0});
  // tubes + particules
  const tube=(pts,col,rev)=>{ g.strokeStyle=col; g.lineWidth=7; g.lineJoin='round'; g.lineCap='round'; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); let tot=0; const seg=[]; for(let i=1;i<pts.length;i++){ const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]); seg.push(d); tot+=d; } for(let k=0;k<9;k++){ let d=((t*40+k*tot/9)%tot); let i=0; while(d>seg[i]){ d-=seg[i]; i++; } const f=d/seg[i]; const x=pts[i][0]+(pts[i+1][0]-pts[i][0])*f, y=pts[i][1]+(pts[i+1][1]-pts[i][1])*f; g.fillStyle='#fff'; g.beginPath(); g.arc(x,y,2.2,0,7); g.fill(); } };
  tube([[px+120,py+80],[px+100,py+80],[px+100,262],[110,262],[110,gy-gr-6]],'rgba(220,38,38,.55)');
  tube([[px+200,py+8],[px+200,py+8],[px+232,py+8],[px+232,236],[570,236],[570,gy-gr-6]],'rgba(37,99,235,.5)');
  tube([[320,236],[320,gy-gr-6]],'rgba(37,99,235,.5)'); tube([[110+34,236],[110+34,262]],'rgba(37,99,235,.5)');
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,452,14,176,112,10); g.fill(); T(g,'Ce que mesure chaque instrument',462,32,{s:11,w:'800',sh:0,c:'#52606e'}); T(g,'Vitesse = totale − statique',462,56,{s:12,w:'800',sh:0,c:'#b91c1c'}); T(g,'Altitude = statique seule',462,76,{s:12,w:'800',sh:0,c:'#1d4ed8'}); T(g,'Vitesse verticale = variation',462,96,{s:12,w:'800',sh:0,c:'#1d4ed8'}); T(g,'de la statique',462,111,{s:12,w:'800',sh:0,c:'#1d4ed8'});
  bar(g,W,H,'Tuyau rouge : pression totale. Tuyaux bleus : pression statique.');
 }};
{ const o=keep('pitotstatic'); F['pitotstatic']={cap:o.cap,svg:'',canvas:PS,alt:'Animation des prises Pitot et statique reliées à l’anémomètre, l’altimètre et le variomètre'}; }

/* ===== Finesse ===== */
const FI={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430,tc=t%24; const k=Math.floor(tc/8), u=(tc%8)/8; const types=[['Avion de tourisme moteur coupé','finesse 9',9,'#e4572e'],['Planeur de club','finesse 30',30,'#16a34a'],['Planeur de compétition','finesse 60',60,'#2563eb']]; const ty=types[k]; const fin=ty[2];
  skyBg(g,W,H,'#d6ecf8'); const gx0=40, gx1=600, gyG=340, hy=gyG-210; // 1000 m ↔ 210 px ; 60 km ↔ 560 px
  const kmPx=(gx1-gx0)/60; const dist=fin; // km
  g.fillStyle='#6aa650'; g.fillRect(0,gyG,W,H-gyG); g.fillStyle='#4f8a3d'; g.fillRect(0,gyG,W,6);
  // échelle km
  g.strokeStyle='rgba(255,255,255,.6)'; g.lineWidth=1; g.fillStyle='#1b3b57'; for(let km=0;km<=60;km+=10){ const x=gx0+km*kmPx; g.beginPath(); g.moveTo(x,gyG); g.lineTo(x,gyG+10); g.stroke(); T(g,km+' km',x,gyG+28,{s:11,w:'800',a:'center',sh:0,c:'#fff'}); }
  T(g,'1 000 m',gx0+4,hy-8,{s:12,w:'800',c:'#0b3a66'}); g.setLineDash([4,4]); g.strokeStyle='rgba(11,58,102,.5)'; g.beginPath(); g.moveTo(gx0,hy); g.lineTo(gx1,hy); g.stroke(); g.setLineDash([]);
  const f=ss(.05,.95,u); const x=gx0+dist*f*kmPx, y=hy+(gyG-hy)*f; // trajectoire
  g.strokeStyle=ty[3]; g.lineWidth=3; g.setLineDash([8,5]); g.beginPath(); g.moveTo(gx0,hy); g.lineTo(gx0+dist*kmPx,gyG); g.stroke(); g.setLineDash([]);
  g.fillStyle=ty[3]; g.beginPath(); g.arc(gx0+dist*kmPx,gyG,7,0,7); g.fill(); T(g,'posé à '+dist+' km',gx0+dist*kmPx+(dist>40?-12:12),gyG-14,{s:14,w:'800',a:dist>40?'right':'left',c:ty[3]});
  const rot=Math.min(.14,Math.atan2(gyG-hy,dist*kmPx)*.25); if(k===1||k===2) G.glider(g,x,y-8,.55,rot*1.0,false); else G.plane(g,x,y-8,.42,rot,{prop:t*40,thr:0,flaps:0});
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,372,16,256,100,10); g.fill(); T(g,ty[0],386,40,{s:14,w:'800',sh:0}); T(g,ty[1].toUpperCase(),386,72,{s:24,w:'800',sh:0,c:ty[3]}); T(g,'1 m perdu → '+fin+' m parcourus',386,96,{s:13,w:'800',sh:0,c:'#334155'}); T(g,'(échelle verticale très exagérée)',386,110,{s:10,w:'700',sh:0,c:'#52606e'});
  g.fillStyle='rgba(255,255,255,.92)'; rr(g,16,16,200,34,8); g.fill(); T(g,'Départ à 1 000 m, air calme',28,38,{s:13,w:'800',sh:0});
  bar(g,W,H,'finesse = distance parcourue ÷ altitude perdue');
 }};
{ const o=keep('finesse'); F['finesse']={cap:o.cap,svg:'',canvas:FI,alt:'Animation comparant la distance planée depuis 1000 m pour trois finesses'}; }
})();
