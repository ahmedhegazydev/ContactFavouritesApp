/**
 * Root App Component for the React Native project.
 *
 * - Configures appearance settings.
 * - Provides Redux store to the entire app.
 * - Wraps app in SafeAreaProvider for proper layout.
 * - Enables LayoutAnimation for Android.
 *
 * @format
 * @author
 * @license MIT
 * @see https://github.com/facebook/react-native
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Appearance,
  Platform,
  StatusBar,
  StyleSheet,
  UIManager,
  useColorScheme,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { store } from './src/store';
import { Provider } from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useEnableLayoutAnimation } from './src/hooks/useEnableLayoutAnimation';

/**
 * Main application component.
 * Sets up the appearance, layout animations, Redux provider, and safe area context.
 *
 * @returns {JSX.Element} The root component of the app.
 */
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  // Enable layout animations for Android
  useEnableLayoutAnimation();

  // Force light theme on app load
  useEffect(() => {
    Appearance.setColorScheme?.('light');
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <HomeScreen />
          <Toast />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
