import React, {useState, useEffect} from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from "react-native";
import styled from "styled-components/native";
import Card from "../components/Cards";
import Logo from "../components/Logo";
import { NotificationIcon } from "../components/Icons";
import Course from "../components/Course";
import UserProfile from "../components/UserProfile"
import { useNavigation } from "@react-navigation/native";

import {useDispatch, useSelector} from "react-redux";
import {closeMenu, openMenu } from "../store/reducer/profileSlice";
import Avatar from '../components/Avatar';
import Sectionscreen from './Sectionscreen';


export default function Homescreen () {
  const isOpen = useSelector(state => state.profile.profileOpen);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [scale, setScale] = useState(new Animated.Value(1));   // 缩放动画
  const [opacity, setOpacity] = useState(new Animated.Value(1));  // 透明度

  const handleAvatar = () => {
    if(isOpen){  // 说明此刻 modal is opening
      dispatch(closeMenu("CLOSE_MENU"));
    }else{
      dispatch(openMenu("OPEN_MENU"));
    }
  }

  useEffect(()=>{
    if(isOpen){
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 200,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }else{
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  },[isOpen])

  useEffect(() => {
    if (Platform.OS === "android") StatusBar.setHidden(false);
  }, []);
  console.log("StatusBar", StatusBar)
  return (
  // AnimatedContainer 替换 Container 实现动画
  <RootView>
    <UserProfile />
    <AnimatedContainer style={{ transform: [{scale: scale }], opacity: opacity }}>
      <SafeAreaView>        
        <ScrollView style={{ height: "100%" }}>
          <TitleBar >
            <TouchableOpacity onPress={handleAvatar} style={{ position: 'absolute', top: 0, left: 10, }} >
              <Avatar />
            </TouchableOpacity>
            <Title >Welcome back,</Title>
            <Name>Demian..</Name>
            <NotificationIcon
              style={{ position: "absolute", right: 20, top: 5 }}
            />
          </TitleBar>
          <ScrollView
            style={{
              flexDirection: "row",
              padding: 20,
              paddingLeft: 12,
              paddingTop: 30,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {logos.map((logo, index) => (
              <Logo key={index} image={logo.image} text={logo.text} />
            ))}
          </ScrollView>
          <Subtitle>{"Continue Learning".toUpperCase()}</Subtitle>
          <ScrollView
            horizontal={true}
            style={{ paddingBottom: 30 }}
            showsHorizontalScrollIndicator={false}
          >
            {cards.map((card, index) => (
              <TouchableOpacity key={index} 
                onPress={()=>{
                  navigation.navigate("Sectionscreen", {
                    section: card,
                  })
              }}>
                <Card
                  title={card.title}
                  image={card.image}
                  caption={card.caption}
                  logo={card.logo}
                  subtitle={card.subtitle}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Subtitle>{"Popular Courses".toUpperCase()}</Subtitle>
          {/* <ScrollView
            horizontal={true}
            style={{ paddingBottom: 30 }}
            showsHorizontalScrollIndicator={false}
          > */}
          {courses.map((course, index) => (
            <Course
              key={index}
              image={course.image}
              title={course.title}
              subtitle={course.subtitle}
              caption={course.caption}
              avatar={course.avatar}
              logo={course.logo}
              author={course.author}
            />
          ))}
          {/* </ScrollView> */}
        </ScrollView>
      </SafeAreaView>
    </AnimatedContainer>
  </RootView>

  );
};

const RootView = styled.View`
  background: black;
  flex: 1;
`

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;

  margin-top: 20px;
  text-transform: uppercase;
`;


const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  /* border-radius: 10px; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);  

//styc
const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const TitleBar = styled.View`
  /* border: red; */
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;
const logos = [
  {
    image: require("../../assets/logo-framerx.png"),
    text: "Framer X",
  },
  {
    image: require("../../assets/logo-figma.png"),
    text: "Figma",
  },
  {
    image: require("../../assets/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("../../assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("../../assets/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("../../assets/logo-sketch.png"),
    text: "Sketch",
  },
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../../assets/logo-react.png"),
  },
  {
    title: "Styled Components",
    image: require("../../assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 sections",
    logo: require("../../assets/logo-react.png"),
  },
  {
    title: "Props and Icons",
    image: require("../../assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 sections",
    logo: require("../../assets/logo-react.png"),
  },
  {
    title: "Static Data and Loop",
    image: require("../../assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 sections",
    logo: require("../../assets/logo-react.png"),
  },
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../../assets/background13.jpg"),
    logo: require("../../assets/logo-studio.png"),
    author: "Meng To",
    avatar: require("../../assets/avatar.jpg"),
    caption: "Design and interactive prototype",
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image: require("../../assets/background11.jpg"),
    logo: require("../../assets/logo-react.png"),
    author: "Meng To",
    avatar: require("../../assets/avatar.jpg"),
    caption: "Learn to design and code a React site",
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../../assets/background14.jpg"),
    logo: require("../../assets/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app",
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image: require("../../assets/background6.jpg"),
    logo: require("../../assets/logo-figma.png"),
    author: "Meng To",
    avatar: require("../../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool",
  },
];
