// UserListScreen.js

import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import socketIOClient from 'socket.io-client';
import GradientBackground from '../../components/background/GradientBackground';
import CustomText from '../../components/text/CustomText';
import {apiURL} from '../../stateManagement/actions/constants';
import {RegisterResponseType} from '../../stateManagement/types/responseType';
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

const UserListScreen = ({navigation}: Props) => {
  const [users, setUsers] = useState<RegisterResponseType['response'][]>([]);

  useEffect(() => {
    const socket = socketIOClient(apiURL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('users', receivedUsers => {
      setUsers(receivedUsers);
    });

    return () => {
      socket.disconnect();
      console.log('Disconnected from server');
    };
  }, []);

  return (
    <GradientBackground>
      <View style={promptStyle.container}>
        <HeaderComponent
          showIcon={false}
          title="Users"
          navigation={navigation}
        />
        <CustomText
          customStyle={{
            marginVertical: sizeBlock.getHeightSize(20),
          }}>
          Users:
        </CustomText>
        {users.length === 0 && (
          <View>
            <CustomText>No user found</CustomText>
          </View>
        )}
        <FlatList
          data={users}
          style={{height: screenHeight * 0.8}}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={promptStyle.tabContainer}>
              <CustomText fontSize={fontSize.primary} color={appColors.white}>
                Username
              </CustomText>
              <CustomText color={appColors.white}>{item.username}</CustomText>

              <CustomText
                customStyle={{
                  marginTop: sizeBlock.getHeightSize(10),
                }}
                fontSize={fontSize.primary}
                color={appColors.white}>
                Email
              </CustomText>
              <CustomText color={appColors.white}>{item.email}</CustomText>
              {item.subscription.active === true && (
                <View
                  style={[
                    promptStyle.iconContainer,
                    {
                      marginLeft: 0,
                      marginTop: sizeBlock.getHeightSize(10),
                      columnGap: 10,
                    },
                  ]}>
                  <CustomText
                    fontSize={fontSize.primary}
                    color={appColors.white}>
                    Subscription Active
                  </CustomText>
                  <View style={promptStyle.activeDot} />
                </View>
              )}
            </View>
          )}
        />
      </View>
    </GradientBackground>
  );
};

export default UserListScreen;
