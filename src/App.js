import React, { Component } from 'react';
import loop from './loop.mp3';
import win from './win.mp3';
import './App.css';

class App extends Component {
  state = {
    names: [],
    name: '?'
  }

  showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target.result);
      const names = text.replace(/\r\n/g, "\n").split("\n").filter(line => line);
      this.setState({
        names
      });
    };
    reader.readAsText(e.target.files[0]);
  }

  onClick = () => {
    let i = 0;
    const loop = document.getElementsByClassName("loop")[0];
    const win = document.getElementsByClassName("win")[0];
    loop.play();
    const random = setInterval(() => {
      document.getElementById("headerNames").innerHTML = this.state.names[i++ % this.state.names.length];
    }, 50);
    setTimeout(() => {
      clearInterval(random);
      loop.pause();
      win.play();
      this.setState({
        name: this.state.names[Math.floor(Math.random() * (this.state.names.length))]
      });
    }, 5000);
  }

  reset = () => {
    window.location.reload();
  }
  render() {
    return (
      <div>
        <audio className="loop"><source src={loop}></source></audio>
        <audio className="win"><source src={win}></source></audio>
        <h1 id="headerNames">{this.state.name}</h1>
        {
          !this.state.names.length ? (
            <div className="selectFile">
              <label htmlFor="file">Çekiliş Listesini Aktar</label>
              <input type="file" id="file" onChange={e => this.showFile(e)} />
            </div>
          ) : this.state.name === "?" ? (
            <div className="start" onClick={this.onClick}>Şanslı kişiyi seç</div>
          ) : (
                <div className="reset" onClick={this.reset}>Sıfırla</div>
              )
        }

      </div>
    )
  }
}

export default App;