import {Platform} from 'react-native';

const FONTS = {
  ...Platform?.select({
    ios: {
      POPPINSBOLD: 'Poppins-Bold',
      POPPINSLIGHT: 'Poppins-Light',
      POPPINSMEDIUM: 'Poppins-Medium',
      POPPINSREGULAR: 'Poppins-Regular',
      POPPINSSEMIBOLD: 'Poppins-SemiBold',
    },
    android: {
      POPPINSBOLD: 'PoppinsBold',
      POPPINSLIGHT: 'PoppinsLight',
      POPPINSMEDIUM: 'PoppinsMedium',
      POPPINSREGULAR: 'PoppinsRegular',
      POPPINSSEMIBOLD: 'PoppinsSemiBold',
    },
  }),
};

export default FONTS;
