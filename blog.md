---
layout: page
permalink: /blog/
title: Articles & Videos
eyebrow: Learn the science behind the recommendations
intro: Nutrition, metabolism, behavior change, development, and the systems that shape what people believe about their bodies.
---
<div class="cards">
{% for post in site.posts %}
<article class="card post-card"><p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.excerpt | strip_html | truncate: 180 }}</p></article>
{% endfor %}
</div>
