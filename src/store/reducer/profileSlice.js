import {createSlice} from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",      // 将来通过 state.profile 来调用
  initialState: () => {
    return {
      profileOpen: false,   // 一开始 profile 用户界面是关闭的
    };
  },
  reducers: {     // 更新 Store 状态的纯函数
    closeMenu(state, action){
      if (action.payload === 'CLOSE_MENU'){
        // console.warn('action.payload', action.payload)
        state.profileOpen = false
      }
    },
    openMenu(state, action) {  // 状态切换
      if (action.payload === 'OPEN_MENU'){
        state.profileOpen = true
        // console.warn('action.payload', action.payload)
      }
      // state.profileOpen = !state.profileOpen
    },
  }
});

export const {closeMenu, openMenu} = profileSlice.actions;