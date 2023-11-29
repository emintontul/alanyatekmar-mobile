import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgChat(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M5.291 18.824L.001 20l1.175-5.291a9.995 9.995 0 114.115 4.115zm.29-2.113l.653.35a8 8 0 10-3.294-3.295l.35.653-.656 2.947 2.947-.655zM5.001 10h2a3 3 0 006 0h2a5 5 0 01-10 0z" />
    </Svg>
  );
}

export default SvgChat;
