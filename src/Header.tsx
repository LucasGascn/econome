import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '@rneui/themed';

const Header = (): React.JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.menuButton}>
        <Icon style={styles.icon} name={'menu'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '7.5%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  menuButton: {
    margin: 15,
  },

  icon: {},
});

export default Header;
