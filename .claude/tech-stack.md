# Tech Stack — Smart Calculator

**Decided:** 2026-05-15  
**Status:** Confirmed

## Stack

| Layer | Choice |
|-------|--------|
| Framework | React Native + Expo SDK 51 |
| Language | TypeScript |
| Styling | NativeWind (Tailwind for RN) |
| Storage | AsyncStorage (local history) |
| Animation | react-native-reanimated (history panel slide) |
| Testing | Jest + React Native Testing Library + Detox (E2E) |
| Build | Expo EAS Build |
| Distribution | Google Play Store (APK/AAB) + Apple App Store (IPA) |

## Deployment Note
Phase 7 will use `eas build --platform all` to produce:
- **Android:** AAB file → upload to Google Play Console
- **iOS:** IPA file → upload to App Store Connect via `eas submit`
No server deployment needed — this is a standalone mobile app.
