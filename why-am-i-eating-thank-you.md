---
layout: page
permalink: /why-am-i-eating/thank-you/
title: Purchase received
eyebrow: Why Am I Eating?
intro: We are verifying your Stripe checkout and preparing your access.
---
<div class="quote-card" style="margin:2.4rem 0" id="access-status">
<p class="eyebrow">Purchase verification</p>
<h2 id="verify-title">Checking your purchase…</h2>
<p id="verify-message">This should only take a moment.</p>
<p id="verify-action"></p>
</div>

<p class="trust-line">Your access link is a bearer link: anyone who has the full link could use it. Keep it private and bookmark it for future use.</p>

<script>
(function(){
  const title = document.getElementById('verify-title');
  const message = document.getElementById('verify-message');
  const action = document.getElementById('verify-action');
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const savedToken = localStorage.getItem('bcn_why_am_i_eating_access');

  function showAccess(token){
    const url = '/.netlify/functions/why-am-i-eating?token=' + encodeURIComponent(token);
    title.textContent = 'Your purchase is verified.';
    message.textContent = 'Why Am I Eating? is ready. This browser will remember your access, and you can also bookmark the secure access link.';
    action.innerHTML = '<a class="button" href="' + url + '">Open Why Am I Eating? →</a> <a class="button button-secondary" href="/why-am-i-eating/access/">Saved access page</a>';
  }

  if(!sessionId){
    if(savedToken){ showAccess(savedToken); return; }
    title.textContent = 'We could not find a checkout session.';
    message.textContent = 'Return to the product page and complete checkout, or use your saved access page if you have already purchased.';
    action.innerHTML = '<a class="button button-secondary" href="/why-am-i-eating/">Return to product page</a>';
    return;
  }

  fetch('/.netlify/functions/verify-checkout?session_id=' + encodeURIComponent(sessionId), { cache: 'no-store' })
    .then(function(r){ return r.json().then(function(data){ return {ok:r.ok,data:data}; }); })
    .then(function(result){
      if(!result.ok || !result.data.ok) throw new Error(result.data.error || 'Purchase verification failed.');
      localStorage.setItem('bcn_why_am_i_eating_access', result.data.token);
      showAccess(result.data.token);
      history.replaceState({}, document.title, '/why-am-i-eating/thank-you/');
    })
    .catch(function(err){
      title.textContent = 'We could not verify the purchase yet.';
      message.textContent = err.message || 'Please try again shortly.';
      action.innerHTML = '<button class="button" onclick="location.reload()">Try verification again</button> <a class="button button-secondary" href="/why-am-i-eating/">Return to product page</a>';
    });
})();
</script>
