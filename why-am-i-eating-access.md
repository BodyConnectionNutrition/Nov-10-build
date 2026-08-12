---
layout: page
permalink: /why-am-i-eating/access/
title: Your Why Am I Eating? access
eyebrow: Purchaser access
intro: Open the paid experience from a browser that has already verified your purchase.
---
<div class="quote-card" style="margin:2.4rem 0">
<p class="eyebrow">Saved access</p>
<h2 id="access-title">Checking this browser…</h2>
<p id="access-message">Looking for your saved purchaser access.</p>
<p id="access-action"></p>
</div>

<p>If you purchased on a different device or browser, use the secure access link you received immediately after checkout on that device. The access link functions like a key, so keep it private.</p>

<script>
(function(){
  const title = document.getElementById('access-title');
  const message = document.getElementById('access-message');
  const action = document.getElementById('access-action');
  const token = localStorage.getItem('bcn_why_am_i_eating_access');
  if(token){
    const url='/.netlify/functions/why-am-i-eating?token='+encodeURIComponent(token);
    title.textContent='Your access is saved on this browser.';
    message.textContent='You can return to the experience whenever you want and use it with another eating moment.';
    action.innerHTML='<a class="button" href="'+url+'">Open Why Am I Eating? →</a>';
  } else {
    title.textContent='No saved access was found on this browser.';
    message.textContent='If you have not purchased yet, return to the product page. If you purchased on another device, open the secure access link from that purchase.';
    action.innerHTML='<a class="button button-secondary" href="/why-am-i-eating/">Return to the product page</a>';
  }
})();
</script>
