import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './UniversalStyle';

export const promptStyle = StyleSheet.create({
  container: {
    paddingTop: sizeBlock.getHeightSize(50),
  },
  image: {
    width: sizeBlock.getWidthSize(100),
    height: sizeBlock.getWidthSize(100),
    borderRadius: borderRadius.full,
    marginLeft: 'auto',
    marginTop: sizeBlock.getHeightSize(50),
    marginRight: 'auto',
  },
  content: {
    ...universalStyle.centering,
    paddingTop: sizeBlock.getHeightSize(30),
    flexDirection: 'column',
  },
  tabContainer: {
    width: '100%',
    backgroundColor: appColors.black,
    padding: sizeBlock.getWidthSize(20),
    marginBottom: sizeBlock.getHeightSize(10),
    borderRadius: borderRadius.medium,
  },
  iconContainer: {
    ...universalStyle.verticalCentering,
    marginLeft: 'auto',
    columnGap: sizeBlock.getWidthSize(20),
  },
  setting: {
    width: sizeBlock.getWidthSize(30),
    height: sizeBlock.getWidthSize(30),
    ...universalStyle.centering,
  },
  activeDot: {
    width: sizeBlock.getWidthSize(10),
    height: sizeBlock.getWidthSize(10),
    backgroundColor: appColors.green,
    borderRadius: borderRadius.full,
  },
});
