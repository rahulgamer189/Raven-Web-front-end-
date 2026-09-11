function renderMetrics(){
 const el=document.getElementById("metrics");if(!el)return; const z=window.RAVEN_DATA.zones,s=window.RAVEN_DATA.sos;
 const shelterCapacity=window.RAVEN_DATA.shelters.reduce((sum,x)=>sum+x.capacity,0);
 el.innerHTML=[["CRITICAL ZONES",z.filter(x=>x.risk==="Critical").length,"Immediate attention"],["ACTIVE SOS",s.length,"Signals in network"],["RAIN INTENSITY","18 mm/hr","↑ 12% vs 30 min"],["SHELTER CAPACITY",shelterCapacity,"Across active safe zones"]].map(x=>`<div class="metric"><div class="metric-label">${x[0]}</div><div class="metric-value">${x[1]}</div><div class="metric-sub">${x[2]}</div></div>`).join("");
}
function renderFeed(){const el=document.getElementById("live-feed");if(!el)return;el.innerHTML=window.RAVEN_DATA.feed.map(x=>`<div class="feed-item"><div class="feed-time">${escapeHTML(x.time)}</div><div class="feed-body"><strong>${escapeHTML(x.title)}</strong><span>${escapeHTML(x.body)}</span></div></div>`).join("")}
function renderMiniMap(){const el=document.getElementById("mini-map");if(!el)return;el.innerHTML=`<div class="mini-map-grid"></div>${window.RAVEN_DATA.zones.map(z=>`<span class="mini-marker marker-${z.risk.toLowerCase()}" title="${escapeHTML(z.name)}: ${z.risk}" style="left:${20+(z.lng-85.80)*300}%;top:${28+(20.36-z.lat)*240}%"></span>`).join("")}<span class="mini-map-label">LIVE OPERATIONAL PICTURE</span>`}
document.addEventListener("DOMContentLoaded",()=>{renderMetrics();renderFeed();renderMiniMap();setInterval(renderMetrics,12000)});
