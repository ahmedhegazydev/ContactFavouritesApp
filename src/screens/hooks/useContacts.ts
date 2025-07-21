import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';
import { Contact } from '../../types/Contact';

/**
 * Custom hook to fetch device contacts using `react-native-contacts`.
 *
 * - Requests permission to access contacts.
 * - If granted, retrieves all available contacts.
 * - Logs debug info in development mode.
 *
 * @returns An array of `Contact` objects from the device.
 */
export const useContacts = (): Contact[] => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (__DEV__) console.log('Requesting contacts permission...');
      const granted = await requestContactsPermission();

      if (!granted) {
        if (__DEV__) console.warn('Permission to access contacts was denied');
        return;
      }

      if (__DEV__) console.log('Permission granted. Fetching contacts...');
      try {
        const allContacts = await Contacts.getAll();
        if (__DEV__) {
          console.log(`Fetched ${allContacts.length} contacts`);
          console.log('Sample contacts:', allContacts.slice(0, 3));
        }
        setContacts(allContacts);
      } catch (error) {
        if (__DEV__) console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return contacts;
};

/**
 * Requests contact read permission from the user (Android only).
 *
 * For iOS, assumes permission is already granted via Info.plist settings.
 *
 * @returns `true` if permission is granted, `false` otherwise.
 */
const requestContactsPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    );
    const granted = permission === PermissionsAndroid.RESULTS.GRANTED;
    if (__DEV__) console.log('Android permission status:', granted);
    return granted;
  }

  if (__DEV__) console.log('iOS assumed permission granted (check Info.plist)');
  return true;
};
