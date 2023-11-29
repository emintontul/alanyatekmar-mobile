import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgTrade(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M16 0H2a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V2a2 2 0 00-2-2zm0 16H2V2h14v14zM6 14H4V9h2v5zm4 0H8V4h2v10zm4 0h-2V7h2v7z"
        fill="#AAB2BA"
      />
    </Svg>
  );
}

export default SvgTrade;
