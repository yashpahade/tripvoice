import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  activeServiceTab: 'flights',
  promoStripDismissed: false,
  loginModalOpen: false,
  searchDrawerOpen: false,
  currency: 'INR',
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state, action) => {
      state.mobileMenuOpen = action.payload !== undefined ? action.payload : !state.mobileMenuOpen;
    },
    setActiveServiceTab: (state, action) => {
      state.activeServiceTab = action.payload;
    },
    dismissPromoStrip: (state) => {
      state.promoStripDismissed = true;
    },
    toggleLoginModal: (state, action) => {
      state.loginModalOpen = action.payload !== undefined ? action.payload : !state.loginModalOpen;
    },
    toggleSearchDrawer: (state, action) => {
      state.searchDrawerOpen = action.payload !== undefined ? action.payload : !state.searchDrawerOpen;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { 
  toggleMobileMenu, 
  setActiveServiceTab, 
  dismissPromoStrip, 
  toggleLoginModal, 
  toggleSearchDrawer,
  setCurrency,
  setLanguage
} = uiSlice.actions;

export default uiSlice.reducer;
