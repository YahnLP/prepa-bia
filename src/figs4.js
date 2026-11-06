(function(){
const F=window.BIA.figs, H=window.BIA._h, S=H.S, T=H.T, A=H.A, side=H.side;
const bars=(rows,max,unit,w0)=>rows.map((r,i)=>{ const y=14+i*50, w=Math.max(4,r[1]/max*w0); return T(8,y+8,r[0])+'<rect x="8" y="'+(y+14)+'" width="'+w+'" height="16" rx="3" class="'+(r[2]||'fA')+'"><animate attributeName="width" from="0" to="'+w+'" dur="1.6s" fill="freeze"/></rect>'+T(Math.min(8+w+6,300),y+27,r[3],'sm'); }).join('');

F['wrightbar']={cap:'<b>Le premier vol des frères Wright</b> (17 décembre 1903) a duré 12 secondes pour environ 37 m : moins que l’envergure d’un gros avion de ligne moderne comme l’Airbus A380 (près de 80 m). Tout a commencé par ce petit bond.',
svg:S(360,200,bars([['Premier vol des Wright (1903)',37,'fA','≈ 37 m en 12 s'],['Envergure d’un A380',80,'fB','≈ 80 m'],['Un terrain de football',105,'fG','≈ 105 m']],105,'m',300),'Comparaison de la longueur du premier vol des Wright, de l’envergure d’un A380 et d’un terrain de football'),alt:''};

F['speedbars']={cap:'<b>Des vitesses qui explosent.</b> En un peu plus d’un siècle, on est passé d’environ 50 km/h (Flyer des Wright, 1903) à plus de 2 000 km/h pour Concorde (Mach 2). Un avion de ligne actuel vole à environ 850 km/h, juste sous la vitesse du son.',
svg:S(360,226,bars([['Flyer des Wright (1903)',50,'fA','≈ 50 km/h'],['Avion de ligne actuel',850,'fB','≈ 850 km/h'],['Vitesse du son (à haute altitude)',1060,'fG','≈ 1 060 km/h (Mach 1)'],['Concorde (Mach 2)',2150,'fM','≈ 2 150 km/h']],2150,'km/h',280),'Comparaison de vitesses : Flyer, avion de ligne, son, Concorde'),alt:''};

F['apollo']={cap:'<b>Le voyage vers la Lune.</b> La Lune est à environ 384 000 km de la Terre. Les astronautes d’Apollo l’ont rejointe en environ trois jours. Le premier pas sur la Lune date du 21 juillet 1969 (Apollo 11).',
svg:S(360,196,
 '<rect x="0" y="0" width="360" height="196" fill="#0B1626"/>'+
 [..."abcdefghijklmnopqrstuv"].map((c,i)=>'<circle cx="'+((i*53)%350+4)+'" cy="'+((i*37)%180+4)+'" r="1" fill="#fff" opacity=".6"/>').join('')+
 '<circle cx="54" cy="98" r="28" fill="#2A78C8"/><path d="M40 90 q10 -10 22 -2 q6 8 -4 14 q-10 3 -18 -12z" fill="#4FA860"/>'+
 '<circle cx="306" cy="98" r="10" fill="#C9CED6"/>'+
 '<path id="apath" d="M84 90 C150 20 240 20 296 88" fill="none" stroke="#FFB02E" stroke-width="1.5" stroke-dasharray="5 5"/>'+
 '<g><polygon points="0,-5 8,0 0,5" fill="#FFB02E"/><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#apath"/></animateMotion></g>'+
 '<text x="54" y="148" class="mid" style="fill:#fff">Terre</text><text x="306" y="124" class="mid" style="fill:#fff">Lune</text>'+
 '<text x="180" y="50" class="mid" style="fill:#fff">≈ 384 000 km · ≈ 3 jours</text><text x="180" y="180" class="mid sm" style="fill:#9FB0C9">distances et tailles non respectées</text>',
 'Trajet Terre-Lune'),alt:''};

F['iss']={cap:'<b>La Station spatiale internationale (ISS)</b> vole à environ 400 km d’altitude, à près de 28 000 km/h. Elle fait le tour de la Terre en environ 1 h 30 : les astronautes voient donc le Soleil se lever et se coucher une quinzaine de fois par jour.',
svg:S(360,200,
 '<rect x="0" y="0" width="360" height="200" fill="#0B1626"/>'+
 '<circle cx="110" cy="100" r="46" fill="#2A78C8"/><path d="M84 86 q16 -14 34 -2 q8 12 -4 20 q-16 4 -30 -18z M118 116 q14 -2 20 8 q-8 12 -20 2z" fill="#4FA860"/>'+
 '<circle cx="110" cy="100" r="64" fill="none" stroke="#FFB02E" stroke-width="1" stroke-dasharray="4 4" opacity=".8"/>'+
 '<g><g transform="translate(174 100)"><rect x="-8" y="-2" width="16" height="4" fill="#E9EFF5"/><rect x="-14" y="-7" width="6" height="14" fill="#5FB0FF"/><rect x="8" y="-7" width="6" height="14" fill="#5FB0FF"/></g><animateTransform attributeName="transform" type="rotate" from="0 110 100" to="360 110 100" dur="5s" repeatCount="indefinite"/></g>'+
 '<text x="206" y="80" style="fill:#fff">ISS</text><text x="206" y="94" class="sm" style="fill:#fff">≈ 400 km d’altitude</text><text x="206" y="108" class="sm" style="fill:#fff">1 tour ≈ 1 h 30</text><text x="206" y="122" class="sm" style="fill:#fff">≈ 16 tours par jour</text>',
 'ISS en orbite autour de la Terre'),alt:''};

F['readback']={cap:'<b>Le collationnement.</b> Quand le contrôleur donne une instruction importante (piste, autorisation, cap, altitude), tu la <b>répètes</b> mot pour mot, suivie de ton indicatif. Ainsi, s’il y a un malentendu, tout le monde l’entend tout de suite.',
svg:'<div class="fh"><div class="row2"><span class="tok a">Tour</span><span>«&nbsp;F-ABCD, cleared to land, runway 27.&nbsp;»</span></div><div class="row2"><span class="tok">Toi</span><span>«&nbsp;Cleared to land, runway 27, F-ABCD.&nbsp;»</span></div><div class="row2"><span class="tok a">Tour</span><span>«&nbsp;F-ABCD, hold position.&nbsp;»</span></div><div class="row2"><span class="tok">Toi</span><span>«&nbsp;Hold position, F-ABCD.&nbsp;»</span></div></div>'};

F['saynum']={cap:'<b>Dire les chiffres en radio.</b> Pour éviter les confusions, on prononce les chiffres de façon spéciale. On les dit un par un. Le <b>3</b>, le <b>5</b> et le <b>9</b> se prononcent différemment pour ne pas être confondus.',
svg:'<div class="fh"><div class="row2"><span class="tok a">3</span><span>«&nbsp;tree&nbsp;» (et non «&nbsp;three&nbsp;»)</span></div><div class="row2"><span class="tok a">5</span><span>«&nbsp;fife&nbsp;»</span></div><div class="row2"><span class="tok a">9</span><span>«&nbsp;niner&nbsp;» (pour ne pas confondre avec «&nbsp;nine&nbsp;» / «&nbsp;nein&nbsp;»)</span></div><div class="row2"><span class="tok">1 000</span><span>«&nbsp;wun tousand&nbsp;» (on dit le chiffre, puis «&nbsp;tousand&nbsp;»)</span></div><div class="row2"><span class="tok">121,5</span><span>«&nbsp;wun too wun decimal fife&nbsp;» (la fréquence de détresse)</span></div></div>'};
})();
