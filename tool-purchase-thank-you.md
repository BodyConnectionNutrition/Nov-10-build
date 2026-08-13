---
layout: page
permalink: /tool-purchase/thank-you/
title: Purchase received
eyebrow: Body Connection Nutrition
intro: We are verifying your Stripe checkout and preparing your access.
---
<div class="quote-card" style="margin:2.4rem 0" id="access-status">
<p class="eyebrow">Purchase verification</p>
<h2 id="verify-title">Checking your purchase…</h2>
<p id="verify-message">This should only take a moment.</p>
<p id="verify-action"></p>
</div>
<p class="trust-line">Your access link is a bearer link: anyone who has the full link could use it. Keep it private. This browser also remembers your access.</p>
<script>
(function(){
  const products = {
    'who-taught-you-to-eat': { name:'Who Taught You to Eat?', page:'/tools/who-taught-you-to-eat/', key:'bcn_paid_who_taught_you_to_eat' },
    'how-was-my-body-image-created': { name:'How Was My Body Image Created?', page:'/tools/how-was-my-body-image-created/', key:'bcn_paid_body_image' },
    'deconstructing-a-belief': { name:'Deconstructing a Belief', page:'/tools/deconstructing-a-belief/', key:'bcn_paid_deconstructing_belief' }
  };
  const title=document.getElementById('verify-title'), message=document.getElementById('verify-message'), action=document.getElementById('verify-action');
  const params=new URLSearchParams(location.search), product=params.get('product')||'', sessionId=params.get('session_id')||'', cfg=products[product];
  if(!cfg){ title.textContent='We could not identify the product.'; message.textContent='Please return to the tools page.'; return; }
  function showAccess(token){
    const url='/.netlify/functions/paid-tool?product='+encodeURIComponent(product)+'&token='+encodeURIComponent(token);
    title.textContent='Your purchase is verified.';
    message.textContent=cfg.name+' is ready. This browser will remember your access.';
    action.innerHTML='<a class="button" href="'+url+'">Open '+cfg.name+' →</a> <a class="button button-secondary" href="/tool-purchase/access/?product='+encodeURIComponent(product)+'">Saved access</a>';
  }
  const saved=localStorage.getItem(cfg.key);
  if(!sessionId){ if(saved){showAccess(saved);return;} title.textContent='We could not find a checkout session.'; message.textContent='Return to the product page and complete checkout.'; action.innerHTML='<a class="button button-secondary" href="'+cfg.page+'">Return to product page</a>'; return; }
  fetch('/.netlify/functions/verify-tool-checkout?product='+encodeURIComponent(product)+'&session_id='+encodeURIComponent(sessionId),{cache:'no-store'})
    .then(r=>r.json().then(data=>({ok:r.ok,data})))
    .then(result=>{ if(!result.ok||!result.data.ok) throw new Error(result.data.error||'Purchase verification failed.'); localStorage.setItem(cfg.key,result.data.token); showAccess(result.data.token); history.replaceState({},document.title,'/tool-purchase/thank-you/?product='+encodeURIComponent(product)); })
    .catch(err=>{ title.textContent='We could not verify the purchase yet.'; message.textContent=err.message||'Please try again shortly.'; action.innerHTML='<button class="button" onclick="location.reload()">Try verification again</button> <a class="button button-secondary" href="'+cfg.page+'">Return to product page</a>'; });
})();
</script>
