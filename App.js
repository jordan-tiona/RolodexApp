import * as React from "react";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import ClientScreen from "./screens/ClientScreen";
import AddClientScreen from "./screens/AddClientScreen";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator } from "react-native";
import GLOBALS from "./Globals";
import AuthContext from "./AuthContext";

const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

const RolodexApp = () => {
    //Global state
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "LOGIN":
                    return {
                        ...prevState,
                        userToken: action.token,
                    };
                case "LOGOUT":
                    return {
                        ...prevState,
                        userToken: null,
                    };
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        storedEmail: action.storedEmail,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "REGISTER":
                    return {
                        ...prevState,
                        userToken: action.token,
                    };
            }
        },
        {
            storedEmail: "",
            isLoading: true,
            userToken: null,
        }
    );

    const retrieveStorage = async () => {
        try {
            const storedEmail = await SecureStore.getItemAsync("storedEmail");
            const userToken = await SecureStore.getItemAsync("userToken");
            dispatch({
                type: "RESTORE_TOKEN",
                token: userToken,
                storedEmail: storedEmail,
            });
        } catch (e) {
            console.log(e);
        }
    };
    //Token restoration
    React.useEffect(() => {
        retrieveStorage();
    }, []);

    //Auth context provider for login and logout
    const authContext = {
        login: async (email, password) => {
            await fetch(GLOBALS.API_URL + "login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status == "unauthorized") {
                        alert("Incorrect Email or Password");
                        return;
                    }
                    if (res.status == "ok" && res.token) {
                        SecureStore.deleteItemAsync("storedEmail");
                        SecureStore.setItemAsync("storedEmail", email);
                        SecureStore.setItemAsync("userToken", res.token);
                        dispatch({
                            type: "LOGIN",
                            token: res.token,
                            storedEmail: email,
                        });
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        },
        logout: async () => {
            await SecureStore.deleteItemAsync("userToken");
            await retrieveStorage();
            dispatch({ type: "LOGOUT" });
        },

        register: async (
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        ) => {
            if (password == confirmPassword) {
                await fetch(GLOBALS.API_URL + "users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: password,
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.status == "ok" && res.token) {
                            SecureStore.deleteItemAsync("storedEmail");
                            SecureStore.setItemAsync("storedEmail", email);
                            SecureStore.setItemAsync("userToken", res.token);
                            dispatch({ type: "REGISTER", token: res.token });
                        } else {
                            alert("Error while registering, try again later");
                            return;
                        }
                    });
            } else {
                alert("Passwords must match");
                return;
            }
        },
        getToken: () => {
            return state.userToken;
        },
    };

    if (state.isLoading) {
        return <ActivityIndicator />;
    } else {
        if (!state.userToken) {
            return (
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <AuthStack.Navigator>
                            <AuthStack.Screen
                                name="Login"
                                component={LoginScreen}
                                initialParams={{
                                    storedEmail: state.storedEmail,
                                }}
                            />
                            <AuthStack.Screen
                                name="Register"
                                component={RegistrationScreen}
                            />
                            <AuthStack.Screen
                                name="ForgotPassword"
                                component={ForgotPasswordScreen}
                            />
                        </AuthStack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            );
        } else {
            return (
                <AuthContext.Provider value={authContext}>
                    <NavigationContainer>
                        <RootStack.Navigator>
                            <RootStack.Screen
                                name="Home"
                                options={{ title: "Profile" }}
                                component={HomeScreen}
                            />
                            <RootStack.Screen
                                name="AddClient"
                                options={{ title: "Add Client" }}
                                component={AddClientScreen}
                            />
                            <RootStack.Screen
                                name="Client"
                                component={ClientScreen}
                                options={({ route }) => ({
                                    title: route.params.firstName,
                                })}
                            />
                        </RootStack.Navigator>
                    </NavigationContainer>
                </AuthContext.Provider>
            );
        }
    }
};

export default RolodexApp;
