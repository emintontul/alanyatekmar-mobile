import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgCloud(props) {
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
        d="M14.31 16.38L13 17.64V12a1 1 0 10-2 0v5.59l-1.29-1.3a1.005 1.005 0 00-1.714.71 1.004 1.004 0 00.294.71l3 3a1 1 0 001.4.01l3-2.9a1 1 0 10-1.38-1.44z"
        fill="#AAB2BA"
      />
      <Path
        d="M17.67 7A6 6 0 006.33 7a5 5 0 00-3.08 8.27A1 1 0 104.75 14 3 3 0 017 9h.1a1 1 0 001-.8 4 4 0 017.84 0 1 1 0 001 .8H17a3 3 0 012.25 5 1.003 1.003 0 001.5 1.33A5 5 0 0017.67 7z"
        fill="#AAB2BA"
      />
    </Svg>
  );
}

export default SvgCloud;
