import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgDown(props) {
  return (
    <Svg
      width={6}
      height={4}
      viewBox="0 0 6 4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M.29.617l2.565 2.975a.195.195 0 00.29 0L5.71.617c.095-.11.01-.273-.144-.273H.434C.28.344.194.506.29.617z"
        fill="#E00D0D"
      />
    </Svg>
  );
}

export default SvgDown;
