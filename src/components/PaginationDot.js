/* eslint-disable react-hooks/rules-of-hooks */
import React, {memo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {COLORS} from '../utils/constants';

/**
 * Renders animated pagination dots.
 *
 * Displays a series of dots that animate in size and color based on the `currentIndex` prop,
 * indicating the currently active page or section. Active dot expands and changes color,
 * while inactive dots remain smaller and have a different color.
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.contents - Array of content objects; each object must have a unique `contentId`.
 * @param {number} props.currentIndex - Index of the currently active dot.
 */
const PaginationDot = ({contents, currentIndex}) => {
  // Initialize shared values for all dots
  const widthValues = contents.map(() => useSharedValue(scale(5))); // DOT_WIDTH = 5 scaled
  const backgroundColorValues = contents.map(() =>
    useSharedValue(COLORS.animationDot),
  ); // Initial color 'red'

  // Effect to update animations based on currentIndex
  useEffect(() => {
    contents.forEach((_, index) => {
      widthValues[index].value = withSpring(
        index === currentIndex ? scale(10) : scale(5), // EXP_DOT_WIDTH = 10 scaled
        {
          damping: 2,
          stiffness: 100,
          overshootClamping: true,
        },
      );
      backgroundColorValues[index].value = withSpring(
        index === currentIndex ? COLORS.shopButtonBackground : COLORS.inactiveDot,
        {
          damping: 2,
          stiffness: 100,
          overshootClamping: true,
        },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, contents]);

  return (
    <View style={styles.pagination}>
      {contents.map((item, index) => {
        const animatedStyle = useAnimatedStyle(() => ({
          width: widthValues[index].value,
          backgroundColor: backgroundColorValues[index].value,
        }));

        return (
          <Animated.View
            key={item?.id.toString()}
            style={[styles.dot, animatedStyle]}
          />
        );
      })}
    </View>
  );
};

export default memo(PaginationDot);

const styles = StyleSheet.create({
  // PaginationDot Component Styles
  pagination: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: verticalScale(0),
    marginLeft: 0,
    alignSelf: 'center',
  },
  dot: {
    borderRadius: moderateScale(2),
    height: moderateScale(4),
    marginRight: moderateScale(5),
  },
});
