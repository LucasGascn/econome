import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#0B0128',
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: '#251B3F',

    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',

    width: '90%',
    marginBottom: 5,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,

    borderRadius: 35,
  },

  searchBar: {},

  text: {
    color: '#6B6386',
  },
});

interface SearchBarProps {
  setSearch: (text: string) => void;
  search: string;
  tooltip: string;
}

const SearchBar: React.FC<SearchBarProps> = ({setSearch, search, tooltip}) => {
  return (
    <View style={styles.searchBarContainer}>
      <Icon name={'search'} color={'#806B9A'} />
      <TextInput
        style={styles.searchBar}
        placeholder={tooltip}
        onChangeText={text => {
          setSearch(text);
        }}
        value={search}
      />
    </View>
  );
};

export default SearchBar;
