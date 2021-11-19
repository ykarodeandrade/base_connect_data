// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import React, { useState } from 'react';

import { Platform, View } from 'react-native';

function WebAspectView(props) {
    const [basis, setBasis] = useState(0);

    function onLayout({ nativeEvent }) {
        if (props.basis === 'height') {
            setBasis(nativeEvent.layout.height);
        } else {
            setBasis(nativeEvent.layout.width);
        }
        if (props.onLayout) {
            props.onLayout({ nativeEvent });
        }
    }

    const style = {};
    if (props.basis === 'height') {
        style.width = basis * props.ratio;
    } else {
        style.height = basis / props.ratio;
    }

    return (
        <View
            {...props}
            style={{
                ...props.style,
                ...style,
            }}
            onLayout={onLayout}
        >
            {props.children}
        </View>
    );
}

export default function AspectView(props) {
    let ratio;
    if (Number.isFinite(props.ratio) && props.ratio > 0) {
        ratio = props.ratio;
    } else {
        ratio = 1;
    }

    return Platform.OS === 'web' ? (
        <WebAspectView
            {...props}
            ratio={ratio}
        >
            {props.children}
        </WebAspectView>
    ) : (
        <View
            {...props}
            style={{
                ...props.style,
                aspectRatio: ratio,
            }}
        >
            {props.children}
        </View>
    );
}
