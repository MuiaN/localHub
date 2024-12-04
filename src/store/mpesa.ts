import { create } from 'zustand';
import type { MpesaConfig } from '../types';

interface MpesaState {
  config: MpesaConfig;
  setConfig: (config: MpesaConfig) => void;
}

export const useMpesaStore = create<MpesaState>((set) => ({
  config: {
    serviceFeePercentage: 5, // 5% service fee
    adminMpesaNumber: '', // Will be set by admin
  },
  setConfig: (config) => set({ config }),
}));