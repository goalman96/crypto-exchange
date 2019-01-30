//@flow
import React from "react"
import { SafeAreaView, StyleSheet, FlatList } from "react-native"
import { connect } from "react-redux"

// components
import { RoundedButton, ListItem } from "../components"
import { Colors } from "../themes"

// redux
import { onPriceRequest } from "../redux/BalancesRedux"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
})

type Props = {
    currencies: [
        {name: 'Bitcon', price: number},
        {name: 'Ethereum', price: number},
        {name: 'Ripple', price: number},
        {name: 'Bitcoin Cash', price: number},
        {name: 'EOS', price: number},
        {name: 'Cardano', price: number},
        {name: 'Litecoin', price: number},
        {name: 'Tron', price: number},
        {name: 'Tether', price: number},
        {name: 'NEO', price: number}
    ],
    onMoviesRequest: typeof onPriceRequest,
    navigation: any
}

state = {
}


class RootContainer extends React.PureComponent<Props> {
    static navigationOptions = { title: "Balances" }

    navigate = currencyId => {
        const { navigation } = this.props
        navigation.navigate("Market", { currencyId })
    }

    render() {
        const { currencies, onPriceRequest } = this.props
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    renderItem={({ item }) => (
                        <ListItem onPress={() => this.navigate(item.id)}>
                            {item.title}
                        </ListItem>
                    )}
                    data={movies}
                    keyExtractor={item => item.id.toString()}
                />

                <RoundedButton onPress={() => onMoviesRequest()}>
                    Download movies
                </RoundedButton>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    currencies: state.currencies.items,
    loading: state.movies.loading,
})

const mapDispatchToProps = {
    onPriceRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RootContainer)
