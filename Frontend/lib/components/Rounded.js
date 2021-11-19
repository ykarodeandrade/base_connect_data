// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import React, { useState } from 'react';

import { Platform } from 'react-native';

function MobileRounded(props) {
    const child = props.child;

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    function onLayout({ nativeEvent }) {
        setWidth(nativeEvent.layout.width);
        setHeight(nativeEvent.layout.height);
        if (child.props.onLayout) {
            child.props.onLayout({ nativeEvent });
        }
    }

    const radius = Math.min(width, height) * props.ratio;

    return React.cloneElement(child, {
        style: {
            ...child.props.style,
            borderRadius: radius,
            overflow: 'hidden',
        },
        onLayout: onLayout,
    });
}

export default function Rounded(props) {
    const child = React.Children.only(props.children);

    let radius;
    if (Number.isFinite(props.radius) && props.radius >= 0) {
        radius = props.radius;
    } else {
        radius = 50;
    }

    return Platform.OS === 'web' ? (
        React.cloneElement(child, {
            style: {
                ...child.props.style,
                borderRadius: `${radius}%`,
                overflow: 'hidden',
            },
        })
    ) : (
        <MobileRounded
            child={child}
            ratio={radius / 100}
        />
    );
}
