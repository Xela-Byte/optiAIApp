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
import AppleIcon from '../../assets/svgs/AppleIcon';

type Props = {
  onPress: () => void;
  title: string;
  customViewStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  textSize?: number;
  loading?: boolean;
  disabled?: boolean;
  iconName?: 'facebook' | 'google' | 'apple';
};

const OutlinedButton = ({
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

  const handleAnimate = () => {
    setAnimate(true);

    // Reset the animation after a short delay
    setTimeout(() => {
      setAnimate(false);
    }, 300); // Adjust the delay as needed
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
    <Pressable disabled={disabled} onPress={onPress}>
      <Animatable.View
        duration={300}
        animation={animate ? bounce : ''}
        onStartShouldSetResponder={() => {
          handleAnimate();
          return true;
        }}
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
            {iconName === 'apple' && <AppleIcon width={25} height={25} />}
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
    borderWidth: 1,
    borderColor: appColors.gold,
    ...universalStyle.centering,
    columnGap: sizeBlock.getWidthSize(10),
  },
});

export default OutlinedButton;
