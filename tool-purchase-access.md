---
layout: page
permalink: /tool-purchase/access/
title: Saved tool access
eyebrow: Body Connection Nutrition
intro: Reopen a paid educational tool from this browser.
noindex: true
sitemap: false
---
<div class="quote-card" style="margin:2.4rem 0"><h2 id="access-title">Checking saved access…</h2><p id="access-message"></p><p id="access-action"></p></div>
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
  const product=new URLSearchParams(location.search).get('product')||'',cfg=products[product];const title=document.getElementById('access-title'),message=document.getElementById('access-message'),action=document.getElementById('access-action');if(!cfg){title.textContent='Choose a tool from its product page.';message.textContent='This access page needs to know which tool you want to open.';return;}const token=localStorage.getItem(cfg.key);if(!token){title.textContent='No saved access was found in this browser.';message.textContent='If you purchased on another browser or device, use the secure access link you saved there or return to the product page.';action.innerHTML='<a class="button" href="'+cfg.page+'">Return to '+cfg.name+'</a>';return;}const grants=cfg.grants||[product];title.textContent='Saved access found.';message.textContent='You can reopen '+cfg.name+' now.';action.innerHTML=grants.map(slug=>{const tool=products[slug];if(!tool)return'';const url='/.netlify/functions/paid-tool?product='+encodeURIComponent(slug)+'&token='+encodeURIComponent(token);return '<a class="button" style="margin:.25rem" href="'+url+'">Open '+tool.name+' →</a>';}).join('');
})();
</script>
