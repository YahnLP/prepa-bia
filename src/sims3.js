(function(){
const S = window.BIA.sims;
const f1 = (x,d)=>x.toFixed(d===undefined?1:d).replace('.',',');
const rad=a=>a*Math.PI/180;
const pad3=n=>String(Math.round(n)).padStart(3,'0');

/* dessin partagé de l’avion léger (utilisé par 3-1 et par l’anglais 6-4) */
window.BIA.planeSVG=function(u){ return '<svg viewBox="0 0 640 290" id="'+u+'s" role="group" aria-label="Avion léger à aile haute, vue de profil">'+
  '<defs>'+
  '<linearGradient id="'+u+'sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fb1e6"/><stop offset="1" stop-color="#dcedf9"/></linearGradient>'+
  '<linearGradient id="'+u+'bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#eef2f6"/><stop offset="1" stop-color="#aeb9c5"/></linearGradient>'+
  '<linearGradient id="'+u+'wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#e6ebf0"/><stop offset="1" stop-color="#9aa7b4"/></linearGradient>'+
  '<linearGradient id="'+u+'gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c4a6e"/><stop offset=".5" stop-color="#16293f"/><stop offset="1" stop-color="#0e1b2b"/></linearGradient>'+
  '<linearGradient id="'+u+'cw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f9"/><stop offset="1" stop-color="#9eabb8"/></linearGradient>'+
  '<radialGradient id="'+u+'pb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1b2735" stop-opacity=".05"/><stop offset=".8" stop-color="#1b2735" stop-opacity=".22"/><stop offset="1" stop-color="#1b2735" stop-opacity="0"/></radialGradient>'+
  '<radialGradient id="'+u+'wh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#cfd6de"/><stop offset=".45" stop-color="#8e99a6"/><stop offset=".5" stop-color="#1a1f26"/><stop offset="1" stop-color="#0b0e12"/></radialGradient>'+
  '<linearGradient id="'+u+'sp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8dee5"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#8f9ba8"/></linearGradient>'+
  '</defs>'+
  '<rect width="640" height="290" fill="url(#'+u+'sk)"/>'+
  '<g fill="#fff" opacity=".7"><ellipse cx="520" cy="46" rx="60" ry="14"/><ellipse cx="560" cy="56" rx="44" ry="11"/><ellipse cx="110" cy="38" rx="50" ry="11"/></g>'+
  '<path d="M0 222 Q90 200 180 214 T360 208 T540 212 T640 204 L640 252 L0 252 Z" fill="#86b768"/><path d="M0 236 Q120 224 240 232 T480 230 T640 228 L640 252 L0 252 Z" fill="#6fa356"/>'+
  '<rect y="250" width="640" height="40" fill="#646e79"/><rect y="250" width="640" height="3" fill="#868f99"/><g fill="#f4f6f8" opacity=".85"><rect x="40" y="272" width="60" height="4"/><rect x="170" y="272" width="60" height="4"/><rect x="300" y="272" width="60" height="4"/><rect x="430" y="272" width="60" height="4"/><rect x="560" y="272" width="60" height="4"/></g>'+
  '<ellipse cx="350" cy="256" rx="230" ry="7" fill="#000" opacity=".28"/>'+
  /* train */
  '<g class="pt" data-p="tra" tabindex="0">'+
    '<path d="M151 196 L147 226" stroke="#59636e" stroke-width="7" stroke-linecap="round"/><path d="M151 196 L149.5 210" stroke="#c7ced6" stroke-width="3" stroke-linecap="round"/>'+
    '<ellipse cx="146" cy="238" rx="17" ry="15" fill="#cfd6de" stroke="#8d99a6" stroke-width="1.5"/><circle cx="146" cy="238" r="13" fill="url(#'+u+'wh)"/>'+
    '<path d="M292 196 Q298 214 306 224" fill="none" stroke="#4d5762" stroke-width="9" stroke-linecap="round"/><path d="M292 196 Q297 212 303 220" fill="none" stroke="#9aa6b3" stroke-width="3" stroke-linecap="round"/>'+
    '<ellipse cx="306" cy="237" rx="21" ry="17" fill="#e7ebf0" stroke="#8d99a6" stroke-width="1.5"/><circle cx="306" cy="237" r="15" fill="url(#'+u+'wh)"/><path d="M290 232 L270 226" stroke="#d94a3a" stroke-width="3" stroke-linecap="round"/>'+
  '</g>'+
  /* empennage horizontal */
  '<g class="pt" data-p="emh" tabindex="0">'+
    '<path d="M484 158 Q520 154 566 157 L566 168 Q520 169 486 168 Z" fill="url(#'+u+'wg)" stroke="#8d99a6" stroke-width="1.2"/>'+
    '<path d="M566 157 L604 159 Q608 163 604 167 L566 168 Z" fill="#dde3ea" stroke="#8d99a6" stroke-width="1.2"/><path d="M566 157 L566 168" stroke="#6b7782" stroke-width="1.5"/><path d="M570 163 L600 163" stroke="#b7c0ca" stroke-width="1"/>'+
  '</g>'+
  /* fuselage */
  '<g class="pt" data-p="fus" tabindex="0">'+
    '<path d="M186 152 L214 148 L242 112 L326 104 L402 112 L470 140 L566 158 L586 163 L586 171 L566 177 L330 202 L186 202 Z" fill="url(#'+u+'bd)" stroke="#8d99a6" stroke-width="1.5"/>'+
    '<path d="M196 178 L330 184 L566 169" fill="none" stroke="#d94a3a" stroke-width="5" stroke-linecap="round"/><path d="M196 187 L330 192 L560 175" fill="none" stroke="#1f4e8c" stroke-width="3" stroke-linecap="round"/>'+
    '<g stroke="#b7c0ca" stroke-width="1" fill="none"><path d="M402 112 L405 196"/><path d="M450 130 L452 192"/><path d="M500 146 L500 184"/></g>'+
    '<text x="430" y="176" font-size="13" font-weight="700" fill="#1f4e8c" font-family="Barlow,sans-serif" transform="rotate(-4 430 176)">F-BIA</text>'+
  '</g>'+
  /* cabine */
  '<g class="pt" data-p="cab" tabindex="0">'+
    '<path d="M228 148 L248 115 L292 110 L296 147 Z" fill="url(#'+u+'gl)" stroke="#5a6672" stroke-width="2"/>'+
    '<path d="M300 110 L330 108 L352 130 L358 147 L300 147 Z" fill="url(#'+u+'gl)" stroke="#5a6672" stroke-width="2"/>'+
    '<path d="M364 114 L398 116 L436 134 L366 142 Z" fill="url(#'+u+'gl)" stroke="#5a6672" stroke-width="2"/>'+
    '<path d="M254 114 L270 113 L252 142 L240 142 Z" fill="#fff" opacity=".18"/><path d="M306 112 L316 111 L334 142 L322 142 Z" fill="#fff" opacity=".14"/>'+
    '<path d="M298 110 L299 192" stroke="#8d99a6" stroke-width="1.5"/><rect x="304" y="156" width="14" height="4" rx="2" fill="#6b7782"/>'+
  '</g>'+
  /* aile haute */
  '<g class="pt" data-p="ail" tabindex="0">'+
    '<path d="M300 198 L334 106 L342 108 L306 200 Z" fill="#d9dfe6" stroke="#8d99a6" stroke-width="1.2"/>'+
    '<path d="M196 99 Q262 86 336 88 L430 97 Q438 101 430 105 L336 108 Q262 110 196 106 Q190 102 196 99 Z" fill="url(#'+u+'wg)" stroke="#8d99a6" stroke-width="1.5"/>'+
    '<path d="M300 100 L426 101" stroke="#b7c0ca" stroke-width="1.2" fill="none"/><path d="M380 98 L380 106" stroke="#8d99a6" stroke-width="1.5"/>'+
    '<path d="M196 99 Q190 102 196 106 L206 106 Q200 102 206 99 Z" fill="#d94a3a"/><circle cx="230" cy="94" r="2.5" fill="#6b7782"/>'+
  '</g>'+
  /* moteur et capot */
  '<g class="pt" data-p="mot" tabindex="0">'+
    '<path d="M128 170 Q128 146 160 142 L190 140 L190 202 L158 200 Q128 196 128 170 Z" fill="url(#'+u+'cw)" stroke="#8d99a6" stroke-width="1.5"/>'+
    '<ellipse cx="150" cy="184" rx="14" ry="7" fill="#1a2430"/><ellipse cx="166" cy="162" rx="8" ry="11" fill="#2a3644" opacity=".85"/><g stroke="#8d99a6" stroke-width="1"><path d="M172 150 L174 200"/><path d="M180 146 L182 200"/></g>'+
    '<path d="M168 202 L176 214 L200 214" fill="none" stroke="#75808c" stroke-width="5" stroke-linecap="round"/>'+
  '</g>'+
  /* hélice */
  '<g class="pt" data-p="hel" tabindex="0">'+
    '<ellipse cx="116" cy="172" rx="14" ry="86" fill="url(#'+u+'pb)"/>'+
    '<path d="M112 172 Q108 172 110 150 L116 96 Q122 92 123 98 L120 150 Q122 172 118 172 Z" fill="#26313d"/><path d="M113 172 Q109 172 111 194 L116 248 Q121 251 123 245 L120 194 Q121 172 118 172 Z" fill="#26313d"/>'+
    '<path d="M112 98 L123 98 L122 108 L113 108 Z" fill="#f2c230"/><path d="M112 242 L122 242 L121 250 L113 250 Z" fill="#f2c230"/>'+
    '<path d="M126 172 Q126 158 138 152 L138 192 Q126 186 126 172 Z" fill="url(#'+u+'sp)" stroke="#8d99a6" stroke-width="1.2"/><ellipse cx="119" cy="172" rx="7" ry="20" fill="url(#'+u+'sp)" stroke="#8d99a6" stroke-width="1.2"/>'+
  '</g>'+
  /* empennage vertical */
  '<g class="pt" data-p="emv" tabindex="0">'+
    '<path d="M494 150 L522 88 Q530 76 548 74 L560 74 L558 160 L500 158 Z" fill="url(#'+u+'wg)" stroke="#8d99a6" stroke-width="1.5"/>'+
    '<path d="M560 74 L582 78 Q586 84 584 92 L590 164 L558 164 Z" fill="#f3f5f8" stroke="#8d99a6" stroke-width="1.5"/>'+
    '<path d="M560 74 L558 164" stroke="#6b7782" stroke-width="1.6"/><path d="M522 88 L548 74 L560 74 L556 104 L512 108 Z" fill="#d94a3a"/><path d="M570 112 L586 112" stroke="#b7c0ca"/><circle cx="584" cy="86" r="3" fill="#ff3b30"/>'+
    '<path d="M588 150 L596 166 L584 166 Z" fill="#dde3ea" stroke="#8d99a6" stroke-width="1"/>'+
  '</g></svg>'; };
/* ---------- 3.1 Anatomie d’un avion ---------- */
S.plane={title:'Anatomie d’un avion léger', th:'t3', ch:'3-1',
desc:'Touche chaque partie de l’avion pour connaître son rôle et son nom en anglais.',
try:['Retrouve les deux parties de l’empennage horizontal : une fixe, une mobile.','Repère quelle gouverne se trouve sur l’aile et laquelle sur l’empennage.'],
mount(root,x){
  const info={
   hel:['Hélice (propeller)','Transforme la puissance du moteur en traction. Chaque pale est un petit profil d’aile qui « visse » l’avion dans l’air.'],
   mot:['Moteur et capot (engine, cowling)','Le groupe motopropulseur fournit la puissance. Le capot le protège et canalise l’air de refroidissement.'],
   cab:['Cabine (cockpit)','Le poste de pilotage : manche, palonnier, manette des gaz, instruments. Le pilote y garde une vue dégagée pour « voir et éviter ».'],
   fus:['Fuselage (fuselage)','Le corps de l’avion. Il relie l’aile, l’empennage et le train, et accueille cabine et soute. Structure souvent semi-monocoque : cadres, lisses et revêtement porteur.'],
   ail:['Voilure ou aile (wing)','Produit la portance. On y trouve les ailerons (roulis), les volets (flaps) qui augmentent la portance à basse vitesse, et souvent les réservoirs.'],
   emh:['Empennage horizontal (horizontal stabilizer)','Plan fixe qui stabilise en tangage, prolongé par la gouverne de profondeur (elevator), mobile, qui commande le tangage.'],
   emv:['Empennage vertical (vertical stabilizer, fin)','La dérive fixe stabilise en lacet. La gouverne de direction (rudder), mobile, commandée par le palonnier, commande le lacet.'],
   tra:['Train d’atterrissage (landing gear)','Roues, amortisseurs et freins. Ici un train tricycle : deux roues principales sous l’aile et une roue avant orientable.']
  };
  const u=x.uid;
  root.innerHTML=window.BIA.planeSVG(u)+
  '<style>#'+u+'s .pt{cursor:pointer;transition:filter .15s}#'+u+'s .pt:hover,#'+u+'s .pt.on{filter:drop-shadow(0 0 5px #ff8a3d) brightness(1.08)}#'+u+'s .tag{pointer-events:none}</style><div class="verdict" id="'+u+'t"><b>Touche une partie.</b></div>';
  const t=x.q('#'+x.uid+'t');
  function pick(g){ x.qa('.pt').forEach(p=>p.classList.toggle('on',p===g)); const i=info[g.dataset.p]; t.innerHTML='<b>'+i[0]+'</b><br>'+i[1];
    const svg=x.q('#'+x.uid+'s'); const old=svg.querySelector('.tag'); if(old) old.remove(); const bb=g.getBBox(); const nm=i[0].split(' (')[0]; const w=nm.length*7.4+18; let cx=bb.x+bb.width/2, cy=bb.y-12; if(cy<22) cy=bb.y+bb.height+22; cx=Math.max(w/2+4,Math.min(640-w/2-4,cx));
    const ns='http://www.w3.org/2000/svg'; const tg=document.createElementNS(ns,'g'); tg.setAttribute('class','tag'); const r=document.createElementNS(ns,'rect'); r.setAttribute('x',cx-w/2); r.setAttribute('y',cy-14); r.setAttribute('width',w); r.setAttribute('height',24); r.setAttribute('rx',12); r.setAttribute('fill','#12202f'); const tx=document.createElementNS(ns,'text'); tx.setAttribute('x',cx); tx.setAttribute('y',cy+3); tx.setAttribute('text-anchor','middle'); tx.setAttribute('font-size','13'); tx.setAttribute('font-weight','700'); tx.setAttribute('fill','#fff'); tx.textContent=nm; tg.appendChild(r); tg.appendChild(tx); svg.appendChild(tg); }
  x.qa('.pt').forEach(g=>{ g.addEventListener('click',()=>pick(g)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); pick(g); } }); });
}};

/* ---------- 3.3 Tableau de bord ---------- */
function polar(cx,cy,r,a){ return [cx+r*Math.sin(rad(a)), cy-r*Math.cos(rad(a))]; }
function arcPath(cx,cy,r,a1,a2){ const p1=polar(cx,cy,r,a1), p2=polar(cx,cy,r,a2); return 'M'+p1[0]+' '+p1[1]+' A'+r+' '+r+' 0 '+((a2-a1)>180?1:0)+' 1 '+p2[0]+' '+p2[1]; }
S.panel={title:'Anémomètre et horizon artificiel', th:'t3', ch:'3-3',
desc:'Lis les deux instruments les plus utilisés en vol : la vitesse et l’attitude de l’avion.',
try:['Place la vitesse sur l’arc blanc : les volets sont autorisés. Sur le trait rouge : vitesse à ne jamais dépasser.','Monte le tangage : l’horizon descend dans le cadran. Incline à droite : l’horizon bascule à gauche.','Lance le défi et lis l’horizon avant de répondre.'],
mount(root,x){
  const kv=v=>-135+v/200*270;
  root.innerHTML='<div class="grid2"><div><svg viewBox="0 0 200 200" id="'+x.uid+'a" role="img" aria-label="Anémomètre"></svg>'+x.r('v','Vitesse indiquée',0,200,1,95,' kt')+'<div class="verdict" id="'+x.uid+'av"></div></div><div><svg viewBox="0 0 200 200" id="'+x.uid+'h" role="img" aria-label="Horizon artificiel"></svg>'+x.r('p','Tangage (assiette)',-20,20,1,5,'°')+x.r('r','Inclinaison',-60,60,1,0,'°')+'<div class="verdict" id="'+x.uid+'hv"></div></div></div>'+
  '<div class="sep"></div><div class="row"><button type="button" class="btn sec sm" id="'+x.uid+'g">Défi : lis l’horizon</button></div><div id="'+x.uid+'ch"></div>';
  const a=x.q('#'+x.uid+'a'), h=x.q('#'+x.uid+'h');
  function asi(){
    const v=x.v('v'); let o='<circle cx="100" cy="100" r="96" fill="#111" stroke="var(--mute)" stroke-width="3"/>';
    o+='<path d="'+arcPath(100,100,80,kv(40),kv(85))+'" fill="none" stroke="#fff" stroke-width="7"/><path d="'+arcPath(100,100,88,kv(50),kv(129))+'" fill="none" stroke="#3ecf6e" stroke-width="6"/><path d="'+arcPath(100,100,88,kv(129),kv(163))+'" fill="none" stroke="#f2d33a" stroke-width="6"/>';
    const r1=polar(100,100,80,kv(163)), r2=polar(100,100,94,kv(163)); o+='<line x1="'+r1[0]+'" y1="'+r1[1]+'" x2="'+r2[0]+'" y2="'+r2[1]+'" stroke="#e5483b" stroke-width="5"/>';
    for(let s=0;s<=200;s+=20){ const p1=polar(100,100,70,kv(s)), p2=polar(100,100,62,kv(s)), t=polar(100,100,50,kv(s)); o+='<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="#fff" stroke-width="2"/><text x="'+t[0]+'" y="'+(t[1]+4)+'" text-anchor="middle" font-size="11" fill="#fff">'+s+'</text>'; }
    const n=polar(100,100,76,kv(v)); o+='<line x1="100" y1="100" x2="'+n[0]+'" y2="'+n[1]+'" stroke="#fff" stroke-width="3"/><circle cx="100" cy="100" r="6" fill="#fff"/><text x="100" y="140" text-anchor="middle" font-size="10" fill="#bbb">KT</text>';
    a.innerHTML=o; a.style.background='transparent';
    const t=x.q('#'+x.uid+'av'); let m,c='';
    if(v<40){ m='Sous la vitesse de décrochage en configuration atterrissage : l’avion ne vole plus.'; c='bad'; }
    else if(v<50){ m='Arc blanc seul : seulement possible volets sortis. Très près du décrochage.'; c='warn'; }
    else if(v<=85){ m='Arc blanc : plage où les volets peuvent être sortis (jusqu’à VFE).'; c='ok'; }
    else if(v<=129){ m='Arc vert : plage normale d’utilisation, de la vitesse de décrochage lisse à VNO.'; c='ok'; }
    else if(v<=163){ m='Arc jaune : prudence. Seulement en air calme, jamais en turbulence.'; c='warn'; }
    else { m='Au-delà du trait rouge : VNE dépassée, vitesse à ne jamais dépasser. Risque de dommages structurels.'; c='bad'; }
    t.className='verdict '+c; t.textContent=m;
  }
  function hor(){
    const p=x.v('p'), r=x.v('r'); drawH(p,r);
    const t=x.q('#'+x.uid+'hv'); t.className='verdict'; t.textContent=(p>2?'Montée':p<-2?'Descente':'Palier')+(r>4?', incliné à droite':r<-4?', incliné à gauche':', ailes horizontales')+'.';
  }
  function drawH(p,r){
    let o='<defs><clipPath id="'+x.uid+'cp"><circle cx="100" cy="100" r="92"/></clipPath></defs><circle cx="100" cy="100" r="96" fill="#111"/><g clip-path="url(#'+x.uid+'cp)"><g transform="rotate('+(-r)+' 100 100) translate(0 '+(p*3.2)+')"><rect x="-200" y="-300" width="600" height="400" fill="#4a90d9"/><rect x="-200" y="100" width="600" height="400" fill="#8a5a2b"/><line x1="-200" y1="100" x2="400" y2="100" stroke="#fff" stroke-width="2"/>';
    for(let d=-30;d<=30;d+=10){ if(d===0) continue; const y=100-d*3.2, w=d%20===0?36:20; o+='<line x1="'+(100-w)+'" y1="'+y+'" x2="'+(100+w)+'" y2="'+y+'" stroke="#fff" stroke-width="2"/>'+(d%20===0?'<text x="'+(100+w+4)+'" y="'+(y+4)+'" font-size="9" fill="#fff">'+Math.abs(d)+'</text>':''); }
    o+='</g></g><path d="M60 100 L90 100 L90 108 M140 100 L110 100 L110 108" fill="none" stroke="#ffcf33" stroke-width="5"/><circle cx="100" cy="100" r="4" fill="#ffcf33"/>';
    h.innerHTML=o;
  }
  x.bind(()=>{ asi(); hor(); });
  let ans=null; const ch=x.q('#'+x.uid+'ch');
  x.q('#'+x.uid+'g').addEventListener('click',()=>{
    const P=[-15,0,15][Math.floor(Math.random()*3)], R=[-35,0,35][Math.floor(Math.random()*3)];
    const lab=(P,R)=>(P>0?'Montée':P<0?'Descente':'Palier')+(R>0?', incliné à droite':R<0?', incliné à gauche':', ailes horizontales');
    const opts=[[P,R]]; while(opts.length<4){ const p=[-15,0,15][Math.floor(Math.random()*3)], r=[-35,0,35][Math.floor(Math.random()*3)]; if(!opts.some(o=>o[0]===p&&o[1]===r)) opts.push([p,r]); }
    const sh=window.BIA.shuffle(opts); x.setv('p',P); x.setv('r',R); asi(); hor();
    ch.innerHTML='<p class="q-stem" style="margin-top:10px">Que fait l’avion ?</p><div class="opts">'+sh.map((o,i)=>'<button type="button" class="opt" data-ok="'+(o[0]===P&&o[1]===R?1:0)+'"><span class="l">'+'ABCD'[i]+'</span><span>'+lab(o[0],o[1])+'</span></button>').join('')+'</div><div id="'+x.uid+'cr"></div>';
    ch.onclick=e=>{ const b=e.target.closest('.opt'); if(!b) return; x.qa('#'+x.uid+'ch .opt').forEach(o=>{ o.disabled=true; if(o.dataset.ok==='1') o.classList.add('good'); }); if(b.dataset.ok!=='1') b.classList.add('bad'); x.q('#'+x.uid+'cr').innerHTML='<div class="expl '+(b.dataset.ok==='1'?'ok':'ko')+'">'+(b.dataset.ok==='1'?'Bien lu.':'Regarde bien :')+' Le réticule jaune est l’avion ; l’horizon bascule du côté opposé à l’inclinaison, et descend quand le nez monte.</div>'; };
  });
}};

/* ---------- 4.2 Triangle des vitesses ---------- */
S.nav={title:'Triangle des vitesses', th:'t4', ch:'4-2',
desc:'Règle ta route et le vent : trouve le cap à afficher, la dérive et la vitesse sol.',
try:['Route 360°, vent d’ouest (270°) : le cap passe à gauche de la route.','Mets le vent dans l’axe de la route : plus de dérive, mais la vitesse sol change.','Augmente le vent à 40 kt avec une vitesse propre faible : la correction devient énorme.'],
mount(root,x){
  root.innerHTML=x.r('rv','Route à suivre (Rv)',1,360,1,360,'°')+x.r('tas','Vitesse propre (TAS)',60,200,5,100,' kt')+x.r('wd','Direction d’où vient le vent',0,359,1,270,'°')+x.r('wf','Force du vent',0,50,1,20,' kt')+x.r('d','Distance à parcourir',10,300,5,60,' NM')+
  '<svg viewBox="0 0 400 400" id="'+x.uid+'s" role="img" aria-label="Rose des caps et triangle des vitesses" style="max-width:460px;margin:0 auto"></svg><div class="readout"><div><small>Cap à afficher</small><b id="'+x.uid+'cap"></b></div><div><small>Correction de dérive</small><b id="'+x.uid+'dr"></b></div><div><small>Vitesse sol</small><b id="'+x.uid+'gs"></b></div><div><small>Durée du trajet</small><b id="'+x.uid+'t"></b></div></div><div class="verdict" id="'+x.uid+'v"></div>';
  const sv=x.q('#'+x.uid+'s'), sc=0.7, cx=200, cy=200;
  const vec=(h,len)=>[Math.sin(rad(h))*len, -Math.cos(rad(h))*len];
  function draw(){
    let Rv=x.v('rv'); if(Rv===0) Rv=360; const tas=x.v('tas'), wd=x.v('wd'), W=x.v('wf'), D=x.v('d');
    const dl=rad(wd-Rv), ws=W*Math.sin(dl), wh=W*Math.cos(dl);
    let o='<circle cx="200" cy="200" r="190" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/>';
    for(let a=0;a<360;a+=10){ const r1=a%30===0?172:180, p1=polar(cx,cy,r1,a), p2=polar(cx,cy,190,a); o+='<line x1="'+p1[0]+'" y1="'+p1[1]+'" x2="'+p2[0]+'" y2="'+p2[1]+'" stroke="var(--mute)" stroke-width="'+(a%30===0?2:1)+'"/>'; }
    [['N',0],['E',90],['S',180],['O',270]].forEach(q=>{ const p=polar(cx,cy,155,q[1]); o+='<text x="'+p[0]+'" y="'+(p[1]+6)+'" text-anchor="middle" font-size="17" font-weight="700" fill="var(--ink)">'+q[0]+'</text>'; });
    if(Math.abs(ws)>tas){ sv.innerHTML=o+'<text x="200" y="205" text-anchor="middle" fill="var(--bad)" font-size="16" font-weight="700">Vent trop fort pour tenir cette route</text>'; ['cap','dr','gs','t'].forEach(i=>x.q('#'+x.uid+i).textContent='—'); const v=x.q('#'+x.uid+'v'); v.className='verdict bad'; v.textContent='Le vent traversier ('+Math.round(Math.abs(ws))+' kt) dépasse ta vitesse propre : impossible de tenir la route. Il faut une vitesse plus grande ou un autre trajet.'; return; }
    const wca=Math.asin(ws/tas)*180/Math.PI, hd=((Rv+wca)%360+360)%360, gs=tas*Math.cos(rad(wca))-wh;
    const A=vec(hd,tas*sc), wv=vec(wd+180,W*sc), B=[A[0]+wv[0],A[1]+wv[1]];
    const rl=polar(cx,cy,185,Rv); o+='<line x1="200" y1="200" x2="'+rl[0]+'" y2="'+rl[1]+'" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 5"/>';
    const ar=(x1,y1,x2,y2,c,w)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+c+'" stroke-width="'+w+'"/>';
    o+=ar(cx,cy,cx+A[0],cy+A[1],'var(--acc)',5)+ar(cx+A[0],cy+A[1],cx+B[0],cy+B[1],'var(--c1)',5)+ar(cx,cy,cx+B[0],cy+B[1],'var(--ok)',5);
    const tip=(px,py,ang,c)=>'<polygon points="0,-8 14,0 0,8" fill="'+c+'" transform="translate('+px+' '+py+') rotate('+(ang-90)+')"/>';
    o+=tip(cx+A[0],cy+A[1],hd,'var(--acc)')+tip(cx+B[0],cy+B[1],wd+180,'var(--c1)')+tip(cx+B[0]*0.98,cy+B[1]*0.98,Rv,'var(--ok)');
    o+='<circle cx="200" cy="200" r="5" fill="var(--ink)"/>';
    o+='<g font-size="13" font-weight="700"><text x="12" y="22" fill="var(--acc)">Cap + vitesse propre</text><text x="12" y="40" fill="var(--c1)">Vent (vers où il souffle)</text><text x="12" y="58" fill="var(--ok)">Route + vitesse sol</text></g>';
    sv.innerHTML=o;
    x.q('#'+x.uid+'cap').textContent=pad3(hd===0?360:hd)+'°'; x.q('#'+x.uid+'dr').textContent=f1(Math.abs(wca),0)+'° '+(wca>0.5?'à droite':wca<-0.5?'à gauche':'(aucune)'); x.q('#'+x.uid+'gs').textContent=Math.round(gs)+' kt';
    const mins=D/gs*60; x.q('#'+x.uid+'t').textContent=Math.floor(mins/60)+' h '+String(Math.round(mins%60)).padStart(2,'0')+' min';
    const v=x.q('#'+x.uid+'v'); v.className='verdict ok';
    v.textContent=(Math.abs(wh)<1?'Pas de vent de face ni arrière. ':wh>0?'Vent de face de '+Math.round(wh)+' kt : tu perds '+Math.round(tas-gs)+' kt par rapport à ta vitesse propre. ':'Vent arrière de '+Math.round(-wh)+' kt : vitesse sol supérieure à la vitesse propre. ')+(Math.abs(ws)<1?'Pas de vent traversier.':'Vent traversier de '+Math.round(Math.abs(ws))+' kt venant de '+(ws>0?'droite':'gauche')+' : tu dois afficher un cap tourné vers le vent.');
  }
  x.bind(draw);
}};

/* ---------- 4.1 Convertisseur ---------- */
S.conv={title:'Unités de l’aviation', th:'t4', ch:'4-1',
desc:'Convertis milles nautiques, nœuds, pieds, et calcule une durée de vol. Les trois unités de base de la navigation.',
try:['Entre 120 kt : combien de km/h ?','Un avion de ligne à FL 350 : combien de mètres ?'],
mount(root,x){
  const f=(id,lab,unit,val)=>'<div class="rng"><label for="'+x.uid+id+'">'+lab+'</label><input type="number" id="'+x.uid+id+'" value="'+val+'" min="0" style="width:100%"></div>';
  root.innerHTML='<div class="grid2">'+f('nm','Milles nautiques (NM)','',60)+f('kt','Nœuds (kt)','',120)+f('ft','Pieds (ft)','',5000)+f('d','Distance (NM) pour la durée','',90)+'</div><div class="readout"><div><small>NM → km</small><b id="'+x.uid+'o1"></b></div><div><small>kt → km/h</small><b id="'+x.uid+'o2"></b></div><div><small>ft → m</small><b id="'+x.uid+'o3"></b></div><div><small>Durée de vol (distance ÷ vitesse)</small><b id="'+x.uid+'o4"></b></div></div><div class="verdict ok">1 NM = 1 852 m (une minute d’arc de latitude) · 1 kt = 1 NM/h = 1,852 km/h · 1 ft = 0,3048 m.</div>';
  const n=id=>parseFloat(x.q('#'+x.uid+id).value)||0;
  function calc(){ x.q('#'+x.uid+'o1').textContent=f1(n('nm')*1.852,1)+' km'; x.q('#'+x.uid+'o2').textContent=f1(n('kt')*1.852,0)+' km/h'; x.q('#'+x.uid+'o3').textContent=f1(n('ft')*0.3048,0)+' m'; const m=n('kt')?n('d')/n('kt')*60:0; x.q('#'+x.uid+'o4').textContent=Math.floor(m/60)+' h '+String(Math.round(m%60)).padStart(2,'0')+' min'; }
  x.qa('input').forEach(i=>i.addEventListener('input',calc)); calc();
}};

/* ---------- 4.4 Altimètre ---------- */
S.alti={title:'Altimètre et calages', th:'t4', ch:'4-4',
desc:'Règle le calage de l’altimètre et vois l’erreur quand la pression change en route.',
try:['Cale sur le QNH réel : l’altimètre indique l’altitude vraie.','Garde un calage plus haut que le QNH réel : l’altimètre « surestime » ton altitude. Dangereux près du relief.','Cale sur 1013 : l’altimètre donne l’altitude-pression, base du niveau de vol.'],
mount(root,x){
  root.innerHTML=x.r('h','Ton altitude vraie',0,8000,50,3000,' ft')+x.r('q','Pression réelle (QNH du moment)',985,1040,1,1003,' hPa')+x.r('s','Calage affiché sur l’altimètre',985,1040,1,1013,' hPa')+
  '<div class="row"><button type="button" class="btn sec sm" id="'+x.uid+'b1">Caler sur le QNH réel</button><button type="button" class="btn sec sm" id="'+x.uid+'b2">Caler sur 1013</button></div><svg viewBox="0 0 200 200" id="'+x.uid+'s" role="img" aria-label="Altimètre" style="max-width:300px;margin:8px auto"></svg><div class="readout"><div><small>Altimètre indique</small><b id="'+x.uid+'i"></b></div><div><small>Altitude vraie</small><b id="'+x.uid+'t"></b></div><div><small>Niveau de vol (calé 1013)</small><b id="'+x.uid+'fl"></b></div></div><div class="verdict" id="'+x.uid+'v"></div>';
  const sv=x.q('#'+x.uid+'s');
  function draw(){
    const h=x.v('h'), q=x.v('q'), s=x.v('s'), ind=h+(s-q)*30, pa=h+(1013-q)*30;
    let o='<circle cx="100" cy="100" r="96" fill="#111" stroke="var(--mute)" stroke-width="3"/>';
    for(let i=0;i<10;i++){ const p=polar(100,100,76,i*36), t=polar(100,100,62,i*36); o+='<line x1="'+p[0]+'" y1="'+p[1]+'" x2="'+polar(100,100,86,i*36)[0]+'" y2="'+polar(100,100,86,i*36)[1]+'" stroke="#fff" stroke-width="3"/><text x="'+t[0]+'" y="'+(t[1]+6)+'" text-anchor="middle" font-size="17" fill="#fff" font-weight="700">'+i+'</text>'; }
    const hund=((ind%1000)+1000)%1000/1000*360, thou=((ind%10000)+10000)%10000/10000*360;
    const e1=polar(100,100,72,hund), e2=polar(100,100,44,thou);
    o+='<line x1="100" y1="100" x2="'+e1[0]+'" y2="'+e1[1]+'" stroke="#fff" stroke-width="4"/><line x1="100" y1="100" x2="'+e2[0]+'" y2="'+e2[1]+'" stroke="#ffcf33" stroke-width="8"/><circle cx="100" cy="100" r="6" fill="#fff"/>';
    o+='<rect x="128" y="88" width="50" height="24" rx="3" fill="#333" stroke="#888"/><text x="153" y="105" text-anchor="middle" font-size="14" fill="#ffcf33" font-family="monospace">'+s+'</text><text x="100" y="150" text-anchor="middle" font-size="9" fill="#bbb">ALT · calage hPa</text>';
    sv.innerHTML=o;
    x.q('#'+x.uid+'i').textContent=Math.round(ind/10)*10+' ft'; x.q('#'+x.uid+'t').textContent=Math.round(h)+' ft'; x.q('#'+x.uid+'fl').textContent='FL '+String(Math.round(pa/100)).padStart(3,'0');
    const d=ind-h, v=x.q('#'+x.uid+'v');
    if(Math.abs(d)<20){ v.className='verdict ok'; v.textContent='Calage correct : l’altimètre indique ton altitude vraie.'; }
    else if(d>0){ v.className='verdict bad'; v.textContent='Danger : le calage est trop haut. L’altimètre indique '+Math.round(d)+' ft de PLUS que la réalité. Tu es plus bas que tu ne le crois.'; }
    else { v.className='verdict warn'; v.textContent='Le calage est trop bas : l’altimètre indique '+Math.round(-d)+' ft de MOINS que la réalité. Tu es plus haut que tu ne le crois (erreur moins dangereuse, mais à corriger).'; }
  }
  x.bind(draw);
  x.q('#'+x.uid+'b1').addEventListener('click',()=>{ x.setv('s',x.v('q')); draw(); });
  x.q('#'+x.uid+'b2').addEventListener('click',()=>{ x.setv('s',1013); draw(); });
}};

/* ---------- 4.6 Circuit de piste ---------- */
S.circuit={title:'Circuit d’aérodrome', th:'t4', ch:'4-6',
desc:'Suis un avion dans le circuit à main gauche. Le vent décide de la piste en service.',
try:['Change le vent : la piste en service et le sens du circuit changent, mais restent à gauche.','Joue l’animation, puis touche chaque étape pour lire ce que fait le pilote.'],
mount(root,x){
  const st=[
   ['Montée initiale','Plein gaz, ailes horizontales, dans l’axe de la piste. Vitesse de montée Vy. Tu continues tout droit jusqu’à environ 500 ft au-dessus de l’aérodrome.'],
   ['Vent traversier','Virage à gauche de 90°, vers 500 ft. Tu continues à monter, perpendiculaire à la piste.'],
   ['Vent arrière','Nouveau virage à gauche : tu voles parallèle à la piste, en sens inverse de l’atterrissage, en palier à environ 1 000 ft. Tu réduis la puissance, annonces ta position à la radio et fais la check-list.'],
   ['Étape de base','Virage à gauche, tu t’approches de l’axe en descendant. Volets partiels, vitesse stabilisée.'],
   ['Finale','Dernier virage à gauche pour s’aligner sur l’axe. Descente stable, volets d’atterrissage, vitesse d’approche. Puis arrondi et toucher des roues, face au vent.']
  ];
  root.innerHTML=x.seg('rw',[['27','Vent d’ouest : piste 27'],['09','Vent d’est : piste 09']],'27')+'<svg viewBox="0 0 700 330" id="'+x.uid+'s" role="img" aria-label="Plan d’un circuit d’aérodrome à main gauche"></svg><div class="row" style="margin:6px 0">'+st.map((s,i)=>'<button type="button" class="btn sec sm" data-i="'+i+'">'+(i+1)+'. '+s[0]+'</button>').join('')+'<button type="button" class="btn sm" id="'+x.uid+'p">▶ Tout le circuit</button></div><div class="verdict" id="'+x.uid+'t"></div>';
  let rw='27', cur=0, raf=null; const sv=x.q('#'+x.uid+'s'), tb=x.q('#'+x.uid+'t');
  const P=[[470,130],[110,130],[110,250],[620,250],[620,130],[470,130]];
  const T=p=>rw==='27'?p:[700-p[0],260-p[1]];
  function pathD(i){ const a=T(P[i]), b=T(P[i+1]); return 'M'+a[0]+' '+a[1]+' L'+b[0]+' '+b[1]; }
  function draw(){
    let o='<rect width="700" height="330" fill="var(--soft)"/><rect x="230" y="118" width="240" height="24" fill="var(--ink)"/><line x1="236" x2="464" y1="130" y2="130" stroke="#fff" stroke-dasharray="14 10" stroke-width="2"/>';
    o+='<text x="'+(rw==='27'?242:458)+'" y="152" text-anchor="'+(rw==='27'?'start':'end')+'" font-size="13" fill="var(--ink)" font-weight="700">'+(rw==='27'?'27':'09')+'</text><text x="'+(rw==='27'?458:242)+'" y="152" text-anchor="'+(rw==='27'?'end':'start')+'" font-size="13" fill="var(--mute)" font-weight="700">'+(rw==='27'?'09':'27')+'</text>';
    for(let i=0;i<5;i++){ o+='<path id="'+x.uid+'leg'+i+'" d="'+pathD(i)+'" fill="none" stroke="'+(i===cur?'var(--acc)':'var(--c1)')+'" stroke-width="'+(i===cur?6:3)+'" '+(i===cur?'':'stroke-dasharray="8 6"')+'/>'; }
    const lab=[[290,118],[96,190],[360,270],[640,190],[350,118]];
    ['Montée initiale','Vent traversier','Vent arrière','Base','Finale'].forEach((n,i)=>{ const q=T(i===0?[290,112]:i===1?[100,190]:i===2?[360,276]:i===3?[618,190]:[560,112]); o+='<text x="'+q[0]+'" y="'+q[1]+'" text-anchor="'+(i===1?(rw==='27'?'end':'start'):i===3?(rw==='27'?'start':'end'):'middle')+'" font-size="14" font-weight="'+(i===cur?700:500)+'" fill="'+(i===cur?'var(--acc)':'var(--ink)')+'">'+(i+1)+'. '+n+'</text>'; });
    const w=T([350,90]); const dir=rw==='27'?1:-1;
    o+='<g transform="translate('+w[0]+' '+w[1]+')"><line x1="0" y1="0" x2="0" y2="22" stroke="var(--ink)" stroke-width="3"/><path d="M0 2 L'+(36*dir)+' 6 L'+(36*dir)+' 14 L0 12 Z" fill="var(--acc)"/></g><text x="'+(w[0]+(rw==='27'?-30:30))+'" y="'+(w[1]+6)+'" text-anchor="'+(rw==='27'?'end':'start')+'" font-size="12" fill="var(--mute)">manche à air</text>';
    o+='<text x="'+T([60,300])[0]+'" y="320" text-anchor="'+(rw==='27'?'start':'end')+'" font-size="12" fill="var(--mute)">Le vent souffle vers '+(rw==='27'?'l’est':'l’ouest')+' : on décolle et atterrit face à lui.</text>';
    o+='<g id="'+x.uid+'pl"><polygon points="-12,-8 14,0 -12,8 -6,0" fill="var(--ink)"/></g>';
    sv.innerHTML=o; place(cur,0);
    tb.className='verdict ok'; tb.innerHTML='<b>'+(cur+1)+'. '+st[cur][0]+'</b><br>'+st[cur][1];
  }
  function place(i,t){ const p=sv.querySelector('#'+x.uid+'leg'+i); if(!p) return; const L=p.getTotalLength(), a=p.getPointAtLength(Math.max(0,L*t)), b=p.getPointAtLength(Math.min(L,L*t+1)); const ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI; const pl=sv.querySelector('#'+x.uid+'pl'); pl.setAttribute('transform','translate('+a.x+' '+a.y+') rotate('+ang+')'); }
  function play(from,to){ cancelAnimationFrame(raf); let i=from, t0=null; const dur=2200; function f(ts){ if(t0===null) t0=ts; let t=(ts-t0)/dur; if(t>=1){ if(i<to){ i++; cur=i; draw(); t0=ts; raf=requestAnimationFrame(f); return; } place(i,1); return; } if(cur!==i){ cur=i; draw(); } place(i,t); raf=requestAnimationFrame(f); } cur=from; draw(); raf=requestAnimationFrame(f); }
  x.onCleanup(()=>cancelAnimationFrame(raf));
  x.segBind('rw',v=>{ rw=v; cancelAnimationFrame(raf); draw(); });
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-i]'); if(b){ cancelAnimationFrame(raf); cur=+b.dataset.i; draw(); play(cur,cur); } if(e.target.id===x.uid+'p') play(0,4); });
  draw();
}};

/* ---------- 4.6 PAPI ---------- */
S.papi={title:'PAPI : indicateur de pente', th:'t4', ch:'4-6',
desc:'Quatre feux rouges et blancs te disent si tu es sur la bonne pente d’approche (3°).',
try:['Cherche la hauteur qui donne 2 blancs et 2 rouges : tu es sur la pente.','Monte : les feux deviennent blancs. Descends : ils deviennent rouges.'],
mount(root,x){
  root.innerHTML=x.r('h','Ta hauteur à 2 NM du seuil',350,900,5,640,' ft')+'<svg viewBox="0 0 640 220" id="'+x.uid+'s" role="img" aria-label="Avion sur la pente d’approche"></svg><svg viewBox="0 0 320 90" id="'+x.uid+'p" role="img" aria-label="Quatre feux du PAPI" style="max-width:360px;margin:6px auto;background:#0c1520"></svg><div class="readout"><div><small>Angle de ta trajectoire</small><b id="'+x.uid+'a"></b></div></div><div class="verdict" id="'+x.uid+'t"></div>';
  const sv=x.q('#'+x.uid+'s'), pp=x.q('#'+x.uid+'p');
  function draw(){
    const h=x.v('h'), ang=Math.atan(h/12152)*180/Math.PI; let w=ang>3.5?4:ang>3.17?3:ang>2.83?2:ang>2.5?1:0;
    const gy=190-480*Math.tan(rad(3*3.2));
    let o='<rect width="640" height="220" fill="var(--sky)" opacity=".45"/><rect y="190" width="640" height="30" fill="var(--ground)"/><rect x="520" y="184" width="110" height="8" fill="var(--ink)"/>';
    o+='<line x1="520" y1="190" x2="40" y2="'+gy+'" stroke="var(--ok)" stroke-width="3" stroke-dasharray="8 6"/><text x="46" y="'+(gy-8)+'" font-size="13" fill="var(--ok)" font-weight="700">pente 3°</text>';
    const ax=130, ay=190-(520-ax)*Math.tan(rad(ang*3.2));
    o+='<g transform="translate('+ax+' '+ay+')"><path d="M-24 0 L14 -4 L26 0 L14 4 Z" fill="var(--ink)"/><path d="M-6 0 L-14 -16 L-4 -16 L8 0 Z" fill="var(--ink)"/></g><line x1="'+ax+'" y1="'+ay+'" x2="520" y2="190" stroke="var(--acc)" stroke-width="2"/>';
    o+='<text x="520" y="176" text-anchor="end" font-size="12" fill="var(--ink)">seuil de piste + PAPI</text><text x="14" y="212" font-size="11" fill="var(--mute)">échelle verticale très exagérée</text>';
    sv.innerHTML=o;
    let q='';
    for(let i=0;i<4;i++) q+='<circle cx="'+(50+i*72)+'" cy="45" r="26" fill="'+(i<w?'#ffffff':'#e5392d')+'"/>';
    pp.innerHTML=q;
    x.q('#'+x.uid+'a').textContent=f1(ang,2)+'°';
    const t=x.q('#'+x.uid+'t'); const msg=['4 rouges : bien trop bas. Remets de la puissance et remonte immédiatement.','3 rouges, 1 blanc : un peu trop bas. Corrige en ajoutant un peu de puissance.','2 blancs, 2 rouges : tu es sur la bonne pente. Garde-la.','3 blancs, 1 rouge : un peu trop haut. Réduis la puissance et descends.','4 blancs : bien trop haut. Réduis et augmente la pente de descente.'];
    t.className='verdict '+(w===2?'ok':(w===1||w===3)?'warn':'bad'); t.textContent=msg[w];
  }
  x.bind(draw);
}};

/* ---------- 3.5 Orbites ---------- */
S.orbit={title:'Orbites autour de la Terre', th:'t3', ch:'3-5',
desc:'Choisis une altitude : vitesse, période et nombre de tours par jour d’un satellite (échelle d’affichage non linéaire).',
try:['Place-toi à 400 km (ISS) : environ 16 tours par jour.','Monte vers 35 786 km : la période devient celle de la Terre, le satellite reste au-dessus du même point.','Compare la vitesse de l’orbite basse et celle de l’orbite géostationnaire.'],
mount(root,x){
  root.innerHTML=x.r('h','Altitude',200,40000,100,400,' km')+'<div class="row" style="margin-bottom:6px"><button type="button" class="btn sec sm" data-h="400">ISS 400 km</button><button type="button" class="btn sec sm" data-h="700">Héliosynchrone 700 km</button><button type="button" class="btn sec sm" data-h="23222">Galileo 23 222 km</button><button type="button" class="btn sec sm" data-h="35786">Géostationnaire 35 786 km</button></div><canvas id="'+x.uid+'c" width="640" height="340" role="img" aria-label="Satellite en orbite autour de la Terre"></canvas><div class="readout"><div><small>Vitesse</small><b id="'+x.uid+'v"></b></div><div><small>Période</small><b id="'+x.uid+'p"></b></div><div><small>Tours par jour</small><b id="'+x.uid+'n"></b></div></div><div class="verdict" id="'+x.uid+'t"></div>';
  const cv=x.q('#'+x.uid+'c'), g=cv.getContext('2d'); const mu=398600, R=6371; let tsim=0, last=null, raf=null;
  function info(){ const h=x.v('h'), r=R+h, v=Math.sqrt(mu/r), T=2*Math.PI*Math.sqrt(r*r*r/mu); return {h,r,v,T}; }
  function readout(){ const i=info(); x.q('#'+x.uid+'v').textContent=f1(i.v,2)+' km/s ('+Math.round(i.v*3600).toLocaleString('fr-FR')+' km/h)'; const hh=Math.floor(i.T/3600), mm=Math.round(i.T%3600/60); x.q('#'+x.uid+'p').textContent=(hh?hh+' h ':'')+String(mm).padStart(hh?2:1,'0')+' min'; x.q('#'+x.uid+'n').textContent=f1(86164/i.T,1);
    const t=x.q('#'+x.uid+'t'); t.className='verdict'; t.textContent=Math.abs(i.h-35786)<400?'Orbite géostationnaire : la période égale la rotation de la Terre (23 h 56 min), au-dessus de l’équateur. Le satellite semble immobile dans le ciel : idéal pour la télévision et la météo (Météosat).':i.h<2000?'Orbite basse (LEO) : le satellite va très vite et fait le tour de la Terre en moins de deux heures. Observation, stations, constellations.':i.h<35000?'Orbite moyenne (MEO) : navigation par satellite (GPS vers 20 200 km, Galileo vers 23 222 km).':'Au-delà de l’orbite géostationnaire : le satellite est plus lent que la rotation terrestre.'; }
  function frame(ts){ if(last===null) last=ts; const dt=(ts-last)/1000; last=ts; tsim+=dt*2400; const i=info();
    const W=cv.width, H=cv.height, cx=W/2, cy=H/2, er=30, orR=er+135*Math.sqrt((i.h)/40000)+0;
    g.clearRect(0,0,W,H); const cs=getComputedStyle(cv); const ink=cs.getPropertyValue('--ink')||'#000', mute=cs.getPropertyValue('--mute'), acc=cs.getPropertyValue('--acc'), c1=cs.getPropertyValue('--c1'), ground=cs.getPropertyValue('--ground');
    g.strokeStyle=mute; g.setLineDash([4,6]); g.lineWidth=1.5; g.beginPath(); g.arc(cx,cy,orR,0,2*Math.PI); g.stroke(); g.setLineDash([]);
    g.fillStyle=c1; g.beginPath(); g.arc(cx,cy,er,0,2*Math.PI); g.fill();
    const ea=2*Math.PI*tsim/86164; g.fillStyle=ground; g.beginPath(); g.arc(cx+er*0.55*Math.cos(ea),cy+er*0.55*Math.sin(ea),er*0.28,0,2*Math.PI); g.fill();
    g.strokeStyle='#fff'; g.lineWidth=2.5; g.beginPath(); g.moveTo(cx+er*Math.cos(ea),cy+er*Math.sin(ea)); g.lineTo(cx+(er+8)*Math.cos(ea),cy+(er+8)*Math.sin(ea)); g.stroke();
    const sa=2*Math.PI*tsim/i.T; g.fillStyle=acc; g.beginPath(); g.arc(cx+orR*Math.cos(sa),cy+orR*Math.sin(sa),7,0,2*Math.PI); g.fill();
    if(Math.abs(i.h-35786)<400){ g.strokeStyle=acc; g.lineWidth=1.5; g.beginPath(); g.moveTo(cx+er*Math.cos(ea),cy+er*Math.sin(ea)); g.lineTo(cx+orR*Math.cos(sa),cy+orR*Math.sin(sa)); g.stroke(); }
    g.fillStyle=ink; g.font='600 13px sans-serif'; g.fillText('Terre (rotation accélérée ×2 400)',12,22);
    raf=requestAnimationFrame(frame); }
  x.onCleanup(()=>cancelAnimationFrame(raf));
  root.addEventListener('click',e=>{ const b=e.target.closest('button[data-h]'); if(b){ x.setv('h',b.dataset.h); readout(); } });
  x.bind(readout); raf=requestAnimationFrame(frame);
}};
})();
