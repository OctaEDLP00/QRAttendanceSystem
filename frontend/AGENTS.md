# Frontend Package - Agent Instructions

Welcome to the **frontend** package! This is an Astro-based web application for the QR Attendance System.

## Quick Overview

The frontend is built with **Astro** for fast, optimized static site generation with interactive components. It uses **Tailwind CSS** for styling and provides a responsive web interface for attendance management.

**Tech Stack:**
- **Framework**: Astro (static site generation)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Static hosting (Vercel, Netlify, etc.)

## Project Structure

```
frontend/
├── src/
│   ├── components/            # Reusable Astro components
│   │   ├── LoginForm.astro
│   │   └── ui/               # UI component library
│   ├── layouts/              # Page layouts
│   │   ├── Layout.astro      # Default layout
│   │   └── AdminLayout.astro # Admin-specific layout
│   ├── pages/                # Routes (file-based routing)
│   │   ├── index.astro       # Home page
│   │   ├── dashboard.astro
│   │   ├── attendance.astro
│   │   ├── courses.astro
│   │   └── qr.astro
│   ├── lib/                  # Utilities and helpers
│   │   ├── auth.ts
│   │   └── utils/
│   ├── types/                # TypeScript type definitions
│   ├── services/             # API service layer
│   ├── styles/               # Global styles
│   └── assets/               # Images and static files
├── public/                   # Static assets
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Build and Run Commands

### Development
```bash
# Install dependencies (from root or frontend folder)
pnpm i

# Start development server with hot reload
pnpm dev

# Build for production
pnpm build
```

### Production
```bash
# Build static site
pnpm build

# Preview production build locally
pnpm preview
```

## Astro Fundamentals

### Pages and Routes
Astro uses **file-based routing**. Files in `src/pages/` automatically become routes:
- `src/pages/index.astro` → `/`
- `src/pages/dashboard.astro` → `/dashboard`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/[id].astro` → `/blog/:id` (dynamic routes)

### Components
Astro components have:
- **Frontmatter** (top, in code fence): Server-side code
- **HTML template** (bottom): What renders

```astro
---
// Server-side code (TypeScript)
const title = "My Page";
const items = await fetchData();

interface Props {
  heading: string;
}
const { heading } = Astro.props;
---

<div>
  <h1>{title}</h1>
  {items.map(item => <p>{item.name}</p>)}
</div>
```

### Layouts
Layouts wrap page content:

```astro
---
// layouts/Layout.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <header>
      <!-- Navigation -->
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <!-- Footer -->
    </footer>
  </body>
</html>
```

Using a layout:
```astro
---
// pages/dashboard.astro
import Layout from "../layouts/Layout.astro";
---

<Layout title="Dashboard">
  <h1>Welcome to Dashboard</h1>
</Layout>
```

### Islands Architecture
Use frameworks like React for interactive components:

```astro
---
// pages/index.astro
import InteractiveButton from "../components/InteractiveButton.jsx";
---

<button>Static button</button>
<InteractiveButton client:load />
```

`client:load` directive tells Astro to hydrate the component (make it interactive).

## Tailwind CSS

### Utility-First Styling
Apply styles directly with Tailwind classes:

```astro
<div class="flex justify-center items-center bg-blue-500 p-4 rounded-lg">
  <h1 class="text-2xl font-bold text-white">Hello</h1>
</div>
```

### Responsive Design
Use breakpoint prefixes:
```astro
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### Common Patterns
```astro
<!-- Button -->
<button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click me
</button>

<!-- Card -->
<div class="bg-white rounded-lg shadow p-6">
  Card content
</div>

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card item={item} />)}
</div>

<!-- Flexbox -->
<div class="flex justify-between items-center">
  Content
</div>
```

## Styling Best Practices

### Component Styling
- Keep styles **scoped** to components
- Use **Tailwind classes** primarily
- Avoid custom CSS unless necessary
- Create **utility classes** in `styles/` for complex patterns

### Design System
Maintain consistency:
- Use a **color palette** (defined in `tailwind.config`)
- Standardize **spacing** (4px increments)
- Consistent **typography** (font sizes, weights)
- Reusable **component styles**

## Forms and Validation

### Form Component
```astro
---
// components/LoginForm.astro
interface Props {
  onSubmit: (data: FormData) => void;
}
const { onSubmit } = Astro.props;
---

<form method="POST">
  <input type="email" name="email" required />
  <input type="password" name="password" required />
  <button type="submit">Login</button>
</form>
```

### Client-Side Validation
Use React or Alpine.js for interactive validation:
```jsx
// components/form/LoginForm.jsx
export default function LoginForm() {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // Validate and submit
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## API Integration

### Fetching Data
```astro
---
// pages/courses.astro
const response = await fetch('http://localhost:3000/api/courses');
const courses = await response.json();
---

<div>
  {courses.map(course => (
    <div key={course.id}>{course.name}</div>
  ))}
</div>
```

### Authentication
```astro
---
// pages/dashboard.astro
const token = Astro.cookies.get('auth_token')?.value;
if (!token) {
  return Astro.redirect('/login');
}

const response = await fetch('http://localhost:3000/api/dashboard', {
  headers: { Authorization: `Bearer ${token}` },
});
const data = await response.json();
---
```

## Image Optimization

### Astro Image Component
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.png';
---

<Image src={myImage} alt="Description" />
```

Benefits:
- Automatic optimization
- Responsive images
- Format conversion (WebP, AVIF)
- Lazy loading

## SEO Optimization

### Meta Tags
```astro
---
// Astro automatically handles meta tags in <head>
---

<Layout title="Attendance System">
  {/* Title is added to <head> */}
</Layout>
```

### Custom Meta Tags
```astro
---
// pages/dashboard.astro
const title = "Dashboard - QR Attendance";
const description = "Manage attendance records with QR codes";
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<head>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <link rel="canonical" href={canonicalURL} />
</head>
```

### Structured Data
```astro
---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QR Attendance System',
  url: 'https://example.com',
};
---

<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

## Accessibility (a11y)

### WCAG 2.2 Guidelines

**Semantic HTML:**
```astro
<!-- ❌ Avoid: -->
<div onclick="handleClick()" role="button">Click me</div>

<!-- ✅ Use: -->
<button onclick="handleClick()">Click me</button>
```

**Form Labels:**
```astro
<!-- ❌ Avoid: -->
<input type="text" placeholder="Email" />

<!-- ✅ Use: -->
<label for="email">Email</label>
<input id="email" type="email" />
```

**Alt Text for Images:**
```astro
<!-- Always provide alt text -->
<img src="qr-code.png" alt="QR code for attendance" />
```

**Color Contrast:**
- Text must have 4.5:1 contrast ratio (normal text)
- 3:1 for large text (18pt+)

**Keyboard Navigation:**
- All interactive elements must be keyboard accessible
- Use `:focus` styles for visible focus indicator

### Testing Accessibility
- Use browser DevTools accessibility inspector
- Test with screen readers (NVDA, JAWS)
- Test with keyboard-only navigation
- Use Lighthouse for automated audits

## Dependencies to Use (Skills)

When working on frontend code, leverage these specialized skills:

### [astro](../.agents/skills/astro/SKILL.md)
- Astro components and pages
- File-based routing
- SSR configuration
- Content collections
- Deployment strategies

### [tailwind-css-patterns](../.agents/skills/tailwind-css-patterns/SKILL.md)
- Utility-first styling
- Responsive design patterns
- Layout utilities (flexbox, grid)
- Component styling
- Custom utilities and plugins

### [accessibility](../.agents/skills/accessibility/SKILL.md)
- WCAG 2.2 compliance
- Screen reader support
- Keyboard navigation
- Semantic HTML
- Accessibility audits

### [seo](../.agents/skills/seo/SKILL.md)
- Meta tags optimization
- Structured data
- Sitemap generation
- Search engine visibility
- Performance optimization

### [frontend-design](../.agents/skills/frontend-design/SKILL.md)
- Production-grade UI design
- Component design patterns
- Visual hierarchy
- Design system implementation
- High-quality aesthetics

## Code Style Guidelines

### Naming
- **Components**: PascalCase (`.astro` extension)
- **Pages**: kebab-case (index, dashboard, admin-panel)
- **Utility functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

### File Organization
```
components/
├── LoginForm.astro
├── ui/
│   ├── Button.astro
│   ├── Card.astro
│   └── Modal.astro
└── sections/
    ├── Header.astro
    └── Footer.astro
```

### Formatting
- Use **Prettier** for consistent formatting
- Max line length: 100 characters
- Use spaces (2-4 spaces, not tabs)
- Organize CSS classes logically in Tailwind

## Common Workflows

### Creating a New Page
1. Create file in `src/pages/`: `src/pages/new-page.astro`
2. Choose layout: `import Layout from "../layouts/Layout.astro"`
3. Add meta tags in frontmatter
4. Write HTML template
5. Style with Tailwind classes

### Creating a Component
1. Create in `src/components/`: `src/components/MyComponent.astro`
2. Define props with interface if needed
3. Server-side code in frontmatter
4. Template with styles
5. Export as default

### Building a Form
1. Create component with form elements
2. Add client-side validation (React component if interactive)
3. Handle submission to backend API
4. Display success/error messages
5. Test accessibility and keyboard navigation

### Responsive Layout
1. Start mobile-first (no breakpoint = mobile)
2. Add `md:` classes for medium screens (768px+)
3. Add `lg:` classes for large screens (1024px+)
4. Test on real devices or DevTools

## Deployment

### Build Output
```bash
pnpm build
# Creates dist/ folder with static HTML, CSS, JS
```

### Static Hosting
Deploy `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- CloudFront + S3
- Any static host

### Environment Variables
Create `.env` file for API endpoints:
```
ASTRO_PUBLIC_API_URL=http://localhost:3000
ASTRO_PUBLIC_APP_NAME=QR Attendance
```

Access in components:
```astro
---
const apiUrl = import.meta.env.ASTRO_PUBLIC_API_URL;
---
```

## Troubleshooting

### Build Fails
- Clear `.astro` cache: `rm -rf .astro`
- Check TypeScript errors: `pnpm exec astro check`
- Verify all imports exist

### Styling Not Applied
- Ensure Tailwind is properly configured
- Check class names are correct (no typos)
- Run `pnpm build` to see all issues
- Clear browser cache (Cmd+Shift+Delete)

### Images Not Loading
- Use `Image` component for optimization
- Check alt text and file paths
- Verify files in `public/` or `src/assets/`

## Additional Resources

- [Astro Official Docs](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref)
- [Web Accessibility](https://www.w3.org/WAI)
- [SEO Best Practices](https://developers.google.com/search)

---

**Always test responsiveness, accessibility, and performance before deploying to production.**
