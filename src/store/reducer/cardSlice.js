import {createSlice} from "@reduxjs/toolkit";

// 针对滑动卡片的开合状态
export const cardSlice = createSlice({
  name: "card",      // 将来通过 state.card 来调用
  initialState: () => {
    return {
      cardOpen: false,   // 一开始卡片是关闭的
    };
  },
  reducers: {     // 更新 Store 状态的纯函数
    closeCard(state, action){
      if (action.payload === 'CLOSE_CARD'){
        // console.warn('action.payload', action.payload)
        state.cardOpen = false
      }
    },
    openCard(state, action) {  // 状态切换
      if (action.payload === 'OPEN_CARD'){
        state.cardOpen = true
        // console.warn('action.payload', action.payload)
        // state.cardOpen = !state.profileOpen
    }
    },
  }
});

export const {closeCard, openCard} = cardSlice.actions;