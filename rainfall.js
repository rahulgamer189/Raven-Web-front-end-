/* Chart.js is loaded dynamically so the project remains framework-free. */
function loadChartJS(cb){
 if(window.Chart)return cb();
 const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js";s.onload=cb;document.head.appendChild(s);
}
function renderRainfallChart(){
 const canvas=document.getElementById("rainfall-chart"); if(!canvas)return;
 loadChartJS(()=>new Chart(canvas,{type:"line",data:{labels:["-30m","-25m","-20m","-15m","-10m","-5m","NOW"],datasets:[{label:"Rainfall",data:[8,10,12,11,14,16,18],borderWidth:2,tension:.35,fill:false}]},options:{plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:"#78858a",font:{size:10}}},y:{beginAtZero:true,grid:{color:"#20292d"},ticks:{color:"#78858a",font:{size:10}}}}}}));
}
document.addEventListener("DOMContentLoaded",renderRainfallChart);