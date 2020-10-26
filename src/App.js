import React, { Component } from "react";
import { spotifyArray } from "./spotifyArray";

const spotifyHits = spotifyArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: " ", globalArray: spotifyHits };
    //bind the function to constructor to handle event change
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  } // end

  //method called on search form box change
  //js creates an event object
  onSearchFormChange(event) {
    //re-assign the state var called searchTerm(previously empty string)
    // to js event == change in UI item
    this.setState({ searchTerm: event.target.value });
    // console.log(this.state.searchTerm);
  }

  render() {
    return (
      <div className="App container-fluid">
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
    /*this.props are the properties passed to this component
    / we have searchTerm and onChange function. Within the input
    / tag, notice the value of the input is assigned to the searchTerm state
    / previously an empty string. 
    / onChange event listener triggers the onSearchForm function 
    */

    const searchTermFromProps = this.props.searchTerm;
    const onChangeFromProps = this.props.onChange;

    return (
      <div className="input-group mb-3">
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
} // close the SearchForm component

//**************************************************//
class SearchResults extends Component {
  //NB the filter function is within the scope of the
  //searchResults component
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

    //spotifyArray contains song duration in seconds must be changed
    //a.dur becomes parameter of map function below, within the table

    function secondsToMinutes(s) {
      return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Title</th>
            <th scope="col">Year</th>
            <th scope="col">Duration</th>
            <th scope="col">Genre</th>
          </tr>
        </thead>
        {arrayPassedAsParameter
          .filter(this.spotifyFilterFunction(searchTermFromProps))
          .map((a) => (
            <tbody key={a.id}>
              <td>{a.artist}</td>
              <td>{a.title}</td>
              <td>{a.year}</td>
              <td>{secondsToMinutes(a.dur)}</td>
              <td>{a.topgenre}</td>
            </tbody>
          ))}
      </table>
    );
  }
} // close the SearchResults component

export default App;
