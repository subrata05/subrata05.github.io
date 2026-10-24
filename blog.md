---
layout: default
title: Blog
permalink: /blog/
---

<section class="page-intro">
  <p class="eyebrow">NOTES & IDEAS</p>
  <h1>Writing</h1>
  <p class="lead">Technical notes, lessons from debugging, and thoughts from my journey as an engineer.</p>
</section>

<div class="post-list post-list-page">
  {% for post in site.posts %}
    <a class="post-row" href="{{ post.url | relative_url }}">
      <span class="post-date">{{ post.date | date: "%d %b %Y" }}</span>
      <span class="post-title-wrap"><span class="post-title">{{ post.title }}</span>{% if post.description %}<span class="post-description">{{ post.description }}</span>{% endif %}</span>
      <span class="post-arrow">↗</span>
    </a>
  {% endfor %}
  {% if site.posts.size == 0 %}
    <p class="muted">No articles published yet. Add a dated Markdown file to <code>_posts/</code> to get started.</p>
  {% endif %}
</div>
