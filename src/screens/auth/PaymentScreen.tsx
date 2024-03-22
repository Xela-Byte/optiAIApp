import {View, Text} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import CustomText from '../../components/text/CustomText';

type Props = {};

const PaymentScreen = (props: Props) => {
  return (
    <StripeProvider
      publishableKey="pk_test_51OrNJhFv8L01V7z1ZewgTeyO2Eb1H0K3dAZ1Xgb55KOf3Qj8WA5tNKvhDE0smiTk5HbZruF103qvjgqsGVbZaTSG00BkhOzQCo"
      urlScheme="com.photototext"
      merchantIdentifier={`merchant.com.{{YOUR_APP_NAME}}`}>
      <CustomText>Hey</CustomText>
    </StripeProvider>
  );
};

export default PaymentScreen;
