---
layout: page
permalink: /tool-purchase/thank-you/
title: Purchase received
eyebrow: Body Connection Nutrition
intro: We are verifying your Stripe checkout and preparing your access.
noindex: true
sitemap: false
---
<div class="quote-card" style="margin:2.4rem 0" id="access-status"><p class="eyebrow">Purchase verification</p><h2 id="verify-title">Checking your purchase…</h2><p id="verify-message">This should only take a moment.</p><p id="verify-action"></p></div>
<p class="trust-line">Your access link is a bearer link: anyone who has the full link could use it. Keep it private. This browser also remembers your access.</p>
<script>
(function(){
  const products={
    'why-am-i-eating':{name:'Why Am I Eating?',page:'/why-am-i-eating/',key:'bcn_shop_why_am_i_eating'},
    'who-taught-you-to-eat':{name:'Who Taught You to Eat?',page:'/tools/who-taught-you-to-eat/',key:'bcn_paid_who_taught_you_to_eat'},
    'how-was-my-body-image-created':{name:'How Was My Body Image Created?',page:'/tools/how-was-my-body-image-created/',key:'bcn_paid_body_image'},
    'deconstructing-a-belief':{name:'Deconstructing a Belief',page:'/tools/deconstructing-a-belief/',key:'bcn_paid_deconstructing_belief'},
    'behavior-sequence':{name:'Behavior Sequence',page:'/tools/behavior-sequence/',key:'bcn_paid_behavior_sequence'},
    'permission-and-scarcity':{name:'Permission & Scarcity',page:'/tools/permission-and-scarcity/',key:'bcn_paid_permission_scarcity'},
    'what-is-this-doing-for-me':{name:'What Is This Doing for Me?',page:'/tools/what-is-this-doing-for-me/',key:'bcn_paid_what_is_this_doing'},
    'choice-has-conditions':{name:'Choice Has Conditions',page:'/tools/choice-has-conditions/',key:'bcn_paid_choice_conditions'},
    'my-food-and-body-framework':{name:'My Food & Body Framework',page:'/tools/my-food-and-body-framework/',key:'bcn_paid_food_body_framework'},
    'values-clarification':{name:'Values Clarification',page:'/tools/values-clarification/',key:'bcn_paid_values_clarification'},
    'origins-beliefs-bundle':{name:'Origins & Beliefs',page:'/shop/#origins-beliefs',key:'bcn_bundle_origins_beliefs',grants:['who-taught-you-to-eat','how-was-my-body-image-created','deconstructing-a-belief','values-clarification']},
    'eating-patterns-bundle':{name:'Eating Patterns',page:'/shop/#eating-patterns',key:'bcn_bundle_eating_patterns',grants:['why-am-i-eating','behavior-sequence','permission-and-scarcity','what-is-this-doing-for-me','choice-has-conditions']},
    'complete-toolkit-bundle':{name:'Complete Body Connection Toolkit',page:'/shop/#complete-toolkit',key:'bcn_bundle_complete_toolkit',grants:['why-am-i-eating','who-taught-you-to-eat','how-was-my-body-image-created','deconstructing-a-belief','values-clarification','behavior-sequence','permission-and-scarcity','what-is-this-doing-for-me','choice-has-conditions','my-food-and-body-framework']}
  };
  const title=document.getElementById('verify-title'),message=document.getElementById('verify-message'),action=document.getElementById('verify-action');
  const params=new URLSearchParams(location.search),product=params.get('product')||'',sessionId=params.get('session_id')||'',cfg=products[product];
  if(!cfg){title.textContent='We could not identify the product.';message.textContent='Please return to the tools page.';return;}
  function showAccess(token,grants){const list=grants&&grants.length?grants:(cfg.grants||[product]);title.textContent='Your purchase is verified.';message.textContent=cfg.name+' is ready. This browser will remember your access.';action.innerHTML=list.map(slug=>{const tool=products[slug];if(!tool)return'';const url='/.netlify/functions/paid-tool?product='+encodeURIComponent(slug)+'&token='+encodeURIComponent(token);return '<a class="button" style="margin:.25rem" href="'+url+'">Open '+tool.name+' →</a>';}).join('')+' <a class="button button-secondary" style="margin:.25rem" href="/tool-purchase/access/?product='+encodeURIComponent(product)+'">Saved access</a>';}
  const saved=localStorage.getItem(cfg.key);
  if(!sessionId){if(saved){showAccess(saved,cfg.grants);return;}title.textContent='We could not find a checkout session.';message.textContent='Return to the product page and complete checkout.';action.innerHTML='<a class="button button-secondary" href="'+cfg.page+'">Return to product page</a>';return;}
  fetch('/.netlify/functions/verify-tool-checkout?product='+encodeURIComponent(product)+'&session_id='+encodeURIComponent(sessionId),{cache:'no-store'}).then(r=>r.json().then(data=>({ok:r.ok,data}))).then(result=>{if(!result.ok||!result.data.ok)throw new Error(result.data.error||'Purchase verification failed.');localStorage.setItem(cfg.key,result.data.token);(result.data.grants||[]).forEach(slug=>{if(products[slug])localStorage.setItem(products[slug].key,result.data.token);});showAccess(result.data.token,result.data.grants);history.replaceState({},document.title,'/tool-purchase/thank-you/?product='+encodeURIComponent(product));}).catch(err=>{title.textContent='We could not verify the purchase yet.';message.textContent=err.message||'Please try again shortly.';action.innerHTML='<button class="button" onclick="location.reload()">Try verification again</button> <a class="button button-secondary" href="'+cfg.page+'">Return to product page</a>';});
})();
</script>
