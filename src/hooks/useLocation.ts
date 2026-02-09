import { create } from 'zustand'
import type { LocationProps } from '../types/locationTypes.ts'

interface LocationStates {
    info: LocationProps[],
    ipInput: string,
    cleanIpInput: boolean,
    setInfo: (info: LocationProps[]) => void,
    setIpInput: (ipInput: string) => void,
    setCleanIpInput: (cleanIpInput: boolean) => void,
}

const useLocation = create<LocationStates>((set) => ({
    info: [],
    ipInput: "",
    cleanIpInput: false,
    setInfo: (info: LocationProps[]) => set({ info }),
    setIpInput: (ipInput: string) => set({ ipInput }),
    setCleanIpInput: (cleanIpInput: boolean) => set({  cleanIpInput }),
}));

export default useLocation