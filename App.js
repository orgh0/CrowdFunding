import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom'
import { CrowdFundingContract, ItemContract } from './setup';
import { Header, Progress, List, Card, Statistic,
  Grid, Segment, Label, Message }
  from 'semantic-ui-react'

const ItemInfo = (props) => {
  return (
    <Segment stacked size="large">
      { props.information }
    </Segment>
  )
}

const ItemDetails = (props) => {
  let percent = (props.amount_received / props.goal) * 100;
  percent = Math.round(percent * 10) / 10;

  return (
    <Grid columns={2} divided textAlign="center">
      <Grid.Row>
        <Grid.Column>
          <Statistic>
            <Statistic.Value>{ props.goal }</Statistic.Value>
            <Statistic.Label>Goal</Statistic.Label>
          </Statistic>
        </Grid.Column>

        <Grid.Column>
          <Statistic>
            <Statistic.Value>{ props.deadline }</Statistic.Value>
            <Statistic.Label>Deadline</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Statistic>
            <Statistic.Value>{ props.amount_received }</Statistic.Value>
            <Statistic.Label>Received</Statistic.Label>
          </Statistic>
        </Grid.Column>
        <Grid.Column>
          <Statistic>
            <Statistic.Value>{ props.num_contributions }</Statistic.Value>
            <Statistic.Label>Contributors</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={14}>
          <Progress size="large" percent={ percent } progress />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const ItemContributions = (props) => {
  return (
    <Grid padded columns={1} centered>
        <List divided relaxed>
          {props.donations.map((addr) =>
            <List.Item>
              <List.Content>
                <List.Header>{ addr }</List.Header>
              </List.Content>
            </List.Item>
          )}
        </List>
    </Grid>
  )
}

const Container = (props) => {
  return (
    <Grid padded columns={1} centered>
      <Grid.Column width={14}>
        <Header as='h1' size="huge" textAlign="center">
          <Link to="/">
            Crowd Fund
          </Link>
        </Header>

        { props.element }
      </Grid.Column>
    </Grid>
  )
}

//<Segment size="big" padded="very" textAlign="center" raised>
export const Item = (props) => {
  let itemIdx = parseInt(props.match.params.num, 10);
  if (itemIdx !== itemIdx || itemIdx < 0 || itemIdx >= props.data.num_items) {
    return (
      <Container element={
        <Message negative>
          <Message.Header>
            Item not found!
          </Message.Header>
        </Message>
      }/>
    )
  }

  let item = props.data.items[itemIdx];
  return (
    <Container element={
      <Segment size="large" raised>
        <Label as='a' color='red' ribbon>About</Label>
        <ItemInfo {...item}/>

        <Label as='a' color='blue' ribbon>Details</Label>
        <ItemDetails {...item}/>

        <Label as='a' color='green' ribbon>Contributors</Label>
        <ItemContributions {...item}/>
      </Segment>
    }/>
  )
}

export const Items = (props) => {
  return (
    <Container element={
      props.data.items.map((item, itemIdx) => {
        let percent = (item.amount_received / item.goal) * 100;
        percent = Math.round(percent * 10) / 10;

        return (
          <Card
            header={
              <Progress size="small" percent={ percent } progress>
                { item.num_contributions } backers
              </Progress>
            }
            description={ item.information }
            href={ "/" + itemIdx }
          />
        )})
      }/>
  );
}


class App extends Component {
  getItem(itemAddr) {
    let itemContract = ItemContract.at(itemAddr);

    let item = {
      information: "N/A",
      goal: 0,
      deadline: 0,
      amount_received: 0,
      num_contributions: 0,
      donations: []
    };

    item.information = itemContract.information();
    item.goal = itemContract.goal().toNumber();
    item.deadline = itemContract.deadline().toNumber();
    item.amount_received = itemContract.amount_received().toNumber();
    item.num_contributions = itemContract.num_contributions().toNumber();

    for (let i = 0; i < item.num_contributions; i++) {
      item.donations.push(itemContract.donators(i));
    }

    return item;
  }

  getState() {
    let state = {
      owner: "N/A",
      num_items: 0,
      items: []
    };

    state.owner = this.cfContract.owner();
    state.num_items = this.cfContract.item_num().toNumber();

    for (let i = 0; i < state.num_items; i++) {
      state.items.push(this.getItem(this.cfContract.items(i)));
    }

    return state;
  }

  constructor(props) {
    super(props)
    this.cfContract = CrowdFundingContract.at('0x2a1cd0d110eaa5a00997ddb088a3aa9d249d70bb');
    //this.state = this.getState();
    this.state = {
      owner: "N/A",
      num_items: 1,
      items: [
        {
          information: "This is the first item",
          goal: 1200,
          deadline: 39843,
          amount_received: 500,
          num_contributions: 7,
          donations: [
            "423478912387421",
            "928134291347878",
            "845437568234583",
            "098787675765683",
            "542341234565325",
            "908798797423932",
            "123478958950340"
          ]
        }
      ]
    }
  }

  render() {
    return (
      <Switch>
        <Route exact
          path="/"
          render={ (props) => <Items {...props} data={this.state} /> }
        />
        <Route
          path="/:num"
          render={ (props) => <Item {...props} data={this.state} /> }
        />
      </Switch>
    );
  }
}

export default App;
