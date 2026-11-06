(function(){
const C = window.BIA.chapters;

C.push({id:'3-1', th:'t3', title:'Familles d’aéronefs et structure d’un avion', min:15,
goals:['classer les aéronefs : aérostats et aérodynes','nommer les éléments d’un avion et leur rôle','calculer allongement et charge alaire'],
body:`
<h2>Les grandes familles</h2>
<p>Un <dfn>aéronef</dfn> est tout appareil qui peut s’élever et circuler dans l’air. On les classe d’après ce qui les soutient.</p>
<div class="figslot" data-fig="families"></div>
<div class="tw"><table><tr><th>Famille</th><th>Principe</th><th>Exemples</th></tr>
<tr><td><dfn>Aérostats</dfn> (plus légers que l’air)</td><td>Poussée d’Archimède</td><td>Ballons libres, dirigeables</td></tr>
<tr><td><dfn>Aérodynes</dfn> à voilure fixe</td><td>Portance d’une aile fixe grâce au mouvement dans l’air</td><td>Avions, planeurs, ULM multiaxes ou pendulaires</td></tr>
<tr><td><dfn>Aérodynes</dfn> à voilure tournante</td><td>Portance d’un rotor</td><td>Hélicoptères, autogires</td></tr>
<tr><td>Autres</td><td>Vol libre, sans pilote</td><td>Parapente, deltaplane, drones</td></tr></table></div>
<p>Les <b>engins spatiaux</b> (fusées, satellites, sondes) évoluent hors de l’atmosphère : on les étudie à part.</p>
<h2>L’avion : ses éléments</h2>
<p>Touche chaque partie de l’avion pour la découvrir.</p>
<div class="simslot" data-sim="plane"></div>
<ul><li>Le <b>fuselage</b> relie toutes les parties et accueille les occupants.</li><li>La <b>voilure</b> (les ailes) porte l’avion. Elle peut être haute, médiane ou basse, et contient souvent les réservoirs. On y trouve ailerons et volets.</li><li>L’<b>empennage</b> stabilise et dirige : plan fixe horizontal + gouverne de profondeur ; dérive + gouverne de direction. Il peut être en T, en croix, en V, ou remplacé par un plan canard à l’avant.</li><li>Le <b>train d’atterrissage</b> : classique (deux roues devant, une roulette de queue) ou tricycle (roue avant). Il peut être fixe ou rentrant.</li><li>Le <b>groupe motopropulseur</b> : moteur et hélice (ou réacteur).</li></ul>
<h2>Quelques mesures</h2>
<ul><li><dfn>Envergure</dfn> (b) : distance d’un bout d’aile à l’autre ; <dfn>surface alaire</dfn> (S).</li><li><dfn>Allongement</dfn> : λ = b² / S. Une aile longue et étroite (grand λ) produit moins de traînée induite : les planeurs ont de grands allongements.</li><li><dfn>Charge alaire</dfn> : masse / S, en kg/m².</li></ul>
<div class="callout exemple"><b>Exemple</b>Un planeur d’envergure 15 m et de surface 10,5 m² : λ = 15² / 10,5 ≈ 21,4.</div>
<h2>Matériaux et structure</h2>
<p>La structure moderne est le plus souvent <b>semi-monocoque</b> : des cadres (fuselage) et des nervures (ailes) reliés par des lisses et des longerons, recouverts d’un revêtement qui porte une part des efforts. Les matériaux : bois et toile (avions anciens), <b>alliages d’aluminium</b> (duralumin), <b>matériaux composites</b> à base de fibres de carbone ou de verre (plus légers à résistance égale, très utilisés sur Airbus A350), titane pour les parties chaudes.</p>
<div class="figslot" data-fig="wingstruct"></div>
`,
keep:['Aérostats : plus légers que l’air. Aérodynes : plus lourds, soutenus par une aile fixe ou tournante.','Avion : fuselage, voilure, empennage (horizontal + vertical), train, groupe motopropulseur.','Allongement = envergure² / surface ; charge alaire = masse / surface.','Les composites sont plus légers à résistance égale.'],
traps:['Un planeur est un aérodyne, pas un aérostat.','L’empennage comprend une partie fixe et une partie mobile pour chaque plan.'],
qs:[
['Un aérostat est un aéronef :','plus léger que l’air','plus lourd que l’air avec ailes fixes','à voilure tournante','sans pilote','Les ballons et dirigeables sont des aérostats : ils flottent grâce à la poussée d’Archimède.'],
['L’hélicoptère appartient à la famille des :','aérodynes à voilure tournante','aérostats','aérodynes à voilure fixe','engins spatiaux','L’hélicoptère est plus lourd que l’air et est soutenu par un rotor en rotation.'],
['L’allongement d’une aile se calcule par :','envergure² / surface alaire','surface alaire / envergure','masse / surface','corde × envergure','λ = b²/S. Plus il est grand, plus l’aile est fine et longue.'],
['Dans l’empennage vertical, la partie mobile est :','la gouverne de direction','la dérive','le stabilisateur','la gouverne de profondeur','La dérive est fixe ; la gouverne de direction (rudder) est la partie mobile.'],
['Quel avantage ont les matériaux composites ?','Ils sont légers pour une résistance équivalente','Ils sont plus lourds mais moins chers','Ils conduisent mieux la chaleur','Ils ne servent que pour la décoration','Les composites (fibres de carbone, de verre) allègent l’avion et améliorent sa consommation.']
]});

C.push({id:'3-2', th:'t3', title:'Les moteurs et la propulsion', min:18,
goals:['décrire le cycle du moteur à pistons à quatre temps','expliquer turboréacteur, turbopropulseur, statoréacteur et fusée','comparer leurs domaines d’emploi et leurs carburants'],
body:`
<p>Un avion avance en repoussant de l’air vers l’arrière (action-réaction). Selon la vitesse visée, on utilise différents types de moteurs.</p>
<h2>Moteur à pistons</h2>
<p>Un moteur à pistons à quatre temps accomplit un cycle en deux tours de vilebrequin :</p>
<div class="figslot" data-fig="pistoncycle"></div>
<ol><li><b>Admission</b> : le piston descend et aspire le mélange air-carburant.</li><li><b>Compression</b> : le piston remonte et comprime le mélange.</li><li><b>Combustion-détente</b> : la bougie enflamme le mélange, la pression pousse le piston. C’est le temps moteur.</li><li><b>Échappement</b> : le piston remonte et chasse les gaz brûlés.</li></ol>
<p>Un moteur d’avion léger est refroidi par air et possède un <b>double allumage</b> (deux magnétos et deux bougies par cylindre) : en cas de panne de l’un, le second assure le fonctionnement. Il fait tourner une <b>hélice</b>, dont chaque pale est un petit profil d’aile qui crée une force de traction. Une hélice à <b>pas variable</b> adapte l’angle des pales à la vitesse. Carburant : essence aviation <b>AVGAS 100LL</b>.</p>
<h2>Turbomachines</h2>
<div class="tw"><table><tr><th>Moteur</th><th>Principe</th><th>Utilisation</th></tr>
<tr><td><dfn>Turboréacteur</dfn></td><td>Compresseur → chambre de combustion → turbine → tuyère. Les gaz éjectés à grande vitesse poussent l’avion (poussée).</td><td>Avions rapides</td></tr>
<tr><td><dfn>Turbosoufflante</dfn> (double flux)</td><td>Une grande soufflante accélère un flux d’air qui contourne le cœur du moteur : plus silencieux et plus économe.</td><td>Presque tous les avions de ligne</td></tr>
<tr><td><dfn>Turbopropulseur</dfn></td><td>Une turbine entraîne une hélice par un réducteur.</td><td>Avions régionaux (ATR 72), transport</td></tr>
<tr><td><dfn>Turbomoteur</dfn></td><td>Une turbine entraîne le rotor.</td><td>Hélicoptères</td></tr>
<tr><td><dfn>Statoréacteur</dfn></td><td>Pas de pièces mobiles : l’air est comprimé par la vitesse même de l’engin. Ne fonctionne qu’à grande vitesse.</td><td>Missiles, projets supersoniques</td></tr></table></div>
<p>Les turbines brûlent du <b>kérosène</b> (Jet A-1).</p>
<div class="figslot" data-fig="turbojet"></div>
<h2>Le moteur-fusée</h2>
<p>Une fusée emporte à la fois son <b>carburant</b> et son <b>comburant</b> (les ergols). Elle n’a donc pas besoin de l’air extérieur et fonctionne dans le vide. Les ergols peuvent être <b>liquides</b> (hydrogène et oxygène liquides du moteur Vulcain) ou <b>solides</b> (poudre des boosters).</p>
<h2>Qui pour quelle vitesse ?</h2>
<p>Hélice : bas régime subsonique. Turbosoufflante : vitesse proche de Mach 0,8. Statoréacteur : supersonique. Fusée : spatial.</p>
<h2>Moteurs et environnement</h2>
<p>Le transport aérien représente environ <b>2 à 3 %</b> des émissions mondiales de CO₂. Pour les réduire : avions plus sobres, carburants d’aviation durables (<b>SAF</b>) fabriqués à partir de déchets ou de ressources renouvelables, avions électriques ou hybrides pour les petits trajets, hydrogène à plus long terme, et amélioration des trajectoires.</p>
`,
keep:['4 temps : admission, compression, combustion-détente, échappement.','Turboréacteur : compresseur, chambre de combustion, turbine, tuyère.','Turbopropulseur = turbine + hélice ; turbosoufflante = avions de ligne.','Double allumage = sécurité par redondance.','Fusée : emporte carburant et comburant, fonctionne dans le vide. SAF = carburants d’aviation durables.'],
traps:['Dans le cycle à 4 temps, un seul temps est moteur : la combustion-détente.','Le turbopropulseur n’est pas un moteur à pistons : il contient une turbine.'],
qs:[
['Quel est l’ordre des quatre temps d’un moteur à pistons ?','Admission, compression, combustion-détente, échappement','Compression, admission, échappement, combustion','Admission, combustion, compression, échappement','Échappement, admission, détente, compression','Le mélange est d’abord aspiré, puis comprimé, enflammé (temps moteur) et enfin évacué.'],
['Quels sont les éléments d’un turboréacteur, dans l’ordre de passage de l’air ?','Compresseur, chambre de combustion, turbine, tuyère','Chambre, compresseur, tuyère, turbine','Turbine, compresseur, chambre, tuyère','Tuyère, turbine, chambre, compresseur','L’air est comprimé, mélangé au kérosène, brûlé, puis détendu dans la turbine et éjecté par la tuyère.'],
['Pourquoi les moteurs d’avions légers ont-ils deux systèmes d’allumage ?','Pour la sécurité : si l’un tombe en panne, l’autre fonctionne','Pour doubler la puissance','Pour consommer moins','Pour démarrer plus vite en hiver','Le double allumage est une redondance qui améliore la sécurité.'],
['Un turbopropulseur entraîne :','une hélice par l’intermédiaire d’un réducteur','un compresseur seul','un rotor de queue uniquement','un statoréacteur','Une turbine fournit de la puissance, transmise à l’hélice par un réducteur.'],
['Qu’est-ce qui permet à une fusée de fonctionner dans le vide ?','Elle emporte à la fois son carburant et son comburant','Elle utilise l’air extérieur','Elle utilise l’énergie solaire','Elle s’appuie sur la Terre','Les ergols (carburant + comburant) ne dépendent pas de l’oxygène atmosphérique.']
]});

C.push({id:'3-3', th:'t3', title:'Instruments de bord et systèmes', min:16,
goals:['associer chaque instrument à sa source de mesure','lire l’anémomètre et l’horizon artificiel','expliquer la panne d’une prise Pitot ou statique et le principe des commandes électriques'],
body:`
<p>Le tableau de bord de base d’un avion léger regroupe six instruments. Il faut savoir ce qu’ils mesurent, comment, et ce qui se passe quand ils se trompent.</p>
<h2>Les instruments « pitot-statique »</h2>
<div class="figslot" data-fig="pitotstatic"></div>
<ul><li><b>Anémomètre</b> : vitesse indiquée. Relié à la prise Pitot (pression totale) <b>et</b> à la prise statique.</li><li><b>Altimètre</b> : altitude. Relié à la prise statique : il convertit la pression en altitude.</li><li><b>Variomètre</b> : vitesse verticale (en ft/min ou m/s). Relié à la statique : il mesure la vitesse à laquelle la pression varie.</li></ul>
<h2>Les instruments gyroscopiques</h2>
<ul><li><b>Horizon artificiel</b> : indique l’attitude de l’avion (tangage et inclinaison). Un gyroscope garde une direction fixe dans l’espace.</li><li><b>Conservateur de cap</b> (directionnel) : indique le cap. Il dérive lentement : on le recale régulièrement sur le compas magnétique.</li><li><b>Indicateur de virage et bille</b> (coordinateur) : taux de virage et qualité de la coordination.</li></ul>
<div class="simslot" data-sim="panel"></div>
<h2>Le compas magnétique</h2>
<p>Indique le nord magnétique. Il est simple, sans électricité, mais il est faussé en virage et en accélération, et par la <b>déviation</b> due aux masses métalliques de l’avion.</p>
<h2>Instruments moteur</h2>
<p>Compte-tours, pression d’huile, température d’huile, indicateur de carburant. Une pression d’huile trop basse est une alerte grave.</p>
<h2>Quand une prise se bouche</h2>
<ul><li><b>Pitot bouché</b> (givre, insecte) : l’anémomètre devient faux, souvent figé ou lisant en fonction de l’altitude.</li><li><b>Prise statique bouchée</b> : l’altimètre se fige, le variomètre indique zéro, l’anémomètre est faux. Une prise de secours est prévue.</li></ul>
<h2>Systèmes et avionique</h2>
<ul><li><b>Circuit électrique</b> : batterie, alternateur, disjoncteurs.</li><li><b>Hydraulique</b> : sur les gros avions, il actionne train, freins, gouvernes.</li><li><b>Commandes de vol électriques</b> (<i>fly-by-wire</i>) : le pilote transmet un ordre à des calculateurs, qui commandent les gouvernes. L’Airbus A320, en 1987, fut le premier avion de ligne civil à en être équipé.</li><li><b>Pilote automatique</b>, <b>transpondeur</b> (renvoie un code et l’altitude au radar), <b>balise de détresse</b> (ELT).</li><li><b>Cockpit « tout écran »</b> (<i>glass cockpit</i>) : les instruments classiques sont remplacés par des écrans (PFD pour les données de vol, ND ou MFD pour la navigation).</li></ul>
<h2>Radionavigation à bord</h2>
<p>Récepteurs VOR, ADF, DME, ILS, GNSS (voir chapitre 4.3).</p>
`,
keep:['Anémomètre : Pitot + statique. Altimètre et variomètre : statique.','Horizon artificiel = assiette (tangage, inclinaison) ; conservateur de cap à recaler ; bille = coordination.','Pitot bouché : anémomètre faux. Statique bouchée : altimètre figé, variomètre à zéro.','Anémomètre : arc blanc (volets), arc vert (normal), arc jaune (prudence), trait rouge (Vne).','A320 (1987) : premier avion de ligne à commandes de vol électriques.'],
traps:['Le variomètre n’est pas relié au Pitot.','Un trait rouge sur l’anémomètre est une limite à ne jamais dépasser, pas une zone de « vitesse maximale conseillée ».'],
qs:[
['Quel instrument utilise à la fois la pression totale (Pitot) et la pression statique ?','L’anémomètre','L’altimètre','Le variomètre','L’horizon artificiel','L’anémomètre mesure la différence entre pression totale et pression statique, soit la pression dynamique.'],
['L’horizon artificiel indique :','l’attitude de l’avion (tangage et inclinaison)','la vitesse verticale','le cap magnétique','l’altitude','Un gyroscope maintient une référence horizontale ; l’instrument montre l’avion par rapport à elle.'],
['Pourquoi doit-on recaler régulièrement le conservateur de cap ?','Il dérive lentement','Il perd sa pile','Il est sensible au Pitot','Il dépend de la pression','Le gyroscope directionnel dérive : on le recale sur le compas magnétique.'],
['Si la prise statique est bouchée en croisière, que fait le variomètre ?','Il indique zéro','Il indique une montée constante','Il se bloque sur la dernière valeur de vitesse','Il indique une descente rapide','Sans variation de pression, le variomètre croit que l’avion reste à altitude constante.'],
['Un arc vert sur l’anémomètre signale :','la plage normale d’utilisation','la plage volets sortis','la vitesse à ne jamais dépasser','la zone de décrochage','L’arc vert va de la vitesse de décrochage (volets rentrés) à Vno.']
]});

C.push({id:'3-4', th:'t3', title:'Hélicoptères, planeurs, ULM et drones', min:16,
goals:['expliquer comment vole et se pilote un hélicoptère','comprendre l’autorotation','décrire le vol à voile, l’ULM et les règles de base des drones'],
body:`
<h2>L’hélicoptère</h2>
<p>Le <b>rotor principal</b> est une grande aile tournante. Il fournit à la fois la <b>portance</b> et la <b>propulsion</b>, en inclinant son disque. L’hélicoptère peut décoller à la verticale, rester en <b>vol stationnaire</b>, reculer. En contrepartie, sa vitesse est limitée (environ 300 km/h) et il consomme beaucoup.</p>
<div class="figslot" data-fig="heli"></div>
<p>Quand le rotor tourne dans un sens, le fuselage a tendance à tourner dans l’autre (action-réaction) : c’est le <b>couple de réaction</b>. Le <b>rotor anti-couple</b> (à l’arrière), ou le fenestron (rotor caréné), le contre et permet de diriger l’appareil en lacet.</p>
<div class="tabset"><div class="tb"><button type="button" data-t="a">Pas collectif</button><button type="button" data-t="b">Cyclique</button><button type="button" data-t="c">Palonnier</button></div>
<div class="pane" data-p="a"><p><b>Levier du pas collectif</b> (main gauche) : change l’angle de toutes les pales en même temps. Plus de pas, plus de portance : l’hélicoptère <b>monte</b>. On le baisse pour descendre. La puissance moteur est ajustée en conséquence.</p></div>
<div class="pane" data-p="b"><p><b>Manche cyclique</b> (main droite) : change l’angle des pales à chaque tour, ce qui <b>incline le disque rotor</b>. L’hélicoptère se déplace dans la direction où le disque est incliné : avant, arrière, côtés.</p></div>
<div class="pane" data-p="c"><p><b>Palonnier</b> (pieds) : modifie le pas du rotor anti-couple et commande le <b>lacet</b>, c’est-à-dire l’orientation du nez.</p></div></div>
<h3>L’autorotation</h3>
<p>Si le moteur tombe en panne, le pilote baisse aussitôt le collectif pour que l’air qui monte à travers le rotor continue de le faire tourner : l’hélicoptère descend comme une graine d’érable. Juste avant le sol, le pilote « arrondit » pour utiliser l’énergie de rotation du rotor et se poser en douceur.</p>
<p>L’<b>autogire</b> a un rotor libre, non motorisé, qui tourne en autorotation en permanence, et une hélice pour avancer. Le <b>convertible</b> (V-22 Osprey) bascule ses rotors d’une position verticale à une position horizontale.</p>
<h2>Le planeur</h2>
<p>Un planeur n’a pas de moteur. Il décolle <b>remorqué</b> par un avion ou tiré par un <b>treuil</b>, puis il exploite les mouvements d’air ascendants pour rester en l’air :</p>
<div class="figslot" data-fig="finesse"></div>
<ul><li>les <b>thermiques</b> : colonnes d’air chaud sous les cumulus ;</li><li>les <b>ascendances de pente</b> : le vent remonte le long d’un relief ;</li><li>les <b>ondes</b> sous le vent d’une montagne.</li></ul>
<p>Sa grande envergure et sa forme très fine lui donnent une <b>finesse</b> qui peut dépasser 60. Le vol à voile est l’une des meilleures écoles de pilotage.</p>
<h2>L’ULM</h2>
<p>L’<b>ULM</b> (ultra-léger motorisé) regroupe des appareils légers : pendulaires, multiaxes (qui ressemblent à de petits avions), autogires, paramoteurs, aérostats. Les masses sont limitées (de l’ordre de 500 kg). Il est soumis à une réglementation allégée.</p>
<h2>Les drones</h2>
<p>Un <b>drone</b> (UAS) est un aéronef sans pilote à bord, télécommandé ou autonome. Usages : photographie, agriculture, inspection d’ouvrages, secours. En France et en Europe, un drone de loisir doit rester en vue, ne pas voler à plus de <b>120 m (400 ft)</b> de hauteur, respecter les zones interdites et être enregistré selon son poids.</p>
`,
keep:['Hélicoptère : le rotor principal assure portance et propulsion ; le rotor anti-couple contre le couple de réaction.','Collectif = monter/descendre ; cyclique = avancer/reculer/côtés ; palonnier = lacet.','Autorotation : descente sans moteur, rotor entraîné par le flux d’air montant.','Planeur : décollage par remorquage ou treuil ; ascendances thermiques, de pente et d’onde.','Drone de loisir : 120 m maximum, en vue, enregistré.'],
traps:['Le rotor anti-couple ne sert pas qu’à tourner : il compense d’abord le couple de réaction.','Un planeur n’est pas « en panne » de moteur : il est conçu sans moteur.'],
qs:[
['Quel est le rôle du rotor anti-couple d’un hélicoptère ?','Contrer la rotation du fuselage et contrôler le lacet','Faire monter l’appareil','Refroidir le moteur','Faire avancer l’hélicoptère','Le rotor principal entraîne le fuselage en sens inverse ; le rotor de queue l’équilibre et dirige le nez.'],
['Le levier de pas collectif d’un hélicoptère permet de :','monter ou descendre','avancer ou reculer','tourner à droite ou à gauche','démarrer le moteur','Il change le pas de toutes les pales : plus de portance ou moins.'],
['L’autorotation est :','une descente sans moteur, le rotor tournant sous l’effet du flux d’air','un décollage vertical','un virage coordonné','une manœuvre de stationnaire','En cas de panne moteur, le pilote profite de l’air montant pour garder le rotor en rotation.'],
['Comment un planeur décolle-t-il généralement ?','Remorqué par un avion ou tiré par un treuil','Par son propre moteur à réaction','Lancé depuis un ballon','Par catapulte','Il n’a pas de moteur : l’énergie du décollage vient d’une source extérieure.'],
['Quelle est la hauteur maximale de vol d’un drone de loisir dans la catégorie ouverte européenne ?','120 m','30 m','500 m','1 000 m','La règle générale est 120 m (400 ft) au-dessus du sol.']
]});

C.push({id:'3-5', th:'t3', title:'Engins spatiaux et orbites', min:20,
goals:['expliquer la propulsion d’une fusée et le principe de l’étagement','comprendre ce qu’est une orbite et pourquoi on est en apesanteur','citer les grandes orbites et leurs usages'],
body:`
<h2>Une fusée : action et réaction</h2>
<p>Une fusée expulse des gaz à très grande vitesse vers l’arrière : par <b>réaction</b>, elle avance vers l’avant (troisième loi de Newton). Elle n’a besoin ni d’air ni de sol pour s’appuyer, et peut donc fonctionner dans le vide.</p>
<div class="figslot" data-fig="stages"></div>
<p>Elle est <b>étagée</b> : à mesure que les réservoirs se vident, les étages vides sont largués pour ne pas porter de poids inutile. Ariane 6 comprend deux ou quatre boosters à poudre, un étage principal (moteur Vulcain 2.1) et un étage supérieur (moteur Vinci).</p>
<h2>Pourquoi lancer depuis Kourou ?</h2>
<ul><li>Située à 5° de l’équateur, la base de Kourou (Guyane) profite de la rotation de la Terre : le sol y tourne vers l’est à environ 460 m/s, ce qui donne un gain de vitesse « gratuit ».</li><li>Le lancement se fait vers l’est, au-dessus de l’océan Atlantique : en cas de problème, les retombées ne menacent pas d’habitations.</li><li>C’est idéal pour atteindre l’orbite géostationnaire.</li></ul>
<h2>Qu’est-ce qu’une orbite ?</h2>
<div class="callout en-clair"><b>En clair</b>Un satellite ne « flotte » pas : il <b>tombe en permanence</b>, mais il va si vite horizontalement (environ 7,7 km/s, soit 28 000 km/h à 400 km) que la Terre se dérobe sous lui. Il retombe sans jamais toucher le sol. Les astronautes de la station spatiale ne sont donc pas hors de la gravité : ils sont en <b>chute libre</b>, d’où l’apesanteur.</div>
<p>Plus l’orbite est haute, plus la vitesse du satellite est faible et plus sa période est longue (troisième loi de Kepler).</p>
<div class="simslot" data-sim="orbit"></div>
<h2>Les principales orbites</h2>
<div class="figslot" data-fig="orbits"></div>
<div class="tw"><table><tr><th>Orbite</th><th>Altitude</th><th>Usages</th></tr>
<tr><td><dfn>Basse (LEO)</dfn></td><td>200 à 2 000 km</td><td>Station spatiale (ISS ≈ 400 km, une orbite en 92 min), observation de la Terre</td></tr>
<tr><td><dfn>Héliosynchrone</dfn></td><td>≈ 600-800 km, polaire</td><td>Observation : le satellite passe toujours à la même heure solaire locale</td></tr>
<tr><td><dfn>Moyenne (MEO)</dfn></td><td>≈ 20 000 km</td><td>Navigation : GPS (20 200 km), Galileo (23 222 km)</td></tr>
<tr><td><dfn>Géostationnaire (GEO)</dfn></td><td>35 786 km, sur l’équateur</td><td>Télécoms, TV, météo (Météosat). Période 23 h 56 min : le satellite reste au-dessus du même point.</td></tr></table></div>
<h2>Les engins spatiaux</h2>
<ul><li><b>Satellites</b> : télécommunications, observation de la Terre, navigation, météo, science.</li><li><b>Sondes spatiales</b> : explorent le système solaire (Rosetta, Voyager).</li><li><b>Stations</b> : la Station spatiale internationale (ISS), habitée en permanence depuis novembre 2000.</li><li><b>Capsules</b> (Soyouz, Dragon) et <b>navettes</b> (Space Shuttle, 1981-2011) transportent des équipages.</li></ul>
<p>Au retour dans l’atmosphère, la capsule est protégée par un <b>bouclier thermique</b> qui supporte plus de 1 500 °C. Les <b>débris spatiaux</b> sont un enjeu croissant pour la sécurité.</p>
<p>Principales agences : <b>CNES</b> (France), <b>ESA</b> (Europe), <b>NASA</b> (États-Unis), <b>Roscosmos</b> (Russie), CNSA (Chine), ISRO (Inde), JAXA (Japon).</p>
`,
keep:['Fusée : action-réaction ; elle fonctionne dans le vide ; elle est étagée.','Vitesse orbitale basse ≈ 7,7 à 7,8 km/s (28 000 km/h) ; ISS : 400 km, 92 min par tour.','Apesanteur = chute libre, pas absence de gravité.','Géostationnaire : 35 786 km, équateur, période 23 h 56 min.','Kourou : proche de l’équateur et tir vers l’est sur l’océan.'],
traps:['L’apesanteur ne signifie pas qu’il n’y a plus de gravité : à 400 km, elle vaut encore environ 90 % de celle du sol.','Un satellite géostationnaire n’est pas « immobile » : il tourne avec la Terre, à la même vitesse angulaire.'],
qs:[
['Quel principe permet à une fusée d’avancer dans le vide ?','L’action et la réaction','La portance','La poussée d’Archimède','La traînée','Les gaz sont éjectés vers l’arrière, la fusée est poussée vers l’avant.'],
['Un satellite géostationnaire se trouve :','à 35 786 km au-dessus de l’équateur','à 400 km au-dessus des pôles','à 20 200 km sur une orbite inclinée','à 700 km sur une orbite héliosynchrone','Sur cette orbite, la période est égale à celle de la rotation de la Terre.'],
['Pourquoi lance-t-on depuis Kourou ?','Proche de l’équateur, on profite de la rotation terrestre, et le tir est sur l’océan','Il y fait toujours beau','Le sol y est plus froid','Il n’y a pas de vent en Guyane','La rotation de la Terre donne un gain de vitesse, et le tir vers l’est survole l’océan.'],
['Quand l’altitude d’une orbite circulaire augmente, la période du satellite :','augmente','diminue','reste constante','devient nulle','Plus on est haut, plus la vitesse est faible et plus l’orbite est longue à parcourir.'],
['Pourquoi les astronautes de l’ISS sont-ils en apesanteur ?','Ils sont, avec la station, en chute libre autour de la Terre','Il n’y a plus de gravité à 400 km','La station est dans le vide','La Terre est trop loin','La gravité existe encore à 400 km. Station et astronautes tombent ensemble autour de la Terre.']
]});
})();
