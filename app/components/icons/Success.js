import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgSuccess(props) {
  return (
    <Svg
      width={17}
      height={13}
      viewBox="0 0 17 9"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M5.86 13a1 1 0 01-.73-.32L.27 7.51a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z" />
    </Svg>
  );
}

export default SvgSuccess;
