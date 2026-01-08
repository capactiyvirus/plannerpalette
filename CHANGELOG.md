# Changelog

All notable changes to this project will be documented in this file.

## [2026-01-07] - Recent Updates

### Added

#### Stripe Price Integration
- **Added live price fetching from Stripe API across all components**
  - Modified `src/data/products.ts`: Added optional `price?: number` field to Product interface
  - Modified `src/components/cart/cartcontext.tsx`: Added price fetching logic and `prices` state for cart items
  - Modified `src/app/cart/page.tsx`: Updated to use fetched prices from cart context
  - Modified `src/components/ProductCard.tsx`: Added price fetching with useEffect
  - Modified all product pages (`src/app/(public)/products/[1-8]/page.tsx`): Added price fetching for each product
  - **Why**: Secure pricing system that doesn't expose hardcoded prices in frontend code

#### Video Hover Feature
- **Added .mp4 video playback on hover for product cards**
  - Modified `src/data/products.ts`: Added `videoUrl?: string` field to Product interface
  - Modified `src/components/ProductCard.tsx`: Added video hover with useRef, opacity transitions
  - Modified `src/components/product/ProductImageSection.tsx`: Added video hover functionality
  - Modified `src/app/(public)/products/page.tsx`: Created inline component for video hover
  - Modified all product pages: Pass videoUrl prop to ProductImageSection
  - **Why**: Enhanced UX showing product previews on hover

#### Etsy Reviews Integration
- **Added customer reviews display (static/manual approach)**
  - Created `src/app/api/etsy/reviews/route.ts`: API route for Etsy reviews (optional, for future use with API key)
  - Created `src/components/product/ProductReviews.tsx`: Beautiful review card component with star ratings
  - Modified `src/data/products.ts`: Added `Review` interface and `reviews?: Review[]` field
  - Modified `src/data/products.ts`: Added `etsyListingId?: string` field
  - Modified `src/app/(public)/products/1/page.tsx`: Integrated ProductReviews component with static reviews
  - **Features**:
    - Star rating visualization (full, half, empty stars)
    - Average rating calculation
    - 2-column responsive grid layout
    - "View all reviews on Etsy" link
    - Theme-aware styling
  - **Why**: Display customer testimonials to build trust and social proof

#### Documentation
- **Created comprehensive project structure documentation**
  - Created `STRUCTURE.md`: Complete overview of project architecture, file organization, and component relationships
  - **Why**: Help recall how components work together after breaks from coding

### Changed

#### Cart UX Improvements
- **Improved "Add to Cart" button feedback**
  - Modified `src/components/ProductCard.tsx`: Button now shows inline feedback instead of separate message
    - Text changes to "Added!" with checkmark icon
    - Background turns green (#22c55e dark, #16a34a light)
    - Disabled state for 2 seconds
  - Modified `src/components/product/ProductDetailsCard.tsx`: Same inline feedback pattern
  - **Why**: Eliminated layout shift that was pushing button down and cutting off text

#### Product Description Redesign
- **Complete redesign of product description display**
  - Modified `src/components/product/ProductDescriptionCard.tsx`: Complete rewrite
    - Smart parsing of sections (What's Included, Perfect For, etc.)
    - Auto-assigned icons based on section titles
    - 2-column responsive grid layout
    - Colored left borders on cards
    - Checkmark bullets for list items
    - Hover effects for interactivity
  - **Why**: More visually appealing and readable product information

#### Dark Mode Color Adjustments
- **Refined dark mode color hierarchy**
  - Modified `src/components/colors.tsx`:
    - Updated `darkMode.background` to `#1f2d2c` (lighter for better visibility)
    - Added `darkMode.navbarBg` to `#1a2524` (distinct from banner)
  - Modified `src/components/Navigation.tsx`: Uses new `navbarBg` color
  - **Color hierarchy**:
    - navbarBg: `#1a2524` (top navbar)
    - primary: `#141f1e` (hero/banner sections)
    - background: `#1f2d2c` (main background)
    - cardBg: `#243332` (card backgrounds)
  - **Why**: Better visual separation between navbar, hero, and content areas

### Removed

#### Codebase Cleanup
- **Removed unused files and build artifacts**
  - Deleted `src/context/LoadingContext copy.tsx` (duplicate file)
  - Deleted empty files: `car`, `product/Prod`
  - Deleted `src/components/oldcomps/` directory (4 unused files)
  - Deleted `src/components/ui/oldCustomCursor.tsx`
  - Deleted `old.package-lock.json` (238KB)
  - Deleted `/out/` directory (71MB of build artifacts)
  - **Why**: Clean up codebase and reduce repository size

## Technical Details

### Pricing System Architecture
- **Client-side**: Components fetch prices using `fetch('/api/products/price?id=${priceId}')`
- **Server-side**: API route `/api/products/price/route.ts` retrieves prices from Stripe
- **Cart**: CartContext manages prices state object `{ [productId]: price }`
- **Format**: Prices displayed using `Intl.NumberFormat` with CAD currency

### Video Hover Implementation
- **Pattern**: useRef + useState for video control
- **Events**: onMouseEnter (play) / onMouseLeave (pause + reset)
- **Styling**: Absolute positioning with opacity transitions (0.3s)
- **Performance**: Videos muted, loop, playsInline attributes

### Review Component Features
- **Star Rendering**: Full stars, half stars, empty stars based on rating
- **Date Formatting**: `toLocaleDateString('en-US', { year, month, day })`
- **Layout**: CSS Grid with 1 column (mobile) / 2 columns (desktop)
- **Limit**: Shows first 6 reviews with link to view all on Etsy

## Notes

- All changes maintain theme consistency (light/dark mode support)
- TypeScript interfaces updated for type safety
- No breaking changes to existing functionality
- Ready for production deployment
