// ProductListScreen.js
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RouteNames} from '../navigation/RouteNames';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {STRINGS, COLORS} from '../utils/constants';

/**
 * ProductListScreen Component
 *
 * Displays a list of products filtered by a selected tag.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 * @param {Object} props.route - Route object containing navigation parameters.
 */
const ProductListScreen = ({navigation, route}) => {
  const {tag} = route.params;
  const allItems = useSelector(state => state.home.allItems);

  // Filter products by selected tag
  const filteredProducts = allItems.filter(product =>
    product.tags.includes(tag),
  );

  // Calculate average rating for each product
  const productsWithRating = filteredProducts.map(product => {
    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    const averageRating =
      product.reviews.length > 0
        ? (totalRating / product.reviews.length).toFixed(1)
        : null;
    return {...product, rating: averageRating};
  });

  useEffect(() => {
    // Set the header title based on the selected tag
    navigation.setOptions({title: tag?.toUpperCase()});
  }, [navigation, tag]);

  /**
   * Renders each product item as a card.
   *
   * @param {Object} param0 - Destructured item object from FlatList.
   * @returns {JSX.Element} - Rendered product card.
   */
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(RouteNames.ProductDetails, {product: item})
      }
      style={styles.card}
      activeOpacity={0.8} // Provides visual feedback on press
    >
      <View style={styles.cardContent}>
        <Image source={{uri: item.thumbnail}} style={styles.cardImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        {item.rating && (
          <Text style={styles.itemRating}>
            {STRINGS.rating}: {item.rating}/5 ⭐
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productsWithRating}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{STRINGS.noProducts}</Text>
          </View>
        }
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: COLORS.containerBackground,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  card: {
    flex: 1,
    margin: scale(5),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.cardBackground,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: verticalScale(4)},
    shadowRadius: moderateScale(5),
    elevation: 3, // For Android shadow
    height: verticalScale(250), // Ensure all cards have equal height
  },
  cardContent: {
    alignItems: 'center',
    padding: moderateScale(15),
  },
  cardImage: {
    width: '100%',
    height: verticalScale(120),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    resizeMode: 'cover',
    marginBottom: verticalScale(10),
  },
  itemName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  itemPrice: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  itemRating: {
    fontSize: moderateScale(14),
    color: COLORS.priceColor,
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(50),
  },
  emptyText: {
    fontSize: moderateScale(18),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
