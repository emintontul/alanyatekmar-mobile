import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgPencil(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M20.25 4.175L16.825.75A2.5 2.5 0 0013.5.662L2.25 11.912a2.5 2.5 0 00-.712 1.513L1 18.637A1.25 1.25 0 002.25 20h.112l5.213-.475a2.5 2.5 0 001.513-.713l11.25-11.25a2.4 2.4 0 00-.088-3.387zM16 8.35L12.65 5l2.438-2.5L18.5 5.912 16 8.35z" />
    </Svg>
  );
}

export default SvgPencil;
