---
layout: page
permalink: /blog/
title: Articles
description: Explore the Body Connection Nutrition library through a guided five-series pathway or search the complete article collection by the question you are carrying.
eyebrow: The Body Connection Nutrition library
intro: Start with the guided argument or go directly to the question that brought you here.
---

<style>
.articles-hero{background:var(--forest);color:#fff;border-radius:30px;padding:clamp(2rem,5vw,4rem);margin:1.5rem 0 2rem;box-shadow:0 18px 45px rgba(49,65,47,.16)}
.articles-hero h2,.articles-hero p,.articles-hero a{color:#fff}.articles-hero h2{font-size:clamp(2.25rem,5vw,4.25rem);line-height:1.02;max-width:900px;margin:.45rem 0 1rem}.articles-hero .lead{max-width:780px;color:#f4eee5}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-top:1.75rem}.entry-card{display:flex;flex-direction:column;align-items:flex-start;background:#fff;color:var(--forest)!important;border:2px solid #fff;border-radius:20px;padding:1.35rem;text-decoration:none;transition:transform .2s,box-shadow .2s}.entry-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(0,0,0,.16)}.entry-card span{display:block;color:var(--clay);font-size:.76rem;text-transform:uppercase;letter-spacing:.1em;font-weight:800;margin-bottom:.4rem}.entry-card strong{font-family:"Fraunces",Georgia,serif;font-size:1.45rem;line-height:1.2}.entry-card small{display:block;color:var(--muted);font-size:.95rem;line-height:1.45;margin-top:.45rem}
.section-block{padding:3.5rem 0;border-top:1px solid var(--line)}.section-head{max-width:820px;margin-bottom:1.6rem}.section-head h2{font-size:clamp(2rem,4vw,3.2rem);margin:.3rem 0 .65rem}.section-head p{color:var(--muted);margin:.25rem 0}.stage-label{font-size:.76rem;text-transform:uppercase;letter-spacing:.11em;font-weight:800;color:var(--clay)}
.pathway-list{display:grid;gap:.85rem}.pathway-card{position:relative;display:grid;grid-template-columns:70px minmax(0,1fr) auto;gap:1.25rem;align-items:center;background:var(--paper);border:1px solid var(--line);border-radius:20px;padding:1.25rem 1.35rem;text-decoration:none;transition:transform .2s,box-shadow .2s,border-color .2s}.pathway-card:hover{transform:translateX(4px);box-shadow:0 12px 28px rgba(49,65,47,.10);border-color:var(--sage)}.pathway-number{display:grid;place-items:center;width:54px;height:54px;border-radius:50%;background:var(--forest);color:#fff;font-family:"Fraunces",Georgia,serif;font-size:1.45rem;font-weight:700}.pathway-copy h3{font-size:1.45rem;margin:0 0 .3rem}.pathway-copy p{color:var(--muted);margin:.15rem 0}.pathway-meta{font-size:.9rem;color:var(--forest)!important}.pathway-action{color:var(--forest);font-weight:800;white-space:nowrap}.pathway-overview{margin:1.2rem 0 0;text-align:right}
.question-panel{background:#f4eee5;border:1px solid var(--line);border-radius:26px;padding:clamp(1.5rem,4vw,2.5rem);margin-bottom:2rem}.question-panel h3{font-size:1.45rem;margin:0 0 1rem}.question-links{display:flex;flex-wrap:wrap;gap:.65rem}.question-link{appearance:none;background:#fff;border:1px solid var(--line);border-radius:999px;color:var(--forest);cursor:pointer;font:inherit;font-weight:750;padding:.72rem 1rem;text-align:left;transition:border-color .2s,background .2s,transform .2s}.question-link:hover,.question-link:focus-visible{border-color:var(--sage);background:#fbfaf7;transform:translateY(-1px)}
.library-tools{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(210px,.65fr);gap:.8rem;margin:0 0 1rem}.library-tools label{display:block;color:var(--forest);font-size:.82rem;font-weight:800;margin-bottom:.35rem}.library-tools input,.library-tools select{width:100%;min-height:48px;background:#fff;border:1px solid var(--line);border-radius:13px;color:var(--ink);font:inherit;padding:.75rem .9rem}.library-tools input:focus,.library-tools select:focus{outline:3px solid rgba(118,139,108,.28);border-color:var(--sage)}
.result-line{display:flex;justify-content:space-between;gap:1rem;align-items:center;margin:.8rem 0 1.2rem;color:var(--muted)}.clear-filter{appearance:none;background:transparent;border:0;color:var(--forest);cursor:pointer;font:inherit;font-weight:800;padding:.3rem}.clear-filter[hidden]{display:none}
.article-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem}.article-card{display:flex;flex-direction:column;background:var(--paper);border:1px solid var(--line);border-radius:20px;padding:1.45rem;text-decoration:none;transition:transform .2s,box-shadow .2s,border-color .2s}.article-card:hover{transform:translateY(-3px);box-shadow:0 14px 35px rgba(49,65,47,.10);border-color:var(--sage)}.article-card .article-topic{font-size:.73rem;text-transform:uppercase;letter-spacing:.085em;font-weight:800;color:var(--clay);margin-bottom:.6rem}.article-card h3{font-size:1.3rem;margin:0 0 .5rem}.article-card p{color:var(--muted);font-size:.96rem;margin:0}.article-card .read-link{color:var(--forest);font-weight:800;margin-top:auto;padding-top:1rem}.article-card[hidden]{display:none}
.empty-results{background:#f7f2e9;border-left:4px solid var(--clay);padding:1.2rem 1.4rem;margin-top:1rem}.empty-results[hidden]{display:none}
.practice-note{background:#efe7d8;border:1px solid var(--line);border-radius:24px;padding:clamp(1.5rem,4vw,2.4rem);margin-top:3.5rem}.practice-note h2{font-size:1.75rem;margin:.25rem 0 .6rem}.practice-note p{max-width:850px;color:var(--muted)}
@media(max-width:760px){.entry-grid,.article-grid,.library-tools{grid-template-columns:1fr}.pathway-card{grid-template-columns:48px minmax(0,1fr);gap:.85rem}.pathway-number{width:44px;height:44px;font-size:1.15rem}.pathway-action{grid-column:2;white-space:normal}.pathway-overview{text-align:left}.result-line{align-items:flex-start;flex-direction:column}}
</style>

<section class="articles-hero">
  <p class="eyebrow">The Body Connection Nutrition library</p>
  <h2>What are you trying to understand?</h2>
  <p class="lead">You do not need to learn the whole framework before you can find something useful. Follow the central argument in order, or search every article for the question you are carrying now.</p>
  <div class="entry-grid">
    <a class="entry-card" href="#guided-pathway"><span>Read in order</span><strong>Follow the five-series pathway</strong><small>Move from appetite and restriction through influence and wellness claims toward the conditions that make change possible.</small></a>
    <a class="entry-card" href="#all-articles"><span>Find what you need</span><strong>Browse all {{ site.posts | size }} articles</strong><small>Search by a word, question or title, or narrow the library by topic.</small></a>
  </div>
</section>

<section class="section-block" id="guided-pathway" aria-labelledby="guided-pathway-title">
  <div class="section-head">
    <p class="stage-label">One argument in five connected series</p>
    <h2 id="guided-pathway-title">How Food Decisions Get Made</h2>
    <p>Food decisions are personal, but they are never produced by the person alone. These five collections follow the argument from the eating environment toward more realistic agency and care.</p>
  </div>
  <div class="pathway-list">
    <a class="pathway-card" href="/blog/food-designed-hard-to-stop-eating/">
      <span class="pathway-number" aria-hidden="true">1</span>
      <div class="pathway-copy"><h3>Your Appetite Is Responding to the Environment</h3><p>How food properties and environments shape appetite and eating.</p><p class="pathway-meta">6 articles · Start with “What If the Food Is Designed to Be Hard to Stop Eating?”</p></div>
      <span class="pathway-action">Begin the series →</span>
    </a>
    <a class="pathway-card" href="/blog/restriction-trap/">
      <span class="pathway-number" aria-hidden="true">2</span>
      <div class="pathway-copy"><h3>The Restriction Trap</h3><p>How attempts to control appetite can increase food noise, urgency and distrust.</p><p class="pathway-meta">11 articles · Start with “The Restriction Trap”</p></div>
      <span class="pathway-action">Continue the argument →</span>
    </a>
    <a class="pathway-card" href="/blog/health-halo-food-marketing/">
      <span class="pathway-number" aria-hidden="true">3</span>
      <div class="pathway-copy"><h3>The Architecture of Appetite</h3><p>How ordinary cognitive processes are recruited to influence decisions and beliefs.</p><p class="pathway-meta">12 articles · Start with “The Health Halo Is Making More of the Decision Than You Think”</p></div>
      <span class="pathway-action">Examine the influence →</span>
    </a>
    <a class="pathway-card" href="/food-waste-to-wellness/">
      <span class="pathway-number" aria-hidden="true">4</span>
      <div class="pathway-copy"><h3>Food Waste to Wellness</h3><p>How commercial systems manufacture health meaning around products.</p><p class="pathway-meta">9 articles · Read the investigation in order</p></div>
      <span class="pathway-action">Follow the investigation →</span>
    </a>
    <a class="pathway-card" href="/change-needs-conditions/">
      <span class="pathway-number" aria-hidden="true">5</span>
      <div class="pathway-copy"><h3>Change Needs Conditions</h3><p>How resources, support, belonging and realistic options make new patterns possible.</p><p class="pathway-meta">10 articles · Make the constructive turn</p></div>
      <span class="pathway-action">Explore what helps →</span>
    </a>
  </div>
  <p class="pathway-overview"><a class="text-link" href="/how-food-decisions-get-made/">Read the complete pathway overview →</a></p>
</section>

<section class="section-block" id="all-articles" aria-labelledby="all-articles-title">
  <div class="section-head">
    <p class="stage-label">The complete library</p>
    <h2 id="all-articles-title">Browse all articles</h2>
    <p>Every published article appears here once, under its actual title. Search the language that feels natural to you; you do not need to know which series it belongs to.</p>
  </div>

  <div class="question-panel">
    <h3>Start with what is happening</h3>
    <div class="question-links" aria-label="Common questions">
      <button class="question-link" type="button" data-topic="The Restriction Trap">Food feels unusually loud</button>
      <button class="question-link" type="button" data-topic="Your Appetite Is Responding to the Environment">Eating changes in certain environments</button>
      <button class="question-link" type="button" data-topic="The Architecture of Appetite">A claim or ad feels convincing</button>
      <button class="question-link" type="button" data-topic="What Does That Even Mean?">I want to check a wellness claim</button>
      <button class="question-link" type="button" data-topic="Change Needs Conditions">I know what to do but cannot make it happen</button>
      <button class="question-link" type="button" data-question="body">I want another way to understand my body</button>
    </div>
  </div>

  <div class="library-tools" role="search">
    <div>
      <label for="article-search">Search the library</label>
      <input id="article-search" type="search" placeholder="Try “food noise,” “protein,” “AI,” or “motivation”" autocomplete="off">
    </div>
    <div>
      <label for="article-topic">Filter by topic</label>
      <select id="article-topic">
        <option value="">All topics</option>
        {% assign article_topics = site.posts | map: "cluster" | compact | uniq | sort %}
        {% for topic in article_topics %}<option value="{{ topic | escape }}">{{ topic }}</option>{% endfor %}
      </select>
    </div>
  </div>

  <div class="result-line" aria-live="polite">
    <span id="article-result-count">Showing all {{ site.posts | size }} articles</span>
    <button class="clear-filter" id="clear-article-filter" type="button" hidden>Clear search and filters</button>
  </div>

  <div class="article-grid" id="article-grid">
    {% assign alphabetical_posts = site.posts | sort_natural: "title" %}
    {% for post in alphabetical_posts %}
      {% assign topic = post.cluster | default: post.eyebrow | default: "Body connection" %}
      {% assign summary = post.description | default: post.intro | default: post.excerpt | strip_html | strip_newlines %}
      <a class="article-card" href="{{ post.url | relative_url }}" data-topic="{{ topic | escape }}" data-search="{{ post.title | append: ' ' | append: topic | append: ' ' | append: post.eyebrow | append: ' ' | append: summary | downcase | escape }}">
        <span class="article-topic">{{ topic }}</span>
        <h3>{{ post.title }}</h3>
        {% if summary != "" %}<p>{{ summary | truncate: 180 }}</p>{% endif %}
        <span class="read-link">Read the article →</span>
      </a>
    {% endfor %}
  </div>
  <p class="empty-results" id="article-empty" hidden>No articles matched that search. Try a broader word, or clear the topic filter.</p>

  <aside class="practice-note">
    <p class="stage-label">A practice, not another standard</p>
    <h2>Notice. Interpret. Contextualize. Locate responsibility. Respond.</h2>
    <p>This inquiry runs through the library. It helps you move from bodily experience to context and response without turning care into another test of whether you are doing life correctly.</p>
  </aside>
</section>

<script>
(function(){
  const search=document.getElementById('article-search');
  const topic=document.getElementById('article-topic');
  const cards=Array.from(document.querySelectorAll('.article-card'));
  const count=document.getElementById('article-result-count');
  const clear=document.getElementById('clear-article-filter');
  const empty=document.getElementById('article-empty');
  const normalize=value=>(value||'').toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function filterArticles(){
    const terms=normalize(search.value).split(/\s+/).filter(Boolean);
    const selected=topic.value;
    let visible=0;
    cards.forEach(card=>{
      const haystack=normalize(card.dataset.search);
      const matchesWords=terms.every(term=>haystack.includes(term));
      const matchesTopic=!selected||card.dataset.topic===selected;
      const show=matchesWords&&matchesTopic;
      card.hidden=!show;
      if(show) visible++;
    });
    count.textContent=visible===cards.length?'Showing all '+cards.length+' articles':'Showing '+visible+' of '+cards.length+' articles';
    clear.hidden=!search.value&&!selected;
    empty.hidden=visible!==0;
  }
  search.addEventListener('input',filterArticles);
  topic.addEventListener('change',filterArticles);
  clear.addEventListener('click',()=>{search.value='';topic.value='';filterArticles();search.focus();});
  document.querySelectorAll('.question-link').forEach(button=>button.addEventListener('click',()=>{
    search.value=button.dataset.question||'';
    topic.value=button.dataset.topic||'';
    filterArticles();
    document.getElementById('all-articles-title').scrollIntoView({behavior:'smooth',block:'start'});
  }));
  filterArticles();
})();
</script>
