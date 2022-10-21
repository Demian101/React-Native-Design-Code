import React, { useState, useEffect } from "react";
import styled from "styled-components/native";


export default function Avatar() {
  const [photo, setPhoto] = useState(
    "http://imagesoda.oss-cn-beijing.aliyuncs.com/Sodaoo/2022-10-17-013200.jpg"
  );

  return <Image source={{ uri: photo }} />;
}


const Image = styled.Image`
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 22px;
  margin-left: 12px;
  position: absolute;
  top: 0px;
  left: 0px;
`;


// const Avatar = styled.Image`
//   width: 44px;
//   height: 44px;
//   background: black;
//   border-radius: 22px;
// margin-left: 20px;
// position: absolute;
// top: 0px;
// left: 0px;
// `;