import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SidebarState {
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: true,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
    close: (state) => {
      state.isOpen = false;
    }
  },
})

export const { toggle, close } = sidebarSlice.actions

export default sidebarSlice.reducer