import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgTrash(props) {
  return (
    <Svg
      width={18}
      height={24}
      viewBox="0 0 18 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M1.5 20.75c0 1.375 1.125 2.5 2.5 2.5h10c1.375 0 2.5-1.125 2.5-2.5V8.25c0-1.375-1.125-2.5-2.5-2.5H4a2.507 2.507 0 00-2.5 2.5v12.5zM16.5 2h-3.125l-.887-.887a1.26 1.26 0 00-.875-.363H6.388c-.325 0-.65.137-.875.363L4.625 2H1.5C.812 2 .25 2.563.25 3.25c0 .688.563 1.25 1.25 1.25h15c.688 0 1.25-.563 1.25-1.25 0-.688-.563-1.25-1.25-1.25z" />
    </Svg>
  );
}

export default SvgTrash;
