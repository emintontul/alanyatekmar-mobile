import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgStar(props) {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M15.56 20a1 1 0 01-.46-.11L10 17.22l-5.1 2.67a1.001 1.001 0 01-1.45-1.06l1-5.63-4.12-4a.985.985 0 01.56-1.68l5.7-.83L9.1 1.56a1 1 0 011.8 0l2.54 5.12 5.7.83a.985.985 0 01.56 1.68l-4.12 4 1 5.63A.99.99 0 0115.56 20zM10 15.1a.919.919 0 01.46.11l3.77 2-.72-4.21a1.001 1.001 0 01.29-.89l3-2.93-4.2-.62a1 1 0 01-.71-.56L10 4.25 8.11 8a1 1 0 01-.75.54l-4.2.62 3 2.93a1 1 0 01.29.89l-.72 4.16 3.77-2a.92.92 0 01.5-.04z"
        fill="#1A1B1E"
      />
    </Svg>
  );
}

export default SvgStar;
