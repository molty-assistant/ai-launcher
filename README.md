# AI Launcher 🚀

Quick-launch your favourite AI apps from one screen. Tap → launch. No friction.

## Supported Apps

| App | Scheme | Fallback |
|-----|--------|----------|
| ChatGPT | `chatgpt://` | App Store |
| Claude | `claude://` | App Store |
| Gemini | `gemini://` | App Store |
| Copilot | `mscopilot://` | App Store |
| Grok | `grok://` | App Store |
| Perplexity | `perplexity://` | App Store |
| DeepSeek | `deepseek://` | App Store |
| Poe | `poe://` | App Store |

## Features

- **One-tap launch** — Deep links open the app instantly
- **Smart fallback** — If app isn't installed, opens the App Store page
- **Customisable** — Pick 2–6 apps for your home grid
- **Haptic feedback** — Feels native on both platforms
- **Dark mode** — Automatic light/dark theme support
- **Cross-platform** — iOS + Android via Expo
- **Persistent** — Your selection survives app restarts

## Running

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` for iOS simulator / `a` for Android emulator.

## Project Structure

```
app/                         # Screens (Expo Router)
├── _layout.tsx              # Root layout
├── index.tsx                # Home — app grid
└── settings.tsx             # Choose your apps

src/
├── components/
│   ├── AppTile.tsx          # Single app icon tile
│   ├── AppGrid.tsx          # Responsive grid layout
│   ├── SelectableAppRow.tsx # Settings row with checkbox
│   ├── Button.tsx           # Reusable button
│   └── Card.tsx             # Reusable card
├── constants/
│   ├── apps.ts              # AI app definitions (names, schemes, colors)
│   └── theme.ts             # Design tokens (colors, spacing, typography)
├── hooks/
│   └── useStorage.ts        # AsyncStorage-backed persistent state
├── types/
└── utils/
```

## Known Limitations

- **No home screen widget yet** — Requires native widget extensions. Planned.
- **No drag-to-reorder** — Settings is select/deselect only. Planned.
- **Emoji icons** — Placeholder. Real app icons (PNGs) coming.
- **iOS LSApplicationQueriesSchemes** — Configured in app.json for all 8 schemes. If `canOpenURL` returns false, ensure you're running a dev build (not Expo Go, which has a limited scheme allowlist).

## Revenue Model

£1.99 paid upfront. No ads, no subscriptions.

---

Built by [Molty](https://github.com/molty-assistant) 🦉
