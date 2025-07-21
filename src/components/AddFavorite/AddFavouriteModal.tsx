/**
 * AddFavouriteModal Component
 *
 * This modal allows the user to add a contact to their favourites list with a message.
 * - Validates input using Yup + Formik
 * - Fetches gender using an external API
 * - Dispatches the new favourite contact to Redux store
 * - Shows a toast message upon success or failure
 *
 * @component
 * @example
 * <AddFavouriteModal
 *   visible={true}
 *   onClose={() => setModalVisible(false)}
 *   contact={selectedContact}
 * />
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addFavourite } from '../../redux/favouritesSlice';
import { Contact } from '../../types/Contact';
import Toast from 'react-native-toast-message';
import { useGenderFetch } from './useGenderFetch';

/**
 * Props for AddFavouriteModal
 * @typedef {Object} Props
 * @property {boolean} visible - Whether the modal is visible
 * @property {() => void} onClose - Function to close the modal
 * @property {Contact} contact - The contact being added to favourites
 */
interface Props {
  visible: boolean;
  onClose: () => void;
  contact: Contact;
}

// Form validation schema using Yup
const schema = Yup.object().shape({
  message: Yup.string()
    .required('Message is required')
    .max(200, 'Max 200 characters')
    .matches(/^[a-zA-Z0-9 ]*$/, 'No special characters'),
});

/**
 * AddFavouriteModal functional component
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */
const AddFavouriteModal = ({
  visible,
  onClose,
  contact,
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { fetchGender } = useGenderFetch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form submission
   * - Fetches gender
   * - Dispatches to Redux
   * - Shows toast
   *
   * @param {{ message: string }} values - Form values
   */
  const handleSubmit = async (values: { message: string }) => {
    setIsSubmitting(true);
    try {
      const gender = await fetchGender(contact.givenName);
      dispatch(
        addFavourite({
          id: contact.recordID,
          name: `${contact.givenName} ${contact.familyName}`,
          message: values.message,
          gender,
        }),
      );
      Toast.show({
        type: 'success',
        text1: 'Added to favourites!',
      });
      onClose();
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to fetch gender data',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add to Favourite</Text>
          <Formik
            initialValues={{ message: '' }}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  placeholder="Enter message"
                  style={styles.input}
                  onChangeText={handleChange('message')}
                  onBlur={handleBlur('message')}
                  value={values.message}
                />
                {touched.message && errors.message && (
                  <Text style={styles.error}>{errors.message}</Text>
                )}
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Button title="Submit" onPress={() => handleSubmit()} />
                )}
                <Button title="Cancel" onPress={onClose} color="gray" />
              </>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default AddFavouriteModal;

/**
 * Styles for the modal UI
 */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  error: { color: 'red', fontSize: 12 },
});
