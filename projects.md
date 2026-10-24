---
layout: default
title: Projects
permalink: /projects/
---

<section class="page-intro">
  <p class="eyebrow">SELECTED WORK</p>
  <h1>Projects</h1>
  <p class="lead">A collection of systems I've built, explored, or documented. Each project page should explain the problem, implementation, trade-offs, and validation—not just list the tools.</p>
</section>

<div class="card-grid project-grid">
  {% assign sorted_projects = site.projects | sort: "order" %}
  {% for project in sorted_projects %}
    {% include project-card.html project=project %}
  {% endfor %}
</div>
