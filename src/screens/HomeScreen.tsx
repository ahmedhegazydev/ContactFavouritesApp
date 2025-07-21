import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, Switch, StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../store';
import ContactCard from '../components/ContactCard/ContactCard';
import { useContacts } from './hooks/useContacts';

/**
 * Home screen component displaying a list of contacts with an option
 * to filter by favourites.
 *
 * - Fetches contacts from the device via `useContacts` hook.
 * - Filters contacts based on Redux store favourites.
 * - Uses `FlatList` for optimized list rendering.
 *
 * @returns React component for the home screen.
 */
const HomeScreen = () => {
  const contacts = useContacts();
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  /**
   * List of favourite contacts from Redux store.
   */
  const favourites = useSelector(
    (state: RootState) => state.favourites.list,
    shallowEqual,
  );

  /**
   * Filtered list based on the toggle state.
   * If `showFavouritesOnly` is true, only favourite contacts will be shown.
   */
  const filteredContacts = useMemo(() => {
    return showFavouritesOnly
      ? contacts.filter(c => favourites.some(f => f.id === c.recordID))
      : contacts;
  }, [showFavouritesOnly, contacts, favourites]);

  /**
   * Renders each contact as a `ContactCard`.
   */
  const renderItem = useCallback(
    ({ item }) => <ContactCard contact={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text>Show Favourites Only</Text>
        <Switch
          value={showFavouritesOnly}
          onValueChange={setShowFavouritesOnly}
        />
      </View>

      {filteredContacts.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No contacts to show
        </Text>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.recordID}
          renderItem={renderItem}
          extraData={showFavouritesOnly}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
});
