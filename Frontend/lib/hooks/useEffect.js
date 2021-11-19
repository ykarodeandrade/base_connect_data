// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import { useEffect as useEffectCore } from 'react';

export default function useEffect(create, deps) {
    useEffectCore(() => {
        let mounted = true;
        let inst;
        if (mounted) {
            inst = create();
        }
        return () => {
            if (inst) {
                inst();
            }
            mounted = false;
        };
    }, deps);
}
