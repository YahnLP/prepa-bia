(function(){ const B=window.BIA, F=B.figs, G=B.gfx;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); }, mixc=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t)), rgb=c=>'rgb('+c[0]+','+c[1]+','+c[2]+')';
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function puff(g,x,y,r,dark){ const c0=mixc([255,255,255],[96,108,124],dark), c1=mixc([206,216,228],[58,66,80],dark); const gr=g.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r); gr.addColorStop(0,rgb(c0)); gr.addColorStop(.7,rgb(c1)); gr.addColorStop(1,'rgba('+c1[0]+','+c1[1]+','+c1[2]+',0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }
function skyg(g,W,gy,a,b){ const l=g.createLinearGradient(0,0,0,gy); l.addColorStop(0,a); l.addColorStop(1,b); g.fillStyle=l; g.fillRect(0,0,W,gy); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-10*Math.cos(a-.45),y1-10*Math.sin(a-.45)); g.lineTo(x1-10*Math.cos(a+.45),y1-10*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }
function hills(g,W,gy,col,a,f,ph){ g.fillStyle=col; g.beginPath(); g.moveTo(0,gy); for(let x=0;x<=W;x+=10) g.lineTo(x,gy-a*(.6+.4*Math.sin(x*f+ph))); g.lineTo(W,gy); g.fill(); }

/* ======== FRONTS ======== */
const FR={W:640,H:430,cyc:28,
 draw(g,t){ const W=640,H=430,gy=330,hx=500,LW=230,LH=120,CS=70, tc=(t+3)%28, xw=-60+40*tc, xc=xw-260;
  const z=hx>xw+LW?0: hx>xw+LW*.62?1: hx>xw?2: hx>xc?3: hx>xc-CS?4:5;
  const dark=z===0?0:z===1?.2:z===2?.5:z===3?.1:z===4?.7:.25;
  skyg(g,W,gy,rgb(mixc([60,130,210],[70,86,108],dark)),rgb(mixc([200,226,244],[150,160,172],dark)));
  hills(g,W,gy,'#93a9b8',28,.011,1);
  // air froid (devant le front chaud)
  const cold='rgba(110,160,230,.38)', warm='rgba(255,170,90,.22)';
  g.fillStyle=warm; g.fillRect(0,0,W,gy);
  g.fillStyle=cold; g.beginPath(); g.moveTo(xw,gy); g.lineTo(W+80,gy); g.lineTo(W+80,gy-LH); g.lineTo(xw+LW,gy-LH); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(-80,gy); g.lineTo(xc,gy); g.lineTo(xc-CS,gy-LH); g.lineTo(-80,gy-LH); g.closePath(); g.fill();
  g.strokeStyle='rgba(30,60,120,.7)'; g.lineWidth=2; g.beginPath(); g.moveTo(xw,gy); g.lineTo(xw+LW,gy-LH); g.stroke(); g.beginPath(); g.moveTo(xc,gy); g.lineTo(xc-CS,gy-LH); g.stroke();
  // sol
  const gl=g.createLinearGradient(0,gy,0,H); gl.addColorStop(0,'#6fae56'); gl.addColorStop(1,'#417d39'); g.fillStyle=gl; g.fillRect(0,gy,W,H-gy);
  // nuages du front chaud : cirrus, altostratus, nimbostratus
  for(let i=0;i<10;i++){ const x=xw+LW*.9+i*14+Math.sin(i)*6, y=gy-LH-30-i*3; g.strokeStyle='rgba(255,255,255,.85)'; g.lineWidth=2; g.beginPath(); g.moveTo(x,y); g.quadraticCurveTo(x+26,y-6,x+46,y+3); g.stroke(); }
  for(let i=0;i<12;i++){ const u=i/11, x=xw+LW*(.3+.6*u); const ys=gy-LH*(x-xw)/LW; puff(g,x,ys-14-8*u,20+8*(1-u),.45); }
  for(let i=0;i<16;i++){ const u=i/15, x=xw+10+LW*.62*u; const ys=gy-LH*(x-xw)/LW; puff(g,x,ys-12-4*Math.sin(i),19+6*(1-u),.7); }
  // pluie du front chaud
  g.strokeStyle='rgba(60,100,150,.7)'; g.lineWidth=1.3; for(let i=0;i<46;i++){ const x=xw+8+i*(LW*.6/46), ys=gy-LH*(x-xw)/LW+4, y=ys+((t*160+i*37)%(gy-ys)); g.beginPath(); g.moveTo(x,y); g.lineTo(x-2,y+9); g.stroke(); }
  // cumulonimbus du front froid
  for(let i=0;i<46;i++){ const u=i/45, y=gy-16-u*(LH+120), x=xc-CS*u*.3+Math.sin(i*2.1)*22, r=26+9*Math.sin(i*1.7)+u*8; puff(g,x,y,r,.62-u*.25); } for(let i=0;i<14;i++){ puff(g,xc-CS*.3+10+i*9,gy-LH-118+Math.sin(i)*4,16+Math.sin(i*2)*3,.3); }
  g.strokeStyle='rgba(40,70,130,.75)'; for(let i=0;i<34;i++){ const x=xc-12+i*2.4, y=gy-70+((t*180+i*53)%70); g.beginPath(); g.moveTo(x,y); g.lineTo(x-2,y+9); g.stroke(); }
  // symboles de front sur le sol
  g.fillStyle='#c0262d'; for(let k=0;k<4;k++){ g.beginPath(); g.arc(xw+14+k*28,gy,9,Math.PI,0); g.fill(); } g.fillStyle='#1d4ed8'; for(let k=0;k<4;k++){ g.beginPath(); g.moveTo(xc-4-k*26-9,gy); g.lineTo(xc-4-k*26+9,gy); g.lineTo(xc-4-k*26,gy-12); g.closePath(); g.fill(); }
  // flèches de mouvement
  arrow(g,xw+LW+10,gy-LH-60,xw+LW+60,gy-LH-60,'rgba(194,65,12,.9)',3); arrow(g,xc-CS-10,gy-LH-80,xc-CS+40,gy-LH-80,'#1d4ed8',3);
  T(g,'FRONT CHAUD',xw+LW*.4,gy+22,{s:13,w:'800',a:'center',c:'#7a1313'}); T(g,'FRONT FROID',xc-24,gy+22,{s:13,w:'800',a:'center',c:'#12307c'});
  T(g,'AIR FROID',W-80,gy-12,{s:12,w:'800',a:'center',c:'#14398a'}); T(g,'AIR CHAUD (secteur chaud)',(xw+xc)/2-30,gy-LH-20,{s:12,w:'800',a:'center',c:'#9a3412'}); T(g,'AIR FROID',-0+60,gy-12,{s:12,w:'800',a:'center',c:'#14398a'});
  // observateur
  g.fillStyle='#8a5a3c'; g.fillRect(hx-18,gy-26,36,26); g.fillStyle='#b4452f'; g.beginPath(); g.moveTo(hx-23,gy-26); g.lineTo(hx,gy-46); g.lineTo(hx+23,gy-26); g.fill(); g.fillStyle='#ffe9a6'; g.fillRect(hx-5,gy-18,10,10);
  T(g,'Toi',hx,gy-52,{s:13,w:'800',a:'center'});
  const msgs=['Ciel clair, puis cirrus : l’air chaud arrive en altitude.','Le ciel se couvre, plafond de plus en plus bas.','Pluie continue, plafond bas, visibilité réduite (front chaud).','Secteur chaud : plus doux, éclaircies, brume possible.','Front froid : averses, orages, rafales, la température chute.','Traîne : ciel variable, éclaircies et petites averses.'];
  const temp=z<=2?8:z===3?18:8; g.fillStyle='rgba(255,255,255,.9)'; rr(g,12,12,150,50,8); g.fill(); T(g,'Température chez toi',20,30,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,temp+' °C',20,52,{s:20,w:'800',sh:0,c:temp>=18?'#c2410c':'#1d4ed8'});
  bar(g,W,H,msgs[z]);
 }};
F['fronts']={cap:'<b>Une perturbation vue de côté, qui passe au-dessus de toi.</b> Le <b>front chaud</b> est une rampe douce : l’air chaud monte lentement sur l’air froid, le ciel se dégrade pendant des heures. Le <b>front froid</b> est un mur : l’air froid pousse sous l’air chaud, tout arrive d’un coup. Entre les deux : le secteur chaud.',svg:'',canvas:FR,alt:'Animation d’un front chaud puis d’un front froid qui passent au-dessus d’une maison'};

/* ======== STABILITÉ ======== */
const ST={W:640,H:420,cyc:12,
 panel(g,x0,stable,tc){ const gy=330,pw=320, m2y=h=>gy-h*.165; const env=h=>stable?20-.5*h/100:20-1.5*h/100;
  g.save(); g.beginPath(); g.rect(x0,0,pw,420); g.clip(); skyg(g,640,gy,stable?'#8fa6b8':'#2f78cf',stable?'#d6dde3':'#cfe8f7');
  const gl=g.createLinearGradient(0,gy,0,420); gl.addColorStop(0,'#6fae56'); gl.addColorStop(1,'#417d39'); g.fillStyle=gl; g.fillRect(x0,gy,pw,90);
  // thermomètre ambiant
  g.strokeStyle='rgba(20,40,60,.5)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(x0+30,gy); g.lineTo(x0+30,m2y(1500)); g.stroke(); for(const h of [0,500,1000,1500]){ g.beginPath(); g.moveTo(x0+24,m2y(h)); g.lineTo(x0+36,m2y(h)); g.stroke(); T(g,h+' m',x0+42,m2y(h)+4,{s:11}); }
  // nuages selon la stabilité
  if(stable){ for(let i=0;i<9;i++) puff(g,x0+60+i*26+Math.sin(tc*.3+i)*3,m2y(1150)+Math.sin(i*2)*5,24,.45); T(g,'Nuages en nappes (stratus)',x0+190,m2y(1150)+40,{s:12,w:'700',a:'center',c:'#3b4a58'}); g.fillStyle='rgba(180,190,200,.35)'; g.fillRect(x0,gy-70,pw,70); T(g,'brume, visibilité réduite',x0+190,gy-30,{s:12,w:'700',a:'center',c:'#3b4a58'}); }
  else { const gr=ss(5,11,tc); for(let i=0;i<14;i++){ const u=i/13; puff(g,x0+255+Math.sin(i*2.3)*24,m2y(800)-u*gr*105+Math.sin(i)*8,(16+Math.sin(i*1.9)*8+u*14)*(.4+.6*gr),.1+.3*u*gr); } T(g,'Nuage gonflé (cumulus)',x0+255,m2y(800)-gr*118-16,{s:12,w:'700',a:'center',c:'#0e3b66'}); }
  // bulle
  let h; if(stable){ const k=tc<2?ss(0,2,tc):1-ss(2,6,tc); h=k*620*(tc<6?1:0)*(tc<2?1:Math.max(0,1-ss(2,6,tc))*1)+ (tc<2?0:0); h=tc<2?ss(0,2,tc)*620:620*(1-ss(2,7,tc)); if(tc>7) h=0; } else { h=tc<9?ss(0,9,tc)*1250:1250; if(tc>=9) h=1250; }
  const y=m2y(h), bT=20-h/100, eT=env(h), warmer=bT>eT+.05; const cx=x0+110, r=17+h/90;
  const col=mixc([255,150,70],[120,170,235],clamp(h/1300,0,1)); const gr=g.createRadialGradient(cx-r*.3,y-r*.3,2,cx,y,r*1.1); gr.addColorStop(0,'rgba('+col+',.8)'); gr.addColorStop(1,'rgba('+col+',.2)'); g.fillStyle=gr; g.beginPath(); g.arc(cx,y,r,0,7); g.fill(); g.strokeStyle='rgb('+col+')'; g.lineWidth=2; g.stroke();
  if(stable){ if(tc<2) arrow(g,cx,y+r+30,cx,y+r+4,'#555',4); else if(h>10) arrow(g,cx,y-r-26,cx,y-r-4,'#1d4ed8',4); } else { arrow(g,cx,y-r-26,cx,y-r-4,'#c2410c',4); }
  // comparaison des températures
  g.fillStyle='rgba(255,255,255,.92)'; rr(g,x0+138,y-30,112,52,8); g.fill(); T(g,'bulle : '+bT.toFixed(0)+' °C',x0+146,y-12,{s:13,w:'800',sh:0,c:warmer?'#c2410c':'#1d4ed8'}); T(g,'air autour : '+eT.toFixed(0)+' °C',x0+146,y+8,{s:13,w:'700',sh:0,c:'#334155'});
  T(g,stable?'AIR STABLE':'AIR INSTABLE',x0+pw/2,26,{s:18,w:'800',a:'center',c:stable?'#334155':'#0e3b66'});
  if(h>20){ const msg=warmer?'bulle plus chaude : elle continue de monter':'bulle plus froide : elle redescend'; g.fillStyle='rgba(255,255,255,.88)'; rr(g,x0+20,38,pw-40,22,8); g.fill(); T(g,msg,x0+pw/2,54,{s:13,w:'800',a:'center',c:warmer?'#9a3412':'#1d4ed8',sh:0}); }
  g.restore(); },
 draw(g,t){ const tc=t%12; this.panel(g,0,true,tc); this.panel(g,320,false,tc); g.fillStyle='rgba(255,255,255,.8)'; g.fillRect(319,0,2,420); bar(g,640,420,'Air stable : on repousse la bulle, elle revient. Air instable : elle s’échappe vers le haut.'); }};
function t0(tc){ return tc; }
F['stability']={cap:'<b>Stable ou instable ?</b> On compare la température de la bulle qui monte (elle se refroidit d’environ 1 °C par 100 m) à celle de l’air qui l’entoure. <b>Plus froide</b> : elle est plus lourde et redescend (stable : nuages plats, brume). <b>Plus chaude</b> : elle est plus légère et continue de monter (instable : gros nuages, averses, turbulence).',svg:'',canvas:ST,alt:'Animation comparant une bulle d’air dans une atmosphère stable et instable'};

/* ======== DÉCROCHAGE ======== */
const SL={W:640,H:420,cyc:16,
 cz(a){ return a<15?.15+.095*a:1.575-.13*(a-15)-.012*(a-15)*(a-15); },
 draw(g,t){ const W=640,H=420,tc=t%16; const al=tc<7?2+17*ss(0,7,tc):tc<9.5?19:19-14*ss(9.5,13,tc); const stalled=al>15.3;
  skyg(g,W,H,'#dcecf7','#f6fafd'); g.fillStyle='#eef4f9'; g.fillRect(0,0,W,H);
  const cx=175,cy=200,c=200, a=al*Math.PI/180;
  const xt=u=>{ return .12*5*(.2969*Math.sqrt(u)-.126*u-.3516*u*u+.2843*u*u*u-.1015*u*u*u*u); };
  const prof=[]; for(let i=0;i<=40;i++){ const u=(1-Math.cos(i/40*Math.PI))/2; prof.push([u,xt(u)*.95]); }
  const cam=u=>.04*Math.sin(Math.PI*u)*1; // cambrure
              // rotation anti-horaire visuelle de angle a : x' = x cos a + y sin a ; y' = -x sin a + y cos a  (y écran vers le bas)
  const pl=(u,yy)=>{ const lx=(u-.25)*c, ly=-yy*c; return [cx+lx*Math.cos(a)-ly*Math.sin(a), cy+lx*Math.sin(a)+ly*Math.cos(a)]; };
  const up=[],lo=[]; for(const [u,y] of prof){ up.push(pl(u,y*1+cam(u))); lo.push(pl(u,-y*.7+cam(u)*.5)); }
  // hauteur de surface en coordonnées monde
  function surf(x){ let hu=1e9,hl=-1e9; for(let i=0;i<up.length-1;i++){ for(const [A,Bq,isU] of [[up[i],up[i+1],1],[lo[i],lo[i+1],0]]){ if((x>=A[0]&&x<=Bq[0])||(x>=Bq[0]&&x<=A[0])){ const s=(x-A[0])/((Bq[0]-A[0])||1e-6), yy=A[1]+s*(Bq[1]-A[1]); if(isU) hu=Math.min(hu,yy); else hl=Math.max(hl,yy); } } } return [hu,hl]; }
  const lead=pl(0,0), trail=pl(1,0);
  // courants d’air (lignes de courant) + particules
  const NL=13, gap=26, sepX=lead[0]+(trail[0]-lead[0])*.32;
  const lines=[]; for(let k=0;k<NL;k++){ const y0=cy+(k-(NL-1)/2)*gap, pts=[]; for(let x=-40;x<=W+40;x+=6){ let y=y0; const [hu,hl]=surf(x); if(y0<cy){ if(hu<1e8){ const clearance=(cy-y0)*.16+4; const lim=hu-clearance*(1+.9*Math.exp(-Math.pow((x-lead[0])/90,2))); if(!(stalled&&x>sepX)) y=Math.min(y,lim); } } else { if(hl>-1e8) y=Math.max(y,hl+((y0-cy)*.16+4)); }
      // déflexion vers le bas après l’aile
      if(x>trail[0]) y+= (x-trail[0])*.06*Math.min(1,(al/10))*(stalled?0.3:1); pts.push([x,y]); }
   // lissage
   const sm=pts.map((p,i)=>{ let sy=0,n=0; for(let j=-8;j<=8;j++){ const q=pts[clamp(i+j,0,pts.length-1)]; sy+=q[1]; n++; } return [p[0],sy/n]; });
   if(stalled&&y0<cy){ for(let i=0;i<sm.length;i++){ const x=sm[i][0]; if(x>sepX){ const d=(x-sepX); sm[i][1]+=Math.sin(x*.07+t*7+k)*Math.min(26,d*.12)*(.4+k*.04)+Math.min(30,d*.18)*(.5+.1*k); } } }
   lines.push({y0,sm}); }
  g.strokeStyle='rgba(60,110,170,.35)'; g.lineWidth=1.5; for(const L of lines){ g.beginPath(); L.sm.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); }
  // particules
  for(const L of lines){ const n=L.sm.length; for(let j=0;j<14;j++){ const s=((t*.16*(L.y0<cy?1.35:1)+j/14+L.y0*.003)%1); const idx=Math.floor(s*(n-1)); const p=L.sm[idx]; const turb=stalled&&L.y0<cy&&p[0]>sepX; g.fillStyle=turb?'rgba(200,60,40,.9)':'rgba(30,90,170,.95)'; g.beginPath(); g.arc(p[0],p[1],turb?3.2:2.6,0,7); g.fill(); } }
  // tourbillons dans le sillage décollé
  if(stalled){ for(let k=0;k<3;k++){ const ex=sepX+70+k*60, ey=surf(sepX+20)[0]-8-k*4+(trail[1]-lead[1])*.1; g.strokeStyle='rgba(200,60,40,.55)'; g.lineWidth=2; g.beginPath(); for(let q=0;q<26;q++){ const aa=q*.5+t*5*(k%2?1:-1), rrr=2+q*.8; g.lineTo(ex+Math.cos(aa)*rrr,ey+Math.sin(aa)*rrr*.8); } g.stroke(); } }
  // aile
  const gr=g.createLinearGradient(0,cy-60,0,cy+30); gr.addColorStop(0,'#f2f5f8'); gr.addColorStop(1,'#9ca9b6'); g.fillStyle=gr; g.strokeStyle='#27333f'; g.lineWidth=2; g.beginPath(); up.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); for(let i=lo.length-1;i>=0;i--) g.lineTo(lo[i][0],lo[i][1]); g.closePath(); g.fill(); g.stroke();
  // vent relatif et angle d’incidence
  arrow(g,20,cy-46,80,cy-46,'#1d4ed8',4); T(g,'vent relatif',20,cy-56,{s:12,w:'700',c:'#1d4ed8'});
  g.setLineDash([5,4]); g.strokeStyle='#555'; g.lineWidth=1.5; g.beginPath(); g.moveTo(lead[0]-60,lead[1]); g.lineTo(lead[0]+(trail[0]-lead[0])*.4,lead[1]); g.stroke(); g.setLineDash([]); g.strokeStyle='#c2410c'; g.lineWidth=2.5; g.beginPath(); g.arc(lead[0],lead[1],62,0,a); g.stroke();
  T(g,'incidence '+al.toFixed(0)+'°',lead[0]+30,lead[1]+96,{s:14,w:'800',a:'center',c:'#9a3412'});
  // graphique Cz(incidence)
  const gx=420,gyb=300,gw=190,gh=170; g.fillStyle='rgba(255,255,255,.96)'; rr(g,gx-34,gyb-gh-26,gw+50,gh+60,10); g.fill(); g.strokeStyle='rgba(30,40,50,.25)'; g.stroke();
  g.strokeStyle='#233'; g.lineWidth=1.5; g.beginPath(); g.moveTo(gx,gyb-gh); g.lineTo(gx,gyb); g.lineTo(gx+gw,gyb); g.stroke(); T(g,'portance (Cz)',gx-26,gyb-gh-8,{s:11,w:'700',sh:0}); T(g,'incidence →',gx+gw-4,gyb+16,{s:11,w:'700',a:'right',sh:0});
  g.strokeStyle='#1d4ed8'; g.lineWidth=2.5; g.beginPath(); for(let q=0;q<=20;q+=.5){ const X=gx+q/20*gw, Y=gyb-SL.cz(q)/1.7*gh; q?g.lineTo(X,Y):g.moveTo(X,Y); } g.stroke();
  const dx=gx+al/20*gw, dy=gyb-SL.cz(al)/1.7*gh; g.fillStyle=stalled?'#dc2626':'#16a34a'; g.beginPath(); g.arc(dx,dy,7,0,7); g.fill(); g.setLineDash([3,3]); g.strokeStyle='rgba(15,40,70,.5)'; g.beginPath(); g.moveTo(gx+15/20*gw,gyb); g.lineTo(gx+15/20*gw,gyb-SL.cz(15)/1.7*gh); g.stroke(); g.setLineDash([]); T(g,'incidence critique ≈ 15°',gx+15/20*gw,gyb+30,{s:11,w:'700',a:'center',c:'#9a3412',sh:0});
  const msg=stalled?'DÉCROCHAGE : l’air se décolle, la portance s’effondre. Baisse le nez !':al>12?'Attention : proche de l’incidence critique…':'L’air suit bien l’aile : plus on incline, plus elle porte.'; 
  if(stalled){ g.fillStyle='rgba(220,38,38,.92)'; rr(g,gx-30,24,gw+44,34,8); g.fill(); T(g,'DÉCROCHAGE',gx+gw/2-8,48,{s:20,w:'800',a:'center',c:'#fff',sh:0}); }
  bar(g,W,H,msg);
 }};
F['stall']={cap:'<b>Le décrochage.</b> Quand on augmente l’incidence, la portance augmente… jusqu’à l’<b>incidence critique</b> (environ 15°). Au-delà, l’air ne suit plus le dessus de l’aile : il se décolle et tourbillonne (points rouges), la portance chute. Ce n’est pas une question de vitesse mais d’angle.',svg:'',canvas:SL,alt:'Animation : écoulement de l’air autour d’une aile dont l’incidence augmente jusqu’au décrochage, avec la courbe de portance'};

/* ======== QUATRE FORCES ======== */
const FO={W:640,H:400,cyc:24,
 draw(g,t){ const W=640,H=400,gy=330,tc=t%24, sc=Math.floor(tc/6), u=(tc%6)/6;
  const S=[
   {n:'Palier : vol horizontal à vitesse constante',rot:0,L:1,P:1,Th:1,D:1,msg:'Portance = poids  et  traction = traînée : rien ne change, l’avion vole droit.',thr:.6,spd:1},
   {n:'Plein gaz : l’avion accélère',rot:0,L:1,P:1,Th:1.6,D:1,msg:'Traction > traînée : l’avion accélère (puis la traînée augmente jusqu’à l’équilibre).',thr:1,spd:1.6},
   {n:'Montée',rot:-.2,L:1,P:1,Th:1.5,D:1,msg:'Pour monter, la traction doit vaincre la traînée ET la part du poids qui retient l’avion.',thr:1,spd:1.2,wc:1},
   {n:'Moteur coupé : vol plané',rot:.1,L:1,P:1,Th:0,D:.8,msg:'Sans traction, une part du poids tire l’avion vers l’avant : il descend en planant.',thr:0,spd:.8,gl:1}][sc];
  const gs=t*S.spd*60;
  skyg(g,W,gy,'#2d78cf','#cfe8f7'); hills(g,W,gy,'#9cb9c9',30,.012,1); const gl=g.createLinearGradient(0,gy,0,H); gl.addColorStop(0,'#6fae56'); gl.addColorStop(1,'#417d39'); g.fillStyle=gl; g.fillRect(0,gy,W,H-gy); g.fillStyle='rgba(255,255,255,.25)'; for(let i=0;i<10;i++){ const x=((i*130-gs*1.5)%820+820)%820-90; g.fillRect(x,gy+30+(i%3)*18,40,3); }
  for(let i=0;i<4;i++){ const x=((i*230-gs*.35)%900+900)%900-120; G.cloud(g,x,70+(i%2)*60,1.1,.9); }
  const px=300, py=gy-140+(sc===2?-18*Math.sin(u*Math.PI):sc===3?14*u:0);
  G.plane(g,px,py,1.35,S.rot,{prop:t*40,thr:S.thr,flaps:0});
  const Lf=70*S.L, Pf=70*S.P, Tf=70*S.Th, Df=70*S.D;
  // flèches centrées sur le centre de gravité
  const c0=[px,py+4];
  arrow(g,c0[0],c0[1],c0[0],c0[1]-Lf,'#16a34a',5); T(g,'Portance',c0[0]+8,c0[1]-Lf-4,{s:14,w:'800',c:'#15803d'});
  arrow(g,c0[0],c0[1],c0[0],c0[1]+Pf,'#2563eb',5); T(g,'Poids',c0[0]+8,c0[1]+Pf+16,{s:14,w:'800',c:'#1d4ed8'});
  if(Tf>1){ arrow(g,c0[0],c0[1]-7,c0[0]+Tf,c0[1]-7,'#f59e0b',5); T(g,'Traction',c0[0]+Tf-8,c0[1]-18,{s:14,w:'800',a:'center',c:'#b45309'}); }
  arrow(g,c0[0],c0[1]+7,c0[0]-Df,c0[1]+7,'#ef4444',5); T(g,'Traînée',c0[0]-Df+4,c0[1]+26,{s:14,w:'800',a:'right',c:'#b91c1c'});
  if(S.wc){ g.setLineDash([4,3]); arrow(g,c0[0]+30,c0[1]+30,c0[0]+8,c0[1]+36,'rgba(37,99,235,.85)',3); g.setLineDash([]); T(g,'une part du poids',c0[0]+40,c0[1]+50,{s:12,w:'700',c:'#1d4ed8'}); }
  if(S.gl){ arrow(g,c0[0]+8,c0[1]+30,c0[0]+50,c0[1]+36,'rgba(37,99,235,.85)',3); T(g,'part du poids vers l’avant',c0[0]+54,c0[1]+50,{s:12,w:'700',c:'#1d4ed8'}); }
  g.fillStyle='rgba(255,255,255,.92)'; rr(g,12,12,W-24,34,8); g.fill(); T(g,(sc+1)+' · '+S.n,W/2,36,{s:17,w:'800',a:'center',sh:0});
  bar(g,W,H,S.msg);
 }};
F['forces']={cap:'<b>Les quatre forces.</b> Poids (vers le bas), portance (vers le haut), traction (vers l’avant) et traînée (vers l’arrière) s’appliquent au centre de gravité. Toute manœuvre du pilote revient à les équilibrer ou à les déséquilibrer exprès.',svg:'',canvas:FO,alt:'Animation des quatre forces en palier, en accélération, en montée et en vol plané'};
})();
