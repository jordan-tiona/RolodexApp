import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import AuthContext from "../AuthContext";

const RegistrationScreen = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { register } = React.useContext(AuthContext);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Text style={styles.title}>Rolodex Client Management</Text>
                    <Image
                        style={styles.logo}
                        source={require("../assets/logo.png")}
                    />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(firstname) => {
                        setFirstname(firstname);
                    }}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(lastname) => {
                        setLastname(lastname);
                    }}
                />
                <TextInput
                    style={styles.textInput}
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
                <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#004f5c"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => {
                        setConfirmPassword(confirmPassword);
                    }}
                />
                <View style={styles.registerButtonView}>
                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() =>
                            register(
                                firstname,
                                lastname,
                                email,
                                password,
                                confirmPassword
                            )
                        }
                    >
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
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
        marginTop: 10,
    },

    forgotPassword: {
        fontSize: 16,
    },

    newUser: {
        fontSize: 16,
    },

    registerButtonView: {
        margin: 30,
    },

    registerButton: {
        borderRadius: 25,
        padding: 16,
        alignItems: "center",
        backgroundColor: "darkblue",
    },

    registerText: {
        color: "#fff",
    },
});

export default RegistrationScreen;
