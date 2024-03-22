import {StyleSheet} from 'react-native';
import {
  borderRadius,
  screenHeight,
  screenWidth,
  sizeBlock,
  universalStyle,
} from './UniversalStyle';

export const loginStyle = StyleSheet.create({
  container: {
    ...universalStyle.container,
  },
  content: {
    paddingHorizontal: sizeBlock.getWidthSize(20),
    paddingTop: sizeBlock.getHeightSize(60),
  },
  logo: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: screenWidth / 2,
    height: screenHeight / 7,
    borderRadius: borderRadius.medium,
    marginBottom: sizeBlock.getHeightSize(30),
  },
  footer: {
    width: '100%',
    ...universalStyle.spaceBetween,
    paddingHorizontal: sizeBlock.getWidthSize(5),
    paddingVertical: sizeBlock.getHeightSize(30),
  },
  remember: {
    ...universalStyle.flexBetween,
    columnGap: sizeBlock.getWidthSize(5),
  },
  textContainer: {
    height: sizeBlock.getHeightSize(50),
    overflow: 'hidden',
  },
});
