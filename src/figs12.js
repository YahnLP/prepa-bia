(function(){ const B=window.BIA, F=B.figs, G=B.gfx;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); }, mix=(a,b,k)=>a+(b-a)*k;
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-9*Math.cos(a-.45),y1-9*Math.sin(a-.45)); g.lineTo(x1-9*Math.cos(a+.45),y1-9*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }
function rnd(i){ const s=Math.sin(i*127.1+311.7)*43758.5453; return s-Math.floor(s); }
const keep=id=>F[id];
function setF(id,cv,alt){ const o=keep(id); F[id]={cap:o.cap,svg:'',canvas:cv,alt:alt}; }

/* ===== Couches de l'atmosphère ===== */
const LY={W:640,H:430,cyc:22,
 layers:[['Troposphère',0,11,'#5fa8e6','15 °C → −56 °C'],['Stratosphère',11,50,'#3c6fb8','−56 °C → 0 °C'],['Mésosphère',50,85,'#2b3f86','0 °C → −90 °C'],['Thermosphère',85,120,'#150f3d','jusqu’à 1 500 °C']],
 yOf(h){ // km -> px (échelle déformée)
  const top=18, base=372; const seg=[[0,11,0,100],[11,50,100,205],[50,85,205,295],[85,120,295,350]]; for(const s of seg){ if(h<=s[1]) return base-(s[2]+(h-s[0])/(s[1]-s[0])*(s[3]-s[2])); } return base-350; },
 temp(h){ const k=[[0,15],[11,-56],[20,-56],[32,-44],[47,-2],[51,-2],[71,-58],[85,-90],[100,-40],[120,200]]; for(let i=1;i<k.length;i++) if(h<=k[i][0]) return mix(k[i-1][1],k[i][1],(h-k[i-1][0])/(k[i][0]-k[i-1][0])); return 200; },
 draw(g,t){ const W=640,H=430,tc=t%22; const hh=tc<2?0:tc<18?ss(2,18,tc)*105:105*(1-ss(18,22,tc)); const L=LY, y=L.yOf;
  const x0=40,x1=360; // colonne
  L.layers.forEach((l,i)=>{ const yt=y(l.length?l[2]:l[2]), yb=y(l[1]); const gr=g.createLinearGradient(0,yt,0,yb); const cols=[['#2f7fd6','#cfe9f8'],['#1f4a99','#3a74c4'],['#10215c','#2a4aa0'],['#05030f','#18104a']][i]; gr.addColorStop(0,cols[0]); gr.addColorStop(1,cols[1]); g.fillStyle=gr; g.fillRect(x0,yt,x1-x0,yb-yt); g.strokeStyle='rgba(255,255,255,.7)'; g.setLineDash([6,4]); g.lineWidth=1.5; g.beginPath(); g.moveTo(x0,yt); g.lineTo(x1,yt); g.stroke(); g.setLineDash([]); const dk=i===0; T(g,l[0],x0+10,yb-10,{s:15,w:'800',c:dk?'#0b3a66':'#fff',sc:dk?'rgba(255,255,255,.9)':'rgba(0,0,0,.45)'}); T(g,l[4]+' · limite '+Math.round(l[2])+' km',x0+10,yb-27,{s:11,w:'700',c:dk?'#0b3a66':'#e6f0ff',sc:dk?'rgba(255,255,255,.9)':'rgba(0,0,0,.45)'}); });
  // étoiles
  g.globalAlpha=.8; G.stars(g,320,60,24); g.globalAlpha=1;
  // contenu : sol, nuages, avion de ligne, ballon stratosphérique, météore, aurore, ISS
  g.fillStyle='#4f8a3d'; g.fillRect(x0,y(0),x1-x0,10); G.cloud(g,70,y(0)-18,.9,.95); G.cloud(g,230,y(0)-24,1.1,.9); G.cloud(g,150,y(5)-20,.7,.55);
  G.plane(g,((t*30)%400)+10,y(10.5),.28,0,{prop:t*40,thr:.6,flaps:0}); T(g,'avion de ligne ≈ 11 km',210,y(10.5)-18,{s:11,w:'800',c:'#fff',sc:'rgba(0,0,0,.5)'});
  g.fillStyle='rgba(255,255,255,.9)'; g.beginPath(); g.ellipse(100,y(30)-16+Math.sin(t)*3,12,16,0,0,7); g.fill(); g.fillStyle='#e4572e'; g.fillRect(98,y(30)+2+Math.sin(t)*3,4,6); T(g,'ballon-sonde ≈ 30 km',122,y(30),{s:11,w:'800',c:'#fff',sc:'rgba(0,0,0,.5)'});
  g.fillStyle='rgba(70,230,150,.28)'; for(let i=0;i<5;i++){ g.beginPath(); g.ellipse(250+i*15,y(100)+Math.sin(t*1.2+i)*3,10,40,0,0,7); g.fill(); } T(g,'aurores',280,y(100)-34,{s:11,w:'800',c:'#9ff0c8',sc:'rgba(0,0,0,.5)'});
  const mt=(t*.9)%1; g.strokeStyle='rgba(255,255,255,'+(1-mt)+')'; g.lineWidth=2; g.beginPath(); g.moveTo(300-mt*60,y(70)-30+mt*70); g.lineTo(312-mt*60,y(70)-52+mt*70); g.stroke(); T(g,'étoiles filantes',195,y(70)-26,{s:11,w:'800',c:'#c8d4ff',sc:'rgba(0,0,0,.5)'});
  g.save(); g.translate(325,y(110)); g.fillStyle='#e9eef5'; g.fillRect(-6,-3,12,6); g.fillStyle='#2b6cb0'; g.fillRect(-26,-2,16,4); g.fillRect(10,-2,16,4); g.restore(); T(g,'ISS ≈ 400 km',340,y(110)+16,{s:11,w:'800',a:'right',c:'#fff',sc:'rgba(0,0,0,.5)'}); T(g,'(bien plus haut)',340,y(110)+29,{s:10,w:'700',a:'right',c:'#c8d4ff',sc:'rgba(0,0,0,.5)'});
  // courbe de température
  const gx=392,gw=124; g.fillStyle='rgba(255,255,255,.96)'; rr(g,380,10,250,398-26,10); g.fill(); T(g,'Température',394,34,{s:13,w:'800',sh:0}); g.strokeStyle='#52606e'; g.lineWidth=1; g.beginPath(); g.moveTo(gx,18+30); g.lineTo(gx,y(0)); g.stroke();
  const tx=T0=>gx+(T0+100)/320*gw+10; g.strokeStyle='#e4572e'; g.lineWidth=3; g.beginPath(); for(let h=0;h<=120;h+=1){ const px=tx(L.temp(h)), py=y(h); h?g.lineTo(px,py):g.moveTo(px,py); } g.stroke();
  const Tn=L.temp(hh); g.fillStyle='#e4572e'; g.beginPath(); g.arc(tx(Tn),y(hh),7,0,7); g.fill(); g.strokeStyle='#fff'; g.lineWidth=2; g.stroke();
  // repère altitude sur la colonne
  g.fillStyle='#ffd23f'; g.beginPath(); g.moveTo(x1-2,y(hh)); g.lineTo(x1+14,y(hh)-8); g.lineTo(x1+14,y(hh)+8); g.closePath(); g.fill(); g.strokeStyle='rgba(255,210,63,.8)'; g.lineWidth=1.5; g.setLineDash([3,3]); g.beginPath(); g.moveTo(x0,y(hh)); g.lineTo(tx(Tn),y(hh)); g.stroke(); g.setLineDash([]);
  const P=1013*Math.exp(-Math.min(hh,100)/7.2); T(g,'Altitude',520,250,{s:11,w:'700',sh:0,c:'#52606e'}); T(g,Math.round(hh)+' km',520,274,{s:22,w:'800',sh:0}); T(g,'Température',520,298,{s:11,w:'700',sh:0,c:'#52606e'}); T(g,Math.round(Tn)+' °C',520,320,{s:20,w:'800',sh:0,c:'#c2410c'}); T(g,'Pression',520,342,{s:11,w:'700',sh:0,c:'#52606e'}); T(g,(P>=10?Math.round(P):P.toFixed(2).replace('.',','))+' hPa',520,364,{s:18,w:'800',sh:0,c:'#1d4ed8'});
  T(g,'La température ne baisse pas toujours en montant',394,400-18,{s:11,w:'800',sh:0,c:'#334155'});
  bar(g,W,H,'Échelle déformée : en réalité la troposphère est très mince (11 km sur 100).');
 }};
setF('layers',LY,'Animation qui monte dans les quatre couches de l’atmosphère avec température et pression');

/* ===== Pression qui baisse ===== */
const PR={W:640,H:430,cyc:22,
 draw(g,t){ const W=640,H=430,tc=t%22; const h=tc<2?0:tc<18?ss(2,18,tc)*11000:11000*(1-ss(18,22,tc)); const y=m=>366-m/11000*320; const x0=60,x1=370;
  const l=g.createLinearGradient(0,y(11000),0,y(0)); l.addColorStop(0,'#3a78c9'); l.addColorStop(1,'#d3ebf9'); g.fillStyle=l; g.fillRect(x0,y(11000),x1-x0,366-y(11000)); g.fillStyle='#4f8a3d'; g.fillRect(x0,366,x1-x0,24);
  // molécules (densité ~ exp(-z/7600))
  for(let i=0;i<340;i++){ const z=-Math.log(1-rnd(i*3+1)*.78)*7600; if(z>11000) continue; const bx=x0+rnd(i*3+2)*(x1-x0), by=y(z); const px=bx+Math.sin(t*2+i)*5, py=by+Math.cos(t*2.3+i*1.7)*5; g.fillStyle='rgba(255,255,255,.75)'; g.beginPath(); g.arc(px,py,2.2,0,7); g.fill(); }
  // colonne d'air au-dessus : voile
  g.fillStyle='rgba(20,40,90,.18)'; g.fillRect(x0,y(11000),x1-x0,y(h)-y(11000));
  // repères
  [0,5500,11000].forEach(m=>{ g.strokeStyle='rgba(255,255,255,.8)'; g.lineWidth=1.5; g.setLineDash([5,4]); g.beginPath(); g.moveTo(x0,y(m)); g.lineTo(x1,y(m)); g.stroke(); g.setLineDash([]); T(g,(m/1000)+' km',x0+8,y(m)-6,{s:12,w:'800',c:'#0b2a4a'}); });
  T(g,'5 500 m : la moitié de l’air est déjà sous toi',x1-8,y(5500)+16,{s:11,w:'800',a:'right',c:'#0b2a4a'});
  // avion
  const P=1013*Math.pow(.5,h/5500); G.plane(g,215,y(h),.38,-.08,{prop:t*40,thr:.6,flaps:0});
  // flèches poids de l'air
  const n=Math.max(1,Math.round(P/1013*6)); for(let i=0;i<n;i++){ const ax=130+i*0+ (i*34)%220; arrow(g,ax+40,y(h)-76-i*0,ax+40,y(h)-26,'rgba(190,30,30,.75)',3); } if(h<10800) T(g,'poids de l’air au-dessus',215,y(h)-82,{s:12,w:'800',a:'center',c:'#7f1d1d'});
  // baromètre
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,400,14,230,200,12); g.fill(); T(g,'Pression',414,40,{s:13,w:'800',sh:0,c:'#52606e'}); T(g,Math.round(P)+' hPa',414,78,{s:34,w:'800',sh:0,c:'#1d4ed8'}); T(g,'Altitude '+Math.round(h/100)*100+' m',414,102,{s:13,w:'800',sh:0});
  g.fillStyle='#d6dde5'; g.fillRect(414,116,202,16); g.fillStyle='#2563eb'; g.fillRect(414,116,202*P/1013,16); T(g,'proportion de la pression au sol : '+Math.round(P/1013*100)+' %',414,152,{s:12,w:'800',sh:0,c:'#334155'}); T(g,'Tous les 5 500 m environ :',414,180,{s:12,w:'700',sh:0,c:'#52606e'}); T(g,'la pression est divisée par 2',414,198,{s:13,w:'800',sh:0,c:'#c2410c'});
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,400,230,230,110,12); g.fill(); T(g,'Pourquoi ?',414,254,{s:13,w:'800',sh:0}); ['La pression, c’est le poids de','l’air qui est au-dessus de toi.','Plus tu montes, moins il y en a.'].forEach((s,i)=>T(g,s,414,276+i*18,{s:12,w:'600',sh:0,c:'#334155'}));
  bar(g,W,H,'Chaque point blanc est une molécule d’air : elles se raréfient en altitude.');
 }};
setF('pressure',PR,'Animation d’un avion qui monte : la densité d’air et la pression diminuent');

/* ===== D'où vient le vent ===== */
const WF={W:640,H:430,cyc:16,
 sim(y0,tt){ const f=.9,g0=.9; const vg=[0,g0/f]; let x=250,y=y0,vx=0,vy=0; const pts=[[x,y]]; const dt=.02; for(let s=0;s<tt/dt;s++){ const ax=g0+f*(-vy)-.45*(vx-vg[0])*0, ay=f*vx-.45*(vy-vg[1])*0; vx+=ax*dt; vy+=ay*dt; vx*=1-.9*dt*.5; x+=vx*34*dt*1.4; y+=vy*34*dt*1.4; if(s%6===0) pts.push([x,y]); } return {pts,x,y,vx,vy}; },
 draw(g,t){ const W=640,H=430,tc=t%16; const k=Math.min(tc,11);
  g.fillStyle='#e9f0f6'; g.fillRect(0,0,W,H);
  // isobares (H gauche, L droite)
  const gr=g.createLinearGradient(40,0,520,0); gr.addColorStop(0,'rgba(220,70,70,.28)'); gr.addColorStop(.5,'rgba(255,255,255,0)'); gr.addColorStop(1,'rgba(60,110,220,.3)'); g.fillStyle=gr; g.fillRect(40,20,480,360);
  for(let i=0;i<7;i++){ const x=100+i*60; g.strokeStyle='rgba(70,80,95,.6)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,24); g.bezierCurveTo(x+14,130,x-14,260,x,376); g.stroke(); T(g,String(1024-i*3),x+4,36,{s:11,w:'800',sh:0,c:'#52606e'}); }
  g.fillStyle='#dc2626'; g.beginPath(); g.arc(70,205,26,0,7); g.fill(); T(g,'H',70,213,{s:24,w:'800',a:'center',c:'#fff',sh:0}); g.fillStyle='#2563eb'; g.beginPath(); g.arc(490,205,26,0,7); g.fill(); T(g,'L',490,213,{s:24,w:'800',a:'center',c:'#fff',sh:0});
  T(g,'hautes pressions',40,394,{s:11,w:'800',sh:0,c:'#b91c1c'}); T(g,'basses pressions',520,394,{s:11,w:'800',a:'right',sh:0,c:'#1d4ed8'});
  // trajectoires
  [110,205,300].forEach((y0,i)=>{ const s=WF.sim(y0,k); g.strokeStyle='rgba(15,98,172,.8)'; g.lineWidth=3; g.beginPath(); s.pts.forEach((p,j)=>j?g.lineTo(p[0]-150+0,p[1]):g.moveTo(p[0]-150,p[1])); g.stroke(); const px=s.x-150,py=s.y; g.fillStyle='#0f62ac'; g.beginPath(); g.arc(px,py,8,0,7); g.fill(); g.strokeStyle='#fff'; g.lineWidth=2; g.stroke();
    if(i===1){ // forces sur la particule centrale
      const P=[1,0], co=[-s.vy*0.9,s.vx*0.9]; const sc=60; arrow(g,px,py,px+60,py,'#2563eb',4); T(g,'force de pression',px+8,py-12,{s:11,w:'800',c:'#1d4ed8'}); const cl=Math.hypot(co[0],co[1]); if(cl>.05){ arrow(g,px,py,px+co[0]/Math.max(cl,.1)*Math.min(60,cl*60),py+co[1]/Math.max(cl,.1)*Math.min(60,cl*60),'#16a34a',4); T(g,'Terre qui tourne',px+8,py+28,{s:11,w:'800',c:'#15803d'}); } } });
  // panneau
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,386,24,246,92,10); g.fill(); const ph=k<2?0:k<8?1:2; T(g,['1 · L’air est poussé de H vers L','2 · La rotation de la Terre le dévie vers la droite','3 · Il finit par suivre les isobares'][ph],398,50,{s:13,w:'800',sh:0,c:'#0b3a66'}); ['Résultat : le vent souffle le long des','isobares, avec les basses pressions','à sa gauche (hémisphère nord).'].forEach((s,i)=>T(g,s,398,72+i*15,{s:11,w:'600',sh:0,c:'#334155'}));
  bar(g,W,H,'Le vent ne va pas droit de H vers L : il tourne avec la Terre.');
 }};
setF('windforce',WF,'Animation de particules d’air partant d’une haute pression vers une basse pression et déviées vers la droite');

/* ===== Trois nords ===== */
const NF={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430; const cx=250,cy=205,R=150; const hdg=((t%24)/24)*360; const D=8, dev=-3; const hm=(hdg+D+360)%360, hc=(hm+dev+360)%360; const rad=d=>d*Math.PI/180;
  g.fillStyle='#e9f0f6'; g.fillRect(0,0,W,H);
  g.fillStyle='#fff'; g.beginPath(); g.arc(cx,cy,R,0,7); g.fill(); g.strokeStyle='#243447'; g.lineWidth=3; g.stroke();
  for(let a=0;a<360;a+=10){ const r0=R-(a%30?8:16); g.strokeStyle='#52606e'; g.lineWidth=a%90?1.5:3; g.beginPath(); g.moveTo(cx+Math.sin(rad(a))*R,cy-Math.cos(rad(a))*R); g.lineTo(cx+Math.sin(rad(a))*r0,cy-Math.cos(rad(a))*r0); g.stroke(); }
  [['N',0],['E',90],['S',180],['O',270]].forEach(([s,a])=>T(g,s,cx+Math.sin(rad(a))*(R-30),cy-Math.cos(rad(a))*(R-30)+6,{s:16,w:'800',a:'center',sh:0}));
  // nord vrai
  arrow(g,cx,cy,cx,cy-R-14,'#16a34a',5); T(g,'Nord vrai',cx+8,cy-R-18,{s:13,w:'800',c:'#15803d'});
  // nord magnétique : à D degrés vers l'ouest
  const dm=-D; arrow(g,cx,cy,cx+Math.sin(rad(dm))*(R+4),cy-Math.cos(rad(dm))*(R+4),'#dc2626',5); T(g,'Nord magnétique',cx-120,cy-R+6-4,{s:13,w:'800',a:'right',c:'#b91c1c'});
  g.strokeStyle='#f59e0b'; g.lineWidth=3; g.beginPath(); g.arc(cx,cy,R-40,-Math.PI/2+rad(dm),-Math.PI/2); g.stroke(); T(g,'déclinaison',cx-22,cy-R+60,{s:11,w:'800',a:'right',c:'#b45309'});
  // avion (cap)
  g.save(); g.translate(cx,cy); g.rotate(rad(hdg)); g.fillStyle='#e4572e'; g.strokeStyle='#7a2a12'; g.lineWidth=2; g.beginPath(); g.moveTo(0,-34); g.lineTo(5,-8); g.lineTo(34,6); g.lineTo(34,13); g.lineTo(5,9); g.lineTo(4,26); g.lineTo(14,32); g.lineTo(14,36); g.lineTo(0,33); g.lineTo(-14,36); g.lineTo(-14,32); g.lineTo(-4,26); g.lineTo(-5,9); g.lineTo(-34,13); g.lineTo(-34,6); g.lineTo(-5,-8); g.closePath(); g.fill(); g.stroke(); g.restore();
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,430,24,200,300,12); g.fill(); T(g,'Le cap de l’avion se lit…',442,50,{s:12,w:'800',sh:0,c:'#52606e'});
  const row=(y,lab,sub,val,col)=>{ T(g,lab,442,y,{s:13,w:'800',sh:0,c:col}); T(g,sub,442,y+15,{s:10,w:'700',sh:0,c:'#52606e'}); T(g,String(Math.round(val)%360).padStart(3,'0')+'°',618,y+36,{s:22,w:'800',a:'right',sh:0}); };
  row(80,'par rapport au nord vrai','Cap vrai (carte)',hdg,'#15803d'); row(150,'au nord magnétique','Cap magnétique',hm,'#b91c1c'); row(220,'indiqué par le compas','Cap compas',hc,'#334155');
  T(g,'Déclinaison ici : 8° (exagérée)',442,300,{s:11,w:'800',sh:0,c:'#b45309'});
  bar(g,W,H,'Trois nords, trois caps : on les convertit avant de suivre sa route.');
 }};
setF('northfig',NF,'Boussole animée montrant le nord vrai, le nord magnétique et le cap de l’avion');

/* ===== Familles d'aéronefs ===== */
const FM={W:640,H:430,cyc:12,
 draw(g,t){ const W=640,H=430; const cols=[['Aérostats','plus légers que l’air','Archimède','#3b82c4'],['Aérodynes','plus lourds que l’air','l’aile qui avance ou tourne','#e4572e'],['Engins spatiaux','quittent l’atmosphère','poussée de fusée','#475569']];
  for(let i=0;i<3;i++){ const x0=8+i*212,w=208; const gr=g.createLinearGradient(0,40,0,H-40); gr.addColorStop(0,i===2?'#05070f':'#2d78cf'); gr.addColorStop(1,i===2?'#16407a':'#d6ecf8'); g.fillStyle=gr; rr(g,x0,40,w,H-70,12); g.fill(); g.save(); rr(g,x0,40,w,H-70,12); g.clip();
    if(i===2){ G.stars(g,640,400,40); }
    // contenu
    if(i===0){ const by=130+Math.sin(t*.8)*8; g.fillStyle='#e4572e'; g.beginPath(); g.moveTo(x0+60,by+34); g.bezierCurveTo(x0+10,by-10,x0+40,by-60,x0+60,by-60); g.bezierCurveTo(x0+90,by-60,x0+110,by-10,x0+68,by+34); g.fill(); g.fillStyle='#ffd23f'; for(let k=0;k<4;k++) g.fillRect(x0+22+k*13,by-26+(k%2)*6,8,18); g.fillStyle='#8a5a3c'; g.fillRect(x0+54,by+50,18,12); g.strokeStyle='#243447'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x0+54,by+34); g.lineTo(x0+54,by+50); g.moveTo(x0+72,by+34); g.lineTo(x0+72,by+50); g.stroke(); const fl=Math.random(); g.fillStyle='rgba(255,170,40,'+(.6+.3*fl)+')'; g.beginPath(); g.ellipse(x0+63,by+34,6,10+fl*5,0,0,7); g.fill();
      const dx=x0+112+Math.sin(t*.5)*14; g.fillStyle='#d8dfe6'; g.beginPath(); g.ellipse(dx,258,54,19,0,0,7); g.fill(); g.strokeStyle='#243447'; g.lineWidth=1.5; g.stroke(); g.fillStyle='#e4572e'; g.beginPath(); g.moveTo(dx-42,252); g.lineTo(dx-62,236); g.lineTo(dx-62,262); g.closePath(); g.fill(); g.fillStyle='#8a5a3c'; g.fillRect(dx-12,274,24,8);
      T(g,'montgolfière',x0+60,196,{s:12,w:'800',a:'center',sc:'rgba(255,255,255,.9)'}); T(g,'dirigeable',x0+110,298,{s:12,w:'800',a:'center'});
      g.fillStyle='rgba(255,255,255,.8)'; g.fillRect(x0,330,w,60); }
    if(i===1){ G.plane(g,x0+104+Math.sin(t)*10,100,.4,0,{prop:t*40,thr:.6,flaps:0}); G.glider(g,x0+110+Math.sin(t*.7)*12,195,.4,.05,false); G.heli(g,x0+104,285,.34,0,{rot:t*30}); T(g,'avion',x0+104,142,{s:12,w:'800',a:'center'}); T(g,'planeur',x0+110,226,{s:12,w:'800',a:'center'}); T(g,'hélicoptère',x0+104,336,{s:12,w:'800',a:'center'}); }
    if(i===2){ const ry=210-ss(0,12,t%12)*40; G.rocket(g,x0+60,ry+60,.52,0,{stage:1,thr:1}); const sx=x0+150,sy=130; g.save(); g.translate(sx,sy); g.rotate(t*.3); g.fillStyle='#e9eef5'; g.fillRect(-8,-6,16,12); g.fillStyle='#2b6cb0'; g.fillRect(-36,-3,24,6); g.fillRect(12,-3,24,6); g.restore(); T(g,'satellite',sx,sy+30,{s:12,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.5)'}); T(g,'fusée',x0+60,360,{s:12,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.5)'}); }
    g.restore();
    g.fillStyle=cols[i][3]; rr(g,x0,6,w,38,10); g.fill(); T(g,cols[i][0],x0+w/2,30,{s:17,w:'800',a:'center',c:'#fff',sh:0});
    T(g,cols[i][1],x0+w/2,H-70,{s:12,w:'800',a:'center',c:'#12202f'}); T(g,'grâce à : '+cols[i][2],x0+w/2,H-52,{s:11,w:'700',a:'center',c:'#52606e'}); }
  bar(g,W,H,'Trois grandes familles : on se demande toujours « qu’est-ce qui le fait tenir en l’air ? »');
 }};
setF('families',FM,'Animation des trois familles : aérostats, aérodynes et engins spatiaux');

/* ===== Voyage vers la Lune ===== */
const AP={W:640,H:430,cyc:30,
 draw(g,t){ const W=640,H=430,tc=t%30; g.fillStyle='#04060f'; g.fillRect(0,0,W,H); G.stars(g,W,H,110);
  const ex=120,ey=250,er=62, mx=540,my=220,mr=26;
  G.earth(g,ex,ey,er,t*.3);
  const g2=g.createRadialGradient(mx-8,my-8,2,mx,my,mr); g2.addColorStop(0,'#e9e6df'); g2.addColorStop(1,'#8c8a86'); g.fillStyle=g2; g.beginPath(); g.arc(mx,my,mr,0,7); g.fill(); g.fillStyle='rgba(0,0,0,.14)'; [[-8,-6,6],[9,4,8],[-4,12,4],[10,-12,4]].forEach(c=>{ g.beginPath(); g.arc(mx+c[0],my+c[1],c[2],0,7); g.fill(); });
  // trajectoires (8 inversé)
  const out=(p)=>{ const x=ex+er+8+p*(mx-ex-er-30); const y=ey-6-Math.sin(p*Math.PI)*92*(1-p*.2)-p*30+p*0; return [x,y]; }; const back=(p)=>{ const x=mx-30-p*(mx-ex-er-40); const y=my+Math.sin(p*Math.PI)*110*(1-p*.15)+p*(ey-my)-p*0; return [x,y]; };
  g.setLineDash([6,5]); g.lineWidth=2; g.strokeStyle='rgba(125,211,252,.85)'; g.beginPath(); for(let p=0;p<=1.001;p+=.02){ const q=out(p); p?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]); } g.stroke(); g.strokeStyle='rgba(253,186,116,.85)'; g.beginPath(); for(let p=0;p<=1.001;p+=.02){ const q=back(p); p?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]); } g.stroke(); g.setLineDash([]);
  T(g,'aller',280,110,{s:13,w:'800',a:'center',c:'#7dd3fc',sc:'rgba(0,0,0,.6)'}); T(g,'retour',300,368,{s:13,w:'800',a:'center',c:'#fdba74',sc:'rgba(0,0,0,.6)'});
  // vaisseau
  let pos,day,lab,sc; if(tc<10){ const p=ss(0,10,tc)*.98+.02*(tc/10); pos=out(p); day=p*3; lab='Aller : environ 3 jours'; } else if(tc<16){ pos=[mx-8+Math.cos(tc*1.3)*-0+Math.cos((tc-10)*1.2)*40, my-Math.sin((tc-10)*1.2)*40]; pos=[mx+Math.cos((tc-10)*1.1+3.14)*44,my+Math.sin((tc-10)*1.1+3.14)*44]; day=3+(tc-10)/6*1.5; lab='En orbite autour de la Lune'; } else if(tc<20){ pos=[mx-4,my-mr-3]; day=4.5; lab='Apollo 11 : pas sur la Lune (21 juillet 1969)'; } else { const p=ss(20,30,tc); pos=back(p); day=5+p*3; lab='Retour sur Terre'; }
  g.save(); g.translate(pos[0],pos[1]); g.fillStyle='#e9eef5'; g.beginPath(); g.moveTo(8,0); g.lineTo(-6,-6); g.lineTo(-6,6); g.closePath(); g.fill(); g.fillStyle='#ffd23f'; g.fillRect(-12,-3,6,6); g.restore();
  if(tc>=16&&tc<20){ g.fillStyle='#ffd23f'; g.beginPath(); g.arc(mx,my-mr,3,0,7); g.fill(); }
  const dist=tc<10?Math.round(ss(0,10,tc)*384):tc<20?384:Math.round(384*(1-ss(20,30,tc)));
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,16,16,210,86,10); g.fill(); T(g,'Jour '+(Math.floor(day)+1)+' · '+Math.round(dist)+' 000 km',28,42,{s:15,w:'800',sh:0}); T(g,lab,28,64,{s:11,w:'800',sh:0,c:'#334155'}); T(g,'Terre–Lune : 384 000 km',28,86,{s:11,w:'700',sh:0,c:'#52606e'});
  bar(g,W,H,'Distances et tailles non respectées. La Lune est 30 fois le diamètre de la Terre plus loin.');
 }};
setF('apollo',AP,'Animation du voyage Terre–Lune avec trajectoire aller et retour');

/* ===== ISS ===== */
const IS={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430; g.fillStyle='#04060f'; g.fillRect(0,0,W,H); G.stars(g,W,H,100);
  const ex=320,ey=520,er=300; // Terre en bas
  // soleil : à gauche
  const sg=g.createRadialGradient(40,200,2,40,200,90); sg.addColorStop(0,'#fff6b0'); sg.addColorStop(1,'rgba(255,200,60,0)'); g.fillStyle=sg; g.fillRect(0,100,160,200); g.fillStyle='#fde047'; g.beginPath(); g.arc(40,200,20,0,7); g.fill(); T(g,'Soleil',58,240,{s:12,w:'800',c:'#fde68a',sc:'rgba(0,0,0,.6)'}); for(let i=0;i<5;i++){ g.strokeStyle='rgba(253,224,71,.25)'; g.lineWidth=2; g.beginPath(); g.moveTo(70,150+i*25); g.lineTo(190,150+i*25); g.stroke(); }
  G.earth(g,ex,ey,er,t*.1);
  // ombre de la Terre (côté droit)
  g.save(); g.beginPath(); g.arc(ex,ey,er*1.25,0,7); g.clip(); g.fillStyle='rgba(0,0,10,.5)'; g.fillRect(ex,0,400,H); g.restore();
  // orbite exagérée
  const orR=er*1.2; const ang=-Math.PI/2*0+ (t/24)*Math.PI*2*2 -Math.PI*.9; g.strokeStyle='rgba(125,211,252,.4)'; g.setLineDash([5,5]); g.lineWidth=2; g.beginPath(); g.arc(ex,ey,orR,Math.PI*1.05,Math.PI*1.95); g.stroke(); g.setLineDash([]);
  const a=Math.PI*1.05+ ((t%12)/12)*(Math.PI*.9); const x=ex+Math.cos(a)*orR, y=ey+Math.sin(a)*orR; const dark=x>ex+10; const sx=Math.cos(a)>0.02;
  g.save(); g.translate(x,y); g.rotate(a+Math.PI/2); g.fillStyle=dark?'#4a5a6a':'#e9eef5'; g.fillRect(-9,-4,18,8); g.fillStyle=dark?'#1b3558':'#3b82f6'; g.fillRect(-46,-3,34,6); g.fillRect(12,-3,34,6); g.fillStyle='#9aa8b8'; g.fillRect(-1,-16,2,32); g.restore();
  T(g,'ISS',x+12,y-14,{s:14,w:'800',c:'#fff',sc:'rgba(0,0,0,.6)'});
  const orb=Math.floor(t/12)*0; const phase=(t%12)/12; const mins=Math.round(phase*92);
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,16,16,230,126,10); g.fill(); T(g,'Station spatiale internationale',28,40,{s:13,w:'800',sh:0}); T(g,'altitude ≈ 400 km',28,62,{s:12,w:'700',sh:0,c:'#334155'}); T(g,'vitesse ≈ 28 000 km/h',28,80,{s:12,w:'700',sh:0,c:'#334155'}); T(g,'1 tour ≈ 1 h 30',28,98,{s:12,w:'700',sh:0,c:'#334155'}); T(g,dark?'🌙 nuit : l’ISS est dans l’ombre':'☀ jour : l’ISS est éclairée',28,128,{s:13,w:'800',sh:0,c:dark?'#475569':'#c2410c'});
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,400,16,224,70,10); g.fill(); T(g,'Temps écoulé',412,40,{s:12,w:'700',sh:0,c:'#52606e'}); T(g,Math.floor(((t%12)/12)*92/60)+' h '+String(Math.round(((t%12)/12)*92)%60).padStart(2,'0'),412,72,{s:24,w:'800',sh:0});
  T(g,'altitude de l’ISS exagérée sur le dessin',320,376,{s:11,w:'800',a:'center',c:'#9fb4cc',sc:'rgba(0,0,0,.6)'});
  bar(g,W,H,'En 24 h : environ 16 tours, donc environ 16 levers de Soleil.');
 }};
setF('iss',IS,'Animation de la station spatiale internationale en orbite avec jour et nuit');
})();
