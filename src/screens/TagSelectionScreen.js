// TagSelectionScreen.js
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS, STRINGS} from '../utils/constants';
import {RouteNames} from '../navigation/RouteNames';

/**
 * TagSelectionScreen Component
 *
 * Displays a list of tags that users can select to filter products.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const TagSelectionScreen = () => {
  const navigation = useNavigation();
  const tags = useSelector(state => state.home.allTags);

  /**
   * Renders each tag as a button with an image and label.
   *
   * @param {Object} param0 - Destructured item object from FlatList.
   * @returns {JSX.Element} - Rendered tag button.
   */
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.tagButton}
      onPress={() =>
        navigation.navigate(RouteNames.ProductListScreen, {tag: item.tag})
      }
      activeOpacity={0.8} // Provides visual feedback on press
    >
      <View style={styles.tagContent}>
        {item.image_url ? (
          <Image source={{uri: item.image_url}} style={styles.tagImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.tagText}>{item.tag.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tags}
        keyExtractor={item => item.tag}
        renderItem={renderItem}
        numColumns={2} // Display tags in two columns
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{STRINGS.noTags}</Text>
          </View>
        }
      />
    </View>
  );
};

export default TagSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: COLORS.containerBackground,
  },
  listContainer: {
    paddingBottom: verticalScale(20),
  },
  tagButton: {
    flex: 1,
    margin: scale(10),
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    backgroundColor: COLORS.cardBackground,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: verticalScale(2)},
    shadowRadius: moderateScale(5),
    elevation: 3, // For Android shadow
  },
  tagContent: {
    alignItems: 'center',
    padding: moderateScale(15),
  },
  tagImage: {
    width: scale(80),
    height: verticalScale(80),
    marginBottom: verticalScale(10),
    resizeMode: 'contain',
  },
  placeholderImage: {
    width: scale(80),
    height: verticalScale(80),
    marginBottom: verticalScale(10),
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(40),
  },
  placeholderText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
  tagText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
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
