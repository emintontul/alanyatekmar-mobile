import * as React from 'react';
import Svg, { ClipPath, G, Path } from 'react-native-svg';

function EnglishFlag(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"
      width={18}
      height={20}
      className="''"
      {...props}>
      <ClipPath id="s">
        <Path d="M0,0 v30 h60 v-30 z" />
      </ClipPath>
      <ClipPath id="t">
        <Path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </ClipPath>
      <G clipPath="url(#s)">
        <Path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <Path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <Path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <Path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <Path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </G>
    </Svg>


  );
}

export default EnglishFlag;
