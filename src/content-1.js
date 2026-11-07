(function(){
const C = window.BIA.chapters;

C.push({id:'1-1', th:'t1', title:'L’atmosphère', min:12,
goals:['décrire la composition de l’air et ses couches','donner les valeurs de l’atmosphère standard (ISA)','expliquer comment pression, température et densité varient avec l’altitude'],
body:`
<p>L’atmosphère est l’enveloppe d’air qui entoure la Terre. C’est là que volent les avions, et là que naît la météo. Pour la comprendre, on commence par ce qu’elle contient, puis par la façon dont elle change quand on monte.</p>
<h2>De quoi est faite l’air ?</h2>
<p>L’air sec contient environ <b>78 % de diazote</b> (N₂), <b>21 % de dioxygène</b> (O₂) et 1 % d’argon et d’autres gaz (dont 0,04 % de dioxyde de carbone). À cela s’ajoute de la <b>vapeur d’eau</b>, en quantité variable : c’est elle qui fait les nuages.</p>
<div class="callout en-clair"><b>En clair</b>L’air est un mélange gazeux qui a un poids. Une colonne d’air d’un centimètre carré, du sol jusqu’en haut de l’atmosphère, pèse environ 1 kg. La moitié de la masse de l’air se trouve sous 5 500 m.</div>
<h2>Les couches de l’atmosphère</h2>
<div class="figslot" data-fig="layers"></div>
<div class="tw"><table><tr><th>Couche</th><th>Altitude</th><th>À retenir</th></tr>
<tr><td><dfn>Troposphère</dfn></td><td>0 à environ 11 km</td><td>Nuages et météo. La température baisse avec l’altitude.</td></tr>
<tr><td><dfn>Tropopause</dfn></td><td>vers 11 km (8 km aux pôles, 16 km à l’équateur)</td><td>Limite entre les deux premières couches ; avions de ligne.</td></tr>
<tr><td><dfn>Stratosphère</dfn></td><td>11 à 50 km</td><td>Contient la couche d’ozone, qui absorbe les UV. La température remonte.</td></tr>
<tr><td><dfn>Mésosphère</dfn></td><td>50 à 80 km</td><td>La température baisse de nouveau. Les météorites s’y consument.</td></tr>
<tr><td><dfn>Thermosphère</dfn></td><td>80 à 600 km</td><td>Très chaude, très peu dense. Aurores polaires, station spatiale (400 km).</td></tr></table></div>
<h2>L’atmosphère standard (ISA)</h2>
<p>L’atmosphère réelle change tous les jours. Pour comparer les performances des avions, on utilise une atmosphère de référence appelée <b>ISA</b> (International Standard Atmosphere).</p>
<div class="tw"><table><tr><th>Grandeur</th><th>Au niveau de la mer (ISA)</th></tr><tr><td>Température</td><td>15 °C</td></tr><tr><td>Pression</td><td>1 013,25 hPa</td></tr><tr><td>Masse volumique</td><td>1,225 kg/m³</td></tr><tr><td>Variation de température</td><td>−6,5 °C par km (≈ −2 °C par 1 000 ft) jusqu’à 11 km, où l’on atteint −56,5 °C</td></tr></table></div>
<p class="formule">T(h) = 15 − 6,5 × h (h en km, jusqu’à 11 km)</p>
<div class="callout exemple"><b>Exemple</b>À 3 000 m en atmosphère standard : T = 15 − 6,5 × 3 = <b>−4,5 °C</b>.</div>
<h2>Comment l’air change quand on monte</h2>
<ul><li><b>La pression diminue</b> : il y a moins d’air au-dessus de toi. Près du sol, elle baisse d’environ 1 hPa tous les 8 m (≈ 30 ft). Elle vaut la moitié de sa valeur du sol vers 5 500 m.</li><li><b>La densité diminue</b> : l’air est plus « mince ». Les moteurs et les ailes y trouvent moins de matière à utiliser.</li><li><b>La température baisse</b> dans la troposphère.</li></ul>
<p>Une chaleur importante diminue aussi la densité : l’air chaud est moins dense que l’air froid. L’air humide l’est aussi (la vapeur d’eau est plus légère que le diazote et le dioxygène).</p>
<div class="figslot" data-fig="pressure"></div>
<div class="callout attention"><b>Attention</b>« Haut, chaud et humide » : trois facteurs qui réduisent la densité de l’air, donc la portance et la puissance du moteur. Les décollages demandent plus de piste.</div>
<p>Explore ces variations ci-dessous : monte jusqu’à la stratosphère, puis change l’écart de température.</p>
<div class="simslot" data-sim="isa"></div>
`,
keep:['L’air sec : 78 % de diazote, 21 % de dioxygène.','Troposphère : jusqu’à 11 km en moyenne, là où se fait la météo ; la température y baisse de 6,5 °C par km.','ISA au niveau de la mer : 15 °C, 1 013,25 hPa, 1,225 kg/m³.','La pression baisse d’environ 1 hPa tous les 8 m (≈ 30 ft) près du sol.','Haute altitude, chaleur, humidité : l’air est moins dense, les performances baissent.'],
traps:['« Il fait toujours plus froid en montant » est faux : dans la stratosphère, la température remonte.','L’air humide n’est pas plus lourd que l’air sec : il est plus léger.'],
qs:[
['Quelle est la composition approximative de l’air sec ?','78 % de diazote et 21 % de dioxygène','21 % de diazote et 78 % de dioxygène','50 % de diazote et 50 % de dioxygène','78 % de dioxygène et 21 % d’hydrogène','L’air est fait surtout de diazote (78 %), puis de dioxygène (21 %).'],
['Dans quelle couche se produisent la plupart des phénomènes météorologiques ?','La troposphère','La stratosphère','La mésosphère','La thermosphère','La troposphère contient presque toute la vapeur d’eau et donc les nuages. Elle s’étend en moyenne jusqu’à 11 km.'],
['En atmosphère standard (15 °C au niveau de la mer), quelle est la température à 3 000 m ?','−4,5 °C','+15 °C','−19,5 °C','+4,5 °C','On perd 6,5 °C par km : 15 − 3 × 6,5 = −4,5 °C.'],
['Quand l’altitude augmente, la pression atmosphérique :','diminue','augmente','reste constante','augmente jusqu’à 5 000 m puis diminue','La pression est le poids de l’air au-dessus de nous. Plus on monte, moins il y a d’air au-dessus.']
]});

C.push({id:'1-2', th:'t1', title:'Pression et vent', min:14,
goals:['lire une carte d’isobares : anticyclone et dépression','expliquer d’où vient le vent et pourquoi il tourne','donner la direction du vent et l’exprimer en nœuds'],
body:`
<p>Le vent est de l’air qui se déplace. Il naît des différences de pression entre deux endroits, comme l’eau qui s’écoule d’un point haut vers un point bas.</p>
<h2>Anticyclone et dépression</h2>
<p>Sur une carte météo, les <dfn>isobares</dfn> sont les lignes qui relient les points de même pression (ramenée au niveau de la mer). Elles dessinent des centres :</p>
<div class="figslot" data-fig="highlow"></div>
<div class="tw"><table><tr><th></th><th>Anticyclone (A, haute pression)</th><th>Dépression (D, basse pression)</th></tr><tr><td>Air</td><td>Descend et s’écarte du centre</td><td>Monte, en se rapprochant du centre</td></tr><tr><td>Temps</td><td>Plutôt beau, stable</td><td>Nuages, pluie, vent</td></tr><tr><td>Rotation (hémisphère nord)</td><td>Sens des aiguilles d’une montre</td><td>Sens inverse des aiguilles d’une montre</td></tr></table></div>
<div class="callout en-clair"><b>En clair</b>Quand l’air descend, il se réchauffe et les nuages s’évaporent : beau temps. Quand l’air monte, il se refroidit et la vapeur d’eau se condense : nuages et pluie.</div>
<h2>Pourquoi le vent tourne</h2>
<p>La force qui pousse l’air des hautes vers les basses pressions s’appelle le gradient de pression (la « pente » de la pression : plus elle est forte, plus l’air est poussé fort). Plus les isobares sont <b>serrées</b>, plus le gradient est fort et plus le vent est <b>fort</b>.</p>
<div class="figslot" data-fig="windforce"></div>
<p>Mais la Terre tourne sous l’air pendant qu’il se déplace. Imagine que tu lances un ballon sur un manège qui tourne : il semble dévier. Pour le vent, c’est pareil : il est dévié vers la droite dans l’hémisphère nord (c’est la force de Coriolis). Résultat : en altitude, le vent souffle <b>parallèle aux isobares</b> ; près du sol, le frottement le ralentit et il coupe un peu les isobares vers la basse pression.</p>
<div class="callout exemple"><b>Règle de Buys-Ballot (hémisphère nord)</b>Dos au vent, les basses pressions sont à ta gauche et les hautes pressions à ta droite.</div>
<div class="simslot" data-sim="wind"></div>
<h2>Direction et force du vent</h2>
<ul><li>La <b>direction</b> est celle <b>d’où vient</b> le vent, en degrés par rapport au nord. Un vent de 270° est un vent d’ouest : il souffle de l’ouest vers l’est.</li><li>La <b>force</b> se mesure en nœuds (kt). 1 kt = 1,852 km/h.</li><li>Une <dfn>rafale</dfn> est une pointe de vent brève et nettement supérieure au vent moyen.</li><li>La <b>manche à air</b> se gonfle dans le sens où le vent souffle. Elle est pointée vers l’endroit vers lequel va le vent et montre d’où il vient par son attache.</li></ul>
<h2>Vents locaux</h2>
<ul><li><b>Brise de mer</b> (le jour) : la terre chauffe plus vite que la mer, l’air chaud monte au-dessus de la terre et l’air frais de la mer vient le remplacer. Le vent souffle de la mer vers la terre.</li><li><b>Brise de terre</b> (la nuit) : la terre se refroidit plus vite, le sens s’inverse.</li><li><b>Relief</b> : le vent se renforce dans les cols et vallées, et crée de la turbulence et des rotors sous le vent des montagnes.</li></ul>
`,
keep:['Le vent va des hautes vers les basses pressions, dévié vers la droite (hémisphère nord).','Isobares serrées = vent fort.','Hémisphère nord : autour d’un anticyclone, sens horaire ; autour d’une dépression, sens inverse.','La direction du vent est celle d’où il vient ; la force est en nœuds.','Dos au vent, les basses pressions sont à gauche (Buys-Ballot).'],
traps:['Un vent « de 270° » vient de l’ouest, il ne va pas vers l’ouest.','Anticyclone ne signifie pas toujours ciel bleu : en hiver, il peut garder des stratus bas ou du brouillard.'],
qs:[
['Autour d’un anticyclone de l’hémisphère nord, le vent tourne :','dans le sens des aiguilles d’une montre','dans le sens inverse des aiguilles d’une montre','en ligne droite vers le centre','sans direction régulière','Dans l’hémisphère nord, l’air tourne dans le sens horaire autour d’un anticyclone.'],
['Sur une carte, les isobares se resserrent. Que se passe-t-il pour le vent ?','Il se renforce','Il faiblit','Il change de sens','Il ne change pas','Des isobares serrées traduisent un fort gradient de pression, donc un vent plus fort.'],
['Un vent annoncé à 270° signifie qu’il :','vient de l’ouest','va vers l’ouest','vient du sud','vient de l’est','La direction du vent est toujours celle d’où il vient. 270° correspond à l’ouest.'],
['Pendant la journée, au bord de la mer, une brise souffle typiquement :','de la mer vers la terre','de la terre vers la mer','parallèlement à la côte, sans raison','du sud vers le nord','La terre s’échauffe plus vite que l’eau : l’air chaud monte et l’air frais venu de la mer prend sa place.']
]});

C.push({id:'1-3', th:'t1', title:'Humidité, nuages et stabilité', min:16,
goals:['expliquer comment se forme un nuage et calculer sa base','reconnaître les principaux genres de nuages','distinguer une atmosphère stable d’une atmosphère instable'],
body:`
<p>Il n’y a pas de nuage sans vapeur d’eau, et pas de nuage sans refroidissement. Comprendre ces deux ingrédients permet de prévoir presque tout ce que tu verras dans le ciel.</p>
<h2>L’humidité et le point de rosée</h2>
<p>L’air chaud peut contenir plus de vapeur d’eau que l’air froid. L’<dfn>humidité relative</dfn> compare la quantité de vapeur présente à la quantité maximale possible à cette température. À 100 %, l’air est <b>saturé</b>.</p>
<p>Le <dfn>point de rosée</dfn> (Td) est la température à laquelle il faut refroidir l’air pour qu’il devienne saturé. On compare toujours T (température de l’air) et Td : l’<b>écart T − Td</b> dit si l’air est loin ou près de la saturation.</p>
<div class="callout en-clair"><b>En clair</b>Le verre d’eau glacée se couvre de gouttes : l’air autour de lui est refroidi sous son point de rosée, la vapeur se condense. Un nuage, c’est la même chose, en altitude.</div>
<h2>Comment se forme un nuage</h2>
<p>Un nuage se forme quand l’air est <b>refroidi jusqu’à saturation</b>, le plus souvent parce qu’il <b>monte</b> : en montant, la pression diminue, l’air se détend et se refroidit. Il peut aussi être refroidi par le sol la nuit (brouillard de rayonnement : le sol perd sa chaleur par temps clair et refroidit l’air juste au-dessus) ou en passant sur une surface froide (brouillard d’advection : de l’air doux et humide glisse sur une surface froide).</p>
<div class="figslot" data-fig="cloudform"></div>
<p class="formule">base des nuages (m) ≈ 125 × (T − Td)</p>
<div class="callout exemple"><b>Exemple</b>T = 20 °C, Td = 8 °C : écart de 12 °C. Base des cumulus à 125 × 12 = <b>1 500 m</b>. En pieds : environ 400 ft par degré d’écart.</div>
<h2>Stable ou instable ?</h2>
<p>Une bulle d’air qui monte se refroidit : environ 1 °C par 100 m tant qu’elle est sèche (on parle de gradient adiabatique sec : « adiabatique » veut juste dire que la bulle se refroidit parce qu’elle se détend, sans échanger de chaleur avec l’extérieur), et environ <b>0,5 °C par 100 m</b> une fois saturée (la vapeur d’eau qui se transforme en gouttelettes libère de la chaleur, donc elle se refroidit moins vite). On compare ensuite avec la température de l’air autour d’elle.</p>
<div class="figslot" data-fig="stability"></div>
<ul><li><b>Instable</b> : la bulle reste plus chaude que l’air environnant, elle continue de monter. Résultat : nuages à développement vertical (cumulus, cumulonimbus), averses, thermiques, turbulence, très bonne visibilité entre les nuages.</li><li><b>Stable</b> : la bulle devient plus froide, elle redescend. Résultat : nuages en nappes (stratus), air calme, mais visibilité réduite, brume.</li><li>Une <b>inversion</b> (la température augmente avec l’altitude) est une couche très stable : elle agit comme un couvercle : l’air chaud d’en dessous ne peut plus monter (la convection, c’est ce mouvement de montée de l’air chaud).</li></ul>
<div class="simslot" data-sim="parcel"></div>
<h2>Les genres de nuages</h2>
<div class="tw"><table><tr><th>Étage</th><th>Altitude (régions tempérées)</th><th>Nuages</th></tr><tr><td>Supérieur</td><td>5 à 13 km</td><td>Cirrus (Ci), cirrocumulus (Cc), cirrostratus (Cs) : glace, filaments, halo</td></tr><tr><td>Moyen</td><td>2 à 7 km</td><td>Altocumulus (Ac), altostratus (As)</td></tr><tr><td>Inférieur</td><td>sol à 2 km</td><td>Stratus (St), stratocumulus (Sc), nimbostratus (Ns, pluie continue)</td></tr><tr><td>Développement vertical</td><td>base basse, sommet à plus de 10 km</td><td>Cumulus (Cu), cumulonimbus (Cb : orages, grêle, givrage, turbulence)</td></tr></table></div>
<p>Pour retenir : <b>cirro-</b> = en haut ; <b>alto-</b> = au milieu ; <b>cumulus</b> = en tas ; <b>stratus</b> = en couche ; <b>nimbus</b> = qui donne de la pluie.</p>
<h2>Visibilité et couverture</h2>
<ul><li><b>Brouillard</b> : visibilité inférieure à 1 000 m. <b>Brume</b> : visibilité entre 1 et 5 km.</li><li>La couverture se compte en <dfn>octas</dfn> (huitièmes du ciel) : FEW 1-2, SCT 3-4, BKN 5-7, OVC 8. Le <b>plafond</b> est la base de la plus basse couche BKN ou OVC.</li></ul>
`,
keep:['Base des nuages ≈ 125 × (T − Td) mètres.','Gradient adiabatique sec : 1 °C/100 m ; saturé : environ 0,5 °C/100 m.','Instable = cumulus, averses, turbulence ; stable = stratus, air calme, visibilité réduite.','Cb : le nuage de l’orage, à éviter largement.','Brouillard < 1 000 m ; brume entre 1 et 5 km ; plafond = BKN/OVC le plus bas.'],
traps:['Ne pas confondre nimbostratus (pluie continue, stable) et cumulonimbus (averses, orages, instable).','Brume et brouillard ne se distinguent que par la visibilité.'],
qs:[
['T = 20 °C et Td = 8 °C. À quelle hauteur environ se trouve la base des cumulus ?','1 500 m','600 m','2 500 m','300 m','Base ≈ 125 × (20 − 8) = 125 × 12 = 1 500 m.'],
['Quel nuage est associé à l’orage, à la grêle et à une forte turbulence ?','Le cumulonimbus','Le stratus','Le cirrus','Le nimbostratus','Le cumulonimbus est un nuage d’instabilité à fort développement vertical.'],
['On parle de brouillard lorsque la visibilité est inférieure à :','1 000 m','5 000 m','200 m','10 km','Brouillard : moins de 1 000 m. Entre 1 et 5 km, c’est de la brume.'],
['Quelle situation correspond à une atmosphère stable ?','Nuages en nappes, peu de turbulence, visibilité réduite','Cumulus bourgeonnants et fortes ascendances','Orages sur le relief l’après-midi','Fortes rafales et grains','En atmosphère stable, l’air ne monte pas : nuages stratiformes, air calme, brume.'],
['Une bulle d’air sec qui s’élève se refroidit d’environ :','1 °C par 100 m','0,5 °C par 100 m','6,5 °C par 100 m','0,1 °C par 100 m','C’est le gradient adiabatique sec : environ 1 °C par 100 m (3 °C par 1 000 ft).']
]});

C.push({id:'1-4', th:'t1', title:'Masses d’air et fronts', min:15,
goals:['expliquer ce qu’est un front chaud, un front froid, une occlusion','décrire les nuages et le temps avant, pendant et après un front','prévoir l’évolution du vent, de la pression et de la température'],
body:`
<p>Une <dfn>masse d’air</dfn> est un grand volume d’air aux caractéristiques homogènes (température, humidité). Une masse d’air froid et une masse d’air chaud ne se mélangent pas facilement : leur frontière s’appelle un <dfn>front</dfn>.</p>
<h2>Deux fronts, deux mécanismes</h2>
<div class="figslot" data-fig="fronts"></div>
<div class="tw"><table><tr><th></th><th>Front chaud</th><th>Front froid</th></tr><tr><td>Qui avance ?</td><td>L’air chaud glisse au-dessus de l’air froid</td><td>L’air froid, plus dense, pousse sous l’air chaud</td></tr><tr><td>Pente du front</td><td>Faible (environ 1/150) : s’étale sur 1 000 km</td><td>Forte (environ 1/50) : zone étroite</td></tr><tr><td>Nuages</td><td>Ci → Cs → As → Ns</td><td>Cumulonimbus</td></tr><tr><td>Temps</td><td>Pluie continue, plafond bas, visibilité réduite</td><td>Averses, orages, rafales, grain (une averse brève et brutale avec un vent soudain)</td></tr><tr><td>Après le passage</td><td>Température qui monte</td><td>Température qui chute, pression qui remonte</td></tr><tr><td>Symbole</td><td>Demi-cercles rouges</td><td>Triangles bleus</td></tr></table></div>
<div class="callout en-clair"><b>En clair</b>Le front chaud est une rampe douce : tu vois le ciel se dégrader pendant des heures. Le front froid est un mur : tout arrive d’un coup.</div>
<h2>Une perturbation complète</h2>
<p>Une perturbation de nos régions se déplace d’ouest en est. Pour un observateur au sol, la succession est toujours la même : front chaud, puis secteur chaud (la zone d’air doux entre les deux fronts), puis front froid, puis traîne (un ciel variable avec des averses isolées). Le vent <b>tourne vers la droite</b> à chaque passage (sud-est, sud-ouest, nord-ouest). La pression baisse avant le front chaud, reste basse dans le secteur chaud, puis remonte après le front froid.</p>
<div class="simslot" data-sim="front"></div>
<h2>L’occlusion</h2>
<p>Le front froid avance plus vite que le front chaud. Il finit par le rattraper : c’est une <dfn>occlusion</dfn>. L’air chaud est soulevé du sol. Le temps y est mauvais (symbole violet).</p>
<div class="callout attention"><b>Attention</b>Le pire moment pour un pilote : le passage du front froid (cumulonimbus, cisaillement (le vent change brutalement), turbulence, grêle) et le front chaud (plafond très bas, pluie continue, givrage possible en altitude).</div>
`,
keep:['Front chaud : pente douce, Ci-Cs-As-Ns, pluie continue, réchauffement.','Front froid : pente forte, Cb, averses et orages, refroidissement et pression qui remonte.','Ordre de passage : front chaud, secteur chaud, front froid, traîne ; déplacement d’ouest en est.','Hémisphère nord : le vent tourne à droite à chaque front.','Le front froid rattrape le front chaud : occlusion.'],
traps:['Le front chaud n’est pas « plus chaud » partout : c’est l’air chaud qui avance et remplace l’air froid.','Après le front froid, le ciel s’éclaircit mais reste turbulent (cumulus, averses isolées).'],
qs:[
['Quel front est associé à des cumulonimbus, des averses et des orages ?','Le front froid','Le front chaud','L’anticyclone','La dorsale','Le front froid est raide : l’air chaud est soulevé brutalement, ce qui forme des cumulonimbus.'],
['Avant l’arrivée d’un front chaud, la succession typique des nuages est :','Ci, Cs, As, Ns','Cb, Cu, Sc, St','Ns, As, Cs, Ci','St, Sc, Cu, Cb','Un front chaud annonce son arrivée de loin : cirrus, puis cirrostratus, altostratus, nimbostratus.'],
['Au passage d’un front froid dans l’hémisphère nord, le vent :','tourne vers la droite et se renforce par rafales','tourne vers la gauche et faiblit','ne change pas','s’inverse et devient calme','Le vent tourne à droite à chaque front. Derrière le front froid, il vient du nord-ouest et souffle en rafales.'],
['Que se passe-t-il quand un front froid rattrape un front chaud ?','Une occlusion','Un anticyclone','Une brise de mer','Une inversion','Le front froid se déplace plus vite : il rattrape le front chaud et soulève l’air chaud, c’est l’occlusion.']
]});

C.push({id:'1-5', th:'t1', title:'Phénomènes dangereux', min:14,
goals:['identifier les principaux dangers météo pour un aéronef','expliquer le givrage, y compris celui du carburateur','adopter les bons réflexes face à un orage, au cisaillement, à la turbulence et au brouillard'],
body:`
<p>La météo est la première cause de préoccupation du pilote. Voici les phénomènes à connaître, ce qui les provoque, et comment s’en protéger.</p>
<h2>L’orage et le cumulonimbus</h2>
<p>Un orage naît d’un cumulonimbus. Il combine presque tous les dangers : fortes ascendances et descendances, <b>turbulence sévère</b>, <b>grêle</b>, <b>givrage</b>, foudre, visibilité nulle sous l’averse, rafales violentes et <b>cisaillement</b> sous le nuage. Son cycle : développement (courants ascendants), maturité (pluie, grêle, foudre), dissipation.</p>
<div class="figslot" data-fig="cb"></div>
<div class="callout attention"><b>Règle</b>On ne traverse jamais un cumulonimbus. On le contourne largement, on retarde le vol ou on se déroute. Il faut rester loin aussi de son enclume (la partie plate qui s’étale tout en haut) et de l’air sous le nuage.</div>
<h2>Le givrage</h2>
<p>Le givrage apparaît quand l’avion traverse des nuages ou de la pluie à des températures proches de 0 °C, voire négatives : les gouttelettes surfondues (de l’eau restée liquide alors qu’elle est en dessous de 0 °C) gèlent d’un coup au contact de l’avion. Conséquences :</p>
<ul><li>le givre change le profil de l’aile : <b>la portance diminue, la traînée et la masse augmentent</b> ;</li><li>le décrochage arrive plus tôt, à une vitesse plus élevée ;</li><li>les prises de pression (Pitot) peuvent se boucher, l’hélice et les gouvernes sont affectées.</li></ul>
<div class="callout attention"><b>Givrage carburateur</b>Dans un moteur à pistons, le carburant qui s’évapore et l’air qui se détend refroidissent le carburateur de plusieurs dizaines de degrés, comme une bombe aérosol qui devient froide quand on l’utilise. Le givre peut se former même par température extérieure douce (+15 à +20 °C) avec une forte humidité. Remède : réchauffage carburateur.</div>
<h2>Turbulence et cisaillement</h2>
<ul><li><b>Turbulence thermique</b> : sous les cumulus, l’après-midi, sur sol chaud.</li><li><b>Turbulence mécanique</b> : le vent contourne le relief, les bâtiments, les arbres près de la piste.</li><li><b>Turbulence en air clair</b> : près des courants-jets, sans nuage visible.</li><li><b>Ondes de montagne</b> : de fortes oscillations de l’air derrière un relief (côté « sous le vent »), avec des rotors, des tourbillons dangereux près du sol.</li><li><dfn>Cisaillement de vent</dfn> (windshear) : changement brusque de vitesse ou de direction du vent sur une courte distance. À l’atterrissage, il peut faire perdre de la vitesse d’un coup. Les microrafales (un courant d’air qui s’abat du nuage et s’étale sur le sol) en sont la forme la plus violente.</li></ul>
<h2>Visibilité réduite</h2>
<p>Brouillard (visibilité &lt; 1 000 m) et brume sont des pièges : ils empêchent de voir le sol, la piste, le relief. Un vol à vue y est interdit. Les brouillards de rayonnement se forment par nuit claire, vent faible, air humide (T − Td faible) et se dissipent en matinée.</p>
<h2>Vent fort, rafales, vent traversier</h2>
<p>Un vent traversier fort à l’atterrissage peut dépasser les capacités du pilote ou de l’avion. Chaque aéronef a une limite de vent traversier démontré, indiquée dans son manuel de vol.</p>
`,
keep:['Cumulonimbus : turbulence, grêle, givrage, foudre, rafales, cisaillement. On le contourne largement.','Givrage : moins de portance, plus de traînée et de masse ; le décrochage arrive plus tôt.','Le carburateur peut givrer même par temps doux avec de l’humidité : réchauffage carburateur.','Cisaillement : changement brusque du vent en vitesse ou direction ; microrafale sous un orage.','Brouillard : visibilité inférieure à 1 000 m ; vol à vue impossible.'],
traps:['« Il fait +15 °C donc pas de givrage » est faux pour le carburateur.','Sous un Cb, l’air est parfois calme au premier abord, mais les rafales peuvent arriver d’un coup.'],
qs:[
['Quel est l’effet principal du givrage sur une aile ?','Le profil se dégrade : portance diminuée, traînée et masse augmentées','La portance augmente fortement','La vitesse de décrochage baisse','Aucun effet tant que le moteur tourne','Le givre déforme l’aile et l’alourdit : l’avion décroche plus tôt et vole moins bien.'],
['Dans quelles conditions le carburateur peut-il givrer ?','Même par temps doux, avec une forte humidité','Seulement par température négative','Seulement au-dessus de 5 000 m','Seulement par temps sec','La détente de l’air et la vaporisation du carburant refroidissent fortement le carburateur : il peut givrer même à +15 °C si l’air est humide.'],
['Que faire en présence d’un cumulonimbus sur sa route ?','Le contourner largement ou se dérouter','Le traverser à grande vitesse','Voler juste sous sa base','Monter au-dessus en palier','Le Cb est un danger majeur (turbulence, grêle, givrage, foudre). On l’évite largement.'],
['Un cisaillement de vent est :','une variation brusque du vent en vitesse ou en direction sur une courte distance','un vent constant dans la journée','un nuage bas en forme de lame','l’inclinaison des ailes en virage','C’est un changement soudain du vent. À l’atterrissage, il peut faire perdre brutalement de la vitesse.']
]});

C.push({id:'1-6', th:'t1', title:'Informations météo : METAR, TAF, cartes', min:16,
goals:['lire un METAR groupe par groupe','distinguer observation (METAR) et prévision (TAF)','citer les principales cartes et messages d’information météo'],
body:`
<p>Avant chaque vol, le pilote consulte la météo. Les messages sont écrits dans un code international, très compact, qu’il faut savoir décoder.</p>
<h2>METAR : l’observation d’un aérodrome</h2>
<p>Un METAR est un message qui décrit la météo <b>observée</b> sur un aérodrome, écrit dans un code abrégé. Il est publié toutes les 30 minutes ou toutes les heures. Il se lit toujours dans le même ordre :</p>
<div class="figslot" data-fig="metar"></div>
<p class="formule">METAR LFBO 061830Z 24012G25KT 9999 SCT030 BKN080 12/08 Q1015 NOSIG</p>
<div class="tw"><table><tr><th>Groupe</th><th>Signification</th></tr>
<tr><td>LFBO</td><td>Aérodrome (code OACI) : ici Toulouse-Blagnac</td></tr>
<tr><td>061830Z</td><td>Jour 06, 18 h 30 UTC</td></tr>
<tr><td>24012G25KT</td><td>Vent de 240°, 12 nœuds, rafales à 25 nœuds</td></tr>
<tr><td>9999</td><td>Visibilité de 10 km ou plus</td></tr>
<tr><td>SCT030 BKN080</td><td>Nuages épars à 3 000 ft, fragmentés à 8 000 ft (plafond)</td></tr>
<tr><td>12/08</td><td>Température 12 °C, point de rosée 8 °C</td></tr>
<tr><td>Q1015</td><td>QNH 1 015 hPa</td></tr>
<tr><td>NOSIG</td><td>Pas de changement significatif prévu</td></tr></table></div>
<div class="callout en-clair"><b>En clair</b>Les nuages sont toujours donnés en nombre d’octas puis en hauteur en centaines de pieds au-dessus de l’aérodrome : BKN020 = 5 à 7 octas à 2 000 ft.</div>
<p>Quelques abréviations utiles : <b>CAVOK</b> (visibilité ≥ 10 km, pas de nuage sous 5 000 ft ni de Cb, pas de phénomène significatif), <b>RA</b> pluie, <b>SN</b> neige, <b>TS</b> orage, <b>FG</b> brouillard, <b>BR</b> brume, <b>+</b> fort, <b>−</b> faible, <b>BECMG</b> évolution durable, <b>TEMPO</b> variation temporaire.</p>
<p>Décode des messages réels en touchant chaque groupe :</p>
<div class="simslot" data-sim="metar"></div>
<h2>TAF : la prévision d’un aérodrome</h2>
<p>Le <dfn>TAF</dfn> est une <b>prévision</b> pour un aérodrome, sur 9 à 30 heures selon l’aérodrome. Il utilise le même code que le METAR, avec des groupes d’évolution (BECMG, TEMPO, PROB). Règle simple : <b>METAR = ce qui est ; TAF = ce qui sera</b>.</p>
<h2>Autres sources</h2>
<ul><li><b>Cartes de pression au sol</b> (analyse) : isobares, fronts, centres d’action.</li><li><b>Cartes de temps significatif</b> (TEMSI) : phénomènes dangereux prévus (orages, givrage, turbulence), nébulosité, fronts.</li><li><b>WINTEM</b> : vent et température en altitude.</li><li><b>Images satellite et radar</b> : nuages et précipitations en temps quasi réel.</li><li><b>SIGMET</b> : message d’alerte sur les phénomènes dangereux en route.</li><li><b>Météo-France</b> est le service météorologique national.</li></ul>
<div class="callout attention"><b>Attention</b>Les heures météo sont toutes en <b>UTC</b>, notée Z. En France, l’heure locale est UTC + 1 l’hiver et UTC + 2 l’été.</div>
`,
keep:['METAR : observation ; TAF : prévision.','Ordre du METAR : aérodrome, date-heure UTC, vent, visibilité, temps, nuages, T/Td, QNH, tendance.','27015G25KT : 270°, 15 kt, rafales 25 kt. 9999 : visibilité ≥ 10 km. Q1015 : QNH 1 015 hPa.','BKN/OVC = plafond. Nuages en centaines de pieds au-dessus de l’aérodrome.','CAVOK : bonnes conditions (visibilité ≥ 10 km, pas de nuage sous 5 000 ft).'],
traps:['Les hauteurs de nuages du METAR sont en pieds, au-dessus de l’aérodrome, pas au-dessus du niveau de la mer.','Ne confonds pas BECMG (changement durable) et TEMPO (passager).'],
qs:[
['Que signifie « 27015G25KT » dans un METAR ?','Vent de 270°, 15 nœuds, rafales à 25 nœuds','Vent de 150°, 27 nœuds, rafales à 25 nœuds','Visibilité de 27 km','Vent de 25 nœuds venant du 015°','Les trois premiers chiffres donnent la direction d’où vient le vent, les deux suivants la vitesse, puis G pour les rafales.'],
['Quelle est la différence entre un METAR et un TAF ?','Le METAR est une observation, le TAF est une prévision','Le METAR est une prévision, le TAF est une observation','Le METAR concerne les nuages, le TAF le vent','Aucune différence','METAR = ce qui est observé maintenant ; TAF = ce qui est prévu.'],
['Dans « Q1018 », que représente 1018 ?','Le QNH en hPa','La visibilité en mètres','L’heure en UTC','La température en dixièmes de degré','Q suivi de quatre chiffres : le calage altimétrique QNH en hectopascals.'],
['Que signifie BKN020 ?','5 à 7 octas de nuages à 2 000 ft','Brouillard de 20 m','Vent de 20 nœuds','Nuages épars à 20 000 ft','BKN = 5 à 7 octas (fragmenté, donc un plafond). 020 = 2 000 ft.'],
['Que signifie CAVOK ?','Visibilité ≥ 10 km, pas de nuage sous 5 000 ft ni de Cb, pas de phénomène significatif','Ciel couvert avec visibilité inférieure à 5 km','Orage à proximité','Visibilité verticale réduite','CAVOK est une expression qui regroupe de bonnes conditions pour le vol à vue.']
]});
})();
