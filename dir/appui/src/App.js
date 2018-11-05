import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CrowdFundingContract } from './setup'; 



export class ShowMovies extends Component{
  handleChange=(item)=>{
      let _item=item;
      this.props.vote(_item)
  }

  render(){
      let movieList=this.props.movies.map((movie,i)=>
      <tr key={i}>
          <td onClick={this.handleChange.bind(this,movie.name)}>{movie.name}</td>
          <td>{movie.rating}</td>
      </tr>)
      return(
          <div>
          <h3>Items Inventory</h3>
          <hr />
          <table >
              <tbody>
                  <tr>
                      <th>Items</th>
                      <th>Count</th> 
                  </tr>
                  {movieList}
              </tbody>
          </table>
        </div>
      )
  } 
}


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      lists : [{name:'Product1',rating:0},{name:'Product2',rating:0},{name:'Product3',rating:0}]
    }
  
  }

  handleOrder(item){
    CrowdFundingContract.CountForItems(item)
    let votes=CrowdFundingContract.totalCountFor(item).toNumber()
    this.setState({lists:this.state.lists.map(
      (el)=>el.name===item? Object.assign({},el,{rating:votes}):el
    
    )});
  }
  
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Crowd Funding Application in Ethereum and React
        </p>
        <div className="movie-table">
          <ShowMovies movies={this.state.lists} vote={this.handleOrder}/>
        </div>
      </div>
    );
  }
}

export default App;
