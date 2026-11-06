(function(){
const S = window.BIA.sims;
const f1 = (x,d)=>x.toFixed(d===undefined?1:d).replace('.',',');
const rad=a=>a*Math.PI/180;

/* ---------- 2.1 Ballon ---------- */
S.balloon={title:'Montgolfière', th:'t2', ch:'2-1',
desc:'Chauffe l’air de l’enveloppe : la poussée d’Archimède l’emporte-t-elle sur le poids ?',
try:['Baisse la température intérieure jusqu’à ce que le ballon redescende.','Charge plus de passagers (masse) : il faut chauffer davantage pour décoller.','Un jour froid, le ballon porte mieux : l’air extérieur est plus dense.'],
mount(root,x){
  root.innerHTML=x.r('ti','Température de l’air dans l’enveloppe',20,120,1,85,' °C')+x.r('te','Température de l’air extérieur',-5,35,1,15,' °C')+x.r('m','Masse totale (enveloppe, nacelle, passagers, gaz)',300,900,10,480,' kg')+
  '<svg viewBox="0 0 640 260" id="'+x.uid+'s" role="img" aria-label="Montgolfière avec flèches de poussée et de poids"></svg><div class="readout"><div><small>Poussée d’Archimède</small><b id="'+x.uid+'a"></b></div><div><small>Poids total</small><b id="'+x.uid+'p"></b></div><div><small>Bilan</small><b id="'+x.uid+'b"></b></div></div><div class="verdict" id="'+x.uid+'v"></div>';
  const sv=x.q('#'+x.uid+'s'); const V=2800;
  function draw(){
    const ti=x.v('ti'), te=x.v('te'), m=x.v('m');
    const re=1.225*288.15/(te+273.15), ri=re*(te+273.15)/(ti+273.15);
    const lift=V*re, weightAir=V*ri, tot=m+weightAir, net=lift-tot;
    const heat=Math.min(1,(ti-20)/100), col='hsl('+(28-heat*20)+',80%,'+(62-heat*14)+'%)';
    const up=Math.max(20,Math.min(200,lift/6)), dn=Math.max(20,Math.min(200,tot/6));
    sv.innerHTML='<rect width="640" height="260" fill="var(--soft)"/><ellipse cx="320" cy="95" rx="90" ry="78" fill="'+col+'" stroke="var(--ink)" stroke-width="2"/><path d="M262 148 L300 205 L340 205 L378 148" fill="none" stroke="var(--ink)" stroke-width="2"/><rect x="298" y="205" width="44" height="26" fill="var(--ground)" stroke="var(--ink)"/><text x="320" y="100" text-anchor="middle" font-size="15" font-weight="700" fill="var(--ink)">'+ti+' °C</text>'+
    '<line x1="500" y1="130" x2="500" y2="'+(130-up*0.6)+'" stroke="var(--ok)" stroke-width="6"/><polygon points="490,'+(130-up*0.6)+' 510,'+(130-up*0.6)+' 500,'+(130-up*0.6-14)+'" fill="var(--ok)"/><text x="500" y="150" text-anchor="middle" font-size="13" fill="var(--ok)" font-weight="700">Archimède</text>'+
    '<line x1="570" y1="130" x2="570" y2="'+(130+dn*0.6)+'" stroke="var(--bad)" stroke-width="6"/><polygon points="560,'+(130+dn*0.6)+' 580,'+(130+dn*0.6)+' 570,'+(130+dn*0.6+14)+'" fill="var(--bad)"/><text x="570" y="122" text-anchor="middle" font-size="13" fill="var(--bad)" font-weight="700">Poids</text>';
    x.q('#'+x.uid+'a').textContent=Math.round(lift)+' kg'; x.q('#'+x.uid+'p').textContent=Math.round(tot)+' kg'; x.q('#'+x.uid+'b').textContent=(net>=0?'+':'')+Math.round(net)+' kg';
    const v=x.q('#'+x.uid+'v');
    if(net>15){ v.className='verdict ok'; v.textContent='La poussée dépasse le poids : le ballon monte. Pour se stabiliser, le pilote cesse de chauffer.'; }
    else if(net<-15){ v.className='verdict bad'; v.textContent='Le poids l’emporte : le ballon descend. Pour remonter, le pilote allume le brûleur.'; }
    else { v.className='verdict warn'; v.textContent='Poussée et poids s’équilibrent : le ballon reste à son altitude.'; }
  }
  x.bind(draw);
}};

/* ---------- 2.2 Venturi ---------- */
S.venturi={title:'Tube de Venturi', th:'t2', ch:'2-2',
desc:'Rétrécis le tube : l’air accélère et sa pression statique baisse (théorème de Bernoulli).',
try:['Rétrécis le col à 30 mm : la vitesse est multipliée par 4 et la pression chute.','Augmente la vitesse d’entrée : l’écart de pression grandit avec le carré de la vitesse.'],
mount(root,x){
  root.innerHTML=x.r('d','Diamètre du col',30,60,1,40,' mm')+x.r('v','Vitesse de l’air à l’entrée',2,30,1,15,' m/s')+
  '<svg viewBox="0 0 640 240" id="'+x.uid+'s" role="img" aria-label="Tube de Venturi avec deux manomètres"></svg><div class="readout"><div><small>Vitesse au col</small><b id="'+x.uid+'a"></b></div><div><small>Pression à l’entrée</small><b id="'+x.uid+'b"></b></div><div><small>Pression au col</small><b id="'+x.uid+'c"></b></div></div><div class="verdict ok" id="'+x.uid+'t"></div>';
  const sv=x.q('#'+x.uid+'s');
  function draw(){
    const d=x.v('d'), v1=x.v('v'), v2=v1*Math.pow(60/d,2), p1=101325, p2=p1-0.5*1.225*(v2*v2-v1*v1), dp=p1-p2;
    const hw=60/2*1.1, hn=d/2*1.1, c=120;
    let o='<rect width="640" height="240" fill="var(--soft)"/>';
    o+='<path d="M20 '+(c-hw)+' L200 '+(c-hw)+' Q260 '+(c-hw)+' 290 '+(c-hn)+' L350 '+(c-hn)+' Q380 '+(c-hw)+' 440 '+(c-hw)+' L620 '+(c-hw)+' L620 '+(c+hw)+' L440 '+(c+hw)+' Q380 '+(c+hw)+' 350 '+(c+hn)+' L290 '+(c+hn)+' Q260 '+(c+hw)+' 200 '+(c+hw)+' L20 '+(c+hw)+' Z" fill="var(--sky)" stroke="var(--ink)" stroke-width="3"/>';
    const a1=10+v1*1.6, a2=10+v2*1.0;
    o+='<line x1="60" y1="'+c+'" x2="'+(60+a1)+'" y2="'+c+'" stroke="var(--acc)" stroke-width="4"/><polygon points="'+(60+a1)+','+(c-8)+' '+(60+a1+14)+','+c+' '+(60+a1)+','+(c+8)+'" fill="var(--acc)"/>';
    o+='<line x1="300" y1="'+c+'" x2="'+(300+Math.min(a2,48))+'" y2="'+c+'" stroke="var(--acc)" stroke-width="4"/><polygon points="'+(300+Math.min(a2,48))+','+(c-8)+' '+(300+Math.min(a2,48)+14)+','+c+' '+(300+Math.min(a2,48))+','+(c+8)+'" fill="var(--acc)"/>';
    const yb1=c-hw, yb2=c-hn, y1=50, y2=50+Math.min(60,dp/8500*50);
    o+='<rect x="110" y="20" width="20" height="'+(yb1-20)+'" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/><rect x="310" y="20" width="20" height="'+(yb2-20)+'" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>';
    o+='<rect x="112" y="'+y1+'" width="16" height="'+(yb1-y1)+'" fill="var(--c1)"/><rect x="312" y="'+y2+'" width="16" height="'+(yb2-y2)+'" fill="var(--c1)"/>';
    o+='<line x1="100" x2="340" y1="'+y1+'" y2="'+y1+'" stroke="var(--mute)" stroke-dasharray="4 4"/>';
    o+='<text x="120" y="14" text-anchor="middle" font-size="12" fill="var(--ink)">entrée</text><text x="320" y="14" text-anchor="middle" font-size="12" fill="var(--ink)">col</text>';
    sv.innerHTML=o;
    x.q('#'+x.uid+'a').textContent=f1(v2)+' m/s'; x.q('#'+x.uid+'b').textContent=f1(p1/100,0)+' hPa'; x.q('#'+x.uid+'c').textContent=f1(p2/100,1)+' hPa';
    x.q('#'+x.uid+'t').textContent=d<60?'Section divisée par '+f1(Math.pow(60/d,2))+' : vitesse multipliée par '+f1(Math.pow(60/d,2))+', pression statique en baisse de '+f1(dp/100,1)+' hPa. C’est le principe de la dépression qui aide à faire voler l’aile.':'Pas de rétrécissement : l’air garde la même vitesse et la même pression.';
  }
  x.bind(draw);
}};

/* ---------- 2.3 L’aile ---------- */
S.wing={title:'Aile : portance et décrochage', th:'t2', ch:'2-3',
desc:'Fais varier l’incidence et la vitesse : observe la portance, la traînée et le décrochage (modèle simplifié, avion léger de 1 000 kg).',
try:['Garde 150 km/h et monte l’incidence de 0 à 16° : la portance grimpe puis s’effondre au décrochage.','À incidence fixe, double la vitesse : la portance est multipliée par 4.','Mets les volets : le décrochage arrive plus tôt en incidence mais la vitesse de décrochage baisse.'],
mount(root,x){
  root.innerHTML=x.r('a','Incidence',-4,20,0.5,5,'°')+x.r('v','Vitesse',60,250,5,150,' km/h')+'<div>'+x.seg('fl',[['0','Volets rentrés'],['1','Volets sortis']],'0')+'</div>'+
  '<svg viewBox="0 0 640 230" id="'+x.uid+'s" role="img" aria-label="Profil d’aile avec vent relatif, portance et traînée"></svg><svg viewBox="0 0 640 190" id="'+x.uid+'c" role="img" aria-label="Courbe du coefficient de portance"></svg><div class="readout"><div><small>Cz</small><b id="'+x.uid+'cz"></b></div><div><small>Portance</small><b id="'+x.uid+'l"></b></div><div><small>Finesse Cz/Cx</small><b id="'+x.uid+'f"></b></div><div><small>Vitesse de décrochage</small><b id="'+x.uid+'vs"></b></div></div><div class="verdict" id="'+x.uid+'t"></div>';
  let fl=0; const sv=x.q('#'+x.uid+'s'), cv=x.q('#'+x.uid+'c'), K=0.0909;
  const par=()=>fl?{a0:-6.5,ac:14,cx0:0.075}:{a0:-1.5,ac:15,cx0:0.03};
  const cz=a=>{ const p=par(), m=K*(p.ac-p.a0); return a<=p.ac?K*(a-p.a0):Math.max(0.5,m-0.12*(a-p.ac)); };
  function draw(){
    const a=x.v('a'), V=x.v('v')/3.6, p=par(), c=cz(a), stalled=a>p.ac;
    const cx=p.cx0+0.05*c*c+(stalled?0.06*(a-p.ac):0), L=0.5*1.225*16*V*V*c, D=0.5*1.225*16*V*V*cx, W=9810, czmax=K*(p.ac-p.a0), vs=Math.sqrt(2*W/(1.225*16*czmax))*3.6;
    let o='<rect width="640" height="230" fill="var(--sky)" opacity=".5"/>';
    for(const y of [40,70,160,190]) o+='<path d="M10 '+y+' C 200 '+y+' 230 '+(y-(y<115?22:-6))+' 400 '+(y-(y<115?22:-6))+' S 560 '+y+' 630 '+y+'" fill="none" stroke="var(--c1)" stroke-width="2" opacity=".55"/>';
    o+='<g transform="translate(250 120) rotate('+(-a)+')"><path d="M-110 0 C-100 -22 -40 -30 20 -18 C60 -10 90 -3 110 2 C80 6 20 8 -30 7 C-80 6 -108 4 -110 0 Z" fill="var(--ink)" opacity=".85"/><line x1="-110" y1="0" x2="110" y2="2" stroke="var(--acc)" stroke-width="1.5" stroke-dasharray="4 3"/>'+(fl?'<path d="M60 4 L108 14" stroke="var(--ink)" stroke-width="5"/>':'')+'</g>';
    o+='<text x="130" y="22" font-size="12" fill="var(--mute)">corde (pointillés)</text>';
    if(stalled){ o+='<path d="M230 85 q15 -12 30 0 t30 0 t30 0 t30 0" fill="none" stroke="var(--bad)" stroke-width="4"/><text x="320" y="72" fill="var(--bad)" font-size="14" font-weight="700">écoulement décollé</text>'; }
    o+='<g stroke="var(--acc)" fill="var(--acc)"><text x="10" y="118" font-size="13" stroke="none" font-weight="700">vent relatif</text><line x1="10" y1="124" x2="70" y2="124" stroke-width="3"/><polygon points="70,119 82,124 70,129" stroke="none"/></g>';
    const lL=Math.min(100,Math.abs(L)/W*60), dL=Math.min(60,D/W*600);
    o+='<line x1="250" y1="120" x2="250" y2="'+(120-lL)+'" stroke="var(--ok)" stroke-width="5"/><polygon points="244,'+(120-lL)+' 256,'+(120-lL)+' 250,'+(120-lL-12)+'" fill="var(--ok)"/><text x="262" y="'+(120-lL-2)+'" font-size="13" font-weight="700" fill="var(--ok)">portance</text>';
    o+='<line x1="250" y1="120" x2="'+(250+dL)+'" y2="120" stroke="var(--bad)" stroke-width="5"/><polygon points="'+(250+dL)+',114 '+(250+dL+12)+',120 '+(250+dL)+',126" fill="var(--bad)"/><text x="'+(250+dL+16)+'" y="124" font-size="13" font-weight="700" fill="var(--bad)">traînée</text>';
    o+='<line x1="500" y1="120" x2="500" y2="180" stroke="var(--ink)" stroke-width="4" stroke-dasharray="1 0"/><polygon points="494,180 506,180 500,192" fill="var(--ink)"/><text x="508" y="170" font-size="13" font-weight="700" fill="var(--ink)">poids</text>';
    sv.innerHTML=o;
    let q='<rect width="640" height="190" fill="var(--soft)"/>'; const X=a=>50+(a+4)/24*560, Y=c=>160-c/2.2*140;
    q+='<rect x="'+X(p.ac)+'" y="14" width="'+(X(20)-X(p.ac))+'" height="146" fill="var(--bad)" opacity=".12"/><text x="'+(X(p.ac)+6)+'" y="30" font-size="12" fill="var(--bad)" font-weight="700">décrochage</text>';
    for(let g=0;g<=2;g++) q+='<line x1="50" x2="610" y1="'+Y(g)+'" y2="'+Y(g)+'" stroke="var(--line)" stroke-width=".7"/><text x="44" y="'+(Y(g)+4)+'" font-size="11" text-anchor="end" fill="var(--mute)">'+g+'</text>';
    for(let g=-4;g<=20;g+=4) q+='<text x="'+X(g)+'" y="178" font-size="11" text-anchor="middle" fill="var(--mute)">'+g+'°</text>';
    let pts=''; for(let g=-4;g<=20;g+=0.5) pts+=X(g)+','+Y(cz(g))+' ';
    q+='<polyline points="'+pts+'" fill="none" stroke="var(--c2)" stroke-width="3"/><circle cx="'+X(a)+'" cy="'+Y(c)+'" r="7" fill="var(--acc)"/><text x="52" y="14" font-size="12" fill="var(--mute)" font-weight="600">Cz (coefficient de portance) selon l’incidence</text>';
    cv.innerHTML=q;
    x.q('#'+x.uid+'cz').textContent=f1(c,2); x.q('#'+x.uid+'l').textContent=Math.round(L/9.81)+' kg'; x.q('#'+x.uid+'f').textContent=f1(c/cx,1); x.q('#'+x.uid+'vs').textContent=Math.round(vs)+' km/h';
    const t=x.q('#'+x.uid+'t');
    if(stalled){ t.className='verdict bad'; t.textContent='DÉCROCHAGE : l’incidence dépasse l’incidence critique ('+p.ac+'°). La portance chute et la traînée explose. Pour s’en sortir : diminuer l’incidence (manche vers l’avant).'; }
    else if(L>W*1.03){ t.className='verdict ok'; t.textContent='La portance ('+Math.round(L/9.81)+' kg) dépasse le poids (1 000 kg) : l’avion peut monter.'; }
    else if(L<W*0.97){ t.className='verdict warn'; t.textContent='La portance ('+Math.round(L/9.81)+' kg) est inférieure au poids (1 000 kg) : l’avion descend, sauf si tu augmentes l’incidence ou la vitesse.'; }
    else { t.className='verdict ok'; t.textContent='Portance ≈ poids : vol en palier. Tu as trouvé l’équilibre.'; }
  }
  x.segBind('fl',v=>{ fl=+v; draw(); });
  x.bind(draw);
}};

/* ---------- 2.4 Les 4 forces ---------- */
S.forces={title:'Les quatre forces', th:'t2', ch:'2-4',
desc:'Choisis une phase de vol : observe l’équilibre ou le déséquilibre entre poids, portance, traction et traînée.',
try:['Compare « montée » et « palier » : que doit faire la traction en plus ?','En vol plané, la traction est nulle : qu’est-ce qui avance l’avion ?'],
mount(root,x){
  const sc={
   pal:{n:'Palier stabilisé',g:0,P:100,L:100,T:60,D:60,t:'Portance = Poids et Traction = Traînée : la vitesse et l’altitude sont constantes.'},
   acc:{n:'Accélération',g:0,P:100,L:100,T:90,D:60,t:'La traction dépasse la traînée : l’avion accélère. Il faudra réduire l’incidence pour garder la portance égale au poids.'},
   dec:{n:'Ralentissement',g:0,P:100,L:100,T:30,D:60,t:'La traînée dépasse la traction : l’avion ralentit. Si rien ne change, la portance finira par diminuer.'},
   mon:{n:'Montée stabilisée',g:12,P:100,L:98,T:81,D:60,t:'En montée, une partie du poids freine l’avion : la traction doit valoir la traînée PLUS cette composante du poids (T = D + P sin γ).'},
   des:{n:'Descente moteur réduit',g:-10,P:100,L:98,T:43,D:60,t:'En descente, une partie du poids tire l’avion vers l’avant : il faut moins de traction (T = D − P sin γ).'},
   pla:{n:'Vol plané (moteur coupé)',g:-6,P:100,L:99.5,T:0,D:10.5,t:'Sans traction, c’est la composante du poids le long de la trajectoire qui équilibre la traînée. La pente est liée à la finesse.'}
  };
  root.innerHTML=x.seg('sc',Object.keys(sc).map(k=>[k,sc[k].n]),'pal')+'<svg viewBox="0 0 640 300" id="'+x.uid+'s" role="img" aria-label="Avion et ses quatre forces"></svg><div class="verdict ok" id="'+x.uid+'t"></div>';
  const sv=x.q('#'+x.uid+'s'), t=x.q('#'+x.uid+'t');
  const arrow=(x1,y1,ang,len,col,label,lx,ly)=>{ const x2=x1+len*Math.cos(rad(ang)), y2=y1-len*Math.sin(rad(ang)); return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+col+'" stroke-width="6"/><polygon points="0,-9 16,0 0,9" fill="'+col+'" transform="translate('+x2+' '+y2+') rotate('+(-ang)+')"/><text x="'+(x2+lx)+'" y="'+(y2+ly)+'" font-size="14" font-weight="700" fill="'+col+'">'+label+'</text>'; };
  function draw(k){
    const s=sc[k], g=s.g, k2=1.1;
    let o='<rect width="640" height="300" fill="var(--sky)" opacity=".45"/>';
    o+='<g transform="translate(320 150) rotate('+(-g)+')"><path d="M-110 0 L-90 -10 L80 -12 Q120 -10 130 0 Q120 10 80 12 L-90 10 Z" fill="var(--ink)"/><path d="M-110 0 L-125 -34 L-96 -30 L-80 -8 Z" fill="var(--ink)"/><path d="M-10 0 L-40 40 L-6 40 L22 4 Z" fill="var(--ink)" opacity=".8"/><line x1="132" y1="-18" x2="132" y2="18" stroke="var(--mute)" stroke-width="4"/></g>';
    o+=arrow(320,150,90-g,s.L*k2,'var(--ok)','Portance',10,4);
    o+=arrow(320,150,-90,s.P*k2,'var(--ink)','Poids',10,14);
    o+=arrow(320,150,-g,Math.max(2,s.T*k2),'var(--acc)',s.T>0?'Traction':'',8,-12);
    o+=arrow(320,150,180-g,Math.max(2,s.D*k2),'var(--bad)','Traînée',-70,22);
    o+='<text x="12" y="22" font-size="14" font-weight="700" fill="var(--ink)">'+s.n+(g?' · pente '+g+'°':'')+'</text>';
    sv.innerHTML=o; t.textContent=s.t;
  }
  x.segBind('sc',draw); draw('pal');
}};

/* ---------- 2.5 Commandes de vol ---------- */
S.controls={title:'Commandes et mouvements', th:'t2', ch:'2-5',
desc:'Actionne le manche ou le palonnier : regarde la gouverne qui bouge et le mouvement qui en résulte.',
try:['Tangage : manche en arrière, la gouverne de profondeur monte et le nez monte aussi.','Roulis : manche à droite, l’aileron droit monte et l’aile droite descend.','Lacet : palonnier à droite, le nez part à droite.'],
mount(root,x){
  root.innerHTML=x.seg('ax',[['pitch','Tangage'],['roll','Roulis'],['yaw','Lacet']],'pitch')+x.r('s','Commande',-100,100,5,0,' %')+'<svg viewBox="0 0 640 280" id="'+x.uid+'s" role="img" aria-label="Avion et gouvernes"></svg><div class="verdict" id="'+x.uid+'t"></div>';
  let ax='pitch'; const sv=x.q('#'+x.uid+'s'), t=x.q('#'+x.uid+'t');
  function draw(){
    const s=x.v('s')/100; let o='<rect width="640" height="280" fill="var(--sky)" opacity=".4"/>', msg='', ctl='';
    if(ax==='pitch'){
      const th=14*s, el=22*s;
      o+='<g transform="translate(320 140) rotate('+(-th)+')"><path d="M-150 -2 L-40 -10 Q70 -26 160 -4 Q184 0 160 8 L-40 14 L-150 6 Z" fill="var(--ink)"/><path d="M-150 -2 L-165 -52 L-118 -46 L-96 -6 Z" fill="var(--ink)"/><ellipse cx="10" cy="18" rx="60" ry="8" fill="var(--ink)" opacity=".7"/><rect x="-170" y="-4" width="48" height="6" fill="var(--mute)"/><g transform="translate(-170 -1) rotate('+(-el)+')"><rect x="-44" y="-3" width="44" height="6" fill="var(--acc)"/></g><line x1="164" y1="-22" x2="164" y2="30" stroke="var(--mute)" stroke-width="4"/></g>';
      if(Math.abs(s)>.05) o+='<g stroke="var(--acc)" fill="var(--acc)"><line x1="150" y1="'+(140+(s>0?-6:6))+'" x2="150" y2="'+(140+(s>0?-60:60))+'" stroke-width="5"/><polygon points="142,'+(140+(s>0?-60:60))+' 158,'+(140+(s>0?-60:60))+' 150,'+(140+(s>0?-76:76))+'" stroke="none"/></g><text x="90" y="'+(140+(s>0?-60:70))+'" fill="var(--acc)" font-size="13" font-weight="700">le nez '+(s>0?'monte':'descend')+'</text>';
      msg=s>0.05?'Manche en arrière : la gouverne de profondeur se lève, l’air pousse la queue vers le bas, donc le nez monte. Axe : tangage (axe transversal).':s<-0.05?'Manche en avant : la gouverne de profondeur s’abaisse, la queue monte, le nez descend. Axe : tangage.':'Manche au neutre : l’avion garde son assiette.';
    } else if(ax==='roll'){
      const ph=22*s, ai=24*s;
      o+='<g transform="translate(320 140) rotate('+ph+')"><circle cx="0" cy="0" r="26" fill="var(--ink)"/><rect x="-26" y="-28" width="52" height="16" fill="var(--ink)" opacity=".8"/><line x1="-210" y1="0" x2="210" y2="0" stroke="var(--ink)" stroke-width="9"/><g transform="translate(-210 0) rotate('+(ai)+')"><rect x="40" y="-5" width="70" height="8" fill="var(--acc)" transform="translate(-10 0)"/></g><g transform="translate(210 0) rotate('+(ai)+')"><rect x="-110" y="-5" width="70" height="8" fill="var(--acc)" transform="translate(10 0)"/></g></g>';
      const lU=60+60*s, rU=60-60*s;
      o+='<g stroke-width="5"><line x1="110" y1="120" x2="110" y2="'+(120-lU)+'" stroke="var(--ok)"/><line x1="530" y1="120" x2="530" y2="'+(120-rU)+'" stroke="var(--ok)"/></g><text x="110" y="'+(120-lU-8)+'" text-anchor="middle" font-size="12" fill="var(--ok)" font-weight="700">portance gauche</text><text x="530" y="'+(120-rU-8)+'" text-anchor="middle" font-size="12" fill="var(--ok)" font-weight="700">portance droite</text><text x="320" y="262" text-anchor="middle" font-size="13" fill="var(--mute)">Vue de l’arrière de l’avion</text>';
      msg=s>0.05?'Manche à droite : l’aileron droit monte (moins de portance), l’aileron gauche descend (plus de portance). L’avion s’incline à droite. Axe : roulis (axe longitudinal).':s<-0.05?'Manche à gauche : l’aileron gauche monte, le droit descend, l’avion s’incline à gauche. Axe : roulis.':'Manche au neutre : les ailes restent horizontales.';
    } else {
      const ps=18*s, ru=24*s;
      o+='<g transform="translate(320 140) rotate('+ps+')"><path d="M0 -120 Q12 -100 10 -60 L8 80 L-8 80 L-10 -60 Q-12 -100 0 -120 Z" fill="var(--ink)"/><path d="M-170 -20 L-10 -30 L-10 4 L-170 -2 Z" fill="var(--ink)" opacity=".85"/><path d="M170 -20 L10 -30 L10 4 L170 -2 Z" fill="var(--ink)" opacity=".85"/><path d="M-50 74 L-8 66 L-8 80 L-50 82 Z" fill="var(--ink)"/><path d="M50 74 L8 66 L8 80 L50 82 Z" fill="var(--ink)"/><g transform="translate(0 80) rotate('+(-ru)+')"><rect x="-3" y="0" width="6" height="34" fill="var(--acc)"/></g></g>';
      msg=s>0.05?'Palonnier à droite : la gouverne de direction se braque à droite, l’air pousse la queue vers la gauche, donc le nez part à droite. Axe : lacet (axe vertical).':s<-0.05?'Palonnier à gauche : le nez part à gauche. Axe : lacet.':'Palonnier au neutre : l’avion garde son cap.';
      o+='<text x="320" y="270" text-anchor="middle" font-size="13" fill="var(--mute)">Vue de dessus</text>';
    }
    sv.innerHTML=o; t.textContent=msg; t.className='verdict'+(Math.abs(s)>.05?' ok':'');
  }
  x.segBind('ax',v=>{ ax=v; x.setv('s',0); draw(); });
  x.bind(draw);
}};

/* ---------- 2.5 Virage et facteur de charge ---------- */
S.turn={title:'Virage et facteur de charge', th:'t2', ch:'2-5',
desc:'Incline l’avion en virage en palier : la portance doit augmenter, le facteur de charge aussi.',
try:['Passe à 60° d’inclinaison : le facteur de charge vaut 2 et la vitesse de décrochage est multipliée par 1,4.','Observe le rayon : à vitesse égale, plus on incline, plus le virage est serré.','Dépasse 70° : le facteur de charge devient dangereux.'],
mount(root,x){
  root.innerHTML=x.r('p','Inclinaison',0,75,1,30,'°')+x.r('v','Vitesse propre',60,160,5,100,' kt')+
  '<svg viewBox="0 0 640 280" id="'+x.uid+'s" role="img" aria-label="Avion vu de derrière en virage avec les forces"></svg><div class="readout"><div><small>Facteur de charge</small><b id="'+x.uid+'n"></b></div><div><small>Décrochage (55 kt en palier)</small><b id="'+x.uid+'vs"></b></div><div><small>Rayon</small><b id="'+x.uid+'r"></b></div><div><small>Taux de virage</small><b id="'+x.uid+'tx"></b></div></div><div class="verdict" id="'+x.uid+'t"></div>';
  const sv=x.q('#'+x.uid+'s');
  function draw(){
    const p=x.v('p'), V=x.v('v'), n=1/Math.cos(rad(p)), vs=55*Math.sqrt(n), ms=V*0.5144, R=p?ms*ms/(9.81*Math.tan(rad(p))):Infinity, tx=p?(9.81*Math.tan(rad(p))/ms)*180/Math.PI:0;
    const sc=44, L=sc*n, cx=320, cy=150;
    let o='<rect width="640" height="280" fill="var(--sky)" opacity=".4"/><g transform="translate('+cx+' '+cy+') rotate('+p+')"><circle r="18" fill="var(--ink)"/><line x1="-170" y1="0" x2="170" y2="0" stroke="var(--ink)" stroke-width="8"/></g>';
    const ex=cx+L*Math.sin(rad(p))*(-1)*(-1), ey=cy-L*Math.cos(rad(p));
    o+='<line x1="'+cx+'" y1="'+cy+'" x2="'+cx+'" y2="'+(cy+sc)+'" stroke="var(--ink)" stroke-width="5"/><polygon points="'+(cx-8)+','+(cy+sc)+' '+(cx+8)+','+(cy+sc)+' '+cx+','+(cy+sc+14)+'" fill="var(--ink)"/><text x="'+(cx+12)+'" y="'+(cy+sc+10)+'" font-size="13" font-weight="700">Poids</text>';
    o+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+L*Math.sin(rad(p)))+'" y2="'+(cy-L*Math.cos(rad(p)))+'" stroke="var(--ok)" stroke-width="5"/><text x="'+(cx+L*Math.sin(rad(p))+10)+'" y="'+(cy-L*Math.cos(rad(p)))+'" font-size="13" font-weight="700" fill="var(--ok)">Portance</text>';
    o+='<line x1="'+cx+'" y1="'+cy+'" x2="'+cx+'" y2="'+(cy-sc)+'" stroke="var(--c1)" stroke-width="3" stroke-dasharray="5 4"/><text x="'+(cx-8)+'" y="'+(cy-sc/2)+'" text-anchor="end" font-size="12" fill="var(--c1)">composante verticale = poids</text>';
    if(p>1) o+='<line x1="'+cx+'" y1="'+(cy-sc)+'" x2="'+(cx+L*Math.sin(rad(p)))+'" y2="'+(cy-sc)+'" stroke="var(--acc)" stroke-width="3" stroke-dasharray="5 4"/><text x="'+(cx+L*Math.sin(rad(p))/2)+'" y="'+(cy-sc-8)+'" text-anchor="middle" font-size="12" fill="var(--acc)">composante horizontale : elle courbe la trajectoire</text>';
    sv.innerHTML=o;
    x.q('#'+x.uid+'n').textContent=f1(n,2)+' g'; x.q('#'+x.uid+'vs').textContent=Math.round(vs)+' kt'; x.q('#'+x.uid+'r').textContent=p?Math.round(R)+' m':'—'; x.q('#'+x.uid+'tx').textContent=p?f1(tx)+' °/s':'—';
    const t=x.q('#'+x.uid+'t');
    if(V<vs){ t.className='verdict bad'; t.textContent='Danger : à '+V+' kt, ta vitesse est inférieure à la vitesse de décrochage dans ce virage ('+Math.round(vs)+' kt). L’avion décrocherait.'; }
    else if(p>=60){ t.className='verdict warn'; t.textContent='Virage très incliné : facteur de charge de '+f1(n,1)+' g. Tu et la structure supportez un poids apparent de '+f1(n,1)+' fois le poids normal.'; }
    else { t.className='verdict ok'; t.textContent='Pour rester en palier, la portance doit valoir '+f1(n,2)+' fois le poids. Plus on incline, plus il faut incidence ou puissance.'; }
  }
  x.bind(draw);
}};
})();
