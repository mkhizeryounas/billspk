import React, { Component } from "react";
import {
  Container,
  Card,
  Content,
  CardItem,
  Text,
  Toast,
  Spinner,
  Header
} from "native-base";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import UserService from "../services/user";
import AppFooter from "./common/Footer";
import SubscriberCard from "./common/SubscriberCard";
import { shiftedToMain } from "../actions";

class Home extends Component {
  state = {
    user: {},
    balanceLoad: "",
    subscribers: [],
    cardLoad: "",
    Token: ""
  };
  componentWillMount() {
    console.log("I DID");
    this.artificial_function();
  }
  artificial_function() {
    // componentWillMount();
    console.log("-i am called from artificial");
    AsyncStorage.getItem("Token", (err, res) => {
      console.log(res);
      if (!err) {
        this.setState({ Token: res });
        this.getBalance();
        this.getSubscribers();
      }
    });
  }
  componentWillUnmount() {
    console.log("UnMount");
  }
  getBalance() {
    this.setState({
      balanceLoad: true
    });
    UserService.aboutMe(this.state.Token)
      .then(response => {
        if (response.data.status) {
          this.setState({
            user: response.data.response,
            balanceLoad: false
          });
        } else {
          this.setState({
            balanceLoad: false
          });
          Toast.show({
            text: "Something Went Wrong",
            position: "top",
            type: "danger"
          });
          Actions.auth();
        }
      })
      .catch(error => {
        Toast.show({
          text: "Something Went Wrong",
          position: "top",
          type: "danger"
        });
        Actions.auth();
      });
  }
  getSubscribers() {
    this.setState({
      cardLoad: true
    });
    UserService.subscriberList(this.state.Token)
      .then(response => {
        // console.log(response);
        if (response.data.status) {
          //console.log(response.data.response.data);
          this.setState({
            subscribers: response.data.response.data,
            cardLoad: false
          });
        } else {
          this.setState({ cardLoad: false });
          Toast.show({
            text: "Something Went Wrong",
            position: "top",
            type: "danger"
          });
          Actions.auth();
        }
      })
      .catch(error => {
        // console.log(error.response);
        this.setState({ cardLoad: false });
        Toast.show({
          text: "Something Went Wrong",
          position: "top",
          type: "danger"
        });
        Actions.auth();
      });
  }
  onLoad() {
    if (this.state.balanceLoad) {
      return <Spinner color="#69db84" />;
    }
    return (
      <NumberFormat
        value={this.state.user.user_wallet_balance}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs "}
        renderText={value => (
          <Text style={{ color: "#69db84", fontSize: 34 }}>{value}</Text>
        )}
      />
    );
  }
  onLoadCard() {
    // console.log(this.state.subscribers);
    if (this.state.cardLoad) {
      return <Spinner color="#00590f" />;
    }
    return this.state.subscribers.map(subscriber => {
      return (
        <SubscriberCard
          key={subscriber.subscriber_id}
          data={subscriber}
          onPay={() => this.getBalance()}
          Token={this.state.Token}
        />
      );
    });
  }
  shiftingToMain() {
    if (this.props.home) {
      this.props.shiftedToMain();
      this.artificial_function();
    }
  }
  render() {
    this.shiftingToMain();
    return (
      <Container style={{ backgroundColor: "#f2f2f2" }}>
        <Header transparent span style={{ paddingTop: 30 }}>
          <Card
            padder
            transparent
            style={{
              paddingTop: 5,
              paddingLeft: 5,
              paddingRight: 5,
              width: "100%",
              height: "100%"
            }}
          >
            <CardItem
              style={{
                backgroundColor: "#00590f",
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              {this.onLoad()}
            </CardItem>
            <CardItem style={{ backgroundColor: "#f2f2f2" }} />
          </Card>
        </Header>
        <Content>{this.onLoadCard()}</Content>

        <AppFooter home={true} profile={false} transaction={false} />
      </Container>
    );
  }
}

const MapStateToProps = state => {
  return {
    home: state.shift.home
  };
};
export default connect(
  MapStateToProps,
  { shiftedToMain }
)(Home);
