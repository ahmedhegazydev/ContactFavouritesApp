/**
 * useGenderFetch Hook
 *
 * Custom React hook to fetch gender information from the Genderize API.
 * - Tracks loading state
 * - Returns gender as 'male', 'female', or 'unknown'
 *
 * @example
 * const { fetchGender, loading } = useGenderFetch();
 * const gender = await fetchGender('John');
 *
 * @returns {{
 *   fetchGender: (name: string) => Promise<string>,
 *   loading: boolean
 * }}
 */

import { useState } from 'react';
import axios from 'axios';

export const useGenderFetch = () => {
  const [loading, setLoading] = useState(false);

  /**
   * Fetch gender for a given name using Genderize API.
   *
   * @async
   * @function
   * @param {string} name - The first name to predict gender for
   * @returns {Promise<string>} The predicted gender: 'male', 'female', or 'unknown'
   * @throws {Error} If the API request fails
   */
  const fetchGender = async (name: string): Promise<string> => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.genderize.io/?name=${name}`);
      return res.data.gender ?? 'unknown';
    } catch (error) {
      throw new Error('Failed to fetch gender');
    } finally {
      setLoading(false);
    }
  };

  return { fetchGender, loading };
};
