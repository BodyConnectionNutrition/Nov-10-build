---
layout: default
title: Blog
permalink: /blog
---
<section class="section"><div class="container"><h1>Blog</h1><p>Chapters and essays on nutrition, attention, and the embodied universe.</p><div class="post-grid">{% for post in site.posts %}<article class="post-card"><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p><p>{{ post.excerpt | strip_html | truncate: 140 }}</p></article>{% endfor %}</div></div></section>
