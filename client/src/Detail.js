import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import platformContract from "./contracts/Platform.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";
import {Link} from "react-router-dom";
// import INFO from "./info";
import Info from"./info";
// import Web3 from "web3";

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: Info.web3,
            accounts: Info.accounts,
            contract: Info.contract,
            studentAddress: Info.studentAddress,
            universityAddress: Info.universityAddress,
            degree: Info.degree,
            date: Info.date
        };
        this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
    }


    addToSimpleStorage() {
        if (this.state.contract && this.state.accounts) {
            const value = this.storageAmountInput.value;
            console.log('value to be stored is');
            console.log(value);
            this.state.contract.methods.set(value).send({from: this.state.accounts[0]})
                .then((result) => {
                    return this.state.contract.methods.get().call()
                }).then((result) => {
                this.setState({
                    storageValue: result
                });
            }).catch((err) => {
                console.log('error');
                console.log(err);
            });
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: new Error('simple storage instance not loaded')
            }))
        }
    }



    render() {
        // console.log("web3 is: " + this.state.web3 + " accounts is: " + this.state.accounts + "contract is: " + this.state.contract);
        if (!this.state.web3) {
            console.log("ADD RENDER_________ accounts is: " + this.state.accounts+ " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
            return <div>Loading Web3, accounts, and contract...</div>;

        }

        return (
            <div id="container">
                <form className="pure-form pure-form-stacked normal">
                    <div className="title">Degree Details: </div>
                    <div className="leftpart">
                        <div className="addText">Student Address:</div>
                        <div className="username-field">
                            <input
                                name="studentAddress"
                                type="text"
                                value={this.state.studentAddress}
                            />
                        </div>
                        <div className="addText">Student Degree:</div>
                        <div className="username-field">
                            <input
                                name="degree"
                                type="text"
                                value = {this.state.degree}
                            />
                        </div>
                        <div className="addText">Add date:</div>
                        <div className="username-field">
                            <input
                                name="date"
                                type="text"
                                value = {this.state.date}
                            />
                        </div>
                    </div>
                    <div className="rightpart">
                        <Link to="/home" className="backbutton">Back</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Detail;