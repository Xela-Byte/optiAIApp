import {Dimensions} from 'react-native';

export const appColors = {
  green: '#07A53D',
  black: '#1E1E1E',
  white: '#FFFFFF',
  gray: '#D9D9D9',
  lightGreen: '#B4F9D2',
  gold: '#FFD700',
};

import {StyleSheet} from 'react-native';
import {sizes} from '../utils/responsiveness/sizeBlock';

// export const screenWidth = 280;
export const screenWidth = Dimensions.get('screen').width;
// export const screenHeight = 605;
export const screenHeight = Dimensions.get('screen').height;
export const sizeBlock = new sizes(screenHeight, screenWidth);

export const fontSize = {
  primary: screenWidth < 300 ? sizeBlock.fontSize(11) : sizeBlock.fontSize(14),
  small: screenWidth < 300 ? sizeBlock.fontSize(13) : sizeBlock.fontSize(16),
  medium: screenWidth < 300 ? sizeBlock.fontSize(18) : sizeBlock.fontSize(25),
  large: screenWidth < 300 ? sizeBlock.fontSize(40) : sizeBlock.fontSize(50),
};

export const fontFamily = {
  light: 'ClashGrotesk-Light',
  regular: 'ClashGrotesk-Regular',
  medium: 'ClashGrotesk-Medium',
  semiBold: 'ClashGrotesk-Semibold',
  bold: 'ClashGrotesk-Bold',
};

export const borderRadius = {
  small: 8,
  medium: 15,
  large: 30,
  full: 9999,
};

export const universalStyle = StyleSheet.create({
  centering: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  verticalCentering: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    // width: 280,
    width: '100%',
    // height: 605,
    height: '100%',
    position: 'relative',
    backgroundColor: appColors.black,
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  spaceEvenly: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  spaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
