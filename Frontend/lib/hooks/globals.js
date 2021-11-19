// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import React, { useState, useContext, createContext } from 'react';

import globals from '../../globals.json';
import signals from '../../signals.json';

const signames = [];
const contexts = {};

function createGlobal(component, name, value) {
    const Context = createContext(null);
    const ContextProvider = function (props) {
        const state = useState(value);
        return (
            <Context.Provider value={state}>
                {props.children}
            </Context.Provider>
        );
    };
    contexts[name] = Context;
    return (
        <ContextProvider>
            {component}
        </ContextProvider>
    );
}

function createGlobals(component) {
    if (!(signals instanceof Array)) {
        throw new Error('Signals must be an array');
    }
    if (typeof globals !== 'object') {
        throw new Error('Globals must be an object');
    }
    for (const [index, signal] of signals.entries()) {
        if (typeof signal !== 'string') {
            throw new Error(`Signal ${index} must be a string`);
        }
        if (signal in globals) {
            throw new Error(`Signal '${signal}' cannot be a global`);
        }
        signames.push(signal);
        component = createGlobal(component, signal, false);
    }
    for (const [name, value] of Object.entries(globals)) {
        component = createGlobal(component, name, value);
    }
    return component;
}

function useGlobal(name) {
    if (!(name in contexts)) {
        throw new Error(`Global '${name}' does not exist`);
    }
    return useContext(contexts[name]);
}

function useSignalContext(name) {
    if (!signames.includes(name)) {
        throw new Error(`Signal '${name}' does not exist`);
    }
    return useContext(contexts[name]);
}

function useSignal(name) {
    const state = useSignalContext(name);
    return state[0];
}

function useEmit(name) {
    const [signal, setSignal] = useSignalContext(name);
    return () => setSignal(!signal);
}

export { createGlobals, useGlobal, useSignal, useEmit };
