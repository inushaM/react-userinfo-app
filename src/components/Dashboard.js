import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userActions } from '../actions/userAction'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faFileWord, faPlay, faTv, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
import SimpleMap from '../utils/SimpleMap'
const axios = require('axios')

class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            userLogs: [],
            name: '',
            latitude: 0,
            longitude: 0,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFjaGFsYSIsImV4cCI6MTYxOTM1OTgxMywiZW1haWwiOiJhY2hhbGFAbWFpbGluYXRvci5jb20iLCJvcmlnX2lhdCI6MTYxOTM1NjIxM30.rlp19e8QhjhkMYD_sHovSlZHiyWqf32DQs8B6zoirsQ',
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        const token = this.state.token;
        this.props.fetchUsers(token);
    }

    staffHandler = (id) => {
        const token = this.state.token;
        axios.get('http://apps.avantrio.xyz:8010/api/user/' + id + '/logs', { headers: { "Authorization": `Bearer ${token}` } })
            .then(res => {
                this.setState({
                    userLogs: res.data.logs,
                    name: res.data.user,
                });
            }).catch(err => {
                console.log(err);
            });
    }

    viewMapHandler = (latitude, longitude) => {
        this.setState({
            latitude: latitude,
            longitude: longitude
        });
    }

    render() {
        const { userLogs, name } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1">
                        <ul class="sidebar">
                            <li><a className="active" href="#"><FontAwesomeIcon icon={faPlay} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faFileWord} /></a></li>
                            <li> <a href="#"><FontAwesomeIcon icon={faVideo} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faUsers} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faBriefcase} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faTv} /></a></li>
                        </ul>
                    </div>
                    <div className="col-md-10">
                        <div className="row divTop">
                            <div className="col-md-2">MONITOR</div>
                            <div className="col-md-7"></div>
                            <div className="col-md-3">
                                <button className="button messageButton">Message</button>
                                <button className="button sosButton">SOS</button>
                            </div>
                        </div><hr className="hrLine"></hr>
                        <div className="row">
                            <div className="col-md-4 divUser">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h5 className="panel-title titleMargin">Staff</h5>
                                                <hr className="hrLineStaff"></hr>
                                            </div>
                                        </div>
                                    </div><br />
                                    <div className="panel-body">
                                        <table className="table table-borderless">
                                            <thead>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.props.userData.users.map(
                                                        user =>
                                                            <tr>
                                                                <button className="button staffButton" onClick={() => this.staffHandler(user.id)}>{user.name}</button>
                                                            </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-12 divUser">
                                        <SimpleMap />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 divUser">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h6 className="panel-title titleMargin">History  ( {name} )</h6>
                                                        <hr className="hrLineStaff"></hr>
                                                    </div>
                                                </div>
                                            </div><br />
                                            <div className="panel-body">
                                                <table className="table table-borderless">
                                                    <thead>
                                                        <button class="button styleRemoveButton">
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Alert view</th>
                                                            <th scope="col">Time</th>
                                                            <th></th><th></th><th></th>
                                                            <th scope="col">Location</th>
                                                        </button>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            userLogs.map(
                                                                log =>
                                                                    <button className="button staffButton" onClick={() => this.viewMapHandler(log.latitude, log.longitude)}>
                                                                        <tr>
                                                                            <td>{log.date}</td>
                                                                            <td>{log.alert_view === true ? "true" : "false"}</td>
                                                                            <td>{log.time}</td>
                                                                            <td></td><td></td><td></td>
                                                                            <td className="liveMapColor">Live Map</td>
                                                                        </tr>
                                                                    </button>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        )
    }
}

//get data from store(Receive redux state)
const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

//send data to the Action
const mapDispatchToProps = {
    fetchUsers: userActions.fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)