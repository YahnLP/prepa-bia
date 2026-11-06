(function(){
const F=window.BIA.figs;
const S=(w,h,body,label)=>'<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg>';
const T=(x,y,t,c)=>'<text x="'+x+'" y="'+y+'"'+(c?' class="'+c+'"':'')+'>'+t+'</text>';
const A=(x1,y1,x2,y2,c,m)=>'<line class="ln '+(c||'')+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" marker-end="url(#'+(m||'ar')+')"/>';
let seed=5; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
// avion vu de côté (nez vers la droite), centré en 0,0 ; échelle s
const side=(x,y,s,extra)=>'<g transform="translate('+x+' '+y+') scale('+s+')"'+(extra||'')+'><path class="ln fW" d="M-40 -4 L-52 -24 L-44 -24 L-26 -4z"/><path class="ln fW" d="M-48 0 L-62 -2 L-60 4 L-44 4z" opacity=".0"/><path class="ln fW" d="M-48 -3 Q-20 -9 20 -9 Q44 -8 50 0 Q44 8 20 8 Q-20 8 -48 3z"/><path class="ln fM" d="M8 4 L20 18 L26 18 L18 4z" style="fill:var(--surface)"/><path class="ln" d="M24 -6 Q34 -9 38 -3 L24 -3z" style="fill:var(--sky)"/><line class="ln" x1="52" y1="-14" x2="52" y2="14"/></g>';
// avion vu de dessus, nez à droite
const top=(x,y,s,extra)=>'<g transform="translate('+x+' '+y+') scale('+s+')"'+(extra||'')+'><path class="ln fW" d="M-6 -4 L-14 -38 L-4 -38 L10 -4z"/><path class="ln fW" d="M-6 4 L-14 38 L-4 38 L10 4z"/><path class="ln fW" d="M-40 -3 L-46 -16 L-38 -16 L-30 -3z"/><path class="ln fW" d="M-40 3 L-46 16 L-38 16 L-30 3z"/><path class="ln fW" d="M-48 0 Q-40 -5 -20 -5 L30 -4 Q46 -3 50 0 Q46 3 30 4 L-20 5 Q-40 5 -48 0z"/></g>';
window.BIA._h={S,T,A,side,top,rnd:()=>rnd(),seed:v=>{seed=v}};

F['archimede']={cap:'<b>Le principe d’Archimède.</b> Un objet plongé dans l’air reçoit une poussée vers le haut égale au poids de l’air qu’il déplace. Si le ballon pèse moins que cet air, il monte. L’air chaud est moins dense que l’air froid : on le chauffe pour que le ballon devienne plus léger.',
svg:(()=>{ seed=3; const box=(x,n,sp)=>{ let d='<rect x="'+x+'" y="52" width="76" height="96" rx="4" class="fS o2"/>'; for(let i=0;i<n;i++){ d+='<circle class="jig '+(sp?'fR':'fB')+'" cx="'+(x+8+rnd()*60).toFixed(0)+'" cy="'+(60+rnd()*80).toFixed(0)+'" r="2.4" style="animation-duration:'+(sp?.35:1.6)+'s;animation-delay:-'+(rnd()).toFixed(2)+'s"/>'; } return d; };
 return S(360,226,
 '<g transform="translate(0 12)"><g class="bob"><ellipse cx="86" cy="70" rx="38" ry="46" class="fA o3"/><ellipse cx="86" cy="70" rx="38" ry="46" class="ln sA"/><path class="ln" d="M60 100 L76 130 M112 100 L96 130"/><rect x="74" y="130" width="24" height="14" rx="2" class="fW ln"/>'+A(86,20,86,-4,'sG','arG').replace('y2="-4"','y2="2"')+'</g>'+
 A(86,150,86,200,'sB','arB')+T(94,176,'poids','sm')+A(130,52,130,12,'sG','arG')+T(136,34,'poussée','sm')+T(136,45,'d’Archimède','sm')+
 box(190,22,false)+box(278,9,true)+T(228,166,'air froid','mid')+T(228,178,'dense : beaucoup','mid sm')+T(228,190,'de molécules','mid sm')+T(316,166,'air chaud','mid')+T(316,178,'moins dense :','mid sm')+T(316,190,'molécules rapides','mid sm')+T(270,40,'Dans 1 m³ d’air…','mid')+'</g>',
 'Poussée d’Archimède sur un ballon et comparaison de l’air chaud et de l’air froid'); })(),alt:''};

F['venturi']={cap:'<b>Bernoulli en image.</b> Dans un passage étroit, l’air va plus vite (animation : les traits défilent plus vite) et sa pression baisse : les petits tubes le montrent, le liquide y descend. Là où l’air accélère, la pression diminue. C’est la clé de la portance.',
svg:S(360,214,
 '<polygon points="14,70 110,70 150,94 210,94 250,70 346,70 346,142 250,142 210,118 150,118 110,142 14,142" class="fS o2"/><polyline class="ln" points="14,70 110,70 150,94 210,94 250,70 346,70"/><polyline class="ln" points="14,142 110,142 150,118 210,118 250,142 346,142"/>'+
 [82,106,130].map(y=>'<line class="ln sB flow" x1="20" y1="'+y+'" x2="106" y2="'+y+'" style="animation-duration:1.6s"/><line class="ln sB flow" x1="254" y1="'+y+'" x2="340" y2="'+y+'" style="animation-duration:1.6s"/>').join('')+
 [100,106,112].map(y=>'<line class="ln sA flow" x1="152" y1="'+y+'" x2="208" y2="'+y+'" style="animation-duration:.35s"/>').join('')+
 [['62','26'],['180','60'],['298','26']].map(t=>'<rect x="'+(t[0]-7)+'" y="22" width="14" height="'+(t[0]==180?72:48)+'" class="fW ln thin"/><rect x="'+(t[0]-6)+'" y="'+t[1]+'" width="12" height="'+((t[0]==180?94:70)-t[1])+'" class="fB" opacity=".7"/>'+'<line x1="'+t[0]+'" y1="'+(t[0]==180?94:70)+'" x2="'+t[0]+'" y2="'+(t[0]==180?94:70)+'"/>').join('')+
 T(62,166,'Large','mid')+T(62,180,'air lent','mid sm')+T(62,192,'pression forte','mid sm')+T(180,166,'Étroit','mid')+T(180,180,'air rapide','mid sm')+T(180,192,'pression faible','mid sm')+T(298,166,'Large','mid')+T(298,180,'air lent','mid sm')+T(298,192,'pression forte','mid sm'),
 'Tube de Venturi : l’air accélère dans le passage étroit et la pression baisse'),alt:''};

const wing=(rot,col)=>'<g transform="rotate('+rot+' 180 110)"><path class="ln '+col+'" style="fill:var(--surface)" d="M92 110 C112 84 200 78 276 108 C200 118 120 128 92 110z"/></g>';
F['airfoil']={cap:'<b>Pourquoi une aile porte.</b> L’aile est inclinée vers le haut (c’est l’<b>incidence</b>). Elle dévie l’air vers le bas et accélère l’air au-dessus : la pression y baisse (<b>−</b>). Dessous, la pression est plus forte (<b>+</b>). L’aile est <b>aspirée vers le haut</b> et poussée par en dessous : c’est la portance.',
svg:S(360,214,
 '<rect x="0" y="0" width="360" height="214" class="fSky o1"/>'+
 A(8,100,60,100,'sM','arM')+T(8,92,'vent relatif','sm')+
 '<path class="ln sB flow" d="M30 64 C110 60 190 40 336 74"/><path class="ln sB flow" d="M30 82 C110 80 190 64 336 92"/><path class="ln sB flow" d="M30 138 C110 146 200 162 336 128"/><path class="ln sB flow" d="M30 156 C110 164 200 182 336 148"/>'+
 wing(8,'sK')+
 T(190,44,'−','mid big fR').replace('class="mid big fR"','class="mid big" style="fill:var(--bad);font-size:26px"')+T(210,181,'+','mid big').replace('class="mid big"','class="mid big" style="fill:var(--c1);font-size:26px"')+
 A(200,100,200,30,'sA','arA').replace('x1="200" y1="100" x2="200" y2="30"','x1="232" y1="96" x2="232" y2="26"')+T(240,36,'portance','end').replace('x="240"','x="300"')+
 '<path class="ln thin" d="M118 106 A60 60 0 0 1 112 118"/>'+T(60,126,'incidence','sm'),
 'Profil d’aile avec écoulement d’air, zones de basse et haute pression et portance'),alt:''};

F['stall']={cap:'<b>Le décrochage.</b> Si on tire trop sur le manche, l’incidence devient trop grande (environ 15°). L’air ne suit plus le dessus de l’aile : il se décolle et tourbillonne. La portance s’effondre et l’avion s’enfonce. <b>Pour sortir du décrochage : pousser le manche pour réduire l’incidence</b>, remettre de la puissance.',
svg:S(360,214,
 '<rect x="0" y="0" width="360" height="214" class="fSky o1"/>'+
 A(8,110,60,110,'sM','arM')+T(8,102,'vent relatif','sm')+
 '<path class="ln sB flow" d="M30 150 C110 160 220 164 336 150"/><path class="ln sB flow" d="M30 168 C110 178 220 182 336 170"/><path class="ln sB flow" d="M30 70 C100 66 140 50 170 60"/>'+
 wing(20,'sR')+
 [[210,60,'spinr'],[250,76,'spinl'],[290,66,'spinr']].map(a=>'<g><path class="ln sR '+a[2]+'" d="M'+a[0]+' '+a[1]+' m-12 0 a12 12 0 1 1 6 10"/></g>').join('')+
 T(250,40,'air décollé : tourbillons','mid').replace('mid"','mid" style="fill:var(--bad)"')+T(180,24,'Incidence trop forte → DÉCROCHAGE','mid big').replace('class="mid big"','class="mid big" style="fill:var(--bad)"')+
 A(300,200,300,168,'sR','arR').replace('x1="300" y1="200" x2="300" y2="168"','x1="342" y1="120" x2="342" y2="190"')+T(334,140,'l’avion','end sm')+T(334,152,'s’enfonce','end sm'),
 'Profil d’aile à forte incidence avec tourbillons : décrochage'),alt:''};

F['forces']={cap:'<b>Les quatre forces</b> sur un avion en vol rectiligne à vitesse constante. <b>Portance</b> (vers le haut) contre <b>poids</b> ; <b>traction</b> de l’hélice contre <b>traînée</b>. Quand elles s’équilibrent deux à deux, l’avion garde sa trajectoire.',
svg:S(360,224,
 '<rect x="0" y="0" width="360" height="224" class="fSky o1"/>'+
 [30,70,150,190].map((y,i)=>'<line class="ln sM thin flowr" x1="'+(20+i*14)+'" y1="'+y+'" x2="'+(110+i*10)+'" y2="'+y+'"/>').join('')+
 '<g class="bob">'+side(180,112,1.7)+'</g>'+
 A(180,98,180,30,'sG','arG')+T(188,40,'PORTANCE','sm').replace('sm','')+
 A(180,128,180,200,'sB','arB')+T(188,196,'POIDS')+
 A(240,112,312,112,'sA','arA')+T(352,96,'TRACTION','end')+
 A(120,112,48,112,'sR','arR')+T(14,130,'TRAÎNÉE'),
 'Les quatre forces sur un avion : portance, poids, traction, traînée'),alt:''};

const icon=(kind)=>{
 if(kind==='roulis') return '<g><line class="ln" x1="-42" y1="0" x2="42" y2="0" style="stroke-width:5"/><circle r="7" class="fW ln"/><animateTransform attributeName="transform" type="rotate" values="-18;18;-18" dur="3s" repeatCount="indefinite" additive="sum"/></g>';
 if(kind==='tangage') return '<g><animateTransform attributeName="transform" type="rotate" values="-14;14;-14" dur="3s" repeatCount="indefinite"/>'+side(0,0,.8)+'</g>';
 return '<g><animateTransform attributeName="transform" type="rotate" values="-22;22;-22" dur="3s" repeatCount="indefinite"/>'+top(0,0,.8)+'</g>'; };
F['axes']={cap:'<b>Trois axes, trois mouvements.</b> L’avion peut tourner autour de trois axes. Chaque mouvement a sa commande : le manche (gauche-droite) pour le roulis, le manche (avant-arrière) pour le tangage, le palonnier (pédales) pour le lacet.',
svg:S(360,270,
 [['roulis','Roulis','axe longitudinal','Ailerons · manche à gauche / droite','L’avion s’incline : une aile monte, l’autre descend.'],['tangage','Tangage','axe transversal','Profondeur · manche avant / arrière','Le nez monte ou descend.'],['lacet','Lacet','axe vertical','Direction · palonnier (pédales)','Le nez tourne à gauche ou à droite.']].map((r,i)=>'<g transform="translate(0 '+(i*90)+')"><rect x="4" y="4" width="352" height="80" rx="6" class="fS o1"/><g transform="translate(58 44)">'+icon(r[0])+'</g>'+T(120,24,r[1]+' <tspan class="sm" style="font-weight:500">('+r[2]+')</tspan>','big').replace('class="big"','class="big" style="font-size:13px"')+T(120,44,r[3],'sm')+T(120,62,r[4],'sm')+'</g>').join(''),
 'Roulis, tangage et lacet avec leurs commandes'),alt:''};

F['bank']={cap:'<b>Pourquoi un avion tourne en s’inclinant.</b> Quand on incline l’avion, la portance s’incline aussi. Une partie (verticale) continue de porter l’avion ; l’autre (horizontale) le tire vers l’<b>intérieur du virage</b> : c’est elle qui fait tourner. Comme la partie verticale diminue, il faut tirer un peu sur le manche pour ne pas perdre d’altitude.',
svg:S(360,224,
 '<rect x="0" y="0" width="360" height="224" class="fSky o1"/>'+
 '<g transform="rotate(24 180 120)"><line class="ln" x1="90" y1="120" x2="270" y2="120" style="stroke-width:6"/><circle cx="180" cy="120" r="9" class="fW ln"/><line class="ln" x1="180" y1="111" x2="180" y2="98"/><path class="ln fW" d="M172 98 h16"/></g>'+
 A(180,116,180+Math.sin(24*Math.PI/180)*100,116-Math.cos(24*Math.PI/180)*100,'sG','arG')+T(236,22,'portance','end').replace('x="236"','x="290"').replace('y="22"','y="26"')+
 '<line class="ln thin dash sG" x1="180" y1="116" x2="180" y2="25"/>'+T(8,60,'la partie verticale','sm')+T(8,72,'continue de porter l’avion','sm')+
 A(180,116,222,116,'sA','arA')+T(228,112,'force qui fait tourner','sm')+T(228,124,'vers le centre du virage','sm')+
 A(180,128,180,208,'sB','arB')+T(188,204,'POIDS'),
 'Avion en virage vu de face : la portance inclinée se décompose'),alt:''};

F['families']={cap:'<b>Les grandes familles d’aéronefs.</b> Un <b>aérostat</b> flotte parce qu’il est plus léger que l’air (Archimède). Un <b>aérodyne</b> est plus lourd que l’air : il vole grâce au mouvement de son aile. Les engins spatiaux, eux, sortent de l’atmosphère.',
svg:S(360,250,
 '<rect x="120" y="6" width="120" height="30" rx="6" class="fK"/>'+T(180,26,'AÉRONEFS','mid').replace('class="mid"','class="mid wh"')+
 '<path class="ln thin" d="M180 36 V48 M90 48 H270 M90 48 V58 M270 48 V58"/>'+
 '<rect x="8" y="58" width="164" height="80" rx="6" class="fB o2"/><text x="90" y="78" class="mid">Plus léger que l’air</text><text x="90" y="92" class="mid sm">AÉROSTATS</text><text x="90" y="112" class="mid sm">ballon libre, montgolfière</text><text x="90" y="126" class="mid sm">dirigeable</text>'+
 '<rect x="186" y="58" width="166" height="80" rx="6" class="fA o2"/><text x="269" y="78" class="mid">Plus lourd que l’air</text><text x="269" y="92" class="mid sm">AÉRODYNES</text><text x="269" y="112" class="mid sm">voilure fixe : avion, planeur, ULM</text><text x="269" y="126" class="mid sm">voilure tournante : hélicoptère</text>'+
 '<path class="ln thin" d="M269 138 V150"/>'+
 '<rect x="8" y="154" width="344" height="36" rx="6" class="fW ln thin"/><text x="180" y="170" class="mid">Drone : aéronef sans pilote à bord</text><text x="180" y="184" class="mid sm">(classé selon sa voilure : avion ou hélicoptère)</text>'+
 '<rect x="8" y="204" width="344" height="40" rx="6" class="fM o2"/><text x="180" y="222" class="mid">Engins spatiaux</text><text x="180" y="236" class="mid sm">fusée, satellite, sonde, station spatiale</text>',
 'Classement des aéronefs : aérostats, aérodynes, engins spatiaux'),alt:''};

F['wingstruct']={cap:'<b>Comment est faite une aile.</b> Une aile ressemble à un squelette recouvert d’une peau. Le <b>longeron</b> court tout le long de l’aile et supporte l’effort. Les <b>nervures</b> donnent la forme du profil. Le <b>revêtement</b> (la peau) ferme le tout. Le fuselage a le même principe : des <b>cadres</b> et des <b>lisses</b> recouverts d’un revêtement.',
svg:S(360,236,
 '<polygon points="12,34 172,34 172,104 12,76" class="fW ln"/>'+
 [0,1,2,3,4].map(i=>'<line class="ln thin sB" x1="'+(34+i*30)+'" y1="34" x2="'+(34+i*30)+'" y2="'+(77+i*7)+'"/>').join('')+
 '<line class="ln sA" x1="12" y1="52" x2="172" y2="52" style="stroke-width:4"/>'+
 T(92,124,'AILE (vue de dessus)','mid sm')+
 '<g transform="translate(278 70)"><circle r="46" class="fW ln"/><circle r="38" class="ln thin"/>'+[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>'<circle cx="'+(38*Math.cos(i*Math.PI/6)).toFixed(1)+'" cy="'+(38*Math.sin(i*Math.PI/6)).toFixed(1)+'" r="3" class="fA"/>').join('')+'</g>'+T(278,132,'FUSELAGE (coupe)','mid sm')+
 '<line class="ln sA" x1="14" y1="154" x2="40" y2="154" style="stroke-width:4"/>'+T(48,158,'longeron : la colonne vertébrale de l’aile')+
 '<line class="ln sB" x1="14" y1="174" x2="40" y2="174"/>'+T(48,178,'nervures (aile) et cadres (fuselage) : la forme')+
 '<circle cx="27" cy="194" r="4" class="fA"/>'+T(48,198,'lisses : renforts dans la longueur du fuselage')+
 T(14,222,'Matériaux : bois et toile (avions anciens), alliages légers, composites','sm'),
 'Structure d’une aile avec longeron et nervures, et coupe de fuselage avec lisses'),alt:''};

F['pistoncycle']={cap:'<b>Le moteur à pistons, en 4 temps.</b> Le piston monte et descend dans le cylindre. Un seul temps sur quatre est moteur : celui où le mélange enflammé repousse le piston. Observe l’étincelle (flash) et la couleur du gaz.',
svg:(()=>{ const ph=[['1 · Admission','le piston descend et aspire air + essence'],['2 · Compression','le piston monte et écrase le mélange'],['3 · Combustion-détente','l’étincelle enflamme : le piston est repoussé (temps moteur)'],['4 · Échappement','le piston monte et chasse les gaz brûlés']];
 const vis=['1;0;0;0','0;1;0;0','0;0;1;0','0;0;0;1'];
 return S(360,240,
 '<rect x="108" y="30" width="14" height="150" class="fK"/><rect x="238" y="30" width="14" height="150" class="fK"/>'+
 '<rect x="122" y="40" width="116" height="140" class="fW"/>'+
 '<rect x="122" y="70" width="116" height="110" id="gz" fill="#7DB8F2" opacity=".55"><animate attributeName="y" values="70;130;70;130;70" keyTimes="0;.25;.5;.75;1" dur="8s" repeatCount="indefinite"/><animate attributeName="height" values="110;50;110;50;110" keyTimes="0;.25;.5;.75;1" dur="8s" repeatCount="indefinite"/><animate attributeName="fill" values="#7DB8F2;#7DB8F2;#B9D8F7;#FF8A3D;#9AA3AD;#7DB8F2" keyTimes="0;.25;.5;.51;.75;1" dur="8s" repeatCount="indefinite" calcMode="discrete"/></rect>'+
 '<rect x="122" y="70" width="116" height="14" class="fK"><animate attributeName="y" values="40;96;40;96;40" keyTimes="0;.25;.5;.75;1" dur="8s" repeatCount="indefinite"/></rect>'.replace('40;96;40;96;40','70;126;70;126;70')+
 '<rect x="176" y="190" width="8" height="30" class="fK" opacity="0"/>'+
 '<path class="ln sB" d="M140 22 V40" marker-end="url(#arB)"/>'+T(120,16,'admission','sm')+
 '<path class="ln sM" d="M220 40 V22" marker-end="url(#arM)"/>'+T(200,16,'échappement','sm')+
 '<rect x="166" y="22" width="28" height="18" rx="3" class="fW ln thin"/><text x="180" y="35" class="mid sm">bougie</text>'+
 '<circle cx="180" cy="46" r="10" fill="#FFD23F"><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.49;.5;.56;.57;1" dur="8s" repeatCount="indefinite"/></circle>'+
 ph.map((p,i)=>'<g><animate attributeName="opacity" values="'+vis[i]+'" keyTimes="0;.25;.5;.75" calcMode="discrete" dur="8s" repeatCount="indefinite"/>'+T(180,206,p[0],'mid big')+T(180,224,p[1],'mid sm')+'</g>').join(''),
 'Cycle à quatre temps d’un moteur à pistons : admission, compression, combustion-détente, échappement'); })(),alt:''};

F['turbojet']={cap:'<b>Le turboréacteur.</b> De l’air entre à l’avant. 1 · Le compresseur le comprime. 2 · Dans la chambre, on injecte du carburant et on l’enflamme. 3 · Les gaz chauds font tourner la turbine, qui entraîne le compresseur. 4 · Ils sortent très vite par la tuyère : par réaction, l’avion est poussé vers l’avant.',
svg:S(360,214,
 '<rect x="0" y="0" width="360" height="214" class="fSky o1"/>'+
 '<path class="ln fW" d="M14 60 L330 54 L346 74 L346 124 L330 144 L14 138 Z" style="fill:var(--surface)"/>'+
 '<polygon points="30,70 130,86 130,112 30,128" class="fB o3"/>'+'<rect x="130" y="80" width="66" height="38" class="fR" opacity=".55"/><rect x="196" y="84" width="40" height="30" class="fB o3"/><polygon points="236,84 330,92 330,106 236,114" class="fR" opacity=".25"/>'+
 [0,1,2,3].map(i=>'<line class="ln thin" x1="'+(50+i*20)+'" y1="'+(76+i*3)+'" x2="'+(50+i*20)+'" y2="'+(122-i*3)+'"/>').join('')+
 [0,1].map(i=>'<line class="ln thin" x1="'+(204+i*14)+'" y1="86" x2="'+(204+i*14)+'" y2="112"/>').join('')+
 '<line class="ln sB flow" x1="2" y1="99" x2="30" y2="99" marker-end="url(#arB)"/><line class="ln sR flow" x1="236" y1="99" x2="350" y2="99" style="animation-duration:.4s"/>'+
 '<circle cx="80" cy="44" r="10" class="fK"/><text x="80" y="48" class="mid wh sm" style="fill:#fff">1</text>'+
 '<circle cx="163" cy="44" r="10" class="fK"/><text x="163" y="48" class="mid sm" style="fill:#fff">2</text>'+
 '<circle cx="216" cy="44" r="10" class="fK"/><text x="216" y="48" class="mid sm" style="fill:#fff">3</text>'+
 '<circle cx="290" cy="44" r="10" class="fK"/><text x="290" y="48" class="mid sm" style="fill:#fff">4</text>'+
 T(14,160,'1 · Compresseur : comprime l’air')+T(14,176,'2 · Chambre : carburant + flamme')+T(14,192,'3 · Turbine : entraîne le compresseur')+T(14,208,'4 · Tuyère : gaz rapides → poussée'),
 'Schéma d’un turboréacteur : compresseur, chambre de combustion, turbine, tuyère'),alt:''};

F['pitotstatic']={cap:'<b>Trois instruments reliés à l’air extérieur.</b> La <b>prise Pitot</b>, face au vent, capte la pression totale. La <b>prise statique</b>, sur le côté, capte la pression de l’air au repos. L’anémomètre compare les deux (la différence donne la vitesse). L’altimètre et le variomètre n’utilisent que la pression statique.',
svg:S(360,236,
 '<rect x="0" y="0" width="360" height="236" class="fSky o1"/>'+
 '<path class="ln fW" d="M6 40 H52 L60 44 L52 48 H6z"/>'+A(0,20,34,20,'sM','arM')+T(4,14,'vent','sm')+T(8,66,'prise Pitot','sm')+
 '<circle cx="24" cy="132" r="6" class="fW ln"/>'+T(8,152,'prise statique','sm')+
 '<polyline class="ln sA" points="56,44 120,44 120,60 232,60 232,44 250,44"/>'+
 '<polyline class="ln sB" points="30,132 140,132 140,76 250,76"/><polyline class="ln sB" points="140,132 250,132"/><polyline class="ln sB" points="140,132 140,192 250,192"/>'+
 [['ANÉMOMÈTRE',60,'vitesse'],['ALTIMÈTRE',132,'altitude'],['VARIOMÈTRE',192,'montée/descente']].map(r=>'<circle cx="300" cy="'+(r[1]-10+ (r[1]==60?-6:0))+'" r="26" class="fK"/>').join('')+'',
 'Prise Pitot et prise statique reliées à l’anémomètre, à l’altimètre et au variomètre'),alt:''};
// refonte propre de pitotstatic
F['pitotstatic'].svg=S(360,240,
 '<rect x="0" y="0" width="360" height="240" class="fSky o1"/>'+
 '<path class="ln fW" d="M6 36 H50 L58 40 L50 44 H6z"/>'+A(0,16,36,16,'sM','arM')+T(4,11,'vent','sm')+T(6,62,'prise Pitot','sm')+
 '<circle cx="24" cy="138" r="6" class="fW ln"/>'+T(6,160,'prise statique','sm')+
 '<polyline class="ln sA" points="58,40 226,40"/>'+
 '<polyline class="ln sB" points="30,138 190,138 190,64 226,64"/><polyline class="ln sB" points="190,138 226,138"/><polyline class="ln sB" points="190,138 190,212 226,212"/>'+
 [['ANÉMO',52,'Anémomètre','vitesse'],['ALTI',138,'Altimètre','altitude'],['VARIO',212,'Variomètre','montée']].map(r=>'<g><circle cx="250" cy="'+r[1]+'" r="24" class="fK"/><text x="250" y="'+(r[1]+4)+'" class="mid" style="fill:#fff;font-size:10px">'+r[0]+'</text><text x="282" y="'+(r[1]-2)+'">'+r[2]+'</text><text x="282" y="'+(r[1]+11)+'" class="sm">'+r[3]+'</text></g>').join('')+
 '<line class="ln sB" x1="226" y1="64" x2="244" y2="68"/><line class="ln sA" x1="226" y1="40" x2="244" y2="40"/><line class="ln sB" x1="226" y1="138" x2="228" y2="138"/><line class="ln sB" x1="226" y1="212" x2="228" y2="212"/>'+
 '<line class="ln sA" x1="10" y1="196" x2="38" y2="196"/>'+T(44,200,'pression totale (Pitot)','sm')+'<line class="ln sB" x1="10" y1="214" x2="38" y2="214"/>'+T(44,218,'pression statique','sm'),
 'Prise Pitot et prise statique reliées aux instruments');

F['heli']={cap:'<b>L’hélicoptère et son rotor anticouple.</b> Le grand rotor tourne dans un sens ; par réaction, le fuselage aurait tendance à tourner dans l’autre. Le petit <b>rotor de queue</b> pousse la queue sur le côté pour l’en empêcher et sert aussi à diriger le nez (c’est le « palonnier » de l’hélicoptère).',
svg:S(360,226,
 '<rect x="0" y="0" width="360" height="226" class="fSky o1"/>'+
 '<ellipse cx="130" cy="112" rx="46" ry="20" class="fW ln"/><line class="ln" x1="170" y1="112" x2="290" y2="112" style="stroke-width:5"/><path class="ln fW" d="M280 112 l14 -14 v28z"/>'+
 '<g class="spinr" style="transform-origin:130px 112px;transform-box:view-box"><line class="ln sA" x1="52" y1="112" x2="208" y2="112" style="stroke-width:4"/><line class="ln sA" x1="130" y1="34" x2="130" y2="190" style="stroke-width:4"/></g>'+
 '<circle cx="130" cy="112" r="6" class="fK"/>'+
 '<g class="fastspin" style="transform-origin:292px 112px;transform-box:view-box"><line class="ln sB" x1="292" y1="98" x2="292" y2="126"/></g>'+
 '<path class="ln sA" d="M60 52 A100 100 0 0 1 130 22" marker-end="url(#arA)"/>'+T(18,32,'le rotor tourne','sm').replace('x="18"','x="4"')+
 '<path class="ln sR" d="M200 176 A100 100 0 0 1 130 202" marker-end="url(#arR)" transform="rotate(0)"/>'+T(210,198,'réaction : le fuselage','sm').replace('x="210"','x="150"').replace('y="198"','y="218"')+
 A(292,160,292,138,'sB','arB')+T(300,170,'le rotor de queue','sm').replace('x="300"','x="236"')+T(236,182,'pousse la queue','sm')+T(8,186,'vue de dessus','sm'),
 'Hélicoptère vu de dessus : rotor principal, rotor de queue et couple de réaction'),alt:''};

F['finesse']={cap:'<b>La finesse d’un planeur.</b> La finesse indique la distance parcourue pour 1 m d’altitude perdue. Un planeur de finesse 30 parcourt 30 m pour chaque mètre perdu : de 1 000 m d’altitude, il peut planer environ 30 km sans moteur (dans l’air calme). La pente est exagérée sur le dessin.',
svg:S(360,196,
 '<rect x="0" y="0" width="360" height="196" class="fSky o1"/><rect x="0" y="172" width="360" height="24" class="fGr"/>'+
 '<path id="gl" class="ln thin dash sM" d="M20 38 L330 168"/>'+
 '<g><g transform="scale(.0)"></g><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#gl"/></animateMotion></g>'+
 '<g><g transform="scale(1.3)"><path class="ln" d="M-18 0 Q0 -5 18 -1 Q0 4 -18 0z" style="fill:var(--surface)"/><line class="ln" x1="-2" y1="-14" x2="-2" y2="14" style="stroke-width:3"/></g><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#gl"/></animateMotion></g>'+
 '<line class="ln thin" x1="330" y1="38" x2="330" y2="168"/>'+T(336,106,'1','sm')+'<line class="ln thin" x1="20" y1="180" x2="330" y2="180"/>'+T(175,166,'30 m de distance pour 1 m de hauteur','mid sm')+
 T(24,22,'Finesse 30 : 1 m perdu pour 30 m parcourus','')+T(24,60,'','sm'),
 'Un planeur descend en ligne droite : finesse 30'),alt:''};

F['orbits']={cap:'<b>Deux orbites à retenir.</b> En orbite basse (LEO, environ 400 km) le satellite tourne vite : un tour en 1 h 30 (station spatiale). En orbite géostationnaire (GEO, 36 000 km), il met 24 h : comme la Terre tourne en 24 h, il semble <b>immobile</b> au-dessus d’un point (télécommunications, météo). Distances non respectées.',
svg:S(360,230,
 '<rect x="0" y="0" width="360" height="230" fill="#0B1626"/>'+
 [..."abcdefghijklmnopqrstu"].map((c,i)=>'<circle cx="'+((i*47)%350+4)+'" cy="'+((i*61)%220+4)+'" r="1" fill="#fff" opacity=".6"/>').join('')+
 '<circle cx="120" cy="115" r="38" fill="#2A78C8"/><path d="M96 100 q14 -12 30 -2 q8 10 -4 18 q-14 4 -26 -16z M126 128 q12 -2 18 8 q-8 10 -18 2z" fill="#4FA860"/>'+
 '<circle cx="120" cy="115" r="56" fill="none" stroke="#FFB02E" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>'+
 '<circle cx="120" cy="115" r="102" fill="none" stroke="#5FB0FF" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>'+
 '<g><circle cx="176" cy="115" r="5" fill="#FFB02E"/><animateTransform attributeName="transform" type="rotate" from="0 120 115" to="360 120 115" dur="3s" repeatCount="indefinite"/></g>'+
 '<g><circle cx="222" cy="115" r="6" fill="#5FB0FF"/><animateTransform attributeName="transform" type="rotate" from="0 120 115" to="360 120 115" dur="24s" repeatCount="indefinite"/></g>'+
 '<circle cx="250" cy="76" r="5" fill="#FFB02E"/><text x="262" y="80" style="fill:#fff" class="sm">LEO : ≈ 400 km</text><text x="262" y="92" style="fill:#fff" class="sm">1 tour ≈ 1 h 30</text>'+
 '<circle cx="250" cy="150" r="5" fill="#5FB0FF"/><text x="262" y="154" style="fill:#fff" class="sm">GEO : 36 000 km</text><text x="262" y="166" style="fill:#fff" class="sm">1 tour = 24 h</text>',
 'Terre avec une orbite basse rapide et une orbite géostationnaire lente'),alt:''};

F['stages']={cap:'<b>Pourquoi une fusée a des étages.</b> Une fusée brûle énormément d’ergols. Quand un étage est vide, il devient du poids inutile : on le largue pour que le reste accélère mieux. À la fin, seule la charge utile (le satellite) atteint l’orbite.',
svg:S(360,236,
 '<rect x="0" y="0" width="360" height="236" fill="#0B1626"/>'+
 '<g transform="translate(110 0)"><g>'+
 '<g><rect x="-17" y="130" width="34" height="62" rx="3" fill="#E9EFF5"/><rect x="-17" y="130" width="34" height="62" rx="3" fill="none" stroke="#FF9A57" stroke-width="2"/><polygon points="-12,192 12,192 18,210 -18,210" fill="#FF9A57"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 140" keyTimes="0;.4;1" dur="8s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.5;1" dur="8s" repeatCount="indefinite"/></g>'+
 '<rect x="-14" y="88" width="28" height="40" rx="3" fill="#E9EFF5"/><rect x="-14" y="88" width="28" height="40" rx="3" fill="none" stroke="#5FB0FF" stroke-width="2"/><polygon points="-14,60 14,60 0,40" fill="#E9EFF5"/><rect x="-14" y="60" width="28" height="28" fill="#E9EFF5"/><rect x="-6" y="64" width="12" height="16" rx="2" fill="#FFB02E"/>'+
 '<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 -30" keyTimes="0;.4;1" dur="8s" repeatCount="indefinite"/></g></g>'+
 '<text x="170" y="60" style="fill:#fff">Charge utile</text><text x="170" y="73" style="fill:#fff" class="sm">le satellite à placer</text>'+
 '<text x="170" y="112" style="fill:#fff">2e étage</text><text x="170" y="125" style="fill:#fff" class="sm">continue vers l’orbite</text>'+
 '<text x="170" y="162" style="fill:#fff">1er étage</text><text x="170" y="175" style="fill:#fff" class="sm">le plus puissant : il décolle,</text><text x="170" y="188" style="fill:#fff" class="sm">puis il est largué quand il est vide</text>',
 'Fusée à deux étages dont le premier est largué'),alt:''};
})();
