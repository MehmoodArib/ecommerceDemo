// components/CartItem.js
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';

const CartItem = ({item}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: item.image}} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <View style={styles.itemInfo}>
        <Text style={styles.itemQuantity}>
          {STRINGS.qtyLabel} {item.quantity}
        </Text>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginBottom: verticalScale(15),
    alignItems: 'center',
    elevation: 2, // For Android shadow
    shadowColor: COLORS.shadow, // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
  },
  itemImage: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(10),
    marginRight: scale(15),
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(5),
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemQuantity: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  itemPrice: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.price,
  },
});

export default CartItem;
