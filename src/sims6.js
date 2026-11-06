(function(){
const S=window.BIA.sims, G=window.BIA.gfx, FM=window.BIA.fm;
const D2R=Math.PI/180, R2D=180/Math.PI, KT=1.943844, FT=3.28084, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function loop(x,fn){ let raf=0,last=null; const f=ts=>{ if(last===null) last=ts; const dt=Math.min(.05,(ts-last)/1000); last=ts; fn(dt,ts/1000); raf=requestAnimationFrame(f); }; raf=requestAnimationFrame(f); x.onCleanup(()=>cancelAnimationFrame(raf)); }
function text(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh){ g.lineWidth=3; g.strokeStyle='rgba(8,16,28,.75)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#fff'; g.fillText(t,x,y); }
const hash=(i,j)=>{ let h=(i*374761393+j*668265263)^(i*j*1274126177); h=(h^(h>>>13))*1274126177; return ((h^(h>>>16))>>>0)/4294967295; };
let _s=99; const rnd=()=>{ _s=(_s*16807)%2147483647; return _s/2147483647; };
const hexRGB=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const FIELD=['#5d9a4a','#6aa653','#4f8b44','#78ad58','#8bb55c','#c9b25c','#d8c46e','#8a6a45','#7b5f40','#3f7a3c'].map(hexRGB);
const HAZE=hexRGB('#b8cfdb');
const mix=(a,b,t)=>'rgb('+Math.round(a[0]+(b[0]-a[0])*t)+','+Math.round(a[1]+(b[1]-a[1])*t)+','+Math.round(a[2]+(b[2]-a[2])*t)+')';
// décor fixe
const TREES=[]; _s=7; for(let i=0;i<900;i++){ const X=(rnd()-.5)*16000, Y=(rnd()-.62)*17000; if(Math.abs(X)<110&&Y>-400&&Y<1900) continue; TREES.push([X,Y,6+rnd()*6,rnd()]); }
const CLOUDS=[]; _s=21; for(let i=0;i<46;i++) CLOUDS.push([(rnd()-.5)*30000,(rnd()-.55)*30000,1700+rnd()*900,300+rnd()*500]);
const RIDGE=[]; for(let a=0;a<120;a++){ RIDGE.push(380+260*Math.sin(a*.37)+200*Math.sin(a*.91+1)+120*Math.sin(a*2.3)); }

/* ---------- instruments ---------- */
function polar(cx,cy,r,deg){ const a=deg*D2R; return [cx+Math.sin(a)*r, cy-Math.cos(a)*r]; }
function bezel(g,cx,cy,r){ g.fillStyle=G.lin(g,cx-r,cy-r,cx+r,cy+r,[[0,'#8a929d'],[.35,'#2a2f37'],[.7,'#15191f'],[1,'#59616c']]); g.beginPath(); g.arc(cx,cy,r,0,7); g.fill(); g.fillStyle='#0b0e12'; g.beginPath(); g.arc(cx,cy,r-6,0,7); g.fill(); }
function needle(g,cx,cy,deg,len,w,col,tail){ g.save(); g.translate(cx,cy); g.rotate(deg*D2R); g.fillStyle='rgba(0,0,0,.45)'; g.beginPath(); g.moveTo(-w/2+1.5,tail||8); g.lineTo(w/2+1.5,tail||8); g.lineTo(0.5,-len); g.closePath(); g.fill(); g.fillStyle=col; g.beginPath(); g.moveTo(-w/2,tail||8); g.lineTo(w/2,tail||8); g.lineTo(0,-len); g.closePath(); g.fill(); g.restore(); }
function arc(g,cx,cy,r,d0,d1,col,w){ g.strokeStyle=col; g.lineWidth=w; g.beginPath(); g.arc(cx,cy,r,(d0-90)*D2R,(d1-90)*D2R); g.stroke(); }
function gASI(g,cx,cy,r,kt){ bezel(g,cx,cy,r); const d=v=>-140+v/180*280; arc(g,cx,cy,r-14,d(40),d(85),'#fff',3); arc(g,cx,cy,r-10,d(48),d(129),'#37d6a4',5); arc(g,cx,cy,r-10,d(129),d(163),'#ffd23f',5);
  { const p=polar(cx,cy,r-6,d(163)), q=polar(cx,cy,r-17,d(163)); g.strokeStyle='#ff4d3d'; g.lineWidth=3; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); }
  for(let v=0;v<=180;v+=10){ const a=d(v), p=polar(cx,cy,r-18,a), q=polar(cx,cy,r-(v%20?24:28),a); g.strokeStyle='#e8edf2'; g.lineWidth=v%20?1:1.6; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); if(v%20===0&&v>=20&&v<=160){ const t=polar(cx,cy,r-40,a); text(g,String(v),t[0],t[1]+4,{s:11,a:'center',c:'#fff'}); } }
  text(g,'KT',cx,cy+26,{s:10,a:'center',c:'#9aa8b8'}); needle(g,cx,cy,d(clamp(kt,0,182)),r-20,5,'#fff',10); g.fillStyle='#222a33'; g.beginPath(); g.arc(cx,cy,6,0,7); g.fill(); }
function gALT(g,cx,cy,r,ft){ bezel(g,cx,cy,r); for(let i=0;i<50;i++){ const a=i*7.2, big=i%5===0, p=polar(cx,cy,r-10,a), q=polar(cx,cy,r-(big?22:16),a); g.strokeStyle='#e8edf2'; g.lineWidth=big?1.8:1; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); if(big){ const t=polar(cx,cy,r-34,a); text(g,String(i/5),t[0],t[1]+5,{s:13,w:'700',a:'center'}); } }
  text(g,'ALT',cx,cy-16,{s:9,a:'center',c:'#9aa8b8'}); g.fillStyle='#10161d'; g.fillRect(cx+14,cy-5,36,13); g.strokeStyle='#5b6674'; g.strokeRect(cx+14,cy-5,36,13); text(g,'1013',cx+32,cy+5,{s:9,a:'center',c:'#e8edf2'});
  needle(g,cx,cy,(ft%10000)/10000*360,r-46,7,'#e8edf2',8); needle(g,cx,cy,(ft%1000)/1000*360,r-18,4,'#fff',12); g.fillStyle='#222a33'; g.beginPath(); g.arc(cx,cy,5,0,7); g.fill(); }
function gVSI(g,cx,cy,r,fpm){ bezel(g,cx,cy,r); const d=v=>-90+v/2000*150*(v>=0?1:1); for(let v=-2000;v<=2000;v+=250){ const a=d(v), big=v%500===0, p=polar(cx,cy,r-10,a), q=polar(cx,cy,r-(big?24:18),a); g.strokeStyle='#e8edf2'; g.lineWidth=big?1.8:1; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); if(v%1000===0&&v!==0){ const t=polar(cx,cy,r-38,a); text(g,String(Math.abs(v)/1000),t[0],t[1]+4,{s:12,w:'700',a:'center'}); } }
  text(g,'0',cx-r+28,cy+4,{s:12,w:'700',a:'center'}); text(g,'MONTÉE',cx+12,cy-22,{s:8,a:'center',c:'#9aa8b8'}); text(g,'DESC.',cx+12,cy+34,{s:8,a:'center',c:'#9aa8b8'}); text(g,'×1000 ft/min',cx+14,cy+12,{s:8,a:'center',c:'#9aa8b8'});
  needle(g,cx,cy,d(clamp(fpm,-2000,2000)),r-20,4.5,'#fff',10); g.fillStyle='#222a33'; g.beginPath(); g.arc(cx,cy,5,0,7); g.fill(); }
function gHDG(g,cx,cy,r,hd){ bezel(g,cx,cy,r); g.save(); g.translate(cx,cy); g.rotate(-hd*D2R); for(let a=0;a<360;a+=5){ const big=a%10===0, p=polar(0,0,r-9,a), q=polar(0,0,r-(a%30===0?24:big?19:15),a); g.strokeStyle='#e8edf2'; g.lineWidth=a%30===0?2:1; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); if(a%30===0){ const t=polar(0,0,r-37,a); g.save(); g.translate(t[0],t[1]); g.rotate(a*D2R); const lab=a===0?'N':a===90?'E':a===180?'S':a===270?'W':String(a/10); text(g,lab,0,5,{s:a%90===0?15:12,w:'700',a:'center',c:a===0?'#ff9a57':'#fff'}); g.restore(); } } g.restore();
  g.fillStyle='#ffb02e'; g.beginPath(); g.moveTo(cx,cy-r+12); g.lineTo(cx-5,cy-r+22); g.lineTo(cx+5,cy-r+22); g.fill();
  g.fillStyle='#e8edf2'; g.fillRect(cx-2,cy-16,4,32); g.fillRect(cx-13,cy-3,26,4); g.fillRect(cx-6,cy+10,12,3); }
function gTURN(g,cx,cy,r,rate,ball){ bezel(g,cx,cy,r); const tr=clamp(rate*R2D/3,-1.6,1.6); for(const m of [-1,1]){ const a=m*20; g.save(); g.translate(cx,cy); g.rotate(a*D2R); g.fillStyle='#e8edf2'; g.fillRect(-r+10,-1.5,10,3); g.restore(); } text(g,'L',cx-r+18,cy-8,{s:11,w:'700',a:'center'}); text(g,'R',cx+r-18,cy-8,{s:11,w:'700',a:'center'}); text(g,'2 MIN',cx,cy-30,{s:9,a:'center',c:'#9aa8b8'});
  g.save(); g.translate(cx,cy-4); g.rotate(tr*20*D2R); g.fillStyle='#ffb02e'; g.fillRect(-r+22,-2,2*r-44,4); g.fillRect(-2,-12,4,12); g.beginPath(); g.arc(0,0,5,0,7); g.fill(); g.restore();
  g.fillStyle='#10161d'; g.beginPath(); g.moveTo(cx-34,cy+30); g.quadraticCurveTo(cx,cy+42,cx+34,cy+30); g.lineTo(cx+34,cy+40); g.quadraticCurveTo(cx,cy+52,cx-34,cy+40); g.closePath(); g.fill(); g.strokeStyle='#5b6674'; g.stroke(); g.fillStyle='#fff'; g.fillRect(cx-6,cy+32,1.5,9); g.fillRect(cx+4.5,cy+32,1.5,9); g.fillStyle='#e8edf2'; g.beginPath(); g.arc(cx+ball*26,cy+36.5+Math.abs(ball*26)*.12,4.5,0,7); g.fill(); }
function gATT(g,cx,cy,r,pitch,roll){ bezel(g,cx,cy,r); g.save(); g.beginPath(); g.arc(cx,cy,r-7,0,7); g.clip(); g.translate(cx,cy); g.rotate(-roll); const py=pitch*R2D*3.4; g.fillStyle='#3b83d8'; g.fillRect(-r*2,-r*2+py,r*4,r*2); g.fillStyle='#8a5a32'; g.fillRect(-r*2,py,r*4,r*2); g.strokeStyle='#fff'; g.lineWidth=2; g.beginPath(); g.moveTo(-r*2,py); g.lineTo(r*2,py); g.stroke();
  for(let p=-30;p<=30;p+=5){ if(p===0) continue; const y=py-p*3.4, w=p%10===0?26:14; g.beginPath(); g.moveTo(-w,y); g.lineTo(w,y); g.lineWidth=1.4; g.strokeStyle='#fff'; g.stroke(); if(p%10===0) text(g,String(Math.abs(p)),-w-12,y+4,{s:9,a:'center'}); }
  g.restore(); g.save(); g.translate(cx,cy); for(const a of [-60,-45,-30,-20,-10,0,10,20,30,45,60]){ const p=polar(0,0,r-8,a), q=polar(0,0,r-(a%30===0?19:14),a); g.strokeStyle='#fff'; g.lineWidth=a%30===0?2:1.2; g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(q[0],q[1]); g.stroke(); }
  g.rotate(-roll); g.fillStyle='#ffd23f'; g.beginPath(); g.moveTo(0,-r+9); g.lineTo(-5,-r+19); g.lineTo(5,-r+19); g.closePath(); g.fill(); g.restore();
  g.strokeStyle='#ffb02e'; g.lineWidth=4; g.lineCap='round'; g.beginPath(); g.moveTo(cx-38,cy); g.lineTo(cx-14,cy); g.lineTo(cx-14,cy+6); g.moveTo(cx+38,cy); g.lineTo(cx+14,cy); g.lineTo(cx+14,cy+6); g.stroke(); g.fillStyle='#ffb02e'; g.fillRect(cx-3,cy-3,6,6); }

/* ---------- simulateur ---------- */
S.flight={title:'Simulateur de vol : cockpit et instruments', th:'t2', ch:'2-4',
desc:'Un vrai poste de pilotage simplifié : vue cockpit, six instruments, manche, gaz, compensateur et volets. Choisis une leçon guidée ou vole librement. Les vitesses sont celles d’un avion léger (décollage 55 kt, approche 65 kt).',
try:['Leçon 1 : décolle. Plein gaz, 55 kt, tire doucement. Observe le variomètre et l’horizon artificiel.','Leçon 3 : un virage en palier. Incline de 30° puis tire un peu : le facteur de charge (G) dépasse 1 et la vitesse de décrochage augmente.','Leçon 4 : décrochage. Ralentis, tire jusqu’au décrochage, puis récupère en poussant le manche. C’est l’incidence qui décroche, pas la vitesse seule.','Leçon 5 : atterrissage sur la pente de 3° avec le PAPI (2 blancs, 2 rouges), puis arrondi.'],
mount(root,x){
  const u=x.uid;
  root.innerHTML=
   x.seg('view',[['cock','Cockpit'],['ext','Vue extérieure']],'cock')+
   '<div style="height:8px"></div><canvas id="'+u+'v" role="img" aria-label="Vue depuis le cockpit"></canvas>'+
   '<canvas id="'+u+'i" role="img" aria-label="Instruments de bord" style="margin-top:8px"></canvas>'+
   '<div class="ctrl"><div class="padbox"><canvas id="'+u+'p" width="190" height="190" aria-label="Manche : glisse le doigt ou la souris" style="touch-action:none"></canvas><small>Manche<br><b>↑</b> nez bas · <b>↓</b> nez haut<br><b>←</b> <b>→</b> inclinaison</small></div>'+
   '<div class="sl">'+x.r('thr','Puissance (manette des gaz)',0,100,1,0,' %')+x.r('trim','Compensateur (trim) : vitesse d’équilibre',-10,10,.1,0,'')+
   '<div class="lab">Volets</div>'+x.seg('fl',[['0','0°'],['1','10°'],['2','20°'],['3','30°']],'0')+'</div></div>'+
   '<div class="row" style="margin:8px 0"><button type="button" class="btn sec sm" data-a="brake" aria-pressed="false">Freins</button><button type="button" class="btn sec sm" data-a="pause" aria-pressed="false">⏸ Pause</button><button type="button" class="btn sec sm" data-a="reset">↺ Recommencer</button></div>'+
   '<div class="lab">Choisis une leçon</div>'+x.seg('ms',[['free','Libre'],['m1','1 Décollage'],['m2','2 Palier'],['m3','3 Virage'],['m4','4 Décrochage'],['m5','5 Atterrissage']],'m1')+x.seg('wd',[['0','Calme'],['1','Vent de face'],['2','Vent de travers']],'0')+
   '<div class="coach" id="'+u+'co"></div><div class="readout" id="'+u+'ro"></div><div class="verdict" id="'+u+'vd"></div>';
  const cv=x.q('#'+u+'v'), W=640, H=340, g=G.setup(cv,W,H);
  const ci=x.q('#'+u+'i'), IW=480, IH=340, gi=G.setup(ci,IW,IH);
  const pad=x.q('#'+u+'p'), pg=G.setup(pad,190,190);
  let s=FM.newState(), view='cock', mission='m1', windMode=0, paused=false, brake=false;
  const stick={ax:0,ay:0,hx:0,hy:0,down:false}, keys={};
  let ms={i:0,t:0}, tdShown=false, shake=0, prop=0, msgFlash=0;
  // ---------- scénarios ----------
  function trimAuto(kt,fl){ return clamp(FM.trimFor(kt/KT,s.h,fl),-10,10); }
  function setSliders(thr,trim,fl){ x.setv('thr',Math.round(thr*100)); x.setv('trim',Math.round(trim*10)/10); const seg=x.q('.seg[aria-label=fl]'); x.qa('.seg[aria-label=fl] button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==String(fl))); s.fl=fl; }
  function reset(){ const ws=[[0,0],[0,-6.2],[6.2,0]][windMode]; s=FM.newState(); s.wx=ws[0]; s.wy=ws[1]; tdShown=false; ms={i:0,t:0}; brake=false; x.q('[data-a=brake]').setAttribute('aria-pressed','false');
    const air=(h,kt,fl,thr,py)=>{ s.ground=false; s.h=h/FT; s.V=kt/KT; s.py=py; s.fl=fl; s.px=0; s.psi=0; const a=FM.alphaFor(s.V,s.h,fl); s.th=a*D2R; s.gam=0; const tr=trimAuto(kt,fl); setSliders(thr,tr,fl); };
    if(mission==='m1'||mission==='free'&&false){ s.ground=true; s.py=60; s.Vg=0; setSliders(0,0,1); }
    else if(mission==='free'){ air(2000,100,0,.68,-4000); }
    else if(mission==='m2'){ air(1500,90,0,.55,-5000); }
    else if(mission==='m3'){ air(2000,100,0,.68,-5000); ms.psi0=0; }
    else if(mission==='m4'){ air(3500,90,0,.45,-5000); }
    else if(mission==='m5'){ air(0,65,3,.2,-3600); s.h=3600*Math.tan(3*D2R); s.gam=-3*D2R; const a=FM.alphaFor(s.V,s.h,3); s.th=s.gam+a*D2R; setSliders(.2,trimAuto(65,3),3); }
    stick.ax=stick.ay=0; }
  // ---------- entrées ----------
  function padDraw(){ pg.clearRect(0,0,190,190); pg.fillStyle=G.rad(pg,95,95,5,92,[[0,'#2a3644'],[1,'#10171f']]); pg.beginPath(); pg.arc(95,95,92,0,7); pg.fill(); pg.strokeStyle='rgba(255,255,255,.18)'; pg.lineWidth=1; pg.beginPath(); pg.moveTo(95,8); pg.lineTo(95,182); pg.moveTo(8,95); pg.lineTo(182,95); pg.stroke(); pg.beginPath(); pg.arc(95,95,46,0,7); pg.stroke();
    const kx=95+stick.hx*80, ky=95+stick.hy*80; pg.fillStyle=G.rad(pg,kx-6,ky-6,2,26,[[0,'#ffd7b0'],[1,'#e4572e']]); pg.beginPath(); pg.arc(kx,ky,20,0,7); pg.fill(); pg.strokeStyle='rgba(255,255,255,.5)'; pg.lineWidth=2; pg.stroke(); }
  function padSet(e){ const r=pad.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width*190, py=(e.clientY-r.top)/r.height*190; let dx=(px-95)/80, dy=(py-95)/80; const m=Math.hypot(dx,dy); if(m>1){ dx/=m; dy/=m; } stick.hx=dx; stick.hy=dy; }
  pad.addEventListener('pointerdown',e=>{ stick.down=true; pad.setPointerCapture(e.pointerId); padSet(e); e.preventDefault(); });
  pad.addEventListener('pointermove',e=>{ if(stick.down) padSet(e); });
  const up=()=>{ stick.down=false; };
  pad.addEventListener('pointerup',up); pad.addEventListener('pointercancel',up);
  root.tabIndex=0; root.style.outline='none';
  root.addEventListener('keydown',e=>{ const k=e.key; if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(k)){ keys[k]=true; e.preventDefault(); } if(k==='PageUp'||k==='+'){ x.setv('thr',Math.min(100,x.v('thr')+5)); } if(k==='PageDown'||k==='-'){ x.setv('thr',Math.max(0,x.v('thr')-5)); } });
  root.addEventListener('keyup',e=>{ if(keys[e.key]){ keys[e.key]=false; e.preventDefault(); } });
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-a]'); if(!b) return; const a=b.dataset.a; if(a==='reset') reset(); else if(a==='pause'){ paused=!paused; b.setAttribute('aria-pressed',paused); b.textContent=paused?'▶ Reprendre':'⏸ Pause'; } });
  const bk=x.q('[data-a=brake]'); ['pointerdown'].forEach(ev=>bk.addEventListener(ev,()=>{ brake=true; bk.setAttribute('aria-pressed','true'); })); ['pointerup','pointerleave','pointercancel'].forEach(ev=>bk.addEventListener(ev,()=>{ brake=false; bk.setAttribute('aria-pressed','false'); }));
  x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); if(o) o.textContent=i.value+i.dataset.unit; }));
  x.segBind('fl',v=>{ s.fl=+v; });
  x.segBind('view',v=>{ view=v; });
  x.segBind('ms',v=>{ mission=v; reset(); });
  x.segBind('wd',v=>{ windMode=+v; reset(); });

  // ---------- rendu 3D du cockpit ----------
  const FOC=330, CXs=W/2, CYo=H*.45; let cam=null;
  function vw(px,py,pz){ const dx=px-cam.x, dy=py-cam.y, dz=pz-cam.z; const sn=cam.sn, cs=cam.cs; const r=dx*cs-dy*sn, f=dx*sn+dy*cs; const f2=f*cam.cp+dz*cam.sp, u2=-f*cam.sp+dz*cam.cp; return [r*cam.cr-u2*cam.sr, f2, u2*cam.cr+r*cam.sr]; }
  function clipN(v){ const out=[],n=.6; for(let i=0;i<v.length;i++){ const a=v[i], b=v[(i+1)%v.length]; const ia=a[1]>=n, ib=b[1]>=n; if(ia) out.push(a); if(ia!==ib){ const t=(n-a[1])/(b[1]-a[1]); out.push([a[0]+t*(b[0]-a[0]),n,a[2]+t*(b[2]-a[2])]); } } return out; }
  function poly(pts,fill,stroke){ let v=clipN(pts.map(p=>vw(p[0],p[1],p[2]))); if(v.length<3) return; g.beginPath(); for(let i=0;i<v.length;i++){ const sx=CXs+FOC*v[i][0]/v[i][1], sy=CYo-FOC*v[i][2]/v[i][1]; i?g.lineTo(sx,sy):g.moveTo(sx,sy); } g.closePath(); if(fill){ g.fillStyle=fill; g.fill(); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=1; g.stroke(); } }
  function proj(px,py,pz){ const v=vw(px,py,pz); if(v[1]<.6) return null; return [CXs+FOC*v[0]/v[1], CYo-FOC*v[2]/v[1], v[1]]; }
  function render3D(t){
    const jit=(s.stalled?1:0)*(.012*Math.sin(t*60)); const th=s.th+jit;
    cam={x:s.px,y:s.py,z:s.h+1.6,sn:Math.sin(s.psi),cs:Math.cos(s.psi),sp:Math.sin(th),cp:Math.cos(th),sr:Math.sin(s.ph),cr:Math.cos(s.ph)};
    // ciel
    const hz=proj(cam.x+cam.sn*1e5,cam.y+cam.cs*1e5,0)||[CXs,CYo,1]; g.save(); g.translate(hz[0],hz[1]); g.rotate(-s.ph); g.fillStyle=G.lin(g,0,-520,0,0,[[0,'#2169c4'],[.55,'#5fa6e6'],[1,'#cfe7f6']]); g.fillRect(-W*2,-520,W*4,521); g.fillStyle='#b8cfdb'; g.fillRect(-W*2,0,W*4,600); g.restore();
    // soleil
    // nuages
    const cl=[]; for(const c of CLOUDS){ const v=vw(c[0],c[1],c[2]); if(v[1]<400||v[1]>26000) continue; const sx=CXs+FOC*v[0]/v[1], sy=CYo-FOC*v[2]/v[1]; if(sx<-300||sx>W+300||sy<-200||sy>H) continue; cl.push([v[1],sx,sy,c[3]]); } cl.sort((a,b)=>b[0]-a[0]); cl.forEach(c=>{ const sc=FOC*c[3]/c[0]/55; G.cloud(g,c[1]-40*sc,c[2],sc,Math.min(.95,2200/c[0])); });
    // reliefs lointains
    for(let a=0;a<120;a++){ const a0=a*3*D2R, a1=(a+1)*3*D2R, R=34000; poly([[Math.sin(a0)*R,Math.cos(a0)*R,0],[Math.sin(a1)*R,Math.cos(a1)*R,0],[Math.sin(a1)*R,Math.cos(a1)*R,RIDGE[(a+1)%120]],[Math.sin(a0)*R,Math.cos(a0)*R,RIDGE[a]]],'#9db7c6'); }
    // sol lointain (brume) puis damier de champs
    const BIG=90000; poly([[cam.x-BIG,cam.y-BIG,0],[cam.x+BIG,cam.y-BIG,0],[cam.x+BIG,cam.y+BIG,0],[cam.x-BIG,cam.y+BIG,0]],mix(FIELD[0],HAZE,.82));
    const tiles=[]; const addTiles=(size,rad,skip)=>{ const i0=Math.floor((cam.x-rad)/size), i1=Math.floor((cam.x+rad)/size), j0=Math.floor((cam.y-rad)/size), j1=Math.floor((cam.y+rad)/size); for(let i=i0;i<=i1;i++) for(let j=j0;j<=j1;j++){ const cx=(i+.5)*size, cy=(j+.5)*size; const dx=cx-cam.x, dy=cy-cam.y; const f=dx*cam.sn+dy*cam.cs; const r=dx*cam.cs-dy*cam.sn; const d=Math.hypot(dx,dy); if(skip&&d<skip) continue; if(f<-size*1.2||Math.abs(r)>Math.abs(f)*2.4+size*2) continue; tiles.push([i,j,size,d]); } };
    addTiles(1500,22000,6200); addTiles(400,6600,1700); addTiles(120,1900,0);
    tiles.sort((a,b)=>b[3]-a[3]);
    for(const tl of tiles){ const [i,j,size,d]=tl; const key=size>=1500?hash(Math.floor(i/1),Math.floor(j/1)):size>=400?hash(Math.floor(i/2)+7,Math.floor(j/2)+3):hash(Math.floor(i/3)+13,Math.floor(j/3)+5); const base=FIELD[Math.floor(key*FIELD.length)%FIELD.length]; const jt=size>=400?(hash(i,j)-.5)*.1:(hash(i,j)-.5)*.16; const col=[base[0]*(1+jt),base[1]*(1+jt),base[2]*(1+jt)]; const hz=Math.min(1,Math.pow(d/18000,1.1)); const x0=i*size,y0=j*size; poly([[x0,y0,0],[x0+size,y0,0],[x0+size,y0+size,0],[x0,y0+size,0]],mix(col,HAZE,hz*.85)); }
    // route
    poly([[-9000,-1800,.02],[9000,-1800,.02],[9000,-1790,.02],[-9000,-1790,.02]],'#5c5f66'); poly([[-60,-6000,.02],[-52,-6000,.02],[-52,9000,.02],[-60,9000,.02]],'rgba(70,72,78,.001)');
    // aire de stationnement et piste
    poly([[-18,-8,.04],[18,-8,.04],[18,1508,.04],[-18,1508,.04]],'#7a7f86'); poly([[-15,0,.06],[15,0,.06],[15,1500,.06],[-15,1500,.06]],'#3f444b');
    poly([[-15,0,.07],[-14.4,0,.07],[-14.4,1500,.07],[-15,1500,.07]],'#f4f6f8'); poly([[14.4,0,.07],[15,0,.07],[15,1500,.07],[14.4,1500,.07]],'#f4f6f8');
    for(let y=40;y<1460;y+=50) poly([[-.5,y,.07],[.5,y,.07],[.5,y+30,.07],[-.5,y+30,.07]],'#f4f6f8');
    for(let k=0;k<8;k++){ const xx=-13+k*3.6; poly([[xx,8,.07],[xx+1.8,8,.07],[xx+1.8,38,.07],[xx,38,.07]],'#f4f6f8'); poly([[xx,1462,.07],[xx+1.8,1462,.07],[xx+1.8,1492,.07],[xx,1492,.07]],'#f4f6f8'); }
    for(const [y0,y1,xw] of [[300,345,10],[450,480,8],[600,630,6]]) for(const sg of [-1,1]) poly([[sg*xw,y0,.07],[sg*(xw-3.4),y0,.07],[sg*(xw-3.4),y1,.07],[sg*xw,y1,.07]],'#f4f6f8');
    // hangar
    const hx0=-90,hx1=-55,hy0=140,hy1=215,hh=9; poly([[hx0,hy0,hh],[hx1,hy0,hh],[hx1,hy1,hh],[hx0,hy1,hh]],'#b9c3cd'); poly([[hx1,hy0,0],[hx1,hy1,0],[hx1,hy1,hh],[hx1,hy0,hh]],'#d8dfe6','#8e99a5'); poly([[hx0,hy0,0],[hx1,hy0,0],[hx1,hy0,hh],[hx0,hy0,hh]],'#98a4b1','#8e99a5');
    // manche à air
    { const px0=-45,py0=100; poly([[px0-.2,py0,0],[px0+.2,py0,0],[px0+.2,py0,7],[px0-.2,py0,7]],'#e9eef3'); const wv=Math.hypot(s.wx,s.wy); const dir=wv>.5?Math.atan2(s.wx,s.wy):0; const L=3.6*clamp(wv/6,.25,1), dx=Math.sin(dir)*L, dy=Math.cos(dir)*L; const dp=clamp(1-wv/7,0,1)*2.2; poly([[px0,py0,7],[px0+dx*.5,py0+dy*.5,7-dp*.3-.3],[px0+dx,py0+dy,7-dp-.6],[px0+dx,py0+dy,7-dp+.5],[px0+dx*.5,py0+dy*.5,7-dp*.3+.5],[px0,py0,7.6]],'#ff7a2e','#fff'); }
    // arbres
    const tr=[]; for(const T of TREES){ const dx=T[0]-cam.x, dy=T[1]-cam.y; const f=dx*cam.sn+dy*cam.cs; if(f<8||f>5200) continue; const r=dx*cam.cs-dy*cam.sn; if(Math.abs(r)>f*2.3) continue; tr.push([f,r,T]); }
    tr.sort((a,b)=>b[0]-a[0]); for(const q of tr){ const p=proj(q[2][0],q[2][1],q[2][2]*.9+0), p0=proj(q[2][0],q[2][1],0); if(!p||!p0) continue; const rr=FOC*q[2][2]*.55/q[0]; const hzf=Math.min(1,q[0]/9000); const c=mix(q[2][3]>.6?[44,102,50]:[62,128,60],HAZE,hzf*.8); g.fillStyle=mix([70,50,32],HAZE,hzf*.8); g.fillRect(p0[0]-rr*.12,p0[1]-rr*.9,rr*.24,rr*.9); g.fillStyle=c; g.beginPath(); g.arc(p[0],p[1]-rr*.2,rr,0,7); g.fill(); }
    // PAPI
    const ths=[2.5,2.83,3.17,3.5]; for(let i=0;i<4;i++){ const lx=-(15+(3-i)*9)-6, ly=320, lz=.7; const p=proj(lx,ly,lz); if(!p) continue; const dx=ly-s.py, dz=(s.h+1.6)-lz, dd=Math.hypot(dx,s.px-lx); const beta=Math.atan2(dz,dd)*R2D; const white=beta>ths[i]; const rr=clamp(FOC*.5/p[2],1.4,11); g.fillStyle='#3a3f46'; g.fillRect(p[0]-rr*1.3,p[1]-rr*.6,rr*2.6,rr*1.5); g.fillStyle=G.rad(g,p[0],p[1]-rr*.3,0,rr*3.2,[[0,white?'rgba(255,255,255,.95)':'rgba(255,60,48,.95)'],[.3,white?'rgba(255,255,255,.55)':'rgba(255,60,48,.55)'],[1,'rgba(255,255,255,0)']]); g.beginPath(); g.arc(p[0],p[1]-rr*.3,rr*3.2,0,7); g.fill(); }
    // extérieur du cockpit
    g.fillStyle=G.lin(g,0,H-44,0,H,[[0,'rgba(20,24,30,0)'],[1,'rgba(20,24,30,.0)']]);
    g.fillStyle='#14181e'; g.beginPath(); g.moveTo(0,H); g.lineTo(0,H-30); g.quadraticCurveTo(W/2,H-52,W,H-30); g.lineTo(W,H); g.closePath(); g.fill();
    g.fillStyle=G.lin(g,0,H-52,0,H-28,[[0,'#2a313a'],[1,'#10141a']]); g.beginPath(); g.moveTo(0,H-30); g.quadraticCurveTo(W/2,H-54,W,H-30); g.lineTo(W,H-22); g.quadraticCurveTo(W/2,H-46,0,H-22); g.closePath(); g.fill();
    g.fillStyle='rgba(20,24,30,.9)'; g.beginPath(); g.moveTo(0,0); g.lineTo(34,0); g.lineTo(0,H-120); g.closePath(); g.fill(); g.beginPath(); g.moveTo(W,0); g.lineTo(W-34,0); g.lineTo(W,H-120); g.closePath(); g.fill();
    g.fillStyle='rgba(8,12,16,.55)'; g.fillRect(0,0,W,3);
  }
  // ---------- vue extérieure ----------
  let sprop=0;
  function renderExt(t){ const sc=s.py*2.2; const gy=190+s.h*.3; G.sky(g,W,Math.min(gy,H),Math.min(gy,H)); [[0,40,1.2],[1,92,.9],[2,60,1.5],[3,130,.8],[4,28,1],[5,104,1.1]].forEach(c=>{ const cxp=((c[0]*230-s.py*.5)%1380+1380)%1380-180; G.cloud(g,cxp,c[1]+s.h*.05,c[2],.92); });
    G.land(g,W,H,gy,sc,{runway:[0,1500*2.2]}); const px=200, py=150, thr=x.v('thr')/100; G.shadow(g,px,gy+5,44*(1-Math.min(.6,s.h/500)),.28*(1-Math.min(1,s.h/260)));
    sprop+=.016*(8+thr*60); const j=s.stalled?(Math.random()-.5)*3:0;
    G.plane(g,px+j,py+j,1.05,-s.th,{prop:sprop,thr,flaps:s.fl/3});
    const arrow=(dx,dy,c,lab)=>{ const len=Math.hypot(dx,dy); if(len<4) return; g.strokeStyle=c; g.fillStyle=c; g.lineWidth=3; g.lineCap='round'; g.beginPath(); g.moveTo(px-4,py-3); g.lineTo(px-4+dx,py-3+dy); g.stroke(); const an=Math.atan2(dy,dx); g.beginPath(); g.moveTo(px-4+dx,py-3+dy); g.lineTo(px-4+dx-9*Math.cos(an-.45),py-3+dy-9*Math.sin(an-.45)); g.lineTo(px-4+dx-9*Math.cos(an+.45),py-3+dy-9*Math.sin(an+.45)); g.closePath(); g.fill(); text(g,lab,px-4+dx+(dx>=0?6:-6),py-3+dy+(dy<0?-4:14),{s:11,a:dx>=0?'left':'right',sh:1,c}); };
    const u=34/9.81; arrow(0,-s.L*u,'#37d6a4','portance'); arrow(0,9.81*u,'#6cb4ff','poids'); arrow(s.T*u*3,0,'#ffb02e','traction'); arrow(-s.D*u*3,0,'#ff6f61','traînée');
    if(!s.ground){ g.setLineDash([5,5]); g.strokeStyle='rgba(255,255,255,.85)'; g.lineWidth=1.5; g.beginPath(); g.moveTo(px+84,py+2); g.lineTo(px+84+80*Math.cos(-s.gam),py+2+80*Math.sin(-s.gam)); g.stroke(); g.setLineDash([]); g.strokeStyle='rgba(255,230,120,.95)'; g.lineWidth=2; g.beginPath(); g.arc(px+84,py+2,40,-s.gam-.0,-s.gam+(s.gam-s.th)*-1+0.0001,s.gam>s.th); g.stroke(); text(g,'incidence '+s.aoa.toFixed(0)+'°',px+130,py+36,{s:12,w:'700',c:'#ffe27a',sh:1}); text(g,'trajectoire',px+84+82*Math.cos(-s.gam),py+2+82*Math.sin(-s.gam)+4,{s:10,w:'500',sh:1}); }
    if(s.stalled&&Math.floor(t*4)%2===0) text(g,'DÉCROCHAGE',W/2,70,{s:30,w:'800',a:'center',c:'#ff5a4d',sh:1});
  }
  // ---------- coach & missions ----------
  const M={
   free:{t:'Vol libre',steps:[]},
   m1:{t:'Décollage',steps:[
     ['Mets la puissance à fond (100 %).',s=>x.v('thr')>=95,s=>'Monte le curseur Puissance à 100 %.'],
     ['Accélère dans l’axe de la piste jusqu’à 55 kt (vitesse de rotation).',s=>s.V*KT>=55,s=>'Vitesse '+Math.round(s.V*KT)+' kt. Reste dans l’axe avec ← →.'],
     ['Rotation : tire doucement le manche (↓) pour quitter le sol.',s=>!s.ground,s=>'Tire progressivement, sans brutalité : l’avion se cabre puis décolle.'],
     ['Monte à 74 kt (Vy) en réglant l’assiette (manche) : vitesse 70-78 kt pendant 4 s.',(s,m,dt)=>{ if(s.h*FT>150&&Math.abs(s.V*KT-74)<4.5){ m.t+=dt; } else m.t=0; return m.t>=4; },s=>{ const k=s.V*KT; return k>78?'Trop vite : tire un peu plus pour monter (augmente l’assiette).':k<70?'Trop lent : baisse un peu le nez.':'Bien ! Garde cette vitesse.'; }],
     ['Rentre les volets (0°) et atteins 1 000 ft.',s=>s.fl===0&&s.h*FT>1000,s=>s.fl>0?'Remets les volets à 0°.':'Continue de monter.']]},
   m2:{t:'Palier et vitesse',steps:[
     ['Monte à 2 000 ft (±100 ft).',s=>Math.abs(s.h*FT-2000)<100,s=>s.h*FT<1900?'Augmente la puissance et tire légèrement.':'Reviens vers 2 000 ft : pousse légèrement.'],
     ['Tiens 2 000 ft (±100 ft) pendant 20 s avec le manche et la puissance.',(s,m,dt)=>{ if(Math.abs(s.h*FT-2000)<100) m.t+=dt; else m.t=Math.max(0,m.t-dt*2); return m.t>=20; },s=>'Vario proche de 0 = palier. Temps tenu : '+Math.round(ms.t)+' s.'],
     ['Réduis la puissance à 50 % en gardant l’altitude. La vitesse baisse : tire un peu pour garder le palier.',(s,m,dt)=>{ if(x.v('thr')<=55&&Math.abs(s.h*FT-2000)<100) m.t+=dt; else m.t=0; return m.t>=10; },s=>'Moins de puissance = moins de vitesse. Pour rester en palier à vitesse plus faible, il faut plus d’incidence.']]},
   m3:{t:'Virage en palier',steps:[
     ['Incline l’avion à 30° (±6°) avec le manche (←  ou →).',s=>Math.abs(s.ph*R2D)>24&&Math.abs(s.ph*R2D)<36,s=>'Inclinaison : '+Math.round(s.ph*R2D)+'°. Stabilise en recentrant le manche.'],
     ['Garde l’altitude (±100 ft) : tire un peu, tu sens la charge G monter.',(s,m,dt)=>{ if(Math.abs(s.ph*R2D)>20&&Math.abs(s.h*FT-2000)<100) m.t+=dt; else if(Math.abs(s.ph*R2D)>20) m.t=Math.max(0,m.t-dt); return m.t>=5; },s=>'Facteur de charge '+s.nz.toFixed(2).replace('.',',')+' G. Vitesse de décrochage dans ce virage ≈ '+Math.round(FM.vstall(s.h,s.fl,Math.max(1,s.nz)))+' kt.'],
     ['Tourne de 90° au total.',(s,m)=>{ m.psi=(m.psi||0); return Math.abs(unwrap(s.psi))>=88*D2R; },s=>'Cap '+Math.round(((s.psi*R2D)+360)%360)+'°. Continue à tourner.'],
     ['Redresse à plat (inclinaison inférieure à 5°).',s=>Math.abs(s.ph*R2D)<5,s=>'Incline en sens inverse pour revenir à plat.']]},
   m4:{t:'Décrochage',steps:[
     ['Réduis la puissance à 0 % (ralenti).',s=>x.v('thr')<=3,s=>'Ramène le curseur Puissance à 0.'],
     ['Garde l’altitude en tirant progressivement : la vitesse diminue.',s=>s.V*KT<62||s.stalled||(s.stalls||0)>0,s=>'Vitesse '+Math.round(s.V*KT)+' kt. Tire doucement (↓) pour ne pas descendre.'],
     ['Continue de tirer jusqu’au décrochage : l’avertisseur, puis le nez qui tombe.',s=>(s.stalls||0)>0,s=>'Incidence '+s.aoa.toFixed(0)+'° (critique ≈ '+FM.acrit(s.fl)+'°). Continue à tirer.'],
     ['Récupère : pousse le manche (↑) pour réduire l’incidence et remets plein gaz.',s=>!s.stalled&&x.v('thr')>=80&&s.aoa<10,s=>'Réduis l’incidence AVANT tout. Puis la puissance.'],
     ['Retrouve 75 kt en palier.',s=>s.V*KT>75&&Math.abs(s.vs*FT*60)<400,s=>'Tu as perdu '+Math.max(0,Math.round(3500-s.h*FT))+' ft. Redresse doucement.']]},
   m5:{t:'Atterrissage',steps:[
     ['Suis la pente de 3° : sur le PAPI, 2 feux blancs et 2 rouges.',(s,m)=>{ const b=Math.atan2(s.h,Math.max(1,320-s.py))*R2D; m.b=b; return s.py>-1500&&Math.abs(b-3)<.7; },(s)=>{ const b=Math.atan2(s.h,Math.max(1,320-s.py))*R2D; return b>3.4?'Trop haut (feux blancs) : réduis la puissance, baisse un peu le nez.':b<2.6?'Trop bas (feux rouges) : ajoute de la puissance et tiens la vitesse.':'Sur la pente ! Garde-la.'; }],
     ['Garde 65 kt (±6 kt) : le manche règle la pente, la puissance règle la vitesse.',s=>s.py>-700&&Math.abs(s.V*KT-65)<6,s=>'Vitesse '+Math.round(s.V*KT)+' kt.'],
     ['Vers 20 ft : arrondi. Tire doucement, réduis la puissance à 0.',s=>s.h*FT<25&&x.v('thr')<=15,s=>s.h*FT<60?'Prépare l’arrondi : réduis les gaz et tire doucement quand tu es à environ 20 ft.':'Continue la finale.'],
     ['Pose-toi en douceur, dans l’axe.',s=>s.ground&&s.td&&s.td.vs<600&&s.td.onRw,s=>'Maintiens l’avion dans l’axe, puis freine.']]}
  };
  const unwrap=a=>{ return a; };
  function missionUpdate(dt){ const m=M[mission]; if(!m.steps.length||s.over||paused) return; const st=m.steps[ms.i]; if(!st) return; if(st[1](s,ms,dt)){ ms.i++; ms.t=0; } }
  function coachHTML(){ const m=M[mission]; if(!m.steps.length) return '<b>Vol libre.</b> Pilote comme tu veux. Observe comment les instruments réagissent à tes commandes.'; const done=ms.i>=m.steps.length; let h='<div class="ct">Leçon : '+m.t+'</div><ol>'; m.steps.forEach((st,i)=>{ h+='<li class="'+(i<ms.i?'ok':i===ms.i?'cur':'')+'">'+st[0]+'</li>'; }); h+='</ol>'; if(done&&!s.over) h+='<div class="bravo">✔ Leçon réussie !</div>'; else if(m.steps[ms.i]) h+='<div class="hint">💡 '+m.steps[ms.i][2](s)+'</div>'; return h; }
  // ---------- boucle ----------
  const instr=()=>{ gi.clearRect(0,0,IW,IH); gi.fillStyle=G.lin(gi,0,0,0,IH,[[0,'#1b222b'],[1,'#10151b']]); gi.fillRect(0,0,IW,IH);
    const kt=s.V*KT, fpm=s.vs*FT*60; gASI(gi,80,86,66,kt); gATT(gi,240,86,66,s.th,s.ph); gALT(gi,400,86,66,s.h*FT); gTURN(gi,80,252,66,s.psiRate||0,s.ball||0); gHDG(gi,240,252,66,((s.psi*R2D)%360+360)%360); gVSI(gi,400,252,66,fpm);
    [['Anémomètre',80,0],['Horizon artificiel',240,0],['Altimètre',400,0],['Virage et bille',80,1],['Conservateur de cap',240,1],['Variomètre',400,1]].forEach(l=>text(gi,l[0],l[1],l[2]?330:164,{s:11,w:'600',a:'center',c:'#9db0c4'})); };
  let uiT=0;
  loop(x,(dt0,t)=>{
    // commandes
    if(!stick.down){ stick.hx+= (0-stick.hx)*Math.min(1,dt0*8); stick.hy+=(0-stick.hy)*Math.min(1,dt0*8); }
    let kx=(keys.ArrowRight?1:0)-(keys.ArrowLeft?1:0), ky=(keys.ArrowDown?1:0)-(keys.ArrowUp?1:0); if(kx||ky){ stick.hx=kx*.6; stick.hy=ky*.45; }
    const dead=v=>Math.abs(v)<.05?0:v;
    const inp={aile:dead(stick.hx),pull:dead(stick.hy),thr:x.v('thr')/100,trim:x.v('trim'),brake};
    if(!paused){ const n=Math.ceil(dt0/.008); for(let i=0;i<n;i++) FM.step(s,inp,dt0/n); missionUpdate(dt0); }
    prop+=dt0;
    if(view==='cock') render3D(t); else renderExt(t);
    // alerte
    if(s.aoa>FM.acrit(s.fl)-2.5&&!s.ground&&!s.stalled&&Math.floor(t*6)%2===0) text(g,'AVERTISSEUR DE DÉCROCHAGE',W/2,38,{s:16,w:'800',a:'center',c:'#ffd23f',sh:1});
    if(s.stalled&&view==='cock'&&Math.floor(t*4)%2===0) text(g,'DÉCROCHAGE',W/2,70,{s:30,w:'800',a:'center',c:'#ff5a4d',sh:1});
    if(s.msg){ g.fillStyle='rgba(8,16,28,.7)'; g.fillRect(W/2-210,H-110,420,56); text(g,s.msg[0]==='ok'?'✔':'✖ '+(s.msg[1].length>60?s.msg[1].slice(0,58)+'…':s.msg[1]),W/2,H-76,{s:14,w:'700',a:'center',c:'#ff8a7d'}); }
    padDraw(); instr();
    if((uiT+=dt0)>.1){ uiT=0;
      const kt=s.V*KT, fpm=Math.round(s.vs*FT*60), hd=Math.round(((s.psi*R2D)%360+360)%360);
      x.q('#'+u+'ro').innerHTML='<div><small>Vitesse air</small><b>'+Math.round(kt)+' kt</b></div><div><small>Altitude</small><b>'+Math.round(s.h*FT)+' ft</b></div><div><small>Variomètre</small><b>'+(fpm>=0?'+':'')+fpm+' ft/min</b></div><div><small>Cap</small><b>'+String(hd).padStart(3,'0')+'°</b></div><div><small>Charge</small><b>'+(s.ground?1:s.nz).toFixed(2).replace('.',',')+' G</b></div><div><small>Incidence</small><b>'+s.aoa.toFixed(0)+'° / '+FM.acrit(s.fl)+'°</b></div><div><small>Vs (décroch.)</small><b>'+Math.round(FM.vstall(s.h,s.fl,Math.max(1,s.ground?1:s.nz)))+' kt</b></div>'+(windMode?'<div><small>Vent</small><b>'+(windMode===1?'de face 12 kt':'de travers 12 kt')+'</b></div>':'');
      x.q('#'+u+'co').innerHTML=coachHTML();
      let c='',m=''; if(s.msg){ c=s.msg[0]; m=s.msg[1]; } else if(s.td&&s.ground&&s.td.vs!==undefined&&!tdShown){ tdShown=true; }
      if(!s.msg&&s.ground&&s.td){ const q=s.td; c=q.vs<350&&q.onRw?'ok':q.vs<700?'warn':'bad'; m='Atterrissage : taux de chute '+q.vs+' ft/min à '+q.kt+' kt'+(q.onRw?'':' (hors de la piste)')+'. '+(q.vs<350?'Très doux : bel arrondi !':q.vs<700?'Correct, mais un arrondi plus tardif et plus doux serait mieux.':'Dur : tire plus au moment de l’arrondi.'); }
      if(!m){ if(s.ground){ m=s.V<1?'Au sol, à l’arrêt. Mets les gaz à 100 % puis, vers 55 kt, tire doucement le manche.':'Roulage : '+Math.round(kt)+' kt. Rotation à 55 kt.'; } else if(s.stalled){ c='bad'; m='Décrochage : l’air ne suit plus l’aile (incidence > '+FM.acrit(s.fl)+'°). Pousse le manche pour réduire l’incidence, puis remets de la puissance.'; } else if(kt<FM.vstall(s.h,s.fl,Math.max(1,s.nz))+6){ c='warn'; m='Vitesse proche du décrochage. Baisse le nez et/ou ajoute de la puissance.'; } else if(fpm>300){ c='ok'; m='Tu montes ('+fpm+' ft/min).'; } else if(fpm<-300){ c='warn'; m='Tu descends ('+(-fpm)+' ft/min).'; } else { c='ok'; m='Vol en palier : la portance équilibre le poids, la traction équilibre la traînée.'; } }
      const vd=x.q('#'+u+'vd'); if(vd._m!==m||vd._c!==c){ vd.className='verdict '+c; vd.textContent=m; vd._m=m; vd._c=c; } }
  });
  root._f={s:()=>s,stick,reset,setMission:v=>{ mission=v; reset(); }};
  reset();
}};
})();
