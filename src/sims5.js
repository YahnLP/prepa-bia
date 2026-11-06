(function(){
const S=window.BIA.sims, G=window.BIA.gfx;
const D2R=Math.PI/180, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function loop(x,fn){ let raf=0,last=null; const f=ts=>{ if(last===null) last=ts; const dt=Math.min(.05,(ts-last)/1000); last=ts; fn(dt,ts/1000); raf=requestAnimationFrame(f); }; raf=requestAnimationFrame(f); x.onCleanup(()=>cancelAnimationFrame(raf)); }
const rnd=(()=>{ let s=1234567; return ()=>{ s=(s*16807)%2147483647; return s/2147483647; }; })();
function text(g,t,x,y,o){ o=o||{}; g.font=(o.w||'600')+' '+(o.s||13)+'px Barlow,Segoe UI,sans-serif'; g.textAlign=o.a||'left'; g.textBaseline='alphabetic'; if(o.sh){ g.lineWidth=3; g.strokeStyle='rgba(8,16,28,.75)'; g.strokeText(t,x,y); } g.fillStyle=o.c||'#fff'; g.fillText(t,x,y); }

/* ======================= MOTEURS ======================= */
S.engine={title:'Moteur à pistons et turboréacteur', th:'t3', ch:'3-2',
desc:'Regarde de l’intérieur comment un moteur transforme le carburant en mouvement. Change la vitesse, mets en pause, avance temps par temps.',
try:['Moteur à pistons : avance temps par temps et repère l’unique temps qui pousse le piston.','Observe la courbe de pression : elle monte à la compression, explose à la combustion.','Turboréacteur : monte la manette et regarde l’air changer de couleur (froid → brûlant) puis sortir vite par la tuyère.'],
mount(root,x){
  root.innerHTML=x.seg('type',[['piston','Moteur à pistons'],['jet','Turboréacteur']],'piston')+'<div style="height:10px"></div><canvas id="'+x.uid+'c" role="img" aria-label="Coupe animée d’un moteur"></canvas><div id="'+x.uid+'ctl"></div><div class="ph" id="'+x.uid+'ph"></div><div class="readout" id="'+x.uid+'ro"></div><div class="verdict" id="'+x.uid+'v"></div>';
  const cv=x.q('#'+x.uid+'c'), W=640, Hh=400, g=G.setup(cv,W,Hh);
  let mode='piston', phi=0, paused=false, stepTo=null, speed=.35, thr=.5, phase=0, lastStroke=-1;
  const P=[]; for(let i=0;i<70;i++) P.push({x:rnd(),y:rnd()*2-1,v:.6+rnd()*.8});
  const strokes=[['1','Admission','Le piston descend et aspire le mélange air + essence par la soupape d’admission.'],['2','Compression','Les deux soupapes sont fermées : le piston monte et comprime le mélange. La pression augmente.'],['3','Combustion-détente','La bougie fait une étincelle, le mélange brûle et se dilate : il repousse violemment le piston. C’est le seul temps moteur.'],['4','Échappement','La soupape d’échappement s’ouvre : le piston remonte et chasse les gaz brûlés.']];
  function ctl(){ const c=x.q('#'+x.uid+'ctl'); if(mode==='piston'){ c.innerHTML=x.r('sp','Vitesse du moteur',5,100,1,Math.round(speed*100),' %')+'<div class="row" style="margin:6px 0"><button type="button" class="btn sec sm" data-a="pause">'+(paused?'▶ Reprendre':'⏸ Pause')+'</button><button type="button" class="btn sec sm" data-a="step">⏭ Temps suivant</button></div>'; x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); o.textContent=i.value+' %'; speed=i.value/100; })); }
    else { c.innerHTML=x.r('th','Manette des gaz',0,100,1,Math.round(thr*100),' %'); x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); o.textContent=i.value+' %'; thr=i.value/100; })); }
    const ph=x.q('#'+x.uid+'ph'); ph.innerHTML=mode==='piston'?'<div class="chips4">'+strokes.map((s,i)=>'<div class="st" data-i="'+i+'"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>').join('')+'</div>':'<div class="chips4">'+[['1','Compresseur'],['2','Chambre'],['3','Turbine'],['4','Tuyère']].map(s=>'<div class="st on"><b>'+s[0]+'</b><span>'+s[1]+'</span></div>').join('')+'</div>'; lastStroke=-1; }
  ctl();
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-a]'); if(!b) return; if(b.dataset.a==='pause'){ paused=!paused; stepTo=null; b.textContent=paused?'▶ Reprendre':'⏸ Pause'; } else { paused=false; stepTo=(Math.floor(phi/180)+1)*180; x.q('[data-a=pause]').textContent='⏸ Pause'; } });
  x.segBind('type',v=>{ mode=v; ctl(); });
  // ---- dessin du moteur à pistons ----
  const cx=320, ccy=335, cr=46, rl=118;
  function pist(a){ const A=a*D2R; return ccy-(cr*Math.cos(A)+Math.sqrt(rl*rl-cr*cr*Math.sin(A)*Math.sin(A))); }
  function drawPiston(dt){
    if(stepTo!==null){ const d=(stepTo-phi); const inc=Math.min(d,260*dt); phi+=inc; if(stepTo-phi<=.01){ phi=stepTo; stepTo=null; paused=true; x.q('[data-a=pause]').textContent='▶ Reprendre'; } }
    else if(!paused) phi+=360*(.25+speed*2.2)*dt*0.5;
    phi=phi%720; const a=phi%360, stroke=Math.floor(phi/180), pin=pist(a), crown=pin-52;
    g.clearRect(0,0,W,Hh); g.fillStyle=G.lin(g,0,0,0,Hh,[[0,'#0e1926'],[1,'#1c2c40']]); g.fillRect(0,0,W,Hh);
    const bx0=cx-72, bx1=cx+72, top=96;
    // ports
    const iv=stroke===0, ev=stroke===3;
    g.fillStyle=G.metal(g,0,30,0,70); g.fillRect(70,40,222,26); g.fillRect(348,40,222,26);
    g.fillStyle='#0b131d'; g.fillRect(74,44,214,18); g.fillRect(352,44,214,18);
    // bloc moteur + ailettes
    g.fillStyle=G.metal(g,bx0-34,0,bx0,0); g.fillRect(bx0-34,top-20,34,230); g.fillStyle=G.metal(g,bx1,0,bx1+34,0); g.fillRect(bx1,top-20,34,230);
    g.fillStyle='rgba(10,20,30,.55)'; for(let i=0;i<9;i++){ g.fillRect(bx0-34,top+i*22,34,3); g.fillRect(bx1,top+i*22,34,3); }
    g.fillStyle=G.metal(g,0,top-30,0,top); g.fillRect(bx0-34,top-30,bx1-bx0+68,12); g.fillRect(bx0-34,top-18,bx1-bx0+68,18);
    // chambre
    g.save(); g.beginPath(); g.rect(bx0,top,bx1-bx0,crown-top); g.clip();
    g.fillStyle='#0b131d'; g.fillRect(bx0,top,bx1-bx0,300);
    let gasCol, dens;
    const prog=(a)/180; // 0..1 dans le temps
    if(stroke===0){ gasCol='rgba(110,185,255,'+(.14+.14*prog)+')'; dens=.25+.4*prog; }
    else if(stroke===1){ gasCol='rgba(120,160,255,'+(.3+.35*prog)+')'; dens=.65+.35*prog; }
    else if(stroke===2){ const f=prog; gasCol='rgba('+Math.round(255-60*f)+','+Math.round(150-60*f)+','+Math.round(60+20*f)+','+(.65-.25*f)+')'; dens=.9-.5*f; }
    else { gasCol='rgba(150,155,160,'+(.45-.2*prog)+')'; dens=.5-.3*prog; }
    g.fillStyle=gasCol; g.fillRect(bx0,top,bx1-bx0,crown-top);
    if(stroke===2){ const f=Math.min(1,prog*3.2); const rr=20+110*f; g.fillStyle=G.rad(g,cx,top+4,2,rr,[[0,'rgba(255,255,230,'+(1-.6*f)+')'],[.35,'rgba(255,196,80,'+(.85-.5*f)+')'],[1,'rgba(255,90,20,0)']]); g.fillRect(bx0,top,bx1-bx0,crown-top); }
    const vol=Math.max(0,crown-top); for(let i=0;i<Math.floor(dens*46);i++){ const px=bx0+4+rnd()*(bx1-bx0-8), py=top+3+rnd()*Math.max(1,vol-6); g.fillStyle=stroke===2?'rgba(255,230,160,.8)':stroke===3?'rgba(200,205,210,.55)':'rgba(190,225,255,.7)'; g.fillRect(px,py,2,2); }
    g.restore();
    // soupapes
    const valve=(vx,open,col)=>{ const dy=open?16:0; g.fillStyle=G.metal(g,vx-3,0,vx+3,0); g.fillRect(vx-2.5,top-34,5,34+dy); g.fillStyle=col; g.beginPath(); g.moveTo(vx-17,top+dy+1); g.lineTo(vx+17,top+dy+1); g.lineTo(vx+10,top+dy-5); g.lineTo(vx-10,top+dy-5); g.closePath(); g.fill(); g.strokeStyle='rgba(235,240,246,.8)'; g.lineWidth=2; g.beginPath(); g.moveTo(vx-9,top-30); for(let k=0;k<6;k++) g.lineTo(vx+(k%2?-9:9),top-30+k*(10-(open?1.5:0))); g.stroke(); };
    valve(cx-38,iv,'#7fc4ff'); valve(cx+38,ev,'#ff9a57');
    // bougie
    const fire=stroke===2&&prog<.14; g.fillStyle=G.metal(g,cx-6,0,cx+6,0); g.fillRect(cx-6,top-44,12,34); g.fillStyle='#e9eef3'; g.fillRect(cx-7,top-30,14,12); g.fillStyle='#d6dde6'; g.fillRect(cx-3,top-10,6,12);
    if(fire){ g.fillStyle=G.rad(g,cx,top+6,0,46,[[0,'rgba(255,255,255,1)'],[.3,'rgba(255,240,150,.9)'],[1,'rgba(255,200,60,0)']]); g.fillRect(cx-50,top-40,100,90); }
    // flux dans les conduits
    const flow=(path,col,on,dir)=>{ if(!on) return; for(let i=0;i<14;i++){ const t=((phase*(dir?1:1)+i/14)%1); const L=path.length-1; const u=t*L, k=Math.min(L-1,Math.floor(u)), f=u-k; const px=path[k][0]+(path[k+1][0]-path[k][0])*f, py=path[k][1]+(path[k+1][1]-path[k][1])*f; g.fillStyle=col; g.beginPath(); g.arc(px,py,2.6,0,7); g.fill(); } };
    phase=(phase+dt*.9*(paused&&stepTo===null?0:1))%1;
    flow([[90,53],[200,53],[cx-38,53],[cx-38,top+4],[cx-38,top+40]],'#8fd0ff',iv); flow([[cx+38,top+40],[cx+38,top+4],[cx+38,53],[470,53],[560,53]],'#c3c7cc',ev);
    // piston + segments
    g.fillStyle=G.lin(g,bx0,0,bx1,0,[[0,'#7b8796'],[.3,'#e6ecf2'],[.55,'#a8b3c0'],[1,'#667282']]); g.fillRect(bx0+2,crown,bx1-bx0-4,76); g.fillStyle='rgba(20,30,45,.55)'; [6,12,18].forEach(o=>g.fillRect(bx0+2,crown+o,bx1-bx0-4,2)); g.fillStyle='#202a36'; g.beginPath(); g.arc(cx,pin,7,0,7); g.fill(); g.fillStyle='#8f9ba9'; g.beginPath(); g.arc(cx,pin,3,0,7); g.fill();
    // bielle + manivelle
    const A=a*D2R, px=cx+cr*Math.sin(A), py=ccy-cr*Math.cos(A);
    g.fillStyle='rgba(8,14,22,.9)'; g.fillRect(bx0-34,top+210,bx1-bx0+68,100);
    g.strokeStyle=G.metal(g,0,0,10,0); g.lineWidth=13; g.lineCap='round'; g.strokeStyle='#9aa6b4'; g.beginPath(); g.moveTo(cx,pin); g.lineTo(px,py); g.stroke(); g.lineWidth=7; g.strokeStyle='#cfd7e0'; g.beginPath(); g.moveTo(cx,pin); g.lineTo(px,py); g.stroke();
    g.save(); g.translate(cx,ccy); g.rotate(A); g.fillStyle='#6f7b89'; g.beginPath(); g.moveTo(-18,0); g.arc(0,0,18,Math.PI,0); g.arc(0,-cr,13,0,Math.PI); g.closePath(); g.fill(); g.fillStyle='#4a5563'; g.beginPath(); g.ellipse(0,cr*.92,33,24,0,0,7); g.fill(); g.restore();
    g.fillStyle='#b9c3ce'; g.beginPath(); g.arc(px,py,8,0,7); g.fill(); g.fillStyle='#5b6674'; g.beginPath(); g.arc(cx,ccy,10,0,7); g.fill();
    // courbe de pression
    const pr=[.18,.22,.3,.55,1,.9].length; const pAt=(p)=>{ if(p<180) return .15+.06*(p/180); if(p<360){ const f=(p-180)/180; return .22+.55*f*f*f; } if(p<540){ const f=(p-360)/180; return f<.08?(.77+3*f/.08*.077):1*Math.pow(1-f,1.4)+.2; } const f=(p-540)/180; return .22-.05*f; };
    const gx=470,gy=190,gw=150,gh=100; g.fillStyle='rgba(255,255,255,.06)'; g.fillRect(gx,gy,gw,gh); g.strokeStyle='rgba(255,255,255,.25)'; g.lineWidth=1; g.strokeRect(gx,gy,gw,gh);
    g.strokeStyle='#ffb02e'; g.lineWidth=2; g.beginPath(); for(let p=0;p<=720;p+=10){ const X=gx+p/720*gw, Y=gy+gh-clamp(pAt(p),0,1.05)*gh*.92-4; p?g.lineTo(X,Y):g.moveTo(X,Y); } g.stroke();
    g.fillStyle='#fff'; g.beginPath(); g.arc(gx+phi/720*gw,gy+gh-clamp(pAt(phi),0,1.05)*gh*.92-4,4.5,0,7); g.fill();
    [1,2,3].forEach(i=>{ g.strokeStyle='rgba(255,255,255,.18)'; g.beginPath(); g.moveTo(gx+i*gw/4,gy); g.lineTo(gx+i*gw/4,gy+gh); g.stroke(); });
    text(g,'Pression dans le cylindre',gx,gy-8,{s:12,c:'#d7e1ec'}); text(g,'1',gx+gw/8,gy+gh+14,{s:11,a:'center',c:'#9db0c4'}); text(g,'2',gx+3*gw/8,gy+gh+14,{s:11,a:'center',c:'#9db0c4'}); text(g,'3',gx+5*gw/8,gy+gh+14,{s:11,a:'center',c:'#9db0c4'}); text(g,'4',gx+7*gw/8,gy+gh+14,{s:11,a:'center',c:'#9db0c4'});
    text(g,'admission',90,34,{s:12,c:'#8fd0ff'}); text(g,'échappement',470,34,{s:12,c:'#ffb27a'}); text(g,'bougie',cx,top-52,{s:12,a:'center',c:'#e9eef3'});
    text(g,'Temps '+strokes[stroke][0]+'/4 · '+strokes[stroke][1],16,388,{s:15,w:'700',sh:1});
    if(stroke===2) text(g,'⟲ TEMPS MOTEUR',cx+90,ccy+6,{s:12,w:'700',c:'#ffd27a',sh:1});
    if(stroke!==lastStroke){ lastStroke=stroke; x.qa('#'+x.uid+'ph .st').forEach(e=>e.classList.toggle('on',+e.dataset.i===stroke)); x.q('#'+x.uid+'v').className='verdict'; x.q('#'+x.uid+'v').textContent=strokes[stroke][2]; }
    const rpm=Math.round((.25+speed*2.2)*0.5*60*3); x.q('#'+x.uid+'ro').innerHTML='<div><small>Position du vilebrequin</small><b>'+Math.round(phi)+'°</b></div><div><small>Cycle complet</small><b>2 tours (720°)</b></div><div><small>Tours moteur affichés</small><b>≈ '+(paused?0:Math.round(speed*100*.9))+' tr/min</b></div>';
  }
  // ---- turboréacteur ----
  const AX=205;
  const casing=xx=>{ const pts=[[40,104],[110,92],[150,82],[250,60],[300,66],[350,72],[420,64],[470,56],[530,40],[600,36]]; for(let i=0;i<pts.length-1;i++){ if(xx<=pts[i+1][0]){ const f=(xx-pts[i][0])/(pts[i+1][0]-pts[i][0]); return pts[i][1]+(pts[i+1][1]-pts[i][1])*Math.max(0,f); } } return 36; };
  const hub=xx=>xx<140?14+ (xx-70)*.05:xx<250?18+(xx-140)*.1:xx<330?26:xx<430?26:xx<600?26-(xx-430)*.06:14;
  function drawJet(dt){
    phase+=dt*(.6+thr*4.5); const rotor=phase*14;
    g.clearRect(0,0,W,Hh); g.fillStyle=G.lin(g,0,0,0,Hh,[[0,'#0e1926'],[1,'#1c2c40']]); g.fillRect(0,0,W,Hh);
    // flux d'air coloré
    const col=G.lin(g,40,0,600,0,[[0,'rgba(122,196,255,.55)'],[.2,'rgba(122,196,255,.55)'],[.38,'rgba(120,225,200,.6)'],[.48,'rgba(255,226,140,.8)'],[.56,'rgba(255,150,60,.9)'],[.72,'rgba(255,120,40,.75)'],[1,'rgba(255,170,110,.4)']]);
    g.fillStyle=col; g.beginPath(); for(let X=60;X<=600;X+=6) g.lineTo(X,AX-casing(X)+5); for(let X=600;X>=60;X-=6) g.lineTo(X,AX+casing(X)-5); g.closePath(); g.fill();
    // jet de flamme à l'extérieur
    if(thr>.05){ const L=40+170*thr, fl=.85+.15*Math.sin(phase*40); g.fillStyle=G.lin(g,600,0,600+L,0,[[0,'rgba(255,214,120,.85)'],[.35,'rgba(255,130,50,.6)'],[1,'rgba(255,90,30,0)']]); g.beginPath(); g.moveTo(598,AX-34); g.quadraticCurveTo(600+L*.7*fl,AX-22,600+L*fl,AX); g.quadraticCurveTo(600+L*.7*fl,AX+22,598,AX+34); g.closePath(); g.fill(); }
    // chambre : flamme
    const fl2=g.createLinearGradient(260,0,350,0); g.fillStyle=G.rad(g,320,AX,4,70,[[0,'rgba(255,255,230,'+(.35+.55*thr)+')'],[.5,'rgba(255,170,60,'+(.35+.4*thr)+')'],[1,'rgba(255,90,20,0)']]); g.fillRect(255,AX-70,110,140);
    // arbre
    g.fillStyle=G.metal(g,0,AX-12,0,AX+12); g.fillRect(100,AX-11,330,22);
    // carter
    const shell=(sgn)=>{ g.fillStyle=G.lin(g,0,AX-110*sgn,0,AX-30*sgn,[[0,'#5d6876'],[.5,'#d1d9e2'],[1,'#7d8997']]); g.beginPath(); g.moveTo(40,AX-sgn*(casing(40)+10)); for(let X=40;X<=600;X+=6) g.lineTo(X,AX-sgn*(casing(X)+10)); for(let X=600;X>=40;X-=6) g.lineTo(X,AX-sgn*(casing(X)-2)); g.closePath(); g.fill(); g.strokeStyle='rgba(8,16,26,.8)'; g.lineWidth=1; g.stroke(); };
    shell(1); shell(-1);
    // moyeu
    g.fillStyle=G.metal(g,0,AX-30,0,AX+30); g.beginPath(); g.moveTo(70,AX); for(let X=70;X<=600;X+=6) g.lineTo(X,AX-hub(X)); for(let X=600;X>=70;X-=6) g.lineTo(X,AX+hub(X)); g.closePath(); g.fill();
    // aubes
    const row=(x0,n,len,rot,colr)=>{ for(const s of [1,-1]){ for(let k=0;k<n;k++){ const yy=((k/n+rot*.18)%1); const hh=hub(x0), cc=casing(x0)-4; const y0=hh+3; const L=cc-y0; const ph=Math.abs(Math.cos((k/n+rot*.12)*Math.PI*2)); g.fillStyle=colr; g.globalAlpha=.25+.75*ph; g.fillRect(x0-1.5,AX+s*(y0),3,s*L*.0+L*s*.0+ (s>0?L:-L)); g.globalAlpha=1; } } };
    for(let i=0;i<6;i++){ const x0=140+i*20; g.fillStyle='#3d4856'; g.fillRect(x0+8,AX-casing(x0+8)+4,2.5,casing(x0+8)-hub(x0+8)-6); g.fillRect(x0+8,AX+hub(x0+8)+2,2.5,casing(x0+8)-hub(x0+8)-6); row(x0,5,0,rotor+i*.4,'#9fb4c8'); }
    row(104,7,0,rotor,'#cfe0f0');
    for(let i=0;i<3;i++){ const x0=352+i*22; row(x0,5,0,rotor*1.2+i*.3,'#f0b27a'); g.fillStyle='#4a2a1c'; g.fillRect(x0+9,AX-casing(x0+9)+4,2.5,casing(x0+9)-hub(x0+9)-6); g.fillRect(x0+9,AX+hub(x0+9)+2,2.5,casing(x0+9)-hub(x0+9)-6); }
    // injecteurs
    [-1,1].forEach(s=>{ g.fillStyle='#c8d0da'; g.fillRect(300,AX+s*(casing(300)-6)-(s>0?-1:8),6,8); g.fillStyle='#ffb02e'; for(let k=0;k<3;k++) g.fillRect(302,AX+s*(casing(300)-22-k*7),2,3); });
    // particules
    P.forEach(p=>{ const sp=(.18+thr*.9)*(p.x<.2?1:p.x<.45?1.4:p.x<.6?2.2:p.x<.8?3:4.5)*p.v; p.x+=sp*dt*.5; if(p.x>1.05){ p.x=0; p.y=rnd()*2-1; p.v=.6+rnd()*.8; } const X=60+p.x*540, c=casing(X)-8, h=hub(X)+4, Y=AX+(p.y>0?1:-1)*(h+(c-h)*Math.abs(p.y)); g.fillStyle=X<190?'rgba(210,235,255,.85)':X<330?'rgba(210,255,235,.85)':'rgba(255,240,200,.9)'; g.beginPath(); g.arc(X,Y,2,0,7); g.fill(); });
    // vue de face
    const fx=572, fy=84, fr=42; g.save(); g.fillStyle='#0a131d'; g.beginPath(); g.arc(fx,fy,fr+8,0,7); g.fill(); g.fillStyle=G.rad(g,fx,fy,4,fr+6,[[0,'#2b3644'],[1,'#6f7c8b']]); g.beginPath(); g.arc(fx,fy,fr+4,0,7); g.fill(); g.clip(); g.translate(fx,fy); g.rotate(rotor*.9);
    for(let k=0;k<20;k++){ g.rotate(2*Math.PI/20); g.fillStyle=G.lin(g,0,0,0,-fr,[[0,'#5d6a79'],[1,'#e8eef5']]); g.beginPath(); g.moveTo(-1.5,-9); g.quadraticCurveTo(10,-fr*.6,6,-fr); g.lineTo(-3,-fr); g.quadraticCurveTo(0,-fr*.6,-3.5,-9); g.closePath(); g.fill(); }
    g.fillStyle=G.rad(g,0,0,1,12,[[0,'#f5f7fa'],[1,'#7d8997']]); g.beginPath(); g.arc(0,0,11,0,7); g.fill(); g.restore();
    text(g,'Vue de face',fx,fy+fr+22,{s:11,a:'center',c:'#9db0c4'}); text(g,'N1 ≈ '+Math.round(30+70*thr)+' %',fx,fy+fr+36,{s:12,a:'center',c:'#e9eef3'});
    // étiquettes
    const lab=(t,X,Y,tx)=>{ g.strokeStyle='rgba(255,255,255,.55)'; g.lineWidth=1; g.beginPath(); g.moveTo(X,Y); g.lineTo(X,Y-(Y>AX?-1:1)*18); g.stroke(); text(g,t,X,Y-(Y>AX?-1:1)*(Y>AX?-34:24)+ (Y>AX?0:0),{s:13,w:'700',a:'center',sh:1}); };
    lab('1 Compresseur',185,AX-casing(185)-10,0); lab('2 Chambre',310,AX-casing(310)-10,0); lab('3 Turbine',385,AX+casing(385)+10,0); lab('4 Tuyère',470,AX-casing(500)-10,0);
    text(g,'Air froid',66,AX+130,{s:12,c:'#8fd0ff'}); text(g,'Gaz brûlants et rapides →',380,AX+112,{s:12,c:'#ffb27a'});
    const T=Math.round(550+800*thr), F=Math.round(Math.pow(thr,1.15)*100);
    x.q('#'+x.uid+'ro').innerHTML='<div><small>Régime N1</small><b>'+Math.round(30+70*thr)+' %</b></div><div><small>Température turbine</small><b>≈ '+T+' °C</b></div><div><small>Poussée</small><b>'+F+' %</b></div>';
    const v=x.q('#'+x.uid+'v'); v.className='verdict'; v.textContent=thr<.15?'Ralenti : le moteur tourne mais pousse très peu.':'1 · Le compresseur comprime l’air (bleu → vert) · 2 · Dans la chambre on injecte du carburant : la flamme chauffe l’air · 3 · La turbine récupère une partie de l’énergie pour entraîner le compresseur · 4 · Les gaz sortent très vite par la tuyère : par réaction, l’avion est poussé vers l’avant.';
  }
  loop(x,dt=>{ if(mode==='piston') drawPiston(dt); else drawJet(dt); });
}};
/* ======================= SIMULATEUR DE VOL ======================= */
S.flight={title:'Simulateur de vol : pilote ton avion', th:'t2', ch:'2-4',
desc:'Tu as la puissance et le manche. Décolle, monte, tiens ton altitude et pose-toi sur la piste. Les flèches montrent les quatre forces en direct.',
try:['Au sol : mets 100 % de puissance, attends environ 40 nœuds puis tire le manche (assiette +8°) pour décoller.','En croisière : baisse l’assiette sans toucher à la puissance. Que devient la vitesse ? Et si tu tires trop, que se passe-t-il à l’incidence 15° ?','Approche : suis la pente avec le PAPI (2 blancs + 2 rouges). Trop haut : 4 blancs, trop bas : 4 rouges.'],
mount(root,x){
  root.innerHTML=x.seg('sc',[['to','Décollage'],['cr','Croisière'],['ap','Approche']],'to')+'<div style="height:10px"></div><canvas id="'+x.uid+'c" role="img" aria-label="Avion en vol vu de côté"></canvas>'+x.r('thr','Puissance moteur',0,100,1,0,' %')+x.r('pit','Manche : assiette visée',-10,18,1,0,'°')+'<div class="row" style="margin:6px 0"><button type="button" class="btn sec sm" data-a="flaps" aria-pressed="false">Volets : rentrés</button><button type="button" class="btn sec sm" data-a="forces" aria-pressed="true">Forces : visibles</button><button type="button" class="btn sec sm" data-a="reset">↺ Recommencer</button></div><div class="readout" id="'+x.uid+'ro"></div><div class="verdict" id="'+x.uid+'v"></div>';
  const cv=x.q('#'+x.uid+'c'), W=640, H=360, g=G.setup(cv,W,H);
  const K=.0156, GR=9.81; const RW=[0,1800];
  let st=null, flaps=false, forces=true, sc='to', msg=null, msgT=0, shake=0, prop=0;
  function reset(){ const s=sc; flaps=(s==='ap'); st={x:s==='to'?60:s==='cr'?-4200:-3200, h:s==='to'?0:s==='cr'?450:170, V:s==='to'?0:s==='cr'?51.4:33, gam:0, th:s==='to'?0:s==='cr'?.9:-2.7, ground:s==='to', stalled:false, over:false}; msg=null;
    x.setv('thr',s==='to'?0:s==='cr'?84:37); x.setv('pit',s==='to'?0:s==='cr'?1:-3); if(s==='ap'){ st.gam=-3*D2R; } x.q('[data-a=flaps]').textContent='Volets : '+(flaps?'sortis':'rentrés'); x.q('[data-a=flaps]').setAttribute('aria-pressed',flaps); }
  function CL(a){ let c=a<=14?0.1*(a+1.5):Math.max(.6,1.55-.18*(a-14)); return c+(flaps?.4:0); }
  function step(dt){ const thr=x.v('thr')/100, pc=x.v('pit'); const s=st; if(s.over) return;
    const V=Math.max(s.V,.1);
    if(s.ground){ const rot=s.V>16?1:0; const tgt=rot?clamp(pc,0,12):0; s.th+=(tgt-s.th)*Math.min(1,dt*4); const a=s.th; const L=K*V*V*CL(a)*(a>=0?1:1); const Tm=thr*3.2*(1-s.V/120)+ (thr>.05?.4:0); const D=K*V*V*(.04+(flaps?.03:0))+.5+(thr<.05?1.6:0)*(s.V>1?1:0); s.V=Math.max(0,s.V+(Tm-(s.V>.5?D:0))*dt); s.x+=s.V*dt; s.gam=0;
      if(L>GR*1.0&&s.th>2.5){ s.ground=false; s.gam=.02; } if(s.x>RW[1]+400&&s.ground){ s.over=true; msg=['bad','Sortie de piste : tu as dépassé la fin de la piste. Pense à réduire la puissance pour freiner.']; } return; }
    const gd=s.gam/D2R; let aoa=s.th-gd;
    if(!s.stalled&&aoa>14) s.stalled=true; if(s.stalled&&aoa<9) s.stalled=false;
    let tgt=pc; if(s.stalled) tgt=Math.min(pc,aoa<0?pc:s.th-14*dt*6);
    s.th+=(s.stalled?-12*dt:(tgt-s.th)*Math.min(1,dt*3));
    aoa=s.th-gd; const cl=CL(aoa), L=K*V*V*cl, Dd=K*V*V*(.035+(flaps?.03:0)+.045*cl*cl*(s.stalled?1.6:1)), T=thr*3.2*(1-V/120), a=aoa*D2R;
    s.V=Math.max(3,s.V+(T*Math.cos(a)-Dd-GR*Math.sin(s.gam))*dt); s.gam+=((L+T*Math.sin(a))/V-GR*Math.cos(s.gam)/V)*dt; s.gam=clamp(s.gam,-1.2,1.2);
    s.h+=s.V*Math.sin(s.gam)*dt; s.x+=s.V*Math.cos(s.gam)*dt; s._L=L; s._D=Dd; s._T=T; s._aoa=aoa;
    if(s.h<=0){ s.h=0; const vs=-s.V*Math.sin(s.gam); const onRw=s.x>=RW[0]-20&&s.x<=RW[1]; if(vs<3.4&&s.V<46&&s.th>-3&&s.th<13&&onRw){ s.ground=true; s.gam=0; msg=['ok','Posé ! Atterrissage réussi : vitesse '+Math.round(s.V*1.944)+' nœuds, taux de chute '+Math.round(vs*196.85)+' ft/min. Mets la puissance à zéro pour freiner.']; } else { s.over=true; shake=.4; msg=['bad',!onRw?'Tu as touché le sol hors de la piste.':vs>=3.4?'Contact trop brutal ('+Math.round(vs*196.85)+' ft/min). Vise un taux de chute doux et arrondis juste avant le sol.':s.V>=46?'Tu es trop rapide au contact.':'Mauvaise assiette au contact.']; } } }
  function papi(){ const s=st; if(s.ground||s.x>=0||s.x<-6000) return null; const ang=Math.atan2(s.h,-s.x)/D2R; return {ang,w:[2.5,2.83,3.17,3.5].filter(t=>ang>t).length}; }
  function draw(t){ const s=st, sx=2.2; const gy=190+s.h*.3; shake=Math.max(0,shake-.02);
    G.sky(g,W,gy>H?H:gy,Math.min(gy,H)); const cl=[[0,40,1.2],[1,92,.9],[2,60,1.5],[3,130,.8],[4,28,1],[5,104,1.1]]; cl.forEach(c=>{ const cxp=((c[0]*230-s.x*.5)%1380+1380)%1380-180; G.cloud(g,cxp,c[1]+s.h*.05,c[2],.92); });
    G.land(g,W,H,gy,s.x*sx,{runway:[RW[0]*sx,RW[1]*sx]});
    G.shadow(g,200,gy+5,44*(1-Math.min(.6,s.h/500)),.28*(1-Math.min(1,s.h/260)));
    const thr=x.v('thr')/100; prop+=dt0*(8+thr*60); const jx=s.stalled||shake? (Math.random()-.5)*3:0, jy=s.stalled||shake?(Math.random()-.5)*3:0; const px=200+jx, py=150+jy;
    G.plane(g,px,py,1.05,-s.th*D2R,{prop,thr,flaps:flaps?1:0});
    if(forces&&!s.over){ const aoa=s._aoa||s.th; const arrow=(dx,dy,c,lab)=>{ const len=Math.hypot(dx,dy); if(len<3) return; g.strokeStyle=c; g.fillStyle=c; g.lineWidth=3; g.lineCap='round'; g.beginPath(); g.moveTo(px-4,py-3); g.lineTo(px-4+dx,py-3+dy); g.stroke(); const an=Math.atan2(dy,dx); g.beginPath(); g.moveTo(px-4+dx,py-3+dy); g.lineTo(px-4+dx-9*Math.cos(an-.45),py-3+dy-9*Math.sin(an-.45)); g.lineTo(px-4+dx-9*Math.cos(an+.45),py-3+dy-9*Math.sin(an+.45)); g.closePath(); g.fill(); text(g,lab,px-4+dx+(dx>=0?6:-6),py-3+dy+(dy<0?-4:12),{s:11,a:dx>=0?'left':'right',sh:1,c}); };
      const gamC=s.gam, ca=Math.cos(-s.th*D2R), sa=Math.sin(-s.th*D2R);
      const Lm=s.ground?K*s.V*s.V*CL(s.th):(s._L||GR), Dm=s.ground?.6:(s._D||0), Tm=s.ground?thr*3.2*(1-s.V/120):(s._T||0);
      const u=34/GR; arrow(0,-Lm*u,'#37d6a4','portance'); arrow(0,GR*u,'#6cb4ff','poids'); arrow(Tm*u*3,0,'#ffb02e','traction'); arrow(-Dm*u*3,0,'#ff6f61','traînée'); }
    // flèche du vent relatif
    if(!s.ground&&!s.over){ g.setLineDash([5,5]); g.strokeStyle='rgba(255,255,255,.8)'; g.lineWidth=1.5; const ga=-s.gam; g.beginPath(); g.moveTo(px+84,py+2); g.lineTo(px+84+70*Math.cos(ga),py+2+70*Math.sin(ga)); g.stroke(); g.setLineDash([]); text(g,'trajectoire',px+84+72*Math.cos(ga),py+2+72*Math.sin(ga)+4,{s:10,w:'500',sh:1}); }
    // bandeau vitesse
    const kt=s.V*1.944; g.fillStyle='rgba(8,16,28,.55)'; g.fillRect(14,12,196,36); const bx=22,bw=180; const kx=v=>bx+bw*v/140; g.fillStyle='#fff'; g.fillRect(kx(38),30,kx(80)-kx(38),5); g.fillStyle='#37d6a4'; g.fillRect(kx(48),24,kx(110)-kx(48),5); g.fillStyle='#ffd23f'; g.fillRect(kx(110),24,kx(129)-kx(110),5); g.fillStyle='#ff6f61'; g.fillRect(kx(129),24,kx(140)-kx(129),5); g.fillStyle='#fff'; g.beginPath(); g.moveTo(kx(Math.min(140,kt)),38); g.lineTo(kx(Math.min(140,kt))-5,46); g.lineTo(kx(Math.min(140,kt))+5,46); g.fill(); text(g,Math.round(kt)+' kt',bx,21,{s:12,w:'700'});
    // PAPI
    const pp=papi(); if(pp){ g.fillStyle='rgba(8,16,28,.6)'; g.fillRect(W-132,12,118,60); [0,1,2,3].forEach(i=>{ const white=i<pp.w; g.fillStyle=white?'#fff':'#ff3b30'; g.shadowColor=white?'#fff':'#ff3b30'; g.shadowBlur=10; g.beginPath(); g.arc(W-112+i*27,38,9,0,7); g.fill(); g.shadowBlur=0; }); text(g,'PAPI · pente '+pp.ang.toFixed(1)+'°',W-125,66,{s:11,w:'600'}); }
    if(s.stalled&&Math.floor(t*4)%2===0) text(g,'DÉCROCHAGE',W/2,70,{s:30,w:'800',a:'center',c:'#ff5a4d',sh:1});
    if(msg) { g.fillStyle='rgba(8,16,28,.7)'; g.fillRect(W/2-190,H-70,380,44); text(g,msg[0]==='ok'?'✔ Atterrissage réussi':'✖ Raté',W/2,H-42,{s:20,w:'800',a:'center',c:msg[0]==='ok'?'#37d6a4':'#ff6f61'}); }
  }
  let dt0=.016, tt=0;
  loop(x,(dt,t)=>{ dt0=dt; tt=t; const n=Math.ceil(dt/.008); for(let i=0;i<n;i++) step(dt/n); draw(t);
    const s=st; const vs=s.ground?0:s.V*Math.sin(s.gam)*196.85, aoa=s.ground?s.th:(s._aoa||0); const kt=s.V*1.944;
    x.q('#'+x.uid+'ro').innerHTML='<div><small>Vitesse</small><b>'+Math.round(kt)+' kt</b></div><div><small>Altitude</small><b>'+Math.round(s.h*3.281)+' ft</b></div><div><small>Montée</small><b>'+(vs>=0?'+':'')+Math.round(vs)+' ft/min</b></div><div><small>Incidence</small><b>'+aoa.toFixed(0)+'°</b></div>';
    const v=x.q('#'+x.uid+'v'); let c='',m='';
    if(msg){ c=msg[0]==='ok'?'ok':'bad'; m=msg[1]; }
    else if(s.ground){ c=''; m=s.V<2?'Au sol, à l’arrêt. Mets les gaz (100 %), puis tire le manche quand tu atteins environ 40 nœuds.':'Roulage : vitesse '+Math.round(kt)+' nœuds. Dès que tu approches 40 nœuds, augmente l’assiette (+8°).'; }
    else if(s.stalled){ c='bad'; m='Décrochage : l’incidence dépasse 14-15°, l’air se décolle de l’aile. Pousse le manche vers l’avant pour diminuer l’incidence et remets de la puissance.'; }
    else if(kt<48){ c='warn'; m='Vitesse faible : tu approches du décrochage. Diminue l’assiette ou ajoute de la puissance.'; }
    else if(vs>300){ c='ok'; m='Tu montes. Pour monter, il faut de la puissance : ton avion transforme son excès de puissance en altitude.'; }
    else if(vs<-300){ c='warn'; m='Tu descends. Si tu veux te poser, vise une descente régulière avec le PAPI.'; }
    else { c='ok'; m='Vol quasi horizontal : portance ≈ poids, traction ≈ traînée.'; }
    if(v._m!==m||v._c!==c){ v.className='verdict '+c; v.textContent=m; v._m=m; v._c=c; } });
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-a]'); if(!b) return; if(b.dataset.a==='flaps'){ flaps=!flaps; b.textContent='Volets : '+(flaps?'sortis':'rentrés'); b.setAttribute('aria-pressed',flaps); } else if(b.dataset.a==='forces'){ forces=!forces; b.textContent='Forces : '+(forces?'visibles':'masquées'); b.setAttribute('aria-pressed',forces); } else reset(); });
  x.segBind('sc',v=>{ sc=v; reset(); });
  x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); if(o) o.textContent=i.value+i.dataset.unit; }));
  reset();
}};

/* ======================= HÉLICOPTÈRE ======================= */
S.heli={title:'Hélicoptère : collectif, cyclique et palonnier', th:'t3', ch:'3-4',
desc:'Trois commandes, trois effets. Le collectif règle l’altitude, le cyclique incline le disque rotor et fait avancer, le palonnier (pédales) oriente le nez.',
try:['Monte le collectif à 70 % : l’hélicoptère décolle. À 50 %, il reste en vol stationnaire.','Pousse le cyclique vers l’avant : le disque rotor s’incline, l’hélicoptère avance.','Décoche « Anticouple automatique », puis augmente le collectif : le nez tourne tout seul. C’est le couple de réaction du rotor, que le rotor de queue doit compenser.'],
mount(root,x){
  root.innerHTML='<canvas id="'+x.uid+'c" role="img" aria-label="Hélicoptère en vol"></canvas>'+x.r('col','Collectif (angle des pales)',0,100,1,30,' %')+x.r('cyc','Cyclique (arrière ← → avant)',-10,10,1,0,'')+x.r('ped','Palonnier (gauche ← → droite)',-10,10,1,0,'')+'<div class="row" style="margin:6px 0"><button type="button" class="btn sec sm" data-a="anti" aria-pressed="true">Anticouple automatique : oui</button><button type="button" class="btn sec sm" data-a="reset">↺ Recommencer</button></div><div class="readout" id="'+x.uid+'ro"></div><div class="verdict" id="'+x.uid+'v"></div>';
  const cv=x.q('#'+x.uid+'c'), W=640, H=360, g=G.setup(cv,W,H);
  let alt=0, vx=0, wx=0, head=0, anti=true, rot=0, tilt=0, pitch=0, yawRate=0;
  function reset(){ alt=0; vx=0; wx=0; head=0; x.setv('col',30); x.setv('cyc',0); x.setv('ped',0); }
  loop(x,(dt,t)=>{ const col=x.v('col'), cyc=x.v('cyc'), ped=x.v('ped');
    const rotorPower=alt>0||col>50?1:.4; const dh=(col-50)*0.14; if(alt<=0&&dh<0){ alt=0; } else alt=Math.max(0,alt+dh*dt*(col>50||alt>0?1:0)); if(alt>150) alt=150;
    const tgtV=cyc*2.4*(alt>.5?1:0); vx+=(tgtV-vx)*dt*.6; wx+=vx*dt;
    tilt+=((cyc*2.2*D2R)-tilt)*dt*3; pitch=tilt*.6; const torque=anti?0:(col-30)*0.12; yawRate=(ped*5+torque*3)*(alt>.5?1:0); head=(head+yawRate*dt+360)%360;
    rot+=dt*(alt>0||col>35?34:14);
    const gy=288, hy=gy-34-alt*1.6; const sc=wx*8;
    G.sky(g,W,gy,gy); G.cloud(g,((60-wx*1.2)%900+900)%900-120,40,1.1,.9); G.cloud(g,((420-wx*1.2)%900+900)%900-120,86,.8,.85);
    G.land(g,W,H,gy,sc,{});
    const py=Math.max(70,hy);
    if(alt<8&&col>40){ const k=(1-alt/8)*(col-40)/60; g.fillStyle=G.rad(g,320,gy+3,2,150,[[0,'rgba(190,160,110,'+(.55*k)+')'],[1,'rgba(190,160,110,0)']]); g.beginPath(); g.ellipse(320,gy+3,150,12,0,0,7); g.fill(); for(let i=0;i<18;i++){ const a=rnd()*Math.PI*2, r2=30+rnd()*110; g.fillStyle='rgba(205,180,130,'+(.5*k)+')'; g.fillRect(320+Math.cos(a)*r2,gy-rnd()*14,3,3); } }
    G.shadow(g,320,gy+4,56*(1-Math.min(.5,alt/150)),.3*(1-Math.min(1,alt/120)));
    if(col>52&&py<gy-60){ g.strokeStyle='rgba(255,255,255,.4)'; g.lineWidth=2; for(let i=0;i<6;i++){ const ox=252+i*28, ph=((t*1.6+i*.17)%1); g.beginPath(); g.moveTo(ox+cyc*ph*2,py-16+ph*80); g.lineTo(ox+cyc*ph*2,py-6+ph*80); g.stroke(); } }
    G.heli(g,320,py,.95,pitch,{rot,tilt:tilt});
    // vecteur de portance rotor
    const L=22+col*.5; g.strokeStyle='#37d6a4'; g.fillStyle='#37d6a4'; g.lineWidth=3; g.beginPath(); g.moveTo(320,py-30); const ex=320+Math.sin(tilt)*L*2.4, ey=py-30-Math.cos(tilt)*L*1.6; g.lineTo(ex,ey); g.stroke(); const an=Math.atan2(ey-(py-30),ex-320); g.beginPath(); g.moveTo(ex,ey); g.lineTo(ex-9*Math.cos(an-.45),ey-9*Math.sin(an-.45)); g.lineTo(ex-9*Math.cos(an+.45),ey-9*Math.sin(an+.45)); g.fill(); text(g,'portance du rotor',ex+8,ey+4,{s:11,sh:1,c:'#37d6a4'});
    // boussole (vue de dessus)
    g.fillStyle='rgba(8,16,28,.62)'; g.beginPath(); g.arc(W-56,56,42,0,7); g.fill(); g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=1; g.beginPath(); g.arc(W-56,56,38,0,7); g.stroke(); text(g,'N',W-56,24,{s:10,a:'center',c:'#ffb02e'});
    g.save(); g.translate(W-56,56); g.rotate(head*D2R); g.fillStyle='#e9eef3'; g.beginPath(); g.ellipse(0,2,7,14,0,0,7); g.fill(); g.fillRect(-1.5,10,3,20); g.fillStyle='rgba(255,176,46,.9)'; g.beginPath(); g.ellipse(0,-2,30,2.2,rot,0,7); g.fill(); g.restore(); text(g,'cap '+Math.round(head)+'°',W-56,112,{s:11,a:'center',sh:1});
    x.q('#'+x.uid+'ro').innerHTML='<div><small>Altitude</small><b>'+Math.round(alt*3.281)+' ft</b></div><div><small>Vitesse</small><b>'+Math.round(Math.abs(vx)*1.944)+' kt</b></div><div><small>Montée</small><b>'+Math.round(alt>0||dh>0?dh*196.85:0)+' ft/min</b></div><div><small>Cap</small><b>'+Math.round(head)+'°</b></div>';
    let c='',m='';
    if(!anti&&Math.abs(yawRate)>3&&Math.abs(ped)<2){ c='warn'; m='Le nez tourne tout seul : le rotor principal tourne dans un sens, le fuselage réagit dans l’autre (couple de réaction). Le palonnier commande le rotor de queue pour l’empêcher.'; }
    else if(alt<=0&&col<=50){ m='Au sol, rotor en rotation. Augmente le collectif (plus de 50 %) pour décoller.'; }
    else if(col>56){ c='ok'; m='Collectif augmenté : les pales prennent plus d’incidence, la portance dépasse le poids, tu montes.'; }
    else if(col<44&&alt>0){ c='warn'; m='Collectif diminué : la portance est plus faible que le poids, tu descends.'; }
    else if(Math.abs(cyc)>=2){ c='ok'; m='Cyclique '+(cyc>0?'avant':'arrière')+' : le disque rotor s’incline, la portance a une composante '+(cyc>0?'vers l’avant':'vers l’arrière')+' et l’hélicoptère se déplace.'; }
    else { m='Vol stationnaire : la portance du rotor équilibre le poids, l’hélicoptère reste sur place.'; }
    const v=x.q('#'+x.uid+'v'); if(v._m!==m){ v.className='verdict '+c; v.textContent=m; v._m=m; } });
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-a]'); if(!b) return; if(b.dataset.a==='anti'){ anti=!anti; b.textContent='Anticouple automatique : '+(anti?'oui':'non'); b.setAttribute('aria-pressed',anti); } else reset(); });
  x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); if(o) o.textContent=i.value+i.dataset.unit; }));
}};

/* ======================= PLANEUR ======================= */
S.glider={title:'Planeur : finesse et thermiques', th:'t3', ch:'3-4',
desc:'Un planeur n’a pas de moteur : il échange de l’altitude contre de la distance. Trouve une ascendance (thermique), spirale dedans pour regagner de la hauteur, puis file vers la suivante. Le temps est accéléré ×6.',
try:['Règle la vitesse sur 95 km/h : c’est le meilleur compromis, la finesse est maximale (≈ 38).','Vole très vite (170 km/h) : il descend beaucoup plus vite, la finesse chute.','Quand tu passes dans la colonne orange, appuie sur « Spiraler » pour monter jusqu’à la base du nuage.'],
mount(root,x){
  root.innerHTML='<canvas id="'+x.uid+'c" role="img" aria-label="Planeur et thermiques"></canvas>'+x.r('v','Vitesse',65,180,1,95,' km/h')+'<div class="row" style="margin:6px 0"><button type="button" class="btn sm" data-a="circle">Spiraler dans le thermique</button><button type="button" class="btn sec sm" data-a="reset">↺ Recommencer</button></div><div class="readout" id="'+x.uid+'ro"></div><div class="verdict" id="'+x.uid+'vd"></div>';
  const cv=x.q('#'+x.uid+'c'), W=640, H=360, g=G.setup(cv,W,H), TS=6, SPC=3600, BASE=1500;
  let s=null, circ=false, msg=null, ph=0; 
  const th=i=>800+i*SPC;
  const sinkOf=v=>.62+.0002*(v-78)*(v-78);
  function reset(){ s={x:0,alt:900,over:false}; circ=false; msg=null; x.q('[data-a=circle]').textContent='Spiraler dans le thermique'; }
  function liftAt(px,a){ let best=0; for(let i=0;i<8;i++){ const d=Math.abs(px-th(i)); const w=3.1*Math.exp(-Math.pow(d/170,2)); if(w>best) best=w; } const top=a>BASE?Math.max(0,1-(a-BASE)/120):1; return best*top; }
  function nearT(px){ for(let i=0;i<8;i++) if(Math.abs(px-th(i))<230) return th(i); return null; }
  loop(x,(dt0,t)=>{ const dt=dt0*TS; const v=x.v('v'), ms=v/3.6, sk=sinkOf(circ?76:v);
    if(!s.over){ ph+=dt0*(circ?1.6:0);
      if(circ){ const tc=nearT(s.x); if(tc===null){ circ=false; x.q('[data-a=circle]').textContent='Spiraler dans le thermique'; } else { s.x+=(tc-s.x)*Math.min(1,dt0*2); const lift=3.0*Math.exp(-Math.pow(60/170,2))*(s.alt>BASE?Math.max(0,1-(s.alt-BASE)/120):1); s.alt+=(lift-sinkOf(76))*dt; } }
      else { s.x+=ms*dt; s.alt+=(liftAt(s.x,s.alt)-sk)*dt; }
      if(s.alt<=0){ s.alt=0; s.over=true; msg=['bad','Atterrissage en campagne ! Tu n’as pas trouvé d’ascendance à temps. Recommence en visant le thermique suivant avant d’être trop bas.']; } }
    const gy0=190+(s.alt-0)*.5; const yOf=a=>190+(s.alt-a)*.5; const gy=yOf(0);
    G.sky(g,W,Math.min(H,gy),Math.min(H,gy),{top:'#164f9e'});
    // thermiques et cumulus
    for(let i=0;i<8;i++){ const tx=th(i), sxp=220+(tx-s.x)*.17; if(sxp<-140||sxp>W+140) continue; const top=yOf(BASE), bot=yOf(0);
      const grd=g.createLinearGradient(0,top,0,bot); grd.addColorStop(0,'rgba(255,170,70,.0)'); grd.addColorStop(.6,'rgba(255,170,70,.20)'); grd.addColorStop(1,'rgba(255,140,50,.38)'); g.fillStyle=grd; g.beginPath(); g.moveTo(sxp-30,top); g.lineTo(sxp+30,top); g.lineTo(sxp+60,bot); g.lineTo(sxp-60,bot); g.closePath(); g.fill();
      g.strokeStyle='rgba(255,255,255,.55)'; g.lineWidth=2; for(let k=0;k<4;k++){ const p=((t*.5+k*.25+i*.13)%1); const yy=bot-(bot-top)*p; g.beginPath(); g.moveTo(sxp-24+k*16-p*4,yy); g.lineTo(sxp-24+k*16-p*4,yy-14); g.stroke(); }
      G.cloud(g,sxp-48,top-8,1.5,.97); }
    // base de nuage
    G.land(g,W,H,gy,s.x*.17,{});
    const gx=220, gyp=190; const spiral=circ&&!s.over; let px=gx, flip=false, rot=0; if(spiral){ const a=ph; px=gx+Math.sin(a)*64; flip=Math.cos(a)<0; rot=-.16*Math.cos(a)*(flip?-1:1); } else { const sk2=sk; rot=Math.atan2(sk2,ms)*2.4; }
    if(gy<H+20) G.shadow(g,gx,gy+5,40*Math.max(.3,1-s.alt/600),.3*(1-Math.min(1,s.alt/500)));
    G.glider(g,px,gyp+(spiral?Math.sin(ph*2)*4:0),1.15,rot,flip);
    // indications
    const lift=liftAt(s.x,s.alt), fin=ms/sk; const inT=lift>.4||spiral;
    if(inT) text(g,'Dans le thermique : +'+(spiral?'3,0':lift.toFixed(1))+' m/s',W/2,40,{s:16,w:'700',a:'center',c:'#ffd27a',sh:1});
    // échelle d'altitude
    g.fillStyle='rgba(8,16,28,.55)'; g.fillRect(14,14,150,30); text(g,'Altitude '+Math.round(s.alt)+' m',22,34,{s:14,w:'700',sh:0});
    text(g,'base des nuages ≈ '+BASE+' m',W-12,H-10,{s:11,a:'right',sh:1});
    if(msg){ g.fillStyle='rgba(8,16,28,.7)'; g.fillRect(W/2-190,H-80,380,44); text(g,'✖ Posé dans un champ',W/2,H-50,{s:20,w:'800',a:'center',c:'#ff6f61'}); }
    const net=(inT?lift:0)-sk; const tn=nearT(s.x);
    x.q('#'+x.uid+'ro').innerHTML='<div><small>Vitesse</small><b>'+Math.round(spiral?76:v)+' km/h</b></div><div><small>Taux de chute</small><b>'+sk.toFixed(1).replace('.',',')+' m/s</b></div><div><small>Finesse</small><b>'+Math.round(fin)+'</b></div><div><small>Distance de plané</small><b>≈ '+Math.round(s.alt*fin/1000)+' km</b></div>';
    let c='', m;
    if(msg){ c='bad'; m=msg[1]; } else if(spiral){ c='ok'; m='Tu spirales dans le thermique : l’air monte plus vite que ton planeur ne descend, tu gagnes de la hauteur. Quitte-le en haut (en sortant du cercle) pour filer vers le suivant.'; }
    else if(tn!==null&&lift>.4){ c='ok'; m='Tu es dans une ascendance ! Appuie sur « Spiraler dans le thermique » pour monter.'; }
    else if(Math.abs(v-95)<8){ c='ok'; m='Vitesse proche de la meilleure finesse (≈ '+Math.round(fin)+') : tu parcours le maximum de distance par mètre perdu.'; }
    else if(v>140){ c='warn'; m='Vitesse élevée : tu parcours vite la distance mais tu perds beaucoup plus de hauteur par kilomètre (finesse '+Math.round(fin)+').'; }
    else { m='Plané : tu perds environ '+sk.toFixed(1).replace('.',',')+' m chaque seconde. Cherche la prochaine colonne orange.'; }
    const vd=x.q('#'+x.uid+'vd'); if(vd._m!==m){ vd.className='verdict '+c; vd.textContent=m; vd._m=m; } });
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-a]'); if(!b) return; if(b.dataset.a==='circle'){ if(s.over) return; if(!circ&&nearT(s.x)===null){ return; } circ=!circ; b.textContent=circ?'Quitter le thermique':'Spiraler dans le thermique'; } else reset(); });
  x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+x.uid+'-v-o'); }));
  x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); if(o) o.textContent=i.value+i.dataset.unit; }));
  reset();
}};

/* ======================= LANCEUR ======================= */
S.rocket={title:'Lancement d’une fusée vers l’orbite', th:'t3', ch:'3-5',
desc:'Décolle verticalement, puis incline la fusée peu à peu pour gagner de la vitesse horizontale. Pour rester en orbite, il faut environ 28 000 km/h ET un périgée au-dessus de l’atmosphère. Le temps est accéléré.',
try:['Lance, puis augmente l’inclinaison très progressivement : 0° au début, environ 40° vers T+2 min, 70° vers T+4 min, 88° vers T+6 min.','Si tu inclines trop tôt, la fusée plonge. Trop tard, elle monte très haut mais retombe.','Quand le périgée prévu dépasse 160 km, coupe le moteur : tu es en orbite.'],
mount(root,x){
  root.innerHTML='<canvas id="'+x.uid+'c" role="img" aria-label="Fusée au décollage et carte de la trajectoire"></canvas>'+x.r('inc','Inclinaison (0° = vertical, 90° = horizontal)',0,90,1,0,'°')+'<div class="row" style="margin:6px 0"><button type="button" class="btn sm" data-a="go">🚀 Lancer</button><button type="button" class="btn sec sm" data-a="cut">Couper le moteur</button><button type="button" class="btn sec sm" data-a="reset">↺ Recommencer</button></div><div class="readout" id="'+x.uid+'ro"></div><div class="verdict" id="'+x.uid+'vd"></div>';
  const cv=x.q('#'+x.uid+'c'), W=640, H=400, g=G.setup(cv,W,H); const R=6371000, MU=3.986e14, TS=9;
  let s=null, debris=[], trail=[], outcome=null, camShake=0;
  function reset(){ s={x:0,y:R,vx:0,vy:0,t:0,m:500000,stage:1,prop1:380000,prop2:90000,thr:7.5e6,ve:2750,state:'pad',phi:0}; debris=[]; trail=[]; outcome=null; x.setv('inc',0); }
  function orb(){ const r=Math.hypot(s.x,s.y), v2=s.vx*s.vx+s.vy*s.vy, E=v2/2-MU/r, hh=s.x*s.vy-s.y*s.vx; if(E>=0) return {peri:-9999,apo:1e9,a:1,e:1}; const a=-MU/(2*E), e=Math.sqrt(Math.max(0,1+2*E*hh*hh/MU/MU)); return {peri:(a*(1-e)-R)/1000,apo:(a*(1+e)-R)/1000,a,e,hh}; }
  function stepP(dt){ if(s.state==='pad'||s.state==='done') return; const r=Math.hypot(s.x,s.y), alt=r-R, ux=s.x/r, uy=s.y/r; const burning=s.state==='burn'; const phi=x.v('inc')*D2R; s.phi=phi; const tx=uy, ty=-ux, dx=Math.cos(phi)*ux+Math.sin(phi)*tx, dy=Math.cos(phi)*uy+Math.sin(phi)*ty;
    let ax=-MU*s.x/(r*r*r), ay=-MU*s.y/(r*r*r); const v=Math.hypot(s.vx,s.vy), rho=1.225*Math.exp(-alt/8000), dr=.5*rho*v*v*.3*10/s.m; if(v>0){ ax-=dr*s.vx/v; ay-=dr*s.vy/v; }
    if(burning){ const a=s.thr/s.m; ax+=a*dx; ay+=a*dy; const dm=s.thr/s.ve*dt; s.m-=dm; if(s.stage===1){ s.prop1-=dm; if(s.prop1<=0){ s.stage=2; s.m-=20000; s.thr=.9e6; s.ve=3400; debris.push({alt:alt,dx:0,dy:0,t:0,vy:0,rot:phi}); } } else { s.prop2-=dm; if(s.prop2<=0){ s.state='coast'; } } }
    s.vx+=ax*dt; s.vy+=ay*dt; s.x+=s.vx*dt; s.y+=s.vy*dt; s.t+=dt;
    if(Math.hypot(s.x,s.y)<R){ s.state='done'; outcome=['bad','La fusée est retombée sur Terre : sa trajectoire ne passe pas au-dessus de l’atmosphère. Il faut plus de vitesse horizontale.']; return; }
    if(s.state==='coast'&&!outcome){ const o=orb(); if(o.peri>160&&alt>140000){ outcome=['ok','Orbite atteinte ! Périgée '+Math.round(o.peri)+' km, apogée '+(o.apo>1e5?'très élevé':Math.round(o.apo)+' km')+'. Le satellite tourne autour de la Terre sans retomber.']; } }
    if(trail.length===0||s.t-trail[trail.length-1].t>4) trail.push({x:s.x,y:s.y,t:s.t}); }
  loop(x,(dt0,t)=>{ const n=Math.ceil(dt0*TS/.5); for(let i=0;i<n;i++) stepP(dt0*TS/n);
    const r=Math.hypot(s.x,s.y), alt=Math.max(0,r-R), altKm=alt/1000, v=Math.hypot(s.vx,s.vy); const burning=s.state==='burn';
    // ---- scène (gauche) ----
    const SW=400; g.save(); g.beginPath(); g.rect(0,0,SW,H); g.clip(); const f=clamp(altKm/90,0,1);
    const lerp=(a,b,k)=>Math.round(a+(b-a)*k); const c1=[lerp(27,3,f),lerp(102,6,f),lerp(201,18,f)], c2=[lerp(198,6,f),lerp(230,10,f),lerp(248,26,f)];
    g.fillStyle=G.lin(g,0,0,0,H,[[0,'rgb('+c1+')'],[1,'rgb('+c2+')']]); g.fillRect(0,0,SW,H); if(f>.3){ g.globalAlpha=(f-.3)/.7; G.stars(g,SW,H,70); g.globalAlpha=1; }
    const off=-(altKm*5.5)%900; if(f<.95){ g.globalAlpha=1-f; for(let i=0;i<4;i++) G.cloud(g,(i*130+40)%420-30,((i*270+off*(1+i*.2))%700+700)%700-120,1.1,.9); g.globalAlpha=1; }
    const gyl=300+altKm*6; if(gyl<H+80){ g.fillStyle=G.lin(g,0,gyl,0,H,[[0,'#4f9250'],[1,'#2f6d36']]); g.fillRect(0,gyl,SW,H-gyl); g.fillStyle='#4a4f57'; g.fillRect(0,gyl-1,SW,3); if(s.state==='pad'||altKm<.4){ g.fillStyle='#8a929c'; g.fillRect(150,gyl-30,10,30); g.fillRect(240,gyl-30,10,30); } if(altKm>10&&altKm<120){ g.fillStyle=G.lin(g,0,gyl-50,0,gyl,[[0,'rgba(120,190,255,0)'],[1,'rgba(120,190,255,.35)']]); g.fillRect(0,gyl-50,SW,50);} }
    const ry=Math.min(240,gyl-70); const sh=burning?(Math.random()-.5)*(altKm<10?2.2:.6):0;
    debris=debris.filter(d=>d.t<6); debris.forEach(d=>{ d.t+=dt0; d.vy+=dt0*180; const yy=ry+90+d.vy*d.t*.5+d.t*d.t*60; G.rocket(g,200-d.t*10,yy,.62,d.rot+d.t*.5,{stage:1,thr:0}); });
    const thrOn=burning?1:0; G.rocket(g,200+sh,ry+(s.stage===1?30:0)+30,.62,s.phi,{stage:s.stage,thr:thrOn});
    g.restore();
    // ---- carte (droite) ----
    const mx=520,my=205,Rm=62; g.fillStyle='#050912'; g.fillRect(SW,0,W-SW,H); G.stars(g,W-SW,H,40); g.save(); g.translate(SW,0); g.beginPath(); g.rect(0,0,W-SW,H); g.clip(); g.translate(-SW,0);
    const rmap=a=>Rm+(Math.sqrt(Math.max(0,a))/20)*(a<=0?0:1)*0+Math.min(130-Rm,Math.sqrt(Math.max(0,a)/1000)*3.2*Rm/6.5);
    G.earth(g,mx,my,Rm,t*.05);
    const pol=(px,py)=>{ const rr=Math.hypot(px,py), a=Math.atan2(px,py); const rm=rmap((rr-R)/1000); return [mx+Math.sin(a)*rm, my-Math.cos(a)*rm]; };
    g.strokeStyle='#ffb02e'; g.lineWidth=2; g.beginPath(); trail.forEach((p,i)=>{ const q=pol(p.x,p.y); i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]); }); const qc=pol(s.x,s.y); g.lineTo(qc[0],qc[1]); g.stroke();
    if(s.state!=='pad'&&s.state!=='done'){ const o=orb(); if(o.peri>-6000&&o.e<1){ g.setLineDash([4,4]); g.strokeStyle=o.peri>160?'rgba(55,214,164,.9)':'rgba(255,111,97,.9)'; g.lineWidth=1.5; g.beginPath(); const p=o.a*(1-o.e*o.e); const ang0=Math.atan2(s.x,s.y); const hh=s.x*s.vy-s.y*s.vx; for(let k=0;k<=120;k++){ const nu=k/120*Math.PI*2; const rr=p/(1+o.e*Math.cos(nu)); if(rr<R*.2) continue; const ph0=Math.atan2(s.x,s.y); const rad=(rr-R)/1000; const aa=nu+ (ph0-Math.acos(Math.max(-1,Math.min(1,(p/Math.hypot(s.x,s.y)-1)/Math.max(o.e,1e-6))))*(1)); const rm=rmap(rad); const xx=mx+Math.sin(aa)*rm, yy=my-Math.cos(aa)*rm; k?g.lineTo(xx,yy):g.moveTo(xx,yy); } g.stroke(); g.setLineDash([]); } }
    g.fillStyle='#fff'; g.beginPath(); g.arc(qc[0],qc[1],4,0,7); g.fill();
    text(g,'Carte de la trajectoire',SW+12,24,{s:12,c:'#d7e1ec'}); text(g,'(altitudes exagérées)',SW+12,38,{s:10,w:'500',c:'#8da2b8'});
    g.restore();
    // ---- HUD ----
    g.fillStyle='rgba(8,16,28,.55)'; g.fillRect(12,12,150,48); text(g,'T+ '+Math.round(s.t)+' s',22,32,{s:14,w:'700'}); text(g,s.stage===1?'Étage 1':'Étage 2',22,50,{s:12,w:'500',c:'#ffb02e'});
    if(outcome&&outcome[0]==='ok') text(g,'ORBITE !',200,110,{s:28,w:'800',a:'center',c:'#37d6a4',sh:1}); else if(outcome) text(g,'RETOMBÉE',200,110,{s:26,w:'800',a:'center',c:'#ff6f61',sh:1});
    const o=orb(); const okp=o.peri>160;
    x.q('#'+x.uid+'ro').innerHTML='<div><small>Altitude</small><b>'+Math.round(altKm)+' km</b></div><div><small>Vitesse</small><b>'+Math.round(v*3.6).toLocaleString('fr-FR')+' km/h</b></div><div><small>Périgée prévu</small><b style="color:'+(okp?'var(--ok)':'var(--bad)')+'">'+(s.state==='pad'?'—':o.peri<-6000?'< 0':Math.round(o.peri)+' km')+'</b></div><div><small>Apogée prévu</small><b>'+(s.state==='pad'?'—':o.apo>1e5?'très haut':Math.round(o.apo)+' km')+'</b></div>';
    let c='',m;
    if(outcome){ c=outcome[0]; m=outcome[1]; }
    else if(s.state==='pad'){ m='Prête au lancement. Appuie sur « Lancer ». Garde l’inclinaison à 0° au début : la fusée monte droit pour traverser l’air dense.'; }
    else if(s.state==='coast'){ c='warn'; m='Moteur coupé. Si le périgée est inférieur à 160 km, la fusée retombera.'; }
    else if(o.peri>160){ c='ok'; m='Le périgée prévu dépasse 160 km : tu peux couper le moteur, tu seras en orbite !'; }
    else if(altKm<10){ m='Phase de décollage : la fusée accélère dans l’air dense. Commence à incliner doucement.'; }
    else { m='Continue d’incliner petit à petit : il faut convertir la vitesse verticale en vitesse horizontale. Le périgée prévu doit devenir positif et dépasser 160 km.'; }
    const vd=x.q('#'+x.uid+'vd'); if(vd._m!==m){ vd.className='verdict '+c; vd.textContent=m; vd._m=m; } });
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-a]'); if(!b) return; const a=b.dataset.a; if(a==='go'&&s.state==='pad'){ s.state='burn'; } else if(a==='cut'&&s.state==='burn'){ s.state='coast'; } else if(a==='reset') reset(); });
  x.qa('input[type=range]').forEach(i=>i.addEventListener('input',()=>{ const o=x.q('#'+i.id+'-o'); if(o) o.textContent=i.value+i.dataset.unit; }));
  reset();
}};

})();
