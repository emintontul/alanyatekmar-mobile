import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgSearch(props) {
  return (
    <Svg
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M17.71 16.29l-3.4-3.39A7.92 7.92 0 0016 8a8 8 0 10-8 8 7.92 7.92 0 004.9-1.69l3.39 3.4a1.004 1.004 0 001.42-1.42zM2 8a6 6 0 1112 0A6 6 0 012 8z"
        fill="#1A1B1E"
      />
    </Svg>
  );
}

export default SvgSearch;
