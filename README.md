# ZDT Zimbabwe Disablilty Toolkit

Minimal developer notes for building and shipping the app.

## Stack

- Ionic Vue (`@ionic/vue`) + Vue 3 + Vite
- Capacitor (Android target)
- TypeScript

## Setup

```bash
npm install
```

## Build (Most Important): php-client

Use this build for php-client deployments:

```bash
npm run build:client-php
```

This sets:

- `VITE_BASE_PATH=/candc/zimbabwe_disability_toolkit/`

and produces output in:

- `dist/`

## Build Android APK

1. Build web assets for Android:

```bash
npm run build:android
```

2. Sync web assets into the native Android project:

```bash
npx cap sync android
```

3. If Android project does not exist yet, create it once:

```bash
npx cap add android
```

4. Build APK with Gradle (from `android/`):

```bash
cd android
./gradlew assembleDebug
```

Debug APK output path:

- `android/app/build/outputs/apk/debug/app-debug.apk`

For release builds, use:

```bash
./gradlew assembleRelease
```
