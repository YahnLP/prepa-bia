(function(){ const B=window.BIA, F=B.figs, G=B.gfx;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); };
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-10*Math.cos(a-.45),y1-10*Math.sin(a-.45)); g.lineTo(x1-10*Math.cos(a+.45),y1-10*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }
function topPlane(g,x,y,rot,sc,col){ g.save(); g.translate(x,y); g.rotate(rot); g.scale(sc,sc); g.fillStyle=col||'#f5f7fa'; g.strokeStyle='#243447'; g.lineWidth=1.5/sc; g.beginPath(); g.moveTo(0,-30); g.lineTo(5,-8); g.lineTo(38,4); g.lineTo(38,12); g.lineTo(5,8); g.lineTo(4,24); g.lineTo(16,30); g.lineTo(16,35); g.lineTo(0,32); g.lineTo(-16,35); g.lineTo(-16,30); g.lineTo(-4,24); g.lineTo(-5,8); g.lineTo(-38,12); g.lineTo(-38,4); g.lineTo(-5,-8); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#e4572e'; g.fillRect(-38,4,76,3); g.restore(); }

/* ======== VOR ======== */
const VO={W:640,H:430,cyc:40,
 draw(g,t){ const W=640,H=430,cx=320,cy=215; g.fillStyle='#8fbf6a'; g.fillRect(0,0,W,H); g.fillStyle='rgba(0,0,0,.05)'; for(let i=0;i<8;i++) for(let j=0;j<6;j++) if((i+j)&1) g.fillRect(i*80,j*80,80,80);
  // anneaux de distance (DME)
  for(const nm of [10,20,30]){ g.strokeStyle='rgba(255,255,255,.55)'; g.lineWidth=1.5; g.setLineDash([4,5]); g.beginPath(); g.arc(cx,cy,nm*5.6,0,7); g.stroke(); g.setLineDash([]); T(g,nm+' NM',cx+nm*5.6*.71+4,cy-nm*5.6*.71,{s:10,w:'700',c:'#17324a'}); }
  // rayons / radiales
  const sweep=(t*60)%360; for(let a=0;a<360;a+=10){ const r=a%30===0?190:176; const ang=(a-90)*Math.PI/180; g.strokeStyle=a%30===0?'rgba(23,50,74,.5)':'rgba(23,50,74,.22)'; g.lineWidth=a%30===0?1.5:1; g.beginPath(); g.moveTo(cx+Math.cos(ang)*14,cy+Math.sin(ang)*14); g.lineTo(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r); g.stroke(); if(a%30===0) T(g,String(a).padStart(3,'0'),cx+Math.cos(ang)*206,cy+Math.sin(ang)*206+4,{s:12,w:'800',a:'center'}); }
  // faisceau tournant
  const sa=(sweep-90)*Math.PI/180; const sg=g.createRadialGradient(cx,cy,10,cx,cy,190); sg.addColorStop(0,'rgba(255,240,120,.7)'); sg.addColorStop(1,'rgba(255,240,120,0)'); g.fillStyle=sg; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,190,sa-.09,sa+.09); g.closePath(); g.fill();
  // avion : orbite lente autour de la balise
  const ang=(t*9)%360, rad=(15+8*Math.sin(t*.17))*5.6, ar=(ang-90)*Math.PI/180, px=cx+Math.cos(ar)*rad, py=cy+Math.sin(ar)*rad; const dist=rad/5.6;
  g.strokeStyle='#dc2626'; g.lineWidth=3; g.beginPath(); g.moveTo(cx,cy); g.lineTo(px,py); g.stroke(); g.strokeStyle='rgba(220,38,38,.9)'; g.lineWidth=2; g.setLineDash([5,4]); g.beginPath(); g.arc(cx,cy,rad,0,7); g.stroke(); g.setLineDash([]);
  topPlane(g,px,py,ar+Math.PI/2+.0,.55);
  // balise
  g.fillStyle='#fff'; g.strokeStyle='#c2410c'; g.lineWidth=3; g.beginPath(); for(let k=0;k<6;k++){ const a2=k*Math.PI/3; k?g.lineTo(cx+Math.cos(a2)*13,cy+Math.sin(a2)*13):g.moveTo(cx+13,cy); } g.closePath(); g.fill(); g.stroke(); T(g,'VOR',cx,cy+34,{s:13,w:'800',a:'center',c:'#7a2e0e'}); g.fillStyle='#e8eef4'; g.fillRect(cx-3,cy-3,6,6);
  // panneau
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,12,12,190,110,10); g.fill(); T(g,'Position de l’avion',24,34,{s:12,w:'700',sh:0,c:'#52606e'}); T(g,'Radiale',24,58,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,String(Math.round(ang)).padStart(3,'0')+'°',90,60,{s:22,w:'800',sh:0,c:'#b91c1c'}); T(g,'Distance (DME)',24,88,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,dist.toFixed(0)+' NM',130,90,{s:22,w:'800',sh:0,c:'#1d4ed8'}); T(g,'= « je suis ici »',24,112,{s:12,w:'700',sh:0,c:'#334155'});
  const card=['nord','nord-est','est','sud-est','sud','sud-ouest','ouest','nord-ouest'][Math.round(ang/45)%8];
  bar(g,W,H,'Il est sur la radiale '+String(Math.round(ang)).padStart(3,'0')+' : à l’'+(card==='nord'||card==='sud'?'axe '+card:card)+' de la balise, à '+dist.toFixed(0)+' NM.');
 }};
F['vor']={cap:'<b>Le VOR : une rose de 360 routes.</b> Une balise VOR émet comme un phare tournant : chaque direction autour d’elle est une <b>radiale</b> (de 0° à 360°). Avec le récepteur, le pilote sait sur quelle radiale il se trouve, c’est-à-dire dans quelle direction il est par rapport à la balise. Associé au DME (distance), on connaît sa position.',svg:'',canvas:VO,alt:'Animation d’un avion qui tourne autour d’une balise VOR, avec radiale et distance affichées'};

/* ======== GNSS ======== */
const GN={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430,tc=t%24; const l=g.createLinearGradient(0,0,0,H); l.addColorStop(0,'#0b1a3a'); l.addColorStop(1,'#26527f'); g.fillStyle=l; g.fillRect(0,0,W,H); for(let i=0;i<50;i++){ g.fillStyle='rgba(255,255,255,'+(.3+.4*((i*7)%5)/5)+')'; g.fillRect((i*131)%W,(i*71)%240,1.5,1.5); }
  // terre
  g.fillStyle='#2f7d46'; g.beginPath(); g.ellipse(320,520,520,200,0,Math.PI,2*Math.PI); g.fill(); g.fillStyle='#3f93d4'; g.beginPath(); g.ellipse(120,330,90,12,0,0,7); g.fill();
  const P=[320,330]; // récepteur (avion)
  const sats=[[110,70],[360,40],[560,100],[220,170]]; const names=['1','2','3','4'];
  for(let i=0;i<4;i++){ const [sx,sy]=sats[i]; g.save(); g.translate(sx,sy); g.fillStyle='#d8e2ee'; g.strokeStyle='#8aa0b8'; g.fillRect(-9,-6,18,12); g.fillStyle='#3b6fd6'; g.fillRect(-30,-5,18,10); g.fillRect(12,-5,18,10); g.restore(); T(g,'Sat '+names[i],sx,sy+26,{s:12,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.5)'}); }
  // avion récepteur
  g.save(); g.translate(P[0],P[1]); g.fillStyle='#fff'; g.strokeStyle='#1c2b3b'; g.lineWidth=1.5; g.beginPath(); g.ellipse(0,0,22,5,0,0,7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(-4,0); g.lineTo(-12,-12); g.lineTo(-8,0); g.lineTo(-12,12); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#e4572e'; g.fillRect(-18,-2,36,3); g.restore(); T(g,'Toi',P[0],P[1]+26,{s:13,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.5)'});
  // phases : on ajoute un satellite toutes les 4,5 s
  const stage=Math.min(4,Math.floor(tc/4.5)+1), dists=sats.map(s=>Math.hypot(s[0]-P[0],s[1]-P[1]));
  const col=['#ffd23f','#5fe0b0','#ff8a65','#c792ff'];
  for(let i=0;i<4;i++){ if(i>=stage) continue; const st=tc-i*4.5; const prog=clamp(st/2.5,0,1); const [sx,sy]=sats[i];
    // impulsion qui voyage
    const pp=(st*0.45)%1; g.strokeStyle=col[i]+'aa'; g.lineWidth=1.5; g.setLineDash([3,6]); g.beginPath(); g.moveTo(sx,sy); g.lineTo(P[0],P[1]); g.stroke(); g.setLineDash([]); if(st<7){ g.fillStyle=col[i]; g.beginPath(); g.arc(sx+(P[0]-sx)*pp,sy+(P[1]-sy)*pp,5,0,7); g.fill(); }
    // cercle de distance
    g.strokeStyle=col[i]; g.lineWidth=2.5; g.globalAlpha=.9; g.beginPath(); g.arc(sx,sy,dists[i]*prog,0,7); g.stroke(); g.globalAlpha=1;
    const dt=(dists[i]*.00035).toFixed(3).replace('.',','); T(g,'Δt = '+dt+' s',sx+(P[0]-sx)*.45+(i%2?18:-90),sy+(P[1]-sy)*.45,{s:12,w:'800',c:col[i],sc:'rgba(0,0,0,.55)'}); }
  const msgs=['Le satellite 1 envoie l’heure d’émission : le temps de trajet donne la distance. Tu es quelque part sur ce cercle.','Avec 2 satellites : deux cercles se coupent en 2 points.','Avec 3 satellites : un seul point reste, tu es là.','4e satellite : il corrige l’horloge du récepteur et donne l’altitude.'];
  if(stage>=3&&tc>=9+2.5){ g.strokeStyle='#fff'; g.lineWidth=3; g.beginPath(); g.arc(P[0],P[1],20+4*Math.sin(t*5),0,7); g.stroke(); }
  bar(g,W,H,msgs[stage-1]);
  g.fillStyle='rgba(255,255,255,.93)'; rr(g,438,300,190,80,10); g.fill(); T(g,'distance = temps × vitesse',450,324,{s:13,w:'800',sh:0}); T(g,'vitesse du signal :',450,346,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,'300 000 km/s',450,368,{s:16,w:'800',sh:0,c:'#1d4ed8'});
 }};
F['gnss']={cap:'<b>Le GNSS (comme le GPS).</b> Chaque satellite envoie l’heure d’émission de son signal. Le récepteur mesure le temps de trajet, donc la <b>distance</b> à chaque satellite. Avec 3 satellites on trouve sa position, un 4<sup>e</sup> corrige l’horloge du récepteur et donne l’altitude. Il faut en voir <b>au moins 4</b>.',svg:'',canvas:GN,alt:'Animation de la localisation par satellites : les cercles de distance de 3 puis 4 satellites se coupent au point où se trouve l’avion'};

/* ======== Orbites ======== */
const OR={W:640,H:430,cyc:60,
 draw(g,t){ const W=640,H=430,cx=320,cy=215; const l=g.createLinearGradient(0,0,0,H); l.addColorStop(0,'#050a1c'); l.addColorStop(1,'#12264a'); g.fillStyle=l; g.fillRect(0,0,W,H); for(let i=0;i<70;i++){ g.fillStyle='rgba(255,255,255,'+(.25+.5*((i*7)%5)/5)+')'; g.fillRect((i*137)%W,(i*83)%H,1.6,1.6); }
  const min=t*55; // 1 s = 55 min
  const eaRot=(min/1436)*2*Math.PI; // terre
  const RL=78,RG=170, wL=2*Math.PI/92, wG=2*Math.PI/1436;
  g.strokeStyle='rgba(150,200,255,.35)'; g.lineWidth=1.5; g.setLineDash([5,6]); g.beginPath(); g.arc(cx,cy,RL,0,7); g.stroke(); g.beginPath(); g.arc(cx,cy,RG,0,7); g.stroke(); g.setLineDash([]);
  // Terre vue du pôle nord
  const eg=g.createRadialGradient(cx-14,cy-14,4,cx,cy,52); eg.addColorStop(0,'#5bb2ff'); eg.addColorStop(1,'#14508c'); g.fillStyle=eg; g.beginPath(); g.arc(cx,cy,52,0,7); g.fill();
  g.save(); g.translate(cx,cy); g.rotate(eaRot); g.fillStyle='#3d9a57'; g.beginPath(); g.moveTo(-40,-8); g.quadraticCurveTo(-30,-34,-8,-30); g.quadraticCurveTo(10,-20,2,-4); g.quadraticCurveTo(-10,10,-22,6); g.closePath(); g.fill(); g.beginPath(); g.moveTo(14,14); g.quadraticCurveTo(34,10,38,26); g.quadraticCurveTo(24,40,12,30); g.closePath(); g.fill();
  g.fillStyle='#ff4d3d'; g.beginPath(); g.arc(52,0,5,0,7); g.fill(); g.strokeStyle='#fff'; g.lineWidth=1.5; g.stroke(); g.restore();
  const exx=cx+Math.cos(eaRot)*52, eyy=cy+Math.sin(eaRot)*52; T(g,'Toi',exx+Math.cos(eaRot)*18,eyy+Math.sin(eaRot)*18+4,{s:12,w:'800',a:'center',c:'#fff',sc:'rgba(0,0,0,.6)'});
  // satellite géostationnaire
  const aG=wG*min, gx=cx+Math.cos(aG)*RG, gy=cy+Math.sin(aG)*RG; g.strokeStyle='rgba(255,210,70,.7)'; g.lineWidth=1.5; g.setLineDash([3,4]); g.beginPath(); g.moveTo(exx,eyy); g.lineTo(gx,gy); g.stroke(); g.setLineDash([]);
  const sat=(x,y,c)=>{ g.save(); g.translate(x,y); g.fillStyle='#e6edf6'; g.fillRect(-6,-4,12,8); g.fillStyle=c; g.fillRect(-22,-3,14,6); g.fillRect(8,-3,14,6); g.restore(); };
  sat(gx,gy,'#4a86e8'); T(g,'GEO',gx+30,gy-12,{s:13,w:'800',c:'#ffd23f',sc:'rgba(0,0,0,.6)'}); T(g,'36 000 km · 1 tour = 24 h',gx+30,gy+4,{s:11,w:'700',c:'#ffe9a6',sc:'rgba(0,0,0,.6)'});
  const aL=wL*min, lx=cx+Math.cos(aL)*RL, ly=cy+Math.sin(aL)*RL; sat(lx,ly,'#4a86e8'); T(g,'ISS (LEO)',lx+30,ly-10,{s:13,w:'800',c:'#9ff0ff',sc:'rgba(0,0,0,.6)'}); T(g,'400 km · 1 tour = 1 h 32',lx+30,ly+5,{s:11,w:'700',c:'#cdeff6',sc:'rgba(0,0,0,.6)'});
  g.fillStyle='rgba(255,255,255,.93)'; rr(g,12,12,210,96,10); g.fill(); const hh=Math.floor(min/60), mm=Math.floor(min%60); T(g,'Temps écoulé : '+hh+' h '+String(mm).padStart(2,'0'),24,34,{s:14,w:'800',sh:0}); T(g,'Tours de l’ISS : '+Math.floor(min/92),24,58,{s:13,w:'700',sh:0,c:'#0e7490'}); T(g,'Tours de la Terre : '+(min/1436).toFixed(1).replace('.',','),24,80,{s:13,w:'700',sh:0,c:'#1d4ed8'}); T(g,'Vue du pôle nord · échelle non respectée',24,100,{s:10,w:'600',sh:0,c:'#52606e'});
  bar(g,W,H,'Le satellite géostationnaire tourne en 24 h comme la Terre : il reste au-dessus de toi.');
 }};
F['orbits']={cap:'<b>Deux orbites à retenir.</b> En orbite basse (LEO, environ 400 km) le satellite tourne vite : un tour en 1 h 30 (station spatiale). En orbite géostationnaire (GEO, 36 000 km), il met 24 h : comme la Terre tourne en 24 h, il semble <b>immobile</b> au-dessus d’un point (télécommunications, météo). Distances non respectées.',svg:'',canvas:OR,alt:'Animation de la Terre vue du pôle avec un satellite basse orbite rapide et un satellite géostationnaire qui reste au-dessus du même point'};

/* ======== Circuit d’aérodrome ======== */
const CI={W:640,H:430,cyc:30,
 path(){ const W=[[430,185],[150,185],[150,350],[540,350],[540,185],[430,185]], R=40, out=[]; 
  const P=[]; for(let i=0;i<5;i++){ P.push([W[i],W[i+1],i]); }
  // chaque branche est raccourcie aux coins, les coins sont des arcs de cercle
  const dir=(a,b)=>{ const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy); return [dx/L,dy/L,L]; };
  for(let i=0;i<5;i++){ const a=W[i], b=W[i+1], d=dir(a,b); const sx=a[0]+d[0]*(i===0?0:R), sy=a[1]+d[1]*(i===0?0:R), ex=b[0]-d[0]*(i===4?0:R), ey=b[1]-d[1]*(i===4?0:R); const n=Math.max(2,Math.round(Math.hypot(ex-sx,ey-sy)/4)); for(let k=0;k<n;k++) out.push([sx+(ex-sx)*k/n,sy+(ey-sy)*k/n,i]);
    if(i<4){ const d2=dir(W[i+1],W[i+2]); const c=[ex+d2[0]*R, ey+d2[1]*R]; const a0=Math.atan2(ey-c[1],ex-c[0]), a1=Math.atan2((W[i+1][1]+d2[1]*R)-c[1],(W[i+1][0]+d2[0]*R)-c[0]); let da=a1-a0; while(da>Math.PI) da-=2*Math.PI; while(da<-Math.PI) da+=2*Math.PI; for(let k=0;k<10;k++){ const an=a0+da*k/10; out.push([c[0]+Math.cos(an)*R,c[1]+Math.sin(an)*R,i+1]); } } }
  return out; },
 draw(g,t){ const W=640,H=430; const pts=CI.pts||(CI.pts=CI.path()); const n=pts.length; const sp=7; const k=(t*sp*1.4)%n, i0=Math.floor(k), p0=pts[i0], p1=pts[(i0+1)%n], f=k-i0; const x=p0[0]+(p1[0]-p0[0])*f, y=p0[1]+(p1[1]-p0[1])*f, rot=Math.atan2(p1[1]-p0[1],p1[0]-p0[0])+Math.PI/2;
  g.fillStyle='#8fbf6a'; g.fillRect(0,0,W,H); g.fillStyle='rgba(0,0,0,.05)'; for(let i=0;i<8;i++) for(let j=0;j<6;j++) if((i+j)&1) g.fillRect(i*80,j*80,80,80);
  // piste
  g.fillStyle='#41464e'; g.fillRect(130,172,300,26); g.fillStyle='#fff'; for(let xx=150;xx<410;xx+=36) g.fillRect(xx,184,20,2.5); g.save(); g.translate(150,185); g.rotate(-Math.PI/2); T(g,'09',0,6,{s:16,w:'800',a:'center',c:'#fff',sh:0}); g.restore(); g.save(); g.translate(410,185); g.rotate(Math.PI/2); T(g,'27',0,6,{s:16,w:'800',a:'center',c:'#fff',sh:0}); g.restore();
  // trajectoire du circuit
  g.setLineDash([6,6]); g.strokeStyle='rgba(255,255,255,.85)'; g.lineWidth=2.5; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.stroke(); g.setLineDash([]);
  // étiquettes
  const L=[['1 · Montée initiale',290,164,'#1d4ed8'],['2 · Vent traversier',74,270,'#7c3aed'],['3 · Vent arrière',345,376,'#c2410c'],['4 · Étape de base',572,270,'#b91c1c'],['5 · Finale',490,164,'#15803d']];
  const hi=pts[i0][2];
  L.forEach((l,i)=>{ const on=i===hi; g.fillStyle=on?l[3]:'rgba(255,255,255,.88)'; const w=g.measureText?118:118; rr(g,l[1]-w/2,l[2]-15,w,22,11); g.fill(); T(g,l[0],l[1],l[2],{s:12,w:'800',a:'center',c:on?'#fff':l[3],sh:0}); });
  // avion
  G.shadow&&0; topPlane(g,x,y,rot,.5);
  // vent et manche à air
  arrow(g,40,60,110,60,'#1d4ed8',4); T(g,'vent (face à la piste 27)',40,46,{s:12,w:'800',c:'#1d4ed8'});
  const alts=[['≈ 500 ft','montée'],['500 ft','virage'],['1 000 ft','palier'],['descente','en virage'],['descente','finale']][hi];
  const altTxt=['0 → 500 ft','≈ 500 ft','1 000 ft (palier)','1 000 → 500 ft','500 → 0 ft'][hi]; g.fillStyle='rgba(255,255,255,.95)'; rr(g,12,330,150,60,10); g.fill(); T(g,'Hauteur',24,350,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,altTxt,24,376,{s:15,w:'800',sh:0,c:'#12202f'});
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,468,12,160,48,10); g.fill(); T(g,'Circuit à main gauche',478,32,{s:13,w:'800',sh:0}); T(g,'(on tourne à gauche)',478,50,{s:11,w:'600',sh:0,c:'#52606e'});
  bar(g,W,H,['Décollage face au vent, montée dans l’axe de la piste.','Virage de 90° vers la gauche vers 500 ft.','Parallèle à la piste, en sens inverse de l’atterrissage, à 1 000 ft.','Virage de 90° vers la piste, en descendant.','Alignement sur l’axe, descente, arrondi, toucher.'][hi]);
 }};
F['runway']={cap:'<b>La piste et le circuit d’aérodrome.</b> Le grand nombre peint sur la piste est son <b>cap magnétique divisé par 10</b> : la piste « 27 » est orientée au 270°. À l’autre bout, on lit « 09 » (090°). Un avion se pose et décolle <b>face au vent</b>. Tous les avions suivent le même tour de piste : montée, vent traversier, vent arrière, base, finale.',svg:'',canvas:CI,alt:'Animation d’un avion qui suit le circuit d’aérodrome à main gauche autour d’une piste 27'};

/* ======== Trois axes ======== */
const AX={W:640,H:400,cyc:12,
 stick(g,x,y,dx,dy,lab){ g.fillStyle='#e8edf2'; g.beginPath(); g.arc(x,y,26,0,7); g.fill(); g.strokeStyle='#8794a3'; g.lineWidth=2; g.stroke(); g.strokeStyle='#243447'; g.lineWidth=7; g.lineCap='round'; g.beginPath(); g.moveTo(x,y); g.lineTo(x+dx*16,y+dy*16); g.stroke(); g.fillStyle='#e4572e'; g.beginPath(); g.arc(x+dx*16,y+dy*16,9,0,7); g.fill(); T(g,lab,x,y+46,{s:12,w:'800',a:'center'}); },
 draw(g,t){ const W=640,H=400; g.fillStyle='#e8f1f8'; g.fillRect(0,0,W,H); const cw=W/3;
  for(let i=1;i<3;i++){ g.fillStyle='#fff'; g.fillRect(i*cw-1,0,2,H-28); }
  const s=Math.sin(t*1.05); const heads=['TANGAGE','ROULIS','LACET'], sub=['le nez monte / descend','les ailes s’inclinent','le nez tourne à gauche / à droite'], axis=['axe transversal','axe longitudinal','axe vertical'], cmd=['manche avant / arrière','manche gauche / droite','pédales (palonnier)'], gov=['gouverne de profondeur','ailerons','gouverne de direction'];
  for(let i=0;i<3;i++){ const x0=i*cw, cx=x0+cw/2; T(g,heads[i],cx,30,{s:19,w:'800',a:'center',c:'#12307c'}); T(g,sub[i],cx,50,{s:12,w:'700',a:'center',c:'#334155'}); }
  // 1. tangage : vue de côté
  { const cx=cw/2, cy=170, a=-.35*s; g.strokeStyle='rgba(194,65,12,.9)'; g.lineWidth=2; g.setLineDash([5,4]); g.beginPath(); g.arc(cx,cy,5,0,7); g.stroke(); g.setLineDash([]); g.fillStyle='rgba(194,65,12,.9)'; g.beginPath(); g.arc(cx,cy,4,0,7); g.fill(); T(g,axis[0]+' (vu de profil : un point)',cx,cy+78,{s:11,w:'700',a:'center',c:'#9a3412'});
    G.plane(g,cx+4,cy,.8,a,{prop:t*40,thr:.6,flaps:0}); arrow(g,cx-70,cy-40,cx-70,cy-40-30*Math.sign(s)*Math.min(1,Math.abs(s)*1.4),'#c2410c',3); AX.stick(g,cx,290,0,-s*.9*-1,'manche'); T(g,gov[0],cx,356,{s:12,w:'700',a:'center',c:'#475569'}); }
  // 2. roulis : vue de face
  { const cx=cw*1.5, cy=170, a=.5*s; g.save(); g.translate(cx,cy); g.rotate(a); g.fillStyle='#f5f7fa'; g.strokeStyle='#243447'; g.lineWidth=2; g.beginPath(); g.moveTo(-84,-4); g.lineTo(-10,-8); g.lineTo(10,-8); g.lineTo(84,-4); g.lineTo(84,4); g.lineTo(10,2); g.lineTo(-10,2); g.lineTo(-84,4); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#e4572e'; g.beginPath(); g.ellipse(0,0,13,18,0,0,7); g.fill(); g.stroke(); g.fillStyle='#bfe3ff'; g.beginPath(); g.ellipse(0,-6,8,8,0,0,7); g.fill(); g.fillStyle='#fff'; g.fillRect(-4,-30,8,24);
    g.fillStyle='#ffb02e'; const ad=s*.35; g.save(); g.translate(-84,0); g.rotate(-ad*-1); g.fillRect(0,-2,28,5); g.restore(); g.save(); g.translate(84,0); g.rotate(ad*-1); g.fillRect(-28,-2,28,5); g.restore(); g.restore();
    g.fillStyle='rgba(194,65,12,.9)'; g.beginPath(); g.arc(cx,cy,4,0,7); g.fill(); T(g,axis[1]+' (vu de face : un point)',cx,cy+78,{s:11,w:'700',a:'center',c:'#9a3412'}); AX.stick(g,cx,290,s*.9,0,'manche'); T(g,gov[1],cx,356,{s:12,w:'700',a:'center',c:'#475569'}); }
  // 3. lacet : vue de dessus
  { const cx=cw*2.5, cy=170, a=.5*Math.sin(t*1.05+Math.PI/2*0); topPlane(g,cx,cy,a,1.35,'#f5f7fa'); g.fillStyle='#ffb02e'; g.save(); g.translate(cx,cy); g.rotate(a); g.save(); g.translate(0,52); g.rotate(-a*.0+Math.sin(t*1.05)*.5*-1); g.fillRect(-2,0,4,14); g.restore(); g.restore();
    g.fillStyle='rgba(194,65,12,.9)'; g.beginPath(); g.arc(cx,cy,4,0,7); g.fill(); T(g,axis[2]+' (vu de dessus : un point)',cx,cy+88,{s:11,w:'700',a:'center',c:'#9a3412'});
    const p=Math.sin(t*1.05); g.fillStyle='#e8edf2'; g.strokeStyle='#8794a3'; g.lineWidth=2; for(const sd of [-1,1]){ const off=sd*p*10*-1; rr(g,cx+sd*32-14,282+off,28,18,5); g.fill(); g.stroke(); } T(g,'pédales',cx,330,{s:12,w:'800',a:'center'}); T(g,gov[2],cx,356,{s:12,w:'700',a:'center',c:'#475569'}); }
  bar(g,W,H,'Tangage → profondeur · Roulis → ailerons · Lacet → direction');
 }};
F['axes']={cap:'<b>Trois axes, trois mouvements.</b> L’avion peut tourner autour de trois axes qui passent par son centre de gravité. Chaque mouvement a sa commande : le manche (avant-arrière) pour le tangage, le manche (gauche-droite) pour le roulis, le palonnier (pédales) pour le lacet.',svg:'',canvas:AX,alt:'Animation des trois mouvements de l’avion : tangage, roulis et lacet avec leurs commandes'};
})();
