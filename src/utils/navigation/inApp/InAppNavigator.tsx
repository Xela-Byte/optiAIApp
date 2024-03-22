import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import VisionProcessScreen from '../../../screens/inApp/VisionProcessScreen';
import VisionScreen from '../../../screens/inApp/VisionScreen';
import VisionStartScreen from '../../../screens/inApp/VisionStartScreen';
import {appColors} from '../../../styles/UniversalStyle';
import SubscribeScreen from '../../../screens/auth/SubscribeScreen';
import {useSelector} from 'react-redux';
import {selectRegisterData} from '../../../stateManagement/features/auth/authSlice';
import PromptScreen from '../../../screens/inApp/PromptScreen';
import PromptListScreen from '../../../screens/inApp/PromptListScreen';
import UserListScreen from '../../../screens/inApp/UserListScreen';

const InAppNavigator = () => {
  const Stack = createNativeStackNavigator();

  const userData = useSelector(selectRegisterData);

  return (
    <>
      <StatusBar backgroundColor={appColors.black} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'VisionStartScreen'}>
        {userData.role === 'user' && !userData.subscription.active ? (
          <Stack.Screen name="SubscribeScreen" component={SubscribeScreen} />
        ) : (
          <>
            <Stack.Screen
              name="VisionStartScreen"
              component={VisionStartScreen}
            />
            <Stack.Screen name="VisionScreen" component={VisionScreen} />
            <Stack.Screen
              name="VisionProcessScreen"
              component={VisionProcessScreen}
            />
            <Stack.Screen name="PromptScreen" component={PromptScreen} />
            <Stack.Screen
              name="PromptListScreen"
              component={PromptListScreen}
            />
            <Stack.Screen name="UserListScreen" component={UserListScreen} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default InAppNavigator;
