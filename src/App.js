import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {

    const [progress, setProgress] = useState(0);
    const pageSize = 6;
    const apikey = process.env.REACT_APP_NEWS_API_KEY
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
        
      />
        <Switch>
          <Route exact path="/"><News apikey={apikey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/></Route>
          <Route exact path="/business"><News apikey={apikey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/></Route>
          <Route exact path="/sports"><News apikey={apikey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/></Route>
          <Route exact path="/entertainment"><News apikey={apikey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/></Route>
          <Route exact path="/science"><News apikey={apikey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/></Route>
          <Route exact path="/technology"><News apikey={apikey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/></Route>
          <Route exact path="/health"><News apikey={apikey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/></Route>
          </Switch>
        </Router>
      </div>
    );
  }


export default App;
