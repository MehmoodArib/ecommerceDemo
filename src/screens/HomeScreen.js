// HomeScreen.js
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import TagSelectionScreen from './TagSelectionScreen';
import MyCarousel from '../components/Carousel';
import {getUniqueTags} from '../utils/commonMethods';
import {COLORS} from '../utils/constants';
import {fetchProducts} from '../services/Home/action';

/**
 * HomeScreen Component
 *
 * Displays the carousel and tag selection screen based on the available items.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object to navigate between screens.
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const allItems = useSelector(state => state.home.allItems);
  const dispatch = useDispatch();
  const tags = getUniqueTags(allItems);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MyCarousel type="stylish" navigation={navigation} />
      <View style={styles.tagContainer}>
        <TagSelectionScreen navigation={navigation} tags={tags} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tagContainer: {
    flex: 1,
    padding: moderateScale(10),
  },
});
