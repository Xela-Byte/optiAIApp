import {useState} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';

type Props = {
  onPress: () => void;
  children?: React.ReactNode;
  customViewStyle?: ViewStyle;
};

const CustomPressable = ({customViewStyle, onPress, children}: Props) => {
  const [animate, setAnimate] = useState(false);

  const handlePress = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 300);
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
    <Pressable
      onPress={handlePress}
      style={[styles.container, customViewStyle]}>
      <Animatable.View duration={300} animation={animate ? bounce : ''}>
        {children}
      </Animatable.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CustomPressable;
