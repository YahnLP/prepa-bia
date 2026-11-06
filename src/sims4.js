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
})();
