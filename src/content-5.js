(function(){
const C = window.BIA.chapters, T = window.BIA.timeline;
// [tri, date affichée, titre, détail, période]  périodes : o avant 1914 · g 1914-1939 · j après 1939 (aviation) · s espace · a aujourd'hui
[
[1490,'vers 1490','Léonard de Vinci dessine des machines volantes','Il étudie le vol des oiseaux et imagine ornithoptère et vis aérienne, sans qu’aucune ne vole.','o'],
[1783.5,'4 juin 1783','Démonstration des frères Montgolfier','À Annonay, un grand ballon à air chaud, sans passager, s’élève devant le public.','o'],
[1783.9,'21 novembre 1783','Premier vol humain en ballon à air chaud','Pilâtre de Rozier et le marquis d’Arlandes volent à Paris, dans une montgolfière.','o'],
[1783.92,'1er décembre 1783','Jacques Charles et Robert, ballon à hydrogène','Premier vol humain en ballon à gaz, parti des Tuileries.','o'],
[1852,'24 septembre 1852','Henri Giffard : premier dirigeable','Dirigeable à vapeur, de Paris à Trappes (27 km).','o'],
[1891,'1891-1896','Otto Lilienthal et ses planeurs','Plus de 2 000 vols planés : il montre qu’on peut voler plus lourd que l’air.','o'],
[1890.8,'9 octobre 1890','Clément Ader : l’Éole décolle','Bond d’environ 50 m, motorisé. Ader inventera le mot « avion ».','o'],
[1900,'2 juillet 1900','Premier vol du Zeppelin LZ 1','Naissance du grand dirigeable rigide.','o'],
[1903.96,'17 décembre 1903','Frères Wright : premier vol motorisé contrôlé','Flyer, à Kitty Hawk (États-Unis). Le meilleur vol du jour : 59 secondes, 260 m.','o'],
[1906.8,'23 octobre et 12 novembre 1906','Santos-Dumont et le 14-bis','Premier vol homologué en Europe, à Bagatelle (220 m le 12 novembre).','o'],
[1907,'13 novembre 1907','Paul Cornu : premier vol libre d’un hélicoptère','Quelques secondes, quelques dizaines de centimètres de hauteur.','o'],
[1909.55,'25 juillet 1909','Louis Blériot traverse la Manche','Calais-Douvres en 37 minutes sur le Blériot XI.','o'],
[1910.2,'8 mars 1910','Raymonde de Laroche : brevet de pilote','Première femme titulaire du brevet de pilote.','o'],
[1910.24,'28 mars 1910','Henri Fabre : premier hydravion','Le « Canard » décolle de l’étang de Berre, à Martigues.','o'],
[1913.7,'23 septembre 1913','Roland Garros traverse la Méditerranée','Fréjus-Bizerte, en près de 8 heures.','o'],
[1914.6,'1914-1918','Première Guerre mondiale','L’avion passe de la reconnaissance à la chasse et au bombardement. Des « as » comme Guynemer et Fonck marquent l’époque.','g'],
[1919.45,'14-15 juin 1919','Alcock et Brown traversent l’Atlantique Nord','Premier vol sans escale de Terre-Neuve à l’Irlande.','g'],
[1919.9,'1919','Lignes Latécoère : le courrier par avion','Toulouse-Casablanca, puis Dakar et l’Amérique du Sud avec l’Aéropostale (Mermoz, Saint-Exupéry).','g'],
[1927.4,'20-21 mai 1927','Charles Lindbergh relie New York à Paris','Premier vol en solitaire sans escale, 33 h 30 sur le Spirit of St. Louis.','g'],
[1930.4,'12-13 mai 1930','Jean Mermoz traverse l’Atlantique Sud','Saint-Louis du Sénégal-Natal avec du courrier.','g'],
[1930.7,'1er-2 septembre 1930','Costes et Bellonte : Paris-New York','Premier vol direct de l’Europe vers l’Amérique du Nord (sens est-ouest).','g'],
[1933.8,'octobre 1933','Création d’Air France','Fusion de plusieurs compagnies aériennes françaises.','g'],
[1939.65,'27 août 1939','Heinkel He 178 : premier avion à réaction','Vol d’essai en Allemagne, avec un turboréacteur de von Ohain.','j'],
[1947.8,'14 octobre 1947','Chuck Yeager franchit le mur du son','À bord du Bell X-1, aux États-Unis.','j'],
[1955.4,'27 mai 1955','Premier vol de la Caravelle','Moyen-courrier à réaction français, aux moteurs placés à l’arrière.','j'],
[1969.17,'2 mars 1969','Premier vol de Concorde','À Toulouse, avec André Turcat aux commandes.','j'],
[1970.5,'1970','Création d’Airbus','Consortium européen basé à Toulouse. Premier vol de l’A300 en 1972.','j'],
[1976.05,'21 janvier 1976','Concorde en service commercial','Vol à Mach 2 à 18 000 m, Paris-New York en 3 h 30.','j'],
[1987.15,'22 février 1987','Premier vol de l’A320','Premier avion de ligne civil à commandes de vol électriques.','j'],
[1957.76,'4 octobre 1957','Spoutnik 1 : premier satellite artificiel','Lancé par l’URSS, il émet des « bip » pendant trois semaines.','s'],
[1961.3,'12 avril 1961','Gagarine, premier homme dans l’espace','Youri Gagarine fait un tour de la Terre en 108 minutes à bord de Vostok 1.','s'],
[1961.9,'1961','Création du CNES','Centre national d’études spatiales, agence spatiale française.','s'],
[1965.9,'26 novembre 1965','Astérix, premier satellite français','Lancé par une fusée française Diamant, depuis le Sahara.','s'],
[1969.55,'20-21 juillet 1969','Apollo 11 : premiers pas sur la Lune','Neil Armstrong et Buzz Aldrin se posent sur la Lune ; Michael Collins reste en orbite.','s'],
[1975.4,'1975','Création de l’ESA','Agence spatiale européenne.','s'],
[1979.98,'24 décembre 1979','Premier vol d’Ariane 1','Depuis Kourou, en Guyane : l’Europe a son lanceur.','s'],
[1981.28,'12 avril 1981','Premier vol de la navette spatiale','Columbia, premier engin spatial réutilisable.','s'],
[1982.5,'24 juin 1982','Jean-Loup Chrétien, premier Français dans l’espace','À bord de Soyouz T-6 vers la station Salyut 7.','s'],
[1986.08,'28 janvier 1986','Accident de Challenger','Perte de la navette 73 secondes après le décollage.','s'],
[1990.3,'24 avril 1990','Lancement du télescope Hubble','Il observe l’Univers depuis l’orbite basse.','s'],
[1998.9,'novembre 1998','Premier module de l’ISS','Zarya. L’ISS est occupée en continu depuis novembre 2000.','s'],
[2003.8,'24 octobre 2003','Dernier vol commercial de Concorde','Après 27 ans de service.','a'],
[2005.3,'27 avril 2005','Premier vol de l’A380','Le plus gros avion de ligne, à deux ponts.','a'],
[2011.5,'2011','Fin des vols de la navette spatiale','Après 135 missions.','a'],
[2014.9,'12 novembre 2014','Philae se pose sur une comète','La sonde Rosetta de l’ESA met son atterrisseur sur la comète 67P.','a'],
[2017,'2016-2017 et 2021','Thomas Pesquet à bord de l’ISS','Deux séjours dans la station : missions Proxima et Alpha.','a'],
[2021.98,'25 décembre 2021','Lancement du télescope James Webb','Il observe l’Univers dans l’infrarouge.','a'],
[2024.5,'9 juillet 2024','Premier vol d’Ariane 6','Nouveau lanceur européen, depuis Kourou.','a']
].forEach(e=>T.push(e));

C.push({id:'5-1', th:'t5', title:'Des premiers rêves aux premiers avions (jusqu’en 1914)', min:14,
goals:['situer les débuts de l’aérostation et de l’aviation','associer pionniers, machines et dates','comprendre pourquoi la France a joué un rôle central'],
body:`
<p>Les hommes ont toujours regardé les oiseaux avec envie : le mythe d’Icare en est le témoin. Mais voler vraiment a demandé du génie, des essais et du courage.</p>
<h2>Les ballons : l’air conquis en 1783</h2>
<ul><li><b>Léonard de Vinci</b> (vers 1490) dessine des machines volantes, mais aucune ne vole.</li><li>Juin 1783 : les frères <b>Montgolfier</b> font s’élever un ballon à air chaud à Annonay.</li><li><b>21 novembre 1783</b> : <b>Pilâtre de Rozier</b> et le <b>marquis d’Arlandes</b> sont les premiers humains à voler, à Paris, en montgolfière.</li><li><b>1er décembre 1783</b> : <b>Jacques Charles</b> et Robert volent dans un ballon à hydrogène.</li><li><b>1852</b> : <b>Henri Giffard</b> réalise le premier dirigeable à vapeur. <b>1900</b> : premier Zeppelin allemand.</li></ul>
<h2>Les planeurs, puis l’avion</h2>
<div class="figslot" data-fig="wrightbar"></div>
<ul><li><b>Otto Lilienthal</b> (1891-1896), Allemand, accomplit plus de 2 000 vols planés.</li><li><b>9 octobre 1890</b> : <b>Clément Ader</b> décolle avec l’<b>Éole</b>, un appareil à moteur à vapeur, sur environ 50 m. Il invente le mot « avion ».</li><li><b>17 décembre 1903</b> : les frères <b>Wright</b> réussissent à Kitty Hawk le premier vol motorisé, soutenu et contrôlé.</li><li><b>1906</b> : <b>Alberto Santos-Dumont</b> vole avec le 14-bis à Paris (Bagatelle), premier vol homologué en Europe.</li><li><b>1907</b> : <b>Paul Cornu</b> réalise le premier décollage libre d’un hélicoptère.</li></ul>
<h2>L’effervescence de 1909-1914</h2>
<ul><li><b>25 juillet 1909</b> : <b>Louis Blériot</b> traverse la Manche en 37 minutes. Le monde comprend que l’avion peut franchir des obstacles.</li><li><b>1910</b> : <b>Henri Fabre</b> fait voler le premier hydravion ; <b>Raymonde de Laroche</b> est la première femme à obtenir le brevet de pilote.</li><li><b>1913</b> : <b>Roland Garros</b> traverse la Méditerranée (Fréjus-Bizerte).</li></ul>
<div class="callout en-clair"><b>En clair</b>Jusqu’en 1903 on apprenait à flotter (ballons) puis à planer (Lilienthal). Les Wright ont réussi à combiner le vol motorisé et la maîtrise du pilotage : c’est ce qui fait leur gloire.</div>
<div class="simslot" data-sim="timeline" data-era="o"></div>
`,
keep:['21 novembre 1783 : premiers humains en montgolfière (Pilâtre de Rozier, marquis d’Arlandes). 1er décembre : Charles et Robert, ballon à hydrogène.','1852 : dirigeable de Giffard. 1890 : Éole d’Ader.','17 décembre 1903 : premier vol motorisé contrôlé, frères Wright.','1906 : Santos-Dumont (14-bis). 25 juillet 1909 : Blériot traverse la Manche.','1910 : premier hydravion (Fabre) et première femme brevetée (Raymonde de Laroche).'],
traps:['Ader a décollé en 1890 mais son vol n’était pas contrôlé ni soutenu : on retient les Wright pour le premier vol complet.','Ne confonds pas les Montgolfier (air chaud) et Charles (hydrogène).'],
qs:[
['Qui sont les deux premiers hommes à voler en ballon à air chaud, en 1783 ?','Pilâtre de Rozier et le marquis d’Arlandes','Jacques Charles et Robert','Les frères Wright','Louis Blériot et Henri Farman','Ils sont partis de Paris le 21 novembre 1783 dans la montgolfière des frères Montgolfier.'],
['Quel gaz Jacques Charles utilisait-il pour son ballon, le 1er décembre 1783 ?','L’hydrogène','L’air chaud','L’hélium','Le méthane','Charles lança les ballons à gaz (« charlières ») avec de l’hydrogène.'],
['Quel pionnier français décolle avec l’Éole en 1890 ?','Clément Ader','Louis Blériot','Henri Fabre','Alberto Santos-Dumont','Ader fit décoller l’Éole le 9 octobre 1890. C’est lui qui a baptisé « avion » ses machines.'],
['Que réussissent les frères Wright le 17 décembre 1903 ?','Le premier vol motorisé, soutenu et contrôlé','La traversée de la Manche','Le premier vol en ballon','Le premier vol en hélicoptère','Le Wright Flyer a volé à Kitty Hawk, en Caroline du Nord.'],
['Quelle traversée Louis Blériot réalise-t-il en 1909 ?','La Manche','L’Atlantique','La Méditerranée','Les Alpes','Il relie Calais à Douvres en 37 minutes, sur le Blériot XI.']
]});

C.push({id:'5-2', th:'t5', title:'Guerre, records et lignes aériennes (1914-1939)', min:14,
goals:['expliquer le rôle de l’aviation pendant la Première Guerre mondiale','situer les grands records et les premières lignes commerciales','citer les grandes figures de l’entre-deux-guerres'],
body:`
<h2>La Grande Guerre (1914-1918)</h2>
<p>En quatre ans, l’avion passe de curiosité à arme décisive. Les premiers avions servent à la <b>reconnaissance</b>. Pour les abattre, on invente la <b>chasse</b>, avec des mitrailleuses qui tirent à travers le disque de l’hélice. Puis viennent le <b>bombardement</b> et la photographie aérienne. Des as marquent les esprits : <b>Georges Guynemer</b> (France), <b>René Fonck</b> (France, premier as allié en nombre de victoires), <b>Manfred von Richthofen</b>, « le Baron rouge » (Allemagne). Avions célèbres : <b>SPAD XIII</b>, Nieuport, Sopwith Camel, Fokker Dr.I.</p>
<h2>L’aviation civile naît</h2>
<ul><li><b>1919</b> : <b>Alcock et Brown</b> effectuent la première traversée sans escale de l’Atlantique Nord (Terre-Neuve → Irlande).</li><li><b>1919</b> : <b>Pierre-Georges Latécoère</b> ouvre la ligne <b>Toulouse-Casablanca</b>, qui deviendra l’<b>Aéropostale</b> avec <b>Jean Mermoz</b>, <b>Henri Guillaumet</b> et <b>Antoine de Saint-Exupéry</b>, pilotes du courrier vers l’Amérique du Sud.</li><li><b>1927</b> : <b>Charles Lindbergh</b> relie <b>New York à Paris</b> en solitaire, sans escale, en 33 h 30.</li><li><b>1930</b> : Mermoz traverse l’Atlantique Sud avec du courrier. Dieudonné <b>Costes</b> et Maurice <b>Bellonte</b> réalisent Paris-New York.</li><li><b>1933</b> : création de la compagnie nationale <b>Air France</b>.</li></ul>
<h2>Des pionnières</h2>
<p>Raymonde de Laroche (1910), Adrienne Bolland (traversée des Andes, 1921), Maryse Bastié et Hélène Boucher (records dans les années 1930), l’Américaine Amelia Earhart (traversée de l’Atlantique en solitaire en 1932).</p>
<h2>Évolution technique</h2>
<p>Entre 1919 et 1939, l’avion passe du bois et de la toile au métal, du biplan au monoplan, du train fixe au train rentrant. Les vitesses et les distances explosent. En 1937, le Hindenburg, dirigeable rempli d’hydrogène, brûle à Lakehurst : la fin de l’ère des grands dirigeables transatlantiques. L’avion de ligne prend le relais.</p>
<div class="simslot" data-sim="timeline" data-era="g"></div>
`,
keep:['Première Guerre mondiale : reconnaissance, puis chasse, puis bombardement.','1919 : Alcock et Brown (Atlantique Nord) ; Latécoère (Toulouse-Casablanca) → Aéropostale (Mermoz, Saint-Exupéry).','1927 : Lindbergh, New York-Paris en solitaire.','1933 : naissance d’Air France.','1937 : Hindenburg, fin des grands dirigeables.'],
traps:['Lindbergh a volé de New York à Paris (1927) ; Alcock et Brown ont traversé en 1919 en équipage, de Terre-Neuve à l’Irlande.','Saint-Exupéry est pilote de l’Aéropostale avant d’être l’auteur du Petit Prince.'],
qs:[
['Quel rôle a d’abord joué l’avion pendant la Première Guerre mondiale ?','La reconnaissance','Le bombardement lourd','Le transport de troupes','La lutte anti-sous-marine','Les premiers avions de guerre ont observé les lignes ennemies. La chasse et le bombardement viennent ensuite.'],
['Qui relie New York à Paris en solitaire sans escale en 1927 ?','Charles Lindbergh','Jean Mermoz','Louis Blériot','Roland Garros','Lindbergh traverse l’Atlantique en 33 h 30 à bord du Spirit of St. Louis.'],
['L’Aéropostale transportait principalement :','le courrier','des marchandises lourdes','des soldats','des touristes','L’Aéropostale reliait la France à l’Afrique et à l’Amérique du Sud pour le courrier. Mermoz et Saint-Exupéry y volaient.'],
['Qui a été la première femme à obtenir un brevet de pilote, en 1910 ?','Raymonde de Laroche','Amelia Earhart','Maryse Bastié','Hélène Boucher','Raymonde de Laroche a obtenu le brevet n° 36 de l’Aéro-Club de France.'],
['En 1919, Alcock et Brown réussissent :','la première traversée sans escale de l’Atlantique Nord','le premier vol en hélicoptère','la traversée de la Manche','le premier vol supersonique','Ils ont volé de Terre-Neuve à l’Irlande.']
]});

C.push({id:'5-3', th:'t5', title:'Jets, avions de ligne et Concorde (depuis 1939)', min:14,
goals:['expliquer l’arrivée du moteur à réaction et du vol supersonique','situer Caravelle, Concorde et Airbus','comprendre le rôle de Toulouse dans l’aéronautique européenne'],
body:`
<h2>L’ère du moteur à réaction</h2>
<ul><li><b>27 août 1939</b> : l’allemand <b>Heinkel He 178</b> est le premier avion à réaction à voler, avec un turboréacteur conçu par Hans von Ohain. En Grande-Bretagne, Frank Whittle développe en parallèle son propre moteur.</li><li>Pendant la Seconde Guerre mondiale, la guerre du ciel fait progresser les techniques : radar, avions rapides, premiers chasseurs à réaction, bombardiers lourds. La Bataille d’Angleterre (1940) oppose Spitfire et Messerschmitt Bf 109. Les Français libres combattent dans la RAF et le régiment <b>Normandie-Niemen</b> aux côtés des Soviétiques.</li><li><b>14 octobre 1947</b> : <b>Chuck Yeager</b> franchit le mur du son (Mach 1) à bord du Bell X-1.</li></ul>
<h2>L’avion de ligne à réaction</h2>
<div class="figslot" data-fig="speedbars"></div>
<ul><li>Le <b>de Havilland Comet</b> (Royaume-Uni, 1952) est le premier avion de ligne à réaction en service.</li><li>La <b>Caravelle</b> (Sud-Aviation, premier vol en 1955) est un moyen-courrier français à réaction aux moteurs placés à l’arrière du fuselage : une configuration reprise ensuite par beaucoup d’appareils.</li><li>Le <b>Boeing 747</b> (1969) est le premier avion de ligne à fuselage large, le « jumbo jet ».</li></ul>
<h2>Concorde, symbole franco-britannique</h2>
<p>Le <b>Concorde</b> est un avion de ligne supersonique développé conjointement par la France et le Royaume-Uni. Premier vol le <b>2 mars 1969</b> à Toulouse (pilote André Turcat) ; service commercial le <b>21 janvier 1976</b> ; croisière à <b>Mach 2</b> (plus de 2 100 km/h) vers <b>18 000 m</b> ; Paris-New York en environ <b>3 h 30</b>. Retiré du service en <b>2003</b> (coûts, bruit, accident de 2000, baisse du trafic).</p>
<h2>Airbus : l’Europe unie dans l’air</h2>
<p>Airbus naît en <b>1970</b> comme consortium européen, avec Toulouse pour centre d’assemblage final. <b>A300</b> (premier vol en 1972), <b>A320</b> (1987, premier avion de ligne à commandes de vol électriques), <b>A380</b> (2005, double pont), <b>A350</b> (2013, composites). Autres entreprises françaises : <b>Dassault Aviation</b> (Mirage, Rafale), <b>Airbus Helicopters</b> (ex-Eurocopter, ex-Aérospatiale), <b>Safran</b> (moteurs).</p>
<div class="callout exemple"><b>Exemple</b>Quand un avion passe le mur du son, il laisse derrière lui une onde de choc que l’on entend au sol sous la forme d’un « bang ».</div>
<div class="simslot" data-sim="timeline" data-era="j"></div>
`,
keep:['27 août 1939 : He 178, premier avion à réaction (turboréacteur de von Ohain).','14 octobre 1947 : Yeager franchit le mur du son sur le Bell X-1.','Caravelle (premier vol 1955) : moyen-courrier français à réaction, moteurs à l’arrière.','Concorde : 2 mars 1969, Mach 2, 18 000 m, Paris-New York en 3 h 30, retiré en 2003.','Airbus : 1970 ; A320 (1987), premier avion de ligne civil à commandes de vol électriques.'],
traps:['Le Concorde a volé pour la première fois en 1969 mais n’est entré en service commercial qu’en 1976.','Le Comet britannique est le premier avion de ligne à réaction, pas la Caravelle.'],
qs:[
['Qui franchit le mur du son en 1947 à bord du Bell X-1 ?','Chuck Yeager','Neil Armstrong','Youri Gagarine','André Turcat','Yeager atteint Mach 1 le 14 octobre 1947 aux États-Unis.'],
['Quel avion est le premier avion à réaction à voler, en 1939 ?','Le Heinkel He 178','Le Concorde','La Caravelle','Le Comet','Le He 178, allemand, vole avec un turboréacteur à la fin d’août 1939.'],
['Le Concorde effectue son premier vol à :','Toulouse, en 1969','Paris, en 1976','Londres, en 1947','Le Bourget, en 1955','Premier vol le 2 mars 1969 à Toulouse. Le service commercial débute en 1976.'],
['L’Airbus A320 est célèbre car il est le premier avion de ligne civil à :','avoir des commandes de vol électriques','dépasser Mach 1','avoir quatre réacteurs','être fabriqué en composite','L’A320, en 1987, remplace les liaisons mécaniques par des calculateurs.'],
['La Caravelle se distingue par :','ses moteurs placés à l’arrière du fuselage','sa vitesse supersonique','ses quatre hélices','son pont double','La Caravelle, avion de ligne à réaction de 1955, a ses réacteurs à l’arrière.']
]});

C.push({id:'5-4', th:'t5', title:'La conquête spatiale (1957-2000)', min:16,
goals:['situer les grandes premières de l’exploration spatiale','expliquer le contexte de la course à l’espace','citer les acteurs français et européens'],
body:`
<h2>La course à l’espace</h2>
<p>Après la Seconde Guerre mondiale, les États-Unis et l’URSS s’affrontent dans la guerre froide… et dans l’espace. Chaque exploit est une victoire de prestige. Les fusées d’exploration descendent des missiles : la <b>V2</b> allemande, conçue par Wernher von Braun, en est l’ancêtre.</p>
<h2>Les grandes premières</h2>
<div class="figslot" data-fig="apollo"></div>
<div class="tw"><table><tr><th>Date</th><th>Événement</th></tr>
<tr><td>4 octobre 1957</td><td><b>Spoutnik 1</b> (URSS) : premier satellite artificiel</td></tr>
<tr><td>3 novembre 1957</td><td>Spoutnik 2 : la chienne Laïka, premier être vivant en orbite</td></tr>
<tr><td>1958</td><td>Explorer 1 (États-Unis) ; création de la NASA</td></tr>
<tr><td>12 avril 1961</td><td><b>Youri Gagarine</b> (URSS) : premier homme dans l’espace, un tour de Terre en 108 minutes (Vostok 1)</td></tr>
<tr><td>1961</td><td>Création du <b>CNES</b> (France)</td></tr>
<tr><td>1963</td><td>Valentina Terechkova : première femme dans l’espace</td></tr>
<tr><td>1965</td><td>Alexeï Leonov : première sortie dans l’espace. <b>Astérix</b> : premier satellite français, lancé par une fusée française Diamant</td></tr>
<tr><td>20-21 juillet 1969</td><td><b>Apollo 11</b> : <b>Neil Armstrong</b> et Buzz Aldrin marchent sur la Lune (fusée Saturn V). Michael Collins reste en orbite.</td></tr>
<tr><td>1972</td><td>Apollo 17 : dernière mission lunaire habitée</td></tr>
<tr><td>1975</td><td>Création de l’<b>ESA</b> ; mission conjointe Apollo-Soyouz</td></tr>
<tr><td>24 décembre 1979</td><td>Premier vol d’<b>Ariane 1</b>, à Kourou</td></tr>
<tr><td>1981</td><td>Premier vol de la <b>navette spatiale</b> (Columbia)</td></tr>
<tr><td>1982</td><td><b>Jean-Loup Chrétien</b> : premier Français dans l’espace</td></tr>
<tr><td>1986</td><td>Accident de Challenger ; lancement de la station Mir</td></tr>
<tr><td>1990</td><td>Télescope spatial Hubble</td></tr>
<tr><td>1996</td><td>Claudie Haigneré : première Française dans l’espace</td></tr>
<tr><td>1998</td><td>Premier module de la Station spatiale internationale (ISS)</td></tr></table></div>
<div class="callout en-clair"><b>En clair</b>Un sentiment de rivalité a produit une avance technique incroyable : en douze ans, on est passé du premier satellite à l’homme sur la Lune.</div>
<h2>L’espace comme outil</h2>
<p>À côté de l’exploration, les satellites sont devenus utiles : télécommunications, météorologie (Météosat), observation de la Terre (SPOT), navigation (GPS, puis Galileo). La France, via le CNES, a joué un rôle central dans l’espace européen et a créé le centre spatial guyanais de Kourou.</p>
<div class="simslot" data-sim="timeline" data-era="s"></div>
`,
keep:['1957 : Spoutnik 1 (URSS), premier satellite. 1961 : Gagarine, premier homme dans l’espace.','1965 : Astérix, premier satellite français ; 1961 : CNES ; 1975 : ESA.','Juillet 1969 : Apollo 11, Armstrong et Aldrin sur la Lune.','24 décembre 1979 : premier vol d’Ariane 1, depuis Kourou.','1982 : Jean-Loup Chrétien, premier Français dans l’espace.'],
traps:['Armstrong n’était pas seul sur la Lune : Aldrin l’accompagnait, Collins attendait en orbite.','Le premier être vivant en orbite est la chienne Laïka (1957), pas un homme.'],
qs:[
['Quel est le premier satellite artificiel, lancé en 1957 ?','Spoutnik 1','Explorer 1','Astérix','Hubble','L’URSS lance Spoutnik 1 le 4 octobre 1957.'],
['Qui est le premier homme dans l’espace, le 12 avril 1961 ?','Youri Gagarine','Neil Armstrong','Alan Shepard','Jean-Loup Chrétien','Gagarine fait une orbite complète de la Terre à bord de Vostok 1.'],
['Quel événement a lieu en juillet 1969 ?','Les premiers pas de l’homme sur la Lune (Apollo 11)','Le premier vol de Concorde','Le lancement de Spoutnik','La création de l’ESA','Neil Armstrong et Buzz Aldrin se posent sur la Lune, tandis que Michael Collins reste en orbite lunaire.'],
['Quel est le premier satellite français, lancé en 1965 par une fusée française ?','Astérix','Spoutnik','Météosat','Hipparcos','Astérix est lancé par la fusée Diamant, depuis le Sahara algérien.'],
['Qui est le premier Français dans l’espace, en 1982 ?','Jean-Loup Chrétien','Thomas Pesquet','Claudie Haigneré','Patrick Baudry','Jean-Loup Chrétien a volé à bord de Soyouz T-6 vers la station soviétique Salyut 7.']
]});

C.push({id:'5-5', th:'t5', title:'L’espace et l’aéronautique d’aujourd’hui et de demain', min:16,
goals:['connaître les grands programmes spatiaux actuels','citer des astronautes français et des missions européennes','comprendre les enjeux de la transition écologique'],
body:`
<h2>Une présence permanente en orbite</h2>
<p>La <b>Station spatiale internationale</b> (ISS) est occupée en continu depuis novembre 2000. Elle orbite à environ 400 km d’altitude et fait le tour de la Terre en 92 minutes. Quinze nations y ont contribué (États-Unis, Russie, Europe, Japon, Canada). Des astronautes y mènent des expériences en apesanteur.</p>
<div class="figslot" data-fig="iss"></div>
<p>Les astronautes français de l’ESA : Jean-Loup Chrétien, Patrick Baudry, Claudie Haigneré, Jean-Pierre Haigneré, Léopold Eyharts, Philippe Perrin, Michel Tognini, Jean-François Clervoy, Frank De Winne (belge)… et <b>Thomas Pesquet</b>, deux séjours à bord de l’ISS (missions <i>Proxima</i> en 2016-2017 et <i>Alpha</i> en 2021).</p>
<h2>Exploration scientifique</h2>
<ul><li><b>Rosetta et Philae</b> (ESA) : en 2014, après un voyage de dix ans, la sonde Rosetta met en orbite la comète 67P/Tchourioumov-Guérassimenko et dépose l’atterrisseur Philae à sa surface.</li><li><b>Télescopes</b> : Hubble (1990), <b>James Webb</b> (lancé le 25 décembre 2021 par une Ariane 5), qui observe l’Univers lointain en infrarouge.</li><li><b>Mars</b> : robots Spirit et Opportunity (2004), Curiosity (2012), Perseverance (2021).</li><li>Retour vers la <b>Lune</b> : le programme Artemis vise à envoyer à nouveau des humains.</li></ul>
<h2>Les lanceurs</h2>
<p>L’Europe a longtemps lancé avec <b>Ariane 5</b> (1996-2023). <b>Ariane 6</b>, plus modulable, a fait son premier vol le <b>9 juillet 2024</b>. Autre lanceur européen : <b>Vega-C</b>. La société américaine <b>SpaceX</b> a lancé le « New Space » : son lanceur <b>Falcon 9</b> est en partie <b>réutilisable</b> (le premier étage atterrit et repart), ce qui baisse les coûts.</p>
<h2>L’espace au quotidien</h2>
<p>Navigation (GPS, <b>Galileo</b>), météo (Météosat, MetOp), télécoms, surveillance du climat, gestion des catastrophes naturelles : l’espace est devenu une infrastructure indispensable.</p>
<h2>Aéronautique et transition écologique</h2>
<p>Objectif du secteur : atteindre la neutralité carbone en 2050. Pistes :</p>
<ul><li>des avions plus légers et plus sobres (matériaux composites, moteurs plus efficaces) ;</li><li>des <b>carburants d’aviation durables</b> (SAF) ;</li><li>l’<b>électrique</b> et l’<b>hybride</b> pour les petits avions et les hélicoptères ;</li><li>l’<b>hydrogène</b> à plus long terme ;</li><li>de meilleures trajectoires et une réduction du bruit.</li></ul>
<h2>La culture aéronautique</h2>
<p>Le <b>Salon du Bourget</b> (Paris Air Show) a lieu tous les deux ans, les années impaires. Le <b>Musée de l’Air et de l’Espace</b> du Bourget est l’un des plus grands musées de l’aéronautique du monde. La <b>Patrouille de France</b> est la patrouille acrobatique de l’Armée de l’air et de l’espace. Les métiers sont variés : pilote, contrôleur aérien, mécanicien, ingénieur, météorologue, technicien de maintenance, métiers du spatial.</p>
<div class="simslot" data-sim="timeline" data-era="a"></div>
`,
keep:['ISS : environ 400 km, 92 min par tour, occupée en continu depuis 2000.','Thomas Pesquet : spationaute ESA, missions Proxima (2016-2017) et Alpha (2021).','2014 : Philae sur la comète 67P (Rosetta). 2021 : James Webb. 9 juillet 2024 : premier vol d’Ariane 6.','Falcon 9 : premier étage réutilisable. SAF : carburants d’aviation durables.','Salon du Bourget tous les deux ans (années impaires).'],
traps:['James Webb est un télescope infrarouge placé loin de la Terre, pas en orbite basse comme Hubble.','Philae est l’atterrisseur ; Rosetta est la sonde qui l’a transporté.'],
qs:[
['À quelle altitude orbite environ la Station spatiale internationale ?','400 km','36 000 km','4 000 km','40 km','L’ISS orbite en orbite basse, vers 400 km, en 92 minutes.'],
['Quel spationaute français a séjourné deux fois sur l’ISS (2016-2017 et 2021) ?','Thomas Pesquet','Jean-Loup Chrétien','Patrick Baudry','Claudie Haigneré','Thomas Pesquet a mené les missions Proxima et Alpha.'],
['En 2014, qui atterrit sur la comète 67P ?','Philae, transporté par Rosetta','Hubble','Curiosity','Voyager','Rosetta, sonde de l’ESA, y a déposé l’atterrisseur Philae.'],
['Quel lanceur européen a effectué son premier vol en juillet 2024 ?','Ariane 6','Ariane 5','Soyouz','Falcon 9','Ariane 6 succède à Ariane 5, qui a volé de 1996 à 2023.'],
['Que désigne le sigle SAF ?','Les carburants d’aviation durables','Un système d’alerte au feu','Un type de moteur-fusée','Un radar secondaire','Les SAF (Sustainable Aviation Fuels) réduisent l’empreinte carbone de l’aviation.']
]});
})();
