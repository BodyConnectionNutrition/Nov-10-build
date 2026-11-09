---
layout: default
title: "Recipe Box"
permalink: /tools/recipe-box/
---
<style>
.bank{max-width:850px;margin:2rem auto;padding:1rem;color:#263d32}.bank h1{color:#304b3a}.bank .panel{background:#f4f3eb;border:1px solid #d9dfd2;border-radius:12px;padding:1.2rem;margin:1rem 0}.bank label{display:block;margin:.8rem 0;font-weight:600}.bank input,.bank textarea,.bank select{box-sizing:border-box;width:100%;padding:.65rem;border:1px solid #9ba99c;border-radius:6px;background:white;color:#222;font:inherit}.bank textarea{min-height:75px}.bank button{background:#36533e;color:white;border:0;border-radius:6px;padding:.65rem 1rem;margin:.3rem .3rem .3rem 0;cursor:pointer}.bank button.secondary{background:#e0e6dc;color:#263d32}.bank .item{border-bottom:1px solid #c7d2c6;padding:.9rem 0}.bank .muted{color:#56665b;font-size:.93rem}.bank .row{display:flex;gap:.7rem;flex-wrap:wrap}.bank .row>*{flex:1;min-width:160px}.bank a{overflow-wrap:anywhere}
</style>
<div class="bank">
<h1>Recipe Box</h1>
<p>Keep a collection of meals you already know how to make. A meal does not have to be a formal recipe.</p>
<p class="muted">Your entries stay in this browser on this device. They are not sent to Body Connection Nutrition. Clearing browser data or using a private window may erase them. Export a backup if you want to keep them.</p>
<section class="panel"><h2>Add to my Recipe Box</h2><form id="entryForm"><label>Meal or recipe name<input id="name" required placeholder="e.g. Toast and eggs"></label><label>Ingredients or notes<textarea id="details" placeholder="Ingredients, portions, substitutions, or a reminder"></textarea></label><label>Recipe link (optional)<input id="url" type="url" placeholder="https://"></label><label>Meal type<select id="category"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option><option>Anytime</option></select></label><div class="row"><label>Energy needed<select id="energy"><option>Very little</option><option>Some</option><option>More</option></select></label><label>Time needed<select id="time"><option>5 minutes or less</option><option>5–15 minutes</option><option>15–30 minutes</option><option>More than 30 minutes</option></select></label></div><label>Resources or accommodations (optional)<input id="resources" placeholder="e.g. microwave, freezer ingredients"></label><button type="submit">Save entry</button><button type="reset" class="secondary">Clear form</button></form></section>
<section class="panel"><h2>Find something that works</h2><div class="row"><label>Search<input id="search" placeholder="Search saved entries"></label><label>Energy<select id="filterEnergy"><option value="">Any energy</option><option>Very little</option><option>Some</option><option>More</option></select></label><label>Category<select id="filterCategory"><option value="">All categories</option></select></label></div><div id="entries" aria-live="polite"></div></section>
<section class="panel"><h2>Keep a copy</h2><button id="export" type="button">Export my entries</button><label>Import a previously exported backup<input id="import" type="file" accept="application/json,.json"></label><p class="muted">Import adds entries from your backup. Keep exported files somewhere private, especially if they include personal information.</p></section>
<section class="panel"><h2>Simple meal plan and grocery notes</h2><p>Select saved meals using the “Add to plan” button. This is a flexible list, not a prescribed meal plan.</p><div id="plan"></div><label>Grocery notes<textarea id="groceries" placeholder="Copy ingredients from your selected meals and adjust quantities"></textarea></label><button id="printPlan" type="button">Print plan and notes</button></section>
</div>
<script>
(function(){
const key='bcn-recipe-box-v1', $=id=>document.getElementById(id);
let entries=[];try{const x=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(x))entries=x}catch(e){}
let plan=[];
const escape=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{localStorage.setItem(key,JSON.stringify(entries))}catch(e){alert('Browser storage is unavailable. Export your entries to keep them.')}render()}
function render(){
const cat=$('filterCategory').value,energy=$('filterEnergy').value,q=$('search').value.toLowerCase();
const cats=[...new Set(entries.map(e=>e.category))].sort();$('filterCategory').innerHTML='<option value="">All categories</option>'+cats.map(c=>'<option>'+escape(c)+'</option>').join('');$('filterCategory').value=cats.includes(cat)?cat:'';
const visible=entries.filter(e=>(!cat||e.category===cat)&&(!energy||e.energy===energy)&&JSON.stringify(e).toLowerCase().includes(q));
$('entries').innerHTML=visible.length?visible.map(e=>'<article class="item"><strong>'+escape(e.name)+'</strong><div class="muted">'+escape(e.category)+' · '+escape(e.energy)+' · '+escape(e.time)+'</div><p>'+escape(e.details).replace(/\n/g,'<br>')+'</p>'+(e.resources?'<p class="muted">Resources: '+escape(e.resources)+'</p>':'')+(e.url?'<p><a href="'+escape(e.url)+'" target="_blank" rel="noopener noreferrer">Open recipe</a></p>':'')+'<button data-action="edit" data-id="'+e.id+'">Edit</button><button class="secondary" data-action="delete" data-id="'+e.id+'">Remove</button><button class="secondary" data-action="plan" data-id="'+e.id+'">Add to plan</button></article>').join(''):'<p>No matching entries yet.</p>';
$('plan').innerHTML=plan.length?'<ul>'+plan.map(id=>{const e=entries.find(x=>x.id===id);return e?'<li>'+escape(e.name)+'</li>':''}).join('')+'</ul><button type="button" id="clearPlan">Clear plan</button>':'<p>No meals selected yet.</p>';
}
$('entryForm').addEventListener('submit',ev=>{ev.preventDefault();const id=$('entryForm').dataset.editId||String(Date.now())+Math.random().toString(36).slice(2);const e={id,name:$('name').value.trim(),details:$('details').value.trim(),category:$('category').value,energy:$('energy').value,time:$('time').value,resources:$('resources').value.trim(),url:$('url').value.trim()};if(!e.name)return;entries=entries.filter(x=>x.id!==id);entries.unshift(e);delete $('entryForm').dataset.editId;$('entryForm').reset();save()});
$('entries').addEventListener('click',ev=>{const b=ev.target.closest('button[data-action]');if(!b)return;const e=entries.find(x=>x.id===b.dataset.id);if(!e)return;if(b.dataset.action==='delete'){if(confirm('Remove this entry?')){entries=entries.filter(x=>x.id!==e.id);save()}}else if(b.dataset.action==='edit'){for(const f of ['name','details','category','energy','time','resources','url'])if($(f))$(f).value=e[f]||'';$('entryForm').dataset.editId=e.id;$('name').focus();}else if(b.dataset.action==='plan'){plan.push(e.id);render()}});
for(const id of ['search','filterEnergy','filterCategory'])$(id).addEventListener(id==='search'?'input':'change',render);
$('export').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(entries,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='recipe-box-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
$('import').addEventListener('change',async ev=>{const f=ev.target.files[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!Array.isArray(data)||!data.every(e=>e&&typeof e.name==='string'))throw Error('Invalid backup');for(const e of data){if(!entries.some(x=>x.id===e.id))entries.push({...e,id:e.id||String(Date.now())+Math.random()})}save()}catch(e){alert('This file is not a valid backup.')}ev.target.value=''});
$('plan').addEventListener('click',e=>{if(e.target.id==='clearPlan'){plan=[];render()}});$('printPlan').addEventListener('click',()=>window.print());
render();
})();
</script>