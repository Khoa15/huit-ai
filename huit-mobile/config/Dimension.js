import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const bottomTabHeight = 50;
const statusBarHeight = (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight;

const deviceWidth = width;
const deviceHeight = height;

const contentNoneHeaderHeight = deviceHeight - statusBarHeight - bottomTabHeight;

const widthPercentageToDP = widthPercent => {
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(deviceWidth * elemWidth / 100);
};

const heightPercentageToDP = heightPercent => {
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(deviceWidth * elemHeight / 100);
};

export {
    deviceWidth,
    deviceHeight,
    bottomTabHeight,
    statusBarHeight,
    contentNoneHeaderHeight,
    widthPercentageToDP,
    heightPercentageToDP
};
