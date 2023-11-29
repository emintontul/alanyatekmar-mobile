import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgApple(props) {
  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="''"
      {...props}>
      <Path d="M17 8a5.268 5.268 0 00-7-2V1H8v5a5.268 5.268 0 00-7 2c-2 3 3 12 5 12s2-1 3-1 1 1 3 1 7-9 5-12zm-1.75 3.38c-.62 2.47-1.84 4.74-3.55 6.62-.2 0-.43-.1-.6-.25a3.34 3.34 0 00-4.2 0c-.17.15-.4.25-.6.25a15.267 15.267 0 01-3.55-6.61c-.25-.73-.3-1.52-.09-2.27A3.37 3.37 0 015.5 7.4c.56.01 1.11.14 1.61.39l.89.45h2l.89-.45c.5-.25 1.05-.38 1.61-.39 1.18.03 2.26.68 2.84 1.71.21.75.16 1.54-.09 2.27zM8 3C2.38 6.07 1.11 1.78 1.11 1.78S3.77-1.81 8 3z" />
    </Svg>
  );
}

export default SvgApple;
