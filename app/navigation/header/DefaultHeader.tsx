/* eslint-disable react-native/no-inline-styles */

import {i18n} from '@/lang/i18';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNavigationOptions = (props: any) => {
  const {screen} = props;

  const options = {
    // headerRight: () => <HeaderRight {...props} />,
    headerStyle: {},
    headerTitle: i18n?.isInitialized ? i18n?.t(screen.title) : '',
    // headerBackTitleVisible: false,
    headerTruncatedBackTitle: '',
    headerBackImageStyle: {},
    headerBackTitleStyle: {
      fontSize: 15,
    },
    headerRightContainerStyle: {},
    headerLeftContainerStyle: {},
    headerTitleStyle: {
      fontSize: 15,
    },
  };

  return screen.headerShown ? options : {headerShown: false};
};
