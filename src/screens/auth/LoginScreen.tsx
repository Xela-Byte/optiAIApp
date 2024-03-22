import {useForm} from 'react-hook-form';
import {Image, SafeAreaView, View} from 'react-native';
import CustomButton from '../../components/button/CustomButton';
import CustomPressable from '../../components/button/CustomPressable';
import CustomInput from '../../components/input/CustomInput';
import CustomText from '../../components/text/CustomText';
import {loginUser} from '../../stateManagement/actions/auth/authActions';
import {loginStyle} from '../../styles/LoginStyle';
import {
  appColors,
  fontSize,
  screenHeight,
  sizeBlock,
} from '../../styles/UniversalStyle';
import {AppDispatch} from '../../stateManagement/store';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetAuthState,
  selectLoginError,
  selectLoginStatus,
} from '../../stateManagement/features/auth/authSlice';
import {useEffect} from 'react';

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const {control, handleSubmit} = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const loginStatus = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);

  const onSignIn = (data: FormValues) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    dispatch(resetAuthState());
    return () => {
      dispatch(resetAuthState());
    };
  }, []);

  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.content}>
        <Image
          source={require('../../assets/images/logo.jpg')}
          style={loginStyle.logo}
          resizeMode="cover"
        />
        <View style={loginStyle.textContainer}>
          <View>
            <CustomText
              customStyle={{
                textAlign: 'center',
              }}
              fontType="semiBold"
              color={appColors.white}
              fontSize={fontSize.medium + 5}>
              Welcome Back
            </CustomText>
          </View>
        </View>

        <CustomInput
          iconName="mail"
          control={control}
          name="email"
          placeholder="Email Address"
          rules={{
            required: 'Please enter email',
          }}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(30),
          }}
        />
        <CustomInput
          iconName="dots-three-horizontal"
          control={control}
          name="password"
          placeholder="Password"
          password
          rules={{
            required: 'Please enter password',
            message:
              'Password must contain at least a Uppercase letter, a Lowercase letter, a number and a special character.',
          }}
        />

        {loginStatus === 'failed' && (
          <CustomText
            customStyle={{textAlign: 'center'}}
            color="red"
            fontSize={fontSize.primary}>
            {loginError ?? 'Error logging in.'}
          </CustomText>
        )}

        <CustomButton
          onPress={() => {
            handleSubmit(onSignIn)();
          }}
          title="SIGN IN"
          loading={loginStatus === 'loading'}
          textColor={appColors.black}
          customViewStyle={{
            marginTop: screenHeight * 0.25,
          }}
        />

        <CustomPressable
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}>
          <CustomText
            customStyle={{
              textAlign: 'center',
              marginTop: sizeBlock.getHeightSize(20),
            }}
            color={appColors.white}>
            Don't have an account? Sign Up
          </CustomText>
        </CustomPressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
