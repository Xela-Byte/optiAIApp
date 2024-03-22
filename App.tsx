import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './src/stateManagement/store';
import Navigator from './src/utils/navigation/Navigator';
import {useEffect, useState} from 'react';
import {WithSplashScreen} from './src/components/splashScreen/SplashScreen';
type Props = {};

const App = (props: Props) => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppReady(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <WithSplashScreen isAppReady={isAppReady}>
          <Navigator />
        </WithSplashScreen>
      </Provider>
    </PersistGate>
  );
};

export default App;
