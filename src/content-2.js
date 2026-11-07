(function(){
const C = window.BIA.chapters;

C.push({id:'2-1', th:'t2', title:'Aérostatique : pourquoi un ballon monte', min:12,
goals:['énoncer le principe d’Archimède et l’appliquer à un ballon','distinguer montgolfière, ballon à gaz et dirigeable','expliquer comment un pilote de ballon monte, descend et choisit sa direction'],
body:`
<p>Un ballon vole sans aile, sans moteur et sans vitesse. Il est « plus léger que l’air » : on dit que c’est un <b>aérostat</b>. Ce qui le soutient s’appelle la poussée d’Archimède.</p>
<h2>Le principe d’Archimède</h2>
<div class="callout en-clair"><b>Principe</b>Tout corps plongé dans un fluide subit une poussée verticale, dirigée vers le haut, égale au <b>poids du volume de fluide qu’il déplace</b>.</div>
<p>Un ballon déplace un grand volume d’air. L’air qu’il pousse pèse, par exemple, 3 400 kg. Si le ballon avec son enveloppe, sa nacelle, son gaz et ses passagers pèse moins que cela, il monte. S’il pèse plus, il descend. S’ils sont égaux, il flotte à une altitude stable.</p>
<div class="figslot" data-fig="archimede"></div>
<h2>Deux façons d’être plus léger que l’air</h2>
<div class="tw"><table><tr><th></th><th>Montgolfière (air chaud)</th><th>Ballon à gaz (charlière)</th></tr><tr><td>Principe</td><td>On chauffe l’air de l’enveloppe : il devient moins dense que l’air extérieur</td><td>On remplit l’enveloppe d’un gaz plus léger que l’air : hélium ou hydrogène</td></tr><tr><td>Enveloppe</td><td>Ouverte à la base (le brûleur est dessous)</td><td>Fermée</td></tr><tr><td>Monter</td><td>Chauffer avec le brûleur (propane)</td><td>Lâcher du lest (sable, eau)</td></tr><tr><td>Descendre</td><td>Cesser de chauffer, ouvrir la soupape pour libérer de l’air chaud</td><td>Lâcher un peu de gaz par la soupape</td></tr></table></div>
<div class="simslot" data-sim="balloon"></div>
<h2>Le pilote ne peut pas « conduire » horizontalement</h2>
<p>Le ballon n’a ni moteur ni gouvernail. Il se déplace avec le vent, à la même vitesse que lui. Le pilote ne contrôle que l’<b>altitude</b>. Pour changer de direction, il monte ou descend pour trouver une couche d’air dont le vent est orienté comme il le souhaite.</p>
<h2>Les dirigeables</h2>
<p>Un <dfn>dirigeable</dfn> est un aérostat auquel on a ajouté une <b>propulsion</b> et des <b>gouvernes</b> : il peut avancer et se diriger. Il est rempli d’un gaz porteur (aujourd’hui de l’hélium). Le dirigeable <b>Hindenburg</b> rempli d’hydrogène, gaz inflammable, a pris feu en 1937 ; depuis, on utilise de l’hélium, inerte.</p>
<h2>Autres usages</h2>
<p>Les <b>ballons-sondes</b> mesurent pression, température, humidité et vent jusqu’à 30 km d’altitude : la météo en dépend. Les ballons stratosphériques servent à l’astronomie ou aux télécommunications.</p>
`,
keep:['Archimède : la poussée est égale au poids du volume d’air déplacé.','Le ballon monte si son poids total est inférieur à la poussée.','Montgolfière : monter = chauffer ; descendre = ouvrir la soupape. Ballon à gaz : monter = lâcher du lest.','Le pilote contrôle l’altitude, pas la direction : il choisit une couche de vent.','Dirigeable = ballon + propulsion + gouvernes.'],
traps:['L’air chaud ne « monte pas tout seul » à lui seul : c’est parce qu’il est moins dense que l’air extérieur qu’une poussée d’Archimède s’exerce sur l’ensemble.','Hélium et hydrogène sont plus légers que l’air, mais l’hydrogène est inflammable.'],
qs:[
['La poussée d’Archimède exercée sur un ballon est égale :','au poids du volume d’air qu’il déplace','au poids du gaz qu’il contient','à la force du vent','à la masse de l’enveloppe','C’est le principe d’Archimède : la poussée est égale au poids du fluide déplacé.'],
['Pour descendre, le pilote d’une montgolfière doit :','laisser refroidir l’air ou ouvrir la soupape','allumer le brûleur plus fort','lâcher du lest','tourner la nacelle','En libérant de l’air chaud, le ballon perd de la poussée : le poids l’emporte, il descend.'],
['Pour monter, le pilote d’un ballon à gaz (charlière) :','lâche du lest','ouvre la soupape','chauffe le gaz','ouvre l’enveloppe en bas','En allégeant le ballon (sable, eau), le poids diminue et la poussée l’emporte.'],
['Comment le pilote d’un ballon modifie-t-il sa direction ?','En changeant d’altitude pour trouver une couche de vent adaptée','En actionnant un gouvernail','En inclinant la nacelle','En allumant des hélices','Le ballon n’a ni moteur ni gouvernail : il suit le vent, qui change souvent avec l’altitude.'],
['Quel gaz utilise-t-on aujourd’hui pour les dirigeables, car il n’est pas inflammable ?','L’hélium','L’hydrogène','Le propane','Le méthane','L’hélium est léger et inerte. L’hydrogène, lui, brûle : c’est ce qui a causé la catastrophe du Hindenburg.']
]});

C.push({id:'2-2', th:'t2', title:'L’air en mouvement : pressions et vitesses', min:15,
goals:['distinguer pression statique, dynamique et totale','énoncer le théorème de Bernoulli et expliquer le tube de Venturi','différencier vitesse indiquée, vitesse propre, vitesse sol et nombre de Mach'],
body:`
<p>Pour comprendre la portance, il faut d’abord comprendre ce que fait l’air quand il bouge autour d’un objet. Trois idées suffisent.</p>
<h2>Trois pressions</h2>
<ul><li><dfn>Pression statique</dfn> : celle de l’air ambiant, qui s’exerce dans toutes les directions. C’est la pression atmosphérique.</li><li><dfn>Pression dynamique</dfn> : due au mouvement de l’air. Elle vaut <b>½ × ρ × V²</b> (ρ = masse volumique, V = vitesse).</li><li><dfn>Pression totale</dfn> = statique + dynamique. On la mesure en arrêtant l’air face à une prise (tube de Pitot).</li></ul>
<p class="formule">q = ½ × ρ × V²</p>
<p>La pression dynamique augmente avec le <b>carré</b> de la vitesse : à vitesse double, elle est multipliée par 4.</p>
<h2>Bernoulli : accélérer, c’est perdre de la pression statique</h2>
<div class="callout en-clair"><b>Théorème de Bernoulli</b>Dans un écoulement d’air sans frottement, quand la vitesse <b>augmente</b>, la pression <b>statique</b> <b>diminue</b> (la pression totale reste constante).</div>
<p>Le tube de Venturi le montre bien : l’air est forcé de passer par un rétrécissement. Comme pour l’eau d’un tuyau d’arrosage que l’on pince avec le pouce, l’air doit aller plus vite là où le passage est étroit (c’est l’équation de continuité). Résultat : la pression statique y baisse.</p>
<div class="figslot" data-fig="venturi"></div>
<div class="simslot" data-sim="venturi"></div>
<h2>Comment l’avion mesure sa vitesse</h2>
<p>Le <b>tube de Pitot</b> capte la pression totale ; des prises statiques captent la pression statique. L’<b>anémomètre</b> fait la différence : c’est la pression dynamique, donc la vitesse. Si le Pitot gèle, l’anémomètre devient faux : il est chauffé en vol.</p>
<h2>Quatre vitesses à ne pas confondre</h2>
<div class="tw"><table><tr><th>Vitesse</th><th>Sens</th></tr><tr><td><dfn>Vitesse indiquée</dfn> (IAS)</td><td>Ce que lit le pilote sur l’anémomètre</td></tr><tr><td><dfn>Vitesse propre</dfn> (TAS)</td><td>Vitesse réelle de l’avion dans l’air. En altitude, elle est plus grande que la vitesse indiquée (l’air est moins dense).</td></tr><tr><td><dfn>Vitesse sol</dfn> (GS)</td><td>Vitesse par rapport au sol = vitesse propre corrigée du vent. Vent de face : GS &lt; TAS ; vent arrière : GS &gt; TAS.</td></tr><tr><td><dfn>Nombre de Mach</dfn></td><td>Rapport de la vitesse de l’avion à la vitesse du son. Mach 1 = vitesse du son (≈ 340 m/s, soit 1 225 km/h au niveau de la mer en ISA ; ≈ 1 060 km/h à 11 000 m car il y fait plus froid).</td></tr></table></div>
<p>Régimes de vol : subsonique (&lt; Mach 0,8), transsonique (0,8 à 1,2), supersonique (&gt; 1,2). Passer le mur du son produit une onde de choc, perçue au sol comme un <b>bang</b>.</p>
<h2>La couche limite</h2>
<p>L’air colle à la surface de l’avion : tout près, il est ralenti par frottement. Cette mince couche d’air est la couche limite. Elle est d’abord régulière (laminaire : l’air glisse en filets bien rangés), puis devient turbulente (il tourbillonne). Quand elle se détache de l’aile, on parle de décollement : c’est le début du décrochage.</p>
`,
keep:['Pression dynamique : q = ½ρV². À vitesse double, ×4.','Pression totale = statique + dynamique.','Bernoulli : vitesse ↑ ⇒ pression statique ↓.','L’anémomètre indique la vitesse indiquée ; en altitude la vitesse propre est plus élevée.','Vent de face : vitesse sol inférieure à la vitesse propre.'],
traps:['Ne confonds pas pression dynamique (liée au mouvement) et pression totale.','Mach 1 n’est pas une vitesse fixe : elle dépend de la température.'],
qs:[
['Selon le théorème de Bernoulli, quand la vitesse d’un écoulement augmente :','la pression statique diminue','la pression statique augmente','la pression totale diminue fortement','la température de l’air chute à 0 °C','Dans un écoulement sans frottement, la somme pression statique + pression dynamique reste constante : si l’une monte, l’autre baisse.'],
['La pression totale est égale à :','la pression statique plus la pression dynamique','la pression statique moins la pression dynamique','la pression dynamique seule','la pression atmosphérique au sol','La prise Pitot mesure la pression totale = statique + dynamique.'],
['À haute altitude, comparée à la vitesse indiquée, la vitesse propre est :','plus grande','plus petite','égale','nulle','L’air est moins dense : pour une même vitesse indiquée (même pression dynamique), l’avion va plus vite dans l’air.'],
['Un avion vole à 100 kt de vitesse propre avec un vent de face de 20 kt. Sa vitesse sol est de :','80 kt','120 kt','100 kt','20 kt','GS = TAS − vent de face = 100 − 20 = 80 kt.'],
['Le nombre de Mach est :','le rapport de la vitesse de l’avion à la vitesse du son','la vitesse du son en km/h','la vitesse maximale d’un avion','la vitesse du vent en altitude','Mach 0,8 : l’avion va à 80 % de la vitesse du son locale.']
]});

C.push({id:'2-3', th:'t2', title:'L’aile : portance, traînée, décrochage', min:20,
goals:['décrire un profil d’aile et définir l’incidence','relier la portance à la vitesse, à la surface et à l’incidence','expliquer le décrochage, la finesse et les dispositifs hypersustentateurs'],
body:`
<p>L’aile est le cœur de l’avion. Elle crée la <b>portance</b>, la force qui soutient l’appareil, en échange d’une inévitable <b>traînée</b>.</p>
<h2>Vocabulaire du profil</h2>
<ul><li><dfn>Bord d’attaque</dfn> : l’avant de l’aile ; <dfn>bord de fuite</dfn> : l’arrière.</li><li><dfn>Extrados</dfn> : le dessus ; <dfn>intrados</dfn> : le dessous.</li><li><dfn>Corde</dfn> : ligne droite du bord d’attaque au bord de fuite.</li><li><dfn>Vent relatif</dfn> : l’air vu depuis l’aile, de direction opposée à la trajectoire.</li><li><dfn>Incidence</dfn> : angle entre la corde et le vent relatif.</li></ul>
<div class="callout attention"><b>Incidence, assiette, pente</b>Ce sont trois angles différents. L’<b>assiette</b> est l’angle du fuselage avec l’horizon. La <b>pente</b> est l’angle de la trajectoire avec l’horizon. Et <b>incidence = assiette − pente</b>.</div>
<h2>Pourquoi l’aile porte</h2>
<p>L’aile <b>dévie l’air vers le bas</b> ; par réaction, l’air pousse l’aile vers le haut. En même temps, l’air accélère sur l’extrados, la pression statique y baisse (Bernoulli) et cette <b>dépression</b> « aspire » l’aile vers le haut ; en dessous, la pression augmente légèrement. Toutes ces petites forces de pression s’additionnent en une seule force : la résultante aérodynamique. On la décompose en :</p>
<div class="figslot" data-fig="airfoil"></div>
<ul><li>la <b>portance</b> (Fz), perpendiculaire au vent relatif ;</li><li>la <b>traînée</b> (Fx), parallèle au vent relatif et qui s’oppose à l’avancement.</li></ul>
<p class="formule">Portance = ½ × ρ × S × V² × Cz</p>
<p>ρ : masse volumique de l’air ; S : surface de l’aile ; V : vitesse ; Cz : coefficient de portance, qui dépend du profil et de l’incidence. Ce que cette formule apprend : la portance est proportionnelle à la <b>surface</b>, à la <b>densité</b> de l’air, et au <b>carré de la vitesse</b>.</p>
<div class="simslot" data-sim="wing"></div>
<h2>Le décrochage</h2>
<p>Quand on augmente l’incidence, Cz augmente… jusqu’à l’<dfn>incidence critique</dfn> (environ 15° sur un avion léger). Au-delà, l’air n’arrive plus à suivre l’extrados : il se <b>décolle</b>, la portance chute, la traînée explose. C’est le <b>décrochage</b>.</p>
<div class="figslot" data-fig="stall"></div>
<ul><li>Le décrochage dépend de l’<b>incidence</b>, pas directement de la vitesse : on peut décrocher à n’importe quelle vitesse, dans n’importe quelle attitude (virage, forte accélération).</li><li><b>Signes avant-coureurs</b> : avertisseur de décrochage, vibrations (buffeting), commandes molles, avion qui s’enfonce.</li><li><b>Récupération</b> : <b>diminuer l’incidence</b> (manche vers l’avant), remettre de la puissance, redresser progressivement.</li><li>La vitesse de décrochage <b>augmente</b> avec la masse, le facteur de charge (virage) et le givrage ; elle <b>diminue</b> avec les volets sortis.</li></ul>
<h2>La traînée</h2>
<ul><li><b>Traînée parasite</b> : forme, frottement, interférences. Elle augmente avec la vitesse (au carré).</li><li><b>Traînée induite</b> : c’est le « prix à payer » pour obtenir de la portance. Elle vient des tourbillons qui se forment au bout des ailes (tourbillons marginaux). Elle est plus forte à basse vitesse, forte incidence. Les winglets la réduisent.</li></ul>
<h2>La finesse</h2>
<p>La finesse est le rapport portance/traînée (Cz/Cx) : elle dit combien de portance tu obtiens pour chaque unité de traînée. C’est aussi la distance parcourue en vol plané pour une hauteur perdue. Un planeur de finesse 40 parcourt 40 km depuis 1 000 m d’altitude (air calme). Un avion de ligne a une finesse d’environ 17, un avion léger de 9 à 10.</p>
<h2>Volets, becs, aérofreins</h2>
<p>Les <b>volets</b> et les <b>becs</b> sont des dispositifs hypersustentateurs (des dispositifs qui augmentent la portance) : ils augmentent Cz, le coefficient de portance, et permettent de voler plus lentement au décollage et à l’atterrissage. Les <b>aérofreins</b> et <b>spoilers</b> augmentent la traînée et diminuent la portance pour descendre ou ralentir.</p>
`,
keep:['Incidence : angle entre la corde et le vent relatif ; incidence = assiette − pente.','Portance = ½ρSV²Cz : proportionnelle à S, ρ, V² et Cz.','Décrochage : incidence trop grande (≈ 15°), écoulement décollé. Le remède : diminuer l’incidence.','Finesse = portance/traînée = distance parcourue / hauteur perdue.','Les volets augmentent la portance et réduisent la vitesse de décrochage.'],
traps:['Le décrochage n’est pas une « vitesse trop faible » seulement : c’est une incidence trop élevée.','Idée fausse très répandue : « l’air met le même temps au-dessus et en dessous ». Ce n’est pas ce qui crée la portance.'],
qs:[
['L’incidence d’une aile est l’angle entre :','la corde du profil et le vent relatif','le fuselage et l’horizon','la trajectoire et l’horizon','l’aile et le fuselage','C’est l’angle entre la corde et la direction du vent relatif. Le fuselage et l’horizon, c’est l’assiette.'],
['Le décrochage se produit quand :','l’incidence dépasse l’incidence critique','la vitesse dépasse la vitesse maximale','le moteur s’arrête','les volets sont rentrés','Au-delà de l’incidence critique, l’écoulement se décolle de l’extrados et la portance chute.'],
['Si la vitesse double (autres paramètres inchangés), la portance :','est multipliée par 4','est multipliée par 2','reste identique','est divisée par 2','La portance est proportionnelle au carré de la vitesse : 2² = 4.'],
['Un planeur de finesse 30 part de 1 000 m d’altitude en air calme. Il peut parcourir environ :','30 km','3 km','300 km','10 km','Finesse = distance / hauteur : 30 × 1 000 m = 30 km.'],
['Pour récupérer d’un décrochage, il faut avant tout :','diminuer l’incidence','tirer sur le manche','couper le moteur','sortir les aérofreins','On diminue l’incidence (manche vers l’avant) pour que l’écoulement se recolle, puis on remet de la puissance.']
]});

C.push({id:'2-4', th:'t2', title:'Les quatre forces et les performances', min:16,
goals:['nommer les quatre forces et les conditions du vol en palier','expliquer la montée, la descente et le vol plané','comprendre l’effet de la masse et du centrage'],
body:`
<p>Un avion en vol subit toujours quatre forces. Tout ce que fait un pilote revient à les équilibrer ou à les déséquilibrer exprès.</p>
<h2>Les quatre forces</h2>
<div class="tw"><table><tr><th>Force</th><th>Origine</th><th>Direction</th></tr><tr><td><dfn>Poids</dfn> (P)</td><td>Gravité, appliquée au centre de gravité</td><td>Verticale, vers le bas</td></tr><tr><td><dfn>Portance</dfn> (Fz)</td><td>Aile</td><td>Perpendiculaire à la trajectoire, vers le haut</td></tr><tr><td><dfn>Traction</dfn> (T)</td><td>Hélice ou réacteur</td><td>Dans l’axe, vers l’avant</td></tr><tr><td><dfn>Traînée</dfn> (Fx)</td><td>Résistance de l’air</td><td>Parallèle à la trajectoire, vers l’arrière</td></tr></table></div>
<p>En <b>palier stabilisé</b> (vol horizontal à vitesse constante) : <b>portance = poids</b> et <b>traction = traînée</b>. Si les forces ne s’équilibrent pas, l’avion accélère, ralentit, monte ou descend.</p>
<div class="figslot" data-fig="forces"></div>
<div class="simslot" data-sim="flight"></div>
<div class="simslot" data-sim="forces"></div>
<h2>Montée, descente, plané</h2>
<ul><li><b>Montée</b> : la traction doit compenser la traînée <b>et</b> la part du poids qui retient l’avion. La vitesse de montée dépend de la <b>puissance en excès</b>, pas de l’assiette seule.</li><li><b>Descente moteur réduit</b> : une part du poids aide à avancer.</li><li><b>Vol plané</b> (planeur ou moteur coupé) : la traction est nulle ; la composante du poids selon la trajectoire équilibre la traînée. La pente de plané dépend de la finesse. La meilleure finesse donne la plus grande <b>distance</b>.</li></ul>
<div class="callout en-clair"><b>En clair</b>Un avion en panne de moteur est un planeur. C’est pourquoi on apprend à planer jusqu’à un champ : choisir la vitesse de meilleure finesse, puis un terrain.</div>
<h2>Masse et centrage</h2>
<ul><li>Plus l’avion est <b>lourd</b>, plus il faut de portance : la vitesse de décrochage augmente, le décollage est plus long, la montée plus lente.</li><li>Le <b>centre de gravité</b> doit rester dans des limites : trop avant, l’avion est lourd à cabrer ; trop arrière, il devient instable et difficile à redresser en cas de décrochage. D’où le calcul du devis de masse et centrage avant chaque vol.</li></ul>
<h2>Vitesses repères</h2>
<p><b>Vs</b> : vitesse de décrochage. <b>Vfe</b> : vitesse maximale volets sortis. <b>Vno</b> : limite de l’utilisation normale. <b>Vne</b> : vitesse à ne jamais dépasser. L’anémomètre les code en couleurs (arc blanc, arc vert, arc jaune, trait rouge).</p>
<h2>Facteur de charge</h2>
<p>Le <dfn>facteur de charge</dfn> n est le rapport portance / poids. Il vaut 1 en palier. Il augmente en virage, quand on redresse l’avion après un piqué (la « ressource ») et en turbulence, jusqu’à une limite de structure (par exemple +3,8 g pour un avion de catégorie normale).</p>
`,
keep:['Palier : portance = poids ; traction = traînée.','En montée : traction = traînée + composante du poids.','Vol plané : sans traction, la pente dépend de la finesse.','Avion plus lourd : vitesse de décrochage et distances plus grandes.','Facteur de charge n = portance / poids (1 g en palier).'],
traps:['Monter ne se fait pas seulement en tirant sur le manche : il faut de la puissance en excès.','Centre de gravité trop arrière : plus de maniabilité apparente mais risque d’instabilité.'],
qs:[
['Pour un avion en vol rectiligne horizontal à vitesse constante :','portance = poids et traction = traînée','portance > poids et traction > traînée','portance = traînée et poids = traction','portance < poids','Le palier stabilisé est un équilibre : les forces verticales s’annulent entre elles, ainsi que les forces horizontales.'],
['Quand la masse de l’avion augmente, la vitesse de décrochage :','augmente','diminue','reste identique','devient nulle','Plus de poids exige plus de portance : il faut voler plus vite ou à plus forte incidence.'],
['En vol plané, qu’est-ce qui remplace la traction ?','La composante du poids le long de la trajectoire','La portance','La traînée','Le vent relatif','Sans moteur, c’est la pente de descente et donc une partie du poids qui fournit l’énergie pour avancer.'],
['Un centre de gravité trop arrière rend l’avion :','moins stable','plus stable','plus lourd à cabrer','sans effet','Si le centre de gravité recule, l’avion devient instable en tangage et plus difficile à récupérer.'],
['Le facteur de charge est le rapport :','portance / poids','poids / portance','traction / traînée','vitesse / vitesse du son','n = portance / poids. En palier stabilisé, n = 1.']
]});

C.push({id:'2-5', th:'t2', title:'Commandes, stabilité et virage', min:18,
goals:['relier chaque axe à sa gouverne et à sa commande','expliquer le virage, le facteur de charge et la vitesse de décrochage en virage','citer les éléments qui assurent la stabilité'],
body:`
<p>Un avion peut tourner autour de trois axes qui passent tous par son centre de gravité. Chaque axe a sa gouverne et sa commande.</p>
<h2>Trois axes, trois commandes</h2>
<div class="tw"><table><tr><th>Mouvement</th><th>Axe</th><th>Gouverne</th><th>Commande</th></tr><tr><td><dfn>Tangage</dfn> (nez haut / bas)</td><td>Transversal</td><td>Profondeur</td><td>Manche avant / arrière</td></tr><tr><td><dfn>Roulis</dfn> (inclinaison des ailes)</td><td>Longitudinal</td><td>Ailerons</td><td>Manche à gauche / droite</td></tr><tr><td><dfn>Lacet</dfn> (nez à gauche / droite)</td><td>Vertical</td><td>Direction</td><td>Palonnier (pédales)</td></tr></table></div>
<p>La manette des gaz commande la puissance. Le <b>compensateur</b> (trim) soulage la pression sur le manche pour garder l’assiette sans effort.</p>
<div class="figslot" data-fig="axes"></div>
<div class="simslot" data-sim="controls"></div>
<h2>Le virage</h2>
<p>Pour tourner, on <b>incline</b> les ailes. La portance, perpendiculaire aux ailes, se décompose en deux : une composante <b>verticale</b> qui soutient l’avion, et une composante <b>horizontale</b> qui le fait tourner. La composante verticale est plus petite que la portance totale : pour rester en palier il faut donc <b>augmenter la portance</b>, en tirant légèrement sur le manche.</p>
<div class="figslot" data-fig="bank"></div>
<p class="formule">n = 1 / cos(inclinaison)</p>
<ul><li>À 60° d’inclinaison, n = 2 : l’avion et ses occupants « pèsent » deux fois plus.</li><li>La vitesse de décrochage est multipliée par √n (la racine carrée de n) : à 60°, n = 2 et √2 ≈ 1,4, donc la vitesse de décrochage est 40 % plus élevée. On peut donc décrocher en virage serré à une vitesse où l’on volait très bien en palier.</li></ul>
<div class="simslot" data-sim="turn"></div>
<p>Un <b>virage coordonné</b> est un virage sans dérapage : la <b>bille</b> de l’indicateur de virage est au centre. On l’obtient en actionnant ensemble manche (roulis) et palonnier (lacet).</p>
<h2>Stabilité</h2>
<ul><li>L’<b>empennage horizontal</b> stabilise le tangage ; la <b>dérive</b> stabilise le lacet ; le dièdre des ailes (ailes légèrement relevées en V, comme un oiseau qui plane) stabilise le roulis.</li><li>Un <b>avion stable</b> revient de lui-même vers son équilibre après une perturbation.</li><li>Le <b>centre de gravité</b> bien placé est essentiel à la stabilité.</li></ul>
<h2>La vrille</h2>
<p>La vrille est un décrochage où une aile décroche plus que l’autre : l’avion tourne sur lui-même en descendant. En sortie : réduire les gaz, contrer la rotation au palonnier, manche vers l’avant pour diminuer l’incidence, puis redresser en douceur.</p>
`,
keep:['Tangage : profondeur / manche avant-arrière. Roulis : ailerons / manche latéral. Lacet : direction / palonnier.','Virage : on incline, la portance se décompose, il faut en augmenter la valeur.','Facteur de charge en virage n = 1/cos φ ; à 60°, n = 2.','Vitesse de décrochage en virage : Vs × √n.','Virage coordonné : bille centrée.'],
traps:['Le palonnier ne sert pas à tourner : il sert à coordonner le virage et à contrôler le lacet.','Le facteur de charge ne dépend pas de la vitesse, seulement de l’inclinaison en virage en palier.'],
qs:[
['La gouverne de profondeur commande le mouvement autour de l’axe :','transversal (tangage)','longitudinal (roulis)','vertical (lacet)','de dérive','La profondeur agit sur le tangage : nez vers le haut ou vers le bas.'],
['Les ailerons commandent :','le roulis','le tangage','le lacet','la puissance','En actionnant le manche à gauche ou à droite, on incline l’avion autour de son axe longitudinal.'],
['Dans un virage en palier incliné à 60°, le facteur de charge vaut :','2','1','1,4','4','n = 1/cos 60° = 1/0,5 = 2.'],
['Dans un virage serré, la vitesse de décrochage :','augmente','diminue','reste identique','devient nulle','Elle est multipliée par la racine carrée du facteur de charge.'],
['Le palonnier agit directement sur :','la gouverne de direction (lacet)','les ailerons','la gouverne de profondeur','les volets','Le palonnier (pédales) pilote la gouverne de direction, donc le lacet.']
]});
})();
