// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import 'react-native-get-random-values';

import { nanoid } from 'nanoid';

import { useState } from 'react';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export default function useStorage(uri) {
    const [file, setFile] = useState({
        loading: false,
        valid: true,
        uri: uri,
    });

    function pick(type) {
        setFile({
            loading: true,
            valid: file.valid,
            uri: file.uri,
        });

        DocumentPicker.getDocumentAsync({ type: type, copyToCacheDirectory: false })
            .then((document) => {
                if (document.type === 'cancel') {
                    setFile({
                        loading: false,
                        valid: true,
                        uri: file.uri,
                    });
                } else {
                    if (document.uri.startsWith('data:')) {
                        setFile({
                            loading: false,
                            valid: true,
                            uri: document.uri,
                        });
                    } else {
                        const tempUri = `${FileSystem.cacheDirectory}${nanoid()}`;
                        FileSystem.copyAsync({ from: document.uri, to: tempUri })
                            .then(() => {
                                FileSystem.readAsStringAsync(tempUri, { encoding: FileSystem.EncodingType.Base64 })
                                    .then((data) => {
                                        setFile({
                                            loading: false,
                                            valid: true,
                                            uri: `data:${document.mimeType};base64,${data}`,
                                        });
                                    });
                            });
                    }
                }
            })
            .catch(() => {
                setFile({
                    loading: false,
                    valid: false,
                    uri: file.uri,
                });
            });
    }

    return { pick, file };
}
