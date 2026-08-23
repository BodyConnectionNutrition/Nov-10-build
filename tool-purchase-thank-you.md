---
layout: page
permalink: /tool-purchase/thank-you/
title: Purchase received
eyebrow: Body Connection Nutrition
intro: We are verifying your Stripe checkout and preparing your private access.
noindex: true
sitemap: false
---
<div class="quote-card" style="margin:2.4rem 0"><h2 id="verify-title">Checking your purchase…</h2><p id="verify-message">This should only take a moment.</p><p id="verify-action"></p></div>
<p class="trust-line">Product links no longer carry access. This browser receives a private, secure session after checkout.</p>
<p>You can reopen everything you purchased from <a href="/my-tools/">My Tools</a>. On another browser or after clearing site data, verify the checkout email again.</p>
<script>
(function(){const p=new URLSearchParams(location.search),product=p.get('product')||'',session=p.get('session_id')||'',t=document.getElementById('verify-title'),m=document.getElementById('verify-message'),a=document.getElementById('verify-action');if(!product||!session){t.textContent='Open your purchased tools.';m.textContent='Sign in using the email from checkout.';a.innerHTML='<a class="button" href="/my-tools/">Go to My Tools →</a>';return;}fetch('/.netlify/functions/verify-tool-checkout?product='+encodeURIComponent(product)+'&session_id='+encodeURIComponent(session),{cache:'no-store',credentials:'same-origin'}).then(r=>r.json().then(d=>({ok:r.ok,d}))).then(x=>{if(!x.ok||!x.d.ok)throw new Error(x.d.error||'Purchase verification failed.');t.textContent='Your purchase is verified.';m.textContent='This browser is now verified. Your product is waiting in My Tools.';a.innerHTML='<a class="button" href="/my-tools/">Open My Tools →</a>';history.replaceState({},document.title,'/tool-purchase/thank-you/?product='+encodeURIComponent(product));}).catch(e=>{t.textContent='We could not verify the purchase yet.';m.textContent=e.message;a.innerHTML='<button class="button" onclick="location.reload()">Try again</button> <a class="button button-secondary" href="/purchase-support/">Purchase Help</a>';});})();
</script>
