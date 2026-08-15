---
layout: page
permalink: /blog/
title: Nutrition Science, Eating Behavior & Body Image Articles
description: Evidence-based articles from registered dietitian Jennifer Nickell on nutrition science, metabolism, eating behavior, body image, critical thinking, and sustainable behavior change.
eyebrow: Evidence-based nutrition education
intro: Explore nutrition science in context: how metabolism, learning, body signals, beliefs, relationships, and environments shape food and health behavior.
---
<div class="three-grid" style="margin:2rem 0">
  <article class="card"><p class="post-meta">Nutrition science</p><h3>Understand the body</h3><p>Metabolism, protein, energy, appetite, and why understanding physiology can make nutrition advice easier to evaluate.</p><p><a class="text-link" href="/blog/protein-is-not-fuel/">Start with protein and energy →</a></p></article>
  <article class="card"><p class="post-meta">Food, body & behavior</p><h3>Understand the framework</h3><p>How learning, body image, food meaning, environment, and material conditions participate in behavior.</p><p><a class="text-link" href="/blog/why-knowing-what-to-do-is-not-the-same-as-being-able-to-do-it/">Start with behavior and conditions →</a></p></article>
  <article class="card"><p class="post-meta">Critical thinking</p><h3>Evaluate health information</h3><p>How beliefs form, why facts do not automatically change minds, and how to assess confident scientific and AI claims.</p><p><a class="text-link" href="/blog/ai-health-information/">Start with AI health information →</a></p></article>
</div>

## Featured learning paths

**Nutrition science:** [Protein is a building material—not the body's preferred fuel](/blog/protein-is-not-fuel/) → [Metabolism and the Continuum](/blog/metabolism-and-the-continuum/) → [When Science Becomes Intuition](/blog/when-science-becomes-intuition/)

**Behavior and conditions:** [Why Understanding Changes Behavior](/blog/why-understanding-changes-behavior/) → [Personal Transformation Requires Material Conditions](/blog/transformation-requires-conditions/) → [Why Knowing What to Do Is Not the Same as Being Able to Do It](/blog/why-knowing-what-to-do-is-not-the-same-as-being-able-to-do-it/)

**Critical thinking:** [Why Facts Do Not Automatically Change Minds](/blog/why-facts-do-not-change-minds/) → [When Science Changes Its Mind, That Is Science Working](/blog/when-science-changes-its-mind/) → [Why AI Can Sound Certain and Still Be Wrong About Health](/blog/ai-health-information/)

## All articles

<div class="cards">
{% for post in site.posts %}
<article class="card post-card"><p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p><h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3><p>{{ post.excerpt | strip_html | truncate: 180 }}</p></article>
{% endfor %}
</div>
