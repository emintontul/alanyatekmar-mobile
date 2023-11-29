import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgUpload(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M5 6h14a1 1 0 100-2H5a1 1 0 100 2z" fill="#1A1B1E" />
      <Path
        d="M20 7V5a1 1 0 10-2 0v2a1 1 0 102 0zM6 7V5a1 1 0 00-2 0v2a1 1 0 002 0zM8 14a1 1 0 01-.6-1.8l4-3a1 1 0 011.18 0l4 2.82a1 1 0 01-1.16 1.63L12 11.24 8.6 13.8a1 1 0 01-.6.2z"
        fill="#1A1B1E"
      />
      <Path
        d="M12 21a1 1 0 01-1-1v-8a1 1 0 012 0v8a1 1 0 01-1 1z"
        fill="#1A1B1E"
      />
    </Svg>
  );
}

export default SvgUpload;
