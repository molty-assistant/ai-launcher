# Handoff — Build & Submit Instructions

## Prerequisites

1. **Node.js** — v18+ (recommend v20 LTS)
2. **EAS CLI** — `npm install -g eas-cli` (v14+)
3. **Apple Developer Account** — enrolled in Apple Developer Program ($99/year)
4. **Google Play Developer Account** — enrolled in Google Play Console ($25 one-time)
5. **Expo account** — sign up at expo.dev, then run `eas login`

## Before You Build

### ⚠️ App Icons

The current icons are **placeholder emoji**. Before submitting to the stores, you need to create real icons:

- `assets/icon.png` — 1024×1024, App Store icon (iOS)
- `assets/adaptive-icon.png` — 1024×1024, foreground layer for Android adaptive icon
- `assets/favicon.png` — 48×48, web favicon (optional)
- `assets/splash-icon.png` — 200×200 minimum, splash screen logo

All icons should work well on a black background (the app is dark-mode only).

## Steps

### 1. Clone and Install

```bash
git clone https://github.com/molty-assistant/ai-launcher.git
cd ai-launcher
npm install
```

### 2. Link to Expo Project

```bash
eas login          # Log in to your Expo account
eas init           # Link to a new EAS project (creates projectId in app.json)
```

### 3. Build

```bash
# Build both platforms for production
eas build --platform all --profile production

# Or build individually
eas build --platform ios --profile production
eas build --platform android --profile production
```

**First build will prompt you to:**
- iOS: Set up credentials (let EAS manage them — easiest option)
- Android: Generate a keystore (let EAS manage it — easiest option)

### 4. Submit

```bash
# Submit to both stores
eas submit --platform all --profile production

# Or individually
eas submit --platform ios
eas submit --platform android
```

**iOS submission requires:**
- An app record in App Store Connect (create it at appstoreconnect.apple.com)
- App name: "AI Launcher"
- Bundle ID: `com.tommurton.ailauncher`
- Fill in store listing copy from `STORE-LISTING.md`
- Upload screenshots (you'll need to take these from a simulator or device)

**Android submission requires:**
- An app in Google Play Console (create it at play.google.com/console)
- Package name: `com.tommurton.ailauncher`
- Fill in store listing copy from `STORE-LISTING.md`
- Content rating questionnaire (the app collects no data — answer accordingly)
- Upload screenshots

### 5. Store Listing

Copy the listing text from `STORE-LISTING.md` into App Store Connect and Google Play Console.

Privacy policy URL for both: https://github.com/molty-assistant/ai-launcher/blob/main/PRIVACY-POLICY.md

## Testing First (Optional)

If you want to test on a real device before submitting:

```bash
# Preview build (installs directly on device)
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

iOS preview builds require registering your device UDID with EAS first:
```bash
eas device:create
```

## Useful Commands

```bash
npx tsc --noEmit          # Type-check without building
npx expo start             # Start dev server
eas build:list             # See past builds
eas credentials            # Manage signing credentials
```

## Notes

- The app uses `userInterfaceStyle: "dark"` — this is intentional, not a bug.
- `expo-haptics` provides tactile feedback on reorder — works on physical devices only.
- The `LSApplicationQueriesSchemes` in app.json is required for iOS to detect installed apps.
