import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import platformContract from "./contracts/Platform.json";
// import getWeb3 from "./utils/getWeb3";

import "./App.css";
import {Link} from "react-router-dom";
import Info from"./info";
// import getWeb3 from "./utils/getWeb3";
// import platformContract from "./contracts/Platform";
// import Web3 from "web3";

class AddPerson extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: Info.web3,
            accounts: Info.accounts,
            contract: Info.contract,
            studentName:'',
            email:''
        };

        this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
    addToplatform() {
        if (this.state.contract && this.state.accounts) {
            const studentName = this.state.studentName;
            const email = this.state.email;
            console.log(studentName);
            console.log(email);
            this.state.contract.methods.updatePerson(studentName,email).send({from: this.state.accounts[0]})
                .then((result) => {
                    console.log("in add person");
                    console.log(result);
                }).catch((err) => {
                console.log('error');
                console.log(err);
            });
        } else {
            this.setState(prevState => ({
                ...prevState,
                error: new Error('instance not loaded')
            }))
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


    render() {
        // console.log("web3 is: " + this.state.web3 + " accounts is: " + this.state.accounts + "contract is: " + this.state.contract);
        if (!this.state.web3) {
            console.log("ADD RENDER_________ accounts is: " + this.state.accounts+ " web3 is: " + this.state.web3 + " contract is: " + this.state.contract);
            return <div>Loading Web3, accounts, and contract...</div>;

        }
        return (
            <div id="container">
                <form className="pure-form pure-form-stacked normal" onSubmit= {(e) => {
                    e.preventDefault();
                    // this.addToSimpleStorage();
                    this.addToplatform();
                }}>
                    <div className="title">Add Person</div>
                    <div className="leftpart">
                        <div className="addText">Student Name:</div>
                        <div className="username-field">
                            <input
                                name="studentName"
                                type="text"
                                value={this.state.studentName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="addText">Email:</div>
                        <div className="username-field">
                            <input
                                name="email"
                                type="text"
                                value = {this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="rightpart">
                        <input className="button" type = "submit" name="submit" value = "Submit"/>
                        <Link to="/home" className="abutton">Back</Link>
                    </div>
                </form>


            </div>
        );
    }
}

export default AddPerson;