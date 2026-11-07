(function(){
const S = window.BIA.sims, B = window.BIA;

/* ---------- Frise chronologique ---------- */
S.timeline={title:'Frise chronologique', th:'t5', ch:'5-1',
desc:'Parcours les grandes dates de l’air et de l’espace, puis teste-toi en remettant des événements dans l’ordre.',
try:['Filtre sur une période, lis-la, puis lance le défi.','Dans le défi, touche d’abord l’événement le plus ancien.'],
mount(root,x){
  const eras=[['all','Tout'],['o','Avant 1914'],['g','1914-1939'],['j','Après 1939'],['s','Espace'],['a','Aujourd’hui']];
  const start=(x.opts&&x.opts.era)||'all';
  root.innerHTML=x.seg('era',eras,start)+'<div id="'+x.uid+'l" class="tl" style="margin-top:12px"></div><div class="sep"></div><div class="row"><button type="button" class="btn sec sm" id="'+x.uid+'g">Défi : remets dans l’ordre</button></div><div id="'+x.uid+'c"></div>';
  let era=start; const L=x.q('#'+x.uid+'l'), C=x.q('#'+x.uid+'c');
  const list=()=>B.timeline.filter(e=>era==='all'||e[4]===era).sort((a,b)=>a[0]-b[0]);
  function draw(){ L.innerHTML=list().map(e=>'<div class="tl-i"><b>'+e[1]+'</b><div><b style="font:600 1rem var(--body);color:var(--ink)">'+e[2]+'</b></div><div class="small mute">'+e[3]+'</div></div>').join(''); }
  x.segBind('era',v=>{ era=v; C.innerHTML=''; draw(); });
  x.q('#'+x.uid+'g').addEventListener('click',()=>{
    const pool=list(); const pick=[]; B.shuffle(pool).forEach(e=>{ if(pick.length<4 && !pick.some(p=>Math.abs(p[0]-e[0])<1)) pick.push(e); });
    if(pick.length<3){ C.innerHTML='<p class="mute">Pas assez d’événements dans cette période. Choisis « Tout ».</p>'; return; }
    const shown=B.shuffle(pick), order=pick.slice().sort((a,b)=>a[0]-b[0]); let chosen=[];
    function render(done){
      C.innerHTML='<p class="q-stem" style="margin-top:12px">Touche les événements du plus ancien au plus récent.</p><div class="opts">'+shown.map((e,i)=>{ const k=chosen.indexOf(e); const ok=done&&order.indexOf(e)===k; return '<button type="button" class="opt'+(done?(ok?' good':' bad'):(k>-1?' sel':''))+'" data-i="'+i+'"'+(done?' disabled':'')+'><span class="l">'+(k>-1?(k+1):'·')+'</span><span>'+e[2]+(done?' <b>('+e[1]+')</b>':'')+'</span></button>'; }).join('')+'</div>'+(done?'<div class="expl '+(chosen.every((e,i)=>order[i]===e)?'ok':'ko')+'"><b class="r">'+(chosen.every((e,i)=>order[i]===e)?'Parfait.':'Presque.')+'</b>Ordre exact : '+order.map(e=>e[2]+' ('+e[1]+')').join(' → ')+'</div>':'');
    }
    C.onclick=e=>{ const b=e.target.closest('button[data-i]'); if(!b) return; const ev=shown[+b.dataset.i]; if(chosen.indexOf(ev)>-1) return; chosen.push(ev); render(chosen.length===shown.length); };
    render(false);
  });
  draw();
}};

/* ---------- Alphabet OACI ---------- */
const AL=['Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel','India','Juliett','Kilo','Lima','Mike','November','Oscar','Papa','Quebec','Romeo','Sierra','Tango','Uniform','Victor','Whiskey','X-ray','Yankee','Zulu'];
S.alpha={title:'Alphabet OACI', th:'t6', ch:'6-1',
desc:'Épelle comme un pilote. Entraîne-toi aux 26 mots de l’alphabet radio, puis épelle ton prénom.',
try:['Écris ton prénom et épelle-le.','Lance le quiz et vise 10 bonnes réponses d’affilée.'],
mount(root,x){
  root.innerHTML='<label for="'+x.uid+'i" class="small mute">Épelle un mot</label><input type="text" id="'+x.uid+'i" value="Cap BIA" style="width:100%" maxlength="24"><div class="verdict" id="'+x.uid+'o" style="margin-top:8px;font-family:var(--mono)"></div><div class="sep"></div><div class="row"><button type="button" class="btn sec sm" id="'+x.uid+'g">Quiz : quelle lettre ?</button></div><div id="'+x.uid+'q"></div><details style="margin-top:10px"><summary>Voir tout l’alphabet</summary><div class="tw"><table class="tbl"><tr>'+AL.map((w,i)=>'<td><b>'+String.fromCharCode(65+i)+'</b> '+w+'</td>'+((i%3===2)?'</tr><tr>':'')).join('')+'</tr></table></div></details>';
  const out=x.q('#'+x.uid+'o'), inp=x.q('#'+x.uid+'i'), Q=x.q('#'+x.uid+'q'); let streak=0;
  function spell(){ const s=inp.value.toUpperCase().replace(/[^A-Z0-9 ]/g,''); const NUM={0:'Zero',1:'One',2:'Two',3:'Tree',4:'Fower',5:'Fife',6:'Six',7:'Seven',8:'Eight',9:'Niner'}; out.textContent=s.split('').map(c=>c===' '?'/':c>='A'&&c<='Z'?AL[c.charCodeAt(0)-65]:NUM[c]).join(' · ')||'Écris un mot ci-dessus.'; }
  inp.addEventListener('input',spell); spell();
  function quiz(){
    const i=Math.floor(Math.random()*26); const opts=[i]; while(opts.length<4){ const j=Math.floor(Math.random()*26); if(opts.indexOf(j)<0) opts.push(j); }
    const sh=B.shuffle(opts);
    Q.innerHTML='<p class="q-stem" style="margin-top:12px">« '+AL[i]+' » correspond à quelle lettre ?</p><div class="opts">'+sh.map(j=>'<button type="button" class="opt" data-j="'+j+'"><span class="l">·</span><span>'+String.fromCharCode(65+j)+'</span></button>').join('')+'</div><div id="'+x.uid+'r"></div>';
    Q.onclick=e=>{ const b=e.target.closest('.opt'); if(!b) return; const ok=+b.dataset.j===i; streak=ok?streak+1:0; x.qa('#'+x.uid+'q .opt').forEach(o=>{ o.disabled=true; if(+o.dataset.j===i) o.classList.add('good'); }); if(!ok) b.classList.add('bad'); x.q('#'+x.uid+'r').innerHTML='<div class="expl '+(ok?'ok':'ko')+'"><b class="r">'+(ok?'Bien !':'Retiens :')+'</b>'+AL[i]+' = '+String.fromCharCode(65+i)+'. Série en cours : '+streak+'.</div><div class="row" style="margin-top:8px"><button type="button" class="btn sm" id="'+x.uid+'n">Suivante</button></div>'; x.q('#'+x.uid+'n').onclick=quiz; };
  }
  x.q('#'+x.uid+'g').addEventListener('click',quiz);
}};

/* ---------- Cartes de vocabulaire ---------- */
S.cards={title:'Cartes de vocabulaire', th:'t6', ch:'6-2',
desc:'Retourne la carte, dis la réponse, puis note-toi. Les cartes ratées reviennent plus souvent.',
try:['Commence par anglais → français, puis inverse le sens.','Vise zéro carte « à revoir »  avant de changer de série.'],
mount(root,x){
  root.innerHTML=x.seg('dir',[['ef','Anglais → français'],['fe','Français → anglais']],'ef')+'<div id="'+x.uid+'b" style="margin-top:10px"></div>';
  let dir='ef', deck=B.shuffle(B.cards.slice()), idx=0, flip=false, known=0, again=0; const box=x.q('#'+x.uid+'b');
  function draw(){
    if(!deck.length){ box.innerHTML='<div class="verdict ok">Série terminée : '+known+' cartes sues du premier coup, '+again+' à revoir. <button type="button" class="btn sm" id="'+x.uid+'r" style="margin-left:8px">Recommencer</button></div>'; x.q('#'+x.uid+'r').onclick=()=>{ deck=B.shuffle(B.cards.slice()); known=0; again=0; flip=false; draw(); }; return; }
    const c=deck[0]; const front=dir==='ef'?c[0]:c[1], back=dir==='ef'?c[1]:c[0];
    box.innerHTML='<p class="small mute">'+deck.length+' carte(s) restante(s)</p><button type="button" class="fc" id="'+x.uid+'f" aria-live="polite">'+(flip?back:front)+'</button>'+(flip?'<div class="row" style="margin-top:10px"><button type="button" class="btn sm" data-k="1">Je savais</button><button type="button" class="btn sec sm" data-k="0">À revoir</button></div>':'<p class="small mute" style="margin-top:8px">Touche la carte pour la retourner.</p>');
  }
  box.addEventListener('click',e=>{ if(e.target.closest('.fc')){ flip=!flip; draw(); return; } const b=e.target.closest('button[data-k]'); if(!b) return; const c=deck.shift(); if(b.dataset.k==='1'){ known++; } else { again++; deck.splice(Math.min(deck.length,3),0,c); } flip=false; draw(); });
  x.segBind('dir',v=>{ dir=v; flip=false; draw(); });
  draw();
}};

/* ---------- 6.4 L’avion en anglais ---------- */
S.enplane={title:'L’avion en anglais', th:'t6', ch:'6-4',
desc:'Découvre les noms anglais des grandes parties de l’avion, puis teste-toi : on te donne le mot, tu touches la pièce.',
try:['Affiche d’abord les noms, puis passe au jeu.','Fais un sans-faute sur les 8 pièces avant de continuer.'],
mount(root,x){
  const u=x.uid;
  const P={hel:['propeller','hélice',[70,80]],mot:['engine','moteur',[158,128]],cab:['cockpit','cabine de pilotage',[262,168]],fus:['fuselage','fuselage',[440,150]],ail:['wing','aile',[250,70]],emh:['elevator','gouverne de profondeur',[528,206]],emv:['rudder','gouverne de direction',[538,58]],tra:['landing gear','train d’atterrissage',[226,226]]};
  const style='<style>#'+u+'s .pt{cursor:pointer;transition:filter .15s}#'+u+'s .pt:hover,#'+u+'s .pt.on{filter:drop-shadow(0 0 5px #ff8a3d) brightness(1.08)}#'+u+'s .pt.good{filter:drop-shadow(0 0 6px #22c55e)}#'+u+'s .pt.bad{filter:drop-shadow(0 0 6px #ef4444)}#'+u+'s .pt.hint{animation:'+u+'h .7s ease-in-out infinite alternate}@keyframes '+u+'h{from{filter:drop-shadow(0 0 2px #ff8a3d)}to{filter:drop-shadow(0 0 10px #ff8a3d) brightness(1.2)}}#'+u+'s .tag{pointer-events:none}</style>';
  root.innerHTML=x.seg('mode',[['lab','Noms anglais'],['quiz','Jeu : touche la pièce']],'lab')+'<div style="margin-top:8px">'+window.BIA.planeSVG(u)+'</div>'+style+'<div class="verdict" id="'+u+'v"><b>Touche une pièce.</b></div>';
  const svg=x.q('#'+u+'s'), v=x.q('#'+u+'v'); const ns='http://www.w3.org/2000/svg';
  let mode='lab', target=null, round=0, ok=0, order=[], miss=0;
  function tags(){ const o=svg.querySelector('#'+u+'lb'); if(o) o.remove(); if(mode!=='lab') return; const g=document.createElementNS(ns,'g'); g.setAttribute('id',u+'lb'); g.setAttribute('class','tag');
    Object.keys(P).forEach(k=>{ const nm=P[k][0], p=P[k][2], w=nm.length*7.2+16; const r=document.createElementNS(ns,'rect'); r.setAttribute('x',p[0]-w/2); r.setAttribute('y',p[1]-13); r.setAttribute('width',w); r.setAttribute('height',22); r.setAttribute('rx',11); r.setAttribute('fill','#12202f'); r.setAttribute('opacity','.92'); const t=document.createElementNS(ns,'text'); t.setAttribute('x',p[0]); t.setAttribute('y',p[1]+2); t.setAttribute('text-anchor','middle'); t.setAttribute('font-size','12'); t.setAttribute('font-weight','700'); t.setAttribute('fill','#fff'); t.textContent=nm; g.appendChild(r); g.appendChild(t); }); svg.appendChild(g); }
  function clear(){ x.qa('.pt').forEach(p=>p.classList.remove('on','good','bad','hint')); }
  function next(){ clear(); if(round>=8){ v.className='verdict '+(ok===8?'ok':'warn'); v.innerHTML='<b>Terminé : '+ok+' / 8 du premier coup.</b> '+(ok===8?'Sans faute !':'Recommence pour viser le sans-faute.')+' <button type="button" class="btn sm" id="'+u+'r" style="margin-left:8px">Rejouer</button>'; x.q('#'+u+'r').onclick=start; target=null; return; } target=order[round]; miss=0; v.className='verdict'; v.innerHTML='<b>Question '+(round+1)+' / 8 :</b> touche le <b style="font-size:1.15em">'+P[target][0]+'</b>'; }
  function start(){ order=B.shuffle(Object.keys(P)); round=0; ok=0; next(); }
  function click(g){ const k=g.dataset.p; if(mode==='lab'){ clear(); g.classList.add('on'); v.className='verdict'; v.innerHTML='<b>'+P[k][0]+'</b> = '+P[k][1]; return; }
    if(!target) return; clear(); if(k===target){ g.classList.add('good'); ok+=0; if(!g._miss) ok++; round++; x.qa('.pt').forEach(p=>p._miss=false); v.className='verdict ok'; v.innerHTML='Oui ! <b>'+P[k][0]+'</b> = '+P[k][1]+'.'; setTimeout(next,900); } else { g.classList.add('bad'); const pg=svg.querySelector('.pt[data-p="'+target+'"]'); pg._miss=true; miss++; if(miss>=2) pg.classList.add('hint'); v.className='verdict bad'; v.innerHTML='Non, ça c’est <b>'+P[k][0]+'</b> ('+P[k][1]+'). Cherche le <b>'+P[target][0]+'</b>.'+(miss>=2?' (la pièce clignote)':''); } }
  x.qa('.pt').forEach(g=>{ g.addEventListener('click',()=>click(g)); g.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); click(g); } }); });
  x.segBind('mode',m=>{ mode=m; clear(); tags(); if(m==='quiz') start(); else { v.className='verdict'; v.innerHTML='<b>Touche une pièce</b> pour voir sa traduction.'; } });
  tags();
}};
})();
