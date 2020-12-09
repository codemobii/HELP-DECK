import Axios from "axios";
import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Button, List } from "react-native-paper";
import Layout from "../../components/layout";
import styles from "../../components/styles";
import VideoCard from "../../components/video_card";

export default class CategoryVideos extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      loading: true,
      btnLoading: false,
      videos: [],
      error: false,
      page_title: this.props.route.params.title,
      id: this.props.route.params.id,
      nothing_found: false,
    };
  }

  fetchMoreVideos = () => {
    this.page = this.page + 1;
    this.fetchVideos();
  };

  fetchVideos = async () => {
    {
      this.state.error
        ? this.setState({ loading: true })
        : this.setState({ btnLoading: true });
    }
    await Axios.get(
      `https://logad.net/api/cat-videos/${this.state.id}?page=${this.page}`
    )
      .then((res) => {
        let moreVideos = this.state.videos.concat(res.data.data);
        res.data.error === true
          ? this.setState({ nothing_found: true })
          : this.setState({ videos: moreVideos });
        console.log(this.state.nothing_found);
        console.log(this.state.videos);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      })
      .finally(() => this.setState({ loading: false, btnLoading: false }));
  };

  componentDidMount() {
    this.fetchVideos();
  }

  render() {
    const {
      page_title,
      loading,
      btnLoading,
      videos,
      error,
      nothing_found,
    } = this.state;
    return (
      <Layout
        title={page_title}
        back={true}
        navigation={this.props.navigation}
        loading={loading}
        nothing_found={nothing_found}
        error={error}
        refreshKey={() => this.fetchVideos()}
      >
        <List.Section>
          {videos.map((v) => (
            <VideoCard v={v} key={v.id} navigation={this.props.navigation} />
          ))}
          {loading || nothing_found || error ? null : (
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
