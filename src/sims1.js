(function(){
const S = window.BIA.sims;
const f1 = (x,d)=>x.toFixed(d===undefined?1:d).replace('.',',');
const NS='http://www.w3.org/2000/svg';

/* ---------- 1.1 Atmosphère standard ---------- */
function isa(h){
  let T,p;
  if(h<=11000){ T=288.15-0.0065*h; p=1013.25*Math.pow(T/288.15,5.2559); }
  else { T=216.65; p=226.32*Math.exp(-(h-11000)/6341.6); }
  return {T:T-273.15, p};
}
S.isa={title:'Atmosphère standard', th:'t1', ch:'1-1',
desc:'Monte en altitude : lis la température, la pression et la densité de l’air.',
try:['Place-toi à 5 500 m : la pression vaut à peu près la moitié de celle du sol.','Dépasse 11 000 m : la température cesse de baisser (tropopause).','Passe l’écart à +20 °C : l’air devient moins dense, donc les performances de l’avion baissent.'],
mount(root,x){
  root.innerHTML=x.r('alt','Altitude',0,20000,100,0,' m')+x.r('dev','Écart par rapport à la température standard',-30,30,1,0,' °C')+
  '<svg viewBox="0 0 640 300" role="img" aria-label="Profil de température de l’atmosphère standard"><g id="'+x.uid+'g"></g></svg><div class="readout"><div><small>Altitude</small><b id="'+x.uid+'a"></b></div><div><small>Température</small><b id="'+x.uid+'t"></b></div><div><small>Pression</small><b id="'+x.uid+'p"></b></div><div><small>Masse volumique</small><b id="'+x.uid+'r"></b></div></div><div class="verdict" id="'+x.uid+'v"></div>';
  const g=x.q('#'+x.uid+'g');
  const Y=h=>280-h/20000*260, X=T=>340+(T+70)/100*270;
  function draw(){
    const h=x.v('alt'), dev=x.v('dev'); const s=isa(h), T=s.T+dev, rho=s.p*100/(287.05*(T+273.15));
    let o='';
    o+='<rect x="40" y="'+Y(11000)+'" width="260" height="'+(280-Y(11000))+'" fill="var(--c1)" opacity=".18"/><rect x="40" y="20" width="260" height="'+(Y(11000)-20)+'" fill="var(--c4)" opacity=".14"/>';
    o+='<text x="50" y="'+(Y(5500)+4)+'" fill="var(--ink)" font-size="15" font-weight="600">TROPOSPHÈRE</text><text x="50" y="'+(Y(5500)+22)+'" fill="var(--mute)" font-size="12">météo, nuages, T qui baisse</text>';
    o+='<text x="50" y="'+(Y(15500)+4)+'" fill="var(--ink)" font-size="15" font-weight="600">STRATOSPHÈRE</text><text x="50" y="'+(Y(15500)+22)+'" fill="var(--mute)" font-size="12">couche d’ozone, T stable puis ↑</text>';
    o+='<line x1="40" x2="300" y1="'+Y(11000)+'" y2="'+Y(11000)+'" stroke="var(--ink)" stroke-dasharray="5 4"/><text x="302" y="'+(Y(11000)-5)+'" fill="var(--ink)" font-size="12" text-anchor="start">tropopause 11 km</text>';
    for(let k=0;k<=20;k+=5){ o+='<text x="34" y="'+(Y(k*1000)+4)+'" text-anchor="end" fill="var(--mute)" font-size="12">'+k+' km</text><line x1="40" x2="300" y1="'+Y(k*1000)+'" y2="'+Y(k*1000)+'" stroke="var(--line)" stroke-width=".6"/>'; }
    [[4808,'Mont Blanc'],[8849,'Everest'],[11000,'Avion de ligne'],[18000,'Concorde']].forEach(a=>{ if(a[0]!==11000) o+='<text x="296" y="'+(Y(a[0])+4)+'" text-anchor="end" fill="var(--mute)" font-size="11">'+a[1]+'</text>'; });
    for(let t=-60;t<=20;t+=20){ o+='<line x1="'+X(t)+'" x2="'+X(t)+'" y1="20" y2="280" stroke="var(--line)" stroke-width=".6"/><text x="'+X(t)+'" y="296" text-anchor="middle" fill="var(--mute)" font-size="11">'+t+' °C</text>'; }
    let pts=''; for(let a=0;a<=20000;a+=500){ pts+=X(isa(a).T+dev)+','+Y(a)+' '; }
    o+='<polyline points="'+pts+'" fill="none" stroke="var(--c1)" stroke-width="3"/>';
    o+='<line x1="40" x2="620" y1="'+Y(h)+'" y2="'+Y(h)+'" stroke="var(--acc)" stroke-width="2"/><circle cx="'+X(T)+'" cy="'+Y(h)+'" r="7" fill="var(--acc)"/>';
    g.innerHTML=o;
    x.q('#'+x.uid+'a').textContent=Math.round(h)+' m ('+Math.round(h/0.3048)+' ft)';
    x.q('#'+x.uid+'t').textContent=f1(T)+' °C'; x.q('#'+x.uid+'p').textContent=Math.round(s.p)+' hPa'; x.q('#'+x.uid+'r').textContent=f1(rho,3)+' kg/m³';
    const v=x.q('#'+x.uid+'v'); const pc=Math.round(rho/1.225*100);
    v.className='verdict'+(dev>10?' warn':'');
    v.textContent=(h<=11000?'Troposphère : la température baisse d’environ 6,5 °C par km. ':'Stratosphère basse : la température reste constante (−56,5 °C en standard). ')+'Densité : '+pc+' % de celle d’un jour standard au niveau de la mer.'+(dev>10?' Il fait chaud : l’air est moins dense, la portance et la puissance moteur diminuent.':dev<-10?' Il fait froid : l’air est plus dense, les performances sont meilleures.':'');
  }
  x.bind(draw);
}};

/* ---------- 1.2 Vent et isobares ---------- */
S.wind={title:'Pression et vent', th:'t1', ch:'1-2',
desc:'Clique sur la carte : le vent tourne autour des hautes et des basses pressions.',
try:['Choisis « Dépression » et clique à gauche, puis à droite du centre. Vérifie la règle de Buys-Ballot.','Resserre les isobares : le vent se renforce.','Passe en anticyclone : le sens de rotation s’inverse.'],
mount(root,x){
  root.innerHTML=x.seg('type',[['L','Dépression (D)'],['H','Anticyclone (A)']],'L')+x.r('sp','Écart entre les isobares',1,3,0.1,2,'')+
  '<svg viewBox="0 0 400 400" id="'+x.uid+'m" role="img" aria-label="Carte d’isobares cliquable" style="max-width:480px;margin:0 auto;cursor:crosshair"></svg><div class="verdict" id="'+x.uid+'v">Clique sur la carte pour placer une station météo.</div>';
  let type='L', pin=null; const svg=x.q('#'+x.uid+'m');
  function wind(px,py){ const dx=px-200, dy=py-200, r=Math.hypot(dx,dy)||1, rx=dx/r, ry=dy/r;
    const tcw=[-ry,rx], tccw=[ry,-rx], ang=Math.PI/6; let v;
    if(type==='L') v=[Math.cos(ang)*tccw[0]-Math.sin(ang)*rx, Math.cos(ang)*tccw[1]-Math.sin(ang)*ry];
    else v=[Math.cos(ang)*tcw[0]+Math.sin(ang)*rx, Math.cos(ang)*tcw[1]+Math.sin(ang)*ry];
    return v; }
  function draw(){
    const sp=x.v('sp'); let o='<rect width="400" height="400" fill="var(--soft)"/>';
    for(let k=1;k<=5;k++){ const r=k*30*sp/2; if(r<190) o+='<circle cx="200" cy="200" r="'+r+'" fill="none" stroke="var(--c1)" stroke-width="2" opacity="'+(1-k*.12)+'"/><text x="'+(200+r+3)+'" y="196" fill="var(--c1)" font-size="10">'+(type==='L'?1000+k*4:1036-k*4)+'</text>'; }
    o+='<text x="200" y="212" text-anchor="middle" font-size="46" font-weight="700" fill="'+(type==='L'?'var(--c1)':'var(--bad)')+'" font-family="var(--disp)">'+(type==='L'?'D':'A')+'</text>';
    for(let a=0;a<360;a+=30) for(let rr of [70,125,175]){ const px=200+rr*Math.cos(a*Math.PI/180), py=200+rr*Math.sin(a*Math.PI/180), v=wind(px,py); const L=14+10/sp; o+='<line x1="'+(px-v[0]*L/2)+'" y1="'+(py-v[1]*L/2)+'" x2="'+(px+v[0]*L/2)+'" y2="'+(py+v[1]*L/2)+'" stroke="var(--mute)" stroke-width="2"/><circle cx="'+(px+v[0]*L/2)+'" cy="'+(py+v[1]*L/2)+'" r="3" fill="var(--mute)"/>'; }
    if(pin){ const v=wind(pin[0],pin[1]); const L=46; o+='<circle cx="'+pin[0]+'" cy="'+pin[1]+'" r="6" fill="var(--acc)"/><line x1="'+pin[0]+'" y1="'+pin[1]+'" x2="'+(pin[0]+v[0]*L)+'" y2="'+(pin[1]+v[1]*L)+'" stroke="var(--acc)" stroke-width="4"/><circle cx="'+(pin[0]+v[0]*L)+'" cy="'+(pin[1]+v[1]*L)+'" r="5" fill="var(--acc)"/>'; }
    o+='<g font-size="12" fill="var(--ink)" font-weight="600"><text x="200" y="14" text-anchor="middle">N</text><text x="390" y="204" text-anchor="end">E</text><text x="200" y="395" text-anchor="middle">S</text><text x="10" y="204">O</text></g>';
    svg.innerHTML=o;
    const vv=x.q('#'+x.uid+'v');
    if(pin){ const v=wind(pin[0],pin[1]); let brg=Math.atan2(v[0],-v[1])*180/Math.PI; brg=(brg+360)%360; const from=Math.round(((brg+180)%360)/10)*10; const dist=Math.hypot(pin[0]-200,pin[1]-200); const kt=Math.round((8+ (160/Math.max(dist,40))*3 )*(2/sp)*0.8*(type==='L'?1.1:0.9));
      vv.textContent='Vent de '+String(from%360===0?360:from).padStart(3,'0')+'° (il vient de ce secteur) · environ '+kt+' kt. '+(type==='L'?'Autour d’une dépression, l’air tourne dans le sens inverse des aiguilles d’une montre et converge vers le centre.':'Autour d’un anticyclone, l’air tourne dans le sens des aiguilles d’une montre et s’écarte du centre.'); vv.className='verdict ok'; }
  }
  svg.addEventListener('click',e=>{ const r=svg.getBoundingClientRect(); pin=[(e.clientX-r.left)/r.width*400,(e.clientY-r.top)/r.height*400]; draw(); });
  x.segBind('type',v=>{ type=v; draw(); });
  x.bind(draw);
}};

/* ---------- 1.3 Bulle d’air, stabilité, base des nuages ---------- */
S.parcel={title:'Bulle d’air et nuages', th:'t1', ch:'1-3',
desc:'Une bulle d’air chaud monte : s’arrête-t-elle, forme-t-elle un nuage, un orage ?',
try:['Mets un écart T − Td de 2 °C : la base des nuages est très basse (≈ 250 m).','Passe le gradient de l’air à 9–10 °C/km : l’atmosphère devient instable, les nuages grandissent.','Passe-le à 3 °C/km : l’air est stable, la bulle s’arrête vite.'],
mount(root,x){
  root.innerHTML=x.r('T','Température au sol (T)',5,38,1,24,' °C')+x.r('Td','Point de rosée (Td)',-5,30,1,12,' °C')+x.r('g','Gradient de l’air environnant',3,10,0.1,6.5,' °C/km')+x.r('ex','Excès de chaleur de la bulle au sol',0,3,0.1,1.2,' °C')+
  '<svg viewBox="0 0 640 310" role="img" aria-label="Courbe de la bulle d’air et de l’air environnant"><g id="'+x.uid+'g"></g></svg><div class="readout"><div><small>Base des nuages</small><b id="'+x.uid+'b"></b></div><div><small>Sommet de la bulle</small><b id="'+x.uid+'s"></b></div></div><div class="verdict" id="'+x.uid+'v"></div>';
  const g=x.q('#'+x.uid+'g'); const X=T=>60+(T+45)/90*560, Y=z=>280-z/10000*260;
  function draw(){
    const T=x.v('T'), Td=Math.min(x.v('Td'),T), gam=x.v('g'), ex=x.v('ex');
    const spread=T-Td, zc=Math.round(125*spread/10)*10;
    const Tp=z=> z<=zc? T+ex-9.8*z/1000 : T+ex-9.8*zc/1000-5*(z-zc)/1000, Te=z=>T-gam*z/1000;
    let zeq=0; if(ex>0){ for(let z=50;z<=10000;z+=50){ if(Tp(z)<=Te(z)){ zeq=z; break;} zeq=z; } }
    let o='';
    for(let k=0;k<=10;k+=2) o+='<line x1="60" x2="620" y1="'+Y(k*1000)+'" y2="'+Y(k*1000)+'" stroke="var(--line)" stroke-width=".6"/><text x="54" y="'+(Y(k*1000)+4)+'" text-anchor="end" fill="var(--mute)" font-size="11">'+k+' km</text>';
    for(let t=-40;t<=40;t+=20) o+='<text x="'+X(t)+'" y="300" text-anchor="middle" fill="var(--mute)" font-size="11">'+t+' °C</text>';
    if(zeq>zc) o+='<rect x="'+(X(Tp(zeq))-6)+'" y="'+Y(zeq)+'" width="'+(X(Tp(zc))-X(Tp(zeq))+60)+'" height="'+(Y(zc)-Y(zeq))+'" rx="14" fill="var(--ink)" opacity=".13"/>';
    o+='<line x1="60" x2="620" y1="'+Y(zc)+'" y2="'+Y(zc)+'" stroke="var(--mute)" stroke-dasharray="4 4"/><text x="618" y="'+(Y(zc)-4)+'" text-anchor="end" fill="var(--mute)" font-size="11">base des nuages '+zc+' m</text>';
    let pe='',pp=''; for(let z=0;z<=Math.min(10000,Math.max(zeq,zc)+800);z+=100){ pe+=X(Te(z))+','+Y(z)+' '; }
    for(let z=0;z<=Math.max(zeq,100);z+=50){ pp+=X(Tp(z))+','+Y(z)+' '; }
    let pe2=''; for(let z=0;z<=10000;z+=200) pe2+=X(Te(z))+','+Y(z)+' ';
    o+='<polyline points="'+pe2+'" fill="none" stroke="var(--c1)" stroke-width="3"/><polyline points="'+pp+'" fill="none" stroke="var(--acc)" stroke-width="3" stroke-dasharray="1 0"/>';
    if(zeq>0) o+='<circle cx="'+X(Tp(zeq))+'" cy="'+Y(zeq)+'" r="6" fill="var(--acc)"/>';
    o+='<text x="'+X(Te(8000))+'" y="'+(Y(8000)-8)+'" fill="var(--c1)" font-size="12" font-weight="600">air environnant</text><text x="68" y="18" fill="var(--acc)" font-size="12" font-weight="600">bulle d’air qui monte</text>';
    g.innerHTML=o;
    x.q('#'+x.uid+'b').textContent=zc+' m ('+Math.round(zc/0.3048)+' ft)';
    x.q('#'+x.uid+'s').textContent=ex>0?Math.round(zeq/10)*10+' m':'—';
    const v=x.q('#'+x.uid+'v'); let msg,cls='';
    if(ex<=0||zeq<=100){ msg='La bulle ne démarre pas, ou s’arrête presque tout de suite : atmosphère stable, pas de convection.'; cls='ok'; }
    else if(zeq<=zc){ msg='La bulle s’arrête avant de condenser : thermiques « secs », ciel bleu, pas de nuage. Les ascendances s’arrêtent vers '+Math.round(zeq/10)*10+' m.'; }
    else if(zeq-zc<1500){ msg='Cumulus de beau temps : base vers '+zc+' m, sommet vers '+Math.round(zeq/10)*10+' m. Un peu de turbulence sous le nuage.'; cls='ok'; }
    else if(zeq-zc<4000){ msg='Cumulus congestus bourgeonnants : risque d’averses et de fortes ascendances. Reste prudent.'; cls='warn'; }
    else { msg='Cumulonimbus : orage, grêle, turbulence extrême et givrage. Il faut les éviter largement.'; cls='bad'; }
    v.className='verdict '+cls; v.textContent=msg;
  }
  x.bind(draw);
}};

/* ---------- 1.4 Passage d’une perturbation ---------- */
S.front={title:'Passage d’une perturbation', th:'t1', ch:'1-4',
desc:'Une perturbation (front chaud, secteur chaud, front froid) passe au-dessus de toi. Suis le ciel, la pression et le vent.',
try:['Avance lentement : repère l’ordre des nuages avant le front chaud (Ci, Cs, As, Ns).','Observe le vent : il tourne à droite à chaque front.','Compare la pente des deux fronts : le front froid est bien plus raide, donc plus violent.'],
mount(root,x){
  const zones=[
   [850,'Beau temps encore, premiers cirrus (Ci) très hauts.','Baisse lente','Sud-est faible','Stable, fraîche','Excellente','Le beau temps va se dégrader d’ici quelques heures : prévois ton retour.'],
   [700,'Voile de cirrostratus (Cs), halo autour du soleil.','Baisse nette','Sud-est qui se renforce','Stable','Bonne, soleil voilé','Le plafond va baisser. Les nuages de l’étage moyen arrivent.'],
   [520,'Le ciel se couvre : altostratus (As) puis nimbostratus (Ns), pluie qui débute.','Baisse rapide','Sud-est assez fort','Fraîche','Mauvaise sous la pluie','Plafond bas et pluie continue : le vol à vue devient difficile, voire impossible.'],
   [440,'Passage du front chaud : Ns épais, pluie continue.','La baisse s’arrête','Tourne à droite (sud-ouest)','Monte nettement','Très réduite','Pire moment pour voler : plafond au plus bas, risque de givrage en altitude.'],
   [220,'Secteur chaud : ciel gris bas, stratus, stratocumulus, bruine possible.','Stable et basse','Sud-ouest régulier','Douce','Médiocre (brume)','Plafond bas, visibilité réduite : vol à vue déconseillé.'],
   [150,'Passage du front froid : cumulonimbus, averses, orage, grains.','Remonte brutalement','Tourne à droite (nord-ouest), rafales','Chute rapide','Nulle sous l’averse','Très dangereux : turbulence forte, grêle, cisaillement, givrage. À éviter.'],
   [-1,'Ciel de traîne : éclaircies, cumulus, averses isolées.','Remonte puis se stabilise','Nord-ouest rafaleux','Fraîche','Très bonne entre les averses','Bonne visibilité mais turbulence et rafales : attention au vent traversier.']
  ];
  const P=[[1000,1012],[850,1011],[520,1002],[220,1000],[150,1006],[0,1011]], Tm=[[1000,6],[520,7],[500,13],[220,13.5],[190,7],[0,5]];
  const interp=(a,d)=>{ for(let i=0;i<a.length-1;i++){ if(d<=a[i][0]&&d>=a[i+1][0]){ const t=(d-a[i+1][0])/(a[i][0]-a[i+1][0]); return a[i+1][1]+t*(a[i][1]-a[i+1][1]); } } return a[a.length-1][1]; };
  root.innerHTML='<svg viewBox="0 0 1000 340" role="img" aria-label="Coupe verticale d’une perturbation" id="'+x.uid+'s"></svg>'+x.r('t','Temps qui passe',0,100,0.5,0,' %')+'<div class="row"><button type="button" class="btn sec sm" id="'+x.uid+'p">▶ Lecture</button><span class="small mute">Le système avance de la gauche vers la droite.</span></div><svg viewBox="0 0 640 130" id="'+x.uid+'c" role="img" aria-label="Pression et température au cours du temps"></svg><div class="tw"><table class="tbl" id="'+x.uid+'tb"></table></div><div class="verdict warn" id="'+x.uid+'v"></div>';
  const sc=x.q('#'+x.uid+'s'), ch=x.q('#'+x.uid+'c'), tb=x.q('#'+x.uid+'tb'), vd=x.q('#'+x.uid+'v');
  let base='<rect width="1000" height="340" fill="var(--soft)"/><polygon points="0,300 1000,300 1000,0 0,0" fill="var(--acc)" opacity=".08"/>'+
  '<polygon points="520,300 1000,300 1000,160" fill="var(--c1)" opacity=".28"/><polygon points="0,300 230,300 0,150" fill="var(--c1)" opacity=".28"/>'+
  '<line x1="520" y1="300" x2="1000" y2="160" stroke="var(--bad)" stroke-width="3"/><line x1="230" y1="300" x2="0" y2="150" stroke="var(--c1)" stroke-width="3"/>'+
  '<rect y="300" width="1000" height="40" fill="var(--ground)"/>'+
  '<g stroke="var(--mute)" fill="none" stroke-width="3" opacity=".75"><path d="M880 55 q40 -12 90 4"/><path d="M860 78 q50 -12 110 2"/><path d="M900 98 q40 -10 80 0"/></g>'+
  '<ellipse cx="790" cy="118" rx="95" ry="9" fill="var(--ink)" opacity=".18"/><ellipse cx="690" cy="160" rx="100" ry="17" fill="var(--ink)" opacity=".25"/>'+
  '<polygon points="520,296 560,235 700,205 760,215 700,296" fill="var(--ink)" opacity=".4"/>'+
  '<g stroke="var(--c1)" stroke-width="2" opacity=".7"><line x1="540" y1="250" x2="530" y2="292"/><line x1="580" y1="240" x2="570" y2="292"/><line x1="620" y1="235" x2="610" y2="292"/><line x1="660" y1="232" x2="650" y2="292"/></g>'+
  '<ellipse cx="400" cy="262" rx="110" ry="14" fill="var(--ink)" opacity=".3"/><ellipse cx="320" cy="248" rx="70" ry="11" fill="var(--ink)" opacity=".22"/>'+
  '<g fill="var(--ink)" opacity=".34"><circle cx="190" cy="220" r="42"/><circle cx="215" cy="160" r="48"/><circle cx="195" cy="100" r="42"/><circle cx="225" cy="50" r="38"/><ellipse cx="290" cy="38" rx="95" ry="14"/></g>'+
  '<g stroke="var(--c1)" stroke-width="2" opacity=".7"><line x1="165" y1="262" x2="152" y2="298"/><line x1="195" y1="262" x2="182" y2="298"/><line x1="225" y1="262" x2="212" y2="298"/></g>'+
  '<g fill="var(--ink)" opacity=".24"><circle cx="40" cy="280" r="14"/><circle cx="70" cy="274" r="18"/><circle cx="100" cy="282" r="13"/></g>'+
  '<text x="760" y="262" fill="var(--c1)" font-size="19" font-weight="700">air froid</text><text x="40" y="190" fill="var(--c1)" font-size="19" font-weight="700">air froid</text><text x="380" y="130" fill="var(--acc)" font-size="19" font-weight="700">air chaud</text>'+
  '<text x="598" y="330" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">FRONT CHAUD</text><text x="236" y="330" fill="#fff" font-size="15" font-weight="700" text-anchor="middle">FRONT FROID</text>';
  function chart(d){
    const PX=dd=>20+(1000-dd)/1000*280, TX=dd=>340+(1000-dd)/1000*280; let o='<text x="20" y="14" font-size="12" fill="var(--mute)" font-weight="600">PRESSION (hPa)</text><text x="340" y="14" font-size="12" fill="var(--mute)" font-weight="600">TEMPÉRATURE (°C)</text>';
    let a='',b=''; for(let dd=1000;dd>=0;dd-=10){ a+=PX(dd)+','+(110-(interp(P,dd)-998)/16*85)+' '; b+=TX(dd)+','+(110-(interp(Tm,dd)-3)/13*85)+' '; }
    o+='<polyline points="'+a+'" fill="none" stroke="var(--c1)" stroke-width="3"/><polyline points="'+b+'" fill="none" stroke="var(--acc)" stroke-width="3"/>';
    o+='<line x1="'+PX(d)+'" x2="'+PX(d)+'" y1="22" y2="118" stroke="var(--ink)" stroke-dasharray="3 3"/><line x1="'+TX(d)+'" x2="'+TX(d)+'" y1="22" y2="118" stroke="var(--ink)" stroke-dasharray="3 3"/>';
    ch.innerHTML=o;
  }
  function draw(){
    const t=x.v('t'), d=1000-10*t;
    sc.innerHTML=base+'<line x1="'+d+'" x2="'+d+'" y1="10" y2="300" stroke="var(--ink)" stroke-width="2" stroke-dasharray="6 5"/><polygon points="'+(d-14)+',300 '+(d+14)+',300 '+d+',274" fill="var(--ink)"/><text x="'+Math.min(Math.max(d,50),950)+'" y="22" text-anchor="middle" font-size="16" fill="var(--ink)" font-weight="700">TOI</text>';
    chart(d);
    let z=zones[zones.length-1]; for(let i=0;i<zones.length;i++){ if(d>zones[i][0]){ z=zones[i]; break; } }
    tb.innerHTML='<tr><th>Ciel</th><td>'+z[1]+'</td></tr><tr><th>Pression</th><td>'+z[2]+'</td></tr><tr><th>Vent</th><td>'+z[3]+'</td></tr><tr><th>Température</th><td>'+z[4]+'</td></tr><tr><th>Visibilité</th><td>'+z[5]+'</td></tr>';
    vd.textContent='Pour le pilote : '+z[6];
  }
  let raf=null, playing=false; const btn=x.q('#'+x.uid+'p');
  function step(){ if(!playing) return; let v=x.v('t')+0.12; if(v>100) v=0; x.setv('t',v); draw(); raf=requestAnimationFrame(step); }
  btn.addEventListener('click',()=>{ playing=!playing; btn.textContent=playing?'❚❚ Pause':'▶ Lecture'; if(playing) step(); else cancelAnimationFrame(raf); });
  x.onCleanup(()=>{ playing=false; cancelAnimationFrame(raf); });
  x.bind(draw);
}};

/* ---------- 1.6 Décodeur METAR ---------- */
const WX={'-':'faible ','+':'fort ','VC':'à proximité : ','MI':'mince ','BC':'en bancs ','PR':'partiel ','DR':'chasse-bas ','BL':'chasse-haut ','SH':'averse de ','TS':'orage avec ','FZ':'se congelant ','DZ':'bruine','RA':'pluie','SN':'neige','SG':'neige en grains','PL':'granules de glace','GR':'grêle','GS':'grésil','UP':'précipitation inconnue','BR':'brume (visibilité 1 à 5 km)','FG':'brouillard (visibilité < 1 km)','FU':'fumée','VA':'cendres volcaniques','DU':'poussière','SA':'sable','HZ':'brume sèche','SQ':'grain','FC':'tornade ou trombe','SS':'tempête de sable','DS':'tempête de poussière','PO':'tourbillons de poussière'};
function decodeMetar(m){
  const toks=m.trim().toUpperCase().split(/\s+/).filter(Boolean), out=[]; let st=false, trend=false;
  toks.forEach(t=>{ let d=null, mm;
    if(t==='METAR'||t==='SPECI') d=[t==='METAR'?'Type : observation régulière (toutes les 30 min ou 1 h).':'Type : observation spéciale, faite quand le temps change vite.'];
    else if(!st && /^[A-Z]{4}$/.test(t)){ st=true; d=['Aérodrome (code OACI à 4 lettres). « LF » = France.']; }
    else if((mm=t.match(/^(\d{2})(\d{2})(\d{2})Z$/))) d=['Jour '+mm[1]+' du mois, à '+mm[2]+'h'+mm[3]+' UTC (heure universelle).'];
    else if(t==='AUTO'||t==='COR'||t==='NIL') d=[t==='AUTO'?'Observation automatique, sans observateur.':t==='COR'?'Message corrigé.':'Pas de message.'];
    else if((mm=t.match(/^(\d{3}|VRB)(\d{2,3})(G(\d{2,3}))?KT$/))) d=[(mm[1]==='VRB'?'Vent de direction variable':'Vent venant de '+mm[1]+'° (vraie)')+', '+parseInt(mm[2],10)+' nœuds'+(mm[4]?', avec rafales à '+parseInt(mm[4],10)+' nœuds':'')+'.'];
    else if(/^\d{3}V\d{3}$/.test(t)) d=['Direction du vent variable entre '+t.slice(0,3)+'° et '+t.slice(4)+'°.'];
    else if(t==='CAVOK') d=['CAVOK : visibilité ≥ 10 km, aucun nuage sous 5 000 ft ni cumulonimbus, aucun phénomène significatif.'];
    else if(/^\d{4}$/.test(t)&&!trend||/^\d{4}$/.test(t)) d=[t==='9999'?'Visibilité de 10 km ou plus.':'Visibilité de '+(parseInt(t,10)>=1000?(parseInt(t,10)/1000).toFixed(1).replace('.',',')+' km':parseInt(t,10)+' m')+'.'];
    else if((mm=t.match(/^(FEW|SCT|BKN|OVC)(\d{3})(CB|TCU)?$/))){ const o={FEW:'1 à 2 octas (peu)',SCT:'3 à 4 octas (épars)',BKN:'5 à 7 octas (fragmenté : c’est un plafond)',OVC:'8 octas (couvert : c’est un plafond)'}; d=['Nuages : '+o[mm[1]]+', base à '+(parseInt(mm[2],10)*100)+' ft au-dessus de l’aérodrome'+(mm[3]==='CB'?', cumulonimbus !':mm[3]==='TCU'?', gros cumulus bourgeonnants (TCU).':'.')]; }
    else if(/^(NSC|NCD|SKC)$/.test(t)) d=['Pas de nuage significatif.'];
    else if((mm=t.match(/^VV(\d{3})$/))) d=['Ciel invisible (brouillard) : visibilité verticale '+(parseInt(mm[1],10)*100)+' ft.'];
    else if((mm=t.match(/^(M?\d{2})\/(M?\d{2})$/))){ const c=s=>parseInt(s.replace('M','-'),10); d=['Température '+c(mm[1])+' °C, point de rosée '+c(mm[2])+' °C. Écart T − Td : '+(c(mm[1])-c(mm[2]))+' °C'+(c(mm[1])-c(mm[2])<=3?' (faible : risque de brume, brouillard ou nuages bas).':'.')]; }
    else if((mm=t.match(/^Q(\d{4})$/))) d=['QNH '+parseInt(mm[1],10)+' hPa : calage de l’altimètre pour lire l’altitude.'];
    else if((mm=t.match(/^A(\d{4})$/))) d=['Calage en pouces de mercure : '+(parseInt(mm[1],10)/100).toFixed(2)+' inHg.'];
    else if(t==='NOSIG') d=['Pas de changement significatif prévu dans les 2 heures.'];
    else if(t==='BECMG'){ trend=true; d=['Évolution durable prévue (« becoming »).']; }
    else if(t==='TEMPO'){ trend=true; d=['Variation temporaire prévue.']; }
    else if(/^R\d\d[LRC]?\//.test(t)) d=['Portée visuelle de piste (RVR).'];
    else { const w=t.match(/^(RE)?(\+|-|VC)?((?:MI|BC|PR|DR|BL|SH|TS|FZ)*)((?:DZ|RA|SN|SG|PL|GR|GS|UP|BR|FG|FU|VA|DU|SA|HZ|SQ|FC|SS|DS|PO)+)$/);
      if(w){ let s=''; if(w[1]) s+='Récent : '; if(w[2]) s+=WX[w[2]]; (w[3].match(/../g)||[]).forEach(c=>s+=WX[c]+' '); (w[4].match(/../g)||[]).forEach((c,i)=>s+=(i?' et ':'')+WX[c]); d=['Temps présent : '+s+'.']; } }
    out.push({t, d:d?d[0]:'Groupe non reconnu ici : il peut s’agir d’une information locale.'});
  });
  return out;
}
function vfrJudge(m){
  const toks=m.toUpperCase().split(/\s+/); let vis=9999, ceil=99999, wind=0, cav=false, stop=false;
  toks.forEach(t=>{ let mm; if(t==='BECMG'||t==='TEMPO'||t==='NOSIG') stop=true; if(stop) return; if(t==='CAVOK') cav=true; else if(/^\d{4}$/.test(t)&&t.length===4&&vis===9999) vis=parseInt(t,10);
    if((mm=t.match(/^(BKN|OVC)(\d{3})/))) ceil=Math.min(ceil,parseInt(mm[2],10)*100); if((mm=t.match(/^VV(\d{3})/))) ceil=Math.min(ceil,parseInt(mm[1],10)*100);
    if((mm=t.match(/^(\d{3}|VRB)(\d{2,3})(G(\d{2,3}))?KT$/))) wind=Math.max(wind,parseInt(mm[4]||mm[2],10)); });
  if(cav){ vis=9999; ceil=99999; }
  const tsb=/TS|FG|\+RA/.test(m);
  if(vis<1500||ceil<500) return ['bad','Très mauvaises conditions : le vol à vue est impossible ou très dangereux.'];
  if(vis>=5000&&ceil>=1500&&!tsb&&wind<=25) return ['ok','Conditions plutôt favorables au vol à vue (VMC). À confirmer avec le reste de ta préparation.'];
  return ['warn','Conditions limites : visibilité, plafond, vent ou orage demandent beaucoup de prudence.'];
}
S.metar={title:'Décodeur de METAR', th:'t1', ch:'1-6',
desc:'Touche chaque groupe du message pour le décoder. Un METAR se lit toujours dans le même ordre.',
try:['Charge le message « brouillard » : repère VV002 et l’écart T − Td.','Charge celui avec un vent à 38 nœuds : le jugement VFR passe en alerte.','Compose ton propre METAR dans la zone de texte.'],
mount(root,x){
  const ex=['METAR LFPG 061830Z 24012G25KT 9999 SCT030 BKN080 12/08 Q1015 NOSIG','METAR LFBO 060900Z 33005KT CAVOK 09/03 Q1028 NOSIG','METAR LFLL 051200Z VRB02KT 0800 FG VV002 03/03 Q1021 BECMG 3000 BR','METAR LFML 071500Z 29025G38KT 9999 FEW020 SCT040TCU 17/07 Q1009 TEMPO 27030G45KT','METAR LFRS 060730Z 21015KT 4000 -RA BKN010 OVC030 11/10 Q0998 BECMG 8000','METAR LFST 081000Z 18004KT 5000 BR NSC M01/M02 Q1031 NOSIG'];
  root.innerHTML='<label for="'+x.uid+'i" class="small mute">Message METAR</label><input type="text" id="'+x.uid+'i" style="width:100%;font-family:var(--mono)" value="'+ex[0]+'"><div class="row" style="margin:8px 0"><button type="button" class="btn sec sm" id="'+x.uid+'n">Un autre exemple</button></div><div id="'+x.uid+'t"></div><div class="verdict" id="'+x.uid+'d">Touche un groupe pour le lire.</div><div class="verdict" id="'+x.uid+'j" style="margin-top:8px"></div>';
  const inp=x.q('#'+x.uid+'i'), tk=x.q('#'+x.uid+'t'), dd=x.q('#'+x.uid+'d'), jj=x.q('#'+x.uid+'j'); let k=0, parts=[];
  function render(){ parts=decodeMetar(inp.value); tk.innerHTML=parts.map((p,i)=>'<button type="button" class="tok" data-i="'+i+'" aria-pressed="false">'+p.t.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</button>').join(''); const j=vfrJudge(inp.value); jj.className='verdict '+j[0]; jj.textContent='Jugement indicatif : '+j[1]; dd.textContent='Touche un groupe pour le lire.'; }
  tk.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; x.qa('.tok').forEach(t=>t.setAttribute('aria-pressed',t===b)); dd.textContent=parts[+b.dataset.i].d; });
  inp.addEventListener('input',render);
  x.q('#'+x.uid+'n').addEventListener('click',()=>{ k=(k+1)%ex.length; inp.value=ex[k]; render(); });
  render();
}};
})();
