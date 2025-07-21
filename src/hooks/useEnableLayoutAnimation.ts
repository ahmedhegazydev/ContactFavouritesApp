import { useEffect } from 'react';
import { Platform, UIManager, LayoutAnimation } from 'react-native';

/**
 * Custom hook to enable layout animation support on Android.
 *
 * This hook is necessary because by default, `LayoutAnimation` is not enabled
 * on Android unless explicitly done so using `UIManager.setLayoutAnimationEnabledExperimental(true)`.
 * 
 * It should be used once, preferably in the root component of your app (e.g., `App.tsx`).
 *
 * On iOS, this hook does nothing since layout animations are supported by default.
 *
 * @example
 * // Usage in App.tsx
 * useEnableLayoutAnimation();
 */
export const useEnableLayoutAnimation = () => {
  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
};
