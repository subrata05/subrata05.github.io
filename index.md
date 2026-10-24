---
layout: default
title: Home
---

<section class="hero">

  <!-- Left column: introduction and links -->
  <div class="hero-content">

    <!-- Professional focus -->
    <p class="eyebrow">
      EMBEDDED SYSTEMS · FIRMWARE · REAL-TIME SOFTWARE
    </p>

    <!-- Main introduction -->
    <h1>
      Hi, I'm Subrata.<br>
      <span>I build embedded systems.</span>
    </h1>

    <!-- Short professional summary -->
    <p class="hero-copy">
      I'm an Embedded System Engineer interested in firmware,
      microcontrollers, real-time systems, and the details that
      make hardware and software work reliably together.
    </p>

    <!-- Primary actions -->
    <div class="hero-actions">
      <a href="{{ '/projects/' | relative_url }}"
         class="button button-primary">
        Explore projects
      </a>

      <a href="{{ '/assets/documents/Subrata-Sarkar-Resume.pdf' | relative_url }}"
         class="button button-secondary">
        View resume ↗
      </a>
    </div>

    <!-- Professional links -->
    <div class="social-links">
      <a href="https://github.com/subrata05">GitHub ↗</a>
      <a href="https://www.linkedin.com/in/subratasarkar-ss/">LinkedIn ↗</a>
      <a href="mailto:ss9sarkar@gmail.com">Email ↗</a>
    </div>

  </div>

  <!-- Right column: your existing profile photograph -->
  <div class="hero-photo-wrap">
    <img
      src="{{ '/assets/images/about/subrata.png' | relative_url }}"
      alt="Portrait of Subrata Sarkar"
      class="hero-photo"
      width="600"
      height="600"
      fetchpriority="high">
  </div>

</section>

<section class="section">
  <div class="section-heading">
    <div><p class="eyebrow">A QUICK INTRODUCTION</p><h2>About me</h2></div>
    <a class="text-link" href="{{ '/about/' | relative_url }}">More about me ↗</a>
  </div>
  <p class="section-copy">I work across embedded firmware and hardware–software integration. My interests include low-level programming, ARM and AVR microcontrollers, communication interfaces, event-driven design, and testing firmware beyond the happy path.</p>
</section>

<section class="section">
  <div class="section-heading">
    <div><p class="eyebrow">SELECTED WORK</p><h2>Projects</h2></div>
    <a class="text-link" href="{{ '/projects/' | relative_url }}">All projects ↗</a>
  </div>
  <div class="card-grid">
    {% assign featured_projects = site.projects | where: "featured", true %}
    {% for project in featured_projects limit: 4 %}
      {% include project-card.html project=project %}
    {% endfor %}
  </div>
  {% if featured_projects.size == 0 %}
    <p class="muted">Project pages are ready to be filled in. Add <code>featured: true</code> to a project file's front matter to show it here.</p>
  {% endif %}
</section>

<section class="section">
  <div class="section-heading">
    <div><p class="eyebrow">CAREER</p><h2>Experience</h2></div>
    <a class="text-link" href="{{ '/experience/' | relative_url }}">Full experience ↗</a>
  </div>
  <div class="timeline">
    <article class="timeline-item">
      <p class="timeline-date">Sept, 2026 — Present</p>
      <div><h3>Embedded Software Engineer</h3><p class="muted">Glide Technology Pvt Ltd</p><p>Worked on RTOS based design and integration, BSP Driver, MCU peripheral interfaces and integration</p></div>
    </article>
    <article class="timeline-item">
      <p class="timeline-date">Aug, 2024 — Jul, 2026</p>
      <div><h3>Embedded Systems Engineer</h3><p class="muted">Symbica Private Limited</p><p>Worked on embedded firmware and hardware design, including sensor processing, BLE integration, event-driven control, and HIL testing.</p></div>
    </article>
  </div>
</section>

<section class="section">
  <div class="section-heading">
    <div><p class="eyebrow">NOTES & IDEAS</p><h2>Latest writing</h2></div>
    <a class="text-link" href="{{ '/blog/' | relative_url }}">All posts ↗</a>
  </div>
  <div class="post-list">
    {% assign recent_posts = site.posts | slice: 0, 3 %}
    {% for post in recent_posts %}
      <a class="post-row" href="{{ post.url | relative_url }}">
        <span class="post-date">{{ post.date | date: "%d %b %Y" }}</span>
        <span class="post-title">{{ post.title }}</span>
        <span class="post-arrow">↗</span>
      </a>
    {% endfor %}
    {% if site.posts.size == 0 %}
      <p class="muted">Your articles will appear here when you add Markdown files to <code>_posts/</code>.</p>
    {% endif %}
  </div>
</section>

<section class="contact-band">
  <p class="eyebrow">HAVE SOMETHING IN MIND?</p>
  <h2>Let's talk engineering.</h2>
  <p>Open to thoughtful conversations, interesting embedded problems, and suitable consulting or freelance work.</p>
  <a class="button button-primary" href="{{ '/contact/' | relative_url }}">Get in touch ↗</a>
</section>
