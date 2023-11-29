import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgSort(props) {
  return (
    <Svg
      width={37}
      height={28}
      viewBox="0 0 37 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 0a1.25 1.25 0 011.25 1.25v25a1.25 1.25 0 01-2.5 0v-25A1.25 1.25 0 016.5 0z"
        fill="#AAB2BA"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.385 20.365a1.25 1.25 0 010 1.77l-5 5a1.25 1.25 0 01-1.77 0l-5-5a1.252 1.252 0 011.77-1.77L6.5 24.483l4.115-4.118a1.25 1.25 0 011.77 0zM16.5 18.75a1.25 1.25 0 011.25-1.25h7.5a1.25 1.25 0 010 2.5h-7.5a1.25 1.25 0 01-1.25-1.25zm0-7.5A1.25 1.25 0 0117.75 10h12.5a1.25 1.25 0 010 2.5h-12.5a1.25 1.25 0 01-1.25-1.25zm0-7.5a1.25 1.25 0 011.25-1.25h17.5a1.25 1.25 0 010 2.5h-17.5a1.25 1.25 0 01-1.25-1.25zm0 22.5A1.25 1.25 0 0117.75 25h2.5a1.25 1.25 0 010 2.5h-2.5a1.25 1.25 0 01-1.25-1.25z"
        fill="#AAB2BA"
      />
    </Svg>
  );
}

export default SvgSort;
