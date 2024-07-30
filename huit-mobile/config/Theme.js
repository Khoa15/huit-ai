import { Platform } from 'react-native';
import responsiveFont from './ResponsiveFont';

const colors = {
    primary: '#E8F8FF',
    white: '#ffffff',
    pink: '#FF5A80',
    pinkLighter: '#FFECEE',
    black: '#1E272E'
};

const fontSize = {
    base: responsiveFont(16),
    small: responsiveFont(14),
    medium: responsiveFont(24),
    large: responsiveFont(28),
    larger: responsiveFont(32),
};

const stylesBase = {
    paddingContainer: 20,
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.9)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 15,
            },
            android: {
                elevation: 1,
            }
        })
    },
    alignMiddle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLogo: {
        alignSelf: 'center',
        width: 115,
        height: 17
    },
    backIcon: {
        width: 15,
        height: 17
    },
    fingerprintIcon: {
        width: 16.33,
        height: 16.63
    }
};

export { colors, fontSize, stylesBase };
