import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { format, parseISO, parse, formatISO } from "date-fns";
import { useEffect, useState, useLayoutEffect } from "react";
import AuthContext from "../AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StackActions } from "@react-navigation/native";
import GLOBALS from "../Globals";

const AddClientScreen = ({ navigation, route }) => {
    const { getToken } = React.useContext(AuthContext);
    const [client, setClient] = useState({
        firstname: "",
        lastname: "",
        dateofbirth: format(new Date(), "yyyy-M-d"),
        address: "",
        state: "",
        zipcode: null,
        phonenumber: "",
        lastappointment: formatISO(new Date()),
        nextappointment: formatISO(new Date()),
    });
    const [editBirthday, setEditBirthday] = useState(false);
    const [editLastDate, setEditLastDate] = useState(false);
    const [editLastTime, setEditLastTime] = useState(false);
    const [editNextDate, setEditNextDate] = useState(false);
    const [editNextTime, setEditNextTime] = useState(false);

    useEffect(() => {
        console.log(client.dateofbirth);
        console.log(client.lastappointment);
        console.log(client.nextappointment);
    });

    const submit = () => {
        token = getToken();
        fetch(GLOBALS.API_URL + "clients/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                client: client,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.client) {
                    navigation.dispatch(
                        StackActions.replace("Client", {
                            clientId: json.client.id,
                            firstName: json.client.firstname,
                        })
                    );
                }
            })
            .finally(() => {});
    };

    const editingStyle = {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: "#888",
        paddingLeft: 6,
        paddingRight: 4,
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
                        <Text style={styles.headerText}>Full Name:</Text>
                    </View>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>Date of Birth:</Text>
                    </View>
                    <View style={styles.headerViewAddress}>
                        <Text style={styles.headerText}>Address:</Text>
                    </View>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>Phone Number:</Text>
                    </View>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>Last Appointment:</Text>
                    </View>
                    <View style={styles.headerView}>
                        <Text style={styles.headerText}>Next Appointment:</Text>
                    </View>
                </View>
                <View style={styles.infoColumn}>
                    <View style={styles.infoView}>
                        <TextInput
                            style={[styles.infoText, editingStyle]}
                            placeholder="First"
                            onChangeText={(text) => {
                                setClient((prevState) => ({
                                    ...prevState,
                                    firstname: text,
                                }));
                            }}
                        />
                        <Text style={styles.infoText}> </Text>
                        <TextInput
                            style={[styles.infoText, editingStyle]}
                            placeholder="Last"
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
                            style={[
                                styles.infoText,
                                editingStyle,
                                { paddingVertical: 4 },
                            ]}
                            onPress={() => {
                                /*resetDateTimePickers();*/ setEditBirthday(
                                    true
                                );
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
                            style={[styles.infoText, editingStyle]}
                            placeholder="Address"
                            onChangeText={(text) => {
                                setClient((prevState) => ({
                                    ...prevState,
                                    address: text,
                                }));
                            }}
                        />
                        <View style={styles.infoView}>
                            <TextInput
                                style={[styles.infoText, editingStyle]}
                                placeholder="City"
                                onChangeText={(text) => {
                                    setClient((prevState) => ({
                                        ...prevState,
                                        city: text,
                                    }));
                                }}
                            />
                            <Text style={styles.infoText}>, </Text>
                            <TextInput
                                style={[styles.infoText, editingStyle]}
                                placeholder="State"
                                onChangeText={(text) => {
                                    setClient((prevState) => ({
                                        ...prevState,
                                        state: text,
                                    }));
                                }}
                            />
                            <TextInput
                                style={[styles.infoText, editingStyle]}
                                placeholder="Zipcode"
                                onChangeText={(text) => {
                                    setClient((prevState) => ({
                                        ...prevState,
                                        zipcode: parseInt(text),
                                    }));
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.infoView}>
                        <TextInput
                            style={[styles.infoText, editingStyle]}
                            placeholder="Phone Number"
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
                            style={[
                                styles.infoText,
                                editingStyle,
                                { paddingVertical: 4 },
                            ]}
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
                            style={[
                                styles.infoText,
                                editingStyle,
                                { paddingVertical: 4 },
                            ]}
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
                            style={[
                                styles.infoText,
                                editingStyle,
                                { paddingVertical: 4 },
                            ]}
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
                            style={[
                                styles.infoText,
                                editingStyle,
                                { paddingVertical: 4 },
                            ]}
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
            <TextInput
                style={styles.notesInput}
                placeholder="Client Notes"
                multiline={true}
                textAlignVertical="top"
                onChangeText={(text) => {
                    setClient((prevState) => ({ ...prevState, notes: text }));
                }}
            />
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => submit()}
            >
                <Text style={styles.submitText}>Add Client</Text>
            </TouchableOpacity>
            {editBirthday ? (
                <DateTimePicker
                    value={parse(client.dateofbirth, "yyyy-M-d", new Date())}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                        if (date) {
                            setEditBirthday(false);
                            setClient((prevState) => ({
                                ...prevState,
                                dateofbirth: format(new Date(date), "yyyy-M-d"),
                            }));
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
                                lastappointment: formatISO(new Date(date)),
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
                                lastappointment: formatISO(new Date(date)),
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
                                nextappointment: formatISO(new Date(date)),
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
                                nextappointment: formatISO(new Date(date)),
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 20,
    },

    profileImageView: {
        flex: 1,
        alignItems: "center",
    },

    profileImage: {
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
        padding: 1,
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

    notesContentView: {
        flexGrow: 1,
    },

    notesInput: {
        flex: 1,
        borderWidth: 1,
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
});

export default AddClientScreen;
