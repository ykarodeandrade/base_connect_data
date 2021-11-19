import React from 'react';

import { View } from 'react-native';

import { Text } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';

import styles from '../styles/Main.json';

export default function Main(props) {
    return (
        <View style={styles.container}>
            <Text>Abra Main.js para começar a trabalhar no seu app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}
