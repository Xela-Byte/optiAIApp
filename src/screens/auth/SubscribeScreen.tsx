import {
  BillingDetails,
  CardField,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import {Details} from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import {useEffect, useState} from 'react';
import {Alert, SafeAreaView, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import GradientBackground from '../../components/background/GradientBackground';
import CustomButton from '../../components/button/CustomButton';
import CustomPressable from '../../components/button/CustomPressable';
import CustomText from '../../components/text/CustomText';
import {
  createSubscription,
  updateSubscription,
} from '../../stateManagement/actions/inApp/paymentActions';
import {
  resetRegisterData,
  selectRegisterData,
} from '../../stateManagement/features/auth/authSlice';
import {
  selectPaymentIntentData,
  selectPaymentIntentError,
  selectPaymentIntentStatus,
} from '../../stateManagement/features/inApp/paymentSlice';
import {AppDispatch} from '../../stateManagement/store';
import {subscribeStyle} from '../../styles/SubscribeStyle';
import {
  appColors,
  borderRadius,
  fontSize,
  screenHeight,
  sizeBlock,
} from '../../styles/UniversalStyle';
import HeaderComponent from '../../components/header/HeaderComponent';

type Props = {
  navigation: any;
};

const SubscribeScreen = ({navigation}: Props) => {
  const [plan, setPlan] = useState<'monthly' | 'annually'>('monthly');
  const [card, setCard] = useState<Details | {}>({});
  const [focused, setFocused] = useState<boolean>(false);

  const registerData = useSelector(selectRegisterData);
  const paymentIntentData = useSelector(selectPaymentIntentData);
  const paymentIntentError = useSelector(selectPaymentIntentError);
  const paymentIntentStatus = useSelector(selectPaymentIntentStatus);

  const dispatch = useDispatch<AppDispatch>();

  const fetchPaymentSheetParams = async () => {
    const paymentIntentParams = {
      customer: registerData.customer,
      priceId: 'price_1OsNEeFv8L01V7z1x8zKwKHD',
    };

    dispatch(createSubscription(paymentIntentParams));
  };

  const {confirmPayment} = useConfirmPayment();

  const handlePayPress = async () => {
    if (!card) {
      Alert.alert('Card details not complete');
    }
    await fetchPaymentSheetParams();
  };

  const processPayment = async () => {
    if (paymentIntentData.clientSecret) {
      const billingDetails: BillingDetails = {
        email: registerData.email,
        name: registerData.username,
      };

      const {paymentIntent, error} = await confirmPayment(
        paymentIntentData.clientSecret,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails,
          },
        },
      );

      if (error) {
        console.log('Payment confirmation error', error);
        Alert.alert(error.message);
      } else if (paymentIntent) {
        dispatch(
          updateSubscription({
            email: registerData.email,
            subscriptionId: paymentIntentData.subscriptionId,
          }),
        );
        Alert.alert(paymentIntent.status ?? 'Success');
      }
    }
  };

  useEffect(() => {
    if (paymentIntentStatus === 'succeeded') {
      processPayment();
    }
  }, [paymentIntentStatus]);

  const logOut = () => {
    dispatch(resetRegisterData());
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51OrNJhFv8L01V7z1ZewgTeyO2Eb1H0K3dAZ1Xgb55KOf3Qj8WA5tNKvhDE0smiTk5HbZruF103qvjgqsGVbZaTSG00BkhOzQCo"
      urlScheme="com.photototext"
      merchantIdentifier={`merchant.com.{{YOUR_APP_NAME}}`}>
      <SafeAreaView style={subscribeStyle.container}>
        <GradientBackground>
          <View style={subscribeStyle.content}>
            <HeaderComponent
              onPress={() => {
                logOut();
              }}
              showIcon={false}
              title="Subscription"
              navigation={navigation}
            />
            <View style={{height: screenHeight * 0.8}}>
              <ScrollView>
                <CustomText
                  customStyle={{
                    textAlign: 'center',
                    marginVertical: sizeBlock.getHeightSize(30),
                  }}
                  fontSize={fontSize.medium}>
                  Subscribe To Premium
                </CustomText>

                <View style={subscribeStyle.tabContainer}>
                  <CustomPressable
                    customViewStyle={{width: '48%'}}
                    onPress={() => {
                      setPlan('monthly');
                    }}>
                    <View
                      style={[
                        subscribeStyle.tabContent,
                        plan === 'monthly' && {
                          backgroundColor: appColors.white,
                        },
                      ]}>
                      <CustomText
                        color={
                          plan === 'monthly' ? appColors.black : appColors.white
                        }
                        fontSize={fontSize.medium - 5}>
                        Monthly
                      </CustomText>
                      <CustomText
                        color={
                          plan === 'monthly' ? appColors.black : appColors.white
                        }
                        fontType="semiBold"
                        fontSize={fontSize.medium + 5}>
                        $9.99
                      </CustomText>
                    </View>
                  </CustomPressable>

                  <View
                    style={[
                      subscribeStyle.tabContent,
                      {
                        width: '48%',
                      },
                    ]}>
                    <CustomText>
                      Kindly input your card details for the subscription to
                      full access to the features of OptiAI
                    </CustomText>
                  </View>
                </View>

                <CardField
                  onFocus={() => {
                    setFocused(!focused);
                  }}
                  postalCodeEnabled={false}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: appColors.black,
                    borderRadius: borderRadius.medium,
                    textColor: appColors.white,
                  }}
                  style={{
                    width: '100%',
                    height: sizeBlock.getHeightSize(100),
                    marginTop: sizeBlock.getHeightSize(50),
                  }}
                  onCardChange={(cardDetails: Details) => {
                    setCard(cardDetails);
                  }}
                />
                <CustomButton
                  onPress={handlePayPress}
                  customViewStyle={{
                    backgroundColor: appColors.black,
                    marginVertical: sizeBlock.getHeightSize(50),
                  }}
                  textColor={appColors.white}
                  loading={paymentIntentStatus === 'loading'}
                  title="Subscribe"
                />
              </ScrollView>
            </View>
          </View>
        </GradientBackground>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default SubscribeScreen;
