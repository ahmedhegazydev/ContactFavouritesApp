import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favourite } from '../types/Favourite';

/**
 * Interface representing the state shape for the favourites slice.
 *
 * @property list - Array of favourite contacts.
 */
interface FavouritesState {
  list: Favourite[];
}

/**
 * Initial state for the favourites slice.
 */
const initialState: FavouritesState = {
  list: [],
};

/**
 * Redux slice to manage user's favourite contacts.
 *
 * Contains reducers to add and remove favourites.
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    /**
     * Adds a new contact to the favourites list.
     *
     * @param state - Current state of the slice.
     * @param action - Payload containing the Favourite object to be added.
     */
    addFavourite: (state, action: PayloadAction<Favourite>) => {
      state.list.push(action.payload);
    },

    /**
     * Removes a contact from the favourites list by ID.
     *
     * @param state - Current state of the slice.
     * @param action - Payload containing the contact ID to remove.
     */
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(f => f.id !== action.payload);
    },
  },
});

// Export actions for use in components or thunks
export const { addFavourite, removeFavourite } = favouritesSlice.actions;

// Export reducer to be included in the Redux store
export default favouritesSlice.reducer;
