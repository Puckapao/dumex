import React from "react";

const Checkbox = props => {
   return (
      <React.Fragment>
         <label>
            <input
               type="checkbox"
               name={props.name}
               value={props.value}
               checked={props.checked}
               onChange={props.onChange}
            />
            <p>{props.children}</p>
         </label>
      </React.Fragment>
   );
};

export { Checkbox };
