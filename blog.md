---
layout: default
title: "Blog"
description: "Chapters and essays on nutrition, attention, and the embodied universe—how food becomes experience."
permalink: /blog
---

<section class="section">
  <div class="container">
    <h1 class="section-title">Blog</h1>
    <p class="prose">Chapters and essays on nutrition, attention, and the embodied universe—how food becomes experience.</p>
    <div class="post-grid">
      {% for post in site.posts %}
      <article class="post-card">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
        {% if post.excerpt %}
        <p>{{ post.excerpt | strip_html | truncate: 140 }}</p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </div>
</section>
