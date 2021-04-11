import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import AuthContext from "../AuthContext";

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState(route.params.storedEmail);
    const [password, setPassword] = useState("");

    const { login } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.logoView}>
                <Text style={styles.title}>Rolodex Client Management</Text>
                <Image
                    style={styles.logo}
                    source={require("../assets/logo.png")}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    defaultValue={route.params.storedEmail}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => {
                        setEmail(email);
                    }}
                />
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
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                >
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.newUser}>New User?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginButtonView}>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => login(email, password)}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },

    logoView: {
        alignItems: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 20,
    },
    logo: {
        width: 200,
        height: 200,
    },

    inputView: {},

    textInput: {
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        textAlign: "center",
        padding: 10,
        margin: 10,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 30,
    },

    forgotPassword: {
        fontSize: 16,
    },

    newUser: {
        fontSize: 16,
    },

    loginButtonView: {
        margin: 30,
    },

    loginButton: {
        borderRadius: 25,
        padding: 16,
        alignItems: "center",
        backgroundColor: "darkblue",
    },

    loginText: {
        color: "#fff",
    },
});

export default LoginScreen;
