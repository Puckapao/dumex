import React from "react";

const TextInput = props => {
   return (
      <React.Fragment>
         <label>
            <p>{props.children}</p>
            <input
               type="text"
               name={props.name}
               value={props.value}
               onChange={props.onChange}
            />
         </label>
      </React.Fragment>
   );
};

export { TextInput };
