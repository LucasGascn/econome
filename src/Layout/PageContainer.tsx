import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

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
  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require('../Assets/wallpaper.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.pageContainer}>{child}</View>
      </ImageBackground>
    </View>
  );
};

export default PageContainer;
