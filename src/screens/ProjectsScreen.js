import React, { useState, useEffect, useMemo } from "react";
import { PanResponder, Animated } from "react-native";
import styled from "styled-components/native";
import Project from "../components/Project";
import projects from "../data/projects";

import { store } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {closeMenu, openMenu } from "../store/reducer/profileSlice";


function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

export default function ProjectsScreen() {


  const [index, setIndex] = useState(0);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [maskOpacity, setMaskOpacity] = useState(new Animated.Value(0));
  const [scale, setScale] = useState(new Animated.Value(0.9));
  const [translateY, setTranslateY] = useState(new Animated.Value(44));
  const [thirdScale, setThirdScale] = useState(new Animated.Value(0.8));
  const [thirdTranslateY, setThirdTranslateY] = useState(
    new Animated.Value(-50)
  );

  // const action = store.getState().app.action;
  const isOpen = useSelector(state => state.profile.profileOpen);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          // if (store.getState().app.action === "openCard") {
          if (isOpen) {
          } else {
            return true;
          }
        }
      },
      onPanResponderGrant: () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false, //true
        }).start();

        Animated.spring(thirdScale, {
          toValue: 0.9,
          useNativeDriver: false, //true
        }).start();

        Animated.spring(thirdTranslateY, {
          toValue: 44,
          useNativeDriver: false, //true
        }).start();

        Animated.timing(maskOpacity, {
          toValue: 1,
          useNativeDriver: false, //true
        }).start();
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),

      onPanResponderRelease: () => {
        const positionY = pan.y.__getValue();

        Animated.timing(maskOpacity, {
          toValue: 0,
          useNativeDriver: false, //true
        }).start();

        if (positionY > 200) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            useNativeDriver: false, //true
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            scale.setValue(0.9);
            translateY.setValue(44);
            thirdScale.setValue(0.8);
            thirdTranslateY.setValue(-50);
            setIndex(getNextIndex(index));
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false, //true
          }).start();

          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: false, //true
          }).start();

          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: false, //true
          }).start();

          Animated.spring(thirdScale, {
            toValue: 0.8,
            useNativeDriver: false, //true
          }).start();

          Animated.spring(thirdTranslateY, {
            toValue: -50,
            useNativeDriver: false, //true
          }).start();
        }
      },
    });
  }, [index]);

  return (
    <Container>
      <AnimatedMask style={{ opacity: maskOpacity }} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Project
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
          canOpen={true}
        />
      </Animated.View>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: #f0f3f5;
  justify-content: center;
  align-items: center;
`;

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);