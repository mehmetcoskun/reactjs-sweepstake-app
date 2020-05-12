import React, { Component } from 'react';
import loopAudio from './assets/audios/loop.mp3';
import winAudio from './assets/audios/win.mp3';
import './assets/css/App.css';

class App extends Component {
  state = {
    names: [],
    name: '?'
  }

  showFile = async e => {
    e.preventDefault();
    if (e.target.files[0].name.split('.').pop().toLowerCase() !== 'txt') {
      alert('Çekiliş listesi sadece Metin Belgesi (txt) olabilir!');
      return false;
    }
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;
      const names = text.replace(/\r\n/g, '\n').split('\n').filter(line => line);
      this.setState({
        names
      });
    };
    reader.readAsText(e.target.files[0]);
  }

  onClick = () => {
    const loopAudio = document.getElementsByClassName('loopAudio')[0];
    const winAudio = document.getElementsByClassName('winAudio')[0];
    loopAudio.play();
    let i = 0;
    const randomNames = setInterval(() => {
      document.getElementById('names').innerHTML = this.state.names[i++ % this.state.names.length];
    }, 50);
    setTimeout(() => {
      clearInterval(randomNames);
      loopAudio.pause();
      winAudio.play();
      this.setState({
        name: this.state.names[Math.floor(Math.random() * (this.state.names.length))]
      });
    }, 5000);
  }

  render() {
    return (
      <div>
        <audio className="loopAudio"><source src={loopAudio}></source></audio>
        <audio className="winAudio"><source src={winAudio}></source></audio>
        <h1 id="names">{this.state.name}</h1>
        <div className="wrap">
          {
            !this.state.names.length ? (
              <div>
                <button className="selectFile" onClick={() => {
                  document.getElementById('file').click();
                }}>Çekiliş Listesini Aktar (txt)</button>
                <input type="file" id="file" onChange={e => this.showFile(e)} />
              </div>
            ) : this.state.name === '?' ? (
              <button className="start" onClick={this.onClick}>Şanslı kişiyi seç</button>
            ) : (
                  <button className="reset" onClick={() => {
                    window.location.reload();
                  }}>Sıfırla</button>
                )
          }
        </div>
      </div>
    )
  }
}

export default App;