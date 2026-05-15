# Deployment — Smart Calculator

## Hostinger VPS
| Field | Value |
|-------|-------|
| Host | — |
| SSH User | — |
| App Path | /var/www/smart-calculator |
| PM2 Process | smart-calculator |
| Production URL | — |

## Mobile Deployment (Expo EAS)
- Platform: iOS + Android
- Build command: `eas build --platform all`
- Submit: `eas submit`

## First-Time Server Setup
```bash
npm install -g eas-cli
eas login
eas build:configure
```
