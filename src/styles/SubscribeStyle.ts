import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './UniversalStyle';

export const subscribeStyle = StyleSheet.create({
  container: {
    ...universalStyle.container,
  },
  content: {
    width: '100%',
    height: '100%',
    paddingTop: sizeBlock.getHeightSize(60),
  },
  tabContainer: {
    ...universalStyle.spaceBetween,
  },
  tabContent: {
    width: '100%',
    height: sizeBlock.getHeightSize(200),
    borderWidth: 2,
    borderColor: appColors.white,
    borderRadius: borderRadius.medium,
    padding: sizeBlock.getWidthSize(20),
  },
});
