import React, { useMemo, useState } from 'react';
import PageContainer from './Layout/PageContainer';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

const ReadMePage = (): React.JSX.Element => {
    return (
        <PageContainer
            child={
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Bienvenue sur EconoMe, une application vous permettant de vous entrainer gratuitement au trading de cryptomonnaie.

                        Une fois inscrit et connecté votre compte sera crédité de 100$ virtuel dont vous pourrez vous servir pour acheter différentes cryptomonnaies et les revendre en fonction de leurs taux.

                        Nous utilisons l'api CoinRanking "https://developers.coinranking.com/api/documentation"

                        Nous avons utilisés les modules :
                        @shopify/react-native-skia: ^0.1.241 : Ce module nous a servie à réaliser le mouvement des cartes des cryptomonnaies
                        react-native-reanimated: ^3.7.2 : Ce module nous à servis pour les différentes annimations de la page détails et la page portefeuill.

                        L'application va vous permettre d'acheter la cryptomonnaie de votre choix.
                        Votre portefeuille virtuel sera mis jours automatiquement.
                        Vous verrez vos cyrptomonnaies acheté sur une page détails en cliquant dessus vous pourrez soit en racheter soit les vendres.

                        Application réalisée par :
                        Célian OPIGEZ
                        Leo JEANJEAN
                        Lucas GASCOIN
                    </Text>
                </View>
            }
        />
    );
};

// Calculate screen width to adjust text size dynamically
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        padding: 20, // Add padding to ensure text does not touch the sides of the screen
    },
    text: {
        fontSize: screenWidth < 350 ? 14 : 16, // Adjust text size based on screen width
        lineHeight: screenWidth < 350 ? 20 : 24, // Adjust line height for readability
        textAlign: 'justify', // Justify text for better readability
    },
});

export default ReadMePage;
