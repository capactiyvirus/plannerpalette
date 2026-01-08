# Development Setup

## Linting & Code Quality

### ESLint Configuration

This project uses ESLint with TypeScript for code quality. The configuration is already set up in `.vscode/settings.json`.

### Cursor/VSCode Setup

The project includes VSCode/Cursor settings that:
- ✅ Enable ESLint automatically
- ✅ Fix ESLint errors on save
- ✅ Format code on save
- ✅ Validate TypeScript and React files

**Settings are in:** `.vscode/settings.json`

### Manual Linting Commands

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable errors
npm run lint -- --fix
```

### Common ESLint Rules We Follow

1. **No `any` types** - Use proper TypeScript types
   ```typescript
   // ❌ Bad
   const data: any = await fetch()

   // ✅ Good
   const data: Product = await fetch()
   ```

2. **No unused variables** - Remove or prefix with underscore
   ```typescript
   // ❌ Bad
   const handleClick = () => {}  // Never used

   // ✅ Good - Remove it, or:
   const _handleClick = () => {}  // Prefix if needed for future
   ```

3. **Escape HTML entities in JSX**
   ```typescript
   // ❌ Bad
   <p>Don't do this</p>

   // ✅ Good
   <p>Don&apos;t do this</p>
   ```

4. **Complete dependency arrays**
   ```typescript
   // ❌ Bad
   useEffect(() => {
     doSomething(value)
   }, [])  // Missing 'value'

   // ✅ Good
   useEffect(() => {
     doSomething(value)
   }, [value])
   ```

## Environment Variables

### Local Development (.env.local)

Create a `.env.local` file in the root:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Gmail (for email delivery)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your16charpassword
```

**Never commit this file!** It's already in `.gitignore`.

### Production (Cloudflare Pages)

Add these in Cloudflare Pages Dashboard:
- Go to: Workers & Pages → Your Project → Settings → Environment Variables
- Add the same variables but with production values:
  - Use `sk_live_xxxxx` for Stripe (not test key)
  - Get production webhook secret from Stripe Dashboard

## Testing Locally

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Test Stripe Webhooks Locally

Install Stripe CLI:
```bash
# Download from: https://stripe.com/docs/stripe-cli
```

Login and listen for webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook secret (`whsec_xxxxx`) to `.env.local`

### 3. Test Purchase Flow

1. Go to `localhost:3000`
2. Add product to cart
3. Checkout with test card: `4242 4242 4242 4242`
4. Use any future expiry date and CVC
5. Enter your real email to receive test email
6. Complete purchase
7. Check your email! 📧

## Build & Deploy

### Build Locally
```bash
npm run build
```

### Deploy to Cloudflare Pages

Automatic deployment on push:
```bash
git add .
git commit -m "Your message"
git push
```

Cloudflare will automatically:
1. Detect the push
2. Run `npm ci && npm run build`
3. Deploy to production

**Monitor deployment:**
- Go to Cloudflare Dashboard → Workers & Pages → Your Project → Deployments

## Common Issues

### Build fails with ESLint errors
- Run `npm run lint` locally first
- Fix all errors before pushing
- Cursor should show red underlines for errors

### Webhook not triggering locally
- Make sure `stripe listen` is running
- Check webhook secret is in `.env.local`
- Restart dev server after adding secret

### Email not sending
- Check Gmail credentials in `.env.local`
- Verify Gmail app password (not regular password)
- Check terminal for error messages

## File Structure

See `STRUCTURE.md` for complete project architecture.

## Changelog

See `CHANGELOG.md` for all recent changes and updates.
