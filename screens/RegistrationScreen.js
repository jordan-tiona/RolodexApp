import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { AuthContext } from "../App";

const RegistrationScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { register } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rolodex Client Management</Text>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.subtitle}>New User</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#004f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => {
                        setPassword(password);
                    }}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#004f5c"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword);
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => register(email, password, confirmPassword)}
            >
                <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
    },

    logo: {
        width: "50%",
        height: "40%",
    },

    inputView: {
        backgroundColor: "lightblue",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgotPassword: {
        height: 30,
        marginRight: 10,
    },

    newUser: {
        height: 30,
        marginLeft: 10,
    },

    registerButton: {
        width: "80%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        backgroundColor: "darkblue",
    },

    registerText: {
        color: "#fff",
    },
});

export default RegistrationScreen;
