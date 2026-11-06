(function(){
const C = window.BIA.chapters;

C.push({id:'4-1', th:'t4', title:'Se repérer : Terre, cartes et unités', min:14,
goals:['se repérer avec latitude et longitude','utiliser les unités de l’aviation : mille nautique, nœud, pied','lire une échelle de carte et convertir l’heure locale en UTC'],
body:`
<h2>La Terre et ses repères</h2>
<p>La Terre est quasiment une sphère, légèrement aplatie aux pôles. Pour y situer un point, on utilise deux angles :</p>
<div class="figslot" data-fig="latlon"></div>
<ul><li>la <dfn>latitude</dfn> : de 0° (équateur) à 90° nord ou sud (pôles). Les lignes de même latitude sont les <b>parallèles</b> ;</li><li>la <dfn>longitude</dfn> : de 0° (méridien de Greenwich) à 180° est ou ouest. Les lignes de même longitude sont les <b>méridiens</b>.</li></ul>
<p>Toulouse se trouve environ à 43,6° N, 1,4° E.</p>
<h2>Les unités de l’aviation</h2>
<div class="tw"><table><tr><th>Grandeur</th><th>Unité</th><th>Équivalence</th></tr><tr><td>Distance</td><td>Mille nautique (NM)</td><td>1 NM = 1 852 m = 1 minute d’arc de latitude</td></tr><tr><td>Vitesse</td><td>Nœud (kt)</td><td>1 kt = 1 NM/h = 1,852 km/h</td></tr><tr><td>Altitude</td><td>Pied (ft)</td><td>1 ft = 0,3048 m ; 1 000 ft ≈ 300 m</td></tr><tr><td>Pression</td><td>Hectopascal (hPa)</td><td>1 013,25 hPa en atmosphère standard</td></tr></table></div>
<div class="simslot" data-sim="conv"></div>
<div class="callout en-clair"><b>En clair</b>Le mille nautique est lié à la forme de la Terre : un degré de latitude fait 60 NM. Voilà pourquoi le calcul est facile sur une carte : 1° de latitude = 60 NM.</div>
<h2>La carte aéronautique</h2>
<p>Les pilotes VFR utilisent la carte <b>OACI au 1/500 000</b>, en <b>projection conique conforme de Lambert</b>. « Conforme » signifie que les angles sont conservés : on peut y mesurer une route avec un rapporteur. Sur cette carte, une ligne droite est une très bonne approximation du plus court chemin.</p>
<p class="formule">échelle 1/500 000 : 1 cm sur la carte = 5 km sur le terrain</p>
<p>On y lit : le relief (courbes de niveau et teintes), les aérodromes, les espaces aériens, les obstacles, les radiophares, des repères visuels (rivières, voies ferrées, lacs).</p>
<h2>Nord vrai, nord magnétique</h2>
<p>Le <b>nord vrai</b> est la direction du pôle géographique. Le <b>nord magnétique</b> est celui qu’indique le compas : il s’en écarte d’un petit angle, la <dfn>déclinaison magnétique</dfn> (faible en France métropolitaine, de l’ordre de 1 à 3°). On mesure une route sur la carte par rapport au nord vrai (route vraie), puis on la convertit en cap magnétique à afficher au compas.</p>
<div class="figslot" data-fig="northfig"></div>
<h2>L’heure en aviation : UTC</h2>
<p>Pour éviter les confusions entre fuseaux horaires, toutes les heures aéronautiques sont en <b>UTC</b> (temps universel coordonné), notée <b>Z</b>. En France, l’heure locale vaut <b>UTC + 1 l’hiver</b> et <b>UTC + 2 l’été</b>.</p>
<div class="callout exemple"><b>Exemple</b>Un décollage à 14 h 00 en été, heure locale, correspond à 12 h 00 UTC.</div>
`,
keep:['Latitude (0-90° N/S) et longitude (0-180° E/O).','1 NM = 1 852 m = 1 minute d’arc de latitude ; 1 kt = 1 NM/h = 1,852 km/h ; 1 ft = 0,3048 m.','Carte OACI : 1/500 000, projection de Lambert ; 1 cm = 5 km.','La déclinaison sépare nord vrai et nord magnétique.','UTC = heure locale − 1 h l’hiver, − 2 h l’été (en France).'],
traps:['Ne mélange pas NM et km : une erreur de 10 % sur la distance fausse tout le calcul de durée.','Les heures météo (METAR, TAF) et les plans de vol sont en UTC, pas en heure locale.'],
qs:[
['Un mille nautique (NM) vaut :','1 852 m','1 609 m','1 000 m','1 480 m','Un mille nautique correspond à une minute d’arc de latitude, soit 1 852 m.'],
['Sur une carte au 1/500 000, 4 cm représentent :','20 km','2 km','200 km','4 km','1 cm correspond à 5 km sur le terrain : 4 × 5 = 20 km.'],
['Une vitesse de 1 nœud est égale à :','1 mille nautique par heure','1 km par heure','1 mètre par seconde','1 pied par minute','Un nœud = 1 NM/h = 1,852 km/h.'],
['En France, en été, quand il est 14 h 00 à l’heure locale, il est en UTC :','12 h 00','13 h 00','15 h 00','16 h 00','L’été, l’heure locale est UTC + 2 : 14 h − 2 h = 12 h UTC.']
]});

C.push({id:'4-2', th:'t4', title:'Navigation à l’estime et vent', min:18,
goals:['définir route, cap, dérive, vitesse propre et vitesse sol','calculer durée et distance avec la formule temps = distance / vitesse','construire un triangle des vitesses pour corriger le vent'],
body:`
<p>Naviguer, c’est savoir où l’on est, où l’on va, et à quelle heure on y sera. La méthode de base est la navigation <b>à l’estime</b> : on part d’un point connu, on calcule le chemin parcouru à partir de la route, de la vitesse et du temps.</p>
<h2>Vocabulaire</h2>
<ul><li><dfn>Route</dfn> (Rv) : direction de la <b>trajectoire</b> de l’avion sur le sol, mesurée depuis le nord.</li><li><dfn>Cap</dfn> (Cv) : direction dans laquelle <b>pointe le nez</b> de l’avion.</li><li><dfn>Dérive</dfn> : angle entre le cap et la route, causé par le vent.</li><li><dfn>Vitesse propre</dfn> (TAS) : vitesse de l’avion dans l’air. <dfn>Vitesse sol</dfn> (GS) : vitesse par rapport au sol.</li></ul>
<h2>Temps, distance, vitesse</h2>
<p class="formule">t (min) = 60 × d (NM) / V (kt)</p>
<div class="callout exemple"><b>Exemple</b>Pour 60 NM à 120 kt de vitesse sol : t = 60 × 60 / 120 = 30 minutes. La consommation se calcule de la même façon : 30 litres par heure × 0,5 h = 15 litres.</div>
<h2>Le vent et le triangle des vitesses</h2>
<p>L’avion se déplace dans une masse d’air qui se déplace elle-même. Imagine un nageur qui traverse une rivière : s’il pointe droit vers l’autre rive, le courant l’entraîne. Pour arriver en face, il doit nager un peu en amont.</p>
<div class="figslot" data-fig="windtri"></div>
<p>Le <b>triangle des vitesses</b> assemble trois vecteurs : le vecteur air (cap et vitesse propre), le vecteur vent, et leur somme, le vecteur sol (route et vitesse sol). Pour une route et un vent donnés, on le résout pour trouver le <b>cap</b> à afficher et la <b>vitesse sol</b>.</p>
<div class="simslot" data-sim="nav"></div>
<ul><li>Le <b>vent de face</b> diminue la vitesse sol ; le <b>vent arrière</b> l’augmente.</li><li>Le <b>vent traversier</b> crée la dérive. Pour la compenser, on affiche un cap <b>du côté d’où vient le vent</b> par rapport à la route.</li><li>Exemple : route au nord (360°), vent d’ouest. Le vent pousse vers l’est. On affiche un cap un peu à gauche de la route, par exemple 350°.</li></ul>
<h2>La règle du 1 sur 60</h2>
<p>À 60 NM de distance, une erreur de cap de 1° produit un écart de <b>1 NM</b>. C’est une approximation très utile pour estimer rapidement une correction : si, à 30 NM du départ, tu as 2 NM d’écart, ton erreur de cap est d’environ 4°.</p>
<h2>Préparer un vol</h2>
<ol><li>Tracer la route sur la carte, choisir des points de repère.</li><li>Mesurer route et distance.</li><li>Récupérer le vent prévu, calculer cap, vitesse sol, durée.</li><li>Calculer le carburant (avec les réserves réglementaires, dont 30 minutes de vol à vue de jour minimum au-delà du terrain de destination).</li><li>Déposer un plan de vol si nécessaire, et prévenir un proche de l’heure d’arrivée.</li></ol>
<p>En vol, on vérifie la route par des <b>repères visuels</b> (rivière, route, ville) et on ajuste.</p>
`,
keep:['Route = trajectoire sur le sol ; cap = direction du nez ; dérive = angle entre les deux.','t = d / V : 60 NM à 120 kt de vitesse sol = 30 min.','Vent de face : vitesse sol plus faible ; vent arrière : plus forte.','Le cap se corrige du côté d’où vient le vent.','Règle du 1 sur 60 : 1° d’erreur = 1 NM d’écart pour 60 NM.'],
traps:['Cap et route sont différents dès qu’il y a du vent.','Le calcul de durée utilise la vitesse sol, pas la vitesse propre.'],
qs:[
['La dérive est l’angle entre :','le cap et la route','la route et le nord','le cap et le vent','le sol et l’horizon','Sans vent, cap = route. Avec du vent, la dérive les sépare.'],
['Un avion vole à 100 kt de vitesse propre avec 20 kt de vent de face. Sa vitesse sol est :','80 kt','120 kt','100 kt','20 kt','Le vent de face retranche 20 kt : 100 − 20 = 80 kt.'],
['Quelle est la durée d’un vol de 60 NM à 120 kt de vitesse sol ?','30 minutes','60 minutes','15 minutes','2 heures','t = 60 × 60 / 120 = 30 minutes.'],
['Route au 360°, vent d’ouest (270°). Pour tenir la route, le cap sera :','inférieur à 360° (par exemple 350°)','supérieur à 360° (par exemple 010°)','égal à 360°','180°','Le vent pousse vers l’est. On affiche un cap qui « remonte le vent », donc du côté ouest de la route.'],
['Selon la règle du 1 sur 60, une erreur de cap de 1° produit à 60 NM un écart de :','1 NM','6 NM','60 NM','0,1 NM','C’est la règle de base : 1° vaut environ 1 NM à 60 NM de distance.']
]});

C.push({id:'4-3', th:'t4', title:'Radionavigation et GNSS', min:12,
goals:['décrire VOR, NDB/ADF, DME, ILS','expliquer le principe du GNSS','citer les limites et la complémentarité des moyens'],
body:`
<p>La navigation à vue ne suffit plus quand la visibilité baisse ou que le voyage est long. Les aides à la navigation s’appuient sur des signaux radio.</p>
<h2>Les moyens classiques</h2>
<div class="figslot" data-fig="vor"></div>
<div class="tw"><table><tr><th>Moyen</th><th>Ce qu’il donne</th><th>Détails</th></tr>
<tr><td><dfn>VOR</dfn></td><td>Un <b>radial</b> : l’angle sous lequel on se trouve par rapport au nord magnétique de la balise</td><td>Ondes VHF (108-118 MHz). Précis, avec peu de perturbations</td></tr>
<tr><td><dfn>NDB / ADF</dfn></td><td>La <b>direction</b> de la balise (aiguille du radiocompas)</td><td>Ondes moyennes ; sensible aux orages. En voie de disparition</td></tr>
<tr><td><dfn>DME</dfn></td><td>La <b>distance</b> oblique à la station, en NM</td><td>Interrogation-réponse. Souvent associé à un VOR</td></tr>
<tr><td><dfn>ILS</dfn></td><td>Un <b>guidage vertical et horizontal</b> pour l’approche aux instruments</td><td>Le localizer donne l’axe de piste ; le glide donne le plan de descente (≈ 3°)</td></tr></table></div>
<div class="callout en-clair"><b>En clair</b>Un VOR est comme un phare qui émet 360 faisceaux : chaque faisceau a un numéro, c’est un radial. Si tu sais sur quel radial tu es, et à quelle distance (DME), tu sais où tu es.</div>
<h2>Le GNSS (navigation par satellite)</h2>
<p>Un récepteur GNSS reçoit les signaux de plusieurs satellites. Chaque signal contient l’heure d’émission et la position du satellite ; en comparant l’heure de réception, le récepteur calcule sa distance à chacun. Avec <b>au moins 4 satellites</b>, il détermine sa position en trois dimensions (latitude, longitude, altitude) et corrige son horloge.</p>
<div class="figslot" data-fig="gnss"></div>
<ul><li>Constellations : <b>GPS</b> (États-Unis), <b>Galileo</b> (Europe), GLONASS (Russie), BeiDou (Chine).</li><li>Les satellites sont en orbite moyenne (≈ 20 000 km).</li><li>Limites : brouillage, perturbations, panne. Un pilote doit toujours savoir naviguer sans GNSS (carte, repères, compas).</li></ul>
<h2>La surveillance</h2>
<p>Le <b>radar primaire</b> voit l’avion par réflexion. Le <b>radar secondaire</b> interroge le <b>transpondeur</b> de l’avion qui répond avec un code et son altitude. L’<b>ADS-B</b> diffuse automatiquement la position de l’avion calculée par GNSS.</p>
`,
keep:['VOR : radial vers/depuis la balise ; DME : distance ; NDB : direction.','ILS : localizer (axe) + glide (pente 3°).','GNSS : au moins 4 satellites pour la position 3D ; GPS, Galileo, GLONASS, BeiDou.','Radar secondaire : réponse du transpondeur.','Garder toujours une capacité de navigation sans GNSS.'],
traps:['Le DME donne une distance oblique : à la verticale d’une balise en altitude, il n’indique pas zéro.','Galileo est européen, pas américain.'],
qs:[
['Combien de satellites faut-il au minimum pour obtenir une position en 3D par GNSS ?','4','2','3 satellites suffisent toujours','12','Trois satellites donnent trois distances ; un quatrième permet de corriger l’horloge du récepteur.'],
['L’ILS fournit :','le guidage horizontal (axe de piste) et vertical (pente de descente)','seulement la distance à la piste','la météo de l’aérodrome','le cap magnétique de la piste','Le localizer donne l’axe, le glide donne la pente, pour un atterrissage aux instruments.'],
['Le DME donne :','la distance à la station','l’altitude','le cap à suivre','la vitesse du vent','Le DME mesure le temps de réponse d’une station au sol : il en déduit la distance.'],
['Galileo est un système de navigation par satellite :','européen','américain','russe','chinois','Galileo est la constellation européenne, comme GPS pour les États-Unis.']
]});

C.push({id:'4-4', th:'t4', title:'Altimétrie : altitude, hauteur, niveau de vol', min:16,
goals:['différencier altitude, hauteur et niveau de vol','choisir le bon calage (QNH, QFE, 1013)','expliquer l’erreur de l’altimètre quand la pression change'],
body:`
<p>L’altimètre est en réalité un baromètre : il mesure la pression statique et la traduit en altitude grâce à l’atmosphère standard. Comme la pression change avec la météo, on doit l’étalonner : c’est le <b>calage</b>.</p>
<h2>Trois mots à ne pas confondre</h2>
<ul><li><dfn>Altitude</dfn> : distance verticale au-dessus du <b>niveau moyen de la mer</b> (MSL).</li><li><dfn>Hauteur</dfn> : distance verticale au-dessus d’un point précis (le sol survolé, l’aérodrome).</li><li><dfn>Niveau de vol</dfn> (FL) : altitude-pression calculée avec le calage standard 1013,25 hPa, en centaines de pieds. FL 075 = 7 500 ft ; FL 350 ≈ 35 000 ft.</li></ul>
<h2>Les trois calages</h2>
<div class="tw"><table><tr><th>Calage</th><th>Que lit-on ?</th><th>Quand l’utiliser ?</th></tr><tr><td><dfn>QNH</dfn></td><td>L’<b>altitude</b> au-dessus de la mer. Au sol sur l’aérodrome, l’altimètre donne l’altitude du terrain.</td><td>En dessous de l’altitude de transition : voler à vue, approche et atterrissage</td></tr><tr><td><dfn>QFE</dfn></td><td>La <b>hauteur</b> au-dessus de l’aérodrome. Au sol, il indique zéro.</td><td>Circuits d’aérodrome (certains pays)</td></tr><tr><td><dfn>1013</dfn></td><td>Le <b>niveau de vol</b>.</td><td>Au-dessus de l’altitude de transition : tous les avions utilisent la même référence, ce qui évite les erreurs relatives de calage et garantit les séparations</td></tr></table></div>
<p>Le QNH est communiqué par le METAR, l’ATIS ou le contrôle. L’<b>altitude de transition</b> (souvent 3 500 à 5 000 ft selon la région) sépare le domaine des altitudes (QNH) de celui des niveaux de vol (1013).</p>
<div class="figslot" data-fig="altlevels"></div>
<div class="simslot" data-sim="alti"></div>
<h2>Une erreur à connaître</h2>
<p>Un changement de pression modifie l’indication de l’altimètre : environ <b>1 hPa = 30 ft</b>. Si tu voles d’une zone de haute pression vers une zone de basse pression sans retoucher le calage, l’altimètre <b>surestime</b> ton altitude : tu es plus bas que tu ne le crois. D’où le moyen mnémotechnique anglais : « From high to low, look out below » (de haut en bas, attention en dessous).</p>
<div class="callout attention"><b>Attention</b>Le froid fait aussi surestimer l’altitude : par temps très froid, l’altimètre indique plus haut que la réalité. Il faut prendre de la marge sur les obstacles.</div>
<h2>Radio-altimètre</h2>
<p>Sur les gros avions, un radio-altimètre mesure directement la hauteur au-dessus du sol par écho radar.</p>
`,
keep:['Altitude : par rapport à la mer ; hauteur : par rapport au sol/aérodrome ; FL : altitude-pression en centaines de pieds.','QNH : altitude ; QFE : hauteur (0 au sol) ; 1013 : niveau de vol.','Transition : sous l’altitude de transition on utilise le QNH ; au-dessus, 1013.','Environ 1 hPa = 30 ft.','Haute vers basse pression sans recalage : l’altimètre surestime, danger.'],
traps:['FL 100 n’est pas 10 000 ft d’altitude vraie : c’est l’altitude-pression.','Oublier de mettre à jour le QNH est une cause classique d’accident près du relief.'],
qs:[
['Avec le calage QNH, l’altimètre indique :','l’altitude par rapport au niveau de la mer','la hauteur au-dessus de la piste','le niveau de vol','la hauteur au-dessus du terrain survolé','Le QNH ramène la pression au niveau de la mer : on lit l’altitude.'],
['Avec le calage QFE, l’altimètre sur la piste indique :','zéro','l’altitude de l’aérodrome','le niveau de vol 000','1 013','Le QFE est calculé pour que l’altimètre indique la hauteur au-dessus de l’aérodrome, donc zéro au sol.'],
['Le calage 1013,25 hPa sert à :','voler en niveaux de vol','atterrir','lire la hauteur au-dessus du terrain','mesurer la météo','Il fournit une référence commune à tous les avions en route, au-dessus de l’altitude de transition.'],
['Un avion passe d’une zone de haute pression à une zone de basse pression sans modifier son calage. L’altimètre :','surestime l’altitude réelle','sous-estime l’altitude réelle','reste exact','se bloque','La pression baisse : à calage inchangé, l’altimètre indique plus haut que la réalité. L’avion est plus bas que prévu.'],
['FL 075 correspond à :','7 500 ft en altitude-pression','75 ft','750 m','7 500 m','Un niveau de vol se lit en centaines de pieds.']
]});

C.push({id:'4-5', th:'t4', title:'Règles de l’air et espaces aériens', min:16,
goals:['connaître les règles de priorité et d’évitement','distinguer VFR et IFR, VMC et IMC','reconnaître les principaux espaces aériens et leurs services'],
body:`
<h2>Voler à vue ou aux instruments</h2>
<ul><li><dfn>VFR</dfn> (<i>Visual Flight Rules</i>) : le pilote se repère et évite les obstacles par la vue. Il faut des conditions météo suffisantes : <dfn>VMC</dfn> (<i>Visual Meteorological Conditions</i>).</li><li><dfn>IFR</dfn> (<i>Instrument Flight Rules</i>) : le pilote suit ses instruments, même dans les nuages. Qualification supplémentaire.</li></ul>
<p>Ordres de grandeur des minima VFR dans l’espace contrôlé sous le FL 100 : visibilité de <b>5 km</b>, distance aux nuages de <b>1 500 m horizontalement</b> et <b>300 m (1 000 ft) verticalement</b>.</p>
<h2>Évitement des collisions : « voir et éviter »</h2>
<p>En VFR, c’est le pilote qui regarde dehors. Les règles de priorité :</p>
<div class="figslot" data-fig="rightofway"></div>
<div class="tw"><table><tr><th>Situation</th><th>Règle</th></tr><tr><td>Routes convergentes</td><td>Celui qui voit l’autre <b>à sa droite</b> lui cède le passage</td></tr><tr><td>Face à face</td><td>Chacun <b>dévie vers sa droite</b></td></tr><tr><td>Dépassement</td><td>Le plus rapide dépasse <b>par la droite</b> ; l’avion dépassé a priorité</td></tr><tr><td>Atterrissage</td><td>L’aéronef le plus bas, en phase finale, a priorité sur ceux qui sont plus hauts et sur ceux au sol</td></tr><tr><td>Type d’aéronef</td><td>Le moins manœuvrable a priorité : ballon &gt; planeur &gt; dirigeable &gt; aéronef remorquant &gt; aéronef à moteur</td></tr><tr><td>Détresse</td><td>L’aéronef en détresse a toujours priorité</td></tr></table></div>
<div class="callout en-clair"><b>En clair</b>Plus un aéronef est difficile à manœuvrer, plus il a priorité : un ballon n’a pas de gouvernail.</div>
<h2>Hauteurs minimales</h2>
<p>En règle générale, on ne vole pas en dessous de <b>500 ft</b> (150 m) au-dessus du sol ou de l’eau, et de <b>1 000 ft</b> (300 m) au-dessus des agglomérations et rassemblements de personnes. Exceptions : décollage et atterrissage.</p>
<h2>L’espace aérien</h2>
<p>L’espace est découpé en volumes pour organiser la circulation. On distingue :</p>
<div class="figslot" data-fig="airspace"></div>
<ul><li>les espaces <b>contrôlés</b> : un contrôleur donne des autorisations et sépare les avions. Exemples : <dfn>CTR</dfn> (zone de contrôle autour d’un aérodrome, du sol jusqu’à un plafond), <dfn>TMA</dfn> (région de contrôle terminale, au-dessus des CTR, là où convergent les routes), <dfn>CTA</dfn>, <dfn>AWY</dfn> (voies aériennes) ;</li><li>les espaces <b>non contrôlés</b> (classe G) : le pilote est responsable de sa séparation avec les autres, il peut obtenir un service d’information de vol ;</li><li>les <b>zones à statut particulier</b> : <b>P</b> (interdites), <b>R</b> (réglementées), <b>D</b> (dangereuses : tirs, parachutage), zones de protection de la nature, etc. La carte et les NOTAM indiquent leur activité.</li></ul>
<p>Le <b>service de la navigation aérienne</b> assure trois services : le <b>contrôle</b> (séparation), l’<b>information de vol</b> (renseignements utiles) et l’<b>alerte</b> (déclenchement des secours). Un <b>NOTAM</b> est un message qui signale une modification temporaire (piste fermée, zone active…).</p>
<p>Le <b>transpondeur</b> doit être sur le code <b>7000</b> en VFR lorsqu’aucun autre code ne t’a été attribué.</p>
`,
keep:['VFR = à vue (conditions VMC) ; IFR = aux instruments.','Routes convergentes : celui qui voit l’autre à sa droite cède. Face à face : chacun à droite.','Priorité : ballon > planeur > dirigeable > remorqueur > avion à moteur. Détresse prioritaire.','CTR : contrôle autour d’un aérodrome, depuis le sol. TMA : au-dessus, régions de convergence.','Zones P, R, D : interdites, réglementées, dangereuses.'],
traps:['Le plus manœuvrable cède le passage au moins manœuvrable, jamais l’inverse.','Un espace contrôlé n’empêche pas de voler à vue, mais on doit obtenir une autorisation selon la classe.'],
qs:[
['Deux avions convergent. Celui qui voit l’autre à sa droite doit :','lui céder le passage','garder son cap','accélérer','monter','Règle de la priorité à droite : celui qui voit l’autre à sa droite cède.'],
['Dans une situation de face-à-face, chaque avion doit :','dévier vers sa droite','dévier vers sa gauche','monter','descendre','Chacun s’écarte vers sa droite pour que les trajectoires se séparent.'],
['Qui a priorité parmi ces aéronefs ?','Le ballon libre','L’avion à moteur','Le dirigeable','Le planeur','Le ballon a la priorité sur tous les autres car il est le moins manœuvrable.'],
['Une CTR est :','une zone de contrôle autour d’un aérodrome, partant du sol','une zone interdite','une route aérienne en altitude','un espace sans contrôleur','La CTR protège les arrivées et départs d’un aérodrome.'],
['Le code 7000 au transpondeur correspond à :','un vol VFR sans code attribué','une détresse','une panne radio','un détournement','7700 est la détresse, 7600 la panne radio, 7500 l’intervention illicite. 7000 est le code VFR standard.']
]});

C.push({id:'4-6', th:'t4', title:'Aérodrome, circuit et approche', min:18,
goals:['décrire le circuit d’aérodrome et ses étapes','lire la numérotation de piste et le vent','utiliser le PAPI pour juger la pente d’approche'],
body:`
<h2>La piste et ses repères</h2>
<div class="figslot" data-fig="runway"></div>
<ul><li><b>Numéro de piste</b> : cap magnétique de la piste divisé par 10 et arrondi. Piste 27 = cap 270° ; elle a une extrémité opposée numérotée 09 (090°). Le suffixe L, C, R précise gauche, centre, droite pour les pistes parallèles.</li><li><b>Manche à air</b> (windsock) : indique l’origine et la force du vent. Le « T » d’atterrissage indique la piste en service sur certains terrains.</li><li><b>Marquage</b> : seuils (barres), axe (traits discontinus), zone de toucher, numéros.</li><li><b>Balisage lumineux de nuit</b> : bord de piste blanc, seuil vert, fin de piste rouge ; voies de circulation en bleu.</li></ul>
<h2>On atterrit et on décolle face au vent</h2>
<p>Face au vent, la vitesse par rapport au sol est plus faible pour la même vitesse dans l’air : distances de roulage plus courtes, impact moins violent, contrôle facilité. Quand la piste n’est pas alignée avec le vent, il apparaît un <b>vent traversier</b>.</p>
<h2>Le circuit d’aérodrome</h2>
<p>Pour organiser les avions autour de la piste, tous suivent le même <b>tour de piste</b>, par défaut <b>à main gauche</b> (virages à gauche), à environ <b>1 000 ft</b> au-dessus de l’aérodrome. Cinq étapes :</p>
<ol><li><b>Montée initiale</b> dans l’axe.</li><li><b>Vent traversier</b> : virage de 90° à environ 500 ft.</li><li><b>Vent arrière</b> : parallèle à la piste, sens inverse de l’atterrissage, en palier.</li><li><b>Étape de base</b> : virage de 90° en direction de la piste, en descendant.</li><li><b>Finale</b> : alignement sur l’axe, descente, arrondi, toucher.</li></ol>
<div class="simslot" data-sim="circuit"></div>
<p>À chaque étape, on annonce sa position à la radio (ou on regarde les autres en l’absence de contrôle). Si l’approche n’est pas stabilisée, on fait une <b>remise de gaz</b> (<i>go-around</i>) : plein gaz, on remonte et on recommence. Aucune honte à cela, c’est une décision de sécurité.</p>
<h2>Le PAPI</h2>
<p>Le <dfn>PAPI</dfn> (<i>Precision Approach Path Indicator</i>) est un ensemble de quatre feux placés à côté de la piste. Chaque feu est blanc ou rouge selon l’angle sous lequel tu le vois. Pente nominale : <b>3°</b>.</p>
<div class="tw"><table><tr><th>Ce que tu vois</th><th>Position</th></tr><tr><td>4 blancs</td><td>Bien trop haut</td></tr><tr><td>3 blancs, 1 rouge</td><td>Un peu haut</td></tr><tr><td><b>2 blancs, 2 rouges</b></td><td><b>Sur la pente</b></td></tr><tr><td>1 blanc, 3 rouges</td><td>Un peu bas</td></tr><tr><td>4 rouges</td><td>Bien trop bas</td></tr></table></div>
<div class="simslot" data-sim="papi"></div>
<h2>Signaux lumineux de la tour (pistolet)</h2>
<p>En cas de panne radio : <b>vert fixe</b> = autorisé à atterrir ; <b>rouge fixe</b> = cède le passage et continue à tourner ; <b>rouge clignotant</b> = aérodrome dangereux, n’atterris pas.</p>
`,
keep:['Piste 27 = cap magnétique 270° ; l’autre extrémité est la 09.','On décolle et on atterrit face au vent.','Circuit à main gauche par défaut, vers 1 000 ft : montée initiale, vent traversier, vent arrière, base, finale.','PAPI : 2 blancs + 2 rouges = bonne pente (3°) ; plus de blanc = trop haut ; plus de rouge = trop bas.','Approche non stabilisée : remise de gaz.'],
traps:['Les deux numéros d’une même piste diffèrent de 18 (270° et 090°).','Le « T » ou la manche à air indique le vent, pas la piste la plus longue.'],
qs:[
['Une piste numérotée 27 est orientée au :','cap magnétique 270°','cap 027°','cap 090°','cap 72°','Le numéro est le cap magnétique divisé par 10 : 27 → 270°.'],
['Par défaut, le circuit d’aérodrome est :','à main gauche','à main droite','en ligne droite','sans virage','Sauf indication contraire, tous les virages du tour de piste se font à gauche.'],
['Pourquoi atterrit-on face au vent ?','La vitesse sol est plus faible, donc la distance d’atterrissage est plus courte','Pour consommer moins','Pour mieux voir la piste','Parce que la portance augmente','Face au vent, la vitesse par rapport au sol diminue pour une même vitesse dans l’air.'],
['Le PAPI indique 2 feux blancs et 2 feux rouges. Tu es :','sur la pente d’approche','trop haut','trop bas','aligné trop à droite','Deux blancs et deux rouges correspondent à la pente nominale (environ 3°).'],
['Quel est l’ordre des étapes du circuit d’aérodrome ?','Montée initiale, vent traversier, vent arrière, base, finale','Vent arrière, finale, base, travers, montée','Finale, base, vent arrière, travers, montée','Base, montée, vent arrière, finale, travers','Le circuit commence au décollage et se termine par la finale pour l’atterrissage.']
]});

C.push({id:'4-7', th:'t4', title:'Radio, urgences, facteurs humains et organisation', min:18,
goals:['utiliser les messages Mayday et Pan Pan et les codes du transpondeur','appliquer la méthode « Aviser, Naviguer, Communiquer »','citer les principaux facteurs humains et organismes de l’aviation'],
body:`
<h2>La radio en aviation</h2>
<p>Les communications utilisent la VHF aéronautique (118 à 137 MHz) en anglais ou en français selon le contexte, avec une <b>phraséologie normalisée</b> : brève, claire, sans ambiguïté. Chaque message commence par le nom de la station appelée, puis l’indicatif de l’appareil. Les consignes importantes sont répétées (collationnées).</p>
<div class="figslot" data-fig="radiocall"></div>
<h2>Détresse et urgence</h2>
<div class="tw"><table><tr><th>Message</th><th>Situation</th></tr><tr><td><dfn>MAYDAY</dfn> (3 fois)</td><td><b>Détresse</b> : danger grave et imminent pour l’aéronef ou ses occupants</td></tr><tr><td><dfn>PAN PAN</dfn> (3 fois)</td><td><b>Urgence</b> : situation difficile mais sans danger immédiat (problème technique, malaise…)</td></tr></table></div>
<ul><li>Fréquence de détresse : <b>121,5 MHz</b> (VHF).</li><li>Codes de transpondeur : <b>7700</b> détresse ; <b>7600</b> panne radio ; <b>7500</b> intervention illicite ; <b>7000</b> VFR.</li><li>La <b>balise de détresse</b> (ELT) se déclenche automatiquement après un choc et émet sur 406 MHz.</li></ul>
<h2>Panne moteur : aviser, naviguer, communiquer</h2>
<ol><li><b>Aviser (Aviate)</b> : piloter l’avion d’abord. Afficher la vitesse de meilleure finesse, trimer.</li><li><b>Naviguer (Navigate)</b> : choisir un terrain d’atterrissage, se diriger vers lui.</li><li><b>Communiquer (Communicate)</b> : lancer un message Mayday, afficher le code 7700.</li></ol>
<div class="callout attention"><b>Règle d’or</b>Le pilote ne se laisse jamais distraire de sa mission première : piloter l’avion. Un avion en panne de moteur plane encore longtemps.</div>
<h2>Facteurs humains</h2>
<p>La majorité des accidents ont une cause humaine. Quelques facteurs à connaître :</p>
<div class="figslot" data-fig="swiss"></div>
<ul><li><b>Fatigue et stress</b> altèrent le jugement et la mémoire.</li><li><b>Hypoxie</b> : manque d’oxygène en altitude (au-delà de 10 000 ft sans oxygène) ; signes : euphorie, maux de tête, vision dégradée.</li><li><b>Alcool, médicaments, drogues</b> : incompatibles avec le vol.</li><li><b>Illusions sensorielles</b> : sans repère extérieur (nuages, nuit), l’oreille interne trompe le pilote. Il doit se fier aux instruments.</li><li><b>Pression du temps</b> : vouloir arriver à tout prix conduit à ignorer la météo.</li><li><b>Vision</b> : balayer l’horizon en tournant la tête, car l’œil a un angle mort.</li></ul>
<p>La <b>gestion des ressources de l’équipage</b> (CRM) apprend à communiquer, partager la charge de travail et prendre des décisions. La <b>culture juste</b> encourage à déclarer ses erreurs pour en tirer des enseignements.</p>
<h2>Titres et organismes</h2>
<div class="tw"><table><tr><th>Organisme</th><th>Rôle</th></tr><tr><td><b>OACI</b> (ICAO)</td><td>Organisation de l’aviation civile internationale, créée à Chicago en 1944, siège à Montréal, dépend de l’ONU. Elle fixe les normes mondiales.</td></tr><tr><td><b>AESA</b> (EASA)</td><td>Agence européenne de la sécurité aérienne (Cologne)</td></tr><tr><td><b>DGAC</b></td><td>Direction générale de l’aviation civile : réglementation et sécurité en France. Elle comprend la DSNA (navigation aérienne).</td></tr><tr><td><b>Météo-France</b></td><td>Service météorologique national</td></tr><tr><td><b>BEA</b></td><td>Bureau d’enquêtes et d’analyses : enquête sur les accidents pour en tirer des leçons, sans chercher à désigner un coupable.</td></tr><tr><td><b>CNES</b></td><td>Centre national d’études spatiales</td></tr></table></div>
<p>Pour devenir pilote : le <b>BIA</b> n’est pas un brevet de pilote, mais une base de connaissances. L’âge minimal est de 16 ans pour la licence LAPL, 17 ans pour la licence de pilote privé (PPL), 18 ans pour pilote professionnel (CPL) et 21 ans pour pilote de ligne (ATPL), avec un certificat médical d’aptitude. Le vol en planeur peut commencer plus tôt.</p>
`,
keep:['MAYDAY = détresse ; PAN PAN = urgence ; fréquence de détresse 121,5 MHz.','Transpondeur : 7700 détresse, 7600 panne radio, 7500 intervention illicite, 7000 VFR.','En urgence : Aviser (piloter), Naviguer, Communiquer.','Facteurs humains : fatigue, stress, hypoxie, alcool, illusions sensorielles, pression du temps.','OACI : normes mondiales ; DGAC : France ; BEA : enquêtes sur les accidents.'],
traps:['Le BEA enquête pour prévenir les accidents, pas pour sanctionner.','Une panne radio n’est pas une détresse : code 7600.'],
qs:[
['Le message « MAYDAY » est utilisé pour signaler :','une détresse (danger grave et imminent)','une urgence sans danger immédiat','un changement de fréquence','la fin d’un vol','Mayday = détresse. Pan Pan = urgence.'],
['Quel code de transpondeur signale une détresse ?','7700','7600','7500','7000','7700 = détresse ; 7600 = panne radio ; 7500 = intervention illicite.'],
['Quelle est la fréquence VHF internationale de détresse ?','121,5 MHz','118,0 MHz','137,0 MHz','108,0 MHz','C’est la fréquence de détresse aéronautique, surveillée en permanence.'],
['En cas de panne moteur, quelle est la première priorité du pilote ?','Piloter l’avion (afficher la vitesse de finesse)','Appeler la radio','Chercher la panne','Rédiger un message','Aviser, naviguer, communiquer : la première action est toujours de garder le contrôle de l’avion.'],
['Quel organisme enquête en France sur les accidents d’aviation ?','Le BEA','L’OACI','Météo-France','Le CNES','Le Bureau d’enquêtes et d’analyses cherche les causes pour éviter qu’ils se reproduisent.']
]});
})();
