Intranet mobile app requires a fiirebase account. To setup firebase account follow below commands:

1. Create a project
- Go to the [Firebase Console](https://console.firebase.google.com/) and click "Add project".
- Enter the project name (ex. Intranet) and click "Continue".
- Follow the on-screen instructions to complete the project creation.

2. Add Android App
- Click on Android icon to register the app.
- Register app with package name `com.joshsoftware.intranet.dev`(For Dev Mode) and follow all steps.
- You can also register app for stage (`com.joshsoftware.intranet.stage`) and prod (`com.joshsoftware.intranet`) environment
- Download the `google-services.json` file from firebase and add it into `android/app/` path of your project.
