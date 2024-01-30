import {StatusBar} from 'react-native';
import {appThemes} from './appConstants';

export const colors = {
  black: '#000000',
  fadeWhite: '#EEEEEE',
  callOptions: '#261C1C',

  placeHolderDark: '#666666',
  darkRed: '#5B3434',
  greyButtonBackground: '#EAEDED',
  listBgGrey: '#707070',
  white: '#FFFFFF',
  appPrimaryColor: '#EC0B39',
  rankingPink: '#F3C0CB',
  darkpink: '#ED224C',
  lightGrey: '#999999',
  inputPlaceHolder: '#474747',
  splitter: '#5B3434',

  fadeText: '#666666',

  // App background and text colors according to themes.
  backgroundColor: '#0E0808',
  backgroundLight: '#F6F6F6',
  backgroundDark: '#0E0808',
  textThemeColor: '#0E0808',

  themeModalBg: '#25282f',

  // Drawer screen color shades.
  drawerBackground: '#5B3434',
  drawerLight: '#EEEEEE',
  drawerDark: '#5B3434',

  drawerBottonline: '#876C6C',

  drawerText: '#F8F7F8',
  drawerTextDark: '#F8F7F8',
  DrawerTextLight: '#333333',

  DrawerUserName: '#EEEEEE',
  DrawerUserNameDark: '#EEEEEE',
  DrawerUserNameLight: '#5B3434',

  // Settings screen color shades.
  optionsBorderColor: '#707070',
  pathColor: '#5E5E5E',

  // CallLog List Home Screen.
  callLogBackgroundColor: '#161616',
  callLogBackgroundColorDark: '#161616',
  callLogBackgroundColorLight: '#EEEEEE',

  callLogTopTab: '#261C1C',
  callLogTopTabDark: '#261C1C',
  callLogTopTabLight: '#DEDEDE',

  callLogText: '#EEEEEE',
  callLogTextDark: '#EEEEEE',
  callLogTextLight: '#333333',
  callLogSubText: '#666666',

  callLogTitle: '#F8F7F8',
  callLogTitleDark: '#F8F7F8',
  callLogTitleLight: '#333333',
  callLogListSplitter: '#707070',

  // Notes colors
  noteBackgroundColor: '#EEEEEE',
  noteBorderColor: '#0E0808',

  secondaryTextColor: '#FFFFFF',
  appPrimaryLightColor: '#b3cce3',
  appSecondryLightColor: '#cfdab7',
  lightgrey: '#dddedb',
  inputBordergrey: '#d2d4cd',
  tabbackground: '#74B2AA',
  lightBackgroundGrey: '#F6F6F6',
  loaderRed: '#f2573e',
  loaderBlack: '#1b1919',
  graphViolet: '#8085E9',
  graphGreen: '#709f10',
  transparent: 'transparent',
  semiTransparent: '#00000070',
  orange: '#d35841',
  blue: '#010048',
  equityShow: '#A6CDC8',
  equitybg: '#86BBB2',
  sectorShow: '#9DACC3',
  sectorbg: '#788DAA',
  debtShow: '#92969F',
  debtbg: '#6A707C',
  placegrey: '#4D5764',
  graphReturn: '#59e5b6',
  graphInvest: '#258ec8',
  tabBarGreen: '#28a345',
  pistaGreen: '#73ba82',
  link: '#0645AD',
  whatsAppGreen: '#28a933',
  grayDark: '#444',
  grayLine: '#dbe1e9',
  buttonBlackbg: '#2f2828',
  positiveGreen: '#5fb956',
  greenBg: '#122732',
  blueWood: '#2a3d47',
  sanJuan: '#2F5265',
  aquaHaze: '#E3EDF0',
  gableGreen: '#0F2B25',
  athensGray: '#EFEFEF',
  ebonyClay: '#21313C',
  laPalma: '#218717',
  greenWhite: '#EBF0E7',
  limeade: '#639008',
  bizarre: '#F0E3DD',
  cloudBurst: '#243A54',
  regentGray: '#7F97A1',
  babyBlue: '#DAFEFF',
  malachite: '#0ECA6D',
  usEquityBlue: '#08377D',
  whisper: '#F7F8FB',
  funBlue: '#1F58AE',
};

export const updateConfigColors = (theme = 'dark') => {
  switch (theme) {
    case appThemes.dark:
      colors.backgroundColor = colors.backgroundDark;
      colors.textThemeColor = colors.backgroundLight;

      colors.drawerBackground = colors.drawerDark;
      colors.drawerText = colors.drawerTextDark;
      colors.DrawerUserName = colors.DrawerUserNameDark;

      colors.callLogBackgroundColor = colors.callLogBackgroundColorDark;
      colors.callLogText = colors.callLogTextDark;
      colors.callLogTitle = colors.callLogTitleDark;
      colors.callLogTopTab = colors.callLogTopTabDark;

      StatusBar.setBackgroundColor(colors.backgroundColor);
      StatusBar.setBarStyle('light-content');

      break;

    case appThemes.light:
      colors.backgroundColor = colors.backgroundLight;
      colors.textThemeColor = colors.backgroundDark;

      colors.drawerBackground = colors.drawerLight;
      colors.drawerText = colors.DrawerTextLight;
      colors.DrawerUserName = colors.DrawerUserNameLight;

      colors.callLogBackgroundColor = colors.callLogBackgroundColorLight;
      colors.callLogText = colors.callLogTextLight;
      colors.callLogTitle = colors.callLogTitleLight;
      colors.callLogTopTab = colors.callLogTopTabLight;

      StatusBar.setBackgroundColor(colors.backgroundColor);
      StatusBar.setBarStyle('dark-content');

      break;

    case appThemes.default:
      colors.backgroundColor = colors.backgroundDark;
      colors.textThemeColor = colors.backgroundLight;
      colors.callLogText = colors.callLogTextLight;

      colors.drawerBackground = colors.drawerDark;
      colors.drawerText = colors.drawerTextDark;
      colors.DrawerUserName = colors.DrawerUserNameDark;

      StatusBar.setBackgroundColor(colors.backgroundColor);
      StatusBar.setBarStyle('light-content');

      break;

    default:
      break;
  }
};
