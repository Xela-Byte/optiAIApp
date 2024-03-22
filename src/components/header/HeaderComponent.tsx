import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {appColors, fontSize} from '../../styles/UniversalStyle';
import MenuIcon from 'react-native-vector-icons/Entypo';
import CustomText from '../text/CustomText';
import {universalStyle} from '../../styles/UniversalStyle';
import CustomPressable from '../button/CustomPressable';

type Props = {
  title: string;
  showIcon: boolean;
  navigation: any;
  onPress?: () => void;
};

const HeaderComponent = ({navigation, showIcon, title, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <CustomPressable
        customViewStyle={{
          padding: 5,
        }}
        onPress={onPress ? onPress : navigation.goBack}>
        <Icon
          name="arrow-left-long"
          size={fontSize.primary + 5}
          color={appColors.black}
        />
      </CustomPressable>

      <CustomText fontSize={fontSize.small + 2} color={appColors.black}>
        {title}
      </CustomText>

      <MenuIcon
        name="dots-three-horizontal"
        size={fontSize.primary + 5}
        color={appColors.white}
        style={{
          opacity: showIcon ? 1 : 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...universalStyle.spaceBetween,
  },
});

export default HeaderComponent;
