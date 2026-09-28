const KEY="itSirTasks";let tasks=JSON.parse(localStorage.getItem(KEY)||"[]");const $=id=>document.getElementById(id);
function save(){localStorage.setItem(KEY,JSON.stringify(tasks));render()}
function render(){const open=tasks.filter(t=>!t.done).length;$("taskCount").textContent=open;$("taskLabel").textContent=open+" open task"+(open===1?"":"s");$("taskList").innerHTML=tasks.length?tasks.map((t,i)=>'<div class="task '+(t.done?"done":"")+'"><input type="checkbox" '+(t.done?"checked":"")+' onchange="toggle('+i+')"><span>'+escapeHtml(t.text)+'</span></div>').join(""):'<div class="empty">No tasks yet. Add your first task.</div>'}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
window.toggle=i=>{tasks[i].done=!tasks[i].done;save()};
$("date").textContent=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
function openModal(title="Add Task"){$("modalTitle").textContent=title;$("modal").hidden=false;$("taskInput").focus()}
window.addTask=()=>openModal();
document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>b.dataset.action==="task"?openModal("Add Task"):alert("This module is prepared for the next build phase."));
$("close").onclick=()=>{$("modal").hidden=true};
$("saveTask").onclick=()=>{const v=$("taskInput").value.trim();if(v){tasks.unshift({text:v,done:false,created:Date.now()});$("taskInput").value="";$("modal").hidden=true;save()}};
$("taskInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("saveTask").click()});
$("clearDone").onclick=()=>{tasks=tasks.filter(t=>!t.done);save()};
let deferred;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferred=e;$("installBtn").hidden=false});$("installBtn").onclick=async()=>{if(deferred){deferred.prompt();deferred=null}};
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");render();