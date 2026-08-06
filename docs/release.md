To release app on play store, use following steps:
1. Go to `package.json` file and update the version accordingly.
- If major feature change then update version by incrementaing left number 1.X.X
- If minor changes/feature added then update version by incrementaing middle number X.1.X
- If bug fixes or minor changes are there then update version by incrementaing right number X.X.1
2. Then execute the command to update the android and ios versions:
```
npm run updateversion
```
3. Generate the android bundle file of the app

**Prod** (uses `intranet-dev.keystore` — unchanged):
```
cd android/
./gradlew bundleProdRelease
```
Output: `android/app/build/outputs/bundle/prodRelease/`

**Stage** (uses `intranet-stage-upload.keystore` — separate Play upload key):
```
cd android/
./gradlew bundleStageRelease
```
Output: `android/app/build/outputs/bundle/stageRelease/`

4. Upload the `.aab` to the matching Play Console app (prod or Josh Intranet Stage).
