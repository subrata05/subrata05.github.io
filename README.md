# Subrata Sarkar — Personal Portfolio

A clean, responsive portfolio built with Jekyll and designed for GitHub Pages.

## Before publishing

1. Search for `YOUR_EMAIL@example.com` and replace it with the email address you want to publish.
2. Review job titles, dates, and experience descriptions for accuracy.
3. Review all project pages and remove any confidential information.
4. Replace the sample resume at `assets/documents/` with your actual PDF. The PDF is not included in this starter project.
5. Replace the starter blog post with your own writing, or delete it.
6. Check every link and project GitHub URL.
7. Confirm `_config.yml` uses your actual GitHub username and site URL.

## Repository

For the default URL `https://subrata05.github.io`, the repository should be named `subrata05.github.io`.

## Publish on GitHub Pages

1. Push this project to the `main` branch of the repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch** and select `main` / `/(root)` if your GitHub Pages setup supports the Jekyll build this site needs.
4. If you prefer the GitHub Actions workflow, use the official GitHub Pages Jekyll workflow and configure it to build and deploy this repository.
5. Wait for deployment, then open `https://subrata05.github.io`.

GitHub Pages' supported dependency versions can change. If the build fails, check the current GitHub Pages documentation and the Actions build log.

## Preview locally (Ubuntu)

Install Ruby, Ruby development headers, and Bundler using your distribution's package manager. Then, from this directory:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000` in your browser.

Depending on the Ruby version provided by your OS, you may need to configure a user-local gem path or use a Ruby version manager. Do not run `sudo bundle install`.

## Add a project

Create a Markdown file inside `_projects/`, for example `_projects/my-new-project.md`:

```yaml
---
title: "Project title"
description: "One sentence explaining the project."
number: "05"
order: 5
featured: true
technologies:
  - Embedded C
  - STM32
github: "https://github.com/your-username/your-repository"
---
```

Write the project description below the second `---`. Set `featured: true` to include it in the homepage featured list. Leave `github` empty if there is no public repository.

## Add a blog post

Create `_posts/YYYY-MM-DD-your-post-title.md` with this front matter:

```yaml
---
title: "Your article title"
date: YYYY-MM-DD
description: "A short summary."
categories: [Embedded Systems]
---
```

Replace `YYYY-MM-DD` with a real date, then write the article below the second `---`.

## Update your resume

Replace `assets/documents/Subrata-Sarkar-Resume.pdf` with your current PDF using exactly the same filename. The starter project intentionally does not include a resume file.

## Common update workflow

```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```

## Privacy

Everything in a public repository can be viewed and copied. Do not upload private contact details, confidential company information, proprietary source code, or documents you do not want public.
