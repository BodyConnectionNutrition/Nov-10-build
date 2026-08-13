---
layout: page
permalink: /tool-purchase/access/
title: Saved tool access
eyebrow: Body Connection Nutrition
intro: Reopen a paid educational tool from this browser.
---
<div class="quote-card" style="margin:2.4rem 0">
<h2 id="access-title">Checking saved access…</h2>
<p id="access-message"></p>
<p id="access-action"></p>
</div>
<script>
(function(){
  const products={
    'who-taught-you-to-eat':{name:'Who Taught You to Eat?',page:'/tools/who-taught-you-to-eat/',key:'bcn_paid_who_taught_you_to_eat'},
    'how-was-my-body-image-created':{name:'How Was My Body Image Created?',page:'/tools/how-was-my-body-image-created/',key:'bcn_paid_body_image'},
    'deconstructing-a-belief':{name:'Deconstructing a Belief',page:'/tools/deconstructing-a-belief/',key:'bcn_paid_deconstructing_belief'}
  };
  const product=new URLSearchParams(location.search).get('product')||'',cfg=products[product];
  const title=document.getElementById('access-title'),message=document.getElementById('access-message'),action=document.getElementById('access-action');
  if(!cfg){title.textContent='Choose a tool from its product page.';message.textContent='This access page needs to know which tool you want to open.';return;}
  const token=localStorage.getItem(cfg.key);
  if(!token){title.textContent='No saved access was found in this browser.';message.textContent='If you purchased on another browser or device, use the secure access link you saved there or return to the product page.';action.innerHTML='<a class="button" href="'+cfg.page+'">Return to '+cfg.name+'</a>';return;}
  const url='/.netlify/functions/paid-tool?product='+encodeURIComponent(product)+'&token='+encodeURIComponent(token);
  title.textContent='Saved access found.';message.textContent='You can reopen '+cfg.name+' now.';action.innerHTML='<a class="button" href="'+url+'">Open '+cfg.name+' →</a>';
})();
</script>
