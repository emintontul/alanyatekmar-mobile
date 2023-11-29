import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgCross(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M8.41 7l4.3-4.29a1.004 1.004 0 10-1.42-1.42L7 5.59l-4.29-4.3a1.004 1.004 0 00-1.42 1.42L5.59 7l-4.3 4.29a1.004 1.004 0 101.42 1.42L7 8.41l4.29 4.3a1.004 1.004 0 101.42-1.42L8.41 7z"
        fill="#1A1B1E"
      />
    </Svg>
  );
}

export default SvgCross;
