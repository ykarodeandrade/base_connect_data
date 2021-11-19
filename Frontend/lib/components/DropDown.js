// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import React, { useState } from 'react';

import DropDownCore from 'react-native-paper-dropdown';

export default function DropDown(props) {
    const [open, setOpen] = useState(false);

    function onDismiss() {
        setOpen(false);
        if (props.onDismiss) {
            props.onDismiss();
        }
    }

    function showDropDown() {
        setOpen(true);
        if (props.showDropDown) {
            props.showDropDown();
        }
    }

    const touchableStyle = { ...props.touchableStyle };
    const style = { ...props.style };

    return (
        <DropDownCore
            touchableProps={{
                style: {
                    ...touchableStyle,
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch',
                    margin: style.margin,
                    marginTop: style.marginTop,
                    marginRight: style.marginRight,
                    marginBottom: style.marginBottom,
                    marginLeft: style.marginLeft,
                    padding: 0,
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    overflow: 'visible',
                },
                onFocus: props.onFocus,
                onBlur: props.onBlur,
                borderless: props.borderless,
                background: props.background,
                centered: props.centered,
                disabled: props.disabled,
                rippleColor: props.rippleColor,
                underlayColor: props.underlayColor,
                theme: props.theme,
            }}
            viewProps={{
                style: {
                    flexGrow: 1,
                    flexDirection: touchableStyle.flexDirection,
                    flexWrap: touchableStyle.flexWrap,
                    justifyContent: touchableStyle.justifyContent,
                    alignItems: touchableStyle.alignItems,
                    padding: touchableStyle.padding,
                    paddingTop: touchableStyle.paddingTop,
                    paddingRight: touchableStyle.paddingRight,
                    paddingBottom: touchableStyle.paddingBottom,
                    paddingLeft: touchableStyle.paddingLeft,
                    overflow: touchableStyle.overflow,
                },
            }}
            inputProps={{
                style: {
                    ...props.style,
                    margin: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                },
                disabled: props.disabled,
                error: props.error,
                selectionColor: props.selectionColor,
                underlineColor: props.underlineColor,
                activeUnderlineColor: props.activeUnderlineColor,
                outlineColor: props.outlineColor,
                activeOutlineColor: props.activeOutlineColor,
                dense: props.dense,
                multiline: false,
                numberOfLines: 1,
                editable: false,
            }}
            iconProps={{
                disabled: props.disabled,
                theme: props.theme,
            }}
            visible={open}
            multiSelect={props.multiSelect}
            onDismiss={onDismiss}
            showDropDown={showDropDown}
            value={props.value}
            setValue={props.setValue}
            label={props.label}
            placeholder={props.placeholder}
            mode={props.mode}
            list={props.list}
            dropDownContainerMaxHeight={props.dropDownContainerMaxHeight}
            dropDownContainerHeight={props.dropDownContainerHeight}
            activeColor={props.activeColor}
            theme={props.theme}
            dropDownStyle={props.dropDownStyle}
            dropDownItemSelectedTextStyle={props.dropDownItemSelectedTextStyle}
            dropDownItemSelectedStyle={props.dropDownItemSelectedStyle}
            dropDownItemStyle={props.dropDownItemStyle}
            dropDownItemTextStyle={props.dropDownItemTextStyle}
        />
    );
}
