# BOOT-05: GitHub Actions CI/CD Configuration

**Status:** ✅ Implemented  
**Ticket:** BOOT-05 `P1` `[INFRA]`  
**Implementation:** Three GitHub Actions workflows for automated testing, building, and deployment

---

## Overview

BOOT-05 sets up three GitHub Actions workflows to automate CI/CD processes:

1. **`ci.yml`** — Continuous Integration: Lint + Type-Check on every push/PR
2. **`eas-build.yml`** — Android Build: Build APK on version tags via EAS Build
3. **`web-deploy.yml`** — Web Deployment: Build PWA and deploy to GitHub Pages on main branch

---

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Triggers:** Push to `main` or `develop`, all pull requests

**Jobs:**
- **Lint & Type Check** (runs on Node 18.x and 20.x)
  - Runs `npm run lint` (ESLint)
  - Runs `npm run type-check` (TypeScript)
  - Uses cached node_modules for speed

- **Unit Tests** (depends on lint/type-check)
  - Runs `npm test`
  - Continues even if tests fail (non-blocking)

**Status Badge:**
```markdown
[![CI](https://github.com/Grainbox/LibreLingoApp/actions/workflows/ci.yml/badge.svg)](https://github.com/Grainbox/LibreLingoApp/actions/workflows/ci.yml)
```

### 2. EAS Build Workflow (`.github/workflows/eas-build.yml`)

**Triggers:** Push of version tags (e.g., `v1.0.0`, `v1.2.3`)

**Prerequisites:**
1. Create an Expo account (free tier available)
2. Run `eas init` locally to configure your app
3. Set `EXPO_TOKEN` secret in GitHub repository settings

**Setup Instructions:**
```bash
# 1. Create Expo account at https://expo.dev
# 2. Login locally
eas login

# 3. Initialize EAS for your app
eas init

# 4. Create PAT (Personal Access Token) in Expo settings
# https://expo.dev/settings/access-tokens

# 5. Add to GitHub repo secrets:
# Settings → Secrets and variables → Actions → New repository secret
# Name: EXPO_TOKEN
# Value: <your-expo-pat>
```

**Process:**
1. Build Android APK via EAS Build cloud service
2. Upload APK as GitHub artifact (30-day retention)
3. Create GitHub Release with the tag
4. Release includes build metadata

**Usage:**
```bash
# Create a version tag to trigger the build
git tag v1.0.0
git push origin v1.0.0

# Monitor at: GitHub repo → Actions tab
```

### 3. Web Deploy Workflow (`.github/workflows/web-deploy.yml`)

**Triggers:** Push to `main`, manual workflow dispatch

**Prerequisites:**
1. GitHub Pages enabled in repository settings
2. Deployment source set to "GitHub Actions"

**Setup Instructions:**
```
1. Go to repository Settings → Pages
2. Under "Build and deployment":
   - Source: GitHub Actions
   - (no branch selection needed)
```

**Process:**
1. Build PWA with `expo export --platform web`
2. Upload dist folder to GitHub Pages artifact
3. Deploy automatically to `https://username.github.io/LibreLingoApp/`

**Manual Trigger:**
- Go to Actions → Web Deploy → Run workflow

---

## Configuration

### Environment Secrets

Store sensitive values in GitHub repository settings:

```
Settings → Secrets and variables → Actions
```

**Required Secrets:**
- `EXPO_TOKEN` — For EAS Build (if using Android builds)

### GitHub Pages Configuration

1. **Settings → Pages**
   - Source: `Deploy from a branch` or `GitHub Actions`
   - Branch: (if using branch source) `gh-pages` with root `/`

2. **Settings → Environments**
   - Optional: Add environment protection rules
   - Example: Require approval before deploying to production

---

## Node.js Version Strategy

- **CI:** Tests on multiple versions (18.x, 20.x) for compatibility
- **Builds:** Uses latest LTS (20.x) for consistency

Update versions as Node.js releases new LTS versions.

---

## Customization

### Disable Tests (MVP Phase)

Currently, the test job includes `continue-on-error: true` because no test runner is configured yet (noted in CLAUDE.md). To fully enforce passing tests:

```yaml
# In ci.yml, remove this line from the test job:
continue-on-error: true
```

### Android Build Variants

EAS Build supports additional options:

```bash
# In eas-build.yml, modify the build command:
run: eas build --platform android --release-channel production --wait
```

### GitHub Pages Custom Domain

To use a custom domain:

1. Add `CNAME` file in `public/` folder with your domain
2. Uncomment in GitHub Pages settings

---

## Monitoring & Debugging

### View Workflow Runs
```
Repository → Actions → Select workflow
```

### View Build Logs
- Each step shows detailed output
- Click "Run" to see full command output
- Check "Logs" for any errors

### Troubleshooting

**EAS Build fails with "Invalid token":**
- Verify `EXPO_TOKEN` is correctly set in GitHub secrets
- Re-generate token in Expo settings if needed

**Web deploy fails with "dist not found":**
- Ensure `expo export --platform web` works locally
- Check build output for errors

**GitHub Pages not updating:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check GitHub Pages settings are configured
- Verify workflow completed successfully

---

## Future Enhancements

- **Sentry Integration** — Report errors to Sentry
- **Performance Metrics** — Track build time and bundle size
- **Code Coverage** — Generate and track test coverage reports
- **Slack Notifications** — Alert on build failures
- **Staging Deployments** — Deploy develop branch to staging site
- **End-to-End Tests** — Add E2E tests with Detox or native testing

---

## Files

- `.github/workflows/ci.yml` — Lint and type-check
- `.github/workflows/eas-build.yml` — Android APK builds
- `.github/workflows/web-deploy.yml` — PWA deployment
