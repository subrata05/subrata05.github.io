---
layout: default
title: Writing
permalink: /blog/
---

<section class="page-intro writing-intro">

  <p class="eyebrow">FROM THE WORKBENCH</p>

  <h1>Writing</h1>

  <p class="lead">
    Notes from building, breaking, and understanding things.
    I write about embedded systems, firmware development,
    debugging, and the engineering lessons that come from
    working close to the hardware.
  </p>

  <div class="writing-platforms">

    {% if site.medium_url %}
      <a
        href="https://sxvyte.medium.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="writing-platform-link"
      >
        Read on Medium <span aria-hidden="true">↗</span>
      </a>
    {% endif %}

    {% if site.hashnode_url %}
      <a
        href="https://hashnode.com/@sxvyte"
        target="_blank"
        rel="noopener noreferrer"
        class="writing-platform-link"
      >
        Read on Hashnode <span aria-hidden="true">↗</span>
      </a>
    {% endif %}

  </div>

</section>

<section class="writing-list" aria-label="Blog posts">

  {% assign posts = site.posts %}

  {% if posts.size > 0 %}

    {% for post in posts %}

      <article class="writing-item">

        <time
          class="writing-date"
          datetime="{{ post.date | date_to_xmlschema }}"
        >
          {{ post.date | date: "%d %b %Y" }}
        </time>

        <div class="writing-item-content">

          <h2>
            <a href="{{ post.url | relative_url }}">
              {{ post.title }}
            </a>
          </h2>

          {% if post.description %}
            <p>{{ post.description }}</p>
          {% elsif post.excerpt %}
            <p>
              {{ post.excerpt | strip_html | normalize_whitespace | truncate: 180 }}
            </p>
          {% endif %}

        </div>

        <a
          class="writing-item-arrow"
          href="{{ post.url | relative_url }}"
          aria-label="Read {{ post.title | escape }}"
        >
          ↗
        </a>

      </article>

    {% endfor %}

  {% else %}

    <p>New writing is in the works. Check back soon.</p>

  {% endif %}

</section>