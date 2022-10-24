import React, { useState, useEffect, useCallback } from "react";
import { Animated, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { LogBox } from 'react-native';  // 忽略 Animated 那个烦人的警告
import styled from "styled-components/native";
import UserProfileItem from '../UserProfileItem';

import { useSelector, useDispatch } from "react-redux";
import {closeMenu, openMenu } from "../../store/reducer/profileSlice";

const screenHeight = Dimensions.get("window").height;
// console.warn('screenHeight', screenHeight)

const { height, width } = Dimensions.get("window");

export default function UserProfile() {
  const [top, setTop] = useState(new Animated.Value(height));

  const isOpen = useSelector(state => state.profile.profileOpen);
  const dispatch = useDispatch();

  // console.warn('toggle', toggle)   // "profileOpen": false
  // 获取 action 的构建器

  useEffect(() => {
    if (isOpen === false) {
      Animated.spring(top, {
        toValue: height,
      }).start();
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);  // 忽略 Animated 那个烦人的警告
    }

    if (isOpen === true) {
      Animated.spring(top, {
        toValue: 54,
      }).start();
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);  // 忽略 Animated 那个烦人的警告
    }
  }, [isOpen]);

  const handleCloseMenu = () => {
    dispatch(closeMenu("CLOSE_MENU"));
  }

  return(
      <AnimatedContainer style={{ top: top }}>
        <Cover>
          <Image source={require('../../../assets/background2.jpg')} />
        </Cover>
        
        <TouchableOpacity 
          onPress={handleCloseMenu} 
          style={{ position: "absolute", top: 120, left: "50%", marginLeft: -22 , zIndex: 1}}
        >
          <CloseView>
            <Ionicons name="checkmark" size={32} color="green" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {
            items.map((item, index) => (
              <UserProfileItem key={index} icon={item.icon} title={item.title} text={item.text} />
            ))
          }
        </Content>
      </AnimatedContainer>
  )
};


const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255,255,255, 0.5);  // 0.5 的不透明度
  margin-top: 8px;
`

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
`

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);


const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: #f0f3f5;
  padding: 50px;
`;


const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "settings",
  },
  {
    icon: "ios-card",
    title: "Billing",
    text: "payments",
  },
  {
    icon: "ios-compass",
    title: "Learn React",
    text: "start course",
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  },
];



/*
class UserProfile extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
    // useNativeDriver: true
  };

  componentDidMount() {
    Animated.spring(this.state.top, {
      toValue: 0,
    }).start();
  }
  toggleProfile = () => {
    Animated.spring(this.state.top, {
      toValue: screenHeight,
    }).start();
  }
  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require('../../../assets/background2.jpg')} />
        </Cover>
        
        <TouchableOpacity onPress={this.toggleProfile} style={{ position: "absolute", top: 120, left: "50%", marginLeft: -22 , zIndex: 1}}>
          <CloseView>
            <Ionicons name="checkmark" size={32} color="green" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {
            items.map((item, index) => (
              <UserProfileItem key={index} icon={item.icon} title={item.title} text={item.text} />
            ))
          }
        </Content>
      </AnimatedContainer>
    );
  }
}

// export default UserProfile;



*/