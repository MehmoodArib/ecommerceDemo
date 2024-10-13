// components/CartReviewScreen.js
import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import CartItem from '../components/CartItem';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';

/**
 * Renders each cart item using the CartItem component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.item - Cart item data.
 */
const renderItem = ({item}) => <CartItem item={item} />;

/**
 * CartReviewScreen Component
 *
 * Displays the cart items along with the order summary and handles order placement.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const CartReviewScreen = ({navigation}) => {
  const cartItems = useSelector(state => state.cart.items);

  // Price Calculations
  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems],
  );
  const taxRate = 0.1; // 10% Tax
  const tax = subtotal * taxRate;
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
  const total = subtotal + tax + shipping;

  /**
   * Handles the order placement process.
   * Navigates to the Confirmation screen if the cart is not empty.
   */
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      Alert.alert(STRINGS.emptyCartMessage, 'Please add items to your cart.');
      return;
    }
    navigation.navigate('Confirmation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{STRINGS.orderSummary}</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>{STRINGS.emptyCartMessage}</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate(STRINGS.shop)}>
            <Text style={styles.shopButtonText}>{STRINGS.goShopping}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
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
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handlePlaceOrder}>
            <Text style={styles.orderButtonText}>{STRINGS.placeOrder}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CartReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: COLORS.containerBackground,
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(20),
    color: COLORS.textPrimary,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    marginBottom: verticalScale(20),
    elevation: 2, // For Android shadow
    shadowColor: COLORS.shadowColor, // For iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
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
  orderButton: {
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  orderButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: moderateScale(18),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(20),
  },
  shopButton: {
    backgroundColor: COLORS.shopButtonBackground,
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(25),
    borderRadius: moderateScale(8),
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
  },
});
