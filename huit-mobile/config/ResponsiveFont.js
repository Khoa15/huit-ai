import React from 'react';
import { PixelRatio, Platform } from 'react-native';
import { deviceWidth } from './Dimension';

const pixelRatio = PixelRatio.get();

const responsiveFont = size => {
    return parseInt(size) * deviceWidth / (Platform.OS === 'ios' ? 375 : 400)
};
export default responsiveFont;
