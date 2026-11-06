(function(){
/* Modèle de vol simplifié mais cohérent (avion léger type DR400 / C172) :
   point matériel + assiette, portance/traînée/poussée, stabilité en tangage, virage coordonné, décrochage. */
const FM=window.BIA.fm={};
const D2R=Math.PI/180, R2D=180/Math.PI, G=9.81, M=1000, S=16, MS2KT=1.943844, FT=3.28084;
FM.C={M,S,Vr:55,Vy:74,Vne:163,Vfe:85,Vno:129};
const FLAPCL=[0,.18,.38,.55], FLAPCD=[0,.008,.022,.045], ACRIT=[16,15.5,15,14.5];
FM.flapDeg=[0,10,20,30];
const rho=h=>1.225*Math.exp(-Math.max(0,h)/9000);
const CLof=(adeg,fl)=>{ const c0=.31+.095*adeg+FLAPCL[fl]; const ac=ACRIT[fl]; if(adeg<=ac) return c0; const cm=.31+.095*ac+FLAPCL[fl]; return cm*(1-.45*Math.min(1,(adeg-ac)/5)); };
FM.CL=CLof; FM.acrit=fl=>ACRIT[fl];
FM.clmax=fl=>.31+.095*ACRIT[fl]+FLAPCL[fl];
FM.vstall=(h,fl,n)=>Math.sqrt(2*M*G*(n||1)/(rho(h)*S*FM.clmax(fl)))*MS2KT;
FM.alphaFor=(Vms,h,fl,n)=>{ const cl=2*M*G*(n||1)/(rho(h)*S*Vms*Vms); return (cl-.31-FLAPCL[fl])/.095; };
FM.trimFor=(Vms,h,fl)=>clampT((FM.alphaFor(Vms,h,fl)-.7)/.55);
const clampT=v=>Math.max(-10,Math.min(10,v));
FM.RW={len:1500,wid:30};
FM.newState=function(sc){ const s={px:0,py:60,h:0,psi:0,th:0,ph:0,q:0,p:0,V:0,gam:0,ground:true,stalled:false,stallT:0,fl:0,wx:0,wy:0,nz:1,aoa:0,T:0,L:0,D:0,over:false,td:null,t:0,wasStalled:false,msg:null,vs:0,hw:0,bounced:false,onRw:true};
  return s; };
FM.step=function(s,inp,dt){ if(s.over) return; s.t+=dt;
  const thr=inp.thr, fl=s.fl, hw=-(s.wx*Math.sin(s.psi)+s.wy*Math.cos(s.psi)), cw=(s.wx*Math.cos(s.psi)-s.wy*Math.sin(s.psi)); s.hw=hw; s.cw=cw;
  const ro=rho(s.h), K0=.5*ro*S/M;
  const Pshaft=77000, Tstat=2000;
  if(s.ground){
    const Vg=s.Vg||0; let V=Math.max(0,Vg+hw); s.V=V; const T=thr*Math.min(Tstat,Pshaft/Math.max(V,12))/M;
    const roll=(Math.abs(s.px)>16||s.py<0||s.py>FM.RW.len)?.07:.025; let a=T-(Vg>.3?(roll*G+K0*V*V*(.032+FLAPCD[fl])):0)-(inp.brake&&Vg>0?3.8:0);
    let nVg=Math.max(0,Vg+a*dt); s.Vg=nVg; V=Math.max(0,nVg+hw); s.V=V;
    const auth=Math.min(1,(V/22)*(V/22)); const thc=Math.max(0,Math.min(14,(inp.pull*11+inp.trim*.7+ (inp.pull>0?0:0))*auth)); s.th+=(thc*D2R-s.th)*Math.min(1,dt*2.2); s.ph=0;
    s.psi+=(inp.aile*(.1)*Math.min(1,nVg/6)- s.cw*0.0)*dt*2.2*(nVg>1?1:0); s.psi=((s.psi+Math.PI*2+Math.PI)%(Math.PI*2))-Math.PI;
    const ang=s.th*R2D; const cl=CLof(ang,fl)*(1+0.12); const L=K0*V*V*cl; s.L=L; s.nz=L/G; s.T=T; s.D=K0*V*V*(.032+FLAPCD[fl]); s.aoa=ang;
    s.px+=nVg*Math.sin(s.psi)*dt; s.py+=nVg*Math.cos(s.psi)*dt; s.gam=0; s.vs=0;
    if(L>=G*0.985&&ang>2.2){ s.ground=false; s.gam=.004; s.q=0; s.Vair=V; s.liftoff={V:V*MS2KT,t:s.t}; }
    if(s.py>FM.RW.len+120&&nVg>6&&!s.over){ s.over=true; s.msg=['bad','Sortie de piste : tu as dépassé la fin de la piste.']; }
    if(Math.abs(s.px)>45&&nVg>6&&!s.over){ s.over=true; s.msg=['bad','Tu es sorti de la piste sur le côté.']; }
    return; }
  // ---------- en vol ----------
  const V=Math.max(8,s.V), adeg=(s.th-s.gam)*R2D; s.aoa=adeg; const ac=ACRIT[fl];
  if(!s.stalled&&adeg>ac){ s.stalled=true; s.stallT=0; if(Math.abs(s.p)<.3) s.p+=(Math.random()<.5?-1:1)*.38; s.stalls=(s.stalls||0)+1; }
  else if(s.stalled&&adeg<ac-2.5){ s.stalled=false; s.recovered=s.t; }
  if(s.stalled) s.stallT+=dt;
  let cl=CLof(adeg,fl); const hh=s.h; let ge=1, gi=1; if(hh<12){ const f=Math.pow(1-hh/12,1.5); ge=1+.12*f; gi=1-.35*f; }
  cl*=ge; const L=K0*V*V*cl; const cd=(.032+FLAPCD[fl]+.0566*cl*cl*gi)*(s.stalled?2.2:1); const Dm=K0*V*V*cd; const T=thr*Math.min(Tstat,Pshaft/Math.max(V,12))/M;
  s.L=L; s.D=Dm; s.T=T; s.nz=(L*Math.cos(s.ph))/G*(Math.cos(s.gam)>0?1:1); s.nz=L/G;
  const a=adeg*D2R; s.V=Math.max(6,V+(T*Math.cos(a)-Dm-G*Math.sin(s.gam))*dt);
  s.gam+=((L*Math.cos(s.ph)+T*Math.sin(a))/V-G*Math.cos(s.gam)/V)*dt; s.gam=Math.max(-1.3,Math.min(1.3,s.gam));
  const psiRate=L*Math.sin(s.ph)/(V*Math.max(.3,Math.cos(s.gam))); s.psi+=psiRate*dt; s.psi=((s.psi+Math.PI*2+Math.PI)%(Math.PI*2))-Math.PI; s.psiRate=psiRate;
  // tangage : mode court-période amorti ; l'assiette d'équilibre dépend du manche et du compensateur
  const aeq=(.7+.55*inp.trim+18*inp.pull-(s.stalled?9:0)-(fl>0?0:0))*D2R; const om=4.2, ze=.65; const aa=s.th-s.gam;
  s.q+=(-om*om*(aa-aeq)-2*ze*om*s.q)*dt; s.th+=s.q*dt; s.th=Math.max(-1.2,Math.min(1.3,s.th));
  // roulis
  const pmax=(s.stalled?.45:1)*45*D2R; s.p+=((inp.aile*pmax-s.p)/.45)*dt; s.ph+=(s.p-.03*s.ph)*dt; s.ph=Math.max(-1.45,Math.min(1.45,s.ph));
  // position
  s.h+=s.V*Math.sin(s.gam)*dt; const vh=s.V*Math.cos(s.gam); s.px+=(vh*Math.sin(s.psi)+s.wx)*dt; s.py+=(vh*Math.cos(s.psi)+s.wy)*dt; s.vs=s.V*Math.sin(s.gam);
  s.ball=Math.max(-1,Math.min(1,-s.p*2.3+(s.cw||0)*0));
  if(s.h<=0){ const sink=-s.V*Math.sin(s.gam), th=s.th*R2D, bank=s.ph*R2D, kt=s.V*MS2KT; const onRw=Math.abs(s.px)<=16&&s.py>=0&&s.py<=FM.RW.len;
    const rec={vs:Math.round(sink*FT*60),kt:Math.round(kt),pitch:th,bank:bank,x:s.px,y:s.py,onRw};
    if(sink>4.6||kt>115||th<-3||Math.abs(bank)>14||th>16){ s.over=true; s.td=rec; s.msg=['bad',sink>4.6?'Impact trop violent ('+rec.vs+' ft/min). Il faut arrondir : tirer doucement et réduire les gaz juste avant le sol.':th<-3?'Tu as touché le sol nez en bas.':th>16?'Assiette trop cabrée : la queue a touché.':Math.abs(bank)>14?'Tu as touché avec une aile basse.':'Trop rapide au contact.']; return; }
    if(sink>2.7&&!s.bounced){ s.bounced=true; s.h=.2; s.gam=Math.min(.09,sink*.4/s.V); s.V*=.97; s.bounce=true; return; }
    s.h=0; s.ground=true; s.Vg=Math.max(0,s.V*Math.cos(s.gam)-hw); s.gam=0; s.q=0; s.ph=0; s.p=0; s.td=rec; s.th=Math.max(0,s.th); s.stalled=false; }
};
})();
