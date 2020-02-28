import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "./Home";
import AddDiploma from "./addDiploma";
import Check from "./Check";
import AddPerson from "./addPerson";
import Detail from "./Detail";
import SearchPerson from "./viewPerson";
import PersonDetail from "./personDetail";
export default class App extends React.Component {
    render() {
        return <React.Fragment>
            <Router>
                <Route path="/home" component={Home} />
                <Route path="/addDiploma" component={AddDiploma}/>
                <Route path="/check" component={Check}/>
                <Route path="/detail" component={Detail}/>
                <Route path="/addPerson" component={AddPerson}/>
                <Route path="/person" component={SearchPerson}/>
                <Route path="/personDetail" component={PersonDetail}/>


            </Router>
        </React.Fragment>
    }
}