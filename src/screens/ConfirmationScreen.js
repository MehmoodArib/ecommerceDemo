// ConfirmationScreen.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {STRINGS, COLORS} from '../utils/constants';

/**
 * ConfirmationScreen Component
 *
 * Displays a confirmation message after an order is placed and provides a button to return to the home screen.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const ConfirmationScreen = ({navigation}) => {
  /**
   * Handles navigation back to the Home screen.
   */
  const handleReturnHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.confirmationText}>{STRINGS.confirmationMessage}</Text>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={handleReturnHome}
        activeOpacity={0.8} // Provides visual feedback on press
      >
        <Text style={styles.homeButtonText}>{STRINGS.returnToHome}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    backgroundColor: COLORS.containerBackground,
  },
  confirmationText: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(30),
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: COLORS.shopButtonBackground,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(25),
    borderRadius: moderateScale(8),
    elevation: 3, // For Android shadow
    shadowColor: COLORS.shadowColor, // For iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(5),
  },
  homeButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});
