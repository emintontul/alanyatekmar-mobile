import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgClose(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M8 .5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm2.033 8.467a.753.753 0 01-1.066 1.066L8 9.056l-.968.976a.753.753 0 01-1.064-1.066L6.942 8l-.974-.968a.753.753 0 011.064-1.064L8 6.942l.967-.974a.753.753 0 011.066 1.064L9.056 8l.976.967z"
        fill="#AAB2BA"
      />
    </Svg>
  );
}

export default SvgClose;
