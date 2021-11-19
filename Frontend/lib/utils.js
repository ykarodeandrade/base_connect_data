// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import React, { Fragment } from 'react';

function map(items, callback) {
    return items.map((item, key) => <Fragment key={key}>{callback(item)}</Fragment>);
}

export { map };
