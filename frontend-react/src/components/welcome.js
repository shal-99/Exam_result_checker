import React from 'react'
import { Link } from "react-router-dom";


class Welcome extends React.Component {
    render() {
        return(
        <div>
         <h1>Continue to Check Your Result</h1>
         <button className="continueButton">
              <Link
                to={"/allresults" }
                className="link-update" 
              >
                Continue
              </Link></button>
        </div>);
    }
}

export default Welcome