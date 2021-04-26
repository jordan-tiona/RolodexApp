import React from "react";
import {
    View,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { format, parseISO, parse, formatISO } from "date-fns";
import { useEffect, useState, useLayoutEffect } from "react";
import AuthContext from "../AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import GLOBALS from "../Globals";

const ClientScreen = ({ navigation, route }) => {
    const { getToken } = React.useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [client, setClient] = useState([]);
    const { clientId } = route.params;
    const [isEditing, setEditing] = useState(false);
    const [editBirthday, setEditBirthday] = useState(false);
    const [editLastDate, setEditLastDate] = useState(false);
    const [editLastTime, setEditLastTime] = useState(false);
    const [editNextDate, setEditNextDate] = useState(false);
    const [editNextTime, setEditNextTime] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => onEditPress()}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                ),
            });
        }
    }, [navigation]);

    const onEditPress = () => {
        navigation.setOptions({
            headerRight: () => <></>,
        });
        setEditing(true);
    };

    useEffect(() => {
        downloadClient();
    }, []);

    const downloadClient = () => {
        token = getToken();
        fetch(GLOBALS.API_URL + "clients/" + clientId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                setClient(json.client);
            })
            .finally(() => {
                navigation.setOptions({ title: client.firstname });
                setLoading(false);
            });
    };

    const submitChanges = () => {
        token = getToken();
        fetch(GLOBALS.API_URL + "clients/" + clientId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                client: client,
            }),
        }).finally(() => {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => onEditPress()}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                ),
            });
            downloadClient();
        });
    };

    const deleteClient = () => {
        token = getToken();
        fetch(GLOBALS.API_URL + "clients/" + clientId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.status == "ok") {
                    navigation.navigate("Home");
                } else {
                    alert(json.message);
                }
            })
            .finally(() => {});
    };

    const editingStyle = {
        borderWidth: isEditing ? 1 : 0,
        borderRadius: 5,
        borderColor: "#888",
        paddingLeft: 4,
        paddingRight: 2,
        marginRight: 2,
    };

    const resetDateTimePickers = () => {
        setEditBirthday(false);
        setEditLastDate(false);
        setEditLastTime(false);
        setEditNextDate(false);
        setEditNextTime(false);
    };

    return (
        <>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View style={styles.container}>
                    <View style={styles.profileImageView}>
                        <Image
                            style={styles.profileImage}
                            source={require("../assets/profile.png")}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.headerColumn}>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>
                                    Full Name:
                                </Text>
                            </View>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>
                                    Date of Birth:
                                </Text>
                            </View>
                            <View style={styles.headerViewAddress}>
                                <Text style={styles.headerText}>Address:</Text>
                            </View>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>
                                    Phone Number:
                                </Text>
                            </View>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>
                                    Last Appointment:
                                </Text>
                            </View>
                            <View style={styles.headerView}>
                                <Text style={styles.headerText}>
                                    Next Appointment:
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoColumn}>
                            <View style={styles.infoView}>
                                <TextInput
                                    editable={isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    value={client.firstname}
                                    onChangeText={(text) => {
                                        setClient((prevState) => ({
                                            ...prevState,
                                            firstname: text,
                                        }));
                                    }}
                                />
                                <Text style={styles.infoText}> </Text>
                                <TextInput
                                    editable={isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    value={client.lastname}
                                    onChangeText={(text) => {
                                        setClient((prevState) => ({
                                            ...prevState,
                                            lastname: text,
                                        }));
                                    }}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <TouchableOpacity
                                    disabled={!isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    onPress={() => {
                                        resetDateTimePickers();
                                        setEditBirthday(true);
                                    }}
                                >
                                    <Text>
                                        {format(
                                            parse(
                                                client.dateofbirth,
                                                "yyyy-M-d",
                                                new Date()
                                            ),
                                            "MMM do, y"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.infoViewAddress}>
                                <TextInput
                                    editable={isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    value={client.address}
                                    onChangeText={(text) => {
                                        setClient((prevState) => ({
                                            ...prevState,
                                            address: text,
                                        }));
                                    }}
                                />
                                <View style={styles.infoView}>
                                    <TextInput
                                        editable={isEditing}
                                        style={[styles.infoText, editingStyle]}
                                        value={client.city}
                                        onChangeText={(text) => {
                                            setClient((prevState) => ({
                                                ...prevState,
                                                city: text,
                                            }));
                                        }}
                                    />
                                    <Text style={styles.infoText}>, </Text>
                                    <TextInput
                                        editable={isEditing}
                                        style={[styles.infoText, editingStyle]}
                                        value={client.state}
                                        onChangeText={(text) => {
                                            setClient((prevState) => ({
                                                ...prevState,
                                                state: text,
                                            }));
                                        }}
                                    />
                                    <TextInput
                                        editable={isEditing}
                                        style={[styles.infoText, editingStyle]}
                                        value={client.zipcode.toString()}
                                        onChangeText={(text) => {
                                            setClient((prevState) => ({
                                                ...prevState,
                                                zipcode: text,
                                            }));
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={styles.infoView}>
                                <TextInput
                                    editable={isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    value={client.phonenumber}
                                    onChangeText={(text) => {
                                        setClient((prevState) => ({
                                            ...prevState,
                                            phonenumber: text,
                                        }));
                                    }}
                                />
                            </View>
                            <View style={styles.infoView}>
                                <TouchableOpacity
                                    disabled={!isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    onPress={() => {
                                        resetDateTimePickers();
                                        setEditLastDate(true);
                                    }}
                                >
                                    <Text>
                                        {format(
                                            parseISO(client.lastappointment),
                                            "MMM do, y"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={!isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    onPress={() => {
                                        resetDateTimePickers();
                                        setEditLastTime(true);
                                    }}
                                >
                                    <Text>
                                        {format(
                                            parseISO(client.lastappointment),
                                            "h:mmaaa"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.infoView}>
                                <TouchableOpacity
                                    disabled={!isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    onPress={() => {
                                        resetDateTimePickers();
                                        setEditNextDate(true);
                                    }}
                                >
                                    <Text>
                                        {format(
                                            parseISO(client.nextappointment),
                                            "MMM do, y"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={!isEditing}
                                    style={[styles.infoText, editingStyle]}
                                    onPress={() => {
                                        resetDateTimePickers();
                                        setEditNextTime(true);
                                    }}
                                >
                                    <Text>
                                        {format(
                                            parseISO(client.nextappointment),
                                            "h:mmaaa"
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {isEditing ? (
                        <TextInput
                            style={styles.notesInput}
                            multiline={true}
                            textAlignVertical="top"
                            value={client.notes}
                            onChangeText={(text) => {
                                setClient((prevState) => ({
                                    ...prevState,
                                    notes: text,
                                }));
                            }}
                        />
                    ) : (
                        <ScrollView style={styles.notesInput}>
                            <Text>{client.notes}</Text>
                        </ScrollView>
                    )}

                    {isEditing ? (
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => {
                                submitChanges();
                                setEditing(false);
                            }}
                        >
                            <Text style={styles.submitText}>
                                Submit Changes
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => {
                                deleteClient();
                                setEditing(false);
                            }}
                        >
                            <Text style={styles.deleteText}>Delete Client</Text>
                        </TouchableOpacity>
                    )}
                    {editBirthday ? (
                        <DateTimePicker
                            value={parse(
                                client.dateofbirth,
                                "yyyy-M-d",
                                new Date()
                            )}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setEditBirthday(false);
                                    setClient((prevState) => ({
                                        ...prevState,
                                        dateofbirth: format(
                                            new Date(date),
                                            "yyyy-M-d"
                                        ),
                                    }));
                                    console.log(client.dateofbirth);
                                } else {
                                    setEditBirthday(false);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    {editLastDate ? (
                        <DateTimePicker
                            value={new Date(client.lastappointment)}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setEditLastDate(false);
                                    setClient((prevState) => ({
                                        ...prevState,
                                        lastappointment: formatISO(
                                            new Date(date)
                                        ),
                                    }));
                                } else {
                                    setEditLastDate(false);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    {editLastTime ? (
                        <DateTimePicker
                            value={new Date(client.lastappointment)}
                            mode="time"
                            display="spinner"
                            minuteInterval={15}
                            onChange={(event, date) => {
                                if (date) {
                                    setEditLastTime(false);
                                    setClient((prevState) => ({
                                        ...prevState,
                                        lastappointment: formatISO(
                                            new Date(date)
                                        ),
                                    }));
                                } else {
                                    setEditLastTime(false);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )}

                    {editNextDate ? (
                        <DateTimePicker
                            value={new Date(client.nextappointment)}
                            mode="date"
                            display="default"
                            onChange={(event, date) => {
                                if (date) {
                                    setEditNextDate(false);
                                    setClient((prevState) => ({
                                        ...prevState,
                                        nextappointment: formatISO(
                                            new Date(date)
                                        ),
                                    }));
                                } else {
                                    setEditNextDate(false);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )}
                    {editNextTime ? (
                        <DateTimePicker
                            value={new Date(client.nextappointment)}
                            mode="time"
                            display="spinner"
                            minuteInterval={15}
                            onChange={(event, date) => {
                                if (date) {
                                    setEditNextTime(false);
                                    setClient((prevState) => ({
                                        ...prevState,
                                        nextappointment: formatISO(
                                            new Date(date)
                                        ),
                                    }));
                                } else {
                                    setEditNextTime(false);
                                }
                            }}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    editButton: {
        height: "70%",
        paddingHorizontal: 20,
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "darkblue",
        borderRadius: 15,
    },

    editText: {
        color: "#fff",
    },

    profileImageView: {
        flex: 1,
        alignItems: "center",
    },

    profileImage: {
        flex: 1,
        resizeMode: "contain",
    },

    infoContainer: {
        flex: 2,
        width: "100%",
        flexDirection: "row",
    },

    headerColumn: {
        flex: 2,
    },

    infoColumn: {
        flex: 4,
    },

    headerView: {
        flex: 1,
        justifyContent: "center",
    },

    headerViewAddress: {
        flex: 2,
    },

    infoView: {
        flex: 1,
        padding: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },

    infoViewAddress: {
        flex: 2,
        flexDirection: "column",
    },

    headerText: {
        fontWeight: "bold",
        fontSize: 14,
    },

    infoText: {
        fontSize: 14,
        color: "#000",
        padding: 0,
    },

    profileImage: {
        flex: 1,
        resizeMode: "contain",
    },

    notesView: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#888",
        borderRadius: 10,
    },

    notesInput: {
        flex: 1,
        color: "#000",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#888",
        borderRadius: 10,
        color: "#000",
        paddingHorizontal: 10,
    },

    submitButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "darkblue",
    },

    submitText: {
        color: "#fff",
    },

    deleteButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "red",
    },

    deleteText: {
        color: "#fff",
    },
});

export default ClientScreen;
