// components/MyCarousel.js
import React, {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import PaginationDot from './PaginationDot';
import Carousel from 'react-native-reanimated-carousel';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RouteNames} from '../navigation/RouteNames';
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS} from '../utils/constants';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const MyCarousel = ({type, navigation}) => {
  const allItems = useSelector(state => state.home.allItems);

  const filteredProducts = useMemo(() => {
    if (!type) {
      return allItems.slice(0, 10);
    } // Handle undefined type

    return allItems.filter(product => product.tags.includes(type)).slice(0, 10);
  }, [allItems, type]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onProgressChange = (_, absoluteProgress) => {
    if (Math.round(absoluteProgress) === filteredProducts.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(Math.round(absoluteProgress));
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop={true}
        data={filteredProducts}
        width={SCREEN_WIDTH}
        style={styles.carouselStyle}
        mode="parallax"
        height={verticalScale(200)}
        scrollAnimationDuration={500}
        pagingEnabled={true}
        snapEnabled={true}
        enabled={filteredProducts.length > 1}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={onProgressChange}
        autoPlayInterval={2000}
        panGestureHandlerProps={{activeOffsetX: [-10, 10]}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(RouteNames.ProductDetails, {product: item})
            }
            activeOpacity={0.8}>
            <View style={styles.overlay}>
              <Text style={styles.productName}>{item?.name}</Text>
            </View>
            <Image source={{uri: item?.thumbnail}} style={styles.image} />
          </TouchableOpacity>
        )}
      />

      {/* <PaginationDot contents={filteredProducts} currentIndex={currentIndex} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: verticalScale(200),
    backgroundColor: COLORS.white,
  },
  carouselStyle: {
    width: SCREEN_WIDTH,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
  },
  overlay: {
    position: 'absolute',
    bottom: moderateScale(10),
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: COLORS.overlayBackground,
    paddingVertical: verticalScale(5),
  },
  productName: {
    textAlign: 'center',
    fontSize: moderateScale(18),
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default MyCarousel;
