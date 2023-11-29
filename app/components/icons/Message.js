import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgMessage(props) {
  return (
    <Svg
      width={20}
      height={16}
      viewBox="0 0 20 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M17 0H3a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V3a3 3 0 00-3-3zm-.67 2L10 6.75 3.67 2h12.66zM17 14H3a1 1 0 01-1-1V3.25L9.4 8.8a1 1 0 001.2 0L18 3.25V13a1 1 0 01-1 1z" />
    </Svg>
  );
}

export default SvgMessage;
