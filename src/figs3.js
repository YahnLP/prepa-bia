(function(){
const F=window.BIA.figs, H=window.BIA._h, S=H.S, T=H.T, A=H.A, side=H.side, top=H.top;

F['latlon']={cap:'<b>Se repérer sur la Terre.</b> La <b>latitude</b> se mesure en degrés du nord au sud à partir de l’équateur (de 0° à 90°). La <b>longitude</b> se mesure d’est en ouest à partir du méridien de Greenwich (de 0° à 180°). Avec les deux, on désigne n’importe quel point.',
svg:S(360,230,
 '<circle cx="110" cy="115" r="80" class="fSky o3"/><circle cx="110" cy="115" r="80" class="ln"/>'+
 [-52,-26,0,26,52].map(a=>'<ellipse cx="110" cy="'+(115+a*0.95).toFixed(0)+'" rx="'+(80*Math.cos(Math.asin(a/80*0.95))).toFixed(0)+'" ry="'+(10+ (a==0?0:0)).toFixed(0)+'" class="ln thin'+(a==0?' sA':'')+'" '+(a==0?'style="stroke-width:2.5"':'')+'/>').join('')+
 [20,50,80].map(rx=>'<ellipse cx="110" cy="115" rx="'+rx+'" ry="80" class="ln thin"/>').join('')+'<line class="ln thin sB" x1="110" y1="35" x2="110" y2="195" style="stroke-width:2.5"/>'+
 '<circle cx="146" cy="86" r="5" class="fR blink" style="animation:none"/>'+
 T(196,40,'Équateur','sA').replace('class="sA"','style="fill:var(--acc)"')+'<line class="ln thin sA" x1="190" y1="38" x2="150" y2="117"/>'+
 T(196,66,'Greenwich','').replace('Greenwich','Méridien de Greenwich').replace('x="196"','x="196"')+'<line class="ln thin sB" x1="194" y1="64" x2="114" y2="60"/>'+
 T(196,106,'Un point P','')+T(196,120,'latitude : nord ou sud','sm')+T(196,132,'de l’équateur','sm')+T(196,150,'longitude : est ou ouest','sm')+T(196,162,'du méridien de Greenwich','sm')+
 T(196,186,'1° de latitude ≈ 60 NM','')+T(196,200,'1 NM = 1,852 km','sm'),
 'Globe avec équateur, méridien de Greenwich, latitude et longitude'),alt:''};

F['northfig']={cap:'<b>Trois nords.</b> Le <b>nord vrai</b> (celui des cartes) pointe vers le pôle géographique. Le <b>nord magnétique</b> est celui qu’indique la boussole : il est un peu décalé (cet écart s’appelle la <b>déclinaison</b>, ici exagérée). Enfin le compas de l’avion est dérangé par les masses de fer et l’électricité de l’avion (la <b>déviation</b>).',
svg:S(360,214,
 '<circle cx="110" cy="112" r="80" class="fS o1"/><circle cx="110" cy="112" r="80" class="ln thin"/>'+
 A(110,112,110,34,'sK','ar').replace('class="ln sK"','class="ln" style="stroke:var(--ink);stroke-width:3"')+T(110,24,'Nord vrai','mid')+
 '<g transform="rotate(22 110 112)">'+A(110,112,110,34,'sR','arR').replace('class="ln sR"','class="ln sR flow" style="stroke-width:3;stroke-dasharray:none;animation:none"')+'</g>'+T(166,36,'Nord magnétique','sR').replace('class="sR"','style="fill:var(--bad)"')+
 '<path class="ln thin" d="M110 64 A48 48 0 0 1 130 68"/>'+T(124,56,'déclinaison','sm')+
 T(206,116,'Rv : route vraie','')+T(206,132,'Rm = Rv ± déclinaison','sm')+T(206,148,'Cm = Rm ± déviation','sm')+T(206,170,'On part du nord vrai (carte)','sm')+T(206,182,'et on corrige pour obtenir','sm')+T(206,194,'le cap à afficher.','sm'),
 'Nord vrai et nord magnétique avec déclinaison'),alt:''};

F['windtri']={cap:'<b>Le triangle des vitesses.</b> Si tu pointes ton nez droit vers ta destination, le vent te pousse de côté. Pour suivre ta route, tu dois pointer un peu <b>contre le vent</b> : c’est la <b>dérive</b>. Les trois flèches forment un triangle : le cap et la vitesse propre (orange), le vent (bleu), et ce que tu fais réellement au-dessus du sol, la route et la vitesse sol (vert).',
svg:S(360,230,
 '<rect x="0" y="0" width="360" height="230" class="fSky o1"/>'+
 '<line class="ln sG" x1="30" y1="160" x2="300" y2="160" style="stroke-width:4" marker-end="url(#arG)"/>'+T(166,180,'Route suivie (vitesse sol)','mid').replace('class="mid"','class="mid" style="fill:var(--c3)"')+
 '<line class="ln sA" x1="30" y1="160" x2="230" y2="110" style="stroke-width:4" marker-end="url(#arA)"/>'+T(74,112,'Cap (vitesse propre)','').replace('class=','class=').replace('<text','<text style="fill:var(--acc)"')+
 '<line class="ln sB flow" x1="230" y1="110" x2="300" y2="160" style="stroke-width:3" marker-end="url(#arB)"/>'+T(290,116,'Vent','').replace('<text','<text style="fill:var(--c1)"')+
 '<path class="ln thin" d="M80 154 A52 52 0 0 1 78 146"/>'+T(94,152,'dérive','sm')+
 T(14,20,'Le vent souffle ici ↘','sm')+'<g class="bob">'+A(250,30,276,56,'sB','arB')+A(284,30,310,56,'sB','arB')+'</g>'+
 T(14,210,'Sans correction, tu serais déporté sous le vent.','sm'),
 'Triangle des vitesses avec cap, vent et route'),alt:''};

F['vor']={cap:'<b>Le VOR : une rose de 360 routes.</b> Une balise VOR émet comme un phare tournant : chaque direction autour d’elle est une <b>radiale</b> (de 0° à 360°). Avec le récepteur, le pilote sait sur quelle radiale il se trouve, c’est-à-dire dans quelle direction il est par rapport à la balise.',
svg:S(360,230,
 '<circle cx="130" cy="115" r="86" class="fS o1"/><circle cx="130" cy="115" r="86" class="ln thin"/>'+
 [...Array(12).keys()].map(i=>{const a=i*30*Math.PI/180; return '<line class="ln thin" x1="130" y1="115" x2="'+(130+86*Math.sin(a)).toFixed(1)+'" y2="'+(115-86*Math.cos(a)).toFixed(1)+'"/><text x="'+(130+99*Math.sin(a)).toFixed(1)+'" y="'+(119-99*Math.cos(a)).toFixed(1)+'" class="mid sm">'+String(i*30).padStart(3,'0')+'</text>';}).join('')+
 '<g style="transform-origin:130px 115px;transform-box:view-box" class="spinr"><line class="ln sA" x1="130" y1="115" x2="130" y2="29" style="stroke-width:3"/></g>'+
 '<circle cx="130" cy="115" r="9" class="fK"/><text x="130" y="119" class="mid" style="fill:#fff;font-size:8px">VOR</text>'+
 '<g transform="translate(193 115)">'+top(0,0,.28)+'</g>'+
 T(250,100,'Je suis sur la','')+T(250,114,'radiale 090 :','')+T(250,128,'à l’est de la balise','sm')+T(250,170,'Radiale = direction','sm')+T(250,182,'qui part de la balise.','sm'),
 'Balise VOR avec ses radiales de 0 à 360 degrés'),alt:''};

F['gnss']={cap:'<b>Le GNSS (comme le GPS).</b> Chaque satellite envoie l’heure d’émission de son signal. Le récepteur mesure le temps de trajet, donc la <b>distance</b> à chaque satellite. Avec 3 satellites on trouve sa position, un 4<sup>e</sup> corrige l’horloge du récepteur et donne l’altitude. Il faut en voir <b>au moins 4</b>.',
svg:S(360,236,
 '<rect x="0" y="0" width="360" height="236" fill="#0B1626"/>'+
 [[56,40],[300,56],[176,18]].map((p,i)=>{ const d=Math.hypot(p[0]-180,p[1]-190).toFixed(0); return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="0" fill="none" stroke="#FFB02E" stroke-width="1.5"><animate attributeName="r" values="0;'+d+'" dur="3s" begin="'+(i*.4)+'s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.85;1" dur="3s" begin="'+(i*.4)+'s" repeatCount="indefinite"/></circle><rect x="'+(p[0]-9)+'" y="'+(p[1]-5)+'" width="18" height="10" fill="#E9EFF5"/><rect x="'+(p[0]-20)+'" y="'+(p[1]-3)+'" width="9" height="6" fill="#5FB0FF"/><rect x="'+(p[0]+11)+'" y="'+(p[1]-3)+'" width="9" height="6" fill="#5FB0FF"/>'; }).join('')+
 '<circle cx="180" cy="190" r="7" fill="#FF7468"/><text x="180" y="214" class="mid" style="fill:#fff">Récepteur (toi)</text>'+
 '<text x="8" y="94" style="fill:#fff" class="sm">3 satellites : ta position</text><text x="8" y="106" style="fill:#fff" class="sm">4e : altitude + horloge</text>',
 'Trois satellites dont les cercles de distance se croisent sur le récepteur'),alt:''};

F['altlevels']={cap:'<b>Trois façons de dire « à quelle hauteur je suis ».</b> Selon le calage de l’altimètre, il indique : l’<b>altitude</b> (au-dessus de la mer) avec le QNH ; la <b>hauteur</b> (au-dessus du terrain) avec le QFE ; le <b>niveau de vol</b> (FL) avec le calage standard 1013 hPa, utilisé en croisière. Exemple : terrain à 400 ft d’altitude, avion à 2 000 ft d’altitude → hauteur 1 600 ft.',
svg:S(360,236,
 '<rect x="0" y="0" width="360" height="236" class="fSky o1"/>'+
 '<path class="fGr" d="M0 200 L0 180 Q60 176 90 150 L200 150 L230 176 L360 190 L360 236 L0 236z" opacity=".95"/>'+
 '<line class="ln thin dash" x1="0" y1="200" x2="360" y2="200" style="stroke:var(--c1)"/>'+T(6,214,'niveau de la mer (0 ft)','sm').replace('<text','<text style="fill:#fff"')+
 '<g class="bob">'+side(250,60,.75)+'</g>'+
 A(130,198,130,64,'sB','arB')+T(52,130,'ALTITUDE','').replace('<text','<text style="fill:var(--c1)"')+T(52,142,'(QNH) 2 000 ft','sm')+
 A(190,150,190,64,'sA','arA')+T(196,112,'HAUTEUR','').replace('<text','<text style="fill:var(--acc)"')+T(196,124,'(QFE) 1 600 ft','sm')+
 '<text x="150" y="166" class="mid" style="fill:#fff;font-size:10px">aérodrome : 400 ft</text>'+
 T(352,20,'1013 hPa → niveau de vol (FL)','sm end'),
 'Altitude, hauteur et niveau de vol par rapport à la mer et au terrain'),alt:''};

F['airspace']={cap:'<b>L’espace aérien vu de côté.</b> Autour d’un aérodrome important, la <b>CTR</b> part du sol : un contrôleur y règle tous les mouvements. Au-dessus, la <b>TMA</b> plus large protège les avions qui convergent vers les aérodromes. Autour et en dessous, l’espace peut être non contrôlé (classe G) : le pilote y est responsable de voir et d’éviter.',
svg:S(360,226,
 '<rect x="0" y="0" width="360" height="226" class="fSky o1"/><rect x="0" y="196" width="360" height="30" class="fGr"/>'+
 '<rect x="40" y="120" width="280" height="40" class="fB o2" stroke="var(--c1)"/>'+T(180,144,'TMA','mid big').replace('mid big','mid big')+
 '<rect x="80" y="80" width="200" height="40" class="fB o1" stroke="var(--c1)"/>'+T(180,104,'CTA / TMA supérieure','mid sm')+
 '<rect x="124" y="160" width="112" height="36" class="fA o3" stroke="var(--acc)"/>'+T(180,182,'CTR','mid big')+
 '<rect x="168" y="190" width="24" height="6" class="fK"/>'+T(180,214,'aérodrome','mid sm').replace('<text','<text style="fill:#fff"')+
 T(8,24,'non contrôlé (classe G)','sm')+
 '<g class="bob">'+side(300,184,.4)+'</g>'+
 T(352,24,'espace contrôlé : autorisation','sm end'),
 'Coupe d’espace aérien avec CTR, TMA et espace non contrôlé'),alt:''};

const pl=(x,y,rot,col)=>'<g transform="translate('+x+' '+y+') rotate('+rot+') scale(.3)">'+top(0,0,1).replace(/class="ln fW"/g,'class="ln '+col+'"')+'</g>';
F['rightofway']={cap:'<b>Les priorités de passage</b> en vol à vue. Quatre situations à retenir : face à face (chacun à droite), routes qui se croisent (celui qui a l’autre à sa droite cède), dépassement (par la droite), et le plus difficile à manœuvrer a toujours la priorité.',
svg:S(360,250,
 [['Face à face','Chacun dévie à droite'],['Routes convergentes','L’avion A voit B à sa droite : A cède'],['Dépassement','On double par la droite'],['Priorité aux moins manœuvrants','Du plus prioritaire au moins prioritaire']].map((r,i)=>{ const x=(i%2)*180, y=Math.floor(i/2)*126; return '<g transform="translate('+x+' '+y+')"><rect x="2" y="2" width="176" height="120" rx="6" class="fS o1"/>'+T(88,18,r[0],'mid').replace('<text','<text style="font-size:11px"')+T(88,114,r[1],'mid sm').replace('class="mid sm"','class="mid sm" style="font-size:9px"'); }).map((s,i)=>s+
  (i===0? pl(40,60,0,'fB')+pl(140,60,180,'fR')+'<path class="ln sB thin" d="M62 60 Q80 60 80 86" marker-end="url(#arB)"/><path class="ln sR thin" d="M118 60 Q100 60 100 36" marker-end="url(#arR)"/>':'')+
  (i===1? pl(50,92,-90,'fB')+T(64,94,'A','sm')+pl(130,56,180,'fR')+T(126,50,'B','sm')+A(50,70,50,40,'sB','arB')+A(106,56,76,56,'sR','arR'):'')+
  (i===2? pl(36,80,0,'fB')+pl(110,50,0,'fR')+'<path class="ln sB thin" d="M60 80 Q90 80 90 100 Q110 112 150 100" marker-end="url(#arB)"/>'+A(134,50,160,50,'sR','arR')+T(110,36,'lent','sm')+T(36,100,'rapide','sm'):'')+
  (i===3? T(20,40,'1 · ballon libre','').replace('<text','<text style="font-size:10.5px"')+T(20,56,'2 · planeur','').replace('<text','<text style="font-size:10.5px"')+T(20,72,'3 · dirigeable','').replace('<text','<text style="font-size:10.5px"')+T(20,88,'4 · avion remorqueur','').replace('<text','<text style="font-size:10.5px"')+T(20,104,'5 · avion à moteur','').replace('<text','<text style="font-size:10.5px"'):'')+'</g>').join(''),
 'Quatre situations de priorité de passage entre aéronefs'),alt:''};

F['runway']={cap:'<b>Lire une piste.</b> Le grand nombre peint sur la piste est son <b>cap magnétique divisé par 10</b> : la piste « 27 » est orientée au 270°. À l’autre bout, on lit « 09 » (090°). Un avion se pose et décolle <b>face au vent</b> : la manche à air indique sa direction.',
svg:S(360,222,
 '<rect x="0" y="0" width="360" height="222" fill="#8BB878" opacity=".35"/>'+
 '<rect x="20" y="82" width="320" height="58" class="fK" opacity=".85"/>'+
 '<line x1="70" y1="111" x2="300" y2="111" stroke="#fff" stroke-width="3" stroke-dasharray="14 12"/>'+
 [0,1,2,3].map(i=>'<rect x="24" y="'+(86+i*13)+'" width="14" height="6" fill="#fff"/><rect x="322" y="'+(86+i*13)+'" width="14" height="6" fill="#fff"/>').join('')+
 '<text x="52" y="118" fill="#fff" style="font:700 16px var(--body)" transform="rotate(90 52 111)">09</text><text x="308" y="105" fill="#fff" style="font:700 16px var(--body)" transform="rotate(-90 308 111)">27</text>'+
 A(8,160,60,160,'sM','arM')+T(8,152,'vent','sm')+
 '<g class="bob" style="animation-duration:1.4s"><line x1="300" y1="190" x2="300" y2="154" stroke="var(--ink)" stroke-width="2"/><polygon points="300,154 270,160 300,170" fill="var(--acc)"/></g>'+T(300,208,'manche à air','mid sm')+
 T(180,70,'Cap magnétique 270° → piste 27','mid')+T(180,208,'Piste 09 / 27 : deux sens d’utilisation','mid sm').replace('x="180"','x="120"'),
 'Piste 09/27 avec numéros, axe, seuils et manche à air'),alt:''};

F['radiocall']={cap:'<b>Un message radio bien construit</b> dit toujours : à qui je parle, qui je suis, où je suis, ce que je veux. Parle lentement, d’une voix claire, et écoute avant d’émettre.',
svg:'<div class="fh">'+[
 ['Toulouse Tour','a','1 · À qui je m’adresse (le nom de la station)'],
 ['F-ABCD','','2 · Qui je suis (mon indicatif d’appel)'],
 ['Cessna 172','','3 · Mon type d’avion (au premier contact)'],
 ['10 km nord, 2 500 ft','','4 · Où je suis et à quelle altitude'],
 ['demande atterrissage','','5 · Ce que je demande ou ce que j’annonce']
 ].map(r=>'<div class="row2"><span class="tok'+(r[1]?' a':'')+'">'+r[0]+'</span><span>'+r[2]+'</span></div>').join('')+'</div>'};

F['swiss']={cap:'<b>Le modèle du fromage suisse.</b> Chaque tranche est une protection : météo vérifiée, vol bien préparé, avion contrôlé, bonne décision. Chaque protection a des trous. Un accident arrive quand les trous de toutes les tranches <b>s’alignent</b>. Plus tu as de tranches solides, moins c’est probable.',
svg:S(360,214,
 [0,1,2,3].map(i=>{ const x=60+i*70; return '<polygon points="'+x+',40 '+(x+30)+',30 '+(x+30)+',150 '+x+',160" class="fA o2" stroke="var(--acc)"/><ellipse cx="'+(x+15)+'" cy="'+(95+((i*37)%30)-15)+'" rx="5" ry="9" class="fW" opacity="0"/>'; }).join('')+
 [[0,52],[0,128],[1,70],[1,108],[2,58],[2,138],[3,80],[3,120]].map(h=>'<ellipse cx="'+(75+h[0]*70)+'" cy="'+h[1]+'" rx="6" ry="9" fill="var(--bg)"/>').join('')+
 [0,1,2,3].map(i=>'<ellipse cx="'+(75+i*70)+'" cy="96" rx="6" ry="9" fill="var(--bg)"/>').join('')+
 [[ 'Météo',75],['Préparation',145],['Avion',215],['Décision',285]].map(t=>T(t[1],182,t[0],'mid sm')).join('')+
 '<line class="ln sR flow" x1="14" y1="96" x2="336" y2="96" style="stroke-width:3" marker-end="url(#arR)"/>'+T(14,86,'risque','sm')+T(352,118,'accident','sm end'),
 'Tranches de fromage dont les trous s’alignent'),alt:''};
})();
