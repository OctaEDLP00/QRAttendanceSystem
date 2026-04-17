---
name: html-seo-structure
description: "Generate SEO-optimized HTML with proper semantic structure and accessibility. Validates nesting rules (no <a> in <button>, proper heading hierarchy). Use when: creating Astro components, writing HTML templates, ensuring semantic markup and SEO best practices."
parameters:
  - name: component_type
    description: "Type of component: page, layout, or component"
    required: true
  - name: content_description
    description: "Brief description of the content and purpose"
    required: true
  - name: seo_requirements
    description: "Specific SEO needs: title, meta description, structured data, etc."
    required: false
---

# HTML Structure and SEO Optimization

Generate semantic HTML with proper SEO optimization and accessibility compliance.

## Semantic HTML Structure

### Page-Level Structure
```astro
---
// Component frontmatter
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{pageTitle} | QR Attendance System</title>
    <meta name="description" content="{pageDescription}" />
    <meta name="keywords" content="{relevantKeywords}" />
    <!-- Open Graph / Social Media -->
    <meta property="og:title" content="{pageTitle}" />
    <meta property="og:description" content="{pageDescription}" />
    <meta property="og:image" content="{ogImageUrl}" />
    <meta property="og:url" content="{canonicalUrl}" />
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "{SchemaType}",
      "name": "{pageTitle}",
      "description": "{pageDescription}",
      "url": "{canonicalUrl}"
    }}
    </script>
  </head>
  <body>
    <header>
      <!-- Navigation and branding -->
    </header>

    <main>
      <!-- Primary content -->
    </main>

    <footer>
      <!-- Footer content -->
    </footer>
  </body>
</html>
```

### Component Structure Patterns

#### Article/List Component
```astro
<article class="attendance-record">
  <header>
    <h3>{record.title}</h3>
    <time datetime={record.timestamp.toISOString()}>
      {record.timestamp.toLocaleDateString()}
    </time>
  </header>

  <section class="record-details">
    <p>Status: <span class="status-{record.status.toLowerCase()}">{record.status}</span></p>
    <p>Location: {record.latitude}, {record.longitude}</p>
  </section>

  <footer>
    <button type="button" aria-label="Edit record">Edit</button>
  </footer>
</article>
```

#### Form Component
```astro
<form action="/api/attendance" method="post" novalidate>
  <fieldset>
    <legend>Record Attendance</legend>

    <div class="form-group">
      <label for="student-id">Student ID</label>
      <input
        type="text"
        id="student-id"
        name="studentId"
        required
        aria-describedby="student-id-help"
      />
      <small id="student-id-help">Enter your student identification number</small>
    </div>

    <div class="form-group">
      <label for="qr-token">QR Token</label>
      <input
        type="text"
        id="qr-token"
        name="qrToken"
        required
        readonly
        value={qrToken}
      />
    </div>

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Submitting...' : 'Record Attendance'}
    </button>
  </fieldset>
</form>
```

## HTML Nesting Rules (Critical)

### ❌ Invalid Nesting (Will Break)
```astro
<!-- NEVER do this -->
<button>
  <a href="/somewhere">Click me</a>
</button>

<!-- Or this -->
<a href="/link">
  <button>Don't nest buttons in links</button>
</a>

<!-- Or this -->
<p>
  <div>Block elements inside inline</div>
</p>

<!-- Or this -->
<ul>
  <div>Not list items</div>
</ul>
```

### ✅ Valid Nesting
```astro
<!-- Correct: Button contains phrasing content -->
<button type="button" onclick="handleClick()">
  <span class="icon">📍</span>
  <span>Get Location</span>
</button>

<!-- Correct: Link contains phrasing content -->
<a href="/dashboard" class="nav-link">
  <span class="icon">🏠</span>
  <span>Dashboard</span>
</a>

<!-- Correct: Block elements properly nested -->
<div class="card">
  <h3>Card Title</h3>
  <p>Card content...</p>
</div>

<!-- Correct: List structure -->
<ul class="attendance-list">
  <li class="attendance-item">
    <article>...</article>
  </li>
</ul>
```

## SEO Best Practices

### Heading Hierarchy
```astro
<h1>Main Page Title (only one per page)</h1>

<section>
  <h2>Section Title</h2>
  <p>Content...</p>

  <h3>Subsection</h3>
  <p>More content...</p>
</section>

<section>
  <h2>Another Section</h2>
  <article>
    <h3>Article Title</h3>
    <p>Article content...</p>
  </article>
</section>
```

### Image Optimization
```astro
<!-- Always include alt text -->
<img
  src={image.src}
  alt={image.alt}
  width={image.width}
  height={image.height}
  loading="lazy"
/>

<!-- For QR codes specifically -->
<img
  src={qrCodeUrl}
  alt="QR Code for attendance - scan to record presence"
  class="qr-code"
/>
```

### Meta Tags Checklist
- [ ] `<title>`: Unique, descriptive, under 60 characters
- [ ] `<meta name="description">`: Compelling summary, under 160 characters
- [ ] `<meta name="keywords">`: Relevant keywords (optional, less important now)
- [ ] Open Graph tags for social sharing
- [ ] Canonical URL to prevent duplicate content
- [ ] Structured data (JSON-LD) for rich snippets

## Accessibility Guidelines

### ARIA Labels and Roles
```astro
<!-- For custom controls -->
<button
  type="button"
  aria-label="Scan QR code for attendance"
  aria-pressed={isScanning}
>
  <span class="icon">📱</span>
</button>

<!-- For form associations -->
<label for="course-select">Select Course</label>
<select id="course-select" name="courseId" required>
  <option value="">Choose a course...</option>
  {courses.map(course => (
    <option value={course.id} key={course.id}>
      {course.name}
    </option>
  ))}
</select>
```

### Focus Management
```astro
<!-- Ensure focusable elements are keyboard accessible -->
<button
  type="button"
  class="qr-scan-btn"
  tabindex="0"
  onkeydown={handleKeyDown}
>
  Start QR Scan
</button>

<!-- Skip links for screen readers -->
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

### Color and Contrast
- Ensure sufficient color contrast (WCAG AA: 4.5:1 for normal text)
- Don't rely on color alone for meaning
- Provide high contrast mode support

## Performance Considerations

### Loading Optimization
```astro
<!-- Lazy load images -->
<img
  src={image.src}
  alt={image.alt}
  loading="lazy"
  decoding="async"
/>

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />

<!-- Defer non-critical scripts -->
<script defer src="/js/analytics.js"></script>
```

### Bundle Splitting
```astro
---
// In Astro, use dynamic imports for heavy components
---
{isVisible && <HeavyComponent { ...await import('./HeavyComponent.astro')} />}
```

## Validation Checklist

Before committing HTML/Astro components:
- [ ] Semantic HTML elements used appropriately
- [ ] No invalid nesting (especially <a> in <button>)
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skipping)
- [ ] Alt text on all images
- [ ] Form elements properly labeled
- [ ] ARIA attributes used where needed
- [ ] Color contrast sufficient
- [ ] Meta tags complete for pages
- [ ] Structured data included where beneficial
- [ ] Performance optimizations applied
- [ ] Accessibility tested (keyboard navigation, screen readers)</content>
<parameter name="filePath">c:\Users\Octav\OneDrive\Desktop\Dev\qr-attendance-system\.github\prompts\html-seo-structure.prompt.md