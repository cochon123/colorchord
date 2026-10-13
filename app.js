const COLORS=['#ff3b30','#ff9500','#ffcc00','#34c759','#00c7be','#007aff','#af52de'];const NAMES=['Do','Re','Mi','Fa','Sol','La','Ti'];
const SCALES={maj:[0,2,4,5,7,9,11],pent:[0,2,4,7,9,12,14],min:[0,2,3,5,7,8,10]};
const c=document.getElementById('c'),x=c.getContext('2d');let col=0,strokes=[],cur=null,ac=null,last=0;
const pal=document.getElementById('pal');COLORS.forEach((h,i)=>{const b=document.createElement('button');b.className='sw'+(i?'':' on');b.style.background=h;b.setAttribute('role','radio');b.setAttribute('aria-label',NAMES[i]);
b.onclick=()=>{col=i;[...pal.children].forEach((e,j)=>e.classList.toggle('on',j==i))};pal.append(b)});
function freq(ci,y){const oct=Math.floor((1-y/c.height)*3);return 220*Math.pow(2,(SCALES[document.getElementById('scale').value][ci]+12*oct)/12)}
function tone(f,vol,when=0,dur=.25){ac=ac||new AudioContext();const t=ac.currentTime+when,o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;
g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+dur+.05)}
function pos(e){const r=c.getBoundingClientRect();return[(e.clientX-r.left)*c.width/r.width,(e.clientY-r.top)*c.height/r.height]}
c.onpointerdown=e=>{c.setPointerCapture(e.pointerId);cur={col,pts:[pos(e)]};strokes.push(cur)};
c.onpointermove=e=>{if(!cur)return;const p=pos(e),q=cur.pts[cur.pts.length-1],sp=Math.hypot(p[0]-q[0],p[1]-q[1]);cur.pts.push(p);
x.strokeStyle=COLORS[cur.col];x.lineWidth=4+Math.min(sp,30)/2;x.lineCap='round';x.shadowColor=COLORS[cur.col];x.shadowBlur=15;x.beginPath();x.moveTo(...q);x.lineTo(...p);x.stroke();
const now=performance.now();if(now-last>90){last=now;const f=freq(cur.col,p[1]);tone(f,Math.min(.05+sp/200,.3));document.getElementById('info').textContent=NAMES[cur.col]+' · '+Math.round(f)+' Hz'}};
c.onpointerup=()=>cur=null;
document.getElementById('play').onclick=()=>{let t=0;strokes.forEach(s=>s.pts.forEach((p,i)=>{if(i%6==0){tone(freq(s.col,p[1]),.12,t,.2);t+=.08}}));if(!strokes.length)document.getElementById('info').textContent='Paint something first!'};
document.getElementById('clr').onclick=()=>{strokes=[];x.clearRect(0,0,c.width,c.height)};
document.getElementById('save').onclick=()=>{const a=document.createElement('a');a.download='colorchord.png';a.href=c.toDataURL();a.click()};
