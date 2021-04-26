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
            token: '',
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.staffHandler = this.staffHandler.bind(this);
        this.viewMapHandler = this.viewMapHandler.bind(this);
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        const {token} = this.props;
        this.props.fetchUsers(token);
    }

    staffHandler = (id) => {
        const {token} = this.props;
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
    //view google map location
    viewMapHandler = (latitude, longitude) => {
        this.setState({
            latitude: latitude,
            longitude: longitude
        });
    }

    render() {
        const { userLogs, name, latitude, longitude } = this.state;
        const {users } = this.props;
        return (
            <div className="row">
                <div className="col-md-1">
                    <ul className="sidebar">
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
                        <div className="col-md-2 divTextAlign">
                            <button className="button messageButton">Message</button>
                        </div>
                        <div className="col-md-1 divTextAlign">
                            <button className="button sosButton shadow">SOS</button>
                        </div>
                    </div><hr className="hrLine"></hr>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card cardMarginThree border-0 shadow-sm p-3 mb-5 bg-white rounded">
                                <div className="card-header cardBackground mapCard">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h6 className="text-color">STAFF</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body border-top border-danger staffCard">
                                    <table className="table table-borderless">
                                        <thead>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.users.map(
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
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card cardMarginOne border-0 cardBackground shadow-sm p-3 mb-5 bg-white rounded">
                                        <div className="card-body mapCard">
                                            <SimpleMap latitude={latitude} longitude={longitude} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card cardMarginTwo border-0 shadow-sm p-3 mb-5 bg-white rounded">
                                        <div className="card-header cardBackground mapCard">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h6 className="panel-title titleMargin">History  ( {name} )</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body border-top border-danger">
                                            <table className="table table-borderless">
                                                <thead>
                                                    <button className="button styleRemoveButton">
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
            </div>
        )
    }
}

//get data from store(Receive redux state)
const mapStateToProps = (state) => {
    return {
      token: state.login.info,
      users: state.userData.users
    };
  };

//send data to the Action
const mapDispatchToProps = {
    fetchUsers: userActions.fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)