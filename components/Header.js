import React from 'react'
import {
    Text
} from 'react-native'

export default Header = ({children, props}) => {
    return (
        <Text {...props}>{children}</Text>
    )
}