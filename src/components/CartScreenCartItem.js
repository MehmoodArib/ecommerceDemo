// components/CartItem.js
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';

const CartScreenCartItem = ({item, onRemove, onIncrement, onDecrement}) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>{STRINGS.quantityLabel}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={onDecrement}>
              <Icon
                name="remove-circle-outline"
                size={moderateScale(24)}
                color={COLORS.decrement}
              />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={onIncrement}>
              <Icon
                name="add-circle-outline"
                size={moderateScale(24)}
                color={COLORS.increment}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Icon
          name="trash-outline"
          size={moderateScale(24)}
          color={COLORS.removeButton}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    padding: moderateScale(15),
    marginVertical: verticalScale(8),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    elevation: 2, // For Android shadow
    shadowColor: COLORS.shadow, // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
  },
  image: {
    width: scale(80),
    height: verticalScale(80),
    borderRadius: moderateScale(10),
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: moderateScale(15),
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.price,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  quantityLabel: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  quantity: {
    marginHorizontal: moderateScale(10),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  removeButton: {
    padding: moderateScale(5),
  },
});

export default CartScreenCartItem;
