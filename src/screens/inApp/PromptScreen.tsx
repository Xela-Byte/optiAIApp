import React, {useState} from 'react';
import {Alert, Image, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GradientBackground from '../../components/background/GradientBackground';
import CustomPressable from '../../components/button/CustomPressable';
import CustomText from '../../components/text/CustomText';
import {
  resetRegisterData,
  selectRegisterData,
  setRegisterData,
} from '../../stateManagement/features/auth/authSlice';
import {promptStyle} from '../../styles/PromptStyle';
import {appColors, fontSize, sizeBlock} from '../../styles/UniversalStyle';
import {AppDispatch} from '../../stateManagement/store';
import HeaderComponent from '../../components/header/HeaderComponent';
import axios from 'axios';
import {apiURL} from '../../stateManagement/actions/constants';

type Props = {
  navigation: any;
};

const PromptScreen = ({navigation}: Props) => {
  const {
    username,
    email,
    role,
    subscription: {subscriptionId},
  } = useSelector(selectRegisterData);

  const dispatch = useDispatch<AppDispatch>();

  const logOut = () => {
    dispatch(resetRegisterData());
  };

  const [loading, setLoading] = useState<boolean>(false);

  const cancelSubscription = async () => {
    setLoading(true);
    const response = await axios.delete(
      `${apiURL}payment/cancel-subscription?subscriptionId=${subscriptionId}`,
    );

    if (response.data) {
      setLoading(false);
      Alert.alert('Subscription cancelled successfully');
      dispatch(setRegisterData(response.data.response.user));
    }

    response.status > 200 && Alert.alert('Subscription cancelled failed');
  };

  return (
    <GradientBackground>
      <View style={promptStyle.container}>
        <HeaderComponent
          showIcon={false}
          title="Profile"
          navigation={navigation}
        />
        <Image
          source={require('../../assets/images/logo.jpg')}
          resizeMode="cover"
          style={promptStyle.image}
        />

        <View style={promptStyle.content}>
          <CustomText
            customStyle={{
              marginBottom: sizeBlock.getHeightSize(5),
            }}
            fontSize={fontSize.medium}>
            @{username}
          </CustomText>
          <CustomText
            fontSize={fontSize.primary}
            customStyle={{
              marginBottom: sizeBlock.getHeightSize(55),
            }}>
            {email}
          </CustomText>

          {role === 'admin' && (
            <CustomPressable
              customViewStyle={{width: '100%'}}
              onPress={() => {
                navigation.navigate('PromptListScreen');
              }}>
              <View style={promptStyle.tabContainer}>
                <CustomText color={appColors.white}>List of prompts</CustomText>
              </View>
            </CustomPressable>
          )}

          {role === 'admin' && (
            <CustomPressable
              customViewStyle={{width: '100%'}}
              onPress={() => {
                navigation.navigate('UserListScreen');
              }}>
              <View style={promptStyle.tabContainer}>
                <CustomText color={appColors.white}>List of users</CustomText>
              </View>
            </CustomPressable>
          )}

          {role === 'user' && (
            <CustomPressable
              customViewStyle={{width: '100%'}}
              onPress={() => {
                cancelSubscription();
              }}>
              <View style={promptStyle.tabContainer}>
                <CustomText color={appColors.white}>
                  {loading
                    ? 'Cancelling Subscription...'
                    : 'Cancel Subscription'}
                </CustomText>
              </View>
            </CustomPressable>
          )}

          <CustomPressable
            customViewStyle={{width: '100%'}}
            onPress={() => {
              logOut();
            }}>
            <View style={promptStyle.tabContainer}>
              <CustomText color={appColors.white}>Log out</CustomText>
            </View>
          </CustomPressable>
        </View>
      </View>
    </GradientBackground>
  );
};

export default PromptScreen;
