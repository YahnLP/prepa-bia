(function(){ const B=window.BIA, F=B.figs, G=B.gfx;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); };
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-10*Math.cos(a-.45),y1-10*Math.sin(a-.45)); g.lineTo(x1-10*Math.cos(a+.45),y1-10*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }
function topPlane(g,x,y,rot,sc,col){ g.save(); g.translate(x,y); g.rotate(rot); g.scale(sc,sc); g.fillStyle=col||'#f5f7fa'; g.strokeStyle='#243447'; g.lineWidth=1.5/sc; g.beginPath(); g.moveTo(0,-30); g.lineTo(5,-8); g.lineTo(38,4); g.lineTo(38,12); g.lineTo(5,8); g.lineTo(4,24); g.lineTo(16,30); g.lineTo(16,35); g.lineTo(0,32); g.lineTo(-16,35); g.lineTo(-16,30); g.lineTo(-4,24); g.lineTo(-5,8); g.lineTo(-38,12); g.lineTo(-38,4); g.lineTo(-5,-8); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#e4572e'; g.fillRect(-38,4,76,3); g.restore(); }

/* ======== Virage ======== */
const BK={W:640,H:420,cyc:18,
 draw(g,t){ const W=640,H=420,tc=t%18; const phi=(tc<8?ss(0,8,tc):tc<11?1:1-ss(11,17,tc))*60; const a=phi*Math.PI/180; const cx=210,cy=190;
  const l=g.createLinearGradient(0,0,0,H); l.addColorStop(0,'#2d78cf'); l.addColorStop(1,'#cfe8f7'); g.fillStyle=l; g.fillRect(0,0,W,H);
  g.strokeStyle='rgba(255,255,255,.7)'; g.lineWidth=1.5; g.setLineDash([6,6]); g.beginPath(); g.moveTo(cx-190,cy); g.lineTo(cx+190,cy); g.stroke(); g.setLineDash([]); T(g,'horizon',cx-185,cy-6,{s:11,w:'700',c:'#17324a'});
  // avion vu de face (de l’arrière : on regarde dans le sens du vol)
  g.save(); g.translate(cx,cy); g.rotate(a); g.fillStyle='#f5f7fa'; g.strokeStyle='#243447'; g.lineWidth=2; g.beginPath(); g.moveTo(-100,-4); g.lineTo(-12,-9); g.lineTo(12,-9); g.lineTo(100,-4); g.lineTo(100,4); g.lineTo(12,3); g.lineTo(-12,3); g.lineTo(-100,4); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#e4572e'; g.beginPath(); g.ellipse(0,0,15,20,0,0,7); g.fill(); g.stroke(); g.fillStyle='#bfe3ff'; g.beginPath(); g.ellipse(0,-6,9,9,0,0,7); g.fill(); g.restore();
  // forces : portance perpendiculaire aux ailes
  const P=80, Lg=P/Math.cos(Math.min(a,1.2)); const lx=Math.sin(a)*Lg, ly=-Math.cos(a)*Lg; // portance (écran), ailes tournent de a : normale = (sin a, -cos a)
  arrow(g,cx,cy,cx+lx,cy+ly,'#16a34a',5); T(g,'Portance',cx+lx*1.0+8,cy+ly-6,{s:14,w:'800',c:'#15803d'});
  arrow(g,cx,cy,cx,cy+P,'#2563eb',5); T(g,'Poids',cx+8,cy+P+16,{s:14,w:'800',c:'#1d4ed8'});
  g.setLineDash([5,4]); g.strokeStyle='rgba(22,163,74,.8)'; g.lineWidth=2.5; g.beginPath(); g.moveTo(cx+lx,cy+ly); g.lineTo(cx,cy+ly); g.lineTo(cx,cy); g.stroke(); g.strokeStyle='rgba(249,115,22,.95)'; g.beginPath(); g.moveTo(cx,cy+ly); g.lineTo(cx+lx,cy+ly); g.stroke(); g.setLineDash([]);
  arrow(g,cx,cy+ly*0.0+0,cx+lx,cy,'#f97316',5); T(g,'part horizontale',cx+lx*.5,cy+20,{s:13,w:'800',a:'center',c:'#c2410c'}); T(g,'= elle fait tourner',cx+lx*.5,cy+36,{s:12,w:'700',a:'center',c:'#c2410c'});
  T(g,'part verticale = poids',cx-8,cy+ly*.5,{s:12,w:'800',a:'right',c:'#15803d'});
  // panneau
  const n=1/Math.cos(a); g.fillStyle='rgba(255,255,255,.95)'; rr(g,440,16,190,222,10); g.fill();
  T(g,'Inclinaison',452,40,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,Math.round(phi)+'°',452,66,{s:26,w:'800',sh:0});
  T(g,'Facteur de charge  n',452,92,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,n.toFixed(2).replace('.',',')+' g',452,120,{s:24,w:'800',sh:0,c:n>1.4?'#b91c1c':'#c2410c'});
  T(g,'n = 1 / cos(inclinaison)',452,142,{s:11,w:'700',sh:0,c:'#52606e'});
  T(g,'Vitesse de décrochage',452,170,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,'× '+Math.sqrt(n).toFixed(2).replace('.',','),452,198,{s:22,w:'800',sh:0,c:Math.sqrt(n)>1.2?'#b91c1c':'#334155'}); T(g,'(√n)',540,198,{s:12,w:'700',sh:0,c:'#52606e'}); T(g,phi>50?'→ attention au décrochage !':'',452,224,{s:12,w:'800',sh:0,c:'#b91c1c'});
  bar(g,W,H,phi<3?'En palier : la portance équilibre le poids.':'La portance s’incline : pour garder l’altitude il faut tirer un peu et elle augmente.');
 }};
F['bank']={cap:'<b>Pourquoi un avion tourne en s’inclinant.</b> Quand on incline l’avion, la portance s’incline aussi. Une partie (verticale) continue de porter l’avion ; l’autre (horizontale) le tire vers l’<b>intérieur du virage</b> : c’est elle qui fait tourner. Comme la partie verticale diminue, il faut tirer un peu sur le manche pour ne pas perdre d’altitude.',svg:'',canvas:BK,alt:'Animation d’un avion qui s’incline jusqu’à 60° avec la portance décomposée en une part verticale et une part horizontale'};

/* ======== Altitude / hauteur / niveau de vol ======== */
const AL={W:640,H:430,cyc:20,
 draw(g,t){ const W=640,H=430; const alt=2200+1500*Math.sin(t*.32-.6); const sea=330, pxft=.075; // px par ft
  const yy=ft=>sea-ft*pxft; const l=g.createLinearGradient(0,0,0,sea); l.addColorStop(0,'#2d78cf'); l.addColorStop(1,'#cfe8f7'); g.fillStyle=l; g.fillRect(0,0,W,sea);
  g.fillStyle='#2b6fb3'; g.fillRect(0,sea,W,H-sea); g.fillStyle='rgba(255,255,255,.25)'; for(let i=0;i<8;i++) g.fillRect(((i*91+t*10)%W),sea+8+(i%3)*14,36,2);
  g.fillStyle='#6aa650'; g.beginPath(); g.moveTo(180,sea); g.lineTo(220,yy(400)); g.lineTo(380,yy(400)); g.lineTo(420,sea); g.closePath(); g.fill(); g.fillStyle='#41464e'; g.fillRect(240,yy(400)-3,120,4); T(g,'aérodrome (400 ft)',300,yy(400)+16,{s:12,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.45)'});
  // niveau standard 1013 (QNH 1005 → 1013 est 240 ft plus bas)
  const std=-240; g.setLineDash([7,5]); g.strokeStyle='rgba(255,230,120,.95)'; g.lineWidth=2; g.beginPath(); g.moveTo(0,yy(std)); g.lineTo(W,yy(std)); g.stroke(); g.setLineDash([]); T(g,'niveau où la pression = 1013 hPa',10,yy(std)+18,{s:11,w:'800',c:'#ffe27a',sc:'rgba(0,0,0,.5)'});
  g.strokeStyle='rgba(255,255,255,.9)'; g.lineWidth=2; g.beginPath(); g.moveTo(0,sea); g.lineTo(W,sea); g.stroke(); T(g,'niveau de la mer (QNH 1005)',10,sea-6,{s:11,w:'800',c:'#fff',sc:'rgba(0,0,0,.5)'});
  const px=300, py=yy(alt); G.plane(g,px,py,.6,0,{prop:t*40,thr:.6,flaps:0});
  // lignes de mesure
  const vl=(x,y0,y1,c)=>{ g.strokeStyle=c; g.lineWidth=3; g.beginPath(); g.moveTo(x,y0); g.lineTo(x,y1); g.stroke(); arrow(g,x,y0,x,y0+(y1>y0?1:-1)*3+ (y1-y0)*.001,c,1); };
  vl(px+70,py+8,sea,'#16a34a'); vl(px+90,py+8,yy(400),'#f97316'); vl(px+110,py+8,yy(std),'#eab308');
  const alt1=Math.round(alt/10)*10, qfe=Math.round((alt-400)/10)*10, pa=alt-std, fl=Math.round(pa/100);
  g.fillStyle='rgba(255,255,255,.96)'; rr(g,448,16,182,170,10); g.fill();
  T(g,'L’altimètre indique :',460,38,{s:12,w:'700',sh:0,c:'#52606e'});
  T(g,'QNH',460,64,{s:13,w:'800',sh:0,c:'#15803d'}); T(g,alt1+' ft',540,66,{s:19,w:'800',sh:0}); T(g,'altitude',460,80,{s:11,w:'600',sh:0,c:'#52606e'});
  T(g,'QFE',460,106,{s:13,w:'800',sh:0,c:'#c2410c'}); T(g,Math.max(0,qfe)+' ft',540,108,{s:19,w:'800',sh:0}); T(g,'hauteur (au-dessus du terrain)',460,122,{s:11,w:'600',sh:0,c:'#52606e'});
  T(g,'1013',460,148,{s:13,w:'800',sh:0,c:'#a16207'}); T(g,'FL '+String(fl).padStart(3,'0'),540,150,{s:19,w:'800',sh:0}); T(g,'niveau de vol',460,164,{s:11,w:'600',sh:0,c:'#52606e'});
  T(g,'La hauteur n’est pas l’altitude !',250,40,{s:15,w:'800',a:'center',c:'#0b3a66'});
  bar(g,W,H,'Même avion, même instant : trois calages, trois lectures différentes.');
 }};
F['altlevels']={cap:'<b>Trois façons de dire « à quelle hauteur je suis ».</b> Selon le calage de l’altimètre, il indique : l’<b>altitude</b> (au-dessus de la mer) avec le QNH ; la <b>hauteur</b> (au-dessus du terrain) avec le QFE ; le <b>niveau de vol</b> (FL) avec le calage standard 1013 hPa, utilisé en croisière. Exemple : terrain à 400 ft d’altitude, avion à 2 000 ft d’altitude → hauteur 1 600 ft.',svg:'',canvas:AL,alt:'Animation d’un avion avec les trois lectures de l’altimètre : altitude, hauteur et niveau de vol'};

/* ======== Priorités ======== */
const RW={W:640,H:430,cyc:10,
 panel(g,x0,y0,k,u){ const w=320,h=200; g.save(); g.beginPath(); g.rect(x0,y0,w,h); g.clip(); g.fillStyle='#8fbf6a'; g.fillRect(x0,y0,w,h); g.fillStyle='rgba(0,0,0,.05)'; for(let i=0;i<4;i++) for(let j=0;j<3;j++) if((i+j)&1) g.fillRect(x0+i*80,y0+j*80,80,80); g.translate(x0,y0);
  const sc=.4; const ease=ss;
  if(k===0){ const ax=-30+u*400, ay=100+30*ease(.2,.5,u)-30*ease(.7,.95,u)*0; const bx=350-u*400, by=100-30*ease(.2,.5,u); topPlane(g,ax,ay,Math.PI/2,sc); topPlane(g,bx,by,-Math.PI/2,sc,'#ffe6c8'); T(g,'Face à face : chacun dévie à DROITE',160,26,{s:14,w:'800',a:'center',c:'#0b2a4a'}); T(g,'A',ax,ay-22,{s:13,w:'800',a:'center'}); T(g,'B',bx,by+30,{s:13,w:'800',a:'center'}); }
  if(k===1){ const bu=ease(0,.55,u), au=ease(.3,1,u); const bx=200, by=190-bu*150; const ax=-30+au*150+ (u>.55?au*120:0)*0; const axp=-30+Math.min(1,au)*400*(u<.55?.55:1); topPlane(g,-30+ (ss(0,1,u)*0+ (u*u)*400),100,Math.PI/2,sc); topPlane(g,bx,by,0,sc,'#ffe6c8'); T(g,'Routes qui se croisent',160,26,{s:14,w:'800',a:'center',c:'#0b2a4a'}); T(g,'A voit B à sa droite → A CÈDE (passe derrière)',160,180,{s:12,w:'800',a:'center',c:'#7a1313'}); T(g,'A',-30+(u*u)*400,78,{s:13,w:'800',a:'center'}); T(g,'B',bx+30,by,{s:13,w:'800'}); }
  if(k===2){ const ax=60+u*120, bx=-30+u*400, by=100+46*ease(.04,.24,u)*(1-ease(.72,.92,u)); topPlane(g,ax,100,Math.PI/2,sc); topPlane(g,bx,by,Math.PI/2,sc,'#ffe6c8'); T(g,'Dépassement : par la DROITE',160,26,{s:14,w:'800',a:'center',c:'#0b2a4a'}); T(g,'A (lent) a priorité',ax,76,{s:12,w:'800',a:'center'}); T(g,'B (rapide) dépasse',bx,by+32,{s:12,w:'800',a:'center'}); }
  if(k===3){ const px=-30+u*400, py=100+36*ease(.2,.45,u)*(1-ease(.6,.85,u)); const bx=170,by=92+Math.sin(u*6)*3; g.fillStyle='#e4572e'; g.beginPath(); g.arc(bx,by-6,24,0,7); g.fill(); g.strokeStyle='rgba(0,0,0,.35)'; g.lineWidth=2; g.stroke(); g.fillStyle='#8a5a3c'; g.fillRect(bx-7,by+14,14,10); topPlane(g,px,py,Math.PI/2,sc); T(g,'Le moins manœuvrable a priorité',160,26,{s:14,w:'800',a:'center',c:'#0b2a4a'}); T(g,'ballon > planeur > dirigeable > remorqueur > avion',160,182,{s:11,w:'800',a:'center',c:'#0b2a4a'}); }
  g.restore(); g.strokeStyle='#fff'; g.lineWidth=2; g.strokeRect(x0+1,y0+1,w-2,h-2); },
 draw(g,t){ const u=(t%10)/10; g.fillStyle='#fff'; g.fillRect(0,0,640,430); this.panel(g,0,0,0,u); this.panel(g,320,0,1,u); this.panel(g,0,201,2,u); this.panel(g,320,201,3,u); bar(g,640,430,'En vol à vue, c’est le pilote qui regarde dehors : voir et éviter.'); }};
F['rightofway']={cap:'<b>Les priorités de passage</b> en vol à vue. Quatre situations à retenir : face à face (chacun à droite), routes qui se croisent (celui qui a l’autre à sa droite cède), dépassement (par la droite), et le plus difficile à manœuvrer a toujours la priorité.',svg:'',canvas:RW,alt:'Animation de quatre situations de priorité entre aéronefs'};

/* ======== Latitude / longitude ======== */
const LL={W:640,H:430,cyc:30,
 cities:[['Toulouse',43.6,1.4],['New York',40.7,-74],['Tokyo',35.7,139.7],['Sydney',-33.9,151.2],['Rio de Janeiro',-22.9,-43.2],['Le Cap',-33.9,18.4]],
 draw(g,t){ const W=640,H=430,cx=240,cy=205,R=165; const idx=Math.floor(t/5)%6, u=(t%5)/5; const prev=(idx+5)%6; const c1=LL.cities[idx], c0=LL.cities[prev]; let dl=c1[2]-c0[2]; while(dl>180) dl-=360; while(dl<-180) dl+=360; const e=ss(0,.45,u); const lam=c0[2]+dl*e, phi=c0[1]+(c1[1]-c0[1])*e; const tilt=.35;
  g.fillStyle='#0c1c3a'; g.fillRect(0,0,W,H); for(let i=0;i<50;i++){ g.fillStyle='rgba(255,255,255,.5)'; g.fillRect((i*137)%W,(i*83)%H,1.5,1.5); }
  const sph=g.createRadialGradient(cx-50,cy-50,10,cx,cy,R); sph.addColorStop(0,'#5bb2ff'); sph.addColorStop(1,'#12457a'); g.fillStyle=sph; g.beginPath(); g.arc(cx,cy,R,0,7); g.fill();
  const proj=(la,lo)=>{ const a=la*Math.PI/180, b=(lo-lam)*Math.PI/180; let x=Math.cos(a)*Math.sin(b), y=Math.sin(a), z=Math.cos(a)*Math.cos(b); const yy=y*Math.cos(tilt)-z*Math.sin(tilt), zz=y*Math.sin(tilt)+z*Math.cos(tilt); return [cx+R*x,cy-R*yy,zz]; };
  const line=(pts,col,w)=>{ g.strokeStyle=col; g.lineWidth=w; g.beginPath(); let on=false; for(const p of pts){ if(p[2]>0){ on?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); on=true; } else on=false; } g.stroke(); };
  for(let la=-60;la<=60;la+=30){ const pts=[]; for(let lo=-180;lo<=180;lo+=4) pts.push(proj(la,lo)); line(pts,la===0?'#ff6b5a':'rgba(255,255,255,.5)',la===0?3:1.2); }
  for(let lo=-180;lo<180;lo+=30){ const pts=[]; for(let la=-90;la<=90;la+=4) pts.push(proj(la,lo)); line(pts,lo===0?'#6cc4ff':'rgba(255,255,255,.5)',lo===0?3:1.2); }
  // marqueur
  const P=proj(phi,lam+0*0); const pm=proj(c1[1]*e+c0[1]*(1-e),c0[2]+dl*e); const tgt=proj(c1[1],c1[2]);
  const show=u>.5; if(tgt[2]>0&&show){ const eq=[],mer=[]; for(let k=0;k<=24;k++){ eq.push(proj(0,c1[2]*k/24)); mer.push(proj(c1[1]*k/24,c1[2])); } line(eq,'#ffd23f',5); line(mer,'#ffd23f',5); g.fillStyle='#ffd23f'; g.beginPath(); g.arc(tgt[0],tgt[1],8,0,7); g.fill(); g.strokeStyle='#fff'; g.lineWidth=2; g.stroke(); T(g,c1[0],tgt[0]+12,tgt[1]-10,{s:14,w:'800',c:'#fff',sc:'rgba(0,0,0,.65)'}); }
  T(g,'équateur 0°',cx-R+6,cy+R*Math.sin(tilt)*0+R*.12+8,{s:11,w:'800',c:'#ffb3a8',sc:'rgba(0,0,0,.55)'}); T(g,'Greenwich 0°',cx+4,cy-R-8,{s:12,w:'800',a:'center',c:'#9fdcff',sc:'rgba(0,0,0,.55)'});
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,430,40,196,180,10); g.fill(); T(g,c1[0],444,66,{s:18,w:'800',sh:0});
  const la=c1[1], lo=c1[2]; T(g,'Latitude',444,98,{s:12,w:'700',sh:0,c:'#52606e'}); T(g,Math.abs(la).toFixed(1).replace('.',',')+'° '+(la>=0?'N':'S'),444,124,{s:22,w:'800',sh:0,c:'#b45309'}); T(g,'depuis l’équateur',444,140,{s:11,w:'600',sh:0,c:'#52606e'});
  T(g,'Longitude',444,168,{s:12,w:'700',sh:0,c:'#52606e'}); T(g,Math.abs(lo).toFixed(1).replace('.',',')+'° '+(lo>=0?'E':'O'),444,194,{s:22,w:'800',sh:0,c:'#0369a1'}); T(g,'depuis Greenwich',444,210,{s:11,w:'600',sh:0,c:'#52606e'});
  bar(g,W,H,'Latitude : arc jaune depuis l’équateur. Longitude : arc jaune depuis Greenwich.');
 }};
F['latlon']={cap:'<b>Se repérer sur la Terre.</b> La <b>latitude</b> se mesure en degrés du nord au sud à partir de l’équateur (de 0° à 90°). La <b>longitude</b> se mesure d’est en ouest à partir du méridien de Greenwich (de 0° à 180°). Avec les deux, on désigne n’importe quel point.',svg:'',canvas:LL,alt:'Globe terrestre qui tourne et indique latitude et longitude de plusieurs villes'};

/* ======== Espace aérien ======== */
const AS={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430,gy=370,ft=h=>gy-h*.0265; const tc=t%24;
  const l=g.createLinearGradient(0,0,0,gy); l.addColorStop(0,'#2d78cf'); l.addColorStop(1,'#cfe8f7'); g.fillStyle=l; g.fillRect(0,0,W,gy); g.fillStyle='#5aa245'; g.fillRect(0,gy,W,H-gy);
  // trajectoire : classe G → TMA → CTR → piste
  const keys=[[0,40,1800],[6,200,4200],[10,300,6500],[14,360,3000],[18,420,1200],[21,470,0],[24,540,0]]; let x=40,alt=1800; for(let i=0;i<keys.length-1;i++){ if(tc>=keys[i][0]&&tc<keys[i+1][0]){ const u=ss(keys[i][0],keys[i+1][0],tc); x=keys[i][1]+(keys[i+1][1]-keys[i][1])*u; alt=keys[i][2]+(keys[i+1][2]-keys[i][2])*u; } }
  // zones
  const inCTR=x>340&&x<540&&alt<3500, inTMA=!inCTR&&x>220&&x<640&&alt>=3500&&alt<9500&&true; 
  // TMA (au-dessus de la CTR, plus large)
  g.fillStyle=inTMA?'rgba(124,58,237,.38)':'rgba(124,58,237,.18)'; g.strokeStyle='#7c3aed'; g.lineWidth=2.5; g.beginPath(); g.moveTo(220,ft(3500)); g.lineTo(220,ft(9500)); g.lineTo(640,ft(9500)); g.lineTo(640,ft(3500)); g.lineTo(540,ft(3500)); g.lineTo(540,gy); g.lineTo(340,gy); g.lineTo(340,ft(3500)); g.closePath(); g.fill(); g.stroke();
  g.fillStyle=inCTR?'rgba(37,99,235,.42)':'rgba(37,99,235,.2)'; g.strokeStyle='#2563eb'; g.beginPath(); g.rect(340,ft(3500),200,gy-ft(3500)); g.fill(); g.stroke();
  T(g,'CTR',440,ft(3500)+22,{s:20,w:'800',a:'center',c:'#1d4ed8'}); T(g,'du sol jusqu’à 3 500 ft',440,ft(3500)+38,{s:12,w:'700',a:'center',c:'#1d4ed8'});
  T(g,'TMA',380,ft(9500)+30,{s:20,w:'800',a:'center',c:'#6d28d9'}); T(g,'au-dessus de la CTR, plus large',380,ft(9500)+48,{s:12,w:'700',a:'center',c:'#6d28d9'});
  // zone réglementée
  g.fillStyle='rgba(220,38,38,.28)'; g.strokeStyle='#dc2626'; g.lineWidth=2; g.setLineDash([5,4]); g.fillRect(40,ft(5500),120,ft(2500)-ft(5500)); g.strokeRect(40,ft(5500),120,ft(2500)-ft(5500)); g.setLineDash([]); T(g,'Zone R',100,ft(4200)+4,{s:16,w:'800',a:'center',c:'#991b1b'}); T(g,'(réglementée)',100,ft(4200)+20,{s:11,w:'700',a:'center',c:'#991b1b'});
  T(g,'Classe G : non contrôlé',110,ft(9000),{s:13,w:'800',a:'center',c:'#0b2a4a'}); T(g,'le pilote voit et évite',110,ft(9000)+16,{s:12,w:'700',a:'center',c:'#0b2a4a'});
  // aérodrome et tour
  g.fillStyle='#41464e'; g.fillRect(380,gy-4,120,5); g.fillStyle='#d8dfe6'; g.fillRect(520,gy-34,10,34); g.fillStyle='#2563eb'; g.fillRect(515,gy-44,20,12); T(g,'tour',525,gy-50,{s:11,w:'800',a:'center'});
  // avion
  const nx=Math.min(1,.02); G.plane(g,x,ft(alt),.5,0,{prop:t*40,thr:.6,flaps:0});
  const zone=inCTR?['CTR','contrôlé : autorisation de la tour obligatoire','#2563eb']:inTMA?['TMA','contrôlé : autorisation du contrôle obligatoire','#7c3aed']:(x>40&&x<160&&alt>2500&&alt<5500)?['Zone R','réglementée : entrée interdite sans autorisation','#dc2626']:['Classe G','non contrôlé : tu es responsable de ta séparation','#15803d'];
  g.fillStyle=zone[2]; rr(g,12,12,250,52,10); g.fill(); T(g,'Tu es dans : '+zone[0],24,36,{s:17,w:'800',c:'#fff',sh:0}); T(g,zone[1],24,56,{s:11,w:'700',c:'#fff',sh:0});
  T(g,Math.round(alt/100)*100+' ft',x,ft(alt)-24,{s:12,w:'800',a:'center'});
  bar(g,W,H,'CTR : du sol. TMA : au-dessus, plus large. Connais l’espace où tu voles.');
 }};
F['airspace']={cap:'<b>L’espace aérien vu de côté.</b> Autour d’un aérodrome important, la <b>CTR</b> part du sol : un contrôleur y règle tous les mouvements. Au-dessus, la <b>TMA</b> plus large protège les avions qui convergent vers les aérodromes. Autour et en dessous, l’espace peut être non contrôlé (classe G) : le pilote y est responsable de voir et d’éviter.',svg:'',canvas:AS,alt:'Animation d’un avion qui traverse espace non contrôlé, TMA et CTR avant d’atterrir'};
})();
