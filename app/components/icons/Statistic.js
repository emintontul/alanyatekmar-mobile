import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgStatistic(props) {
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M2 0v16h16v2H0V0h2zm15.293 3.293l1.414 1.414L13 10.414l-3-3-4.293 4.293-1.414-1.414L10 4.586l3 3 4.293-4.293z"
        fill="#1A1B1E"
      />
    </Svg>
  );
}

export default SvgStatistic;
