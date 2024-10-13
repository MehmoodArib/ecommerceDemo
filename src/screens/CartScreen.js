// CartScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import EmptyCartScreen from './EmptyCartScreen';
import {
  removeFromCart,
  addToCart,
  decrementQuantity,
} from '../services/Cart/action';
import CartScreenCartItem from '../components/CartScreenCartItem';
import {STRINGS, COLORS} from '../utils/constants';
/**
 * CartScreen Component
 *
 * Displays the cart items along with the order summary and handles checkout.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const CartScreen = ({navigation}) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Renders each cart item using the CartItem component.
   *
   * @param {Object} props - Component props.
   * @param {Object} props.item - Cart item data.
   */
  const renderItem = ({item, index}) => (
    <CartScreenCartItem
      item={item}
      onRemove={() => dispatch(removeFromCart(item.id))}
      onIncrement={() => dispatch(addToCart(item))}
      onDecrement={() => dispatch(decrementQuantity(item.id))}
    />
  );

  // Price Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const taxRate = 0.1; // 10% Tax
  const tax = subtotal * taxRate;
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
  const total = subtotal + tax + shipping;

  /**
   * Handles the checkout process.
   * Navigates to the CartReview screen if the cart is not empty.
   */
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(STRINGS.yourCartEmpty, STRINGS.pleaseAddItems);
      return;
    }
    navigation.navigate('CartReview');
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
          {/* Price Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>{STRINGS.subtotal}</Text>
              <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>{STRINGS.tax}</Text>
              <Text style={styles.summaryText}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>{STRINGS.shipping}</Text>
              <Text style={styles.summaryText}>
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, styles.totalText]}>
                {STRINGS.total}
              </Text>
              <Text style={[styles.summaryText, styles.totalText]}>
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
          {/* Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
            activeOpacity={0.8} // Provides visual feedback on press
          >
            <Text style={styles.checkoutButtonText}>{STRINGS.checkout}</Text>
            <Icon
              name="arrow-forward"
              size={scale(20)}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </>
      ) : (
        <EmptyCartScreen />
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: COLORS.containerBackground,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  summaryContainer: {
    backgroundColor: COLORS.cardBackground,
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    elevation: 2, // For Android shadow
    shadowColor: COLORS.shadowColor, // For iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    marginBottom: verticalScale(15),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  summaryText: {
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
  },
  totalText: {
    fontWeight: '700',
    fontSize: moderateScale(18),
  },
  checkoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // For Android shadow
    shadowColor: COLORS.buttonBackground, // For iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(5),
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginRight: scale(10),
  },
});
