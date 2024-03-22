import LinearGradient from 'react-native-linear-gradient';
import {
  appColors,
  screenHeight,
  screenWidth,
  sizeBlock,
} from '../../styles/UniversalStyle';
import {StatusBar} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const GradientBackground = ({children}: Props) => {
  return (
    <>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />

      <LinearGradient
        colors={['#FFC52D', '#F4A261']}
        useAngle={true}
        angle={319}
        angleCenter={{x: 0.5, y: 0.5}}
        locations={[0, 0.6]}
        style={{
          width: screenWidth,
          height: screenHeight,
          position: 'absolute',
          paddingHorizontal: sizeBlock.getHeightSize(20),
        }}>
        {children}
      </LinearGradient>
    </>
  );
};

export default GradientBackground;
