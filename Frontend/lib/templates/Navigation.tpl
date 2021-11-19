import React from 'react';

{import}

import { useTheme } from 'react-native-paper';

import styles from '{prefix}/{suffix}/{name}.json';

{create}

export default function {name}(props) {
    const theme = useTheme();

    return (
        <{type}.Navigator initialRouteName="" screenOptions={theme.screenOptions}>
        </{type}.Navigator>
    );
}
