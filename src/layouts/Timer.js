import React, { Component } from 'react';
import PropTypes from 'prop-types';
import alarm from '../assets/alarm.mp3';
import Helmet from 'react-helmet';

export default class Timer extends Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    start: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (this.props.start) this.startTimer();
    const body = document.querySelector('body');
    body.onkeydown = e => {
      e.preventDefault();
      if (e.keyCode == 32) {
        this.state.playing ? this.stopTimer() : this.startTimer();
      }
      if (e.altKey && e.keyCode == '76') {
        this.resetTimer({}, 600, true);
      }
      if (e.altKey && e.keyCode == '83') {
        this.resetTimer({}, 300, true);
      }
      if (e.altKey && e.keyCode == '80') {
        this.resetTimer({}, 1500, true);
      }
      if (e.altKey && e.keyCode == '82') {
        this.resetTimer({});
      }
    };
  }

  constructor(props) {
    super(props);
    const minutes = Math.floor(props.time / 60);
    const seconds = Math.floor(props.time - minutes * 60);
    this.state = {
      timer: props.time,
      time: props.time,
      minutes: this.formatNumber(minutes),
      seconds: this.formatNumber(seconds),
      playing: props.start
    };
  }

  componentWillUpdate = (nextProps, nextState) => {
    let minutes = Math.floor(nextState.time / 60);
    let seconds = Math.floor(nextState.time - minutes * 60);
    nextState.minutes = this.formatNumber(minutes);
    nextState.seconds = this.formatNumber(seconds);
  };

  formatNumber = n => {
    return n.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
  };

  startTimer = () => {
    this.setState({ playing: true });
    const { time } = this.state;
    const currentTime = Date.now();
    const timeTillRun = currentTime + time * 1000;
    this.intervel = setInterval(() => {
      let left = Math.round((timeTillRun - Date.now()) / 1000);
      if (left == 25) this.audio.play();
      if (left < 25) this.audio.resume();
      if (left < 0 || !this.state.playing) {
        clearInterval(this.intervel);
        return;
      }
      this.setState({ time: left });
    }, 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervel);
  };

  stopTimer = () => {
    this.audio.pause();
    this.audio.currentTime = 0;
    clearInterval(this.intervel);
    this.setState({ playing: false });
  };

  resetTimer = (e, time = this.state.timer, start = false) => {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.setState({ time }, () => {
      clearInterval(this.intervel);
      this.setState({ playing: false }, () => {
        if (start) this.startTimer();
      });
    });
  };

  render() {
    return (
      <div className="grid">
        <Helmet>
          <title>
            {this.state.playing
              ? `(${this.state.minutes} : ${this.state
                .seconds}) | Pomodoro Timer`
              : 'Pomodoro Timer'}
          </title>
        </Helmet>
        <div>
          <a
            className="btn btn-start-time"
            onClick={e => this.resetTimer(e, 1500, true)}
          >
            Pomodoro
          </a>
          <a
            className="btn btn-start-time"
            onClick={e => this.resetTimer(e, 600, true)}
          >
            Long Break
          </a>
          <a
            className="btn btn-start-time"
            onClick={e => this.resetTimer(e, 300, true)}
          >
            Short Break
          </a>
        </div>
        <div className="timer">
          <span className="minutes">{this.state.minutes} :&nbsp;</span>
          <span className="seconds">{this.state.seconds}</span>
        </div>
        <div>
          <a className="btn btn-bottom btn-start" onClick={this.startTimer}>
            Start
          </a>
          <a className="btn btn-bottom btn-stop" onClick={this.stopTimer}>
            Stop
          </a>
          <a className="btn btn-bottom btn-reset" onClick={this.resetTimer}>
            Reset
          </a>
        </div>
        <div className="shortcuts">
          <div>
            <h3>Shortcuts</h3>
            <ul>
              <li>
                Pause/Play : <kbd>Space</kbd>
              </li>
              <li>
                Start Pomodoro: <kbd>Alt</kbd> + <kbd>p</kbd>
              </li>
              <li>
                Start Long Break: <kbd>Alt</kbd> + <kbd>l</kbd>
              </li>
              <li>
                Start Short Break: <kbd>Alt</kbd> + <kbd>s</kbd>
              </li>
              <li>
                Reset Timer: <kbd>Alt</kbd> + <kbd>r</kbd>
              </li>
            </ul>
          </div>
        </div>
        <audio src={alarm} ref={audio => (this.audio = audio)} />
      </div>
    );
  }
}
