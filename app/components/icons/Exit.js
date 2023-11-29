import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgExit(props) {
  return (
    <Svg
      width={22}
      height={20}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M5 9h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 100-12H4a10 10 0 110 12z"
        fill="#AAB2BA"
      />
    </Svg>
  );
}

export default SvgExit;
