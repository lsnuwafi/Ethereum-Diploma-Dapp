import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import platformContract from "./contracts/Platform.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";
// import INFO from "./info";
import Info from"./info";
// import { Link} from "react-router-dom";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
// import Web3 from "web3";


class Check extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: Info.web3,
            accounts: Info.accounts,
            contract: Info.contract,
            studentAddress:'',
            universityAddress:'',
            degree:'',
            path:'detail',
        };
        // this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    viewFromplateform(){
        if(this.state.contract && this.state.accounts){

            const studentAddress = this.state.studentAddress;
            const universityAddress = this.state.universityAddress;
            this.state.contract.methods.viewDiploma(studentAddress,universityAddress).call()
                .then((result) => {


                    console.log(result);

                    this.setState({
                        degree: result[0],
                        date: result[1],
                    })
                    console.log("in the then degree:" + this.state.degree);
                    console.log("in the then date:" + this.state.date);

                    Info.studentAddress = this.state.studentAddress;
                    Info.universityAddress = this.state.universityAddress;
                    Info.degree = this.state.degree;
                    Info.date = this.state.date;


                }).catch((err)=>{
                    console.log('error');
                    console.log(err);
            });
        }else {
            this.setState((prevState =>({
                ...prevState,
                error: new Error('instance not loaded')
            })))
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    // changeRouter = () => {
    //     console.log(this.props)
    //     // this.props.router.push('/follow');
    //     // this.props.router.push({
    //     //     pathname:'/follow',
    //     //     state:{name:'xxx'},
    //     //     query: {foo: 'bar'}
    //     // })
    //
    //     // this.props.router.replace('/follow');
    //     this.props.router.replace({
    //         pathname: '/detail',
    //         query: {foo:'bar'}
    //     })
    // }


    render() {
        // console.log("web3 is: " + this.state.web3 + " accounts is: " + this.state.accounts + "contract is: " + this.state.contract);
        if (!this.state.web3) {
            console.log("ADD RENDER_________ accounts is: " + this.state.accounts+ " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
            return <div>Loading Web3, accounts, and contract...</div>;

        }

        return <React.Fragment>
            <div id="container">
                <form className="pure-form pure-form-stacked normal" onSubmit= {(e) => {
                    e.preventDefault();
                    // this.addToSimpleStorage();
                    this.viewFromplateform();
                }}>
                    <div className="title">Check Diploma</div>
                    <div className="leftpart">
                        <div className="addText">Student Address:</div>
                        <div className="username-field">
                            <input
                                name="studentAddress"
                                type="text"
                                value={this.state.studentAddress}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="addText">University Address:</div>
                        <div className="username-field">
                            <input
                                name="universityAddress"
                                type="text"
                                value = {this.state.universityAddress}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="rightpart">
                        <input className="button" type = "submit" name="submit" value = "submit"/>
                        <Link to="/detail" className="abutton"> Detail</Link>
                        <Link to="/home" className="abutton">Back</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>

    }
}

export default Check;