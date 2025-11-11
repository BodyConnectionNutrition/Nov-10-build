---
layout: default
title: "Subscribe"
description: "Subscribe to new chapters and reflections on the mind–body–metabolism connection."
permalink: /subscribe
---

<section class="section">
  <div class="container">
    <h1 class="section-title">Subscribe</h1>
    <p class="prose">Get new chapters, reflections on the mind–body–metabolism connection, and practical tools—straight to your inbox.</p>

    <form name="subscribe" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thanks" class="form">
      <input type="hidden" name="form-name" value="subscribe">
      <p style="display:none;">
        <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
      </p>
      <div class="field">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" autocomplete="name" required>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="field">
        <label for="interest">What are you most curious about?</label>
        <input id="interest" name="interest" type="text" placeholder="e.g., gut–brain axis, hormones, picky eating">
      </div>
      <button class="btn btn-primary" type="submit">Subscribe</button>
      <p class="fine">We respect your privacy. No spam, and you can unsubscribe anytime. Please avoid sharing protected health information.</p>
    </form>
  </div>
</section>
