import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Image, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/button/CustomButton';
import CustomPressable from '../../components/button/CustomPressable';
import CustomInput from '../../components/input/CustomInput';
import CustomText from '../../components/text/CustomText';
import {registerUser} from '../../stateManagement/actions/auth/authActions';
import {
  resetAuthState,
  selectRegisterError,
  selectRegisterStatus,
} from '../../stateManagement/features/auth/authSlice';
import {AppDispatch} from '../../stateManagement/store';
import {loginStyle} from '../../styles/LoginStyle';
import {
  appColors,
  fontSize,
  screenHeight,
  sizeBlock,
} from '../../styles/UniversalStyle';
import {EMAIL_REGEX, PASSWORD_REGEX} from '../../utils/data/Regex';

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  navigation: any;
};

const RegisterScreen = ({navigation}: Props) => {
  const {control, handleSubmit, watch} = useForm<FormValues>();
  const registerStatus = useSelector(selectRegisterStatus);
  const registerError = useSelector(selectRegisterError);
  const dispatch = useDispatch<AppDispatch>();

  const onSignUp = (data: FormValues) => {
    dispatch(registerUser(data));
  };

  const password = watch('password');

  useEffect(() => {
    dispatch(resetAuthState());
    return () => {
      dispatch(resetAuthState());
    };
  }, []);

  return (
    <SafeAreaView style={loginStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor={appColors.black} />
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
                Create an account
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
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
            customStyle={{
              marginTop: sizeBlock.getHeightSize(30),
            }}
          />

          <CustomInput
            iconName="user"
            control={control}
            name="username"
            placeholder="User Name"
            rules={{
              required: 'Please enter name',
              validate: (value: string) =>
                value.length > 4 || 'Choose a longer username',
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
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  'Password must contain at least a Uppercase letter, a Lowercase letter, a number and a special character.',
              },
              minLength: {
                value: 8,
                message: 'Minimum of 8 characters',
              },
            }}
          />

          <CustomInput
            iconName="dots-three-horizontal"
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
            password
            rules={{
              required: 'Confirm password',
              minLength: {
                value: 8,
                message: 'Minimum of 8 characters',
              },
              validate: (value: string) =>
                value === password || "Password does't match",
            }}
          />

          {registerStatus === 'failed' && (
            <CustomText
              customStyle={{textAlign: 'center'}}
              color="red"
              fontSize={fontSize.primary}>
              {registerError ?? 'Error signing up.'}
            </CustomText>
          )}

          <CustomButton
            onPress={() => {
              handleSubmit(onSignUp)();
            }}
            loading={registerStatus === 'loading'}
            textColor={appColors.black}
            title="SIGN UP"
            customViewStyle={{
              marginTop: screenHeight * 0.05,
            }}
          />

          <CustomPressable
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <CustomText
              color={appColors.white}
              customStyle={{
                textAlign: 'center',
                marginTop: sizeBlock.getHeightSize(20),
              }}>
              Already have an account? Sign In
            </CustomText>
          </CustomPressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
