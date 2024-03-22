import Clipboard from '@react-native-clipboard/clipboard';
import {useEffect, useState} from 'react';
import {ScrollView, ToastAndroid, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Config from 'react-native-config';
import TypeWriter from 'react-native-typewriter';
import socketIOClient from 'socket.io-client';
import GradientBackground from '../../components/background/GradientBackground';
import CustomButton from '../../components/button/CustomButton';
import CustomText from '../../components/text/CustomText';
import {apiURL} from '../../stateManagement/actions/constants';
import {
  appColors,
  fontFamily,
  fontSize,
  sizeBlock,
} from '../../styles/UniversalStyle';
import {visionStartStyle} from '../../styles/VisionStartStyle';
import HeaderComponent from '../../components/header/HeaderComponent';

type Props = {
  navigation: any;
  route: any;
};

const VisionProcessScreen = ({navigation, route}: Props) => {
  const [processed, setProcessed] = useState(false);
  const [description, setDescription] = useState<string>('');

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

  const activePrompt = prompts
    ? prompts.find(prompt => {
        const {active} = prompt;
        return active === true;
      })
    : null;

  const {params} = route;
  const {imageURI} = params;

  const postData = async (url = '', data: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  };

  const describeImageWithOpenAI = async (base64Image: string) => {
    const params = {
      model: 'gpt-4-vision-preview',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `${activePrompt?.value}
               If not the right answer, give this as response
               - ${activePrompt?.errorMessage},
               else if image is blurry but correct, give your response.
               `,
            },
            {
              type: 'image_url',
              image_url: {
                url: `${base64Image}`,
              },
            },
          ],
        },
      ],
    };

    try {
      const url = 'https://api.openai.com/v1/chat/completions';
      setDescription('Sending request to OpenAI...');
      const result = await postData(url, params);

      return result.choices[0].message.content;
    } catch (error) {
      setDescription(JSON.stringify(error));
      console.error(error);
      return null;
    }
  };

  const handleProcess = async () => {
    const description = await describeImageWithOpenAI(imageURI);
    setDescription(`${description}`);

    setTimeout(() => {
      setProcessed(true);
    }, 2000);
  };

  useEffect(() => {
    activePrompt && handleProcess();
  }, [activePrompt]);

  const copyResponse = () => {
    Clipboard.setString(description);

    ToastAndroid.showWithGravityAndOffset(
      'Description copied.',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const navigateToStart = () => {
    navigation.navigate('VisionStartScreen');
  };

  return (
    <GradientBackground>
      <ScrollView>
        <View style={visionStartStyle.container}>
          <HeaderComponent
            showIcon={false}
            title="Vision Processing"
            navigation={navigation}
            onPress={navigateToStart}
          />
          {!processed && (
            <Animatable.View iterationCount={'infinite'} animation={'pulse'}>
              <CustomText
                fontSize={fontSize.medium}
                customStyle={{
                  marginTop: sizeBlock.getHeightSize(60),
                }}>
                Processing image for identification...
              </CustomText>
            </Animatable.View>
          )}

          {processed && (
            <CustomText
              fontSize={fontSize.medium}
              customStyle={{
                marginTop: sizeBlock.getHeightSize(60),
              }}>
              Image Processing successful!
            </CustomText>
          )}

          {processed && (
            <>
              <CustomText
                fontSize={fontSize.small}
                customStyle={{
                  marginTop: sizeBlock.getHeightSize(30),
                }}>
                Description
              </CustomText>

              <View style={visionStartStyle.textContainer}>
                <TypeWriter
                  style={{
                    fontFamily: fontFamily.medium,
                    color: appColors.black,
                    fontSize: fontSize.small,
                  }}
                  typing={1}>
                  {description}
                </TypeWriter>
              </View>

              <CustomButton
                title="Copy Response"
                customViewStyle={{
                  backgroundColor: appColors.black,
                }}
                onPress={() => {
                  copyResponse();
                }}
              />

              <CustomButton
                title="Retake Photo"
                customViewStyle={{
                  marginTop: sizeBlock.getHeightSize(15),
                  backgroundColor: appColors.black,
                }}
                onPress={() => {
                  navigation.navigate('VisionScreen');
                }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default VisionProcessScreen;
