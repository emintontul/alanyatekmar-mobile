import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgBack(props) {
  return (
    <Svg
      width={8}
      height={15}
      viewBox="0 0 8 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M6.83 15a1 1 0 01-.78-.37l-4.83-6a1 1 0 010-1.27l5-6a1.001 1.001 0 111.54 1.28L3.29 8l4.32 5.36A1 1 0 016.83 15z" />
    </Svg>
  );
}

export default SvgBack;
