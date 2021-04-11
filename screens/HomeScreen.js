import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image,
} from "react-native";
import { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import GLOBALS from "../Globals";

const HomeScreen = ({ navigation }) => {
    const { getToken, logout } = React.useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [clientNames, setClientNames] = useState([]);

    useEffect(() => {
        const refresh = navigation.addListener("focus", () => {
            downloadClients();
        });

        return refresh;
    });

    const downloadClients = () => {
        token = getToken();
        fetch(GLOBALS.API_URL + "clients/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((json) => setClientNames(json.clients))
            .finally(() => setLoading(false));
    };

    const renderClient = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.clientTouchable}
                onPress={() => {
                    navigation.navigate("Client", {
                        clientId: item.id,
                        firstName: item.firstname,
                    });
                }}
            >
                <Text style={styles.clientText}>
                    {item.firstname} {item.lastname}
                </Text>
            </TouchableOpacity>
        );
    };

    const separatorComponent = () => {
        return <View style={styles.separator}></View>;
    };

    return (
        <>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <View style={styles.profileView}>
                        <Image
                            style={styles.profile}
                            source={require("../assets/profile.png")}
                        />
                        <Text style={styles.userName}>John Smith</Text>
                    </View>
                    <View style={styles.clientListView}>
                        <Text style={styles.clientHeader}>Clients</Text>
                        <FlatList
                            style={styles.clientList}
                            data={clientNames}
                            keyExtractor={(item) => {
                                return item.lastname;
                            }}
                            ItemSeparatorComponent={separatorComponent}
                            renderItem={renderClient}
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            style={styles.newClientButton}
                            onPress={() => {
                                navigation.navigate("AddClient");
                            }}
                        >
                            <Text style={styles.newClientText}>Add Client</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => {
                                logout();
                            }}
                        >
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    profileView: {
        flex: 3,
        alignItems: "center",
        width: "100%",
        padding: 20,
    },

    profile: {
        width: "100%",
        height: "50%",
        resizeMode: "contain",
    },

    userName: {
        fontSize: 30,
        marginTop: 20,
    },

    clientListView: {
        flex: 4,
        width: "100%",
    },

    clientHeader: {
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        borderBottomColor: "#111",
        borderBottomWidth: 1,
    },

    clientList: {
        width: "100%",
        borderBottomColor: "#111",
        borderBottomWidth: 1,
    },

    clientTouchable: {
        width: "100%",
    },

    clientText: {
        fontSize: 20,
        padding: 10,
    },

    separator: {
        width: "100%",
        borderBottomColor: "#111",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    bottomView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    newClientButton: {
        width: "40%",
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor: "darkblue",
    },

    newClientText: {
        color: "#fff",
    },

    logoutButton: {
        width: "40%",
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        backgroundColor: "darkblue",
    },

    logoutText: {
        color: "#fff",
    },
});

export default HomeScreen;
