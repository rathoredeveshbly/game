/** @format */

import React, { Component } from "react";

class Football extends Component {
  state = {
    matches: [],
    team: ["France", "England", "Brazil", "Germany", "Argentina"],
    view: "",
    obj: { team1: "", team2: "", score1: 0, score2: 0 }
  };
  startMatch = () => {
      if (this.state.obj.team1 === "") {
          alert("Select team1");
      } else if (this.state.obj.team2 === "") {
          alert("Select team2");
      } else if (this.state.obj.team1 === this.state.obj.team2) {
          alert("Select different team");
    } else {
      this.setState({ view: "match" });
    }
  };
  handleMatchOver = () => {
    var newObj = { ...this.state.obj };
    var newArr = [...this.state.matches];
    newArr.push(newObj);
    newObj = { team1: "", team2: "", score1: 0, score2: 0 };
    this.setState({ matches: newArr, view: "", obj: newObj });
  };
  getPlayed = item => {
    var played = 0;
    this.state.matches.map(val =>
      val.team1 === item || val.team2 === item ? played++ : played
    );
    return played;
  };
  getWon = item => {
    var won = 0;
    this.state.matches.map(val => {
      if (
        (val.team1 === item && val.score1 > val.score2) ||
        (val.team2 === item && val.score1 < val.score2)
      ) {
        won++;
      }
    });
    return won;
  };
  getLost = item => {
    var lost = 0;
    this.state.matches.map(val => {
      if (
        (val.team1 === item && val.score1 < val.score2) ||
        (val.team2 === item && val.score1 > val.score2)
      ) {
        lost++;
      }
    });
    return lost;
  };
  getDrawn = item => {
    var drawn = 0;
    this.state.matches.map(val => {
      if (
        (val.team1 === item && val.score1 === val.score2) ||
        (val.team2 === item && val.score1 === val.score2)
      ) {
        drawn++;
      }
    });
    return drawn;
  };
  getScore11 = item => {
    var goal = 0;
    this.state.matches.map(val => {
      if(val.team1 === item ) 
       {
          goal += val.score1;
        }
      else if (val.team2 === item) {
          goal += val.score2;
        }
    });
    return goal;
  };
    getScore22 = item => {
        var goal = 0;
        this.state.matches.map(val => {
          if(val.team1 === item ) 
           {
              goal += val.score2;
            }
          else if (val.team2 === item) {
              goal += val.score1;
            }
        });
        return goal;
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <ul>
            <li>
              <a className="navbar-brand" href="#">
                Football Tournament
              </a>
              <a className="navbar-brand" href="#">
                Number of Matches{" "}
                <span className="badge badge-primary">
                  {this.state.matches.length}
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.setState({ view: "am" })}>
          All Matches
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.setState({ view: "pt" })}>
          Point Table
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.setState({ view: "nm" })}>
          New Match
        </button>
        {this.state.view === "nm" ? (
          <div className="container text-center">
            <h5>Choose Team 1</h5>
            {this.state.team.map(n1 => (
              <button
                className="btn btn-warning m-2"
                onClick={() => {
                  var data = this.state.obj;
                  data.team1 = n1;
                  this.setState({ obj: data });
                }}>
                {n1}
              </button>
            ))}
            <br />
            
            <h5>Choose Team 2</h5>
            {this.state.team.map(n1 => (
              <button
                className="btn btn-warning m-2"
                onClick={() => {
                  var data = this.state.obj;
                  data.team2 = n1;
                  this.setState({ obj: data });
                }}>
                {n1}
              </button>
            ))}
            <br />
            <button
              className="btn btn-dark m-2"
              onClick={() => this.startMatch()}>
              Start Match
            </button>
          </div>
        ) : null}{" "}
        {this.state.view === "match" ? (
          <div className="container text-center">
            <h5>Welcome to an exciting match</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
              className="container">
              <div>
                {this.state.obj.team1}
                <br />
                <button
                  onClick={() => {
                    var data = this.state.obj;
                    data.score1++;
                    this.setState({ obj: data });
                  }}
                  className="btn btn-warning">
                  Goal Scored
                </button>
              </div>
              <div style={{ marginTop: 15, fontSize: 30, fontWeight: 500 }}>
                {this.state.obj.score1 + "-" + this.state.obj.score2}
              </div>
              <div>
                {this.state.obj.team2}
                <br />
                <button
                  onClick={() => {
                    var data = this.state.obj;
                    data.score2++;
                    this.setState({ obj: data });
                  }}
                  className="btn btn-warning">
                  Goal Scored
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                this.handleMatchOver();
              }}
              className="btn btn-warning">
              Match Over
            </button>
          </div>
        ) : null}
        {this.state.view === "am" ? (
          <div className="container text-center">
            <h5>Result of the matches so far</h5>
            <div className="row">
              <div className="col-3 bg-dark text-white">Team1</div>
              <div className="col-3 bg-dark text-white">Team2</div>
              <div className="col-3 bg-dark text-white">Score</div>
              <div className="col-3 bg-dark text-white">Result</div>
            </div>

            {this.state.matches.map(item => (
              <div className="row">
                <div className="col-3">{item.team1}</div>
                <div className="col-3">{item.team2}</div>
                <div className="col-3">{item.score1 + "-" + item.score2}</div>
                <div className="col-3">
                  {item.score1 > item.score2
                    ? item.team1 + " Won"
                    : item.score1 < item.score2
                    ? item.team2 + " Won"
                    : "Match Drawn"}
                </div>
              </div>
            ))}
          </div>
        ) : null}{" "}
        {this.state.view === "pt" ? (
          <div className="container text-center">
            <h5>Point Table</h5>
            <div className="row">
              <div className="col-3 bg-dark text-white">Team</div>
              <div className="col-1 bg-dark text-white">Played</div>
              <div className="col-1 bg-dark text-white">Won</div>
              <div className="col-1 bg-dark text-white">Lost</div>
              <div className="col-1 bg-dark text-white">Drawn</div>
              <div className="col-2 bg-dark text-white">Goals For</div>
              <div className="col-2 bg-dark text-white">Goals Against</div>
              <div className="col-1 bg-dark text-white">Points</div>
            </div>
            {this.state.team.map(item => (
              <div className="row">
                <div className="col-3">{item}</div>
                <div className="col-1">{this.getPlayed(item)}</div>
                <div className="col-1">{this.getWon(item)}</div>
                <div className="col-1">{this.getLost(item)}</div>
                <div className="col-1">{this.getDrawn(item)}</div>
                <div className="col-2">{this.getScore11(item)}</div>
                <div className="col-2">{this.getScore22(item)}</div>
                <div className="col-1">{(this.getWon(item))*3+this.getLost(item)*0+this.getDrawn(item)}</div>
              </div>
            ))}
          </div>
        ) : null}{" "}
      </div>
    );
  }
}

export default Football;

