import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Contact } from '../../types/Contact';
import { removeFavourite } from '../../redux/favouritesSlice';

/**
 * Custom hook to manage the favourite status of a contact.
 *
 * This hook provides:
 * - Whether the contact is marked as favourite (`isFavourite`)
 * - The favourite data (like message, gender) if available (`favData`)
 * - A function to toggle (remove) the contact from favourites
 *
 * @param {Contact} contact - The contact object to evaluate and manage
 * @returns {{
 *   isFavourite: boolean,
 *   favData: { id: string, name: string, message: string, gender?: string } | undefined,
 *   toggleFavourite: () => void
 * }} An object containing:
 *   - isFavourite: whether the contact is marked as favourite
 *   - favData: the favourite entry (if exists)
 *   - toggleFavourite: function to remove the contact from favourites
 *
 * @example
 * const { isFavourite, favData, toggleFavourite } = useFavourite(contact);
 */
export const useFavourite = (contact: Contact) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favourites.list);

  const isFavourite = favourites.some(f => f.id === contact.recordID);
  const favData = favourites.find(f => f.id === contact.recordID);

  /**
   * Removes the contact from favourites if it's already marked as favourite.
   */
  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(contact.recordID));
    }
  };

  return {
    isFavourite,
    favData,
    toggleFavourite,
  };
};
