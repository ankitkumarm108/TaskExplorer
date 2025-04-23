# Task Explorer App

## Setup Instructions

### Prerequisites
- Node.js
- Android Studio and Android emulator (or a physical device)
- React Native CLI setup

### Steps
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd task-explorer
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Metro bundler:
   ```bash
   npx react-native start
   ```
4. In another terminal window, run the app:
   ```bash
   npx react-native run-android
   ```

## Features
- Fetches tasks from JSONPlaceholder API
- Home screen with filter (All / Completed / Incomplete)
- Detail screen showing task info with a toggle for status
- Tasks are saved locally using AsyncStorage for offline use
- Graceful error handling with retry on network failure

## Approach
- Used React Navigation (stack navigator) to switch between screens
- Managed state with React hooks (`useState`, `useEffect`)
- Fetched and persisted tasks using AsyncStorage
- Used conditional rendering for loading and error states
- Followed clean separation of concerns with two screen components

---
Let me know if you want to build and export the APK or iOS version!