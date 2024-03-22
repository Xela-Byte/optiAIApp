import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackHandler = (backAction: () => boolean): void => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [backAction]);
};

export default useBackHandler;
