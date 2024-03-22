import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import CustomButton from '../../components/button/CustomButton';
import CustomPressable from '../../components/button/CustomPressable';
import {
  appColors,
  borderRadius,
  screenHeight,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/UniversalStyle';

type Props = {
  navigation: any;
};

const VisionScreen = ({navigation}: Props) => {
  const devices = useCameraDevices();
  const device = devices.find(device => device.position === 'back');
  const camera: MutableRefObject<Camera | null> = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [b64, setB64] = useState('');

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };

    requestPermission();
  }, []);

  const takePicture = async () => {
    if (!camera.current) {
      console.error('Camera is not ready');
      return null;
    }

    try {
      const photo = await camera.current.takePhoto();

      const resizedImage = await resizeAndCompressImage(photo.path);

      const imageUriBase64 = await convertImageToBase64(resizedImage.path);
      setB64(imageUriBase64);

      return imageUriBase64;
    } catch (error) {
      handleTakePictureError(error);
      return null;
    }
  };

  const resizeAndCompressImage = async (path: string) => {
    return await ImageResizer.createResizedImage(
      path,
      1024,
      1024,
      'JPEG',
      50,
      0,
      undefined,
    );
  };

  const convertImageToBase64 = async (path: string) => {
    return await RNFS.readFile(path, 'base64');
  };

  const handleTakePictureError = (error: any) => {
    console.error('Error in takePicture function:', error);
  };

  const imageSource = `data:image/jpeg;base64,${b64}`;

  if (device == null || !hasPermission) return <View />;
  return (
    <View style={[styles.container]}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={hasPermission}
        ref={camera}
        photo={true}
        enableZoomGesture={true}
      />
      {b64 && (
        <View style={styles.ImageContainer}>
          <View style={styles.ImageButton}>
            <CustomButton
              onPress={() => {
                navigation.navigate('VisionProcessScreen', {
                  imageURI: imageSource,
                });
                setB64('');
              }}
              textColor={appColors.black}
              customViewStyle={{
                width: '85%',
                backgroundColor: appColors.white,
              }}
              title="Confirm"
            />
            <CustomButton
              customViewStyle={{
                width: '85%',
                backgroundColor: appColors.black,
              }}
              onPress={() => {
                setB64('');
              }}
              title="Retake"
            />
          </View>
          <Image source={{uri: imageSource}} style={styles.Image} />
        </View>
      )}

      <CustomPressable
        onPress={() => {
          takePicture();
        }}
        customViewStyle={styles.Button}>
        <View />
      </CustomPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'relative',
    ...universalStyle.centering,
  },
  camera: {
    width: '99%',
    height: screenHeight,
    marginBottom: '2%',
  },
  ImageButton: {
    width: '100%',
    position: 'absolute',
    bottom: sizeBlock.getHeightSize(100),
    zIndex: 6,
    ...universalStyle.centering,
    paddingLeft: sizeBlock['getWidthSize'](20),
  },
  Button: {
    width: sizeBlock.getWidthSize(80),
    height: sizeBlock.getWidthSize(80),
    borderRadius: borderRadius.full,
    position: 'absolute',
    borderWidth: 10,
    borderColor: appColors.white,
    bottom: sizeBlock.getHeightSize(100),
    zIndex: 4,
    left: (screenWidth - sizeBlock.getWidthSize(80)) / 2,
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  ImageContainer: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    zIndex: 5,
  },
});

export default VisionScreen;
