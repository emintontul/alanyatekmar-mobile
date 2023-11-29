import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgNotification(props) {
  return (
    <Svg
      width={18}
      height={21}
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        d="M17.52 13.21l-1.8-1.81V6.94A6.86 6.86 0 009.9.06a6.74 6.74 0 00-7.62 6.67v4.67l-1.8 1.81A1.64 1.64 0 001.64 16H5v.34A3.84 3.84 0 009 20a3.84 3.84 0 004-3.66V16h3.36a1.64 1.64 0 001.16-2.79zM11 16.34A1.88 1.88 0 019 18a1.88 1.88 0 01-2-1.66V16h4v.34zM2.51 14l1.18-1.18a2 2 0 00.59-1.42V6.73A4.73 4.73 0 015.9 3.17 4.67 4.67 0 019.64 2a4.86 4.86 0 014.08 4.9v4.5a2.001 2.001 0 00.58 1.42L15.49 14H2.51z"
        fill="#1A1B1E"
      />
    </Svg>
  );
}

export default SvgNotification;
