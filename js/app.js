// Rendering, language switch and hash routing
let L=(()=>{try{return localStorage.getItem("lang")}catch(e){return null}})();
if(!UI[L])L=(navigator.language||"en").slice(0,2)==="ru"?"ru":(navigator.language||"").slice(0,2)==="kk"?"kk":"en";
const $=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
function pre(txt){const p=$("pre");p.textContent=txt;return p}
function excerpt(code,a,n){const ls=code.split("\n");const i=ls.findIndex(l=>l.includes(a));const s=ls.slice(i,i+n);const ind=Math.min(...s.filter(l=>l.trim()).map(l=>l.match(/^ */)[0].length));return s.map(l=>l.slice(ind)).join("\n")}
function route(){return (location.hash||"#overview").slice(1)}
function render(){
 document.documentElement.lang=L;
 document.getElementById("ttl").textContent=UI[L].t;
 document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("on",b.dataset.l===L));
 const r=route(),nav=document.getElementById("nav");nav.textContent="";
 const items=[["overview",UI[L].ov],...F.map(f=>[f.id,f.name])];
 items.forEach(([id,t])=>{const b=$("button",id===r?"on":"",t);b.onclick=()=>{location.hash=id};nav.append(b)});
 const app=document.getElementById("app");app.textContent="";
 if(r==="overview"){const o=OV[L];
  app.append($("h1","",UI[L].ov),$("h2","",o.h));o.p.forEach(x=>app.append($("p","",x)));
  app.append($("h2","",o.flow),pre(FLOW),$("h2","",o.run),$("p","",o.req),pre(CMD),$("h2","",o.files));
  const ul=$("ul");F.forEach(f=>{const li=$("li"),a=$("a","",f.name);a.onclick=()=>{location.hash=f.id};li.append(a,document.createTextNode(" — "+f.what[L]));ul.append(li)});app.append(ul);
 }else{const f=F.find(x=>x.id===r)||F[0];
  app.append($("h1","",f.name),$("p","mut",UI[L].what),$("p","",f.what[L]),$("h2","",UI[L].full),pre(f.code),$("h2","",UI[L].steps));
  f.n.forEach((n,i)=>{const d=$("div","note");const h=$("p");h.append($("span","num",String(i+1)));d.append(h,pre(excerpt(f.code,n.a,n.n)),$("p","",n[L]));app.append(d)});
  const ix=F.indexOf(f),pg=$("div","pager");
  if(ix>0){const b=$("button","","← "+F[ix-1].name);b.onclick=()=>{location.hash=F[ix-1].id};pg.append(b)}
  if(ix<F.length-1){const b=$("button","","→ "+F[ix+1].name);b.onclick=()=>{location.hash=F[ix+1].id};pg.append(b)}
  app.append(pg);
 }
 window.scrollTo(0,0);const on=nav.querySelector(".on");if(on)nav.scrollLeft=on.offsetLeft-nav.clientWidth/2+on.offsetWidth/2;
}
document.querySelectorAll(".lang button").forEach(b=>b.onclick=()=>{L=b.dataset.l;try{localStorage.setItem("lang",L)}catch(e){}render()});
window.addEventListener("hashchange",render);
render();
