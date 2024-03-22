import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './UniversalStyle';
import useHexToRGBA from '../utils/hooks/useHexToRGBA';

export const visionStartStyle = StyleSheet.create({
  container: {
    paddingTop: sizeBlock.getHeightSize(60),
  },
  setting: {
    marginLeft: 'auto',
    width: sizeBlock.getWidthSize(50),
    height: sizeBlock.getWidthSize(50),
    ...universalStyle.centering,
    marginBottom: sizeBlock.getHeightSize(40),
  },
  image: {
    width: sizeBlock.getWidthSize(100),
    height: sizeBlock.getWidthSize(100),
  },
  imageContainer: {
    width: sizeBlock.getWidthSize(120),
    height: sizeBlock.getWidthSize(120),
    ...universalStyle.centering,
    borderRadius: borderRadius.medium,
    backgroundColor: '#FCE48E',
  },
  instructTabContainer: {
    width: '100%',
    paddingTop: sizeBlock.getHeightSize(20),
    paddingRight: sizeBlock.getWidthSize(20),
    rowGap: sizeBlock.getHeightSize(20),
  },
  instructTab: {
    ...universalStyle.verticalCentering,
    paddingRight: sizeBlock.getWidthSize(20),
    columnGap: sizeBlock.getWidthSize(15),
  },
  textContainer: {
    width: '100%',
    padding: sizeBlock.getWidthSize(20),
    backgroundColor: useHexToRGBA(appColors.white, 0.25),
    borderRadius: borderRadius.small,
    marginTop: sizeBlock.getHeightSize(10),
    marginBottom: sizeBlock.getHeightSize(30),
  },
});
