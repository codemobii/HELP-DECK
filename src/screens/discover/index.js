import Axios from "axios";
import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Chip, Divider, List } from "react-native-paper";
import Layout from "../../components/layout";
import styles from "../../components/styles";
import VideoCard from "../../components/video_card";

export default class Discover extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: true,
      btnLoading: false,
      videos: [],
      categories: [],
      error: false,
    };
  }

  fetchMoreVideos = () => {
    this.page = this.page + 1;
    this.fetchItems();
  };

  fetchItems = async () => {
    {
      this.state.error
        ? this.setState({ loading: true })
        : this.setState({ btnLoading: true });
    }
    await Axios.all([
      Axios.get(`https://logad.net/api/all-videos?page=${this.page}`),
      Axios.get("https://logad.net/api/all-categories"),
    ])
      .then(
        Axios.spread((videos_res, categories_res) => {
          let moreVideos = this.state.videos.concat(videos_res.data.data);
          this.setState({
            videos: moreVideos,
            categories: categories_res.data.data,
          });
          console.log(categories_res.data.data);
        })
      )
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false, btnLoading: false });
      });
  };

  componentDidMount() {
    this.fetchItems();
  }

  render() {
    const { loading, videos, categories, btnLoading, error } = this.state;
    return (
      <Layout
        loading={loading}
        title="Discover"
        navigation={this.props.navigation}
        error={error}
        refreshKey={() => this.fetchItems()}
      >
        <ScrollView
          contentContainerStyle={{ padding: 15 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((c) => (
            <Chip
              key={c.id}
              onPress={() =>
                this.props.navigation.navigate("CategoryVideos", {
                  title: c.category_name,
                  id: c.id,
                })
              }
              style={{ marginRight: 15 }}
            >
              {c.category_name}
            </Chip>
          ))}
        </ScrollView>
        <Divider />
        <List.Section>
          {videos.map((v) => (
            <VideoCard v={v} key={v.id} navigation={this.props.navigation} />
          ))}
          {loading || error ? null : (
            <View style={{ padding: 15 }}>
              <Button onPress={this.fetchMoreVideos} loading={btnLoading}>
                Load more
              </Button>
            </View>
          )}
        </List.Section>
      </Layout>
    );
  }
}
