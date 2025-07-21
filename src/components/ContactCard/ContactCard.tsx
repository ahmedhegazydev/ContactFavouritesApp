/**
 * ContactCard Component
 *
 * Displays a single contact item with:
 * - Avatar based on initials
 * - Name
 * - Favourite status (with star icon)
 * - Favourite message with expandable text (with animation)
 *
 * Allows user to:
 * - Add contact to favourites (opens modal with message input)
 * - Remove from favourites
 *
 * Uses LayoutAnimation to animate expansion of the message.
 *
 * @component
 * @example
 * <ContactCard contact={contactObject} />
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AddFavouriteModal from '../AddFavorite/AddFavouriteModal';
import { Contact } from '../../types/Contact';
import { useFavourite } from './useFavourite';
import { useEnableLayoutAnimation } from '../../hooks/useEnableLayoutAnimation';

/**
 * Props for ContactCard
 * @typedef {Object} Props
 * @property {Contact} contact - The contact object to render
 */
interface Props {
  contact: Contact;
}

/**
 * ContactCard functional component
 *
 * @param {Props} props - The props object
 * @returns {JSX.Element} React component to render contact information
 */
const ContactCard = ({ contact }: Props): JSX.Element => {
  useEnableLayoutAnimation();

  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textLines, setTextLines] = useState(0);

  const { isFavourite, favData, toggleFavourite } = useFavourite(contact);

  const name = `${contact.givenName ?? ''} ${contact.familyName ?? ''}`.trim();
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  /**
   * Handles toggling expanded state with animation
   */
  const handleToggleExpand = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });
    setExpanded(prev => !prev);
  };

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>

        {isFavourite && favData?.message && (
          <>
            {/* Hidden measurement text to detect number of lines */}
            {textLines === 0 && (
              <Text
                style={[
                  styles.message,
                  { position: 'absolute', opacity: 0, zIndex: -1 },
                ]}
                onTextLayout={e => {
                  const lines = e.nativeEvent.lines.length;
                  if (lines !== textLines) setTextLines(lines);
                }}
              >
                {favData.message}
              </Text>
            )}

            <View style={{ overflow: 'hidden' }}>
              <Text
                style={styles.message}
                numberOfLines={expanded ? undefined : 2}
                ellipsizeMode="tail"
              >
                {favData.message}
              </Text>
            </View>

            {textLines > 2 && (
              <TouchableOpacity onPress={handleToggleExpand}>
                <Text style={styles.showMore}>
                  {expanded ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          if (isFavourite) {
            toggleFavourite();
          } else {
            setModalVisible(true);
          }
        }}
      >
        <Text style={[styles.star, isFavourite && styles.starFilled]}>
          {isFavourite ? '★' : '☆'}
        </Text>
      </TouchableOpacity>

      <AddFavouriteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        contact={contact}
      />
    </View>
  );
};

export default ContactCard;

/**
 * Styles for ContactCard component
 */
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  avatar: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { fontWeight: 'bold', fontSize: 16 },
  name: { fontWeight: 'bold', fontSize: 16 },
  message: { marginTop: 4 },
  showMore: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  star: { fontSize: 24, paddingHorizontal: 8 },
  starFilled: { color: 'gold' },
});
