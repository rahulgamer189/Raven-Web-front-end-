let ravenMap,layers={zones:L.layerGroup(),sos:L.layerGroup(),shelters:L.layerGroup(),rain:L.layerGroup()};
function initMap(){
 const mapEl=document.getElementById("map");if(!mapEl||!window.L)return;
 ravenMap=L.map(mapEl).setView([20.2961,85.8245],12);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors",maxZoom:19}).addTo(ravenMap);
 const zIcon=r=>L.divIcon({className:"",html:`<div class="leaflet-risk-dot risk-dot-${r.toLowerCase()}"></div>`,iconSize:[18,18],iconAnchor:[9,9]});
 window.RAVEN_DATA.zones.forEach(z=>L.marker([z.lat,z.lng],{icon:zIcon(z.risk)}).bindPopup(`<b>${escapeHTML(z.name)}</b><br>Risk: ${escapeHTML(z.risk)}<br>${escapeHTML(z.meta)}`).addTo(layers.zones));
 window.RAVEN_DATA.sos.forEach(s=>L.marker([s.lat,s.lng]).bindPopup(`<b>${escapeHTML(s.name)}</b><br>${escapeHTML(s.status)}`).addTo(layers.sos));
 window.RAVEN_DATA.shelters.forEach(s=>L.marker([s.lat,s.lng]).bindPopup(`<b>${escapeHTML(s.name)}</b><br>Capacity: ${s.capacity}`).addTo(layers.shelters));
 window.RAVEN_DATA.zones.filter(z=>z.risk!=="Low").forEach(z=>L.circle([z.lat,z.lng],{radius:z.risk==="Critical"?900:z.risk==="High"?600:350,color:z.risk==="Critical"?"#ff3d00":z.risk==="High"?"#ff9100":"#ffd740",fillOpacity:.08,weight:1}).addTo(layers.rain));
 layers.zones.addTo(ravenMap);layers.shelters.addTo(ravenMap);layers.sos.addTo(ravenMap);
 if(navigator.geolocation)navigator.geolocation.getCurrentPosition(p=>L.circleMarker([p.coords.latitude,p.coords.longitude],{radius:9,color:"#00e676",fillColor:"#00e676",fillOpacity:.8}).bindPopup("<b>Your location</b>").addTo(ravenMap),()=>{});
 document.querySelectorAll("[data-layer]").forEach(c=>c.addEventListener("change",()=>{const layer=layers[c.dataset.layer];if(!layer)return;c.checked?layer.addTo(ravenMap):ravenMap.removeLayer(layer)}));
 const stats=document.getElementById("map-stats");if(stats)stats.innerHTML=`<div class="data-grid"><div class="data-item"><span>Zones</span><b>${window.RAVEN_DATA.zones.length}</b></div><div class="data-item"><span>SOS</span><b>${window.RAVEN_DATA.sos.length}</b></div><div class="data-item"><span>Shelters</span><b>${window.RAVEN_DATA.shelters.length}</b></div><div class="data-item"><span>Nodes</span><b>${window.RAVEN_DATA.nearby.length}</b></div></div>`;
 const tick=()=>{const t=document.getElementById("map-time");if(t)t.textContent=new Date().toLocaleTimeString()};tick();setInterval(tick,1000);setTimeout(()=>ravenMap.invalidateSize(),120);
}
document.addEventListener("DOMContentLoaded",initMap);
