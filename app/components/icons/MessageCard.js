import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgMessageCard(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M18 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h3v3.767L11.277 16H18c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2zm0 14h-7.277L7 16.233V14H2V2h16v12z" />
    </Svg>
  );
}

export default SvgMessageCard;
