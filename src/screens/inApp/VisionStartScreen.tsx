import {View, Text, Image} from 'react-native';
import GradientBackground from '../../components/background/GradientBackground';
import Logo from '../../assets/images/logo.jpg';
import {visionStartStyle} from '../../styles/VisionStartStyle';
import CustomText from '../../components/text/CustomText';
import {appColors, fontSize, sizeBlock} from '../../styles/UniversalStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/button/CustomButton';
import CustomPressable from '../../components/button/CustomPressable';
import HeaderComponent from '../../components/header/HeaderComponent';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../stateManagement/store';
import {resetRegisterData} from '../../stateManagement/features/auth/authSlice';

type Props = {
  navigation: any;
};

const VisionStartScreen = ({navigation}: Props) => {
  return (
    <GradientBackground>
      <View style={visionStartStyle.container}>
        <CustomPressable
          customViewStyle={visionStartStyle.setting}
          onPress={() => {
            navigation.navigate('PromptScreen');
          }}>
          <Icon name="setting" size={fontSize.medium} color={appColors.black} />
        </CustomPressable>
        <View style={visionStartStyle.imageContainer}>
          <Image
            source={Logo}
            resizeMode="cover"
            style={visionStartStyle.image}
          />
        </View>
        <CustomText
          fontSize={fontSize.medium}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(60),
          }}>
          Get Started With OptiAI
        </CustomText>

        <View style={visionStartStyle.instructTabContainer}>
          <View style={visionStartStyle.instructTab}>
            <Icon
              name={'check'}
              size={fontSize.medium}
              color={appColors.black}
            />
            <CustomText>Take a picture</CustomText>
          </View>
          <View style={visionStartStyle.instructTab}>
            <Icon
              name={'check'}
              size={fontSize.medium}
              color={appColors.black}
            />
            <CustomText>
              Confirm whether the picture is okay and ready for detection
            </CustomText>
          </View>

          <View style={visionStartStyle.instructTab}>
            <Icon
              name={'check'}
              size={fontSize.medium}
              color={appColors.black}
            />
            <CustomText>
              Response typically takes about 5 - 10 seconds
            </CustomText>
          </View>

          <View style={visionStartStyle.instructTab}>
            <Icon
              name={'check'}
              size={fontSize.medium}
              color={appColors.black}
            />
            <CustomText>
              Prompts are set by default and only matching picture description
              are accepted
            </CustomText>
          </View>

          <View style={visionStartStyle.instructTab}>
            <Icon
              name={'check'}
              size={fontSize.medium}
              color={appColors.black}
            />
            <CustomText>
              Your identification response is presented to you in a nice and
              copyable form
            </CustomText>
          </View>
        </View>

        <CustomButton
          title="Start"
          customViewStyle={{
            backgroundColor: appColors.black,
            marginTop: sizeBlock.getHeightSize(50),
          }}
          onPress={() => {
            navigation.navigate('VisionScreen');
          }}
        />
      </View>
    </GradientBackground>
  );
};

export default VisionStartScreen;
