import React, {useState} from 'react';
import {Controller, FieldPath, FieldValues} from 'react-hook-form';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import UserIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import EyeIcon from '../../assets/svgs/EyeIcon';
import {
  appColors,
  borderRadius,
  fontFamily,
  fontSize,
  screenHeight,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/UniversalStyle';
import CustomText from '../text/CustomText';

type CustomInputProps<TFieldValues extends FieldValues> = {
  control: any;
  name: FieldPath<TFieldValues>;
  password?: boolean;
  rules?: object;
  placeholder?: string;
  iconName?: string;
  onFocus?: () => void;
  keyboardType?: KeyboardType;
  editable?: boolean;
  defaultValue?: TFieldValues[FieldPath<TFieldValues>];
  mB?: number;
  customStyle?: ViewStyle;
  inputProps?: TextInputProps;
  mutliline?: boolean;
};
const CustomInput = <TFieldValues extends FieldValues>({
  control,
  name,
  password,
  rules,
  placeholder,
  iconName,
  keyboardType,
  onFocus,
  editable,
  defaultValue,
  mB,
  customStyle,
  inputProps,
  mutliline,
}: CustomInputProps<TFieldValues>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState<
    boolean | string | undefined
  >(password);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.container,
                {
                  borderColor: error
                    ? 'red'
                    : isFocused
                    ? appColors.white
                    : appColors.white,
                  marginBottom: mB,
                  backgroundColor: appColors.black,
                  height: mutliline
                    ? sizeBlock.getHeightSize(150)
                    : sizeBlock.getHeightSize(55),
                  borderRadius: mutliline
                    ? borderRadius.medium + 20
                    : borderRadius.full,
                },
                customStyle,
              ]}>
              {/*  */}
              {iconName && iconName !== 'user' && !isFocused && (
                <Icon
                  name={iconName}
                  style={{
                    color: appColors.gray,
                    fontSize: fontSize.medium - 5,
                    marginRight: sizeBlock.getWidthSize(10),
                  }}
                />
              )}

              {iconName === 'user' && !isFocused && (
                <UserIcon
                  name={iconName}
                  style={{
                    color: appColors.gray,
                    fontSize: fontSize.medium - 5,
                    marginRight: sizeBlock.getWidthSize(10),
                  }}
                />
              )}

              <Animatable.View
                transition={'top'}
                style={[
                  styles.animatedPlaceholder,
                  {
                    left: isFocused ? '10%' : '20%',
                    opacity: isFocused ? 1 : 0,
                    top: isFocused ? -sizeBlock.getHeightSize(10) : 0,
                  },
                ]}>
                <CustomText
                  color={appColors.white}
                  fontSize={fontSize.primary - 2}>
                  {placeholder}
                </CustomText>
              </Animatable.View>

              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  setIsFocused(false);
                }}
                defaultValue={defaultValue}
                editable={editable}
                secureTextEntry={showPassword ? true : false}
                placeholderTextColor={
                  isFocused ? appColors.black : appColors.gray
                }
                placeholder={placeholder}
                keyboardType={keyboardType}
                cursorColor={appColors.gray}
                autoCorrect={false}
                style={[styles.input]}
                onFocus={() => {
                  onFocus && onFocus();
                  setIsFocused(true);
                }}
                {...inputProps}
                multiline={mutliline}
                numberOfLines={5}
              />
              {password && (
                <EyeIcon
                  onPress={() => setShowPassword(!showPassword)}
                  style={{
                    width: fontSize.small,
                    transform: showPassword
                      ? [{rotate: '180deg'}]
                      : [{rotate: '0deg'}],
                  }}
                />
              )}
            </View>

            {error && (
              <Text style={styles.error}>{error.message || 'Error'}</Text>
            )}
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.black,
    width: '100%',
    borderRadius: borderRadius.full,
    paddingHorizontal: sizeBlock.getHeightSize(20),
    marginVertical: sizeBlock.getHeightSize(10),
    borderWidth: 1,
    height: sizeBlock.getHeightSize(55),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  label: {
    marginVertical: 1,
    fontSize: 12,
    color: appColors.black,
  },
  input: {
    flex: 1,
    color: appColors.white,
    height: screenHeight < 640 ? '90%' : '70%',
    borderBottomWidth: 0,
    fontFamily: fontFamily.regular,
    verticalAlign: 'top',
    fontSize: screenWidth < 300 ? fontSize.primary : fontSize.small,
  },
  error: {
    color: 'red',
    alignSelf: 'stretch',
    fontSize: 10,
    fontFamily: fontFamily.regular,
  },
  animatedPlaceholder: {
    paddingHorizontal: sizeBlock.getWidthSize(5),
    position: 'absolute',
    zIndex: 10,
    backgroundColor: appColors.black,
  },
  errorContainer: {
    minWidth: screenWidth * 0.7,
    height: sizeBlock.getHeightSize(40),
    backgroundColor: appColors.white,
    position: 'absolute',
    right: 0,
    top: sizeBlock.getHeightSize(20),
    borderTopLeftRadius: borderRadius.full,
    borderBottomLeftRadius: borderRadius.full,
    paddingHorizontal: sizeBlock.getWidthSize(20),
    borderRightWidth: sizeBlock.getWidthSize(5),
    borderColor: 'red',
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(10),
    zIndex: 10,
  },
});

export default CustomInput;
