import React, { useEffect } from "react";
import styled from "styled-components/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar, Linking } from "react-native";
import Markdown from "react-native-showdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlayIcon } from "../components/Icons";

export default function Sectionscreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const section = route.params.section;

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    return StatusBar.setBarStyle("dark-content", true);
  }, []);

  return (
    <>
      
      {/* <Title> 11 </Title> */}
      
      <ScrollContainer>
        <Container>
          <Cover>
            <Image source={section.image} />
            
            <PlayWrapper>
              
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  // navigation.navigate("Video");
                }}
              >
                <PlayView>
                  <PlayIcon style={{ marginLeft: -10 }} />
                </PlayView>
              </TouchableOpacity>
              
            </PlayWrapper>
            
            <Wrapper>
              <Logo source={section.logo} />
              <Subtitle>{section.subtitle}</Subtitle>
            </Wrapper>
            <Title>{section.title}</Title>
            <Caption>{section.caption}</Caption>
             
          </Cover>
          <CloseView onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-close"
              size={36}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
          {/* <Content>
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
              onNavigationStateChange={(event) => {
                if (event.url != "about:blank") {
                  Linking.openURL(event.url);
                }
              }}
            />
          </Content> */}
        </Container>
      </ScrollContainer>
      <StatusBar hidden />
    </>
  );
};

const htmlStyles = `
    * {
      font-family: -apple-system, Roboto;
      margin: 0;
      padding: 0;
      font-size: 17px;
      font-weight: normal;
      color: #3c4560;
      line-height: 24px;
    }
    h2 {
      font-size: 20px;
      text-transform: uppercase;
      color: #b8bece;
      font-weight: 600;
      margin-top: 50px;
    }
  
    p {
      margin-top: 20px;
    }
  
    a {
      color: #4775f2;
      font-weight: 600;
      text-decoration: none;
    }
  
    strong {
      font-weight: 700;
    }
    img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
    pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
      margin-top: 20px;
    }
    
    code {
      color: white;
    }
`;


const Container = styled.View`
  flex: 1;
  background: #fff;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 20px;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: 700;
  width: 170px;
  position: absolute;
  top: 88px;
  left: 20px;
`;

const Caption = styled.Text`
  color: #fff;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`;

const CloseView = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Content = styled.View`
  height: 1100px;
  padding: 20px;
`;

const PlayWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
`;

const PlayView = styled.View`
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;