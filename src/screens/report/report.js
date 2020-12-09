import React, { useEffect, useState } from "react";
import { View, Platform, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Card,
  Dialog,
  List,
  Paragraph,
  Portal,
  RadioButton,
  Subheading,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import Layout from "../../components/layout";
import { Picker } from "@react-native-picker/picker";

export default function Report({ navigation, route }) {
  const agency_id = route.params.id;

  const [user_id, setUser_id] = useState("fenenken");
  const [gender, setGender] = useState("Male");
  const [disabled, setDisabled] = useState("No");
  const [disability, setDisability] = useState("None");
  const [what_happened, setWhat_happened] = useState("");
  const [story, setStory] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user_key");
      if (value !== null) {
        setUser_id(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const makeReport = async () => {
    setLoading(true);
    await fetch("http://hedgeincomes.com/help-deck/api/log-report", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agency_id: agency_id,
        user_id: user_id,
        gender: gender,
        dob: date,
        disability: disability,
        what_happened: what_happened,
        address: address,
        story: story,
        contact: contact,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        setVisible(true);
        setLoading(false);
        console.log(responseJson);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Something went wrong");
        console.log(error);
      });
  };

  return (
    <Layout back={true} title="Getting help" navigation={navigation}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          flex: 1,
          padding: 15,
        }}
      >
        <Card>
          <Card.Content>
            <Subheading style={{ marginVertical: 10 }}>
              What is yout gender
            </Subheading>
            <RadioButton.Group
              onValueChange={(e) => setGender(e)}
              value={gender}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="Male" />
                <Text>Male</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="Female" />
                <Text>Female</Text>
              </View>
            </RadioButton.Group>
            <Subheading style={{ marginVertical: 10 }}>
              Do you have any diability
            </Subheading>
            <RadioButton.Group
              onValueChange={(d) => setDisabled(d)}
              value={disabled}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="Yes" />
                <Text>Yes</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="No" />
                <Text>No</Text>
              </View>
            </RadioButton.Group>
            {disabled === "Yes" ? (
              <TextInput
                label="Whats disability do you have"
                value={disability}
                onChangeText={(di) => {
                  setDisability(di);
                }}
                style={{
                  marginVertical: 10,
                  backgroundColor: "transparent",
                  paddingHorizontal: 0,
                }}
                multiline={true}
              />
            ) : null}

            <Subheading style={{ marginVertical: 10 }}>
              When were you born ? ({new Date(date).toDateString()})
            </Subheading>
            <Button mode="outlined" onPress={showDatepicker}>
              Select Date
            </Button>

            <Subheading style={{ marginVertical: 10 }}>
              What happened
            </Subheading>
            <Picker
              selectedValue={what_happened}
              style={{ height: 50, width: "100%" }}
              onValueChange={(itemValue, itemIndex) =>
                setWhat_happened(itemValue)
              }
            >
              <Picker.Item label="What happened" value="What happened" />
              <Picker.Item label="Bad touches" value="Bad touches" />
              <Picker.Item
                label="Someone tried to rape me"
                value="Someone tried to rape me"
              />
              <Picker.Item label="I was raped" value="I was raped" />
              <Picker.Item label="I was defiled" value="I was defiled" />
              <Picker.Item label="Other" value="Other" />
            </Picker>

            <Subheading style={{ marginVertical: 10 }}>
              Where did it happen?
            </Subheading>
            <TextInput
              label="Location of this event"
              value={address}
              onChangeText={(ad) => setAddress(ad)}
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 0,
              }}
            />

            <Subheading style={{ marginVertical: 10 }}>
              Tell the story of the incident
            </Subheading>
            <TextInput
              label="..."
              value={story}
              multiline={true}
              onChangeText={(s) => {
                setStory(s);
                console.log(s);
              }}
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 0,
              }}
            />

            <Subheading style={{ marginVertical: 10 }}>
              Enter phone number
            </Subheading>
            <TextInput
              label="..."
              value={contact}
              onChangeText={(c) => setContact(c)}
              style={{
                backgroundColor: "transparent",
                paddingHorizontal: 0,
              }}
            />
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          labelStyle={{ color: "#fff" }}
          color="#fc85ae"
          loading={loading}
          style={{
            width: "100%",
            marginTop: 20,
          }}
          onPress={makeReport}
        >
          Submit
        </Button>
      </ScrollView>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Title>Success!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              It is not your fault, our agency will get back to you as soon as
              possible. Or chat an agency close to you!
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                navigation.push("Tabs");
              }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Layout>
  );
}
