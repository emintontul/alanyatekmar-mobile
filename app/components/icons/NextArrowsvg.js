import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgNextArrowsvg(props) {
  return (
    <Svg
      width={9}
      height={16}
      viewBox="0 0 9 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M2 15a1 1 0 01-.77-1.64L5.71 8 1.39 2.63A1.022 1.022 0 013 1.37l4.83 6a1 1 0 010 1.27l-5 6A1 1 0 012 15z" />
    </Svg>
  );
}

export default SvgNextArrowsvg;
