import { createContext, useContext, useState } from 'react';

type DnDContextType = [string | null, (type: string | null) => void];
const DnDContext = createContext<DnDContextType>([null, (_: string | null) => {}]);

export const DnDProvider = ({ children }) => {
    const [type, setType] = useState<string | null>(null);

    return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export const useDnD = () => {
    return useContext(DnDContext);
};

export default DnDContext;

