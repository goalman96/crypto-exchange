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
    movies: Array<*>,
    onMoviesRequest: typeof onMoviesRequest,
    navigation: any,
}

state = {
    currenciesList: {},
}


class RootContainer extends React.PureComponent<Props> {
    static navigationOptions = { title: "Home" }

    navigate = movieId => {
        const { navigation } = this.props
        navigation.navigate("Market", { movieId })
    }

    render() {
        const { movies, onMoviesRequest } = this.props
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
    movies: state.movies.items,
    loading: state.movies.loading,
})

const mapDispatchToProps = {
    onPriceRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RootContainer)
