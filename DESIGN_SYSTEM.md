# Replyxbase Landing Page - Design System & UI Guidelines

## Design Philosophy
**Modern AI-First Enterprise Design System**
- Clean, minimal, professional aesthetic
- Blue/Navy color palette for trust and technology
- Focus on clarity, performance, and user experience
- AI-themed with intelligent interactions

## Color System

### Primary Colors
- **Primary Blue**: `#005bbc` - Main actions, highlights, CTAs, headers
- **Primary Dark**: `#004a9f` - Hover states, emphasis
- **Primary Light**: `bg-[#005bbc]/10` - Backgrounds, subtle highlights
- **Primary Border**: `border-[#005bbc]/20` - Borders, dividers

### Accent Colors
- **Accent Yellow**: `#ffd600` - Status indicators, highlights, secondary accents
- **Accent Light**: `bg-[#ffd600]/10` - Accent backgrounds
- **Accent Border**: `border-[#ffd600]/20` - Accent borders

### Secondary Colors
- **Slate 900**: `text-slate-900` - Headings, important text
- **Slate 800**: `text-slate-800` - Body text
- **Slate 600**: `text-slate-600` - Secondary text
- **Slate 500**: `text-slate-500` - Muted text
- **Slate 400**: `text-slate-400` - Placeholders, hints
- **Slate 200**: `border-slate-200` - Borders, dividers
- **Slate 50**: `bg-slate-50` - Subtle backgrounds

### Status Colors
- **Success**: `#10B981` (Emerald) - Success states only
- **Warning**: `#F59E0B` (Amber) - Warnings
- **Error**: `#EF4444` (Red) - Errors

### Text Colors
- **Primary Text**: `text-slate-900` - Headings, important content
- **Secondary Text**: `text-slate-600` or `text-slate-800` - Body text, descriptions
- **Muted Text**: `text-slate-500` or `text-slate-400` - Placeholders, hints
- **Inverted Text**: `text-white` - On colored backgrounds

### Background Colors
- **Page Background**: `bg-white` - Main page background
- **Subtle Background**: `bg-slate-50` - Section backgrounds (alternating)
- **Surface**: `bg-white` - Cards, elevated surfaces
- **Gradient Background**: `bg-gradient-to-br from-slate-50 via-white to-slate-50` - Hero sections

### Border Colors
- **Standard**: `border-2 border-slate-200` - Default borders (always use border-2)
- **Primary Border**: `border-2 border-[#005bbc]/20` - Primary element borders
- **Accent Border**: `border-2 border-[#ffd600]/20` - Accent element borders
- **Focus**: `focus:border-[#005bbc]` - Focus states

## Typography

### Font Family
- **Primary**: `Inter, sans-serif` - Clean, modern, readable
- **System Fallback**: System UI fonts for performance

### Heading Styles
- **H1**: `text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900`
- **H2**: `text-3xl sm:text-4xl font-bold tracking-tight text-slate-900`
- **H3**: `text-2xl font-bold text-slate-900`
- **H4**: `text-xl font-bold text-slate-900`

### Body Styles
- **Large**: `text-lg text-slate-600 leading-relaxed`
- **Base**: `text-base text-slate-600 leading-relaxed`
- **Small**: `text-sm text-slate-500`

## Component Patterns

### Cards
```tsx
className="bg-white rounded-2xl border-2 border-slate-200"
```
**Note**: No shadows - clean, minimal design with borders only

### Buttons
- **Primary**: `bg-[#005bbc] hover:bg-[#004a9f] text-white border border-[#005bbc]`
- **Secondary**: `bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50`
- **Ghost**: `text-slate-600 hover:text-slate-900 hover:bg-slate-50`

### Badges
```tsx
// Primary badge
className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-medium border border-[#005bbc]/20"

// Accent badge
className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffd600]/10 text-[#ffd600] text-sm font-medium border border-[#ffd600]/20"
```

### Sections
- **Spacing**: `py-20` (vertical padding)
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Backgrounds**: Alternate between `bg-white` and `bg-slate-50`
- **Borders**: Use `border-2 border-slate-200` for section separators

## Animation Principles

### Entrance Animations
- Use `framer-motion` for complex animations
- CSS animations for simple fade-in/slide-up
- Stagger delays: `delay: index * 0.1`

### Hover Effects
- Scale: `hover:scale-[1.02]` or `hover:scale-105` (for buttons)
- Border: `hover:border-[#005bbc]/30` or `hover:border-[#ffd600]/30`
- Background: `hover:bg-[#004a9f]` (primary) or `hover:bg-slate-50` (secondary)
- Smooth transitions: `transition-all` or `transition-colors`
- **Note**: No shadow effects - clean, minimal design

### Loading States
- Skeleton loaders with `animate-pulse`
- Spinner: `border-2 border-[#005bbc] border-t-transparent rounded-full animate-spin`
- Typing indicator: Three dots with `animate-bounce` using `bg-[#005bbc]`

## Layout Patterns

### Hero Section
- Full-width with gradient backgrounds
- Centered content, max-width container
- Large heading with gradient text
- CTA buttons prominently displayed
- Visual element (dashboard/mockup) below

### Feature Sections
- Two-column grid on desktop
- Text on left, visual on right (or vice versa)
- Icon badges for categorization
- Clear headings and descriptions
- Hover effects on interactive elements

### Stats/Metrics
- Blue gradient background card
- Grid layout for multiple stats
- Large numbers, small labels
- Icons for visual interest

## Component Structure

### Standard Section Template
```tsx
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      <Badge />
      <h2>Title</h2>
      <p>Description</p>
    </div>
    
    {/* Content */}
    <div className="grid md:grid-cols-2 gap-16">
      {/* Content here */}
    </div>
  </div>
</section>
```

## AI Theme Elements

### Icons to Use
- `Brain` - AI intelligence
- `Sparkles` - AI magic, features
- `Zap` - Speed, performance
- `Shield` - Security, trust
- `Globe` - Omnichannel, global
- `MessageSquare` - Communication
- `TrendingUp` - Growth, analytics
- `CheckCircle2` - Success, completion

### Visual Effects
- Subtle gradient backgrounds: `bg-gradient-to-br from-slate-50 via-white to-slate-50`
- Blur effects for depth: `blur-[100px]` with `bg-[#005bbc]/10` or `bg-[#ffd600]/10`
- Animated gradients: `animate-pulse` for background blobs
- **Note**: No shadow effects - clean, minimal design with borders and gradients only

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+)
- **Large**: `lg:` (1024px+)
- **XL**: `xl:` (1280px+)

### Mobile-First Approach
- Start with mobile layout
- Add complexity at larger breakpoints
- Hide/show elements with `hidden md:block`
- Adjust spacing: `px-4 sm:px-6 lg:px-8`

## Performance Guidelines

### Optimization
- Lazy load heavy components with `React.lazy()`
- Use `Suspense` for loading states
- Minimize `framer-motion` usage (prefer CSS animations)
- Use `will-change-transform` sparingly
- Optimize images with Next.js `Image` component

### Code Splitting
- Feature sections in separate files
- Lazy load below-the-fold content
- Code split by route

## Accessibility

### Requirements
- Semantic HTML (`<section>`, `<header>`, `<nav>`)
- ARIA labels for interactive elements (`aria-label`, `aria-hidden`)
- Keyboard navigation support
- Focus states: `focus:ring-2 focus:ring-[#005bbc]/20 focus:border-[#005bbc]`
- Color contrast ratios (WCAG AA minimum)
- Proper heading hierarchy (h1, h2, h3, etc.)

### RTL Support
- Use logical properties (`start`, `end`)
- Test with `dir="rtl"`
- Icons: `rtl:rotate-180` when needed

## Implementation Notes

### Component Organization
```
components/landing/
  ├── Header.tsx
  ├── Footer.tsx
  ├── hero/
  │   ├── HeroSection.tsx
  │   └── HeroVisual.tsx
  ├── features/
  │   ├── FeatureInbox.tsx
  │   ├── FeatureAgents.tsx
  │   ├── FeatureCRM.tsx
  │   ├── FeatureAnalytics.tsx
  │   └── OmnichannelFlow.tsx
  ├── AICapabilitiesSection.tsx
  ├── PricingSection.tsx
  ├── TestimonialsSection.tsx
  ├── CTASection.tsx
  ├── TrustedBy.tsx
  └── ChatWidget.tsx
```

### Key Principles
1. **Consistency**: Use design tokens throughout
2. **Clarity**: Clear hierarchy, readable text
3. **Performance**: Fast loading, smooth animations
4. **Accessibility**: Usable by everyone
5. **Modern**: Contemporary design patterns

## Current Theme: Blue Enterprise
- Professional, trustworthy appearance
- Technology-focused color scheme (`#005bbc` primary, `#ffd600` accent)
- Clean, minimal aesthetic with no shadows
- Border-based design system (`border-2 border-slate-200`)
- AI-themed with intelligent interactions
- No dark mode (light mode only)

## Design Rules
1. **No Shadows**: Use borders (`border-2`) instead of shadows
2. **Consistent Borders**: Always use `border-2` for all borders
3. **Color Usage**: 
   - Primary (`#005bbc`) for main actions, headers, CTAs
   - Accent (`#ffd600`) for status indicators, highlights
   - Slate colors for text and backgrounds
4. **Spacing**: Use `py-20` for section padding
5. **Accessibility**: Always include ARIA labels and proper focus states

---

**Last Updated**: 2024
**Version**: 5.0 - Blue Enterprise Edition (Minimal Border Design)

