// App.js
import React from 'react';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CartReviewScreen from '../screens/CartReviewScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductListScreen from '../screens/ProductListScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {RouteNames} from './RouteNames';
import {COLORS} from '../utils/constants';
import HeaderIcons from './HeaderIcons';

const Stack = createStackNavigator();

/**
 * CartIcon Component
 *
 * Displays a cart icon with a badge showing the number of items in the cart.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const CartIcon = ({navigation}) => {
  // Get cart item count from the Redux store
  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(RouteNames.Cart)}>
      <View style={styles.cartIconContainer}>
        <Icon name="cart-outline" size={scale(30)} color={COLORS.cartIcon} />
        {itemCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{itemCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

/**
 * MainNavigator Component
 *
 * Sets up the main navigation stack for the application.
 */
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteNames.Home}
        screenOptions={({navigation}) => ({
          headerRight: () => <HeaderIcons navigation={navigation} />,
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        })}>
        <Stack.Screen name={RouteNames.Home} component={HomeScreen} />
        <Stack.Screen name={RouteNames.Search} component={SearchScreen} />
        <Stack.Screen
          name={RouteNames.ProductDetails}
          component={ProductDetailsScreen}
        />
        <Stack.Screen name={RouteNames.Cart} component={CartScreen} />
        <Stack.Screen
          name={RouteNames.CartReview}
          component={CartReviewScreen}
        />
        <Stack.Screen
          name={RouteNames.Confirmation}
          component={ConfirmationScreen}
        />
        <Stack.Screen
          name={RouteNames.ProductListScreen}
          component={ProductListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  // Header Styles
  headerStyle: {
    backgroundColor: '#fff',
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 3, // For Android shadow
  },
  headerTitleStyle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },

  // CartIcon Styles
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    right: -scale(10),
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
