import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Modal,
  Image,
} from 'react-native';
import {fonts} from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';
import {colors} from '../../constants/colors';
import {layout} from '../../assets/constants/layout';
import {showToast} from '../../utils/helpers/toast';
import {CustomTextInput} from '../customTextInput';

const dropDownStyles = () =>
  StyleSheet.create({
    screenContainer: {
      width: layout.window.width,
      height: layout.window.height,
      backgroundColor: '#00000090',
      position: 'absolute',
      alignItems: 'flex-start',
      justifyContent: 'center',
      zIndex: 10,
    },
    touchableContianer: {
      width: layout.window.width,
      height: layout.window.height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContainer: {
      width: layout.window.width * 0.8,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#F2F2F2',
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'lightgrey',
      marginHorizontal: 5,
    },
    topView: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical: 8,
      backgroundColor: colors.appPrimaryColor,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgrey',
    },
    categoryInfoView: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    selectCategoryText: {
      paddingLeft: 5,
      color: 'white',
      fontSize: 16,
      fontFamily: 'Gilroy-Medium',
      textAlign: 'center',
      marginVertical: 3,
      backgroundColor: 'transparent',
    },
    closeView: {
      position: 'absolute',
      right: 0,
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeTouchable: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    closeText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      fontFamily: fonts.ClanProNews,
    },
    listContainer: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'white',
    },
    listStyle: {
      alignSelf: 'stretch',
      maxHeight: layout.window.height * 0.6,
    },
    rowStyle: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      borderBottomColor: colors.lightgrey,
      borderBottomWidth: 1,
    },
    rowText: {
      flex: 1,
      color: colors.black,
      fontSize: fontSize.TwelvePoint,
      fontFamily: fonts.ClanProNews,
      textAlign: 'left',
      marginRight: 5,
      marginVertical: 10,
      paddingLeft: 3,
    },
    imageStyles: {
      height: 10,
      width: 10,
      tintColor: '#000',
      marginHorizontal: 6,
    },
    inputMainView: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.inputBordergrey,
      marginTop: 5,
    },
    selectedTextStyle: {
      flex: 1,
      color: colors.grey,
      fontSize: fontSize.ThirteenPoint,
      fontFamily: fonts.ClanProNews,
      marginVertical: 10,
    },
    headerText: {
      color: colors.black,
      fontFamily: fonts.ClanProNews,
      fontSize: fontSize.FourteenPoint,
      alignSelf: 'stretch',
    },
    leftImageStyles: {
      marginLeft: 5,
    },
  });

class CustomDropDown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: props.showModal,
      searchText: '',
    };
  }

  addBackHandlerListener() {
    // Add Android back handler
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      this.handleBackPress(),
    );
  }

  removeBackHandlerListener() {
    // Remove Android back handler
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  handleBackPress() {
    if (!this.state.showModal) {
      return false;
    }
    this.closeModal();
    return true;
  }

  openModal() {
    const {isEnable, listData, emptyMessage} = this.props;

    if (!isEnable) {
      return;
    }
    if (listData.length === 0) {
      if (emptyMessage) {
        showToast(emptyMessage);
      } else {
        showToast('List not available');
      }
      return;
    }
    this.addBackHandlerListener();
    this.setState({showModal: true});
  }

  closeModal() {
    this.removeBackHandlerListener();
    this.setState({showModal: false, searchText: ''});
    this.props.close();
  }

  render() {
    const styles = dropDownStyles();
    const {props} = this;
    const {
      listData,
      placeholderText,
      selectorText,
      inputViewStyles,
      textStyles,
      showHeader,
      showSearchBar,
      defaultSearchTextLength,
      dropdownContainerStyle,
      title,
      onSelectOption,
      shouldUseFilterForSearch,
    } = props;
    const {showModal, searchText} = this.state;
    let color = 'grey';

    if (selectorText || typeof selectorText === 'number') {
      color = 'black';
    }

    // Searching functionality
    let filteredList = listData.slice();

    if (showSearchBar && searchText.length >= defaultSearchTextLength) {
      if (shouldUseFilterForSearch) {
        // Filter for large data Case
        filteredList = filteredList.filter(str =>
          str.toLowerCase().includes(searchText.toLowerCase()),
        );
      } else {
        // Default Case
        filteredList = filteredList.map(str => {
          if (str.toLowerCase().includes(searchText.toLowerCase())) {
            return str;
          } else {
            return null;
          }
        });
      }
    }

    return (
      <View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => this.openModal()}>
          {showHeader && (
            <Text style={styles.headerText}>{placeholderText}</Text>
          )}
          <View style={[styles.inputMainView, inputViewStyles]}>
            <Text style={[styles.selectedTextStyle, {color}, textStyles]}>
              {selectorText || typeof selectorText === 'number'
                ? selectorText
                : placeholderText}
            </Text>
            <Image
              style={styles.imageStyles}
              source={require('../../assets/images/down-arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <Modal
          transparent
          animationType="fade"
          visible={showModal || props.showModal}
          onRequestClose={() => this.closeModal()}
          onShow={() => this.addBackHandlerListener()}>
          <View style={styles.screenContainer}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.touchableContianer}
              onPress={() => this.closeModal()}>
              <View style={[styles.mainContainer, dropdownContainerStyle]}>
                <View style={styles.topView}>
                  <View style={styles.categoryInfoView}>
                    <Text
                      style={styles.selectCategoryText}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {title}
                    </Text>
                  </View>
                  <View style={styles.closeView}>
                    <TouchableOpacity
                      onPress={() => this.closeModal()}
                      style={styles.closeTouchable}>
                      <Text style={styles.closeText}>close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {showSearchBar && (
                  <CustomTextInput
                    showLeftView
                    leftImage={require('../../assets/images/search.png')}
                    leftImageStyles={styles.leftImageStyles}
                    showHeader={false}
                    placeHolder={'Search'}
                    value={searchText}
                    onChangeText={text => this.setState({searchText: text})}
                  />
                )}{' '}
                ``
                <View style={styles.listContainer}>
                  <FlatList
                    style={styles.listStyle}
                    data={filteredList}
                    keyExtractor={(item, index) => `popup_${index}`}
                    renderItem={({item, index}) => {
                      if (item || typeof item === 'number') {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                              onSelectOption(item, index);
                              this.closeModal();
                            }}>
                            <View style={styles.rowStyle}>
                              <Text
                                style={styles.rowText}
                                numberOfLines={3}
                                lineBreakMode="tail">
                                {item}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      }
                      return null;
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

CustomDropDown.propTypes = {
  title: PropTypes.string,
  listData: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectOption: PropTypes.func,
  close: PropTypes.func,
  dropdownContainerStyle: PropTypes.any,
  showModal: PropTypes.bool,
  selectorText: PropTypes.string,
  emptyMessage: PropTypes.string,
  placeholderText: PropTypes.string,
  inputViewStyles: PropTypes.objectOf(PropTypes.any),
  textStyles: PropTypes.objectOf(PropTypes.any),
  showHeader: PropTypes.bool,
  isEnable: PropTypes.bool,
  showSearchBar: PropTypes.bool,
  defaultSearchTextLength: PropTypes.number,
  shouldUseFilterForSearch: PropTypes.bool,
};

CustomDropDown.defaultProps = {
  title: 'Select an option',
  listData: [],
  onSelectOption: () => {},
  close: () => {},
  dropdownContainerStyle: null,
  showModal: false,
  selectorText: '',
  emptyMessage: '',
  placeholderText: '',
  inputViewStyles: {},
  textStyles: {},
  showHeader: false,
  isEnable: true,
  showSearchBar: false,
  defaultSearchTextLength: 0,
  shouldUseFilterForSearch: false,
};

export default React.memo(CustomDropDown);
