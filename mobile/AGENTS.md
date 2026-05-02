# Mobile Package - Agent Instructions

Welcome to the **mobile** package! This is a React Native app built with Expo for iOS and Android platforms.

## Quick Overview

The mobile app is built with **React Native** and **Expo** for cross-platform iOS and Android development. It uses **Expo Router** for navigation and provides native QR code scanning capabilities.

**Tech Stack:**
- **Framework**: React Native + Expo
- **Navigation**: Expo Router (file-based routing)
- **Styling**: Tailwind CSS (via NativeWind) + native styles
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Target Platforms**: iOS and Android

## Project Structure

```
mobile/
├── app/                    # File-based routes (Expo Router)
│   ├── _layout.tsx        # Root layout
│   ├── modal.tsx          # Modal page
│   └── (tabs)/            # Tab navigation group
├── components/            # Reusable components
│   ├── ui/               # UI component library
│   ├── external-link.tsx
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── hooks/                # Custom React hooks
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── constants/            # Constants and configuration
│   └── theme.ts
├── assets/              # Images, fonts, etc.
│   └── images/
├── scripts/             # Utility scripts
│   └── reset-project.js
├── app.json            # Expo configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Build and Run Commands

### Development
```bash
# Install dependencies (from root or mobile folder)
pnpm i

# Start Expo development server
pnpm start:mobile

# Run on iOS simulator (Mac only)
i

# Run on Android emulator
a

# Run on web browser
w

# Quit dev server
q
```

### Building
```bash
# Create development build for local testing
pnpm build:development

# Create production build
pnpm build:production
```

### Linting & Formatting
```bash
# Lint code
pnpm lint:mobile

# Format code
pnpm format
```

## Expo Router (Navigation)

Expo Router uses **file-based routing** similar to Next.js:

### File-to-Route Mapping
```
app/
├── _layout.tsx          → Root layout (wraps all routes)
├── index.tsx            → / (home)
├── about.tsx            → /about
├── (tabs)/              → Group (no URL segment)
│   ├── _layout.tsx      → Tab layout
│   ├── index.tsx        → /
│   ├── explore.tsx      → /explore
│   └── profile.tsx      → /profile
├── [id].tsx             → /:id (dynamic segment)
└── _deep-link.tsx       → Deep linking handler
```

### Example Layout
```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="[id]" options={{ title: 'Details' }} />
    </Stack>
  );
}
```

### Tabs Navigation
```tsx
// app/(tabs)/_layout.tsx
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: Colors.light.tabIconDefault,
          backgroundColor: Colors.light.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <ExploreIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
```

### Navigation
```tsx
import { useRouter, Link } from 'expo-router';

export default function Screen() {
  const router = useRouter();

  const goToDetails = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <View>
      {/* Programmatic navigation */}
      <Button onPress={() => goToDetails('123')} title="Go to Details" />

      {/* Link component */}
      <Link href="/about">About</Link>
    </View>
  );
}
```

## React Native Fundamentals

### Core Components
```tsx
import { View, Text, Button, TextInput, FlatList, Image, ScrollView } from 'react-native';

export default function MyComponent() {
  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 16 }}>
        {/* Text is required for text (no bare strings) */}
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Hello</Text>

        {/* Input for user input */}
        <TextInput placeholder="Enter name" />

        {/* Button for actions */}
        <Button title="Press me" onPress={() => alert('Pressed!')} />

        {/* Image */}
        <Image source={require('../assets/images/icon.png')} style={{ width: 100, height: 100 }} />

        {/* Lists */}
        <FlatList
          data={[{ id: '1', name: 'Item 1' }]}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
}
```

### StyleSheet
```tsx
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
    </View>
  );
}
```

### Flexbox Layout
React Native uses **Flexbox by default**:
```tsx
<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 1, backgroundColor: 'blue' }} />
</View>
```

## Styling with NativeWind (Tailwind)

### Tailwind CSS in React Native
```tsx
// Requires expo-tailwind-setup skill
import { View, Text } from 'react-native';

export default function Screen() {
  return (
    <View className="flex flex-1 bg-white">
      <Text className="text-2xl font-bold text-center p-4">
        Using Tailwind in React Native!
      </Text>
    </View>
  );
}
```

### Common Tailwind Patterns
```tsx
// Responsive
<View className="p-2 md:p-4 lg:p-8" />

// Colors
<Text className="text-blue-600 dark:text-blue-300" />

// Spacing
<View className="m-4 p-2 space-y-2" />

// Flexbox
<View className="flex flex-row items-center justify-between" />

// Sizing
<View className="w-full h-20" />
```

## Platform-Specific Code

### Using Platform Module
```tsx
import { Platform, View, Text } from 'react-native';

export default function Screen() {
  return (
    <View>
      {Platform.OS === 'ios' && <Text>iOS Only</Text>}
      {Platform.OS === 'android' && <Text>Android Only</Text>}
      {Platform.OS === 'web' && <Text>Web Only</Text>}
    </View>
  );
}
```

### Platform-Specific Files
Create separate files with `.ios.tsx`, `.android.tsx`, `.web.tsx` extensions:

```
hooks/
├── use-color-scheme.ts      # Default (shared)
├── use-color-scheme.ios.ts  # iOS-specific
├── use-color-scheme.android.ts
└── use-color-scheme.web.ts
```

## Data Fetching

### Using Fetch API
```tsx
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function DataScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return <Text>{JSON.stringify(data)}</Text>;
}
```

### Using useEffect Hook
```tsx
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Runs after render
    fetchData();

    return () => {
      // Cleanup
    };
  }, [dependency]); // Run when dependency changes

  const fetchData = async () => {
    // Fetch logic
  };

  return <View>{/* JSX */}</View>;
}
```

## QR Code Scanning

### Using Expo Camera for QR Codes
```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Camera permission required</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }) => {
    setScannedData(data);
    // Process QR code data
  };

  return (
    <CameraView
      style={{ flex: 1 }}
      onBarcodeScanned={handleBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
    />
  );
}
```

## Hooks and State Management

### useState
```tsx
const [count, setCount] = useState(0);

return (
  <Button title="Increment" onPress={() => setCount(count + 1)} />
);
```

### useContext for Global State
```tsx
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

Usage:
```tsx
function MyScreen() {
  const { user, setUser } = useAuth();
  // Use auth context
}
```

## Dependencies to Use (Skills)

When working on mobile code, leverage these specialized skills:

### [expo-deployment](../.agents/skills/expo-deployment/SKILL.md)
- iOS App Store submission
- Android Play Store deployment
- Signing and provisioning
- EAS Build integration

### [expo-dev-client](../.agents/skills/expo-dev-client/SKILL.md)
- Custom development clients
- Local distribution via TestFlight
- Development builds

### [building-native-ui](../.agents/skills/building-native-ui/SKILL.md)
- Expo Router and navigation
- Native UI components
- Styling patterns
- Component animations
- Native tabs implementation

### [expo-tailwind-setup](../.agents/skills/expo-tailwind-setup/SKILL.md)
- Tailwind CSS v4 in Expo
- NativeWind v5 configuration
- React Native CSS integration

### [native-data-fetching](../.agents/skills/native-data-fetching/SKILL.md)
- Fetch API and React Query
- Error handling and caching
- Offline support
- Expo Router data loaders

### [upgrading-expo](../.agents/skills/upgrading-expo/SKILL.md)
- Expo SDK updates
- Dependency upgrades
- Breaking change fixes

### [expo-api-routes](../.agents/skills/expo-api-routes/SKILL.md)
- API routes with EAS Hosting
- Serverless functions

### [expo-cicd-workflows](../.agents/skills/expo-cicd-workflows/SKILL.md)
- EAS workflow YAML configuration
- CI/CD pipeline setup
- Automated builds and deployment

## Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (`MyComponent.tsx`)
- **Screens**: PascalCase with `Screen` suffix (`HomeScreen.tsx`)
- **Hooks**: camelCase with `use` prefix (`useColorScheme.ts`)
- **Functions**: camelCase (`handlePress`, `fetchData`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_URL`)

### File Organization
```
app/
├── (tabs)/
│   ├── _layout.tsx
│   └── index.tsx
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Text.tsx
hooks/
└── use-auth.ts
```

### Formatting
- Use **TypeScript** everywhere
- 2-space indentation
- Use `const` for everything (no `var` or `let` unless needed)
- Arrow functions by default
- Strict TypeScript (`"strict": true`)

## Performance Optimization

### Memoization
```tsx
import { memo } from 'react';

const MyComponent = memo(function MyComponent({ data }) {
  return <Text>{data}</Text>;
});
```

### FlatList Optimization
```tsx
<FlatList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={item => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={20}
  updateCellsBatchingPeriod={50}
/>
```

### Image Optimization
- Use appropriate image sizes
- Cache images locally
- Lazy load images if in long lists

## Common Workflows

### Creating a New Screen
1. Create file in `app/`: `app/my-screen.tsx`
2. Import components and hooks
3. Define component with TypeScript types
4. Add navigation configuration in layout
5. Style with Tailwind or StyleSheet
6. Test on simulator/device

### Adding a Form
1. Use `useState` for form state
2. Create `TextInput` or custom input components
3. Add form validation
4. Submit to backend API
5. Handle success/error states

### Implementing QR Scanner
1. Request camera permissions
2. Use `CameraView` from expo-camera
3. Handle barcode scanned event
4. Parse and process QR data
5. Update app state or navigate

### Testing on Device
1. Build with `pnpm build:development`
2. Deploy to TestFlight (iOS) or Play Store (Android)
3. Install on physical device
4. Test all features including camera, networking, etc.

## Troubleshooting

### Metro Bundler Errors
```bash
# Clear cache
npx expo r -c

# Or restart with clear cache
pnpm start:mobile -- -c
```

### Camera Permission Issues
- Check `app.json` has camera permissions
- For iOS: `NSCameraUsageDescription` in Info.plist
- For Android: `CAMERA` permission in AndroidManifest.xml

### Build Failures
```bash
# Clean build
pnpm build:production -- --clean

# Check Expo status
npx eas diagnostics
```

### Network Request Fails
- Ensure backend is running on correct port
- Check firewall and CORS settings
- Use IP address instead of localhost in production

## Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction)
- [Tailwind CSS for React Native](https://www.nativewind.dev)

---

**Test thoroughly on both iOS and Android devices before deployment to app stores.**
