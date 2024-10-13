// ProductDetailsScreen.js
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../services/Cart/action';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';

/**
 * ProductDetailsScreen Component
 *
 * Displays detailed information about a selected product, including images, pricing, ratings, specifications, and reviews.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.route - Route object containing navigation parameters.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const ProductDetailsScreen = ({route, navigation}) => {
  const {product} = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the header title based on the selected product's name
    navigation.setOptions({title: product.name});
  }, [navigation, product]);

  /**
   * Calculates the average rating from the product's reviews.
   *
   * @param {Array} reviews - Array of review objects.
   * @returns {string} - Average rating rounded to one decimal place.
   */
  const calculateAverageRating = reviews => {
    if (reviews.length === 0) return '0.0';
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Return one decimal place
  };

  const averageRating = calculateAverageRating(product.reviews);

  /**
   * Handles adding the product to the cart.
   */
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    // Optionally, navigate to the cart or show a confirmation
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image source={{uri: product.thumbnail}} style={styles.image} />

        {/* Product Name */}
        <Text style={styles.name}>{product.name}</Text>

        {/* Product Price */}
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        {/* Average Rating Display */}
        <View style={styles.ratingContainer}>
          <Text style={styles.averageRating}>{averageRating} ⭐</Text>
          <Text style={styles.ratingCount}>
            {product.reviews.length}{' '}
            {product.reviews.length !== 1 ? 'reviews' : 'review'}
          </Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddToCart}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{STRINGS.addToCart}</Text>
        </TouchableOpacity>

        {/* Product Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Product Specifications */}
        <View style={styles.specificationsContainer}>
          <Text style={styles.sectionTitle}>{STRINGS.specifications}</Text>
          <Text style={styles.specificationItem}>
            {STRINGS.buttons}: {product.specifications.buttons}
          </Text>
          <Text style={styles.specificationItem}>
            {STRINGS.dpi}: {product.specifications.dpi}
          </Text>
          <Text style={styles.specificationItem}>
            {STRINGS.lighting}: {product.specifications.lighting}
          </Text>
          <Text style={styles.specificationItem}>
            {STRINGS.weight}: {product.specifications.weight}
          </Text>
        </View>

        {/* Product Reviews */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>{STRINGS.reviews}</Text>
          {product.reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <Text style={styles.reviewer}>{review.reviewer}</Text>
              <Text style={styles.reviewText}>{review.comment}</Text>
              <Text style={styles.reviewRating}>
                {STRINGS.rating}: {review.rating} ⭐
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: COLORS.containerBackground,
  },
  image: {
    height: verticalScale(300),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    shadowColor: COLORS.shadowColor,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(3),
    elevation: 5, // For Android shadow
  },
  name: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  price: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.priceColor,
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  averageRating: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: COLORS.priceColor, // Gold color for rating
  },
  ratingCount: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
  },
  button: {
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    marginBottom: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3, // For Android shadow
    shadowColor: COLORS.shadowColor, // For iOS shadow
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(5),
  },
  buttonText: {
    color: COLORS.white,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(20),
    textAlign: 'justify',
  },
  specificationsContainer: {
    marginBottom: verticalScale(20),
    padding: moderateScale(10),
    backgroundColor: COLORS.cardBackground,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.shadowColor,
    shadowOffset: {width: 0, height: verticalScale(1)},
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(2),
    elevation: 2, // For Android shadow
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(10),
  },
  specificationItem: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(5),
  },
  reviewsContainer: {
    padding: moderateScale(10),
    backgroundColor: COLORS.cardBackground,
    borderRadius: moderateScale(10),
    shadowColor: COLORS.shadowColor,
    shadowOffset: {width: 0, height: verticalScale(1)},
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(2),
    elevation: 2, // For Android shadow
  },
  reviewItem: {
    marginBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textSecondary,
    paddingBottom: verticalScale(10),
  },
  reviewer: {
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(5),
  },
  reviewText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(5),
  },
  reviewRating: {
    fontSize: moderateScale(14),
    color: COLORS.priceColor,
  },
});
