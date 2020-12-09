import Axios from "axios";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { Divider, List } from "react-native-paper";
import Layout from "../../components/layout";

export default class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      faqs: [],
      error: false,
    };
  }

  fetchFaqs = async () => {
    this.setState({ loading: true });
    this.setState({ loading: true });
    await Axios.get("https://logad.net/api/all-faq")
      .then((res) => {
        console.log(res.data.data);
        this.setState({ faqs: res.data.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      })
      .finally(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    this.fetchFaqs();
  }

  render() {
    const { loading, faqs, error } = this.state;
    return (
      <Layout
        loading={loading}
        error={error}
        title="FAQs"
        navigation={this.props.navigation}
      >
        {loading || error ? null : (
          <List.AccordionGroup>
            {faqs.map((f) => (
              <>
                <List.Accordion title={f.question} key={f.id} id={f.id}>
                  <List.Item
                    titleStyle={{ display: "none" }}
                    description={f.answer}
                  />
                </List.Accordion>
                <Divider />
              </>
            ))}
          </List.AccordionGroup>
        )}
      </Layout>
    );
  }
}
