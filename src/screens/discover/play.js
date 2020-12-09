import React, { Component } from "react";
import { View } from "react-native";
import Layout from "../../components/layout";
import { WebView } from "react-native-webview";
import { Paragraph, Subheading, Title } from "react-native-paper";
import Axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";

export default class PlayVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      video_details: {},
      error: false,
      id: this.props.route.params.id,
      playing: true,
    };
  }

  fetchVideo = async () => {
    this.setState({ loading: true });
    await Axios.get(`https://logad.net/api/video/${this.state.id}`)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ video_details: res.data.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.fetchVideo();
  }

  render() {
    const { loading, error, video_details, playing } = this.state;
    return (
      <Layout
        title="Play"
        navigation={this.props.navigation}
        back={true}
        loading={loading}
        error={error}
        refreshKey={() => this.fetchVideo()}
      >
        {loading || error ? null : (
          <>
            <YoutubePlayer
              height={300}
              play={playing}
              videoId={video_details.video_link}
              webViewStyle={{ marginBottom: 0 }}
            />
            <View style={{ padding: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Subheading> {video_details.formatted_date} : </Subheading>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("CategoryVideos", {
                      title: video_details.category.category_name,
                      id: video_details.category.id,
                    })
                  }
                >
                  <Subheading style={{ color: "#ffa5a5" }}>
                    {video_details.category.category_name}
                  </Subheading>
                </TouchableOpacity>
              </View>
              <Title>{video_details.video_title}</Title>
              <Paragraph>{video_details.video_desc}</Paragraph>
            </View>
          </>
        )}
      </Layout>
    );
  }
}
