import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgCopy(props) {
  return (
    <Svg
      width={17}
      height={20}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M12.334.833h-10C1.417.833.667 1.583.667 2.5v11.667h1.667V2.5h10V.833zm2.5 3.334H5.667C4.75 4.167 4 4.917 4 5.833V17.5c0 .917.75 1.667 1.667 1.667h9.167c.916 0 1.666-.75 1.666-1.667V5.833c0-.916-.75-1.666-1.666-1.666zm0 13.333H5.667V5.833h9.167V17.5z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgCopy;
