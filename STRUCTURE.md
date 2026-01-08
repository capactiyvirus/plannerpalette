# Project Structure Documentation

## 📁 Overview
Next.js e-commerce site for digital writing products with Stripe integration, theme support, and hover videos.

---

## 🗂️ Directory Structure

### `/src/app` - Next.js App Router
**Pages:**
- `page.tsx` - Home page (device-responsive)
- `layout.tsx` - Root layout (wraps all pages with providers)
- `about/page.tsx` - About page
- `contact/page.tsx` - Contact page
- `cart/page.tsx` - Shopping cart page
- `privacy/page.tsx` - Privacy policy
- `terms/page.tsx` - Terms of service
- `(public)/products/page.tsx` - Products listing with filters
- `(public)/products/[1-8]/page.tsx` - Individual product detail pages

**API Routes:**
- `api/create-checkout/route.ts` - Stripe checkout session creation
- `api/products/price/route.ts` - Fetch live prices from Stripe

**Other:**
- `middleware.ts` - Next.js middleware
- `globals.css` - Global styles
- `favicon.ico` - Site favicon

---

### `/src/components` - Reusable UI Components

#### Cart Components (`/cart`)
- `cartcontext.tsx` - Cart state management (Context API)
  - Manages: items, add/remove, quantities, prices
  - Fetches live prices from Stripe API
  - Persists to localStorage
- `CartSummary.tsx` - Cart totals and checkout button
- `carticon.tsx` - Cart icon with item count badge

#### Product Components (`/product`)
- `ProductCard.tsx` - Product grid card (used in listings)
  - Shows image/video on hover
  - Displays price, file type
  - Add to cart button
- `ProductImageSection.tsx` - Product detail page image
  - Video on hover support
- `ProductDetailsCard.tsx` - Product title, price, CTA buttons
- `ProductDescriptionCard.tsx` - Full product description
- `ProductHighlightsCard.tsx` - Key features/highlights
- `ProductBreadcrumb.tsx` - Navigation breadcrumbs

#### Device-Specific Components (`/device`)
**Desktop:**
- `DesktopHome.tsx` - Desktop home page layout
- `FeatureGuide.tsx` - Featured products section
- `BannerGuides.tsx` - Banner/hero section

**Mobile:**
- `MobileHome.tsx` - Mobile home page layout
- `FeatureGuide.tsx` - Mobile featured products

#### Layout Components
- `Navbar.tsx` - Main navigation bar
- `Navigation.tsx` - Navigation logic/helpers
- `SocialFooter.tsx` - Footer with social links
- `ThemeToggle.tsx` - Dark/light mode toggle

#### Utility Components
- `TypeWriterEffect.tsx` - Animated typewriter text
- `InteractiveButton.tsx` - Enhanced button component
- `interactiveComps.tsx` - Collection of interactive elements
- `colors.tsx` - Color palette constants
- `construction.tsx` - Under construction component

#### Old/Unused (`/oldcomps`, `/ui`)
- `oldcomps/*` - Previous versions (can be deleted if not used)
- `ui/oldCustomCursor.tsx` - Old custom cursor (unused?)

---

### `/src/context` - React Context Providers
- `ThemeContext.tsx` - Dark/light theme state
- `LoadingContext.tsx` - Global loading state
- ~~`LoadingContext copy.tsx`~~ - **DUPLICATE - can be deleted**

---

### `/src/data` - Static Data
- `products.ts` - Product catalog
  - Interface: `Product`
  - Fields: id, title, description, fileType, etsyUrl, imageUrl, videoUrl, priceId, price
  - Currently: 1 active product (more can be added)

---

### `/src/lib` - Utility Libraries
- `etsy.ts` - Etsy API integration functions

---

## 🔄 Data Flow

### 1. **Pricing System**
```
products.ts (priceId)
  → API route (/api/products/price)
  → Stripe API
  → Component displays live price
```

**Where prices are fetched:**
- Products listing page (`/products/page.tsx`)
- Individual product pages (`/products/[1-8]/page.tsx`)
- Cart context (`cartcontext.tsx`)
- ProductCard component

### 2. **Cart System**
```
User clicks "Add to Cart"
  → cartcontext.tsx (adds product)
  → localStorage (persists)
  → Cart page shows items
  → Checkout → Stripe
```

**Cart flow:**
1. `ProductCard` or `ProductDetailsCard` → `addItem()`
2. `cartcontext.tsx` → manages state + fetches prices
3. `cart/page.tsx` → displays cart with `CartSummary`
4. Checkout → `api/create-checkout/route.ts` → Stripe

### 3. **Video Hover System**
```
Product with videoUrl
  → Component has video ref
  → onMouseEnter → video.play()
  → onMouseLeave → video.pause()
```

**Components with video hover:**
- `ProductCard.tsx` (grid cards)
- `ProductImageSection.tsx` (detail pages)
- Products listing page (inline component)

### 4. **Theme System**
```
ThemeContext
  → Provides theme state
  → Components use theme colors
  → ThemeToggle switches theme
  → Persists to localStorage
```

---

## 🎯 Key Features

### ✅ Implemented
- ✅ Live Stripe pricing (secure, server-validated)
- ✅ Shopping cart with localStorage persistence
- ✅ Dark/light theme
- ✅ Video hover on product cards
- ✅ Responsive design (mobile/desktop)
- ✅ Promo code support
- ✅ Individual product pages

### 🏗️ File Structure Notes
- Empty directories: `components/car`, `components/product/Prod` (can be deleted)
- Duplicate: `context/LoadingContext copy.tsx` (can be deleted)
- Old components in `oldcomps/` (review before deleting)

---

## 📝 Adding New Products

1. Add product to `src/data/products.ts`:
```typescript
{
  id: '2',
  title: 'Product Name',
  description: '...',
  fileType: 'PDF',
  etsyUrl: 'https://...',
  imageUrl: '/images/product.jpg',
  videoUrl: '/videos/product.mp4', // optional
  priceId: 'price_xxx', // from Stripe
}
```

2. Create product page: `src/app/(public)/products/2/page.tsx`
   - Copy from existing product page
   - Change `p.id === '2'`

3. Add images/videos to `public/images/` and `public/videos/`

---

## 🔧 Environment Variables Required
```
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

---

*Last updated: 2026-01-07*
