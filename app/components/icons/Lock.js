import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgLock(props) {
  return (
    <Svg
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M15 7h2a1 1 0 011 1v12a1 1 0 01-1 1H1a1 1 0 01-1-1V8a1 1 0 011-1h2V6a6 6 0 1112 0v1zM2 9v10h14V9H2zm6 4h2v2H8v-2zm-4 0h2v2H4v-2zm8 0h2v2h-2v-2zm1-6V6a4 4 0 10-8 0v1h8z" />
    </Svg>
  );
}

export default SvgLock;
