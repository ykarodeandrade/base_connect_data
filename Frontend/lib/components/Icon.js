// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import merge from 'deepmerge';

import React, { useState } from 'react';

import IconCore from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from 'react-native-paper';

export default function Icon(props) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    let theme = useTheme();
    if (props.theme) {
        theme = merge(theme, props.theme);
    }

    function onLayout({ nativeEvent }) {
        setWidth(nativeEvent.layout.width);
        setHeight(nativeEvent.layout.height);
        if (props.onLayout) {
            props.onLayout({ nativeEvent });
        }
    }

    return (
        <IconCore
            color={theme.colors.text}
            {...props}
            style={{
                flexGrow: 1,
                alignSelf: 'stretch',
                ...props.style,
            }}
            onLayout={onLayout}
            size={Math.min(width, height)}
        />
    );
}
