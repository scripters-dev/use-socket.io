import { useContext } from 'react';

import Context from './context';

export default function useSocket() {
    return useContext(Context);
}
