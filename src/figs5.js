(function(){ const B=window.BIA, F=B.figs;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), ss=(a,b,t)=>{ t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); }, mixc=(a,b,t)=>a.map((v,i)=>Math.round(v+(b[i]-v)*t));
let _s=5; const rnd=()=>{ _s=(_s*16807)%2147483647; return _s/2147483647; };
const rgb=c=>'rgb('+c[0]+','+c[1]+','+c[2]+')';
function T(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh!==0){ g.lineWidth=3.5; g.lineJoin='round'; g.strokeStyle=o.sc||'rgba(255,255,255,.85)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#12202f'; g.fillText(t,x,y); }
function puff(g,x,y,r,tint,dark){ const c0=mixc([255,255,255],[96,108,124],dark), c1=mixc([206,216,228],[58,66,80],dark); const gr=g.createRadialGradient(x-r*.35,y-r*.4,r*.1,x,y,r); gr.addColorStop(0,rgb(mixc(c0,tint||c0,0))); gr.addColorStop(.7,rgb(c1)); gr.addColorStop(1,'rgba('+c1[0]+','+c1[1]+','+c1[2]+',0)'); g.fillStyle=gr; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }
function sky(g,W,H,gy,top,bot){ const l=g.createLinearGradient(0,0,0,gy); l.addColorStop(0,top); l.addColorStop(1,bot); g.fillStyle=l; g.fillRect(0,0,W,gy); }
function ground(g,W,H,gy){ const l=g.createLinearGradient(0,gy,0,H); l.addColorStop(0,'#6fae56'); l.addColorStop(1,'#427f3a'); g.fillStyle=l; g.fillRect(0,gy,W,H-gy); g.fillStyle='rgba(30,70,30,.25)'; for(let i=0;i<40;i++){ g.fillRect((i*83)%W,gy+4+((i*37)%(H-gy-8)),14+(i%3)*8,2); } }
function hills(g,W,gy,col,a,f,ph){ g.fillStyle=col; g.beginPath(); g.moveTo(0,gy); for(let x=0;x<=W;x+=10) g.lineTo(x,gy-a*(.6+.4*Math.sin(x*f+ph))-a*.3*Math.sin(x*f*2.7+ph*2)); g.lineTo(W,gy); g.fill(); }
function arrow(g,x0,y0,x1,y1,col,w){ g.strokeStyle=col; g.fillStyle=col; g.lineWidth=w||3; g.lineCap='round'; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x1,y1); g.stroke(); const a=Math.atan2(y1-y0,x1-x0); g.beginPath(); g.moveTo(x1,y1); g.lineTo(x1-10*Math.cos(a-.45),y1-10*Math.sin(a-.45)); g.lineTo(x1-10*Math.cos(a+.45),y1-10*Math.sin(a+.45)); g.closePath(); g.fill(); }

/* ======== Naissance d’un nuage ======== */
const CF={W:640,H:400,cyc:18,
 draw(g,t){ const W=640,H=400,gy=350,m2y=h=>gy-h*.11, L=m2y(2000);
  sky(g,W,H,gy,'#2d78cf','#cfe8f7'); const sg=g.createRadialGradient(70,60,0,70,60,150); sg.addColorStop(0,'rgba(255,248,210,1)'); sg.addColorStop(.12,'rgba(255,244,190,.7)'); sg.addColorStop(1,'rgba(255,240,180,0)'); g.fillStyle=sg; g.fillRect(0,0,300,260); g.fillStyle='#fff6c9'; g.beginPath(); g.arc(70,60,22,0,7); g.fill();
  hills(g,W,gy,'#9cb9c9',34,.012,1); hills(g,W,gy,'#7fa68a',20,.02,3); ground(g,W,H,gy);
  // rayons du soleil vers le sol
  g.save(); for(let i=0;i<5;i++){ const x1=150+i*70, a=.12+.1*Math.sin(t*1.5+i); g.strokeStyle='rgba(255,226,120,'+a+')'; g.lineWidth=14; g.beginPath(); g.moveTo(80+i*10,70); g.lineTo(x1,gy); g.stroke(); } g.restore();
  // sol chaud : ondulations
  const heat=ss(0,3,t%CF.cyc); for(let i=0;i<7;i++){ const x=170+i*52; g.strokeStyle='rgba(255,120,40,'+(.55*heat)+')'; g.lineWidth=2; g.beginPath(); for(let k=0;k<26;k++){ const yy=gy-k*2.4-((t*30+i*9)%30); g.lineTo(x+Math.sin(k*.6+t*4+i)*4,yy); } g.stroke(); }
  // règle d’altitude
  g.strokeStyle='rgba(20,40,60,.55)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(36,gy); g.lineTo(36,m2y(3000)); g.stroke(); for(const h of [0,1000,2000,3000]){ const y=m2y(h); g.beginPath(); g.moveTo(30,y); g.lineTo(42,y); g.stroke();  }
  for(const h of [0,1000,2000,3000]) T(g,h+' m',48,m2y(h)+4,{s:12,w:'600'});
  // niveau de condensation
  g.setLineDash([8,6]); g.strokeStyle='rgba(255,255,255,.95)'; g.lineWidth=2; g.beginPath(); g.moveTo(110,L); g.lineTo(520,L); g.stroke(); g.setLineDash([]);
  T(g,'Niveau de condensation',60,L+18,{s:12,w:'700'}); T(g,'= base du nuage',60,L+32,{s:12,w:'700'});
  const tc=t%CF.cyc;
  // bulles montantes
  const bub=[[250,0],[330,1.6],[410,3.2]];
  for(const [bx,off] of bub){ const u=((tc-3-off)/6.5); if(u<0||u>1.15) continue; const uu=clamp(u,0,1), h=uu*2000, y=m2y(h), tair=24-h/100; const r=20+uu*20; const cold=ss(0,1,uu), col=mixc([255,140,60],[110,170,235],cold);
    const ag=1-ss(1,1.15,u); const gr=g.createRadialGradient(bx-r*.3,y-r*.3,2,bx,y,r*1.15); gr.addColorStop(0,'rgba('+col[0]+','+col[1]+','+col[2]+','+(.75*ag)+')'); gr.addColorStop(1,'rgba('+col[0]+','+col[1]+','+col[2]+','+(.12*ag)+')'); g.fillStyle=gr; g.beginPath(); g.ellipse(bx+Math.sin(t*2+off)*3,y,r,r*1.05,0,0,7); g.fill(); g.strokeStyle='rgba('+col[0]+','+col[1]+','+col[2]+','+(.9*ag)+')'; g.lineWidth=1.5; g.stroke();
    // molécules de vapeur
    for(let k=0;k<9;k++){ const a=k*2.4+t*1.7+off, rr=(k%3+1)*r/4.2; const px=bx+Math.cos(a)*rr, py=y+Math.sin(a*1.3)*rr*.9; const drop=ss(.88,1,uu); g.fillStyle=drop>.2?'rgba(255,255,255,'+(.9*ag)+')':'rgba(40,110,200,'+(.75*ag)+')'; g.beginPath(); g.arc(px,py,drop>.2?2.8:1.8,0,7); g.fill(); }
    T(g,tair.toFixed(0)+' °C',bx+r+6,y+4,{s:13,w:'800',c:rgb(mixc([200,70,10],[20,80,170],cold))});
    arrow(g,bx,y+r+14,bx,y+r+2,'rgba(220,60,40,.85)',3); }
  // nuage (cumulus)
  const g0=ss(5.5,12.5,tc)*(1-ss(16,18,tc)); if(g0>0.01){ _s=11; const P=[]; for(let i=0;i<26;i++){ P.push([370+(rnd()-.5)*190,L-4-rnd()*58,22+rnd()*22,rnd()]); } P.sort((a,b)=>b[1]-a[1]); for(const p of P){ const sc=g0; const y=L-(L-p[1])*sc; puff(g,370+(p[0]-370)*(.35+.65*sc),y,p[2]*(.3+.7*sc),null,.12*(1-(L-p[1])/80)); } T(g,'NUAGE',370,L-84*g0-8,{s:15,w:'800',a:'center',c:'#0e3b66'}); }
  // panneau d’informations
  g.fillStyle='rgba(255,255,255,.9)'; g.beginPath(); g.roundRect?g.roundRect(468,16,164,96,10):g.rect(468,16,164,96); g.fill();
  T(g,'Température de l’air  T',478,38,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,'24 °C → 4 °C',478,58,{s:18,w:'800',sh:0,c:'#c2410c'});
  T(g,'Point de rosée  Td',478,80,{s:12,w:'600',sh:0,c:'#52606e'}); T(g,'8 °C → 4 °C',478,100,{s:18,w:'800',sh:0,c:'#1d4ed8'});
  // légende de l’étape
  const steps=[[0,3,'1 · Le soleil chauffe le sol : l’air du dessous se réchauffe.'],[3,9,'2 · La bulle d’air chaud, plus légère, monte… et se refroidit (≈ 1 °C par 100 m).'],[9,13,'3 · À 4 °C, T = Td : la vapeur se condense en gouttelettes.'],[13,18,'4 · Les gouttelettes, ensemble, forment le nuage (cumulus).']];
  const st=steps.find(s=>tc>=s[0]&&tc<s[1])||steps[3]; g.fillStyle='rgba(18,32,47,.88)'; g.fillRect(0,H-34,W,34); T(g,st[2],W/2,H-12,{s:14,w:'600',a:'center',c:'#fff',sh:0});
 }};
F['cloudform']={cap:'<b>Comment naît un nuage.</b> Le soleil chauffe le sol et l’air qui le touche. Cette bulle d’air chaud, plus légère, monte. En montant, elle se détend et se <b>refroidit</b>. Quand sa température rejoint le <b>point de rosée</b>, la vapeur d’eau se condense en minuscules gouttelettes : c’est un nuage.',svg:'',canvas:CF,alt:'Animation : une bulle d’air chaud monte, se refroidit à 4 °C et forme un nuage à 2 000 m'};

/* ======== Cumulonimbus et orage ======== */
const CB={W:640,H:430,cyc:22,bolts:[[7.4,250],[9.1,410],[11.0,300],[12.7,440],[14.3,360]],
 puffs:(function(){ _s=77; const a=[]; for(let i=0;i<150;i++){ const u=rnd(); a.push([ (rnd()-.5), u, 30+rnd()*24, rnd() ]); } return a; })(),
 bolt(g,x0,y0,x1,y1,seed,al){ _s=seed; const pts=[[x0,y0],[x1,y1]]; for(let k=0;k<5;k++){ for(let i=pts.length-1;i>0;i--){ const a=pts[i-1],b=pts[i]; const mx=(a[0]+b[0])/2+(rnd()-.5)*(60/(k+1)), my=(a[1]+b[1])/2; pts.splice(i,0,[mx,my]); } }
   g.save(); g.lineJoin='round'; g.lineCap='round'; for(const [w,c] of [[10,'rgba(160,190,255,'+(.25*al)+')'],[5,'rgba(210,225,255,'+(.6*al)+')'],[2,'rgba(255,255,255,'+al+')']]){ g.strokeStyle=c; g.lineWidth=w; g.beginPath(); pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); } g.restore(); },
 draw(g,t){ const W=640,H=430,gy=396,km=h=>gy-h*31, tc=t%CB.cyc;
  const dev=ss(0,6.5,tc), mat=ss(5.5,8,tc)*(1-ss(15.5,17,tc)), dis=ss(15,21,tc);
  let flash=0; for(const [bt] of CB.bolts){ const d=tc-bt; if(d>0&&d<.45) flash=Math.max(flash,(1-d/.45)*(.5+.5*Math.sin(d*60)*.5)); }
  const dark=.35+.5*dev*(1-dis*.6);
  sky(g,W,H,gy,rgbm(mixc([86,148,214],[52,64,86],dark)),rgbm(mixc([200,226,244],[128,142,160],dark)));
  if(flash>0){ g.fillStyle='rgba(235,240,255,'+(flash*.35)+')'; g.fillRect(0,0,W,gy); }
  hills(g,W,gy,'#8aa0ae',30,.011,2); ground(g,W,H,gy);
  // pluie au sol qui mouille
  // axe d’altitude et isotherme 0 °C
  g.strokeStyle='rgba(15,30,45,.6)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(30,gy); g.lineTo(30,km(10.5)); g.stroke(); for(const h of [0,2,4,6,8,10]){ g.beginPath(); g.moveTo(24,km(h)); g.lineTo(36,km(h)); g.stroke(); T(g,h+' km',40,km(h)+4,{s:11,w:'600'}); }
  g.setLineDash([6,5]); g.strokeStyle='rgba(120,190,255,.9)'; g.lineWidth=1.8; g.beginPath(); g.moveTo(80,km(4)); g.lineTo(620,km(4)); g.stroke(); g.setLineDash([]); T(g,'0 °C : au-dessus, les gouttes gèlent',70,km(4)-5,{s:11,w:'700',c:'#0b4a7a'});
  // avion qui contourne
  const px=70+((tc*9)%150), py=km(6.2); g.save(); g.translate(px,py); g.fillStyle='#fff'; g.strokeStyle='#223'; g.lineWidth=1; g.beginPath(); g.ellipse(0,0,14,3.2,0,0,7); g.fill(); g.stroke(); g.beginPath(); g.moveTo(-3,0); g.lineTo(-9,-8); g.lineTo(-5,0); g.lineTo(-9,8); g.closePath(); g.fill(); g.stroke(); g.restore();
  // nuage
  const base=km(2.6), top=km(2.6+7.3*dev*(1-dis*.55)), cx=330, wid=(70+40*dev)*(1-.3*dis);
  const P=CB.puffs.slice().map(p=>({x:cx+p[0]*wid*2*(0.9+.5*(1-p[1])),y:base-p[1]*(base-top),r:p[2]*(.45+.55*dev)*(1-.4*dis),k:p[3],u:p[1]})); P.sort((a,b)=>b.y-a.y);
  for(const p of P){ const dk=clamp(.15+.55*(1-p.u)*.9+.3*mat-.2*p.k*0,0,.95); puff(g,p.x,p.y,p.r,null,dk*.85+flash*-.2); }
  // enclume
  const an=ss(7,10,tc)*(1-ss(15,19,tc)); if(an>.01){ _s=9; for(let i=0;i<40;i++){ const s=(rnd()*2-1), x=cx+s*(120+80*an), y=top+8+rnd()*14+Math.abs(s)*10; puff(g,x,y,(18+rnd()*14)*an,null,.15); } T(g,'ENCLUME',cx,top-10,{s:13,w:'800',a:'center',c:'#10243a'}); }
  if(flash>0){ { const cy=(base+top)/2, rg=g.createRadialGradient(cx,cy,10,cx,cy,wid*1.5); rg.addColorStop(0,'rgba(255,255,255,'+(flash*.75)+')'); rg.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=rg; g.fillRect(cx-wid*1.6,top-30,wid*3.2,base-top+60); } }
  // courants ascendants et descendants
  if(dev>.2){ const ph=(t*60)%40; for(let i=0;i<4;i++){ const y=base-12-i*40-ph*.6; if(y>top+14&&y<base-4) arrow(g,cx-35,y+28,cx-35,y,'rgba(220,40,30,.9)',4); } T(g,'Courant montant',cx-35,base+16,{s:12,w:'800',a:'center',c:'#9b1c1c'}); }
  // grêle et charges dans le nuage
  if(mat>.1){ _s=33; for(let i=0;i<14;i++){ const u=rnd(), x=cx-60+rnd()*110, per=2.2+rnd()*1.6, ph=((t/per+rnd())%1), y=top+30+(base-top-60)*(ph<.5?ph*2:2-ph*2); g.fillStyle='rgba(255,255,255,'+(.9*mat)+')'; g.beginPath(); g.arc(x,y,2.6+u*1.6,0,7); g.fill(); g.strokeStyle='rgba(120,150,190,'+(.8*mat)+')'; g.lineWidth=1; g.stroke(); }
   T(g,'+ + +',cx+4,top+34,{s:15,w:'800',a:'center',c:'#c0222e',sc:'rgba(255,255,255,.7)'}); T(g,'− − −',cx+4,base-8,{s:15,w:'800',a:'center',c:'#1d4ed8',sc:'rgba(255,255,255,.7)'}); T(g,'Grêle',cx+78,(base+top)/2,{s:12,w:'800',c:'#0b3a66'}); }
  // pluie et courant descendant
  const rain=mat*(1-ss(16,21,tc)*.9); if(rain>.02){ g.strokeStyle='rgba(60,100,150,'+(.75*rain)+')'; g.lineWidth=1.4; _s=3; for(let i=0;i<90;i++){ const x=cx+40+rnd()*130, sp=300+rnd()*180, y0=base+4+((t*sp+rnd()*400)%(gy-base-4)); g.beginPath(); g.moveTo(x-(y0-base)*.05,y0); g.lineTo(x-(y0-base)*.05-2,y0+10); g.stroke(); }
   for(let i=0;i<3;i++){ const y=base+30+((t*40+i*60)%120); if(y<gy-26) arrow(g,cx+175,y,cx+175,y+22,'rgba(30,90,200,.9)',4); } T(g,'Courant descendant',cx+178,base+18,{s:12,w:'800',a:'left',c:'#1e3a8a'}); T(g,'Pluie',cx+95,gy-12,{s:12,w:'800',a:'center',c:'#1e3a8a'}); }
  // éclairs
  for(const [bt,bx] of CB.bolts){ const d=tc-bt; if(d>0&&d<.45) CB.bolt(g,bx-30+((bt*17)%40),base-4,bx+(bt%5)*3-10,gy,Math.round(bt*100),clamp(1-d/.45,0,1)*(.7+.3*Math.sin(d*70))); if(d>.9&&d<2.6){ T(g,'Éclair… puis, plus tard, BOUM : le tonnerre',470,60,{s:13,w:'800',a:'center',c:'#3b1d6e'}); } }
  // consigne avion
  T(g,'Contourner largement !',px,py-14,{s:12,w:'800',a:'center',c:'#7a1f1f'});
  // onglets des phases
  const ph=tc<6.5?0:tc<15.5?1:2; const tabs=['1 · Développement','2 · Maturité','3 · Dissipation'], tx=[120,320,520]; for(let i=0;i<3;i++){ g.fillStyle=i===ph?'rgba(194,65,12,.95)':'rgba(18,32,47,.55)'; g.beginPath(); g.roundRect?g.roundRect(tx[i]-95,10,190,26,13):g.rect(tx[i]-95,10,190,26); g.fill(); T(g,tabs[i],tx[i],28,{s:14,w:'700',a:'center',c:'#fff',sh:0}); }
  const msg=['Un courant d’air chaud et humide monte très vite : le nuage grandit comme une tour.','Pluie, grêle et éclairs. Courants montants et descendants violents : zone interdite aux avions.','Le courant montant faiblit, l’air froid descend : l’orage s’éteint.'][ph]; g.fillStyle='rgba(18,32,47,.88)'; g.fillRect(0,H-26,W,26); T(g,msg,W/2,H-8,{s:13,w:'600',a:'center',c:'#fff',sh:0});
 }};
function rgbm(c){ return rgb(c); }
F['cb']={cap:'<b>Le cumulonimbus (Cb), le nuage d’orage.</b> Il passe par trois phases : <b>développement</b> (un courant d’air chaud monte en tour), <b>maturité</b> (pluie, grêle, éclairs, courants montants et descendants violents) et <b>dissipation</b>. En haut, il s’étale en <b>enclume</b>. On ne le traverse jamais : on le contourne largement.',svg:'',canvas:CB,alt:'Animation du cycle de vie d’un orage : développement, maturité avec éclairs, dissipation'};
})();
