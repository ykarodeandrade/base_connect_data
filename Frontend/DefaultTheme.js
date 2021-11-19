import { Platform } from 'react-native';

export default {
    dark: false,
    roundness: 4,
    colors: {
        primary: '#6200ee',
        accent: '#03dac4',
        background: '#f6f6f6',
        surface: '#ffffff',
        card: 'rgb(255, 255, 255)',
        error: '#B00020',
        text: '#000000',
        disabled: 'rgba(0, 0, 0, 0.26)',
        placeholder: 'rgba(0, 0, 0, 0.54)',
        border: 'rgb(216, 216, 216)',
        backdrop: 'rgba(0, 0, 0, 0.5)',
        onSurface: '#000000',
        notification: '#f50057',
    },
    screenOptions: {
        headerStyle: {
            backgroundColor: '#6200ee',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
            color: '#ffffff',
        },
    },
    fonts: Platform.select({
        web: {
            regular: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '500',
            },
            light: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '300',
            },
            thin: {
                fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontWeight: '100',
            },
        },
        ios: {
            regular: {
                fontFamily: 'System',
                fontWeight: '400',
            },
            medium: {
                fontFamily: 'System',
                fontWeight: '500',
            },
            light: {
                fontFamily: 'System',
                fontWeight: '300',
            },
            thin: {
                fontFamily: 'System',
                fontWeight: '100',
            },
        },
        default: {
            regular: {
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
            },
            medium: {
                fontFamily: 'sans-serif-medium',
                fontWeight: 'normal',
            },
            light: {
                fontFamily: 'sans-serif-light',
                fontWeight: 'normal',
            },
            thin: {
                fontFamily: 'sans-serif-thin',
                fontWeight: 'normal',
            },
        },
    }),
    animation: {
        scale: 1.0,
    },
};
