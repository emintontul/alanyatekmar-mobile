import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

function SvgMenu(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M9 3H5a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2z"
        fill="url(#menu_svg__paint0_linear)"
      />
      <Path
        d="M19 3h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2V5a2 2 0 00-2-2z"
        fill="url(#menu_svg__paint1_linear)"
      />
      <Path
        d="M9 13H5a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z"
        fill="url(#menu_svg__paint2_linear)"
      />
      <Path
        d="M19 13h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z"
        fill="url(#menu_svg__paint3_linear)"
      />
      <Defs>
        <LinearGradient
          id="menu_svg__paint0_linear"
          x1={7}
          y1={3}
          x2={7}
          y2={11}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3078F1" />
          <Stop offset={1} stopColor="#0059EF" />
        </LinearGradient>
        <LinearGradient
          id="menu_svg__paint1_linear"
          x1={17}
          y1={3}
          x2={17}
          y2={11}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3078F1" />
          <Stop offset={1} stopColor="#0059EF" />
        </LinearGradient>
        <LinearGradient
          id="menu_svg__paint2_linear"
          x1={7}
          y1={13}
          x2={7}
          y2={21}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3078F1" />
          <Stop offset={1} stopColor="#0059EF" />
        </LinearGradient>
        <LinearGradient
          id="menu_svg__paint3_linear"
          x1={17}
          y1={13}
          x2={17}
          y2={21}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#3078F1" />
          <Stop offset={1} stopColor="#0059EF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgMenu;
