import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgUsersLine(props) {
  return (
    <Svg
      width={23}
      height={21}
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M15 6.75a.75.75 0 01.75-.75h6a.75.75 0 110 1.5h-6a.75.75 0 01-.75-.75zm.75 3.75a.75.75 0 000 1.5h6a.75.75 0 100-1.5h-6zm3 4.5a.75.75 0 000 1.5h3a.75.75 0 100-1.5h-3zm0 4.5a.75.75 0 100 1.5h3a.75.75 0 000-1.5h-3zM16 21h-2v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2H0v-2a5 5 0 015-5h6a5 5 0 015 5v2zm-8-9A6 6 0 118 0a6 6 0 010 12zm0-2a4 4 0 100-8 4 4 0 000 8z"
        fill="#AAB2BA"
      />
    </Svg>
  );
}

export default SvgUsersLine;
