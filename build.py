import re
import os
root=os.path.dirname(os.path.abspath(__file__))
src=os.path.join(root,'src')+'/'
css=open(src+'style.css').read()
order=['boot.js','content-1.js','content-2.js','content-3.js','content-4.js','content-5.js','content-6.js','sims1.js','sims2.js','sims3.js','sims4.js','gfx.js','flightmodel.js','sims5.js','sims6.js','intros.js','vocab.js','simple.js','figs1.js','figs2.js','figs3.js','figs4.js','figs5.js','figs6.js','figs7.js','figs8.js','figs9.js','figs10.js','figs11.js','figs12.js','app.js']
js='\n'.join(open(src+f).read() for f in order)
js=js.replace('</script>','<\\/script>')
html='''<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cap BIA</title>
<link rel="stylesheet" href="fonts/fonts.css">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<meta name="theme-color" content="#0D1B2E">
<meta name="description" content="Cap BIA : préparer le Brevet d’Initiation Aéronautique avec des leçons illustrées, des simulateurs, des quiz et des examens blancs.">
<style>
'''+css+'''
</style>
</head>
<body>
<div id="app"><main id="main"></main></div>
<div class="tabs-bar" id="tabbar"></div>
<script>
'''+js+'''
</script>
</body>
</html>
'''
open(os.path.join(root,'index.html'),'w').write(html)
print(len(html))
