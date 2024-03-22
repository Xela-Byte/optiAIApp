// PromptListScreen.js

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import socketIOClient from 'socket.io-client';
import GradientBackground from '../../components/background/GradientBackground';
import CustomButton from '../../components/button/CustomButton';
import CustomPressable from '../../components/button/CustomPressable';
import CustomText from '../../components/text/CustomText';
import {apiURL} from '../../stateManagement/actions/constants';
import {selectAuthToken} from '../../stateManagement/features/auth/authSlice';
import {promptStyle} from '../../styles/PromptStyle';
import {
  appColors,
  fontSize,
  screenHeight,
  sizeBlock,
} from '../../styles/UniversalStyle';
import HeaderComponent from '../../components/header/HeaderComponent';

type Props = {
  navigation: any;
};
const PromptListScreen = ({navigation}: Props) => {
  const token = useSelector(selectAuthToken);

  const [prompts, setPrompts] = useState<
    {
      _id: string;
      value: string;
      errorMessage: string;
      active: boolean;
    }[]
  >([]);

  useEffect(() => {
    const socket = socketIOClient(apiURL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('prompts', receivedPrompts => {
      setPrompts(receivedPrompts);
    });

    return () => {
      socket.disconnect();
      console.log('Disconnected from server');
    };
  }, []);

  const deletePrompt = async (promptId: string) => {
    if (prompts.length === 1) {
      Alert.alert('At least a prompt has to be present');
    } else {
      const response = await axios.delete(
        `${apiURL}prompt/delete-prompt?promptId=${promptId}&token=${token}`,
      );
      Alert.alert(response.data.message);
    }
  };

  return (
    <GradientBackground>
      <View style={promptStyle.container}>
        <HeaderComponent
          showIcon={false}
          title="Prompts"
          navigation={navigation}
        />
        <CustomText
          customStyle={{
            marginVertical: sizeBlock.getHeightSize(20),
          }}>
          Prompts:
        </CustomText>
        {prompts.length === 0 && (
          <View>
            <CustomText>No prompts found</CustomText>
            <CustomButton
              customViewStyle={{
                marginTop: sizeBlock.getHeightSize(20),
                backgroundColor: appColors.black,
              }}
              onPress={() => {}}
              title="Click to add"
            />
          </View>
        )}
        <FlatList
          data={prompts}
          style={{height: screenHeight * 0.8}}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={promptStyle.tabContainer}>
              {item.active === true && (
                <View
                  style={[
                    promptStyle.iconContainer,
                    {
                      marginLeft: 0,
                      columnGap: 10,
                    },
                  ]}>
                  <CustomText
                    fontSize={fontSize.primary}
                    color={appColors.white}>
                    Active
                  </CustomText>
                  <View style={promptStyle.activeDot} />
                </View>
              )}
              <View style={promptStyle.iconContainer}>
                <CustomPressable
                  customViewStyle={promptStyle.setting}
                  onPress={() => {}}>
                  <Icon
                    name="pencil"
                    color={appColors.white}
                    size={fontSize.small}
                  />
                </CustomPressable>
                <CustomPressable
                  customViewStyle={promptStyle.setting}
                  onPress={() => {
                    deletePrompt(item._id);
                  }}>
                  <Icon
                    name="trash"
                    color={appColors.white}
                    size={fontSize.small}
                  />
                </CustomPressable>
              </View>
              <CustomText fontSize={fontSize.primary} color={appColors.white}>
                Prompt
              </CustomText>
              <CustomText color={appColors.white}>{item.value}</CustomText>

              <CustomText
                customStyle={{
                  marginTop: sizeBlock.getHeightSize(10),
                }}
                fontSize={fontSize.primary}
                color={appColors.white}>
                Error Message
              </CustomText>
              <CustomText color={appColors.white}>
                {item.errorMessage}
              </CustomText>
            </View>
          )}
        />
      </View>
    </GradientBackground>
  );
};

export default PromptListScreen;
