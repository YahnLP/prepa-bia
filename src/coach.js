(function(){ const B=window.BIA; const K=B.coach={};
const DAY=864e5, ymd=d=>{ const x=new Date(d); return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); };
const pick=(arr,n)=>arr[((n%arr.length)+arr.length)%arr.length];
const dayNo=()=>Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/DAY);

const THEME_TIP={
 t1:'Ici, tout est une chaîne de causes et d’effets. Pour chaque phénomène, demande-toi « pourquoi ? » puis « et alors ? ». Regarde l’animation avant de lire le texte : ça aide énormément.',
 t2:'La physique se comprend avec le corps. Imagine les forces, joue avec les simulateurs, et seulement ensuite retiens les mots. Si tu peux expliquer un schéma à voix haute, tu l’as compris.',
 t3:'Retiens trois choses pour chaque pièce ou machine : son nom, son rôle, et à quoi elle ressemble. Refais le dessin de mémoire : c’est la méthode la plus efficace.',
 t4:'La navigation s’apprend en faisant. Refais les calculs à la main sur un brouillon, puis vérifie avec le simulateur. Les erreurs de calcul sont normales au début.',
 t5:'L’histoire, c’est d’abord des histoires. Retiens des personnages et quelques dates-repères, pas une liste interminable. Une petite frise dessinée de mémoire vaut mieux que dix relectures.',
 t6:'Une langue s’apprend avec la bouche autant qu’avec les yeux : dis les mots à voix haute. Cinq minutes par jour valent bien mieux qu’une heure la veille.'};

const CH_TIP={
 '1-1':'Cite les quatre couches de l’atmosphère dans l’ordre, puis dis dans laquelle se passe la météo.',
 '1-2':'Explique pourquoi le vent souffle des hautes vers les basses pressions, comme l’air qui sort d’un ballon qu’on ouvre.',
 '1-3':'Raconte en quatre phrases le voyage d’une bulle d’air chaud qui monte, refroidit et devient un nuage.',
 '1-4':'Dessine de mémoire un front froid et un front chaud, puis compare avec le cours.',
 '1-5':'Cite trois phénomènes dangereux et dis ce que le pilote doit faire face à chacun.',
 '1-6':'Lis un METAR à voix haute, mot par mot, comme une langue étrangère. Au bout de deux ou trois essais, ça devient facile.',
 '2-1':'Explique pourquoi un ballon monte en utilisant la poussée d’Archimède, sans lire ton cours.',
 '2-2':'Explique comment l’air accélère dans un passage qui se rétrécit, avec un tuyau d’arrosage dont on pince le bout.',
 '2-3':'Explique à quelqu’un pourquoi un avion décroche quand l’incidence devient trop grande.',
 '2-4':'Nomme les quatre forces et dis, pour chacune, laquelle l’équilibre en vol stabilisé.',
 '2-5':'Sans hésiter : quelle commande agit sur le roulis, le tangage et le lacet ?',
 '3-1':'Pointe chaque pièce de l’avion sur le simulateur et dis son rôle en une phrase.',
 '3-2':'Explique les quatre temps du moteur avec tes mots, puis le chemin de l’air dans un réacteur.',
 '3-3':'Dis quel instrument utilise la pression statique et lequel utilise aussi la pression totale.',
 '3-4':'Explique pourquoi un hélicoptère a besoin d’un rotor de queue.',
 '3-5':'Explique pourquoi un satellite « tombe » sans jamais toucher la Terre.',
 '4-1':'Retrouve la latitude et la longitude de ta ville, puis explique ce que signifie chaque nombre.',
 '4-2':'Refais un calcul de cap avec un vent de travers, étape par étape, sur un brouillon.',
 '4-3':'Explique en deux phrases ce que fait un GNSS et pourquoi il faut au moins quatre satellites.',
 '4-4':'Explique la différence entre altitude, hauteur et niveau de vol avec un exemple chiffré.',
 '4-5':'Dis qui a la priorité dans chacune des quatre situations de croisement.',
 '4-6':'Trace de mémoire un circuit d’aérodrome avec ses cinq branches dans l’ordre.',
 '4-7':'Redis l’ordre des priorités en cas d’urgence : piloter, naviguer, puis communiquer.',
 '5-1':'Place sur une frise cinq dates clés avant 1914, de la montgolfière aux frères Wright.',
 '5-2':'Associe quatre pionniers de cette période à leur exploit, sans regarder.',
 '5-3':'Classe dans l’ordre chronologique les grandes étapes de l’avion à réaction.',
 '5-4':'Place sur une frise Spoutnik, Gagarine et Apollo 11, avec leur année.',
 '5-5':'Cite trois acteurs de l’espace d’aujourd’hui et ce qu’ils font.',
 '6-1':'Épelle ton nom et celui de ta ville avec l’alphabet OACI, à voix haute.',
 '6-2':'Retourne dix cartes de vocabulaire en moins de deux minutes.',
 '6-3':'Joue à voix haute un échange pilote–tour pour un décollage, avec les bons mots.',
 '6-4':'Fais le jeu « touche la pièce » sans faute, puis recommence en cachant les noms.'};

const MENTAL=[
 'Tu n’as pas besoin d’être parfait, seulement régulier. Dix minutes aujourd’hui valent mieux qu’une heure jamais commencée.',
 'Ne pas comprendre tout de suite, c’est normal : c’est le signe que ton cerveau construit quelque chose de nouveau.',
 'Tous les pilotes ont ouvert un jour une première leçon sans rien savoir. Toi aussi, tu es en train de décoller.',
 'Compare-toi à toi-même d’il y a une semaine, pas aux autres. C’est ça, le vrai progrès.',
 'Une erreur corrigée aujourd’hui, c’est un point gagné le jour de l’examen.',
 'Si ça coince, change de méthode : dessine, explique à voix haute, ou joue avec le simulateur.',
 'Les pilotes aussi ont le trac. Ils s’entraînent justement pour que les bons gestes deviennent des réflexes. C’est pareil pour toi.',
 'Tu as déjà appris des choses bien plus difficiles : marcher, parler, lire. Là, tu apprends à comprendre le ciel.',
 'Fais des pauses : un cerveau qui se repose retient mieux. Cinq minutes d’air frais, et tu repars.',
 'Fixe-toi un tout petit objectif pour aujourd’hui, et fais-le. Le reste suivra.',
 'Dormir fait partie de la révision : la nuit, ton cerveau range ce que tu as appris.',
 'Demande de l’aide quand tu bloques : un prof, un copain, un pilote. Ça fait gagner du temps et ça ne dévalorise personne.'];
const PAUSE=[
 'Pause de 20 secondes : ferme les yeux et redis, avec tes mots, ce que tu viens de comprendre. Si tu bloques, relis seulement le dernier paragraphe.',
 'Tu es à mi-parcours. Lève-toi, bois un verre d’eau, puis reviens. Retenir se fait mieux par petites séances.',
 'Petit test mental : pourrais-tu expliquer ce que tu viens de lire à un copain de ta classe ? Sinon, relis l’encadré « Explique-moi autrement ».',
 'Bravo, tu avances. Prends dix secondes pour respirer profondément avant de continuer : ça aide à rester concentré.'];

/* ---- séries et suivi ---- */
K.streak=function(days){ if(!days||!days.length) return 0; const set=new Set(days); let n=0; let d=new Date(); if(!set.has(ymd(d))) d=new Date(Date.now()-DAY); while(set.has(ymd(d))){ n++; d=new Date(d.getTime()-DAY); } return n; };
K.today=()=>ymd(Date.now());

/* ---- carte au début d’un chapitre ---- */
K.chapterCard=function(c,mem,idx){
  const o=mem.ch[c.id], best=o?o.best:0;
  let hi;
  if(!o) hi='On démarre ce chapitre ensemble. Pas de pression : lis à ton rythme, tout est expliqué.';
  else if(best>=80) hi='Tu as déjà validé ce chapitre ('+best+' %). Bravo ! Relis-le vite pour le fixer, ou passe au suivant.';
  else hi='Tu as déjà obtenu '+best+' % ici : tu es sur la bonne voie. Relis les passages qui te posent problème, puis retente les questions.';
  return '<aside class="cbx" aria-label="Conseil du coach"><div class="av" aria-hidden="true">🧭</div><div><b class="t">Ton coach</b><p>'+hi+'</p><p><b>Ta méthode ici.</b> '+THEME_TIP[c.th]+'</p></div></aside>';
};
K.pause=function(idx){ return '<aside class="cbx pause" aria-label="Pause du coach"><div class="av" aria-hidden="true">☕</div><div><b class="t">Pause coach</b><p>'+pick(PAUSE,idx)+'</p><p class="mental">'+pick(MENTAL,idx+3)+'</p></div></aside>'; };
K.beforeQuiz=function(c){ return '<aside class="cbx" style="--tc:var(--ok)"><div class="av" aria-hidden="true">🎯</div><div><b class="t">Avant de te tester</b>'+(CH_TIP[c.id]?'<p><b>Défi.</b> '+CH_TIP[c.id]+' Si tu y arrives sans regarder, tu es prêt.</p>':'')+'<p>Une erreur n’est pas un échec : c’est l’endroit exact où ton cerveau apprend le plus. Tu peux recommencer autant de fois que tu veux.</p><p>Et le jour de l’examen, réponds toujours à toutes les questions : une mauvaise réponse ne retire aucun point.</p></div></aside>'; };

/* ---- retour après un quiz ---- */
K.quizBox=function(res,prev){
  const p=res.pct; let t,m,cls='';
  if(p===100){ t='Sans faute !'; m='Tout est juste. Prends une seconde pour être fier de toi, tu l’as mérité. Demain, reviens sur trois questions pour que ça reste.'; cls=' good'; }
  else if(p>=80){ t='Chapitre validé'; m='Très bon résultat. Regarde quand même les erreurs ci-dessous : ce sont tes points faciles de demain.'; cls=' good'; }
  else if(p>=50){ t='Tu y es presque'; m='Tu en sais déjà plus de la moitié. Lis les explications des erreurs, puis recommence : tu vas monter, c’est presque toujours le cas.'; }
  else { t='C’est un début, pas un verdict'; m='Personne ne retient tout du premier coup. Relis la leçon, surtout les encadrés « Explique-moi autrement », puis retente. Un seul petit pas à la fois.'; }
  if(prev!=null && prev>0 && p>prev) m+=' <b>Tu progresses : tu étais à '+prev+' %.</b>';
  return '<div class="cbx'+cls+'" style="margin:14px 0"><div class="av" aria-hidden="true">'+(p>=80?'🎉':p>=50?'💪':'🌱')+'</div><div><b class="t">Ton coach : '+t+'</b><p>'+m+'</p></div></div>';
};
K.examBox=function(total,weak,zero,full){
  let t,m;
  if(zero){ t='Un thème à rattraper en priorité'; m='Un zéro sur un thème est éliminatoire à l’examen, donc commence par là. Bonne nouvelle : le premier chapitre d’un thème fait déjà gagner plusieurs points.'; }
  else if(total>=70){ t='Excellent travail'; m='Tu es très à l’aise. Continue les examens blancs pour garder le rythme et surveille ton temps.'; }
  else if(total>=50){ t='Tu es dans la zone de réussite'; m='Bravo. Pour être tranquille le jour J, vise une marge : retravaille ton thème le plus faible, c’est là que tu gagneras le plus de points.'; }
  else { t='Pas encore, mais tu sais quoi travailler'; m='Un examen blanc sert justement à repérer ce qu’il reste à apprendre. Regarde tes thèmes les plus faibles et fais un chapitre par jour : ça va monter vite.'; }
  return '<div class="cbx'+(total>=50&&!zero?' good':'')+'" style="margin:14px 0"><div class="av" aria-hidden="true">🧭</div><div><b class="t">Ton coach : '+t+'</b><p>'+m+'</p><p class="small mute">Rappelle-toi : un examen blanc est un entraînement, pas un jugement.</p></div></div>';
};

/* ---- carte d’accueil ---- */
K.homeCard=function(mem,info){
  const st=K.streak(mem.days), todayDone=(mem.days||[]).indexOf(K.today())>-1, dl=info.dl, val=info.validated, tot=info.total;
  let msg;
  if(!mem.days||!mem.days.length) msg='Bienvenue à bord ! Le plus dur, c’est de commencer, et tu es déjà là. Lance la prochaine étape ci-dessous : une dizaine de minutes suffisent pour aujourd’hui.';
  else if(dl!==null && dl>=0 && dl<=1) msg=dl===0?'C’est aujourd’hui ! Respire, fais-toi confiance : tu as préparé ça. Lis le sujet calmement et réponds à tout.':'Veille d’examen : relis seulement les fiches, prépare ton sac, dors bien. Tu n’apprends plus rien de nouveau ce soir, tu te rassures.';
  else if(dl!==null && dl>=0 && dl<=7) msg='Dernière ligne droite : J-'+dl+'. Refais un examen blanc, relis les fiches de révision et soigne ton sommeil.';
  else if(dl!==null && dl>7 && dl<=30) msg='Plus que '+dl+' jours : c’est le bon moment pour les examens blancs. Chaque erreur repérée maintenant est un point gagné plus tard.';
  else if(!todayDone && st===0 && (mem.days||[]).length>0) msg='Content de te retrouver ! Une pause, ça arrive à tout le monde. Reprends doucement : un chapitre ou dix questions, et tu es reparti.';
  else if(!todayDone) msg='Tu as déjà '+st+' jour'+(st>1?'s':'')+' de suite : ne casse pas la série ! Même dix minutes comptent aujourd’hui.';
  else msg='Séance du jour faite, bravo ! Tu peux t’arrêter fier de toi, ou continuer si tu as encore de l’énergie.';
  let mile='';
  if(val>=tot&&tot>0) mile='🏆 Tous les chapitres sont validés ! Il ne reste qu’à t’entraîner avec les examens blancs.';
  else if(val>=20) mile='🌟 '+val+' chapitres validés sur '+tot+' : tu as passé le cap des deux tiers.';
  else if(val>=10) mile='⭐ '+val+' chapitres validés : tu es bien lancé.';
  else if(val>=1) mile='✅ '+val+' chapitre'+(val>1?'s':'')+' validé'+(val>1?'s':'')+' : le premier pas est fait.';
  return '<div class="cbx home"><div class="av" aria-hidden="true">🧭</div><div><b class="t">Ton coach</b><p>'+msg+'</p>'+(mile?'<p class="small">'+mile+'</p>':'')+'<p class="mental">'+pick(MENTAL,dayNo())+'</p><div class="chips">'+(st>0?'<span class="chip">🔥 '+st+' jour'+(st>1?'s':'')+' de suite</span>':'')+'<a class="chip link" href="#coach">Méthode, stress, carnet de victoires →</a></div></div></div>';
};

/* ---- page « Ton coach » ---- */
const WIN_TIPS=['J’ai compris pourquoi…','Aujourd’hui, j’ai réussi à…','Je suis fier de moi parce que…'];
K.page=function(mem,info){
  const st=K.streak(mem.days), nd=(mem.days||[]).length, last=mem.exams[mem.exams.length-1];
  const tile=(v,l)=>'<div><b>'+v+'</b><span class="small mute">'+l+'</span></div>';
  let h='<h1>Ton coach</h1><p class="mute">Réussir le BIA, ce n’est pas une question de talent : c’est une bonne méthode, un rythme régulier et un peu de confiance. Tout est ici.</p>';
  h+='<div class="stat">'+tile(st,'jour'+(st>1?'s':'')+' de suite')+tile(nd,'jour'+(nd>1?'s':'')+' d’entraînement')+tile(info.validated+' / '+info.total,'chapitres validés')+'</div>';
  h+='<div class="stat" style="margin-top:8px">'+tile(info.answers,'réponses données')+tile(info.rate+' %','de réussite')+tile(last?last.total+' /100':'—','dernier examen blanc')+'</div>';
  h+='<h2>La méthode en 4 gestes</h2><ol class="steps4"><li><b>Comprendre.</b> Lis la leçon, regarde l’animation, manipule le simulateur. Ne cherche pas encore à retenir.</li><li><b>Dire avec tes mots.</b> Ferme le cours et explique à voix haute, comme à un copain. Si tu bloques, c’est là qu’il faut relire.</li><li><b>Te tester.</b> Réponds aux questions du chapitre. À partir de 80 %, le chapitre est validé.</li><li><b>Revoir demain.</b> La révision espacée te repropose les questions juste avant que tu ne les oublies. C’est la méthode la plus efficace qui existe.</li></ol>';
  h+='<h2>Un rythme qui tient</h2><p>Mieux vaut <b>20 minutes presque tous les jours</b> qu’une grosse séance le dimanche. Exemple de séance : 15 minutes de leçon ou de simulateur, 5 minutes de questions, puis une vraie pause. Si tu n’as que dix minutes, fais dix questions de révision : ça compte aussi.</p>';
  h+='<h2>Le jour de l’examen : ta stratégie</h2><ul class="tips"><li><b>Le temps.</b> 100 questions en 2 h 30, soit environ 1 min 30 par question. Si une question te bloque, marque-la et passe à la suivante.</li><li><b>Lis les quatre propositions</b> avant de répondre, puis élimine celles qui sont impossibles.</li><li><b>Ne laisse jamais une case vide.</b> Une mauvaise réponse ne retire aucun point : au pire tu ne gagnes rien, au mieux tu gagnes un point.</li><li><b>Ne néglige aucun thème.</b> Un zéro sur un thème est éliminatoire, alors mieux vaut gagner quelques points partout.</li><li><b>Relis</b> tes questions marquées s’il te reste du temps, mais ne change une réponse que si tu es sûr de ton erreur.</li></ul>';
  h+='<h2>Gérer le stress</h2><p>Avoir le trac, c’est normal : cela veut dire que tu tiens à réussir. Voici un exercice simple, utilisé par beaucoup de gens pour se calmer avant une épreuve ou un oral : inspirer 5 secondes, expirer 5 secondes, pendant trois minutes.</p><div class="breath" id="breath"><div class="orb" id="orb"><span id="bt">Prêt ?</span></div><div class="row" style="justify-content:center;margin-top:10px"><button type="button" class="btn" id="bgo">Commencer (3 min)</button></div><p class="small mute" id="bc" style="text-align:center;margin:8px 0 0"></p></div>';
  h+='<ul class="tips"><li><b>Trou noir ?</b> Respire trois fois lentement, passe à la question suivante et reviens-y après.</li><li><b>La veille :</b> pas de nouvelle leçon. Relis les fiches, prépare ton sac et couche-toi à une heure raisonnable.</li><li><b>Le matin :</b> mange un vrai petit-déjeuner et arrive un peu en avance.</li></ul>';
  h+='<h2>Ma check-list de la veille et du jour J</h2><div class="chk" id="chk">'+[['sac','Mon sac, ma convocation et ce que mon établissement demande sont prêts'],['fiches','Je relis seulement les fiches de révision'],['dodo','Je me couche à une heure raisonnable'],['dej','Je mange un vrai petit-déjeuner'],['avance','J’arrive un peu en avance'],['resp','Je respire trois fois avant d’ouvrir le sujet']].map(x=>'<label><input type="checkbox" data-k="'+x[0]+'"'+(mem.chk&&mem.chk[x[0]]?' checked':'')+'> <span>'+x[1]+'</span></label>').join('')+'</div>';
  h+='<h2>Mon carnet de victoires</h2><p class="mute small">Chaque soir, note une chose que tu as comprise ou réussie, même toute petite. Relire ses victoires donne confiance.</p><div class="row"><label for="win" class="sr">Une victoire</label><input type="text" id="win" maxlength="140" placeholder="'+WIN_TIPS[dayNo()%3]+'" style="flex:1;min-width:0"><button type="button" class="btn sm" id="wadd">Ajouter</button></div><ul class="wins" id="wins"></ul>';
  h+='<h2>Quand tu doutes</h2><p>Tout le monde doute, y compris ceux qui réussissent. Quand ça arrive : <b>change de méthode</b> (dessine, parle à voix haute, joue avec un simulateur), <b>réduis la marche</b> (un seul chapitre, un seul objectif) et <b>demande de l’aide</b> à un professeur, un camarade ou un pilote. Tu as déjà fait le plus dur : t’y mettre.</p>';
  h+='<div class="row" style="margin-top:14px"><a class="btn" href="#home">Retour à l’accueil</a><a class="btn sec" href="#exam">Faire un examen blanc</a></div>';
  return h;
};
K.wins=function(el,mem,save){
  const ul=el.querySelector('#wins'); const draw=()=>{ ul.innerHTML=(mem.wins||[]).slice().reverse().slice(0,30).map(w=>'<li><span>'+w.t.replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]))+'</span><small>'+w.d+'</small></li>').join('')||'<li class="mute">Ta première victoire t’attend.</li>'; };
  draw(); const add=()=>{ const i=el.querySelector('#win'); const t=i.value.trim(); if(!t) return; mem.wins=mem.wins||[]; mem.wins.push({t:t,d:new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}); i.value=''; save(); draw(); };
  el.querySelector('#wadd').onclick=add; el.querySelector('#win').addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); add(); } });
  el.querySelectorAll('#chk input').forEach(i=>i.addEventListener('change',()=>{ mem.chk=mem.chk||{}; mem.chk[i.dataset.k]=i.checked; save(); }));
};
K.breath=function(el,onStop){
  const orb=el.querySelector('#orb'), bt=el.querySelector('#bt'), go=el.querySelector('#bgo'), bc=el.querySelector('#bc'); let run=false, t0=0, raf=0;
  const stop=()=>{ run=false; cancelAnimationFrame(raf); orb.style.transform='scale(.7)'; bt.textContent='Bravo'; go.textContent='Recommencer (3 min)'; };
  function loop(now){ if(!run) return; const s=(now-t0)/1000; if(s>=180){ stop(); bc.textContent='Terminé. Tu peux reprendre le travail, plus calme.'; return; } const ph=s%10; const inh=ph<5; const k=inh?ph/5:(ph-5)/5; const e=.5-.5*Math.cos(Math.PI*k); const sc=inh?.7+.5*e:1.2-.5*e; orb.style.transform='scale('+sc.toFixed(3)+')'; const lab=inh?'Inspire…':'Expire…'; if(bt.textContent!==lab) bt.textContent=lab; bc.textContent='Il reste '+Math.ceil(180-s)+' s'; raf=requestAnimationFrame(loop); }
  go.onclick=()=>{ if(run){ stop(); bc.textContent=''; go.textContent='Commencer (3 min)'; bt.textContent='Prêt ?'; return; } run=true; t0=performance.now(); go.textContent='Arrêter'; raf=requestAnimationFrame(loop); };
  orb.style.transform='scale(.7)'; onStop(()=>{ run=false; cancelAnimationFrame(raf); });
};
})();
