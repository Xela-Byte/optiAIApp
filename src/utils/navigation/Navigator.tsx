import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './auth/AuthNavigator';
import InAppNavigator from './inApp/InAppNavigator';
import {useSelector} from 'react-redux';
import {selectRegisterData} from '../../stateManagement/features/auth/authSlice';

const Navigator = () => {
  const userData = useSelector(selectRegisterData);

  return (
    <NavigationContainer>
      {!userData.subscription ? <AuthNavigator /> : <InAppNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
