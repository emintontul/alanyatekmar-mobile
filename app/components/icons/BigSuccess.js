import * as React from 'react';
import Svg, {Circle, G, Path, Defs, ClipPath} from 'react-native-svg';

function SvgBigSuccess(props) {
  return (
    <Svg
      width={142}
      height={142}
      viewBox="0 0 142 142"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Circle cx={71} cy={71} r={69} stroke="#14C75A" strokeWidth={4} />
      <G clipPath="url(#big-success_svg__clip0)">
        <Path
          d="M98.043 37.29L63.05 83.425 42.362 62.752l-9.547 9.546 31.816 31.815 44.554-57.277-11.142-9.546z"
          fill="#14C75A"
        />
      </G>
      <Defs>
        <ClipPath id="big-success_svg__clip0">
          <Path
            fill="#fff"
            transform="translate(32.815 32.815)"
            d="M0 0h76.37v76.37H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgBigSuccess;
