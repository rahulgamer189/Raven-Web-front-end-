function renderZones(targetId="zone-list"){
 const el=document.getElementById(targetId); if(!el)return;
 el.innerHTML=window.RAVEN_DATA.zones.map(z=>`<div class="zone-row"><div><div class="zone-name">${z.name}</div><div class="zone-meta">${z.meta} • risk ${z.level}%</div></div><span class="risk risk-${z.risk.toLowerCase()}">${z.risk}</span></div>`).join("");
}
function refreshZoneRisk(){
 window.RAVEN_DATA.zones.forEach(z=>{z.level=Math.max(5,Math.min(99,z.level+(Math.random()>.5?1:-1)*Math.ceil(Math.random()*3)));});
 renderZones();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>{renderZones();setInterval(refreshZoneRisk,12000)});else{renderZones();setInterval(refreshZoneRisk,12000)}