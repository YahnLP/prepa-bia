(function(){ const B=window.BIA, F=B.figs;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); }, mixc=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t)), rgb=c=>'rgb('+c[0]+','+c[1]+','+c[2]+')';
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function bar(g,W,H,msg){ g.fillStyle='rgba(18,32,47,.9)'; g.fillRect(0,H-28,W,28); T(g,msg,W/2,H-9,{s:14,w:'600',a:'center',c:'#fff',sh:0}); }
function skyg(g,W,gy,a,b){ const l=g.createLinearGradient(0,0,0,gy); l.addColorStop(0,a); l.addColorStop(1,b); g.fillStyle=l; g.fillRect(0,0,W,gy); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-10*Math.cos(a-.45),y1-10*Math.sin(a-.45)); g.lineTo(x1-10*Math.cos(a+.45),y1-10*Math.sin(a+.45)); g.closePath(); g.fill(); }
function rr(g,x,y,w,h,r){ g.beginPath(); if(g.roundRect) g.roundRect(x,y,w,h,r); else g.rect(x,y,w,h); }
function puff(g,x,y,r,dark){ const c0=mixc([255,255,255],[96,108,124],dark), c1=mixc([206,216,228],[58,66,80],dark); const gr=g.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r); gr.addColorStop(0,rgb(c0)); gr.addColorStop(.7,rgb(c1)); gr.addColorStop(1,'rgba('+c1[0]+','+c1[1]+','+c1[2]+',0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }

/* ======== Anticyclone / dépression ======== */
const HL={W:640,H:430,cyc:14,
 panel(g,x0,hi,t){ const pw=320,cx=x0+160,cy=125; g.save(); g.beginPath(); g.rect(x0,0,pw,430); g.clip();
  g.fillStyle=hi?'#e6f2fb':'#e3e6ee'; g.fillRect(x0,0,pw,430);
  const gr=g.createRadialGradient(cx,cy,5,cx,cy,110); gr.addColorStop(0,hi?'rgba(255,170,90,.55)':'rgba(90,120,220,.5)'); gr.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=gr; g.fillRect(x0,0,pw,260);
  const vals=hi?[1030,1025,1020,1015]:[995,1000,1005,1010]; [30,58,86,112].forEach((r,i)=>{ g.strokeStyle='rgba(30,50,80,.45)'; g.lineWidth=1.6; g.beginPath(); g.arc(cx,cy,r,0,7); g.stroke(); T(g,String(vals[i]),cx+r*.72+2,cy-r*.72,{s:10,w:'700',sh:0,c:'#334155'}); });
  T(g,hi?'A':'D',cx,cy+14,{s:44,w:'800',a:'center',c:hi?'#c2410c':'#1d4ed8'});
  // particules de vent (sens horaire autour de A, anti-horaire autour de D)
  const N=36; for(let i=0;i<N;i++){ const s=((t*.09+i/N)%1), rmin=36,rmax=116; const r=hi?rmin+(rmax-rmin)*s:rmax-(rmax-rmin)*s; const th0=i*2.399, sp=hi?1:-1; const th=th0+sp*(t*.35+s*2.4); const px=cx+Math.cos(th)*r, py=cy+Math.sin(th)*r; const al=Math.sin(s*Math.PI); for(let k=0;k<5;k++){ const thk=th-sp*k*.07, rk=hi?r-k*1.4:r+k*1.4; g.fillStyle='rgba(20,90,170,'+(al*(.8-k*.15))+')'; g.beginPath(); g.arc(cx+Math.cos(thk)*rk,cy+Math.sin(thk)*rk,2.8-k*.4,0,7); g.fill(); } }
  T(g,hi?'ANTICYCLONE (haute pression)':'DÉPRESSION (basse pression)',x0+160,22,{s:15,w:'800',a:'center',c:hi?'#9a3412':'#1e3a8a'});
  T(g,hi?'vent : sens des aiguilles d’une montre':'vent : sens inverse des aiguilles',x0+160,262,{s:12,w:'700',a:'center',c:'#334155'});
  // coupe verticale
  const gy=372, sy=272; g.save(); g.beginPath(); g.rect(x0,sy,pw,gy-sy); g.clip(); { const l=g.createLinearGradient(0,sy,0,gy); l.addColorStop(0,hi?'#5fa6e6':'#7f8ea0'); l.addColorStop(1,hi?'#d3ebfa':'#c4cbd4'); g.fillStyle=l; g.fillRect(x0,sy,pw,gy-sy); } g.fillStyle=hi?'#fff3b0':'#c9d0d9'; g.beginPath(); g.arc(x0+40,sy+28,hi?16:0,0,7); g.fill();
  if(!hi){ for(let i=0;i<10;i++) puff(g,x0+70+i*21,sy+36+Math.sin(i)*6,26,.5); g.strokeStyle='rgba(60,100,150,.7)'; g.lineWidth=1.2; for(let i=0;i<30;i++){ const x=x0+70+i*7,y=sy+56+((t*120+i*29)%(gy-sy-60)); g.beginPath(); g.moveTo(x,y); g.lineTo(x-2,y+8); g.stroke(); } }
  for(let k=0;k<3;k++){ const x=x0+90+k*70, ph=((t*30+k*40)%90); if(hi) arrow(g,x,sy+24+ph*.5,x,sy+50+ph*.5,'#c2410c',3); else arrow(g,x,gy-8-ph*.6,x,gy-34-ph*.6,'#1d4ed8',3); }
  g.fillStyle='#5aa245'; g.fillRect(x0,gy-14,pw,14); g.restore();
  T(g,hi?'l’air descend et se réchauffe : les nuages disparaissent':'l’air monte et se refroidit : nuages et pluie',x0+160,gy+16,{s:12,w:'700',a:'center',c:'#12202f'});
  g.restore(); },
 draw(g,t){ const tt=t; this.panel(g,0,true,tt); this.panel(g,320,false,tt); g.fillStyle='#fff'; g.fillRect(319,0,2,430); bar(g,640,430,'Astuce : D comme Dégradation du temps, A comme Agréable.'); }};
F['highlow']={cap:'<b>Anticyclone et dépression.</b> Dans l’hémisphère nord, le vent tourne dans le sens des aiguilles d’une montre autour d’un anticyclone (A, haute pression) et dans le sens inverse autour d’une dépression (D, basse pression). Anticyclone : l’air descend, le ciel se dégage. Dépression : l’air monte, les nuages se forment.',svg:'',canvas:HL,alt:'Animation du vent autour d’un anticyclone et d’une dépression, avec coupe verticale'};

/* ======== Archimède / montgolfière ======== */
const AR={W:640,H:430,cyc:22,
 draw(g,t){ const W=640,H=430,gy=370,tc=t%22; const burn=ss(2.5,3.5,tc)*(1-ss(10,11,tc)); const k=ss(3,9,tc)*(tc<11?1:1-ss(11,19,tc)); const heat=.35+.45*k; const alt=.2+.8*k;
  skyg(g,W,gy,'#2d78cf','#cfe8f7'); const gl=g.createLinearGradient(0,gy,0,H); gl.addColorStop(0,'#6fae56'); gl.addColorStop(1,'#417d39'); g.fillStyle=gl; g.fillRect(0,gy,W,H-gy);
  for(let i=0;i<3;i++){ const x=((i*260-t*8)%900+900)%900-120; puff(g,x,70+i*40,34,.0); puff(g,x+30,76+i*40,26,0); puff(g,x-28,80+i*40,24,0); }
  const bx=190, by=gy-125-alt*115, R=58; const Tin=20+heat*80;
  // enveloppe
  const env=g.createRadialGradient(bx-R*.3,by-R*.35,6,bx,by,R*1.2); env.addColorStop(0,rgb(mixc([255,120,90],[255,200,60],heat))); env.addColorStop(1,'#c93f1c'); g.fillStyle=env; g.beginPath(); g.ellipse(bx,by,R,R*1.15,0,0,7); g.fill(); g.strokeStyle='rgba(0,0,0,.25)'; g.lineWidth=1.5; g.stroke();
  g.fillStyle='rgba(255,255,255,.35)'; for(let k=-2;k<=2;k++){ g.beginPath(); g.ellipse(bx+k*14,by,6,R*1.12,0,0,7); g.fill(); }
  g.strokeStyle='#4a3a2a'; g.lineWidth=1.6; for(const s of [-1,1]){ g.beginPath(); g.moveTo(bx+s*30,by+R*1.02); g.lineTo(bx+s*12,by+R*1.55); g.stroke(); } g.fillStyle='#8a5a3c'; g.fillRect(bx-16,by+R*1.55,32,22); g.fillStyle='#6b4527'; g.fillRect(bx-16,by+R*1.55,32,4);
  if(burn>.01){ for(let k=0;k<3;k++){ const fl=g.createRadialGradient(bx,by+R*1.1-k*5,1,bx,by+R*1.1-k*5-8,14*burn); fl.addColorStop(0,'rgba(255,240,150,.95)'); fl.addColorStop(1,'rgba(255,100,20,0)'); g.fillStyle=fl; g.beginPath(); g.ellipse(bx+Math.sin(t*20+k)*2,by+R*1.04-10*burn,7*burn,15*burn,0,0,7); g.fill(); } }
  // molécules : peu et rapides si chaud ; nombreuses autour
  const nIn=Math.round(26-heat*14); for(let i=0;i<nIn;i++){ const a=i*2.399+t*(1+heat*3), r=(((i*37)%100)/100)*R*.8; g.fillStyle='rgba(255,255,255,.9)'; g.beginPath(); g.arc(bx+Math.cos(a)*r*.9,by+Math.sin(a*1.3)*r,2.4,0,7); g.fill(); }
  for(let i=0;i<46;i++){ const px=(i*97)%460+10, py=((i*61)%320)+30; const ox=px-bx, oy=py-by; if((ox*ox)/(R*R*1.5)+(oy*oy)/(R*R*2)<1.2||(py>gy-6)) continue; g.fillStyle='rgba(30,60,110,.75)'; g.beginPath(); g.arc(px+Math.sin(t*1.5+i)*2,py+Math.cos(t*1.3+i)*2,2.2,0,7); g.fill(); }
  // forces
  const net=(tc<3?0:tc<11?Math.min(1,k*1.8):(tc<19?-Math.min(1,(1-k)*1.2+.15):0)), Pf=60, Af=Pf+net*38;
  const cy0=by+R*.1; arrow(g,bx+R+22,cy0,bx+R+22,cy0-Af,'#16a34a',5); T(g,'Poussée',bx+R+30,cy0-Af-4,{s:13,w:'800',c:'#15803d'}); arrow(g,bx+R+22,cy0,bx+R+22,cy0+Pf,'#2563eb',5); T(g,'Poids',bx+R+30,cy0+Pf+16,{s:13,w:'800',c:'#1d4ed8'});
  // balance et textes
  g.fillStyle='rgba(255,255,255,.93)'; rr(g,400,40,222,170,10); g.fill();
  T(g,'Température de l’air du ballon',412,62,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,Math.round(Tin)+' °C',412,86,{s:24,w:'800',sh:0,c:Tin>45?'#c2410c':'#1d4ed8'}); T(g,'(dehors : 20 °C)',512,86,{s:12,w:'600',sh:0,c:'#52606e'});
  T(g,'Plus chaud = moins dense = plus léger',412,108,{s:12,w:'600',sh:0,c:'#334155'});
  const verdict=net>.12?'Poussée > poids : il MONTE':net<-.12?'Poussée < poids : il DESCEND':'Poussée = poids : il FLOTTE'; const vc=net>.12?'#15803d':net<-.12?'#b91c1c':'#334155'; T(g,verdict,412,138,{s:14,w:'800',sh:0,c:vc});
  T(g,'Altitude : '+Math.round(alt*1200)+' m',412,164,{s:13,w:'700',sh:0}); g.fillStyle='#e5ebf1'; g.fillRect(412,174,198,10); g.fillStyle=vc; g.fillRect(412,174,198*alt,10);
  const msg=tc<2.5?'Au départ : le ballon flotte entre deux altitudes.':tc<10?'On allume le brûleur : l’air chauffe, devient moins dense, le ballon monte.':tc<11?'On éteint le brûleur.':'L’air refroidit, la poussée diminue : le ballon redescend.';
  bar(g,W,H,msg); g.fillStyle='#5aa245'; g.fillRect(0,gy,W,4);
 }};
F['archimede']={cap:'<b>Le principe d’Archimède.</b> Un objet plongé dans l’air reçoit une poussée vers le haut égale au poids de l’air qu’il déplace. Si le ballon pèse moins que cet air, il monte. L’air chaud est moins dense que l’air froid : on le chauffe pour que le ballon devienne plus léger.',svg:'',canvas:AR,alt:'Animation d’une montgolfière : le brûleur chauffe l’air, la poussée dépasse le poids et le ballon monte'};

/* ======== Venturi / Bernoulli ======== */
const VE={W:640,H:400,cyc:16,
 draw(g,t){ const W=640,H=400,cy=262,hw=46,hn=19; const Q=1+.45*Math.sin(t*.7);
  g.fillStyle='#f4f8fb'; g.fillRect(0,0,W,H);
  const half=x=>{ if(x<150) return hw; if(x<260) return hw-(hw-hn)*ss(150,260,x); if(x<380) return hn; if(x<490) return hn+(hw-hn)*ss(380,490,x); return hw; };
  g.fillStyle='#dbeaf6'; g.strokeStyle='#27425e'; g.lineWidth=3; g.beginPath(); for(let x=0;x<=W;x+=4) g.lineTo(x,cy-half(x)); for(let x=W;x>=0;x-=4) g.lineTo(x,cy+half(x)); g.closePath(); g.fill(); g.stroke();
  const N=70; for(let i=0;i<N;i++){ const row=((i*37)%100)/100*2-1, base=(i*53)%640; const xx=(base+t*40*Q*(hw/(half((base+t*60)%640)||1)))%640; const h=half(xx), yy=cy+row*(h-5), sp=hw/h; g.fillStyle=sp>1.5?'rgba(220,60,40,.95)':'rgba(30,90,170,.9)'; g.beginPath(); g.arc(xx,yy,sp>1.5?3.2:2.6,0,7); g.fill(); if(sp>1.5){ g.strokeStyle='rgba(220,60,40,.35)'; g.lineWidth=2; g.beginPath(); g.moveTo(xx-10*sp,yy); g.lineTo(xx,yy); g.stroke(); } }
  arrow(g,24,cy,96,cy,'#1d4ed8',5); T(g,'air lent',60,cy+hw+22,{s:14,w:'800',a:'center',c:'#1d4ed8'}); arrow(g,276,cy,366,cy,'#dc2626',6); T(g,'air RAPIDE',320,cy+hw+22,{s:14,w:'800',a:'center',c:'#b91c1c'});
  const TH=120, drop=Math.min(.82,.38*Q*Q); const tubes=[[150,hw,1],[320,hn,1-drop],[540,hw,1]];
  tubes.forEach(([x,h,lv],i)=>{ const top=cy-hw-TH-8; const bot=cy-h; const tall=bot-top; g.fillStyle='rgba(255,255,255,.9)'; g.strokeStyle='#27425e'; g.lineWidth=2; g.fillRect(x-12,top,24,tall); g.strokeRect(x-12,top,24,tall); const hgt=tall*(0.25+.65*lv); g.fillStyle=i===1?'rgba(220,38,38,.85)':'rgba(37,99,235,.85)'; g.fillRect(x-11,bot-hgt,22,hgt); T(g,i===1?'pression BASSE':'pression forte',x,top-8,{s:12,w:'800',a:'center',c:i===1?'#b91c1c':'#1d4ed8'}); });
  const rtop=cy-hw-TH-8, rbot=cy-hw; g.strokeStyle='rgba(40,60,90,.55)'; g.setLineDash([5,4]); g.lineWidth=1.5; const ry=rbot-(rbot-rtop)*0.9; g.beginPath(); g.moveTo(138,ry); g.lineTo(552,ry); g.stroke(); g.setLineDash([]);
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,150,330,340,36,10); g.fill(); T(g,'Débit ×'+Q.toFixed(1)+' : vitesse ×2 → perte de pression ×4 (½ρV²)',320,353,{s:13,w:'800',a:'center',sh:0,c:'#334155'});
  T(g,'Tube de Venturi',320,28,{s:17,w:'800',a:'center'});
  bar(g,W,H,'Là où l’air accélère, la pression statique diminue : c’est le théorème de Bernoulli.');
 }};
F['venturi']={cap:'<b>Bernoulli en image.</b> Dans un passage étroit, l’air va plus vite (les points rouges) et sa pression baisse : dans le tube du milieu, le liquide descend. Plus le débit augmente, plus la baisse de pression est forte. Là où l’air accélère, la pression diminue. C’est la clé de la portance.',svg:'',canvas:VE,alt:'Animation d’un tube de Venturi : l’air accélère dans le rétrécissement et la pression baisse'};

/* ======== Triangle des vitesses ======== */
const WT={W:640,H:430,cyc:24,
 draw(g,t){ const W=640,H=430,tc=t%24, fixed=tc>=12; const TAS=100, V=20, windFrom=270; // vent d’ouest, route voulue nord
  const wca=Math.asin(V/TAS)*180/Math.PI, hdg=fixed?-wca:0; const gsv=fixed?Math.sqrt(TAS*TAS-V*V):Math.sqrt(TAS*TAS+V*V)* 1; // approx GS affichée
  // vecteur sol = air + vent ; vent pousse vers l’est (+x), cap h : air = (sin h, -cos h)*TAS (écran, nord vers le haut)
  const h=hdg*Math.PI/180, ax=Math.sin(h)*TAS, ay=-Math.cos(h)*TAS, wx=V, wy=0, gx=ax+wx, gy2=ay+wy; const track=(Math.atan2(gx,-gy2)*180/Math.PI+360)%360, GS=Math.hypot(gx,gy2);
  // carte (défile)
  g.fillStyle='#8fbf6a'; g.fillRect(0,0,W,H); const spd=GS*.55, off=(t*spd)%80, side=((fixed?0:1)*0); for(let i=-2;i<12;i++){ for(let j=-2;j<8;j++){ const x=i*80+((-t*gx*.55)%80), y=j*80+((off)); g.fillStyle=((i+j)&1)?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)'; g.fillRect(x,y,80,80); } }
  const px=210,py=250;
  // trace
  g.strokeStyle=fixed?'#16a34a':'#dc2626'; g.lineWidth=4; g.setLineDash([2,8]); g.lineCap='round'; g.beginPath(); g.moveTo(px-gx*(.0),py+260*0); g.lineTo(px+gx*2.2,py+gy2*2.2); g.stroke(); g.setLineDash([]);
  // destination
  const dx=210, dy=60; g.fillStyle='#fff'; g.beginPath(); g.arc(dx,dy,18,0,7); g.fill(); g.strokeStyle='#c2410c'; g.lineWidth=3; g.stroke(); T(g,'AÉRODROME',dx+26,dy+5,{s:13,w:'800',c:'#7a2e0e'}); g.setLineDash([6,5]); g.strokeStyle='rgba(255,255,255,.9)'; g.lineWidth=2; g.beginPath(); g.moveTo(px,py); g.lineTo(dx,dy+18); g.stroke(); g.setLineDash([]);
  // avion vue de dessus
  g.save(); g.translate(px,py); g.rotate(h); g.fillStyle='#f5f7fa'; g.strokeStyle='#243447'; g.lineWidth=1.5; g.beginPath(); g.moveTo(0,-30); g.lineTo(5,-8); g.lineTo(38,4); g.lineTo(38,12); g.lineTo(5,8); g.lineTo(4,24); g.lineTo(16,30); g.lineTo(16,35); g.lineTo(0,32); g.lineTo(-16,35); g.lineTo(-16,30); g.lineTo(-4,24); g.lineTo(-5,8); g.lineTo(-38,12); g.lineTo(-38,4); g.lineTo(-5,-8); g.closePath(); g.fill(); g.stroke(); g.fillStyle='#e4572e'; g.fillRect(-38,4,76,3); g.restore();
  // vent
  for(let k=0;k<6;k++){ const y=60+k*58, x=((t*50+k*70)%260)-30; arrow(g,x,y,x+36,y,'rgba(255,255,255,.7)',3); } T(g,'VENT d’ouest (270°) 20 kt',20,H-44,{s:13,w:'800',c:'#0b3a66'});
  // flèches de l’avion : cap (orange), vent (bleu), route (vert)
  arrow(g,px,py,px+ax*.9,py+ay*.9,'#f59e0b',4); arrow(g,px+ax*.9,py+ay*.9,px+ax*.9+wx*.9*1.6,py+ay*.9,'#2563eb',4); arrow(g,px,py,px+(ax+wx*1.6)*.9,py+ay*.9,'#16a34a',4);
  // encart triangle
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,380,16,246,204,10); g.fill(); T(g,fixed?'Avec correction de dérive':'Sans correction',394,40,{s:15,w:'800',sh:0,c:fixed?'#15803d':'#b91c1c'});
  const cx0=470,cy0=178,sc=.9; arrow(g,cx0,cy0,cx0+ax*sc,cy0+ay*sc,'#f59e0b',3); arrow(g,cx0+ax*sc,cy0+ay*sc,cx0+(ax+wx*1.6)*sc,cy0+ay*sc,'#2563eb',3); arrow(g,cx0,cy0,cx0+(ax+wx*1.6)*sc,cy0+ay*sc,'#16a34a',3);
  T(g,'cap',cx0+ax*sc*.5-8,cy0+ay*sc*.5,{s:12,w:'800',a:'right',c:'#b45309',sh:0}); T(g,'vent',cx0+(ax+wx*.8)*sc,cy0+ay*sc-8,{s:12,w:'800',a:'center',c:'#1d4ed8',sh:0}); T(g,'route',cx0+(ax+wx*1.6)*sc*.5+10,cy0+ay*sc*.5,{s:12,w:'800',c:'#15803d',sh:0});
  T(g,'Cap : '+String(Math.round((hdg+360)%360)).padStart(3,'0')+'°',394,208,{s:14,w:'800',sh:0,c:'#b45309'}); T(g,'Route : '+String(Math.round(track)).padStart(3,'0')+'°',500,208,{s:14,w:'800',sh:0,c:'#15803d'}); 
  g.fillStyle='rgba(255,255,255,.95)'; rr(g,380,228,246,52,10); g.fill(); T(g,'Dérive : '+(fixed?'compensée':Math.round(track>180?track-360:track)+'° à droite'),394,250,{s:14,w:'800',sh:0,c:fixed?'#15803d':'#b91c1c'}); T(g,'Vitesse sol : '+Math.round(GS*1.0*(fixed?1:1))+' kt (propre : 100 kt)',394,270,{s:12,w:'700',sh:0,c:'#334155'});
  bar(g,W,H,fixed?'On pointe un peu CONTRE le vent : l’avion suit bien sa route vers l’aérodrome.':'Cap droit vers l’aérodrome : le vent pousse l’avion de côté, il dérive.');
 }};
F['windtri']={cap:'<b>Le triangle des vitesses.</b> Si tu pointes ton nez droit vers ta destination, le vent te pousse de côté. Pour suivre ta route, tu dois pointer un peu <b>contre le vent</b> : c’est la <b>dérive</b>. Les trois flèches forment un triangle : le cap et la vitesse propre (orange), le vent (bleu), et ce que tu fais réellement au-dessus du sol, la route et la vitesse sol (vert).',svg:'',canvas:WT,alt:'Animation d’un avion qui dérive à cause du vent puis corrige son cap pour suivre sa route'};
})();
