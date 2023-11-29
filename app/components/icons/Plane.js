import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgPlane(props) {
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
        d="M21 4a1.32 1.32 0 00-.06-.27v-.09a.885.885 0 00-.49-.49h-.09a.861.861 0 00-.31-.15H20a1 1 0 00-.3 0l-18 6a1 1 0 000 1.9l8.53 2.84 2.84 8.53a1 1 0 001.9 0l6-18c.022-.088.032-.179.03-.27zm-4.7 2.29l-5.57 5.57L5.16 10 16.3 6.29zM14 18.84l-1.86-5.57 5.57-5.57L14 18.84z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgPlane;
