import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Icon} from '@rneui/themed'; // Assuming this is the correct import for the Icon component
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',

    marginBottom: 10,
  },

  icon: {
    backgroundColor: '#FFFFFF33',
    borderRadius: 50,
    padding: 5,
    marginLeft: 10,
    marginTop: 5,
  },
});

const PageContainer = ({
  child,
}: {
  child: React.ReactNode;
}): React.ReactElement => {
  // const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require('../assets/wallpaper.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.pageContainer}>
          {/* <View style={styles.header}>
            <Icon
              style={styles.icon}
              name={'menu'}
              color={'white'}
              size={40}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          </View> */}
          {child}
        </View>
      </ImageBackground>
    </View>
  );
};

export default PageContainer;
