# Review: AI Launcher (React Native + Expo)

*Opus 4.6 review — 2026-02-07*

---

## Code Review

### ✅ Strengths
- **TypeScript strict, zero errors.** The whole codebase compiles clean.
- **Consistent patterns.** Every component follows the same structure: interface → component → styles. Easy to read, easy to contribute.
- **`useStorage` is well-designed.** Race condition guard via `hasSetBeforeLoad` ref is correct. The hook API mirrors `useState` so there's no learning curve.
- **Null safety.** `formatPost`-style defensive access (`post.submolt?.name ?? 'general'`) throughout.
- **Haptics are deliberate.** Different feedback styles for different actions (Medium for launch, Light for nav, Heavy for drag start, Warning notification for destructive actions). This shows UX thinking, not just sprinkling haptics everywhere.
- **Deep link fallback chain.** `canOpenURL` → `openURL(scheme)` → `openURL(fallbackUrl)` → silent fail. Correct order.

### 🔴 Critical Issues

**1. `GestureHandlerRootView` only wraps Settings, not the app root**
`react-native-gesture-handler` docs say `GestureHandlerRootView` should wrap the entire app (in `_layout.tsx`), not individual screens. Having it only in `settings.tsx` may work but is fragile — if any other screen needs gestures, it'll silently fail. It also creates/destroys the gesture system on every settings navigation.

*Fix:* Move `GestureHandlerRootView` to `app/_layout.tsx`, wrapping everything.

**2. `StatusBar style="light"` is hardcoded**
`_layout.tsx` hardcodes `style="light"` but the app supports both light and dark mode via `userInterfaceStyle: "automatic"`. In light mode, white status bar text on a light background = invisible.

*Fix:* Use `style="auto"` or derive from `useColorScheme()`.

**3. `contentStyle: { backgroundColor: "#000000" }` hardcoded in layout**
Same issue — hardcoded black background ignores light mode. Should use theme colors.

*Fix:* This needs a theme-aware layout or accept dark-only (and set `userInterfaceStyle: "dark"` in app.json to be explicit).

### 🟡 Medium Issues

**4. Android fallback URLs all point to Apple App Store**
Every `fallbackUrl` in `apps.ts` is an `apps.apple.com` link. On Android these will open in a browser showing an iOS App Store page — confusing and useless.

*Fix:* Add `playStoreUrl` field to `AIApp` interface, or use a platform check:
```ts
import { Platform } from "react-native";
const url = Platform.OS === "android" ? app.playStoreUrl : app.fallbackUrl;
```

**5. `AppGrid` gap calculation assumes 3 columns always**
The comment says "2 gaps for 3 columns" but with 2 or 4 selected apps the layout may look odd. With 4 apps you get 3+1, with 5 you get 3+2 (second row left-shifted).

*Fix:* Either fix columns at 3 and center partial rows, or make columns dynamic based on app count.

**6. `SelectableAppRow` is now only used for "Add More" but still has `selected` prop/checkbox UI**
After the drag-to-reorder refactor, `SelectableAppRow` in settings always has `selected={false}`. The checkbox visual (empty circle) is confusing — it looks like something to check, not a "tap to add" action.

*Fix:* Either show a `+` icon instead of empty checkbox, or create a simpler `AddAppRow` component.

**7. No error handling for corrupted AsyncStorage**
If `JSON.parse` throws in `useStorage` (corrupted data), the error is silently swallowed and the initial value is used. This is fine for now, but the corrupted value persists — next load will fail again silently.

*Fix:* Catch parse errors explicitly and clear the corrupted key.

### 🟢 Minor Issues

**8. Unused imports.** `borderRadius` imported in `app/index.tsx` but never used.

**9. Magic number in AppTile.** `size + 24` for container height — the 24 is the label space. Should be a named constant or calculated from typography.

**10. `label` style in `AppTile` has dead `color: "#FFFFFF"` comment.** Cleanup artifact.

**11. Button and Card components** are included from the template but unused in AI Launcher. Not harmful (tree-shaking handles it) but adds noise.

---

## Feature / UX Review

### ✅ Strengths
- **Zero-friction core loop.** Open app → see grid → tap → launched. Can't be simpler.
- **Settings is discoverable** via both the gear icon AND the footer hint text.
- **Drag-to-reorder** is the right pattern for customisation. Long-press activation avoids accidental drags.
- **Selection constraints** (2–6) prevent empty grids and overcrowded layouts.
- **Counter with colour change** at max is a nice touch — immediate feedback.
- **Two-section settings** ("Your Launcher" + "Add More") is clearer than the original all-in-one checkbox list.

### 🔴 Critical Gaps

**1. No onboarding / first-launch experience**
The app opens straight to a grid of 6 pre-selected apps. The user didn't choose these. First impression should be "pick your apps" — even a one-screen setup wizard would dramatically improve retention.

**2. No "app not installed" feedback**
When a user taps an app and `canOpenURL` returns false, they get silently redirected to the App Store. This is confusing — they don't know why they left the launcher. A brief toast ("ChatGPT not installed — opening App Store") would fix this.

**3. Cross-platform story is incomplete**
- All fallback URLs are iOS-only (see code issue #4)
- `LSApplicationQueriesSchemes` is iOS-only config
- No Android intent verification
- The README says "Cross-platform" but it's really iOS-first with Android as an afterthought

### 🟡 UX Improvements

**4. No visual differentiation between installed/not-installed apps**
Could show a subtle badge or opacity change on tiles for apps that aren't installed. `canOpenURL` could be checked on mount and cached.

**5. Widget is the killer feature — and it's missing**
The spec's core value prop is the HOME SCREEN widget. The in-app grid is nice but people won't open an app to launch another app — that's more taps, not fewer. Without the widget, the value proposition is weak.

This needs `react-native-widget-extension` (iOS) or investigating Expo's widget support. Should be the #1 priority for v2.

**6. Emoji icons look like a prototype**
Users expect polished app icons. The emoji placeholders will get the app rejected from App Store review, or at minimum tank first impressions. Need actual brand-coloured icons (even simplified/flat versions).

**7. "← Back" button is custom, not native**
On iOS, the standard back gesture (swipe from left edge) should work (Expo Router handles this), but the custom back button doesn't follow platform conventions. Consider using the Stack header instead of a custom one.

### 🟢 Nice-to-Have

**8. Launch count tracking** — show "Launched ChatGPT 47 times" in settings. Users love stats.

**9. Quick actions** — 3D Touch / long-press on a tile could show options ("Open", "Remove from launcher").

**10. App suggestions** — "Claude is trending in your region" based on chart data.

---

## Summary

| Area | Rating | Notes |
|------|--------|-------|
| Code quality | ⭐⭐⭐⭐ | Clean, consistent, good TypeScript. Fix the 3 critical issues. |
| Architecture | ⭐⭐⭐⭐ | Good separation of concerns. Theme system works well. |
| Feature completeness | ⭐⭐⭐ | Core loop works. Missing onboarding, widget, and Android parity. |
| UX polish | ⭐⭐⭐ | Haptics and interactions are good. Emoji icons and lack of onboarding hurt. |
| Ship-readiness | ⭐⭐ | Not App Store ready. Needs: real icons, onboarding, "not installed" feedback, Android URLs. |

### Priority Fixes (do these before showing to anyone)
1. Move `GestureHandlerRootView` to root layout
2. Fix StatusBar and background colour for light mode (or commit to dark-only)
3. Add Android Play Store fallback URLs
4. Add "not installed" feedback (toast/alert)
5. Replace emoji with real app icons
6. Add first-launch onboarding screen
