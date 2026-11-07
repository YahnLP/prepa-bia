(function(){
const C = window.BIA.chapters, CARDS = window.BIA.cards, G = window.BIA.glossary;

C.push({id:'6-1', th:'t6', title:'Alphabet OACI et chiffres', min:12,
goals:['épeler avec l’alphabet radiotéléphonique de l’OACI','prononcer les chiffres, les fréquences et les altitudes','lire et dire un indicatif d’appel'],
body:`
<p>En aviation, les lettres comme B, D, P, T ou M se confondent facilement au bruit de la radio. L’OACI a donc fixé un <b>alphabet</b> où chaque lettre est un mot clair, compréhensible dans toutes les langues.</p>
<h2>L’alphabet</h2>
<div class="tw"><table class="tbl"><tr><td>A Alpha</td><td>B Bravo</td><td>C Charlie</td><td>D Delta</td></tr><tr><td>E Echo</td><td>F Foxtrot</td><td>G Golf</td><td>H Hotel</td></tr><tr><td>I India</td><td>J Juliett</td><td>K Kilo</td><td>L Lima</td></tr><tr><td>M Mike</td><td>N November</td><td>O Oscar</td><td>P Papa</td></tr><tr><td>Q Quebec</td><td>R Romeo</td><td>S Sierra</td><td>T Tango</td></tr><tr><td>U Uniform</td><td>V Victor</td><td>W Whiskey</td><td>X X-ray</td></tr><tr><td>Y Yankee</td><td>Z Zulu</td><td></td><td></td></tr></table></div>
<h2>Les chiffres</h2>
<p>Certains chiffres se prononcent différemment pour éviter les confusions :</p>
<div class="figslot" data-fig="saynum"></div>
<div class="tw"><table class="tbl"><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th></tr><tr><td>zero</td><td>one</td><td>two</td><td><b>tree</b></td><td><b>fower</b></td><td><b>fife</b></td><td>six</td><td>seven</td><td>eight</td><td><b>niner</b></td></tr></table></div>
<ul><li>Fréquence <b>121,5</b> : « one two one <b>decimal</b> five ».</li><li>Cap <b>270°</b> : « two seven zero ».</li><li>Altitude 3 000 ft : « three thousand feet » ; niveau de vol 85 : « flight level eight five ».</li><li>QNH <b>1013</b> : « one zero one tree ».</li><li>Heure <b>1630 UTC</b> : « one six tree zero ».</li></ul>
<h2>Indicatif d’appel</h2>
<p>Un avion français a une immatriculation commençant par <b>F-</b>, par exemple F-GABC. À la radio : « Foxtrot Golf Alpha Bravo Charlie ». Après un premier contact, on peut abréger en gardant les deux dernières lettres : « Bravo Charlie ».</p>
<div class="simslot" data-sim="alpha"></div>
`,
keep:['Alphabet OACI : Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliett, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, Zulu.','3 = tree, 4 = fower, 5 = fife, 9 = niner.','121,5 = « one two one decimal five ».','Immatriculation française : F-xxxx.'],
traps:['« Juliett » s’écrit avec deux t ; « Quebec » se prononce « keh-BEK ».','En radio, on ne dit pas « virgule » mais « decimal ».'],
qs:[
['Quel mot de l’alphabet OACI désigne la lettre « Q » ?','Quebec','Queen','Quito','Quartz','Q se dit Quebec, prononcé à la française « keh-BEK ».'],
['Comment prononce-t-on le chiffre 9 à la radio ?','Niner','Nine','Nein','Ninth','On dit « niner » pour éviter la confusion avec « nein » en allemand.'],
['À quelle lettre correspond « Whiskey » ?','W','V','Y','X','Whiskey = W.'],
['Comment dit-on 121,5 MHz à la radio ?','One two one decimal five','One twenty-one point five','One two one comma five','A hundred twenty-one and a half','On épelle chaque chiffre et on dit « decimal » pour la virgule.'],
['Quel mot désigne la lettre « J » ?','Juliett','Jackson','Jackal','Jupiter','En alphabet OACI : Juliett avec deux t.'],
['Comment dit-on le chiffre 3 à la radio ?','Tree','Three','Tri','Thrie','On prononce « tree » (sans le « h » du th) pour être compris par tous.'],
['Quelle lettre est désignée par « X-ray » ?','X','K','S','Z','Le X se dit X-ray.']
]});

C.push({id:'6-2', th:'t6', title:'Vocabulaire aéronautique', min:16,
goals:['nommer en anglais les éléments d’un avion et les instruments','comprendre les mots de météo et de navigation','retenir des termes d’aérodrome'],
body:`
<p>Le vocabulaire de base est celui que tu entendras dans toutes les conversations radio et dans les documents techniques. Apprends-le par thèmes.</p>
<div class="tabset"><div class="tb"><button type="button" data-t="a">L’avion</button><button type="button" data-t="b">Aérodrome</button><button type="button" data-t="c">Météo</button><button type="button" data-t="d">Navigation</button></div>
<div class="pane" data-p="a"><div class="tw"><table class="tbl"><tr><td>wing</td><td>aile</td></tr><tr><td>fuselage</td><td>fuselage</td></tr><tr><td>tail</td><td>empennage</td></tr><tr><td>rudder</td><td>gouverne de direction</td></tr><tr><td>elevator</td><td>gouverne de profondeur</td></tr><tr><td>aileron</td><td>aileron</td></tr><tr><td>flap</td><td>volet</td></tr><tr><td>landing gear</td><td>train d’atterrissage</td></tr><tr><td>propeller</td><td>hélice</td></tr><tr><td>throttle</td><td>manette des gaz</td></tr><tr><td>control stick / yoke</td><td>manche</td></tr><tr><td>engine</td><td>moteur</td></tr></table></div></div>
<div class="pane" data-p="b"><div class="tw"><table class="tbl"><tr><td>runway</td><td>piste</td></tr><tr><td>taxiway</td><td>voie de circulation</td></tr><tr><td>apron</td><td>aire de stationnement</td></tr><tr><td>tower</td><td>tour de contrôle</td></tr><tr><td>take-off</td><td>décollage</td></tr><tr><td>landing</td><td>atterrissage</td></tr><tr><td>go around</td><td>remise de gaz</td></tr><tr><td>holding point</td><td>point d’attente</td></tr><tr><td>downwind / base / final</td><td>vent arrière / base / finale</td></tr></table></div></div>
<div class="pane" data-p="c"><div class="tw"><table class="tbl"><tr><td>wind</td><td>vent</td></tr><tr><td>gust</td><td>rafale</td></tr><tr><td>cloud</td><td>nuage</td></tr><tr><td>ceiling</td><td>plafond</td></tr><tr><td>visibility</td><td>visibilité</td></tr><tr><td>fog</td><td>brouillard</td></tr><tr><td>rain</td><td>pluie</td></tr><tr><td>thunderstorm</td><td>orage</td></tr><tr><td>icing</td><td>givrage</td></tr><tr><td>headwind / tailwind / crosswind</td><td>vent de face / arrière / traversier</td></tr></table></div></div>
<div class="pane" data-p="d"><div class="tw"><table class="tbl"><tr><td>heading</td><td>cap</td></tr><tr><td>altitude</td><td>altitude</td></tr><tr><td>height</td><td>hauteur</td></tr><tr><td>climb / descend</td><td>monter / descendre</td></tr><tr><td>turn left / right</td><td>virer à gauche / à droite</td></tr><tr><td>speed</td><td>vitesse</td></tr><tr><td>fuel</td><td>carburant</td></tr><tr><td>flight plan</td><td>plan de vol</td></tr></table></div></div></div>
<h2>Cartes à retourner</h2>
<div class="simslot" data-sim="cards"></div>
`,
keep:['Rudder = direction ; elevator = profondeur ; aileron = aileron ; flap = volet.','Runway = piste ; taxiway = voie de circulation ; apron = aire de stationnement.','Headwind = vent de face ; tailwind = vent arrière ; crosswind = vent traversier.','Ceiling = plafond ; gust = rafale ; visibility = visibilité.','Heading = cap.'],
traps:['« Elevator » désigne la gouverne de profondeur, pas un ascenseur.','« Altitude » et « height » ne sont pas synonymes : altitude = par rapport à la mer ; height = par rapport au sol.'],
qs:[
['Que signifie « rudder » ?','Gouverne de direction','Gouverne de profondeur','Aileron','Volet','Rudder = gouverne de direction, commandée au palonnier.'],
['Que signifie « runway » ?','Piste','Voie de circulation','Tour de contrôle','Aire de stationnement','Runway = piste ; taxiway = voie de circulation.'],
['« Headwind » désigne :','le vent de face','le vent arrière','le vent traversier','la rafale','Head = devant ; tail = derrière ; cross = en travers.'],
['« Landing gear » désigne :','le train d’atterrissage','le volet','l’hélice','la piste','Le train d’atterrissage comprend roues, jambes et freins.'],
['Dans un METAR, « ceiling » correspond à :','la base de la plus basse couche de nuages BKN ou OVC','la visibilité','le point de rosée','l’altitude de l’aérodrome','Plafond = hauteur de la base des nuages couvrant plus de la moitié du ciel.'],
['« Elevator » est :','la gouverne de profondeur','un ascenseur','une hélice','un moteur','Faux ami : en aviation, l’elevator commande le tangage.'],
['« Throttle » désigne :','la manette des gaz','le manche','le palonnier','l’altimètre','La manette des gaz règle la puissance du moteur.']
]});

C.push({id:'6-3', th:'t6', title:'Phraséologie radio', min:16,
goals:['comprendre les messages standard d’un aérodrome','répondre correctement à une instruction','reconnaître les expressions d’urgence et de collationnement'],
body:`
<p>La radio aéronautique est brève et codifiée. Un message type contient : <b>qui j’appelle</b>, <b>qui je suis</b>, <b>où je suis</b>, <b>ce que je veux</b>.</p>
<h2>Expressions de base</h2>
<div class="figslot" data-fig="readback"></div>
<div class="tw"><table class="tbl"><tr><th>Anglais</th><th>Sens</th></tr><tr><td><b>Roger</b></td><td>Message reçu et compris (n’est pas « oui »)</td></tr><tr><td><b>Wilco</b></td><td>Compris et sera exécuté (<i>will comply</i>)</td></tr><tr><td><b>Affirm</b> / <b>Negative</b></td><td>Oui / non</td></tr><tr><td><b>Say again</b></td><td>Répétez</td></tr><tr><td><b>Standby</b></td><td>Attendez</td></tr><tr><td><b>Request</b></td><td>Je demande…</td></tr><tr><td><b>Readback</b></td><td>Collationnement : on répète les consignes importantes</td></tr></table></div>
<h2>Autour de la piste</h2>
<div class="tw"><table class="tbl"><tr><th>Phrase</th><th>Sens</th></tr><tr><td><b>Taxi to holding point runway 27</b></td><td>Roulez jusqu’au point d’attente de la piste 27</td></tr><tr><td><b>Hold short of runway</b></td><td>Arrêtez-vous avant la piste</td></tr><tr><td><b>Line up and wait</b></td><td>Alignez-vous et attendez</td></tr><tr><td><b>Cleared for take-off</b></td><td>Autorisé à décoller</td></tr><tr><td><b>Report final</b></td><td>Annoncez-vous en finale</td></tr><tr><td><b>Cleared to land</b></td><td>Autorisé à atterrir</td></tr><tr><td><b>Go around</b></td><td>Remise de gaz</td></tr></table></div>
<h2>Autres instructions utiles</h2>
<ul><li><b>Squawk 7000</b> : afficher 7000 au transpondeur.</li><li><b>QNH 1013</b> : le calage altimétrique est 1013 hPa.</li><li><b>Contact tower 118.7</b> : appelez la tour sur 118,7 MHz.</li><li><b>Report position</b> : annoncez votre position.</li></ul>
<h2>Urgence</h2>
<p><b>Mayday, mayday, mayday</b> : détresse. <b>Pan pan, pan pan, pan pan</b> : urgence. Puis : le nom de la station, l’indicatif, la nature du problème, les intentions, la position, le nombre de personnes à bord.</p>
<div class="callout exemple"><b>Exemple de dialogue</b>
<p>Pilote : « Toulouse Tower, Foxtrot Golf Alpha Bravo Charlie, ready for departure, runway three two left. »</p>
<p>Tour : « Foxtrot Golf Alpha Bravo Charlie, line up and wait runway three two left. »</p>
<p>Pilote : « Line up and wait, three two left, Alpha Bravo Charlie. »</p>
<p>Tour : « Foxtrot Golf Alpha Bravo Charlie, wind two seven zero, one zero knots, runway three two left, cleared for take-off. »</p>
<p>Pilote : « Cleared for take-off, three two left, Alpha Bravo Charlie. »</p></div>
`,
keep:['Roger = reçu ; Wilco = sera exécuté ; Affirm / Negative = oui / non ; Say again = répétez.','Hold short = arrêtez-vous avant ; Line up and wait = alignez-vous et attendez.','Cleared for take-off / Cleared to land = autorisé à décoller / atterrir.','Go around = remise de gaz ; Squawk 7000 = afficher 7000 au transpondeur.','Mayday = détresse ; Pan pan = urgence.'],
traps:['« Roger » ne veut pas dire « oui » : pour dire oui, on utilise « affirm ».','On ne dit jamais « take-off » avant d’y être autorisé : « ready for departure » est la formule correcte.'],
qs:[
['Que signifie « cleared for take-off » ?','Autorisé à décoller','Prêt à décoller','Décollage interdit','Alignez-vous sur la piste','Le contrôle autorise le décollage. « Line up and wait » demande seulement de s’aligner.'],
['Que veut dire « go around » ?','Remise de gaz','Faire un tour de piste','Contourner un obstacle','Tourner à droite','Go around = interrompre l’atterrissage, remettre les gaz et revenir dans le circuit.'],
['« Roger » signifie :','Message reçu et compris','Oui','Je vais le faire','Répétez','Roger veut simplement dire « reçu ». Pour accepter, on dit « wilco ». Pour oui, « affirm ».'],
['Que signifie « say again » ?','Répétez','Parlez plus fort','Attendez','Transmettez en français','Si le message n’est pas compris, on demande de le répéter avec « say again ».'],
['« Hold short of runway 27 » signifie :','Attendez avant d’entrer sur la piste 27','Décollez de la piste 27','Atterrissez piste 27','Roulez sur la piste 27','Hold short = s’arrêter avant le point d’attente.'],
['« Squawk 7000 » signifie :','Affichez 7000 au transpondeur','Appelez sur 7000 MHz','Montez à 7000 ft','Votre vitesse est de 7000','Squawk = afficher un code au transpondeur.'],
['« Wilco » est l’abréviation de :','will comply (sera exécuté)','will contact','will call','will cancel','Wilco = j’ai compris et je vais l’appliquer.']
]});

C.push({id:'6-4', th:'t6', title:'Vocabulaire technique', min:18,
goals:['nommer en anglais les pièces, commandes et mouvements de l’avion','lire les instruments en anglais','comprendre les sigles courants'],
body:`
<p>L’épreuve facultative d’anglais du BIA demande surtout de connaître le <b>vocabulaire technique</b> : les pièces de l’avion, les commandes, les instruments et quelques sigles. Les questions sont posées tantôt en français (« Comment dit-on… en anglais ? »), tantôt en anglais. Ce chapitre complète le précédent.</p>
<h2>L’avion en anglais</h2>
<p>Retrouve chaque pièce sur le dessin, puis fais le jeu.</p>
<div class="simslot" data-sim="enplane"></div>
<h2>Commandes et mouvements</h2>
<p>Trois mouvements, trois commandes. Le <b>pitch</b> (tangage) se commande avec l’<b>elevator</b>, le <b>roll</b> (roulis) avec les <b>ailerons</b>, le <b>yaw</b> (lacet) avec le <b>rudder</b>.</p>
<div class="tabset"><div class="tb"><button type="button" data-t="a">Commandes</button><button type="button" data-t="b">Moteur et cabine</button><button type="button" data-t="c">Instruments</button><button type="button" data-t="d">Sigles</button></div>
<div class="pane" data-p="a"><div class="tw"><table class="tbl"><tr><td>pitch / pitching</td><td>tangage (nez qui monte ou descend)</td></tr><tr><td>roll / rolling</td><td>roulis (inclinaison des ailes)</td></tr><tr><td>yaw / yawing</td><td>lacet (nez qui tourne à gauche ou à droite)</td></tr><tr><td>flight controls</td><td>commandes de vol</td></tr><tr><td>control stick / yoke</td><td>manche</td></tr><tr><td>rudder pedals</td><td>palonnier (pédales)</td></tr><tr><td>elevator</td><td>gouverne de profondeur</td></tr><tr><td>rudder</td><td>gouverne de direction</td></tr><tr><td>ailerons</td><td>ailerons</td></tr><tr><td>flaps</td><td>volets</td></tr><tr><td>spoilers</td><td>destructeurs de portance (aérofreins)</td></tr><tr><td>trim</td><td>compensateur</td></tr><tr><td>winglet</td><td>ailette en bout d’aile (réduit les tourbillons)</td></tr><tr><td>fin / vertical stabilizer</td><td>dérive</td></tr><tr><td>horizontal stabilizer</td><td>plan fixe horizontal</td></tr><tr><td>leading edge / trailing edge</td><td>bord d’attaque / bord de fuite</td></tr><tr><td>wingspan</td><td>envergure</td></tr></table></div></div>
<div class="pane" data-p="b"><div class="tw"><table class="tbl"><tr><td>engine</td><td>moteur</td></tr><tr><td>piston</td><td>piston</td></tr><tr><td>cylinder</td><td>cylindre</td></tr><tr><td>spark plug</td><td>bougie d’allumage</td></tr><tr><td>propeller</td><td>hélice</td></tr><tr><td>jet engine</td><td>réacteur</td></tr><tr><td>thrust</td><td>poussée</td></tr><tr><td>fuel tank</td><td>réservoir de carburant</td></tr><tr><td>oil</td><td>huile</td></tr><tr><td>battery</td><td>batterie</td></tr><tr><td>brakes</td><td>freins</td></tr><tr><td>tyre / tire</td><td>pneu</td></tr><tr><td>cockpit</td><td>cabine de pilotage</td></tr><tr><td>cabin</td><td>cabine passagers</td></tr><tr><td>canopy</td><td>verrière</td></tr><tr><td>seat belt</td><td>ceinture de sécurité</td></tr><tr><td>engine failure</td><td>panne moteur</td></tr></table></div></div>
<div class="pane" data-p="c"><div class="tw"><table class="tbl"><tr><td>altimeter</td><td>altimètre</td></tr><tr><td>airspeed indicator</td><td>anémomètre</td></tr><tr><td>attitude indicator</td><td>horizon artificiel</td></tr><tr><td>heading indicator</td><td>conservateur de cap</td></tr><tr><td>vertical speed indicator</td><td>variomètre</td></tr><tr><td>turn coordinator</td><td>indicateur de virage</td></tr><tr><td>tachometer (RPM)</td><td>compte-tours</td></tr><tr><td>compass</td><td>compas magnétique</td></tr><tr><td>transponder</td><td>transpondeur</td></tr><tr><td>pitot tube</td><td>prise Pitot</td></tr><tr><td>fuel gauge</td><td>jauge de carburant</td></tr></table></div></div>
<div class="pane" data-p="d"><div class="tw"><table class="tbl"><tr><td>MTOW</td><td>Maximum Take-Off Weight : masse maximale au décollage</td></tr><tr><td>APU</td><td>Auxiliary Power Unit : groupe auxiliaire de puissance</td></tr><tr><td>ATC</td><td>Air Traffic Control : contrôle de la circulation aérienne</td></tr><tr><td>VFR / IFR</td><td>Visual / Instrument Flight Rules : vol à vue / aux instruments</td></tr><tr><td>ILS</td><td>Instrument Landing System : système d’atterrissage aux instruments</td></tr><tr><td>ETA / ETD</td><td>heure estimée d’arrivée / de départ</td></tr><tr><td>AGL / AMSL</td><td>au-dessus du sol / au-dessus du niveau moyen de la mer</td></tr><tr><td>FL</td><td>Flight Level : niveau de vol</td></tr><tr><td>kt</td><td>knot : nœud</td></tr><tr><td>ft</td><td>foot / feet : pied(s)</td></tr><tr><td>METAR / TAF</td><td>observation / prévision météo</td></tr><tr><td>NOTAM</td><td>avis aux navigants (information importante et temporaire)</td></tr></table></div></div></div>
<h2>Lire les nombres sur un instrument</h2>
<p>On dit les chiffres un par un (voir le premier chapitre). Sur l’altimètre, « <b>two thousand feet</b> » se lit 2 000 ft. Sur l’anémomètre, « <b>one two zero knots</b> » se lit 120 nœuds. Un « <b>heading zero niner zero</b> » est un cap au 090°.</p>
<h2>Comment réviser</h2>
<p>Dix minutes par jour valent mieux qu’une heure la veille. Utilise les cartes à retourner du chapitre précédent dans les deux sens, puis fais les questions. Les questions du BIA reprennent presque toujours les mots les plus courants : <i>elevator, rudder, flaps, throttle, altimeter, headwind, runway</i>.</p>
`,
keep:['Pitch = tangage → elevator ; roll = roulis → ailerons ; yaw = lacet → rudder.','Lift = portance ; weight = poids ; thrust = poussée ; drag = traînée.','Altimeter = altimètre ; airspeed indicator = anémomètre ; attitude indicator = horizon artificiel.','Spark plug = bougie ; piston = piston ; spoilers = destructeurs de portance.','MTOW = masse maximale au décollage ; APU = groupe auxiliaire de puissance.'],
traps:['« Flaps » (volets) et « ailerons » ne sont pas la même chose : les ailerons font rouler l’avion, les flaps augmentent la portance.','« Thrust » est la poussée, pas la traînée (drag).'],
qs:[
['Comment appelle-t-on en anglais le mouvement du nez vers le haut ou le bas ?','Pitching','Rolling','Yawing','Banking','Pitch = tangage. Roll = roulis. Yaw = lacet.'],
['Le mouvement d’inclinaison des ailes s’appelle en anglais :','rolling','pitching','yawing','climbing','Roll = roulis, commandé par les ailerons (ailerons).'],
['Le mot « yaw » désigne :','le lacet','le tangage','le roulis','la vrille','Le lacet est le mouvement du nez vers la gauche ou la droite, commandé par le palonnier.'],
['When the pilot pulls the stick backwards, the nose goes :','up','down','left','right','On tire le manche : l’elevator se lève, la queue descend et le nez monte (pitch up).'],
['Which control surface moves the nose up and down ?','The elevator','The rudder','The flaps','The ailerons','The elevator controls the pitch.'],
['Which control surface turns the nose left or right ?','The rudder','The elevator','The ailerons','The spoilers','The rudder controls the yaw. It is moved with the rudder pedals.'],
['Ailerons control :','the roll','the pitch','the yaw','the speed','Les ailerons inclinent l’avion autour de son axe longitudinal : le roulis.'],
['En anglais, les commandes de vol se nomment :','flight controls','flying setup','plane buttons','wing commands','Les « flight controls » regroupent manche, palonnier, gouvernes.'],
['« Flaps » désigne :','les volets, qui augmentent la portance à basse vitesse','les freins','les ailerons','les bougies','Les flaps sont des volets de bord de fuite qu’on sort pour décoller et atterrir.'],
['Les « spoilers » servent à :','détruire de la portance et ralentir','augmenter la portance','refroidir le moteur','éclairer la piste','Les spoilers (destructeurs de portance) sont relevés à l’atterrissage pour poser l’avion et freiner.'],
['Les « winglets », en bout d’aile, servent à :','réduire les tourbillons marginaux','augmenter le poids','faire tourner l’hélice','mesurer la vitesse','Les winglets diminuent la traînée induite des bouts d’aile.'],
['En anglais, « bougie d’allumage » se dit :','spark plug','candle','fuel cap','fire stick','Le spark plug produit l’étincelle qui enflamme le mélange dans le cylindre.'],
['A piston is :','a part of a reciprocating engine','an electrical device','a navigation instrument','a kind of runway light','Le piston monte et descend dans le cylindre d’un moteur à pistons.'],
['Que signifie « thrust » ?','La poussée','La traînée','La portance','Le poids','Thrust = poussée. Lift = portance. Drag = traînée. Weight = poids.'],
['En anglais, la portance se dit :','lift','drag','thrust','weight','Les quatre forces : lift, weight, thrust, drag.'],
['En anglais, la traînée se dit :','drag','lift','weight','glide','Drag = traînée, la force qui freine l’avion.'],
['The instrument that shows the height above sea level is the :','altimeter','tachometer','compass','thermometer','Altimeter = altimètre.'],
['You can read « two thousand feet » on :','an altimeter','a tachometer','a voltmeter','a thermometer','On lit des pieds (feet) sur l’altimètre.'],
['Quel instrument montre si l’avion monte ou descend, en pieds par minute ?','Le vertical speed indicator','Le tachometer','L’airspeed indicator','Le compass','Vertical speed indicator = variomètre.'],
['Le « attitude indicator » est :','l’horizon artificiel','le compte-tours','l’altimètre','la jauge d’huile','Il montre l’assiette et l’inclinaison de l’avion par rapport à l’horizon.'],
['Le « tachometer » indique :','le régime du moteur (tours par minute)','la vitesse','l’altitude','le cap','Tachometer = compte-tours, en RPM.'],
['L’« airspeed indicator » est :','l’anémomètre','le variomètre','l’altimètre','le compas','Il indique la vitesse de l’avion dans l’air, en nœuds (knots).'],
['Le sigle MTOW signifie :','Maximum Take-Off Weight','Minimum Take-Off Wind','Main Turbine Oil Warning','Mean Total Over Weight','MTOW = masse maximale au décollage.'],
['Le sigle APU désigne :','le groupe auxiliaire de puissance','un pilote automatique','un instrument de navigation','une piste','APU = Auxiliary Power Unit : petit moteur qui fournit électricité et air quand les moteurs sont arrêtés.'],
['« VFR » signifie :','Visual Flight Rules','Very Fast Rocket','Vertical Flight Radar','Visibility For Runway','VFR = règles de vol à vue.'],
['Que signifie « engine failure » ?','Panne moteur','Démarrage du moteur','Moteur puissant','Entretien du moteur','Engine failure = panne moteur. Les pilotes s’y entraînent beaucoup.'],
['« Wingspan » désigne :','l’envergure','la corde','la surface alaire','l’allongement','Wingspan = distance d’un bout d’aile à l’autre.'],
['Le « leading edge » d’une aile est :','le bord d’attaque','le bord de fuite','l’extrados','le longeron','Leading edge = devant. Trailing edge = derrière (bord de fuite).']
]});

[['pitch','tangage'],['roll','roulis'],['yaw','lacet'],['spoilers','destructeurs de portance'],['winglet','ailette de bout d’aile'],['trim','compensateur'],['flight controls','commandes de vol'],['rudder pedals','palonnier'],['leading edge','bord d’attaque'],['trailing edge','bord de fuite'],['wingspan','envergure'],['lift','portance'],['drag','traînée'],['thrust','poussée'],['weight','poids'],['piston','piston'],['spark plug','bougie d’allumage'],['jet engine','réacteur'],['fuel tank','réservoir'],['engine failure','panne moteur'],['cockpit','cabine de pilotage'],['altimeter','altimètre'],['airspeed indicator','anémomètre'],['attitude indicator','horizon artificiel'],['heading indicator','conservateur de cap'],['vertical speed indicator','variomètre'],['tachometer','compte-tours'],['compass','compas'],['MTOW','masse maximale au décollage'],['APU','groupe auxiliaire de puissance'],['ATC','contrôle aérien'],['VFR','vol à vue'],['IFR','vol aux instruments'],['ETA','heure estimée d’arrivée']].forEach(c=>CARDS.push(c));

[['wing','aile'],['fuselage','fuselage'],['tail','empennage'],['rudder','gouverne de direction'],['elevator','gouverne de profondeur'],['aileron','aileron'],['flap','volet'],['landing gear','train d’atterrissage'],['propeller','hélice'],['throttle','manette des gaz'],['control stick','manche'],['engine','moteur'],['runway','piste'],['taxiway','voie de circulation'],['apron','aire de stationnement'],['tower','tour de contrôle'],['take-off','décollage'],['landing','atterrissage'],['go around','remise de gaz'],['holding point','point d’attente'],['downwind','vent arrière'],['final','finale'],['wind','vent'],['gust','rafale'],['cloud','nuage'],['ceiling','plafond'],['visibility','visibilité'],['fog','brouillard'],['rain','pluie'],['thunderstorm','orage'],['icing','givrage'],['headwind','vent de face'],['tailwind','vent arrière'],['crosswind','vent traversier'],['heading','cap'],['altitude','altitude (par rapport à la mer)'],['height','hauteur (par rapport au sol)'],['climb','monter'],['descend','descendre'],['turn left','virer à gauche'],['fuel','carburant'],['flight plan','plan de vol'],['clearance','autorisation'],['stall','décrochage'],['lift','portance'],['drag','traînée'],['thrust','traction, poussée'],['weight','poids'],['airspeed','vitesse air'],['groundspeed','vitesse sol'],['pitch','tangage'],['roll','roulis'],['yaw','lacet'],['seat belt','ceinture'],['emergency','urgence'],['distress','détresse'],['frequency','fréquence'],['altimeter','altimètre'],['compass','compas']].forEach(c=>CARDS.push(c));

[
['Aérodyne','Aéronef plus lourd que l’air, soutenu par une aile (fixe ou tournante) : avion, planeur, hélicoptère.'],
['Aérostat','Aéronef plus léger que l’air : ballon, dirigeable.'],
['Aileron','Gouverne placée sur l’aile, qui commande le roulis.'],
['Allongement','Rapport envergure² / surface alaire.'],
['Altitude','Distance verticale au-dessus du niveau moyen de la mer.'],
['Anticyclone','Zone de hautes pressions : beau temps, air qui descend.'],
['Assiette','Angle entre l’axe du fuselage et l’horizon.'],
['Atmosphère standard (ISA)','Atmosphère de référence : 15 °C, 1 013,25 hPa, 1,225 kg/m³ au niveau de la mer.'],
['Cap','Direction dans laquelle pointe le nez de l’avion.'],
['Centre de gravité','Point d’application du poids ; sa position conditionne la stabilité.'],
['CTR','Zone de contrôle autour d’un aérodrome, depuis le sol.'],
['Cumulonimbus','Nuage d’orage à fort développement vertical : grêle, givrage, turbulence.'],
['Dérive (navigation)','Angle entre le cap et la route, causé par le vent.'],
['Dérive (avion)','Partie fixe de l’empennage vertical.'],
['Dépression','Zone de basses pressions : air qui monte, nuages et vent.'],
['DME','Dispositif qui mesure la distance oblique à une station au sol.'],
['Empennage','Ensemble des plans de queue : stabilisateur, dérive et gouvernes.'],
['Envergure','Distance d’un bout d’aile à l’autre.'],
['Étage (fusée)','Partie d’un lanceur larguée quand son carburant est épuisé.'],
['Extrados / intrados','Dessus / dessous d’une aile.'],
['Facteur de charge','Rapport portance / poids ; vaut 1 en palier.'],
['Finesse','Rapport portance / traînée ; distance parcourue en plané pour une hauteur perdue.'],
['Front','Surface de séparation entre deux masses d’air de caractéristiques différentes.'],
['Géostationnaire','Orbite à 35 786 km sur l’équateur : le satellite reste au-dessus du même point.'],
['GNSS','Navigation par satellite : GPS, Galileo, GLONASS, BeiDou.'],
['Hauteur','Distance verticale au-dessus du sol ou de l’aérodrome.'],
['Hypersustentateur','Dispositif (volet, bec) qui augmente la portance à basse vitesse.'],
['IFR','Règles de vol aux instruments.'],
['ILS','Système d’atterrissage aux instruments : axe de piste (localizer) et pente (glide).'],
['Incidence','Angle entre la corde de l’aile et le vent relatif.'],
['Inversion','Couche d’air où la température augmente avec l’altitude : très stable.'],
['Isobare','Ligne qui relie les points de même pression sur une carte.'],
['Lacet','Mouvement du nez à gauche ou à droite (axe vertical).'],
['Mach','Rapport de la vitesse de l’avion à la vitesse du son.'],
['Masse volumique','Masse par unité de volume ; 1,225 kg/m³ pour l’air standard au niveau de la mer.'],
['METAR','Message d’observation météorologique d’un aérodrome.'],
['Mille nautique (NM)','1 852 m ; une minute d’arc de latitude.'],
['Niveau de vol (FL)','Altitude-pression avec calage 1013,25 hPa, en centaines de pieds.'],
['Nœud (kt)','Un mille nautique par heure, soit 1,852 km/h.'],
['NOTAM','Message signalant une information temporaire importante pour les pilotes.'],
['Octa','Huitième du ciel couvert par les nuages.'],
['PAPI','Quatre feux rouges et blancs qui indiquent la pente d’approche.'],
['Palonnier','Pédales qui commandent la gouverne de direction.'],
['Point de rosée','Température à laquelle l’air devient saturé quand on le refroidit.'],
['Portance','Force perpendiculaire au vent relatif qui soutient l’avion.'],
['Pression dynamique','½ ρ V² : pression due au mouvement de l’air.'],
['Pression statique','Pression ambiante de l’air.'],
['Profondeur (gouverne)','Gouverne de l’empennage horizontal qui commande le tangage.'],
['QFE','Calage qui fait afficher zéro à l’altimètre sur l’aérodrome.'],
['QNH','Calage qui fait afficher l’altitude de l’aérodrome au sol ; altitude au-dessus de la mer en vol.'],
['Roulis','Inclinaison des ailes (axe longitudinal).'],
['Route','Direction de la trajectoire de l’avion par rapport au sol.'],
['SAF','Carburants d’aviation durables.'],
['Stable / instable','Une atmosphère est instable si une bulle d’air chaud continue de monter.'],
['Tangage','Mouvement du nez vers le haut ou le bas (axe transversal).'],
['TAF','Prévision météorologique d’un aérodrome.'],
['TMA','Région de contrôle terminale, au-dessus des CTR.'],
['Traînée','Force qui s’oppose à l’avancement de l’avion.'],
['Transpondeur','Appareil qui répond aux radars en transmettant un code et l’altitude.'],
['Tropopause','Limite entre troposphère et stratosphère, vers 11 km.'],
['Troposphère','Couche de 0 à 11 km où se forme la météo.'],
['UTC','Temps universel coordonné, base de toutes les heures aéronautiques (notée Z).'],
['VFR','Règles de vol à vue.'],
['VMC','Conditions météo permettant le vol à vue.'],
['VOR','Radiophare omnidirectionnel VHF qui donne un radial.'],
['Vent relatif','Écoulement de l’air vu depuis l’avion, opposé à sa trajectoire.'],
['Vitesse indiquée (IAS)','Vitesse lue sur l’anémomètre.'],
['Vitesse propre (TAS)','Vitesse de l’avion dans l’air.'],
['Vitesse sol (GS)','Vitesse de l’avion par rapport au sol.'],
['Vne','Vitesse à ne jamais dépasser.'],
['Vs','Vitesse de décrochage.']
].forEach(g=>G.push(g));
})();
