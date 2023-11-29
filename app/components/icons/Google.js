import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgGoogle(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M12.243 10.285v4.113h6.946c-.283 1.765-2.1 5.175-6.946 5.175-4.176 0-7.588-3.39-7.588-7.574 0-4.183 3.41-7.574 7.588-7.574 2.379 0 3.973.989 4.882 1.848l3.32-3.136C18.313 1.186 15.551 0 12.243 0 5.476 0 0 5.363 0 12s5.476 12 12.243 12C19.309 24 24 19.133 24 12.274c0-.79-.088-1.39-.195-1.988l-11.562-.001z" />
    </Svg>
  );
}

export default SvgGoogle;
