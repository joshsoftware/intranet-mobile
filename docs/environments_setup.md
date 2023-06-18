To configure app for different environments (dev, stage, prod):
1. Add different `.env*` files:
- .env.dev: For development environment
- .env.stage: For staging environment
- .env.prod: For production environment (to test app with prod conf)
- .env: For play store release

To run application in different environments, use following commands:
1. `npm run android`: Devlopment debug mode
2. `npm run android-dev-release`: Development Release
3. `npm run android-stage-debug`: Staging debug mode
4. `npm run android-stage-release`: Staging Release
5. `npm run android-prod-debug`: Production debug mode
6. `npm run android-prod-release`: Production Release