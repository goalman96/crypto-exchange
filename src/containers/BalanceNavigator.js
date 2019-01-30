import { createStackNavigator, createAppContainer } from "react-navigation"
import Balances from "./Balances"
import Market from "./Market"

export default createAppContainer(
    createStackNavigator({
        Root: { screen:  Balances},
        Detail: { screen: Market }
    })
)