(function(){
'use strict';
const B = window.BIA, TH = B.themes;
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.prototype.slice.call(r.querySelectorAll(s));
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t;} return a; };
const thOf = id => TH.find(t=>t.id===id);
const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L = ['A','B','C','D'];
const DAY = 864e5;

/* ---------- state ---------- */
const KEY='cap-bia-v1'; let mem={};
function load(){ try{ const s=localStorage.getItem(KEY); if(s) mem=JSON.parse(s)||{}; }catch(e){} mem.qs=mem.qs||{}; mem.ch=mem.ch||{}; mem.exams=mem.exams||[]; mem.date=mem.date||''; }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(mem)); }catch(e){} }
load();

/* ---------- questions ---------- */
const Q=[]; B.chapters.forEach(c=>{ c.qs.forEach((r,i)=>{ Q.push({id:c.id+'.'+i, th:c.th, ch:c.id, q:r[0], ok:r[1], wr:[r[2],r[3],r[4]], e:r[5]}); }); });
const QBY={}; Q.forEach(q=>{QBY[q.id]=q;});
const chap = id => B.chapters.find(c=>c.id===id);
const chBest = id => (mem.ch[id]&&mem.ch[id].best)||0;
const chDone = id => chBest(id)>=80;
const chOf = th => B.chapters.filter(c=>c.th===th);
const thProg = th => { const cs=chOf(th); return cs.length?Math.round(cs.reduce((a,c)=>a+chBest(c.id),0)/cs.length):0; };
function thStatus(th){ const cs=chOf(th), d=cs.filter(c=>chDone(c.id)).length; if(d===cs.length) return ['ACQUIS','ok']; if(cs.some(c=>mem.ch[c.id])) return [d+'/'+cs.length+' CHAP.','mid']; return ['À FAIRE','no']; }
function rec(qid, ok){ const s=mem.qs[qid]||{b:0,n:0,k:0}; s.n++; if(ok){s.k++; s.b=Math.min(5,s.b+1);} else s.b=0; s.last=ok?1:0; s.due=Date.now()+[0,1,2,4,8,16][s.b]*DAY; mem.qs[qid]=s; save(); }
const dueList = () => Q.filter(q=>{const s=mem.qs[q.id]; return s && s.due<=Date.now();});
const wrongList = () => Q.filter(q=>{const s=mem.qs[q.id]; return s && s.last===0;});

/* ---------- cleanup & ctx for sims ---------- */
let cleanups=[]; const cleanup=()=>{ cleanups.forEach(f=>{try{f();}catch(e){}}); cleanups=[]; };
let uidN=0;
function mountSim(slot, id, opts){
  const d=B.sims[id]; if(!d){ slot.textContent='Simulateur introuvable.'; return; }
  const uid='s'+(++uidN);
  slot.className='sim'; slot.innerHTML='<div class="sim-h"><b>'+esc(d.title)+'</b><span>Simulateur</span></div><p class="cap">'+d.desc+'</p><div class="sim-body"></div>'+(d.try&&d.try.length?'<details><summary>Essaie ceci</summary><ul>'+d.try.map(t=>'<li>'+t+'</li>').join('')+'</ul></details>':'');
  const root=slot.querySelector('.sim-body');
  const ctx={uid, root, opts:opts||{},
    onCleanup:f=>cleanups.push(f),
    r:(i,label,min,max,step,val,unit)=>'<div class="rng"><label for="'+uid+'-'+i+'">'+label+'<output id="'+uid+'-'+i+'-o">'+val+(unit||'')+'</output></label><input type="range" id="'+uid+'-'+i+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" data-unit="'+(unit||'')+'"></div>',
    v:i=>+root.querySelector('#'+uid+'-'+i).value,
    setv:(i,val)=>{ const el=root.querySelector('#'+uid+'-'+i); el.value=val; const o=root.querySelector('#'+uid+'-'+i+'-o'); if(o) o.textContent=el.value+el.dataset.unit; },
    q:s=>root.querySelector(s), qa:s=>$$(s,root),
    bind:fn=>{ $$('input[type=range]',root).forEach(inp=>inp.addEventListener('input',()=>{ const o=root.querySelector('#'+inp.id+'-o'); if(o) o.textContent=inp.value+inp.dataset.unit; fn(); })); fn(); },
    seg:(name,items,cur)=>'<div class="seg" role="group" aria-label="'+name+'">'+items.map(it=>'<button type="button" data-v="'+it[0]+'" aria-pressed="'+(it[0]===cur)+'">'+it[1]+'</button>').join('')+'</div>',
    segBind:(name,fn)=>{ const g=root.querySelector('.seg[aria-label="'+name+'"]'); g.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; $$('button',g).forEach(x=>x.setAttribute('aria-pressed',x===b)); fn(b.dataset.v); }); }
  };
  d.mount(root, ctx);
}

/* ---------- quiz engine ---------- */
function runQuiz(root, list, o){
  o=Object.assign({mode:'practice', title:'', secs:0, onDone:null, label:'Question'}, o||{});
  const items=list.map(q=>({q, opts:shuffle([{t:q.ok,ok:1}].concat(q.wr.map(t=>({t,ok:0})))), pick:null, flag:false}));
  const n=items.length; let i=0, finished=false, tick=null, left=o.secs;
  const exam=o.mode==='exam';
  const fmt=s=>{ const h=Math.floor(s/3600), m=Math.floor(s%3600/60), x=s%60; return (h?h+':':'')+String(m).padStart(2,'0')+':'+String(x).padStart(2,'0'); };
  function optHTML(it,k,reveal){
    let cls='opt';
    if(reveal){ if(it.opts[k].ok) cls+=' good'; else if(it.pick===k) cls+=' bad'; }
    else if(it.pick===k) cls+=' sel';
    return '<button type="button" class="'+cls+'" data-k="'+k+'"'+(reveal?' disabled':'')+'><span class="l">'+L[k]+'</span><span>'+esc(it.opts[k].t)+'</span></button>';
  }
  function draw(){
    const it=items[i], reveal=!exam && it.pick!==null, t=thOf(it.q.th);
    let h='';
    if(exam){
      h+='<div class="timer"><span class="mono small">Question '+(i+1)+' / '+n+'</span>'+(o.secs?'<span class="t'+(left<600?' low':'')+'" id="qt">'+fmt(left)+'</span>':'')+'</div>';
    }
    h+='<div class="quiz"><div class="q-meta"><span class="chip tc'+t.n+'">'+esc(t.short)+'</span>'+(exam?'':'<span class="mono small">'+(i+1)+' / '+n+'</span>')+'</div>';
    if(!exam) h+='<div class="bar" style="margin-bottom:12px"><i style="width:'+Math.round(i/n*100)+'%"></i></div>';
    h+='<p class="q-stem">'+esc(it.q.q)+'</p><div class="opts">'+it.opts.map((_,k)=>optHTML(it,k,reveal)).join('')+'</div>';
    if(reveal){ const ok=it.opts[it.pick].ok; h+='<div class="expl '+(ok?'ok':'ko')+'"><b class="r">'+(ok?'Bonne réponse.':'Pas tout à fait.')+'</b>'+esc(it.q.e)+'</div><div class="row" style="margin-top:12px"><button type="button" class="btn" data-a="next">'+(i<n-1?'Question suivante':'Voir le résultat')+'</button></div>'; }
    if(exam){
      h+='<div class="row" style="margin-top:14px"><button type="button" class="btn sec sm" data-a="prev"'+(i===0?' disabled':'')+'>Précédente</button><button type="button" class="btn sec sm" data-a="flag">'+(it.flag?'Retirer le repère':'Marquer pour revoir')+'</button><button type="button" class="btn sm" data-a="next"'+(i===n-1?' disabled':'')+'>Suivante</button></div>';
    }
    h+='</div>';
    if(exam){
      h+='<div class="quiz"><div class="kicker">Navigation</div>'+items.map((x,k)=>'<button type="button" class="mark'+(k===i?' cur':'')+(x.pick!==null?' done':'')+(x.flag?' flag':'')+'" data-g="'+k+'">'+(k+1)+'</button>').join('')+'<div class="row" style="margin-top:10px"><span class="small mute">'+items.filter(x=>x.pick!==null).length+' réponses sur '+n+'</span><button type="button" class="btn sm" data-a="submit">Rendre ma copie</button></div></div>';
    }
    root.innerHTML=h;
  }
  function modal(msg, yes){
    const m=document.createElement('div'); m.className='modal'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true');
    m.innerHTML='<div><p style="font-weight:600">'+msg+'</p><div class="row"><button type="button" class="btn" data-y="1">Rendre la copie</button><button type="button" class="btn sec" data-y="0">Continuer</button></div></div>';
    m.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; m.remove(); if(b.dataset.y==='1') yes(); });
    document.body.appendChild(m); const f=m.querySelector('button'); if(f) f.focus();
  }
  function finish(){
    if(finished) return; finished=true; clearInterval(tick);
    items.forEach(it=>{ if(it.pick!==null) rec(it.q.id, !!it.opts[it.pick].ok); });
    const ok=items.filter(it=>it.pick!==null && it.opts[it.pick].ok).length;
    const res={n, ok, pct:Math.round(ok/n*100), items, left};
    if(exam){ if(o.onDone) o.onDone(res); return; }
    showResult(res);
    if(o.onDone) o.onDone(res);
  }
  function showResult(res){
    const bad=res.items.filter(it=>it.pick===null||!it.opts[it.pick].ok);
    let h='<div class="quiz"><div class="kicker">'+esc(o.title||'Résultat')+'</div><div class="score-big">'+res.ok+' / '+res.n+'</div><p>'+(res.pct>=80?'Très bien : ce point est acquis.':res.pct>=50?'C’est en bonne voie. Relis les explications ci-dessous puis recommence.':'Relis la leçon, puis recommence : tu progresseras vite.')+'</p>';
    h+='<div class="bar"><i style="width:'+res.pct+'%"></i></div><div class="row" style="margin-top:14px"><button type="button" class="btn" data-a="again">Recommencer</button>'+(bad.length?'<button type="button" class="btn sec" data-a="errs">Refaire mes erreurs</button>':'')+'</div></div>';
    if(bad.length) h+='<div class="quiz"><div class="kicker">À revoir ('+bad.length+')</div>'+reviewHTML(bad)+'</div>';
    root.innerHTML=h; root._res=res;
  }
  root.onclick=function(e){
    const b=e.target.closest('button'); if(!b) return;
    if(b.dataset.k!==undefined){ const it=items[i]; if(!exam && it.pick!==null) return; it.pick=+b.dataset.k; if(!exam){ rec(it.q.id, !!it.opts[it.pick].ok); } draw(); return; }
    const a=b.dataset.a;
    if(b.dataset.g!==undefined){ i=+b.dataset.g; draw(); return; }
    if(a==='next'){ if(i<n-1){ i++; draw(); } else finish(); }
    else if(a==='prev'){ i=Math.max(0,i-1); draw(); }
    else if(a==='flag'){ items[i].flag=!items[i].flag; draw(); }
    else if(a==='submit'){ const un=items.filter(x=>x.pick===null).length; modal(un?('Il reste '+un+' question'+(un>1?'s':'')+' sans réponse. Une réponse fausse ne retire aucun point : mieux vaut tout remplir.'):'Tu as répondu à toutes les questions. Rendre la copie ?', finish); }
    else if(a==='again'){ runQuiz(root, shuffle(list), o); }
    else if(a==='errs'){ const bad=root._res.items.filter(it=>it.pick===null||!it.opts[it.pick].ok).map(it=>it.q); runQuiz(root, shuffle(bad), Object.assign({},o,{onDone:null})); }
  };
  if(exam && o.secs){ tick=setInterval(()=>{ left--; const el=$('#qt',root); if(el){ el.textContent=fmt(Math.max(0,left)); el.className='t'+(left<600?' low':''); } if(left<=0) finish(); },1000); cleanups.push(()=>clearInterval(tick)); }
  draw();
}
function reviewHTML(items){
  return items.map((it,k)=>{
    const good=it.opts.findIndex(x=>x.ok), mine=it.pick;
    return '<details><summary>'+(k+1)+'. '+esc(it.q.q)+'</summary><p class="small" style="margin:6px 0 0">'+(mine===null?'<b class="mute">Sans réponse.</b> ':'<b style="color:var(--bad)">Ta réponse :</b> '+esc(it.opts[mine].t)+'. ')+'<br><b style="color:var(--ok)">Bonne réponse :</b> '+esc(it.opts[good].t)+'.</p><div class="expl">'+esc(it.q.e)+'</div></details>';
  }).join('');
}

/* ---------- pages ---------- */
const icons={
  home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg>',
  cours:'<svg viewBox="0 0 24 24"><path d="M4 5h7a3 3 0 013 3v12a2 2 0 00-2-2H4z"/><path d="M20 5h-7"/><path d="M20 5v13h-6"/></svg>',
  sims:'<svg viewBox="0 0 24 24"><path d="M5 4v16M12 4v16M19 4v16"/><circle cx="5" cy="9" r="2" fill="currentColor"/><circle cx="12" cy="15" r="2" fill="currentColor"/><circle cx="19" cy="8" r="2" fill="currentColor"/></svg>',
  train:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/></svg>',
  exam:'<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7.5"/><path d="M12 9v4l3 2M9.5 3h5"/></svg>'
};
const tabs=[['home','Accueil'],['cours','Cours'],['sims','Simuler'],['train','Réviser'],['exam','Examen']];
function setTab(h){
  const k=h.split('-')[0];
  const map={home:'home',cours:'cours',c:'cours',th:'cours',fiches:'cours',gloss:'cours',sims:'sims',sim:'sims',train:'train',exam:'exam'};
  const cur=map[k]||'home';
  $('#tabbar').innerHTML='<nav aria-label="Navigation principale">'+tabs.map(t=>'<a href="#'+t[0]+'"'+(t[0]===cur?' aria-current="page"':'')+'>'+icons[t[0]]+'<span>'+t[1]+'</span></a>').join('')+'</nav>';
}
const topbar=(extra)=>'<div class="top"><a class="brand" href="#home"><i></i>Cap BIA</a>'+(extra||'')+'</div>';

function daysLeft(){ if(!mem.date) return null; const d=Math.ceil((new Date(mem.date+'T08:00:00')-Date.now())/DAY); return d; }

function pHome(){
  const todo=B.chapters.filter(c=>c.th!=='t6' && !chDone(c.id));
  const next=todo[0]||B.chapters.find(c=>!chDone(c.id));
  const due=dueList().length;
  const seen=Object.keys(mem.qs).length, tot=Object.keys(mem.qs).reduce((a,k)=>a+mem.qs[k].n,0), good=Object.keys(mem.qs).reduce((a,k)=>a+mem.qs[k].k,0);
  const dl=daysLeft(); let plan='';
  if(dl!==null){
    if(dl>=0){ const weeks=Math.max(dl/7,0.5); const r=todo.length; plan='<p class="small" style="margin:8px 0 0"><b>J-'+dl+'</b> avant l’examen. Il te reste '+r+' chapitre'+(r>1?'s':'')+' à valider : '+(r?'vise environ <b>'+Math.max(1,Math.ceil(r/weeks))+' chapitre'+(Math.ceil(r/weeks)>1?'s':'')+' par semaine</b>, puis des examens blancs.':'passe maintenant aux examens blancs.')+'</p>'; }
    else plan='<p class="small" style="margin:8px 0 0">La date saisie est passée. Mets à jour ta date d’examen ci-dessous.</p>';
  }
  const last=mem.exams[mem.exams.length-1];
  let h=topbar();
  h+='<div class="hero"><div class="kicker">Brevet d’initiation aéronautique</div><h1>Prépare ton BIA, thème par thème.</h1><p>Chaque chapitre te fait comprendre avant de retenir : une leçon courte, un simulateur à manipuler, puis des questions corrigées comme à l’examen.</p></div>';
  h+='<div class="checklist" role="list"><div class="ch-h"><span>Check-list avant le jour J</span><span>Statut</span></div>';
  TH.forEach(t=>{ const s=thStatus(t.id); h+='<a class="cl-row t'+t.n+'" href="#th-'+t.id+'" role="listitem"><b><span class="dot"></span>'+esc(t.short.toUpperCase())+(t.optional?' (OPTION)':'')+'</b><span class="lead"></span><span class="st '+s[1]+'">'+s[0]+' '+thProg(t.id)+'%</span></a>'; });
  h+='</div>';
  if(next) h+='<div class="card" style="margin-top:16px"><div class="kicker">Prochaine étape</div><h3 style="margin-top:0">'+next.id.replace('-','.')+' · '+esc(next.title)+'</h3><p class="mute small">'+esc(thOf(next.th).short)+' · environ '+next.min+' min</p><a class="btn" href="#c-'+next.id+'">'+(mem.ch[next.id]?'Reprendre':'Commencer')+'</a></div>';
  h+='<div class="stat" style="margin-top:4px"><div><b>'+due+'</b><span class="small mute">question'+(due>1?'s':'')+' à revoir aujourd’hui</span></div><div><b>'+(tot?Math.round(good/tot*100):0)+' %</b><span class="small mute">de réussite sur '+tot+' réponses</span></div><div><b>'+(last?last.total:'—')+'</b><span class="small mute">'+(last?'dernier examen blanc /100':'aucun examen blanc')+'</span></div></div>';
  if(due) h+='<div class="row" style="margin:12px 0"><a class="btn sec" href="#train" id="goRev">Lancer la révision espacée</a></div>';
  h+='<div class="card"><div class="kicker">Ma date d’examen</div><div class="row"><label for="exd" class="sr">Date de l’examen</label><input type="date" id="exd" value="'+esc(mem.date)+'"><button type="button" class="btn sec sm" id="exs">Enregistrer</button></div>'+plan+'</div>';
  h+='<details class="card"><summary>Comment se passe l’examen ?</summary><ul class="small"><li>Épreuve nationale écrite de <b>2 h 30</b> : 5 questionnaires de <b>20 questions</b> (100 au total), un par thème.</li><li>Questions à choix unique (QCU) : une seule bonne réponse parmi les propositions.</li><li>Chaque bonne réponse vaut 1 point, une mauvaise réponse n’enlève rien : réponds toujours.</li><li>Les 5 thèmes ont le même coefficient ; une note de 0 sur un thème est éliminatoire.</li><li>Épreuve facultative d’anglais : 20 questions en 30 minutes ; seuls les points au-dessus de 10 comptent.</li><li>Le seuil d’admission et les dates exactes sont fixés chaque année : vérifie la note de service de ta session sur le site du ministère.</li></ul></details>';
  h+='<div class="row"><a class="btn sec sm" href="#gloss">Lexique</a><a class="btn sec sm" href="#fiches">Fiches de révision</a></div>';
  return {html:h, after:el=>{
    $('#exs',el).onclick=()=>{ mem.date=$('#exd',el).value; save(); route(); };
  }};
}

function chRow(c){
  const b=chBest(c.id), t=thOf(c.th);
  return '<a class="chap t'+t.n+'" style="--tc:var(--c'+t.n+')" href="#c-'+c.id+'"><span class="n">'+c.id.replace('-','.')+'</span><span class="t">'+esc(c.title)+'<small>environ '+c.min+' min · '+c.qs.length+' questions</small></span>'+(b>=80?'<span class="badge ok">Acquis '+b+' %</span>':mem.ch[c.id]?'<span class="badge mid">'+b+' %</span>':'<span class="badge">À faire</span>')+'</a>';
}
function pCours(){
  let h=topbar()+'<h1>Cours</h1><p class="mute">Suis l’ordre proposé, ou pars du thème qui te pose le plus de difficultés. Un chapitre est « acquis » à partir de 80 % aux questions.</p>';
  TH.forEach(t=>{ h+='<h2 class="tc'+t.n+'" style="margin-top:1.1em">'+t.n+'. '+esc(t.name)+'</h2>'+chOf(t.id).map(chRow).join(''); });
  h+='<div class="row" style="margin-top:14px"><a class="btn sec sm" href="#fiches">Fiches de révision</a><a class="btn sec sm" href="#gloss">Lexique</a></div>';
  return {html:h};
}
function pTheme(id){
  const t=thOf(id); if(!t) return pCours();
  const sims=Object.keys(B.sims).filter(k=>B.sims[k].th===id);
  let h=topbar('<a class="crumb" href="#cours">Tous les cours</a>')+'<div class="lesson-head" style="--tc:var(--c'+t.n+')"><div class="kicker">Thème '+t.n+(t.optional?' · option':'')+'</div><h1>'+esc(t.name)+'</h1><p class="mute">'+esc(t.goal)+'</p></div>';
  h+='<div class="stat"><div><b>'+thProg(id)+' %</b><span class="small mute">maîtrise du thème</span></div><div><b>'+chOf(id).filter(c=>chDone(c.id)).length+' / '+chOf(id).length+'</b><span class="small mute">chapitres acquis</span></div></div><h2>Chapitres</h2>'+chOf(id).map(chRow).join('');
  if(sims.length) h+='<h2>Simulateurs du thème</h2><div class="sim-grid">'+sims.map(k=>'<a class="card link" href="#sim-'+k+'"><b>'+esc(B.sims[k].title)+'</b><div class="small mute">'+B.sims[k].desc+'</div></a>').join('')+'</div>';
  h+='<div class="row" style="margin-top:12px"><a class="btn" href="#train" id="trThis">S’entraîner sur ce thème</a></div>';
  return {html:h, after:el=>{ $('#trThis',el).onclick=()=>{ cfg.th=[id]; cfg.src='new'; }; }};
}


/* ---------- figures illustrées ---------- */
function ensureDefs(){
  if(document.getElementById('figdefs')) return;
  const mk=(id,col)=>'<marker id="'+id+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:'+col+'"/></marker>';
  const d=document.createElement('div'); d.id='figdefs'; d.setAttribute('aria-hidden','true'); d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  d.innerHTML='<svg width="0" height="0"><defs>'+mk('ar','var(--ink)')+mk('arA','var(--acc)')+mk('arB','var(--c1)')+mk('arR','var(--bad)')+mk('arG','var(--c3)')+mk('arM','var(--mute)')+'</defs></svg>';
  document.body.appendChild(d);
}
function mountFig(slot){
  const f=B.figs&&B.figs[slot.dataset.fig]; if(!f){ slot.remove(); return; }
  ensureDefs();
  const anim=/animate|animation|class="[^"]*(flow|jig|blink|spin|bob|fade)/.test(f.svg);
  const fig=document.createElement('figure'); fig.className='fig'; if(anim) fig.dataset.anim='1';
  fig.innerHTML=f.svg+'<figcaption>'+f.cap+(anim?'<span class="fhint">Touche l’illustration pour mettre l’animation en pause.</span>':'')+'</figcaption>';
  const svg=fig.querySelector('svg');
  if(svg && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches && svg.pauseAnimations) svg.pauseAnimations();
  if(anim) fig.addEventListener('click',()=>{ const p=fig.classList.toggle('paused'); if(svg&&svg.pauseAnimations) p?svg.pauseAnimations():svg.unpauseAnimations(); });
  slot.replaceWith(fig);
}
function pChapter(id){
  const c=chap(id); if(!c) return pCours();
  const t=thOf(c.th), idx=B.chapters.indexOf(c), prev=B.chapters[idx-1], next=B.chapters[idx+1];
  let h=topbar('<a class="crumb" href="#th-'+t.id+'">'+esc(t.short)+'</a>');
  h+='<article class="lesson" style="--tc:var(--c'+t.n+')"><div class="lesson-head"><div class="kicker">Chapitre '+c.id.replace('-','.')+' · '+c.min+' min</div><h1>'+esc(c.title)+'</h1></div>';
  h+='<div class="goals"><b>À la fin de ce chapitre, tu sais :</b><ul>'+c.goals.map(g=>'<li>'+g+'</li>').join('')+'</ul></div>';
  if(B.intros&&B.intros[c.id]) h+='<div class="idea"><b>L’idée en 20 secondes</b><p>'+B.intros[c.id]+'</p></div>';
  h+=c.body;
  h+='<div class="keep"><h3>À retenir</h3><ul>'+c.keep.map(k=>'<li>'+k+'</li>').join('')+'</ul></div>';
  if(c.traps&&c.traps.length) h+='<div class="trap"><h3>Pièges classiques</h3><ul>'+c.traps.map(k=>'<li>'+k+'</li>').join('')+'</ul></div>';
  h+='<h2>Vérifie-toi</h2><p class="mute small">'+c.qs.length+' questions corrigées. Vise 80 % pour valider le chapitre.</p><div id="cq"></div>';
  h+='<div class="navrow">'+(prev?'<a class="btn sec" href="#c-'+prev.id+'">← '+prev.id.replace('-','.')+'</a>':'<span></span>')+(next?'<a class="btn sec" href="#c-'+next.id+'">'+next.id.replace('-','.')+' →</a>':'<a class="btn sec" href="#cours">Retour aux cours</a>')+'</div></article>';
  return {html:h, after:el=>{
    $$('.figslot',el).forEach(mountFig);
    $$('.simslot',el).forEach(s=>mountSim(s, s.dataset.sim, {era:s.dataset.era}));
    $$('.tabset',el).forEach(ts=>{ const bs=$$('.tb button',ts), ps=$$('.pane',ts); const sel=k=>{ bs.forEach(b=>b.setAttribute('aria-selected',b.dataset.t===k)); ps.forEach(p=>p.classList.toggle('on',p.dataset.p===k)); }; bs.forEach(b=>b.addEventListener('click',()=>sel(b.dataset.t))); sel(bs[0].dataset.t); });
    const qs=c.qs.map((r,i)=>QBY[c.id+'.'+i]);
    runQuiz($('#cq',el), shuffle(qs), {title:'Chapitre '+c.id.replace('-','.'), onDone:res=>{ const o=mem.ch[c.id]||{best:0}; o.best=Math.max(o.best,res.pct); o.ts=Date.now(); mem.ch[c.id]=o; save(); }});
  }};
}

function pSims(){
  let h=topbar()+'<h1>Simulateurs</h1><p class="mute">Manipule, observe, puis explique ce que tu vois. Chaque simulateur est lié à un chapitre du cours.</p>';
  TH.forEach(t=>{ const ks=Object.keys(B.sims).filter(k=>B.sims[k].th===t.id); if(!ks.length) return; h+='<h2 class="tc'+t.n+'">'+esc(t.short)+'</h2><div class="sim-grid">'+ks.map(k=>'<a class="card link" href="#sim-'+k+'" style="margin:0"><b>'+esc(B.sims[k].title)+'</b><div class="small mute" style="margin-top:4px">'+B.sims[k].desc+'</div></a>').join('')+'</div>'; });
  return {html:h};
}
function pSim(id){
  const d=B.sims[id]; if(!d) return pSims();
  const c=chap(d.ch);
  let h=topbar('<a class="crumb" href="#sims">Tous les simulateurs</a>')+'<div class="simslot" data-sim="'+id+'"></div>';
  if(c) h+='<a class="card link" href="#c-'+c.id+'"><div class="kicker">Pour comprendre</div><b>Chapitre '+c.id.replace('-','.')+' · '+esc(c.title)+'</b></a>';
  return {html:h, after:el=>mountSim($('.simslot',el), id, {})};
}

/* fiches & lexique */
function pFiches(){
  let h=topbar('<a class="crumb" href="#cours">Cours</a>')+'<h1>Fiches de révision</h1><p class="mute">L’essentiel de chaque chapitre, à relire la veille.</p>';
  TH.forEach(t=>{ h+='<h2 class="tc'+t.n+'">'+esc(t.name)+'</h2>'+chOf(t.id).map(c=>'<div class="card"><b>'+c.id.replace('-','.')+' · '+esc(c.title)+'</b><ul class="small" style="margin:.5em 0 0;padding-left:1.1em">'+c.keep.map(k=>'<li>'+k+'</li>').join('')+'</ul></div>').join(''); });
  return {html:h};
}
function pGloss(){
  const g=B.glossary.slice().sort((a,b)=>a[0].localeCompare(b[0],'fr'));
  let h=topbar('<a class="crumb" href="#cours">Cours</a>')+'<h1>Lexique</h1><label for="gs" class="sr">Rechercher un mot</label><input type="search" id="gs" placeholder="Rechercher : portance, QNH, front…" style="width:100%;margin-bottom:10px"><div id="gl"></div>';
  const draw=q=>{ q=q.trim().toLowerCase(); const r=g.filter(x=>!q||x[0].toLowerCase().includes(q)||x[1].toLowerCase().includes(q)); $('#gl').innerHTML=r.length?r.map(x=>'<div class="gl-item"><b>'+esc(x[0])+'</b><div>'+x[1]+'</div></div>').join(''):'<p class="mute">Aucun mot ne correspond. Essaie une autre orthographe.</p>'; };
  return {html:h, after:()=>{ draw(''); $('#gs').addEventListener('input',e=>draw(e.target.value)); }};
}

/* entraînement */
const cfg={th:[], n:20, src:'new', mode:'practice'};
function pTrain(){
  const due=dueList().length, wr=wrongList().length;
  let h=topbar()+'<h1>Réviser</h1><p class="mute">Choisis ton entraînement. La révision espacée te repose les questions ratées au bon moment, ce qui ancre durablement.</p><div id="tcfg">';
  h+='<div class="kicker">Source des questions</div><div class="pick" id="p-src">'+[['new','Mélange de tout'],['due','À revoir ('+due+')'],['wrong','Mes erreurs ('+wr+')']].map(x=>'<button type="button" data-v="'+x[0]+'" aria-pressed="'+(cfg.src===x[0])+'">'+x[1]+'</button>').join('')+'</div>';
  h+='<div class="kicker">Thèmes</div><div class="pick" id="p-th">'+TH.map(t=>'<button type="button" data-v="'+t.id+'" aria-pressed="'+(cfg.th.indexOf(t.id)>-1)+'">'+esc(t.short)+'</button>').join('')+'</div><p class="small mute" style="margin-top:-8px">Aucun thème choisi = tous les thèmes (sauf l’anglais).</p>';
  h+='<div class="kicker">Nombre de questions</div><div class="pick" id="p-n">'+[10,20,30,50].map(n=>'<button type="button" data-v="'+n+'" aria-pressed="'+(cfg.n===n)+'">'+n+'</button>').join('')+'</div>';
  h+='<div class="kicker">Mode</div><div class="pick" id="p-mode">'+[['practice','Apprentissage : correction après chaque question'],['exam','Conditions d’examen : correction à la fin']].map(x=>'<button type="button" data-v="'+x[0]+'" aria-pressed="'+(cfg.mode===x[0])+'">'+x[1]+'</button>').join('')+'</div>';
  h+='<button type="button" class="btn" id="go">Commencer</button></div><div id="trun"></div>';
  return {html:h, after:el=>{
    const grp=(id,fn)=>$(id,el).addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; fn(b); });
    grp('#p-src',b=>{ cfg.src=b.dataset.v; $$('#p-src button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); });
    grp('#p-n',b=>{ cfg.n=+b.dataset.v; $$('#p-n button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); });
    grp('#p-mode',b=>{ cfg.mode=b.dataset.v; $$('#p-mode button',el).forEach(x=>x.setAttribute('aria-pressed',x===b)); });
    grp('#p-th',b=>{ const v=b.dataset.v, k=cfg.th.indexOf(v); if(k>-1) cfg.th.splice(k,1); else cfg.th.push(v); b.setAttribute('aria-pressed',k===-1); });
    $('#go',el).onclick=()=>{
      let pool=cfg.src==='due'?dueList():cfg.src==='wrong'?wrongList():Q;
      pool=pool.filter(q=>cfg.th.length?cfg.th.indexOf(q.th)>-1:q.th!=='t6');
      if(!pool.length){ $('#trun',el).innerHTML='<div class="card"><b>Aucune question disponible avec ces réglages.</b><p class="small mute">'+(cfg.src==='new'?'Choisis au moins un thème.':'Réponds d’abord à quelques questions ; tes erreurs et révisions apparaîtront ici.')+'</p></div>'; return; }
      const list=shuffle(pool).slice(0,cfg.n);
      $('#tcfg',el).style.display='none';
      runQuiz($('#trun',el), list, {mode:cfg.mode, title:'Entraînement', secs:cfg.mode==='exam'?Math.round(list.length*90):0, onDone:cfg.mode==='exam'?res=>{ examResult($('#trun',el), res, null); }:null});
    };
  }};
}

/* examen blanc */
function examResult(root, res, meta){
  const by={}; TH.forEach(t=>by[t.id]={n:0,ok:0});
  res.items.forEach(it=>{ const b=by[it.q.th]; b.n++; if(it.pick!==null&&it.opts[it.pick].ok) b.ok++; });
  const core=TH.filter(t=>!t.optional&&by[t.id].n>0);
  const sc=t=>by[t.id].n?Math.round(by[t.id].ok/by[t.id].n*20*10)/10:0;
  const total=Math.round(core.reduce((a,t)=>a+sc(t),0)*10)/10;
  const zero=core.some(t=>by[t.id].ok===0);
  const full=meta&&meta.full;
  const weak=core.slice().sort((a,b)=>sc(a)-sc(b)).slice(0,2);
  const enOnly=core.length===0&&by.t6&&by.t6.n>0;
  let h='<div class="quiz"><div class="kicker">Résultat de l’examen blanc</div><div class="score-big">'+(enOnly?by.t6.ok+' / '+by.t6.n:total+' / '+(core.length*20))+'</div>'+(enOnly?'<p>Épreuve facultative : seuls les points au-dessus de 10 sur 20 comptent pour l’examen.</p>':'');
  if(core.length===5){
    h+='<p>'+(zero?'<b style="color:var(--bad)">Attention : une note de 0 sur un thème est éliminatoire.</b> ':'')+(total>=50&&!zero?'Au-dessus de 50/100, tu serais dans la zone d’admission habituelle.':'En dessous de 50/100 : continue, regarde les thèmes les plus faibles ci-dessous.')+(full?'':' (score ramené sur 100 à partir d’un mini-examen).')+'</p>';
  }
  h+=core.map(t=>'<div class="th-bar t'+t.n+'"><span class="small"><span class="dot"></span>'+esc(t.short)+'</span><div class="bar"><i style="width:'+(sc(t)/20*100)+'%"></i></div><span class="mono small">'+sc(t)+'/20</span></div>').join('');
  if(by.t6&&by.t6.n){ h+='<div class="th-bar t6"><span class="small"><span class="dot"></span>Anglais (option)</span><div class="bar"><i style="width:'+(by.t6.ok/by.t6.n*100)+'%"></i></div><span class="mono small">'+by.t6.ok+'/'+by.t6.n+'</span></div>'; }
  if(core.length===5) h+='<p class="small" style="margin-top:12px">À travailler en priorité : '+weak.map(t=>'<a href="#th-'+t.id+'">'+esc(t.short)+'</a>').join(' et ')+'.</p>';
  h+='<div class="row" style="margin-top:12px"><a class="btn" href="#exam">Nouvel examen blanc</a><a class="btn sec" href="#home">Accueil</a></div></div>';
  const bad=res.items.filter(it=>it.pick===null||!it.opts[it.pick].ok);
  h+='<div class="quiz"><div class="kicker">Correction détaillée — erreurs et oublis ('+bad.length+')</div>'+(bad.length?reviewHTML(bad):'<p>Aucune erreur. Beau travail.</p>')+'</div>';
  root.innerHTML=h;
  if(meta&&meta.save){ mem.exams.push({ts:Date.now(), total:Math.round(total*(5/ (core.length||5))), full:!!full, by:Object.fromEntries(core.map(t=>[t.id,sc(t)]))}); save(); }
  window.scrollTo(0,0);
}
function pExam(){
  const hist=mem.exams.slice(-5).reverse();
  let h=topbar()+'<h1>Examen blanc</h1><p class="mute">Même structure que le jour J : un questionnaire par thème, sans correction avant la fin. Chronomètre actif ; ne quitte pas la page pendant l’épreuve.</p><div id="ecfg">';
  h+='<div class="card"><b>Examen complet</b><p class="small mute">100 questions (20 par thème), 2 h 30. À faire une ou deux fois avant le jour J.</p><button type="button" class="btn" id="e-full">Lancer l’examen complet</button></div>';
  h+='<div class="card"><b>Mini-examen</b><p class="small mute">25 questions (5 par thème), 37 minutes. Pour t’évaluer en une séance.</p><button type="button" class="btn sec" id="e-mini">Lancer le mini-examen</button></div>';
  h+='<div class="card"><b>Épreuve facultative d’anglais</b><p class="small mute">20 questions, 30 minutes.</p><button type="button" class="btn sec" id="e-en">Lancer l’anglais</button></div>';
  if(hist.length) h+='<h2>Mes derniers examens</h2>'+hist.map(x=>'<div class="card"><div class="row" style="justify-content:space-between"><b>'+new Date(x.ts).toLocaleDateString('fr-FR')+' · '+(x.full?'complet':'mini')+'</b><span class="mono">'+x.total+' / 100</span></div></div>').join('');
  h+='</div><div id="erun"></div>';
  return {html:h, after:el=>{
    const start=(kind)=>{
      const per=kind==='full'?20:5; let list=[];
      if(kind==='en') list=shuffle(Q.filter(q=>q.th==='t6')).slice(0,20);
      else TH.filter(t=>!t.optional).forEach(t=>{ list=list.concat(shuffle(Q.filter(q=>q.th===t.id)).slice(0,per)); });
      const secs=kind==='full'?9000:kind==='mini'?2220:1800;
      $('#ecfg',el).style.display='none';
      runQuiz($('#erun',el), kind==='en'?list:list, {mode:'exam', secs, title:'Examen blanc', onDone:res=>{ examResult($('#erun',el), res, {full:kind==='full', save:kind!=='en'}); }});
    };
    $('#e-full',el).onclick=()=>start('full'); $('#e-mini',el).onclick=()=>start('mini'); $('#e-en',el).onclick=()=>start('en');
  }};
}

/* ---------- router ---------- */
const main=document.getElementById('main');
function route(){
  cleanup();
  const h=(location.hash||'#home').slice(1);
  const parts=h.split('-'), k=parts[0], rest=parts.slice(1).join('-');
  let p;
  if(k==='c') p=pChapter(rest); else if(k==='sim') p=pSim(rest); else if(k==='th') p=pTheme(rest);
  else p=({home:pHome,cours:pCours,sims:pSims,train:pTrain,exam:pExam,fiches:pFiches,gloss:pGloss}[h]||pHome)();
  main.innerHTML=p.html; setTab(h);
  if(p.after) p.after(main);
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
B.mountSim=mountSim; B.shuffle=shuffle; B.esc=esc;
route();
})();
