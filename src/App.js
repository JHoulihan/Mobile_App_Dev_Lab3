import React, { Component } from "react";
import { spotifyArray } from "./spotifyArray";

const spotifyHits = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: " ", len: 0, globalArray: spotifyHits };
    //bind the function to constructor to handle event change
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  } // end

  //method called on search form box change
  //js creates an event object
  onSearchFormChange(event) {
    //re-assign the state var called searchTerm(previously empty string)
    // to js event == change in UI item
    this.setState({ searchTerm: event.target.value });
    let sTerm = event.target.value;
    let numChars = sTerm.length;
    this.setState({ len: numChars }); // typed in value
  }

  render() {
    return (
      <div className="App">
        <SearchForm
          searchTerm={this.state.searchTerm}
          onChange={this.onSearchFormChange}
        />
        <SearchResults
          searchTerm={this.state.searchTerm}
          globalArray={this.state.globalArray}
        />
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

//**************************************************//
class SearchForm extends Component {
  render() {
    //this.props are the properties passed to this component
    //we have searchTerm and onChange function

    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;

    return (
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Title/Artist/Genre"
          aria-label="Title/Artist/Genre"
          value={searchTermFromProps}
          onChange={onChangeFromProps}
          aria-describedby="basic-addon1"
        ></input>
      </div>
    );
  }
} // close the ComponentA component

//**************************************************//
class SearchResults extends Component {
  //NB the filter function is within the scope of the
  //searchRsults component
  spotifyFilterFunction(searchTerm) {
    return function (spotObj) {
      let title = spotObj.title;
      let artist = spotObj.artist;
      let genre = spotObj.topgenre;

      return (
        searchTerm !== "" &&
        (title.includes(searchTerm) ||
          artist.includes(searchTerm) ||
          genre.includes(searchTerm))
      );
    };
  }

  render() {
    const arrayPassedAsParameter = this.props.globalArray;
    const searchTermFromProps = this.props.searchTerm;

    return (
      //<div className="SearchResultsDisplay">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Artist</th>
            <th scope="col">Genre</th>
          </tr>
        </thead>
        {arrayPassedAsParameter
          .filter(this.spotifyFilterFunction(searchTermFromProps))
          .map((a) => (
            // <div key={a.id}>
            <tbody key={a.id}>
              <td>{a.title}</td>
              <td>{a.artist}</td>
              <td>
                <i>{a.topgenre}</i>
              </td>
            </tbody>
            //</div>
          ))}
      </table>
      //</div>
    );
  }
} // close the ComponentB component

export default App;
