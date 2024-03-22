import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  appColors,
  fontFamily,
  fontSize,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/UniversalStyle';

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady ? children : null}
      <Splash isAppReady={isAppReady} />
    </>
  );
}

const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({isAppReady}: {isAppReady: boolean}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;

  const [state, setState] = useState<
    typeof WAIT_FOR_APP_TO_BE_READY | typeof FADE_OUT | typeof HIDDEN
  >(WAIT_FOR_APP_TO_BE_READY);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: true,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  setTimeout(() => {
    if (state === HIDDEN) return null;
  }, 1000);

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1.3,
    },
    0.5: {
      opacity: 1,
      scale: 1.1,
    },
    1: {
      opacity: 1,
      scale: 0.9,
    },
  };

  const slideIn = {
    0: {
      opacity: 0,
      marginBottom: -sizeBlock.getHeightSize(70),
    },
    0.5: {
      opacity: 0.5,
      marginBottom: -sizeBlock.getHeightSize(35),
    },
    1: {
      opacity: 1,
      marginBottom: sizeBlock.getHeightSize(0),
    },
  };

  const [showText, setShowText] = useState(false);

  return (
    <Animated.View
      collapsable={false}
      style={[
        style.container,
        {
          opacity: containerOpacity,
          display: state === HIDDEN ? 'none' : 'flex',
        },
      ]}>
      <Animatable.View style={style.subContainer}>
        <Animatable.Image
          animation={zoomOut}
          duration={1000}
          source={require('../../assets/images/logo.jpg')}
          style={style.image}
          resizeMode="contain"
        />
      </Animatable.View>

      <StatusBar backgroundColor={'#FCE48E'} />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FCE48E',
    ...universalStyle.centering,
    justifyContent: 'space-around',
    paddingHorizontal: sizeBlock.getWidthSize(10),
    zIndex: -4,
  },
  subContainer: {
    width: screenWidth,
    ...universalStyle.centering,
    height: sizeBlock.getHeightSize(70),
  },
  image: {
    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
  },
  textContainer: {
    width: '45%',
  },
  mainText: {
    color: appColors.black,
    fontSize: fontSize.medium + 5,
  },
  subText: {
    color: appColors.black,
    fontSize: fontSize.small - 2,
  },
});
