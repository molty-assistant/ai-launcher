# Self-Review: AI Launcher (React Native)

## Code Review ✅

### What's Good
- **Clean compile** — TypeScript strict, zero errors
- **Expo Router** — file-based routing, proper Stack navigation
- **Deep linking with fallback** — tries URL scheme → falls back to App Store link
- **Haptic feedback** — on tile tap, settings navigation, reset
- **Responsive grid** — calculates tile size from screen width
- **Persistent state** — useStorage for app selection, survives restart
- **Dark mode** — useThemeColors with full light/dark token sets
- **Constants-driven** — AI_APPS array is the single source of truth

### Issues Found
1. **No reorder support** — Settings lets you select/deselect but not reorder. Need drag-to-reorder for full feature parity with spec. (Requires `react-native-draggable-flatlist` or similar.)
2. **Emoji icons** — Using emoji as placeholders. Should use actual app icons (PNGs or SVGs) for a polished look.
3. **AppTile label colour hardcoded** — Label is `#FFFFFF` not using theme. Works on dark bg but breaks on light.
4. **No onboarding** — First launch dumps you straight into the grid. A brief "pick your apps" flow would improve first impression.
5. **No widget** — React Native can't do native iOS/Android widgets out of the box. Would need `react-native-widget-extension` (iOS) or `@lyqht/react-native-app-widget` (Android). This is the killer feature from the spec.
6. **Linking.canOpenURL needs config** — On iOS, `canOpenURL` requires `LSApplicationQueriesSchemes` in Info.plist. Without it, all schemes return false. Need to add this via app.json plugins or app.config.js.

### Severity
- #6: **Critical** — deep linking won't work on iOS without this. Must fix.
- #1: High — core UX feature
- #2: Medium — visual polish
- #3: Medium — theme bug
- #5: Medium — market differentiator, requires native code
- #4: Low — nice to have

## UX/UI Review ✅

### What's Good
- **Single-purpose** — opens, shows grid, one tap to launch. Zero friction.
- **Dark-first** — feels like a utility/power-user tool. Good choice.
- **Touch targets** — tiles are ≥80pt, well above 44pt minimum.
- **Visual hierarchy** — title → grid → hint. Clear top-to-bottom flow.
- **Settings is discoverable** — gear icon in header, hint text at bottom.
- **Selection constraints** — min 2, max 6, disabled states, counter. Prevents empty/overcrowded grid.

### Issues Found
1. **No visual feedback for "app not installed"** — If a user taps and gets redirected to App Store, it's jarring. Should show a brief toast/alert.
2. **Grid layout jumps** — With 4 apps (2+2), grid is centered but with 5 apps (3+2) the second row left-aligns. Need consistent alignment.
3. **No animation on settings transition** — Screen just slides. A shared element transition on the app icons would feel premium.
4. **Settings has no "Done" button** — Only back. An explicit "Done" or "Save" gives more confidence.
5. **No splash screen customised** — Still using default Expo splash. Should match dark bg + app branding.

### Severity
- #1: Medium — confusing first experience for missing apps
- #2: Medium — visual polish
- #3-5: Low — nice to have

## Action Items (Priority Order)

1. **[CRITICAL] Add LSApplicationQueriesSchemes** to app config for all 8 URL schemes
2. Add drag-to-reorder in settings
3. Replace emoji with real app icons (PNG assets)
4. Fix AppTile label to use theme color
5. Add "not installed" feedback (toast or subtle indicator)
6. Investigate widget extensions for iOS/Android

---

*Reviewed by Molty 🦉 — 2026-02-07*
