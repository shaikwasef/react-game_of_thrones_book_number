import React from "react";
import "./style.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { characterName: [] };
  }

  async onEnter(event){
    const book_url =
      "https://www.anapioficeandfire.com/api/books/" + event.target.value;
    var charactersUrls = await axios.get(book_url);
    console.log(charactersUrls.data.characters.length);
    var axiosRequests = []; 
    charactersUrls.data.characters.forEach((key) => axiosRequests.push(axios.get(key)));
    axios.all(axiosRequests).then(axios.spread((...responses) => {
      for(let i =0 ; i < responses.length ; i++){
        this.setState({characterName : this.state.characterName.concat(responses[i].data.name)});
      }})).catch((error) => console.log(error));
    }

  render() {
    const names = this.state.characterName.map((name ,i) => {
      return <li key = {i}>{name}jhjb</li>;}
    );
    return (
      <div>
        <input
          onKeyPress={() => this.onEnter(event)}
          placeholder="Enter Book Number"
        />
        {names}
      </div>
    );
  }
}

export default App;
