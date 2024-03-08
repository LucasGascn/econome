import {Icon} from '@rneui/themed';
import React from 'react';
import {DimensionValue, StyleSheet, TextInput, View} from 'react-native';

interface SearchBarProps {
  setSearch: (text: string) => void;
  search: string;
  tooltip: string;
  witdh?: DimensionValue;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearch,
  search,
  tooltip,
  witdh,
}) => {
  const styles = StyleSheet.create({
    pageContainer: {
      backgroundColor: '#0B0128',
      flex: 1,
    },
    searchBarContainer: {
      backgroundColor: '#251B3F',

      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',

      width: witdh || '90%',
      marginBottom: 5,
      paddingLeft: 20,
      paddingRight: 15,
      paddingTop: 5,
      paddingBottom: 5,

      borderRadius: 35,
    },

    textContainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
    },

    text: {
      color: '#6B6386',
    },

    icon: {
      marginRight: 5,
    },
  });

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.textContainer}>
        <Icon style={styles.icon} name={'search'} color={'#806B9A'} />
        <TextInput
          placeholder={tooltip}
          onChangeText={text => {
            setSearch(text);
          }}
          value={search}
        />
      </View>
      <Icon
        name={'delete'}
        color={'#806B9A'}
        onPress={() => {
          setSearch('');
        }}
      />
    </View>
  );
};

export default SearchBar;
