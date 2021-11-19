// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

// A componente raiz é ./components/Main.js.

import merge from 'deepmerge';

import React from 'react';

import { Platform } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';

import AppLoading from 'expo-app-loading';

import { DateTimeProvider, createGlobals } from './lib';

import Main from './components/Main';

import GoogleFonts from './GoogleFonts';

import CustomDefaultTheme from './DefaultTheme';
import CustomDarkTheme from './DarkTheme';

import settings from './settings.json';

const entries = [];

for (const module of GoogleFonts) {
    const fonts = {};
    for (const [name, value] of Object.entries(module)) {
        if (name !== '__metadata__' && name !== 'useFonts') {
            fonts[name] = value;
        }
    }
    entries.push([module.useFonts, fonts]);
}

let theme;
if (settings.dark) {
    theme = merge.all([NavigationDarkTheme, PaperDarkTheme, CustomDarkTheme]);
} else {
    theme = merge.all([NavigationDefaultTheme, PaperDefaultTheme, CustomDefaultTheme]);
}
theme.screenOptions.headerTitleStyle.fontSize = Platform.OS === 'ios' ? 17 : 20;

export default function App() {
    const loaded = [];

    for (const [useFonts, fonts] of entries) {
        const [fontsLoaded] = useFonts(fonts);
        loaded.push(fontsLoaded);
    }

    return loaded.every(Boolean) ? createGlobals(
        <PaperProvider theme={theme}>
            <DateTimeProvider>
                <SafeAreaProvider>
                    <NavigationContainer theme={theme}>
                        <Main />
                    </NavigationContainer>
                </SafeAreaProvider>
            </DateTimeProvider>
        </PaperProvider>
    ) : (
        <AppLoading />
    );
}
