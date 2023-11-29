import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgSun(props) {
  return (
    <Svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M19 9.5a1.583 1.583 0 001.583-1.583V4.75a1.583 1.583 0 10-3.167 0v3.167A1.583 1.583 0 0019 9.5zM33.25 17.417h-3.167a1.583 1.583 0 100 3.167h3.167a1.583 1.583 0 100-3.167zM9.5 19a1.583 1.583 0 00-1.583-1.583H4.75a1.583 1.583 0 100 3.167h3.167A1.583 1.583 0 009.5 19zM9.848 7.917a1.602 1.602 0 00-2.2 2.328l2.28 2.2a1.619 1.619 0 102.3-2.28l-2.38-2.248zM26.917 12.888c.408-.001.8-.16 1.093-.443l2.28-2.2a1.583 1.583 0 00-2.138-2.328l-2.28 2.248a1.611 1.611 0 001.045 2.723zM19 28.5a1.583 1.583 0 00-1.583 1.583v3.167a1.583 1.583 0 103.167 0v-3.167A1.583 1.583 0 0019 28.5zM28.073 25.555a1.584 1.584 0 00-2.2 2.28l2.28 2.248a1.6 1.6 0 002.233-2.28l-2.313-2.248zM9.927 25.555l-2.28 2.2a1.601 1.601 0 102.2 2.327l2.28-2.2a1.584 1.584 0 00-2.2-2.28v-.047zM19 12.667a6.332 6.332 0 100 12.665 6.332 6.332 0 000-12.665zm0 9.5a3.167 3.167 0 110-6.334 3.167 3.167 0 010 6.334z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgSun;