To configure app for different environments (dev, stage, prod):
1. Add different `.env*` files:
- .env.dev: For development environment
- .env.stage: For staging environment
- .env.prod: For production environment (to test app with prod conf)
- .env: For play store release / default iOS

## Android

Product flavors install as separate apps (side-by-side with prod):

| Flavor | Application ID | Env | Display name | Command | Upload keystore |
|---|---|---|---|---|---|
| **dev** | `com.joshsoftware.intranet.dev` | `.env.dev` | Intranet Dev | `npm run android` | `intranet-dev.keystore` |
| **stage** | `com.joshsoftware.intranet.stage` | `.env.stage` | Intranet Stage | `npm run android-stage-debug` | `intranet-stage-upload.keystore` |
| **prod** | `com.joshsoftware.intranet` | `.env.prod` | Intranet | `npm run android-prod-debug` | `intranet-dev.keystore` |

Commands:
1. `npm run android` — Development debug
2. `npm run android-dev-release` — Development release
3. `npm run android-stage-debug` — Staging debug (separate app)
4. `npm run android-stage-release` — Staging release
5. `npm run android-prod-debug` — Production debug
6. `npm run android-prod-release` — Production release

Firebase: all three package names must exist in `android/app/google-services.json`.

## iOS

Use two Xcode targets/schemes:

| Target | Scheme | Bundle ID | Env | Firebase |
|---|---|---|---|---|
| **Intranet** | `Intranet` | `com.joshsoftware.intranet` | `.env` / `.env.prod` | `GoogleService-Info.plist` |
| **Intranet-stage** | `Intranet-Stage` | `com.joshsoftware.intranet.stage` | `.env.stage` | `GoogleService-Info-stage-IJ.plist` |

Commands:
1. `npm run ios` / `npm run ios-prod` — production target
2. `npm run ios-stage` — stage target (Debug)
3. `npm run ios-stage-release` — stage target (Release)

### Archive / App Store

- **Prod:** scheme `Intranet` → Product → Archive
- **Stage:** scheme `Intranet-Stage` → Product → Archive (loads `.env.stage` automatically)
