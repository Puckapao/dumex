import React, { Component } from "react";

export default class ShowStep extends Component {
   render() {
      return (
         <React.Fragment>
            <p>{`Step : ${this.props.current}/${this.props.of}`}</p>
         </React.Fragment>
      );
   }
}
