/* Raven shell: shared navigation, global feedback, preferences and emergency access. */
(function(){
  const page=document.body.dataset.page||"dashboard";
  const nav=[
    ["dashboard.html","Dashboard","dashboard"],["map.html","Live Map","map"],["broadcast.html","Broadcast","broadcast"],
    ["field-reports.html","Reports","reports"],["chat.html","Network","chat"],["profile.html","Profile","profile"]
  ];
  const shell=document.getElementById("app-shell"); if(!shell)return;
  shell.innerHTML=`<header class="topbar"><a class="brand" href="dashboard.html"><span class="brand-mark">R</span> RAVEN</a><button class="mobile-menu" id="mobile-menu" type="button" aria-label="Toggle navigation">☰</button><nav class="nav" aria-label="Primary">${nav.map(n=>`<a class="${page===n[2]?"active":""}" href="${n[0]}">${n[1]}</a>`).join("")}</nav><div class="shell-actions"><button class="icon-btn" id="theme-toggle" type="button" title="Toggle contrast">◐</button><a class="sos-link" href="sos.html">SOS</a></div></header><div id="site-alert" class="site-alert" role="status" aria-live="polite"></div><div id="toast-region" class="toast-region" aria-live="polite"></div>`;
  const root=document.documentElement;
  if(localStorage.getItem("raven_theme")==="light")root.classList.add("light");
  window.ravenToast=function(message,type="success"){
    const region=document.getElementById("toast-region"); if(!region)return;
    const toast=document.createElement("div"); toast.className=`toast toast-${type}`; toast.textContent=message; region.appendChild(toast);
    setTimeout(()=>toast.remove(),3600);
  };
  document.getElementById("theme-toggle")?.addEventListener("click",()=>{root.classList.toggle("light");localStorage.setItem("raven_theme",root.classList.contains("light")?"light":"dark");ravenToast(root.classList.contains("light")?"Light contrast enabled":"Dark contrast enabled")});
  document.getElementById("mobile-menu")?.addEventListener("click",()=>document.querySelector(".nav")?.classList.toggle("open"));
  document.addEventListener("click",e=>{const a=e.target.closest(".nav a");if(a)document.querySelector(".nav")?.classList.remove("open")});
  window.setInterval(()=>{const clock=document.getElementById("global-clock");if(clock)clock.textContent=new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"})},1000);
})();

function escapeHTML(value){return String(value??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}
