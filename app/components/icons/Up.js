import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgUp(props) {
  return (
    <Svg
      width={6}
      height={4}
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M5.71 3.383L3.145.408a.195.195 0 00-.29 0L.29 3.383c-.095.11-.01.273.144.273h5.132c.154 0 .24-.162.144-.273z"
        fill="#14C75A"
      />
    </Svg>
  );
}

export default SvgUp;
