(function(){
const G=window.BIA.gfx={};
G.setup=(cv,w,h)=>{ const d=Math.min(window.devicePixelRatio||1,2); cv.width=Math.round(w*d); cv.height=Math.round(h*d); cv.style.width='100%'; cv.style.height='auto'; cv.style.aspectRatio=w+'/'+h; const g=cv.getContext('2d'); g.setTransform(d,0,0,d,0,0); return g; };
const lin=(g,x0,y0,x1,y1,st)=>{ const l=g.createLinearGradient(x0,y0,x1,y1); st.forEach(s=>l.addColorStop(s[0],s[1])); return l; };
const rad=(g,x,y,r0,r1,st)=>{ const l=g.createRadialGradient(x,y,r0,x,y,r1); st.forEach(s=>l.addColorStop(s[0],s[1])); return l; };
G.lin=lin; G.rad=rad;
G.sky=(g,w,h,hor,o)=>{ o=o||{}; g.fillStyle=lin(g,0,0,0,hor,[[0,o.top||'#1B66C9'],[.6,o.mid||'#5FA8E6'],[1,o.bot||'#C6E6F8']]); g.fillRect(0,0,w,hor+2);
  const sx=w*(o.sx||.84), sy=hor*(o.sy||.26); g.fillStyle=rad(g,sx,sy,0,w*.42,[[0,'rgba(255,250,222,.95)'],[.06,'rgba(255,244,200,.6)'],[1,'rgba(255,240,190,0)']]); g.fillRect(0,0,w,hor); };
G.cloud=(g,x,y,s,a)=>{ g.save(); g.globalAlpha=a==null?1:a; const P=[[0,0,24],[26,-10,30],[58,-2,26],[-24,6,18],[84,8,18],[30,8,28],[8,10,22],[60,12,22]]; 
  P.forEach(p=>{ const px=x+p[0]*s, py=y+p[1]*s, r=p[2]*s; g.fillStyle=rad(g,px-r*.25,py-r*.4,r*.05,r,[[0,'rgba(255,255,255,1)'],[.65,'rgba(247,251,255,.97)'],[1,'rgba(205,222,240,0)']]); g.beginPath(); g.arc(px,py,r,0,7); g.fill(); });
  g.fillStyle=lin(g,0,y+8*s,0,y+30*s,[[0,'rgba(170,190,215,0)'],[1,'rgba(150,172,200,.35)']]); g.beginPath(); g.ellipse(x+34*s,y+16*s,66*s,12*s,0,0,7); g.fill(); g.restore(); };
// hills en parallaxe + sol
G.land=(g,w,h,gy,sc,o)=>{ o=o||{};
  const layer=(par,amp,col1,col2,off,fr)=>{ g.beginPath(); g.moveTo(0,gy+2); for(let X=0;X<=w;X+=8){ const wx=X+sc*par; const y=gy-off-amp*(0.55*Math.sin(wx*fr)+0.3*Math.sin(wx*fr*2.3+1.7)+0.15*Math.sin(wx*fr*5.1+.4)+0.8); g.lineTo(X,y);} g.lineTo(w,gy+2); g.closePath(); g.fillStyle=lin(g,0,gy-off-amp*1.6,0,gy,[[0,col1],[1,col2]]); g.fill(); };
  layer(.04,34,'#9DBBD0','#B9D2DE',0,.006); layer(.10,24,'#7FA79A','#A2C2B0',0,.009); layer(.22,16,'#5E9460','#86B079',0,.014);
  g.fillStyle=lin(g,0,gy,0,h,[[0,'#6AA85B'],[.35,'#4D8E48'],[1,'#33703A']]); g.fillRect(0,gy,w,h-gy);
  // champs : bandes en perspective
  for(let i=-1;i<18;i++){ const wx=i*120-(sc%120); g.fillStyle=(Math.floor((sc+i*120)/120)%2)?'rgba(255,240,150,.10)':'rgba(30,70,30,.12)'; g.beginPath(); g.moveTo(wx,gy); g.lineTo(wx+120,gy); g.lineTo(wx+120+ (wx+60-w/2)*.9,h); g.lineTo(wx+(wx+60-w/2)*.9,h); g.closePath(); g.fill(); }
  // arbres
  const sp=170; for(let i=-1;i<w/sp+2;i++){ const wx=i*sp-(sc%sp); const k=Math.floor((sc+i*sp)/sp); const hh=14+((k*37)%11); const tx=wx+((k*53)%60); g.fillStyle='#5b3d24'; g.fillRect(tx-1.5,gy-hh*.5,3,hh*.5+2); g.fillStyle=rad(g,tx-3,gy-hh-2,1,hh*.75,[[0,'#68b05a'],[1,'#2f6e33']]); g.beginPath(); g.arc(tx,gy-hh*.8,hh*.62,0,7); g.fill(); }
  if(o.runway){ const rx0=o.runway[0]-sc, rx1=o.runway[1]-sc; if(rx1>0&&rx0<w){ g.fillStyle='#4a4f57'; g.fillRect(rx0,gy-1,rx1-rx0,7); g.fillStyle='#e9eef3'; for(let X=Math.max(rx0,0)+10;X<Math.min(rx1,w);X+=36) g.fillRect(X,gy+2,18,1.5); g.fillStyle='#e9eef3'; if(rx0>-20&&rx0<w) g.fillRect(rx0+3,gy,3,5); } }
};
G.shadow=(g,x,y,w,a)=>{ g.save(); g.globalAlpha=a; g.fillStyle='#0b1a10'; g.beginPath(); g.ellipse(x,y,w,w*.09,0,0,7); g.fill(); g.restore(); };
// ---------- avion léger (profil, nez à droite) ----------
G.plane=(g,x,y,sc,rot,o)=>{ o=o||{}; g.save(); g.translate(x,y); g.rotate(rot||0); g.scale(sc,sc); const col=o.color||'#E4572E';
  if(o.gear!==false){ g.lineCap='round'; g.strokeStyle='#2b3440'; g.lineWidth=3.2; g.beginPath(); g.moveTo(14,9); g.lineTo(19,26); g.moveTo(-82,2); g.lineTo(-86,12); g.stroke(); g.lineWidth=2.4; g.beginPath(); g.moveTo(38,9); g.lineTo(41,26);g.stroke();
    [[19,27,5.5],[41,27,4.6],[-86,13,3]].forEach(w=>{ g.fillStyle='#16191f'; g.beginPath(); g.arc(w[0],w[1],w[2],0,7); g.fill(); g.fillStyle='#aab4c0'; g.beginPath(); g.arc(w[0],w[1],w[2]*.45,0,7); g.fill(); }); }
  // dérive
  g.fillStyle=lin(g,-98,-36,-70,-8,[[0,'#ffffff'],[1,'#d9e0e8']]); g.strokeStyle='rgba(20,30,45,.75)'; g.lineWidth=1; g.beginPath(); g.moveTo(-70,-9); g.lineTo(-92,-38); g.lineTo(-101,-38); g.lineTo(-97,-10); g.closePath(); g.fill(); g.stroke(); g.fillStyle=col; g.beginPath(); g.moveTo(-84,-26); g.lineTo(-92,-38); g.lineTo(-101,-38); g.lineTo(-98,-27); g.closePath(); g.fill();
  // stabilisateur
  g.fillStyle='#cfd7e0'; g.beginPath(); g.ellipse(-88,-3,17,3.4,0,0,7); g.fill(); g.stroke();
  // fuselage
  const fus=new Path2D(); fus.moveTo(66,3); fus.bezierCurveTo(66,-8,52,-14,34,-16); fus.lineTo(-6,-17); fus.bezierCurveTo(-30,-16,-60,-10,-96,-6); fus.lineTo(-98,0); fus.lineTo(-92,3); fus.bezierCurveTo(-60,10,-10,13,28,12); fus.bezierCurveTo(52,11,66,9,66,3); fus.closePath();
  g.fillStyle=lin(g,0,-17,0,13,[[0,'#ffffff'],[.45,'#eef2f6'],[1,'#b8c3cf']]); g.fill(fus); g.stroke(fus);
  g.save(); g.clip(fus); g.fillStyle=col; g.beginPath(); g.moveTo(70,-1); g.lineTo(-100,-4); g.lineTo(-100,0.5); g.lineTo(70,5); g.fill(); g.fillStyle=lin(g,0,-17,0,-4,[[0,'rgba(255,255,255,.55)'],[1,'rgba(255,255,255,0)']]); g.fillRect(-100,-17,170,13); g.restore();
  // verrière
  g.fillStyle=lin(g,0,-16,0,-2,[[0,'#274a6e'],[1,'#0f2238']]); g.beginPath(); g.moveTo(40,-12); g.bezierCurveTo(30,-18,10,-19,-4,-18); g.lineTo(-14,-5); g.lineTo(38,-5); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(34,-11); g.lineTo(12,-16.5); g.lineTo(18,-5.5); g.lineTo(34,-5.5); g.closePath(); g.fill();
  g.strokeStyle='rgba(20,30,45,.55)'; g.beginPath(); g.moveTo(14,-17.5); g.lineTo(8,-5); g.stroke();
  // aile basse
  g.strokeStyle='rgba(20,30,45,.8)'; g.fillStyle=lin(g,0,4,0,11,[[0,'#f4f7fa'],[1,'#9fabb8']]); g.beginPath(); g.moveTo(24,6); g.bezierCurveTo(10,4,-14,5,-30,8); g.bezierCurveTo(-14,13,10,13,24,10); g.closePath(); g.fill(); g.stroke();
  if(o.flaps){ g.save(); g.translate(-18,9); g.rotate(o.flaps*0.6); g.fillStyle='#d0d8e0'; g.fillRect(-12,0,13,2.4); g.strokeRect(-12,0,13,2.4); g.restore(); }
  // capot + hélice
  g.fillStyle=lin(g,0,-10,0,10,[[0,'#d7dee6'],[1,'#8e9aa8']]); g.beginPath(); g.moveTo(52,-13); g.lineTo(68,-7); g.lineTo(68,9); g.lineTo(52,11); g.closePath(); g.fill(); g.stroke();
  g.fillStyle=lin(g,70,-5,78,5,[[0,'#f2f4f7'],[1,'#7e8794']]); g.beginPath(); g.ellipse(72,1,6,5.6,0,0,7); g.fill();
  const pa=o.prop||0; if(o.thr>0.05){ g.fillStyle='rgba(60,70,85,'+(0.12+0.28*o.thr)+')'; g.beginPath(); g.ellipse(74,1,3.4,34,0,0,7); g.fill(); }
  g.fillStyle='#1c2229'; [0,Math.PI].forEach(a=>{ const hgt=33*Math.cos(pa+a); g.beginPath(); g.ellipse(74,1+hgt/2,2,Math.abs(hgt)/2+.5,0,0,7); g.fill(); });
  g.restore(); };
// ---------- hélicoptère (profil, nez à droite) ----------
G.heli=(g,x,y,sc,rot,o)=>{ o=o||{}; g.save(); g.translate(x,y); g.rotate(rot||0); g.scale(sc,sc);
  // patins
  g.strokeStyle='#27303b'; g.lineWidth=3; g.lineCap='round'; g.beginPath(); g.moveTo(-34,30); g.lineTo(46,30); g.quadraticCurveTo(56,30,58,25); g.moveTo(-14,12); g.lineTo(-16,30); g.moveTo(24,12); g.lineTo(26,30); g.stroke();
  // poutre de queue
  g.fillStyle=lin(g,0,-10,0,8,[[0,'#eef2f6'],[1,'#a9b5c2']]); g.strokeStyle='rgba(20,30,45,.8)'; g.lineWidth=1; g.beginPath(); g.moveTo(-30,-8); g.lineTo(-104,-14); g.lineTo(-104,-6); g.lineTo(-30,6); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='#e4572e'; g.beginPath(); g.moveTo(-90,-13); g.lineTo(-108,-34); g.lineTo(-100,-34); g.lineTo(-100,-12); g.closePath(); g.fill(); g.stroke();
  // cabine
  const b=new Path2D(); b.moveTo(54,10); b.bezierCurveTo(60,-6,46,-26,22,-28); b.lineTo(-22,-26); b.bezierCurveTo(-38,-24,-40,-4,-34,8); b.bezierCurveTo(-20,16,30,16,54,10); b.closePath();
  g.fillStyle=lin(g,0,-28,0,16,[[0,'#ffffff'],[.5,'#e6ecf2'],[1,'#a2afbd']]); g.fill(b); g.stroke(b);
  g.fillStyle=lin(g,0,-26,0,6,[[0,'#2c5078'],[1,'#10263d']]); g.beginPath(); g.moveTo(52,6); g.bezierCurveTo(57,-6,44,-22,24,-24); g.lineTo(8,-24); g.lineTo(8,6); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(44,-6); g.bezierCurveTo(44,-16,34,-20,24,-21); g.lineTo(16,-21); g.lineTo(20,-4); g.closePath(); g.fill();
  g.fillStyle='#e4572e'; g.fillRect(-36,-2,42,5);
  // mât + rotor principal
  g.fillStyle='#2a323d'; g.fillRect(-5,-40,10,13);
  const rt=o.tilt||0, ph=o.rot||0; g.save(); g.translate(0,-41); g.rotate(rt);
  g.fillStyle='rgba(40,50,65,.13)'; g.beginPath(); g.ellipse(0,0,98,6,0,0,7); g.fill();
  g.fillStyle='#1b2128'; [0,1].forEach(i=>{ const s=Math.cos(ph+i*Math.PI); g.beginPath(); g.ellipse(s*49,0,Math.abs(s)*49+.5,1.7,0,0,7); g.fill(); }); g.restore();
  // rotor de queue
  g.save(); g.translate(-104,-20); g.fillStyle='rgba(40,50,65,.2)'; g.beginPath(); g.ellipse(0,0,4,17,0,0,7); g.fill(); g.fillStyle='#1b2128'; const ta=(o.rot||0)*3; g.fillRect(-1,-16*Math.abs(Math.cos(ta)),2,32*Math.abs(Math.cos(ta))); g.restore();
  g.restore(); };
// ---------- planeur (profil, nez à droite) ----------
G.glider=(g,x,y,sc,rot,flip)=>{ g.save(); g.translate(x,y); g.rotate(rot||0); g.scale(sc*(flip?-1:1),sc);
  g.strokeStyle='rgba(20,30,45,.8)'; g.lineWidth=1;
  g.fillStyle='#e8edf2'; g.beginPath(); g.moveTo(-100,-4); g.lineTo(-114,-28); g.lineTo(-120,-28); g.lineTo(-114,-4); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(-112,-26,10,2.6,0,0,7); g.fill(); g.stroke();
  const f=new Path2D(); f.moveTo(48,2); f.bezierCurveTo(46,-6,36,-10,20,-11); f.lineTo(-10,-10); f.lineTo(-100,-4); f.lineTo(-104,0); f.lineTo(-100,2); f.lineTo(-10,6); f.bezierCurveTo(20,7,44,8,48,2); f.closePath();
  g.fillStyle=lin(g,0,-11,0,8,[[0,'#ffffff'],[1,'#b7c3cf']]); g.fill(f); g.stroke(f);
  g.fillStyle=lin(g,0,-11,0,-2,[[0,'#3b6ea5'],[1,'#12304f']]); g.beginPath(); g.moveTo(30,-8); g.bezierCurveTo(20,-13,4,-13,-6,-11); g.lineTo(-6,-3); g.lineTo(30,-3); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(24,-8); g.lineTo(6,-11); g.lineTo(8,-4); g.lineTo(24,-4); g.fill();
  g.fillStyle=lin(g,0,-2,0,4,[[0,'#ffffff'],[1,'#8f9cab']]); g.beginPath(); g.moveTo(12,-2); g.bezierCurveTo(-10,-5,-40,-5,-60,-3); g.bezierCurveTo(-40,5,-6,5,12,2); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='#e4572e'; g.beginPath(); g.moveTo(-60,-2); g.bezierCurveTo(-70,-3,-90,-3,-100,-3); g.lineTo(-100,0); g.lineTo(-60,0); g.fill();
  g.fillStyle='#1b2128'; g.beginPath(); g.arc(14,8,3.2,0,7); g.fill();
  g.restore(); };
// ---------- fusée ----------
G.rocket=(g,x,y,sc,rot,o)=>{ o=o||{}; g.save(); g.translate(x,y); g.rotate(rot||0); g.scale(sc,sc); const st=o.stage||1;
  // flamme (vers le bas = +y)
  if(o.thr>0){ const L=(st===1?64:40)*(0.8+0.3*Math.random())*o.thr, W=(st===1?15:9); g.fillStyle=lin(g,0,0,0,L,[[0,'rgba(255,255,255,.95)'],[.25,'rgba(255,214,102,.9)'],[.7,'rgba(255,120,40,.55)'],[1,'rgba(255,80,20,0)']]); g.beginPath(); g.moveTo(-W,0); g.quadraticCurveTo(0,L*1.3,W,0); g.closePath(); g.fill(); }
  const body=(x0,y0,w,h,r)=>{ g.fillStyle=lin(g,x0-w,0,x0+w,0,[[0,'#aeb9c6'],[.35,'#ffffff'],[.7,'#dfe6ee'],[1,'#8d99a8']]); g.beginPath(); g.moveTo(x0-w,y0); g.lineTo(x0-w,y0-h); g.lineTo(x0+w,y0-h); g.lineTo(x0+w,y0); g.closePath(); g.fill(); g.strokeStyle='rgba(20,30,45,.7)'; g.lineWidth=1; g.stroke(); };
  if(st===1){ body(0,0,13,86); g.fillStyle='#e4572e'; g.fillRect(-13,-22,26,6); g.fillStyle='#2b3440'; g.beginPath(); g.moveTo(-13,0); g.lineTo(-24,18); g.lineTo(-13,-16); g.fill(); g.beginPath(); g.moveTo(13,0); g.lineTo(24,18); g.lineTo(13,-16); g.fill(); g.fillStyle='#39434f'; g.beginPath(); g.moveTo(-9,0); g.lineTo(-11,8); g.lineTo(11,8); g.lineTo(9,0); g.fill(); }
  const y2=st===1?-88:0; body(0,y2,11,56); g.fillStyle='#e4572e'; g.fillRect(-11,y2-8,22,5);
  const y3=y2-56; g.fillStyle=lin(g,-11,0,11,0,[[0,'#b6c1cd'],[.4,'#ffffff'],[1,'#8996a5']]); g.beginPath(); g.moveTo(-11,y3); g.bezierCurveTo(-11,y3-22,-4,y3-36,0,y3-40); g.bezierCurveTo(4,y3-36,11,y3-22,11,y3); g.closePath(); g.fill(); g.stroke();
  g.restore(); };
// ---------- Terre (vue de l'espace) ----------
G.earth=(g,cx,cy,r,rot)=>{ g.save(); const atm=rad(g,cx,cy,r*.98,r*1.16,[[0,'rgba(120,190,255,.55)'],[1,'rgba(120,190,255,0)']]); g.fillStyle=atm; g.beginPath(); g.arc(cx,cy,r*1.16,0,7); g.fill();
  g.fillStyle=rad(g,cx-r*.35,cy-r*.35,r*.1,r*1.1,[[0,'#6fb7ff'],[.55,'#1f6fcf'],[1,'#0b2f66']]); g.beginPath(); g.arc(cx,cy,r,0,7); g.fill(); g.clip();
  g.fillStyle='#4a9a5a'; const bl=[[0.1,-.2,.28],[.4,.25,.2],[-.45,.05,.22],[-.1,.55,.15],[.55,-.5,.14],[-.55,-.45,.12]]; bl.forEach((b,i)=>{ const a=rot+i*1.1; const bx=cx+Math.cos(a)*r*.6*(b[0]+.2), by=cy+b[1]*r*.8; g.beginPath(); g.ellipse(bx,by,b[2]*r,b[2]*r*.7,a,0,7); g.fill(); });
  g.fillStyle=rad(g,cx+r*.5,cy+r*.5,r*.2,r*1.3,[[0,'rgba(0,0,0,0)'],[1,'rgba(0,10,30,.55)']]); g.fillRect(cx-r,cy-r,2*r,2*r); g.restore(); };
G.stars=(g,w,h,n)=>{ let s=42; for(let i=0;i<n;i++){ s=(s*16807)%2147483647; const x=s%w; s=(s*16807)%2147483647; const y=s%h; g.fillStyle='rgba(255,255,255,'+(0.3+(s%7)/10)+')'; g.fillRect(x,y,1.4,1.4);} };
G.metal=(g,x0,y0,x1,y1)=>lin(g,x0,y0,x1,y1,[[0,'#6c7785'],[.25,'#d7dee6'],[.5,'#8f9ba9'],[.8,'#c4ccd6'],[1,'#5d6876']]);
})();
