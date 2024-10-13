// components/HeaderIcons.js
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {RouteNames} from '../navigation/RouteNames';
import {COLORS} from '../utils/constants';

const HeaderIcons = ({navigation}) => {
  // Get cart item count from the Redux store
  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate(RouteNames.Search)}
        activeOpacity={0.7}>
        <Icon name="search-outline" size={scale(25)} color={COLORS.iconColor} />
      </TouchableOpacity>

      {/* Cart Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate(RouteNames.Cart)}
        activeOpacity={0.7}>
        <Icon name="cart-outline" size={scale(25)} color={COLORS.cartIcon} />
        {itemCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HeaderIcons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: scale(10),
  },
  iconButton: {
    marginLeft: scale(15),
  },
  badgeContainer: {
    position: 'absolute',
    right: -scale(8),
    top: -verticalScale(5),
    backgroundColor: COLORS.badgeBackground,
    borderRadius: moderateScale(9),
    width: scale(18),
    height: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.badgeText,
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
});
