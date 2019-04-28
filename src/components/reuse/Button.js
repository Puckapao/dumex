import React from "react";

const Button = props => {
   return (
      <React.Fragment>
         <button onClick={props.onClick} disabled={props.disabled}>
            {props.children}
         </button>
      </React.Fragment>
   );
};

export { Button };
