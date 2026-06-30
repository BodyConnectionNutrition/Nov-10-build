---
layout: default
title: "Reflections"
permalink: /reflections
---
<section class="section"><div class="container"><div class="section-heading"><p class="kicker">Reflections</p><h1>Essays, video companions, and future book chapters</h1><p>Writing on nutrition, embodiment, fear, compassion, misinformation, metabolism, and the living world.</p></div><div class="post-grid">{% for post in site.posts %}<article class="post-card"><p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.excerpt | strip_html | truncate: 165 }}</p><a class="btn btn-ghost" href="{{ post.url | relative_url }}">Read reflection</a></article>{% endfor %}</div></div></section>