import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgPlusCircle(props) {
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
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16.001A8 8 0 0112 20z"
        fill="#0059EF"
      />
      <Path
        d="M15 11h-2V9a1 1 0 00-2 0v2H9a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2z"
        fill="#0059EF"
      />
    </Svg>
  );
}

export default SvgPlusCircle;
