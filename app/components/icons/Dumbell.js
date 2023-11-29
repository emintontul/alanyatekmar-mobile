import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgDumbell(props) {
  return (
    <Svg
      width={24}
      height={12}
      viewBox="0 0 24 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M23.2 5.2v1.6h-1.6V10H20v1.6h-2.4V6.8H6.4v4.8H4V10H2.4V6.8H.8V5.2h1.6V2H4V.4h2.4v4.8h11.2V.4H20V2h1.6v3.2h1.6z" />
    </Svg>
  );
}

export default SvgDumbell;
