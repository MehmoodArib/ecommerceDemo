// EmptyCartScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';

/**
 * EmptyCartScreen Component
 *
 * Displays a message indicating that the cart is empty along with an icon.
 */
const EmptyCartScreen = () => {
  return (
    <View style={styles.container}>
      {/* Cart Icon */}
      <Icon
        name="cart-outline"
        size={scale(100)}
        color={COLORS.iconColor}
        style={styles.icon}
      />

      {/* Message */}
      <Text style={styles.messagePrimary}>{STRINGS.cartEmpty}</Text>

      {/* Submessage */}
      <Text style={styles.messageSecondary}>{STRINGS.addItems}</Text>
    </View>
  );
};

export default EmptyCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fullscreen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: COLORS.containerBackground,
    paddingHorizontal: moderateScale(20),
  },
  icon: {
    marginBottom: verticalScale(20), // Spacing between icon and message
  },
  messagePrimary: {
    fontSize: moderateScale(24), // Larger font for the main message
    fontWeight: 'bold',
    color: COLORS.messagePrimary, // Darker color for the message
    marginBottom: verticalScale(10), // Spacing between main message and sub-message
    textAlign: 'center',
  },
  messageSecondary: {
    fontSize: moderateScale(16),
    color: COLORS.messageSecondary, // Lighter gray for the sub-message
    textAlign: 'center', // Center the text horizontally
    paddingHorizontal: scale(40), // Padding to make the text not touch the edges
  },
});
