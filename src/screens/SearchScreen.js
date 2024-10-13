// SearchScreen.js
import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';
import {RouteNames} from '../navigation/RouteNames';

/**
 * SearchScreen Component
 *
 * Allows users to search for products by name. Displays filtered results dynamically
 * as the user types their query.
 *
 * @returns {JSX.Element} - Rendered SearchScreen component.
 */
const SearchScreen = () => {
  const navigation = useNavigation();
  const allItems = useSelector(state => state.home.allItems); // Fetching all products from Redux store
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filters products based on the search query.
   * Uses useMemo for performance optimization to avoid unnecessary recalculations.
   */
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    return allItems.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, allItems]);

  /**
   * Renders each product item in the FlatList.
   *
   * @param {Object} param0 - Destructured item object from FlatList.
   * @returns {JSX.Element} - Rendered product card.
   */
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate(RouteNames.ProductDetails, {product: item})
      }
      activeOpacity={0.8} // Provides visual feedback on press
    >
      <Image source={{uri: item.thumbnail}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      {item.rating && (
        <Text style={styles.productRating}>
          {STRINGS.rating}: {item.rating}/5 ⭐
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder={STRINGS.searchPlaceholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing" // Adds a clear (X) button while editing
        returnKeyType="search" // Changes the return key to "Search"
      />

      {/* Search Results */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // Display products in two columns
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          searchQuery ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{STRINGS.noResults}</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: COLORS.containerBackground,
  },
  searchBar: {
    height: verticalScale(50),
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: moderateScale(25),
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
    backgroundColor: COLORS.white,
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  productCard: {
    flex: 1,
    margin: scale(5),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.cardBackground,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowRadius: moderateScale(5),
    elevation: 3, // For Android shadow
    padding: moderateScale(10),
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: moderateScale(10),
    resizeMode: 'cover',
    marginBottom: verticalScale(10),
  },
  productName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  productPrice: {
    fontSize: moderateScale(14),
    color: COLORS.priceColor,
    textAlign: 'center',
  },
  productRating: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: verticalScale(50),
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
