(function(){
const F=window.BIA.figs;
const S=(w,h,body,label)=>'<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+label+'">'+body+'</svg>';
const T=(x,y,t,c)=>'<text x="'+x+'" y="'+y+'"'+(c?' class="'+c+'"':'')+'>'+t+'</text>';
const A=(x1,y1,x2,y2,c,m)=>'<line class="ln '+(c||'')+'" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" marker-end="url(#'+(m||'ar')+')"/>';
let seed=7; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };

F['layers']={cap:'<b>Les 4 couches de l’atmosphère</b> (échelle non respectée). La courbe montre la température : elle baisse dans la troposphère, remonte dans la stratosphère, rebaisse dans la mésosphère, puis remonte. Le point orange suit cette courbe en montant.',
svg:S(360,222,
 '<rect x="0" y="8" width="360" height="37" class="fB o1"/><rect x="0" y="45" width="360" height="45" class="fB o2"/><rect x="0" y="90" width="360" height="45" class="fB o1"/><rect x="0" y="135" width="360" height="66" class="fB o2"/><rect x="0" y="201" width="360" height="14" class="fGr"/>'+
 T(8,26,'Thermosphère')+T(8,38,'80 à 600 km','sm')+T(8,64,'Mésosphère')+T(8,76,'50 à 80 km','sm')+T(8,109,'Stratosphère')+T(8,121,'11 à 50 km · ozone','sm')+T(8,160,'Troposphère')+T(8,172,'0 à 11 km · la météo','sm')+T(8,188,'nuages, vent, pluie','sm')+
 '<path id="tcurve" class="ln sR" d="M250 201 L190 135 L190 112 L235 90 L175 45 L300 10"/>'+
 T(258,196,'+15 °C','sm')+T(196,130,'−56 °C','sm')+T(238,86,'0 °C','sm')+T(181,41,'−90 °C','sm')+
 T(352,56,'Station spatiale (400 km)','sm end').replace('y="56"','y="19"')+T(352,150,'✈ avions de ligne','sm end')+
 '<circle r="6" class="fA"><animateMotion dur="9s" repeatCount="indefinite" rotate="0"><mpath href="#tcurve"/></animateMotion></circle>'+
 T(180,216,'température →','sm'),
 'Schéma des couches de l’atmosphère avec la courbe de température'),
alt:'layers'};

F['pressure']={cap:'<b>Pourquoi la pression baisse en montant.</b> La pression, c’est le poids de l’air au-dessus de toi. Au sol, toute la colonne d’air t’écrase. À 5 500 m, la moitié de l’air est déjà sous tes pieds : la pression est deux fois plus faible.',
svg:(()=>{ seed=11; let d=''; for(let i=0;i<420;i++){ const x=18+rnd()*128, y=12+rnd()*176; const dens=Math.exp(-(188-y)/62); if(rnd()<dens){ d+='<circle class="jig fB" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="2.2" style="animation-delay:-'+(rnd()*1.6).toFixed(2)+'s"/>'; } }
 return S(360,210,'<rect x="14" y="8" width="136" height="184" rx="3" class="fS o2"/>'+d+'<rect x="10" y="192" width="144" height="10" class="fGr"/>'+
 T(170,26,'Haut : peu d’air')+T(170,38,'pression faible','sm')+
 '<line class="ln thin dash" x1="150" y1="100" x2="220" y2="100"/>'+T(226,96,'5 500 m')+T(226,110,'≈ 500 hPa (moitié)','sm')+
 T(170,178,'Sol : beaucoup d’air')+T(170,190,'1 013 hPa','sm')+
 A(330,60,330,160,'sA','arA')+T(322,50,'plus on monte','sm end')+T(322,62,'moins d’air','sm end'),
 'Colonne d’air : les molécules sont plus nombreuses près du sol qu’en altitude');})()};

F['windforce']={cap:'<b>D’où vient le vent ?</b> L’air est poussé des hautes pressions (H) vers les basses pressions (L). Mais la rotation de la Terre le fait <b>dévier vers la droite</b> (dans l’hémisphère nord) : le vent finit par souffler le long des isobares, en tournant autour des centres.',
svg:S(360,214,
 '<rect x="0" y="0" width="360" height="214" class="fSky o1"/>'+
 [100,170,240].map((x,i)=>'<path class="ln thin" d="M'+x+' 6 Q'+(x+14)+' 107 '+x+' 208"/>'+T(x+4,18,[1020,1016,1012][i],'sm')).join('')+
 '<circle cx="36" cy="105" r="22" class="fB"/>'+T(36,112,'H','mid big wh')+T(36,142,'haute','sm mid')+T(36,153,'pression','sm mid')+
 '<circle cx="326" cy="105" r="22" class="fR"/>'+T(326,112,'L','mid big wh')+T(326,142,'basse','sm mid')+T(326,153,'pression','sm mid')+
 '<line class="ln dash thin" x1="62" y1="105" x2="296" y2="105" marker-end="url(#arM)"/>'+T(180,98,'force de pression','sm mid')+
 '<path class="ln sA flow" d="M62 118 C150 118 220 130 236 196" marker-end="url(#arA)"/>'+T(246,190,'vent réel','end').replace('end"','"').replace('x="246"','x="250"')+T(250,203,'(dévié à droite)','sm'),
 'Le vent part de la haute pression vers la basse pression et dévie vers la droite'),alt:'windforce'};

F['highlow']={cap:'<b>Anticyclone et dépression.</b> Dans l’hémisphère nord, le vent tourne dans le sens des aiguilles d’une montre autour d’un anticyclone (H), et dans le sens inverse autour d’une dépression (L). Anticyclone : l’air descend, le ciel se dégage. Dépression : l’air monte, les nuages se forment.',
svg:(()=>{ const ring=(cx,cy,col,cw)=>{ const tip=cw?8:-8; let g='<circle class="ln thin dash" cx="'+cx+'" cy="'+cy+'" r="42"/><g class="'+(cw?'spinr':'spinl')+'" style="transform-origin:'+cx+'px '+cy+'px;transform-box:view-box">';
   for(let k=0;k<4;k++){ const a=k*Math.PI/2; const px=cx+42*Math.cos(a), py=cy+42*Math.sin(a); const deg=a*180/Math.PI+(cw?90:-90); g+='<polygon class="'+col+'" points="0,-7 5,5 -5,5" transform="translate('+px.toFixed(1)+' '+py.toFixed(1)+') rotate('+(deg).toFixed(0)+' 0 0)"/>'; }
   return g+'</g>'; };
 return S(360,230,
  ring(90,90,'fB',true)+'<circle cx="90" cy="90" r="19" class="fB"/>'+T(90,97,'H','mid big wh')+T(90,150,'ANTICYCLONE','mid')+
  ring(270,90,'fR',false)+'<circle cx="270" cy="90" r="19" class="fR"/>'+T(270,97,'L','mid big wh')+T(270,150,'DÉPRESSION','mid')+
  '<g class="bob">'+A(90,162,90,194,'sB','arB')+'</g>'+T(90,212,'air qui descend','mid sm')+T(90,224,'ciel dégagé, beau temps','mid sm')+
  '<g class="bob">'+A(270,194,270,162,'sR','arR')+'</g>'+T(270,212,'air qui monte','mid sm')+T(270,224,'nuages, pluie, vent','mid sm'),
  'Anticyclone et dépression : sens de rotation du vent et mouvement vertical de l’air'); })()};

F['cloudform']={cap:'<b>Comment naît un nuage.</b> Un « paquet » d’air chaud monte. En montant, il se détend et se <b>refroidit</b>. Quand il est assez froid, la vapeur d’eau qu’il contient se condense en minuscules gouttelettes : c’est un nuage.',
svg:S(360,232,
 '<rect x="0" y="0" width="360" height="232" class="fSky o1"/><rect x="0" y="206" width="360" height="26" class="fGr"/>'+
 '<line class="ln thin dash sB" x1="0" y1="86" x2="360" y2="86"/>'+T(352,80,'niveau de condensation','sm end')+T(352,100,'(base du nuage)','sm end')+
 '<g class="fade" style="animation-duration:6s">'+['M120 76 a18 14 0 0 1 30 -10 a22 18 0 0 1 40 4 a16 14 0 0 1 4 24 h-70 a14 12 0 0 1 -4 -18z'].map(p=>'<path class="cloud" d="'+p+'"/>').join('')+'</g>'+
 '<circle cx="110" cy="190" r="12" class="fA" opacity=".85"><animate attributeName="cy" values="190;190;100;60" keyTimes="0;.08;.7;1" dur="6s" repeatCount="indefinite"/><animate attributeName="r" values="12;12;18;22" keyTimes="0;.08;.7;1" dur="6s" repeatCount="indefinite"/><animate attributeName="fill-opacity" values=".9;.9;.7;.3" keyTimes="0;.1;.7;1" dur="6s" repeatCount="indefinite"/></circle>'+
 T(14,196,'Sol chauffé par le soleil','sm')+T(14,30,'En montant : l’air se refroidit','')+T(14,44,'environ −1 °C tous les 100 m','sm')+
 '<line class="ln thin sA" x1="190" y1="200" x2="190" y2="130" marker-end="url(#arA)"/>'+T(196,170,'courant ascendant','sm')+T(196,182,'(thermique)','sm'),
 'Une bulle d’air chaud monte, se refroidit et forme un nuage au niveau de condensation'),alt:'cloudform'};

F['stability']={cap:'<b>Air stable ou air instable ?</b> Imagine une bille. Dans un bol (stable), si on la pousse elle revient : l’air reste en couches calmes. Sur une bosse (instable), elle s’éloigne de plus en plus : l’air monte en cheminées, avec des cumulus et des orages.',
svg:S(360,220,
 '<path class="ln" d="M20 70 Q90 150 160 70"/><circle r="9" class="fA"><animateMotion dur="2.4s" repeatCount="indefinite" path="M50 83 Q90 134 130 83 Q90 134 50 83" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/></circle>'+
 T(90,168,'STABLE','mid big')+T(90,184,'l’air revient à sa place','mid sm')+T(90,198,'stratus, brume, ciel gris','mid sm')+
 '<path class="ln" d="M200 125 Q270 45 340 125"/><circle r="9" class="fR"><animateMotion dur="3.2s" repeatCount="indefinite" path="M262 73 L318 110 L338 118" keyTimes="0;.7;1" keyPoints="0;.7;1" calcMode="linear"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.85;1" dur="3.2s" repeatCount="indefinite"/></circle>'+
 T(270,168,'INSTABLE','mid big')+T(270,184,'l’air s’éloigne et monte','mid sm')+T(270,198,'cumulus, averses, orages','mid sm'),
 'Une bille dans un bol revient, sur une bosse elle s’éloigne : stabilité et instabilité de l’air'),alt:'stability'};

F['fronts']={cap:'<b>Deux types de fronts</b> (coupes verticales). <b>Front froid</b> : l’air froid, lourd, pousse l’air chaud vers le haut en pente raide : averses et orages brefs. <b>Front chaud</b> : l’air chaud glisse en pente douce sur l’air froid : nuages en couches, pluie fine et durable. Les fronts avancent vers la droite.',
svg:S(360,270,
 '<text x="8" y="16" class="big">Front froid</text>'+
 '<rect x="0" y="22" width="360" height="100" class="fR o1"/><polygon points="0,122 200,122 178,50 0,50" class="fB o3"/><line class="ln sB" x1="200" y1="122" x2="176" y2="48"/>'+
 '<g class="bob"><path class="cloud" d="M170 60 a14 12 0 0 1 24 -8 a18 14 0 0 1 32 3 a12 12 0 0 1 2 18 h-58z"/></g>'+
 [0,1,2].map(i=>'<line class="ln sG thin flow" x1="'+(214+i*14)+'" y1="'+(64+i*8)+'" x2="'+(210+i*14)+'" y2="'+(100+i*6)+'"/>').join('')+
 T(40,90,'air froid','mid sm').replace('x="40"','x="70"')+T(300,100,'air chaud','mid sm')+
 '<polygon points="205,126 213,126 209,119" class="fB"/><polygon points="226,126 234,126 230,119" class="fB"/>'+
 '<line class="ln sB" x1="8" y1="122" x2="352" y2="122" style="stroke-width:3"/>'+'<line class="ln sA" x1="262" y1="34" x2="320" y2="34" marker-end="url(#arA)"/>'+T(262,30,'le front avance','sm')+
 '<text x="8" y="154" class="big">Front chaud</text>'+
 '<rect x="0" y="160" width="360" height="100" class="fR o1"/><polygon points="120,260 340,180 360,180 360,260" class="fB o3"/>'+
 '<line class="ln sR" x1="120" y1="260" x2="340" y2="180"/>'+
 '<path class="cloud" d="M160 238 a12 10 0 0 1 20 -6 a16 12 0 0 1 28 2 a10 10 0 0 1 2 14 h-56z"/><path class="cloud" d="M226 218 a12 10 0 0 1 20 -6 a16 12 0 0 1 28 2 a10 10 0 0 1 2 14 h-56z" style="opacity:.85"/><path class="cloud" d="M290 196 a10 8 0 0 1 16 -5 a14 10 0 0 1 24 2 h-40z" style="opacity:.7"/>'+
 [0,1,2,3].map(i=>'<line class="ln sG thin flow" x1="'+(130+i*14)+'" y1="'+(222-i*5)+'" x2="'+(124+i*14)+'" y2="'+(252-i*4)+'"/>').join('')+
 T(50,230,'air chaud','mid sm')+T(312,252,'air froid','mid sm')+
 '<line class="ln sR" x1="8" y1="260" x2="352" y2="260" style="stroke-width:3"/>'+'<circle cx="124" cy="256" r="5" class="fR"/><circle cx="150" cy="256" r="5" class="fR"/>'+
 '<line class="ln sA" x1="20" y1="180" x2="84" y2="180" marker-end="url(#arA)"/>'+T(20,174,'le front avance','sm'),
 'Coupes d’un front froid (pente raide) et d’un front chaud (pente douce)'),alt:'fronts'};

F['cb']={cap:'<b>Le cumulonimbus (Cb), le nuage d’orage.</b> Il peut monter jusqu’à plus de 10 km. Au centre, de puissants courants montent ; sur les côtés, l’air froid et la pluie descendent. En haut, il s’étale en forme d’<b>enclume</b>. Dessous et dedans : turbulence violente, grêle, givrage, éclairs. On ne le traverse jamais, on le contourne.',
svg:S(360,250,
 '<rect x="0" y="0" width="360" height="250" class="fSky o1"/><rect x="0" y="228" width="360" height="22" class="fGr"/>'+
 '<path class="cloud" d="M60 40 L300 40 Q330 40 330 56 Q330 66 290 64 L230 62 L226 150 Q232 170 200 176 L160 176 Q128 170 134 150 L130 62 L70 64 Q30 66 30 56 Q30 40 60 40z"/>'+
 '<path class="cloud" d="M110 150 Q120 190 180 196 Q240 190 250 150 Q230 168 180 170 Q130 168 110 150z" style="opacity:.8"/>'+
 T(180,56,'enclume','mid sm')+T(180,100,'Cb','mid big')+
 [0,1,2].map(i=>'<line class="ln sA flowr" x1="'+(156+i*24)+'" y1="172" x2="'+(156+i*24)+'" y2="112" marker-end="url(#arA)"/>').join('')+
 T(236,134,'courants','sm')+T(236,146,'montants','sm')+
 [0,1,2,3,4].map(i=>'<line class="ln sB flow" x1="'+(232+i*9)+'" y1="190" x2="'+(226+i*9)+'" y2="222"/>').join('')+T(352,208,'pluie, grêle','sm end')+
 '<polyline class="ln sA blink" points="168,176 176,196 164,200 178,224" style="stroke-width:3"/>'+
 '<line class="ln sB thin dash" x1="30" y1="228" x2="106" y2="198" marker-end="url(#arB)"/>'+T(10,194,'rafales froides','sm')+T(10,206,'au sol','sm'),
 'Cumulonimbus avec courants montants, enclume, pluie et éclair'),alt:'cb'};

F['metar']={cap:'<b>Lire un METAR ligne à ligne.</b> Un METAR est le « bulletin météo » d’un aérodrome, écrit dans un code international. Lis-le toujours dans cet ordre.',
svg:'<div class="fh">'+[
 ['LFPG','a','Lieu : l’aérodrome (code OACI de 4 lettres, ici Paris-Charles-de-Gaulle)'],
 ['061030Z','','Date et heure : le 6 du mois, à 10 h 30 en heure UTC (le « Z »)'],
 ['24012KT','','Vent : vient du 240°, 12 nœuds (kt)'],
 ['9999','','Visibilité : 9999 = 10 km ou plus'],
 ['FEW040 BKN070','','Nuages : FEW = peu (1-2 octas), BKN = fragmenté (5-7 octas). 040 = 4 000 ft'],
 ['15/09','','Température 15 °C / point de rosée 9 °C'],
 ['Q1018','','QNH : pression à régler sur l’altimètre, 1018 hPa'],
 ['NOSIG','','Tendance : pas de changement important prévu']
 ].map(r=>'<div class="row2"><span class="tok'+(r[1]?' a':'')+'">'+r[0]+'</span><span>'+r[2]+'</span></div>').join('')+'</div>'};
})();
