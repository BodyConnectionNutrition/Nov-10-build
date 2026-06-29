---
layout: default
---

<section class="article-hero">
  <div class="narrow">
    <p class="kicker">Article</p>
    <h1>{{ page.title }}</h1>
    {% if page.excerpt %}<p class="lede">{{ page.excerpt }}</p>{% endif %}
    <p class="post-meta">{{ page.date | date: "%B %-d, %Y" }}</p>
  </div>
</section>

<article class="article-body">
  <div class="prose">
    {{ content }}
  </div>
</article>

<section class="section post-cta">
  <div class="container split">
    <div>
      <p class="kicker">Keep learning</p>
      <h2>Build confidence around food and your body.</h2>
      <p class="lede">Read, watch, subscribe, or work with me individually through Nourish.</p>
    </div>
    <div class="panel">
      <div class="cta-row">
        <a href="https://www.usenourish.com/providers/jennifer-nickell?referralSource=Nourish+dietitian&referralName=Jennifer+Nickell&utm_source=Nourish_dietitian&utm_term=Jennifer_Nickell" class="btn btn-primary" target="_blank" rel="noopener">Work with me through Nourish</a>
        <a href="{{ '/subscribe' | relative_url }}" class="btn btn-ghost">Subscribe</a>
        <a href="https://www.youtube.com/@BodyConnectionNutrition" class="btn btn-ghost" target="_blank" rel="noopener">Watch on YouTube</a>
      </div>
    </div>
  </div>
</section>
