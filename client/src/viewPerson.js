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


class SearchPerson extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
            web3: Info.web3,
            accounts: Info.accounts,
            contract: Info.contract,
            studentAddress:'',
            person:'',
            email:'',
            degree: '',
            date: '',
            lastUpdate:'',
        };
        this.addToSimpleStorage = this.addToSimpleStorage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    // runExample = async () => {
    //   const { accounts, contract } = this.state;

    //   // Stores a given value, 5 by default.
    //   await contract.methods.set(5).send({ from: accounts[0] });

    //   // Get the value from the contract to prove it worked.
    //   const response = await contract.methods.get().call();

    //   // Update state with the result.
    //   this.setState({ storageValue: response });
    // };

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

    viewFromplateform(){
        if(this.state.contract && this.state.accounts){

            const studentAddress = this.state.studentAddress;
            this.state.contract.methods.viewPerson(studentAddress).call()
                .then((result) => {
                    //person.name,person.email,person.degree.degree,person.degree.date,person.lastUpdate

                    console.log(result);

                    this.setState({
                        person:result[0],
                        email:result[1],
                        degree: result[2],
                        date: result[3],
                        lastUpdate:result[4],
                    })
                    console.log("in the then degree:" + this.state.degree);
                    console.log("in the then date:" + this.state.date);

                    Info.studentAddress = this.state.studentAddress;
                    Info.person = this.state.person;
                    Info.email = this.state.email;
                    Info.degree = this.state.degree;
                    Info.date = this.state.date;
                    Info.lastUpdate = this.state.lastUpdate;


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
                    <div className="title">View Person Information</div>
                    <div className="leftpart">
                        <div className="addText">Address:</div>
                        <div className="username-field">
                            <input
                                name="studentAddress"
                                type="text"
                                value={this.state.studentAddress}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="rightpart">
                        <input className="button" type = "submit" name="submit" value = "Submit"/>
                        <Link to="/personDetail" className="abutton">Detail</Link>
                        <Link to="/home" className="abutton">Back</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    }
}

export default SearchPerson;