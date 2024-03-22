import {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
import GoogleIcon from '../../assets/svgs/GoogleIcon';
import {
  appColors,
  borderRadius,
  fontSize,
  sizeBlock,
  universalStyle,
} from '../../styles/UniversalStyle';
import CustomText from '../text/CustomText';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import useHexToRGBA from '../../utils/hooks/useHexToRGBA';

type Props = {
  onPress: () => void;
  title: string;
  customViewStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  textSize?: number;
  loading?: boolean;
  disabled?: boolean;
  iconName?: string;
};

const TransparentButton = ({
  customTextStyle,
  customViewStyle,
  onPress,
  title,
  textSize,
  loading,
  disabled,
  iconName,
}: Props) => {
  const [animate, setAnimate] = useState(false);

  const handlePress = () => {
    setAnimate(true);

    // Reset the animation after a short delay
    setTimeout(() => {
      setAnimate(false);
    }, 300); // Adjust the delay as needed

    // Trigger the onPress function
    onPress();
  };

  const bounce = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.8,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };
  return (
    <Pressable disabled={disabled} onPress={handlePress}>
      <Animatable.View
        duration={300}
        animation={animate ? bounce : ''}
        style={[
          styles.container,
          customViewStyle,
          {opacity: disabled ? 0.3 : 1},
        ]}>
        {loading ? (
          <ActivityIndicator
            color={appColors.white}
            size={textSize ? textSize : fontSize.small}
          />
        ) : (
          <>
            {iconName === 'facebook' && <FacebookIcon />}
            {iconName === 'google' && <GoogleIcon />}
            <CustomText
              fontSize={textSize ? textSize : fontSize.small}
              customStyle={customTextStyle}
              fontType="medium"
              color={appColors.white}>
              {title}
            </CustomText>
          </>
        )}
      </Animatable.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: sizeBlock.getWidthSize(50),
    borderRadius: borderRadius.full,
    backgroundColor: useHexToRGBA(appColors.black, 0.6),
    ...universalStyle.centering,
  },
});

export default TransparentButton;
