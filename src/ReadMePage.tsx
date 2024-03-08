/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PageContainer from './Layout/PageContainer';
import {StyleSheet, Text, View, Linking} from 'react-native';

const ReadMePage = (): React.JSX.Element => {
  return (
    <PageContainer
      child={
        <View style={styles.container}>
          <Text style={[styles.text, styles.bold, styles.big]}>
            Bienvenue sur EconoMe,
          </Text>
          <Text style={styles.text}>
            une application vous permettant de vous entrainer gratuitement au
            trading de cryptomonnaie. Une fois inscrit et connecté votre compte
            sera crédité de 100$ virtuel dont vous pourrez vous servir pour
            acheter différentes cryptomonnaies et les revendre en fonction de
            leurs taux.
            {'\n'}
            {'\n'}
            Nous utilisons l'api
            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL(
                  'https://developers.coinranking.com/api/documentation',
                )
              }>
              {' '}
              CoinRanking{' '}
            </Text>
            ainsi que les modules :{'\n'}
            <Text style={[styles.text, styles.left]}>
              {'\n'}@shopify/react-native-skia :{'\n'}
            </Text>
            <Text style={[styles.text, styles.justify]}>
              Ce module nous a servi à réaliser le mouvement des cartes des
              cryptomonnaies
              {'\n'}
            </Text>
            <Text style={[styles.text, styles.left]}>
              {'\n'}@react-native-reanimated : {'\n'}
            </Text>
            <Text style={[styles.text, styles.justify]}>
              Ce module nous à servis pour les différentes annimations de la
              page détails et la page portefeuill.{'\n'}
              {'\n'}
            </Text>
            L'application va vous permettre d'acheter la cryptomonnaie de votre
            choix. Votre portefeuille virtuel sera mis jours automatiquement.
            Vous verrez vos cyrptomonnaies acheté sur une page détails en
            cliquant dessus vous pourrez soit en racheter soit les vendres.
            Application réalisée par : {'\n'}
            {'\n'}
            <Text style={[styles.text, styles.bold, styles.left]}>
              Célian OPIGEZ | Leo JEANJEAN | {'\n'}Lucas GASCOIN
            </Text>
          </Text>
        </View>
      }
    />
  );
};

// Calculate screen width to adjust text size dynamically

const styles = StyleSheet.create({
  container: {
    padding: 25,

    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  big: {
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  justify: {
    textAlign: 'justify',
  },
  left: {
    textAlign: 'justify',
  },
});

export default ReadMePage;
