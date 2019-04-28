import React from "react";

const Radio = props => {
   return (
      <React.Fragment>
         <label>
            <p>{props.children}</p>
            <input
               type="radio"
               value={props.value}
               name={props.name}
               checked={props.checked}
               onChange={props.onChange}
            />
         </label>
      </React.Fragment>
   );
};

export { Radio };
