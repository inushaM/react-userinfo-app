import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginActions } from '../actions/loginAction'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faFileWord, faPlay, faSignOutAlt, faTv, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';

class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        // this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.fetchToken(username, password);
        }
    }

    render() {
        const { loginInfo } = this.props;
        const { username, password } = this.state;
        return (
            <div className="container">
                <div className="row divBody">
                    <div className="col-md-1">
                        <ul class="sidebar">
                            <li><a class="active" href="#"><FontAwesomeIcon icon={faPlay} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faFileWord} /></a></li>
                            <li> <a href="#"><FontAwesomeIcon icon={faVideo} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faUsers} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faBriefcase} /></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faTv} /></a></li>
                        </ul>
                    </div>
                    <div className="col-md-11">
                        <div className="row">
                            <div className="col-md-2">MONITOR</div>
                            <div className="col-md-8"></div>
                            <div className="col-md-2">Message</div>
                        </div><hr className="hrLine"></hr>
                        <div className="row">
                            <div className="col-md-4 divUser">



                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h5 className="panel-title">Staff</h5>
                                            </div>
                                        </div>
                                    </div><br />
                                    <div className="panel-body">
                                        <table class="table table-striped">
                                            <thead>
                                            </thead>
                                            <tbody>
                                                {/* {
                                    this.state.studentPaperList.map(
                                        paper =>

                                            <tr>
                                                <td>{paper.paperNo}</td>
                                                <td>{paper.area}</td>
                                                <td>{paper.topic}</td>
                                                <td>{paper.subtopic}</td>
                                                <td>{paper.date}</td>
                                                <td>{paper.averageScore}%</td>
                                                <td>
                                                    <button disabled={!(paper.flag == "ACTIVE")} style={{ marginLeft: "10px" }} onClick={() => this.generatePaperHandler(paper.id, paper.paperNo, paper.area, paper.topic, paper.subtopic, paper.uniqueId)} className="btn btn-outline-success"><FontAwesomeIcon icon={faCogs} /> Continue</button>
                                                </td>
                                                <td>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.viewPaper(paper.id)} className="btn btn-outline-info"><FontAwesomeIcon icon={faEye} /> View </button>
                                                </td>
                                            </tr>
                                    )
                                } */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>








                            </div>
                            <div className="col-md-7">
                                <div className="row">
                                    <div className="col-md-12 divUser">MAP</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 divUser">LIST</div>
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
const mapStateToProps = state => {
    return {
        loginInfo: state.info.token
    }
}

//send data to the Action
const mapDispatchToProps = {
    // fetchToken: loginActions.fetchToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)