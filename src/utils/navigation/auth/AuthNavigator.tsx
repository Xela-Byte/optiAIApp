import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import LoginScreen from '../../../screens/auth/LoginScreen';
import RegisterScreen from '../../../screens/auth/RegisterScreen';
import {selectRegisterData} from '../../../stateManagement/features/auth/authSlice';
import {appColors} from '../../../styles/UniversalStyle';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  const userData = useSelector(selectRegisterData);

  return (
    <>
      <StatusBar backgroundColor={appColors.black} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={
          userData._id === 'LoggedOut' ? 'LoginScreen' : 'RegisterScreen'
        }>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
