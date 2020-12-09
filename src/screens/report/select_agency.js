import Axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { List, Title } from "react-native-paper";
import Layout from "../../components/layout";

export default function SelectAgency({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [nothing_found, setNothing_found] = useState(false);
  const [error, setError] = useState(false);
  const [agencies, setAgencies] = useState([]);

  const fetchAgencies = async () => {
    await Axios.get("http://hedgeincomes.com/help-deck/api/all-agencies")
      .then((res) => {
        setAgencies(res.data.data);
        console.log(res.data);
        if (res.data.error === true) {
          setNothing_found(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <Layout
      title="Select an agency"
      navigation={navigation}
      back={true}
      loading={loading}
      nothing_found={nothing_found}
      error={error}
      refreshKey={() => fetchAgencies()}
    >
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          flex: 1,
          padding: 20,
        }}
      >
        <Title style={{ marginBottom: 15 }}>
          We are here for you, select an agency around you
        </Title>

        {agencies.map((a) => (
          <List.Item
            title={a.name}
            description={a.state}
            style={{ paddingHorizontal: 0 }}
            onPress={() =>
              navigation.push("Report", {
                id: a.id,
              })
            }
            right={(props) => (
              <List.Icon {...props} icon="ios-arrow-dropright" />
            )}
          />
        ))}
      </ScrollView>
    </Layout>
  );
}
