import {
   CHANGE_STEP,
   INPUT_MUM_NAME,
   YOU_OR_WHO,
   CHOOSE_YOUR_CHILD,
   PREGNANT_OR_HAVE_CHILD,
   PREGNANT_DEADLINE,
   CHILD_INFO_200,
   CHILD_INFO_201,
   CHILD_INFO2,
   CHILD_INFO3,
   ALLERGY_OR_NOT,
   MAIN_QUIZ,
   RESULT
} from "./types";

let fetchStatus;

export const changeStepAction = step => {
   return {
      type: CHANGE_STEP,
      payload: { step }
   };
};

export const inputMumNameAction = state => dispatch => {
   const { firstname, lastname, phone, email } = state;

   fetch("https://api.careline.dumex.rgb72.net/client/members", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         firstname,
         lastname,
         phone,
         email,
         is_sms: false,
         is_call: false,
         is_email: false,
         mom_status: "mom-child",
         due_date: "2019-04-30",
         mom_allergy: "yes",
         force: false
      })
   })
      .then(res => {
         fetchStatus = res.status;
         return res.json();
      })
      .then(data => {
         if (fetchStatus === 200) {
            return dispatch({
               type: INPUT_MUM_NAME,
               payload: { data, step: "2" }
            });
         } else if (fetchStatus === 201) {
            return dispatch({
               type: INPUT_MUM_NAME,
               payload: { data, step: "4" }
            });
         }
         throw new Error("something went wrong");
      })
      .catch(err => console.log(err));
};

export const youOrWhoAction = (newMember, state) => dispatch => {
   const { firstname, lastname, phone, email } = state;

   if (newMember) {
      fetch("https://api.careline.dumex.rgb72.net/client/members", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            firstname,
            lastname,
            phone,
            email,
            is_sms: false,
            is_call: false,
            is_email: false,
            mom_status: "mom-child",
            due_date: "2019-04-30",
            mom_allergy: "yes",
            force: true
         })
      })
         .then(res => {
            return res.json();
         })
         .then(data => {
            return dispatch({
               type: YOU_OR_WHO,
               payload: { data }
            });
         })
         .catch(err => console.log(err));
   }
};

export const chooseYourChildAction = (state, haveSibling) => {
   return {
      type: CHOOSE_YOUR_CHILD,
      payload: { state, haveSibling }
   };
};

export const pregnantOrHaveChildAction = (mom_status, status) => {
   return {
      type: PREGNANT_OR_HAVE_CHILD,
      payload: { mom_status, status }
   };
};

export const pregnantDeadlineAction = (
   due_date,
   memberId,
   childrenId
) => dispatch => {
   const baby_name = "FETUS";
   const birthday = "2019-04-30";
   const birth_term = "full-term";
   const labor = "normal";
   const allergy = "yes";
   const status = "fetus";

   if (!childrenId) {
      fetch(
         `https://api.careline.dumex.rgb72.net/client/members/${memberId}/children`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               baby_name,
               birthday,
               gender: "male",
               labor,
               birth_term,
               allergy,
               status,
               force: true
            })
         }
      )
         .then(res => {
            return res.json();
         })
         .then(data => {
            return dispatch({
               type: PREGNANT_DEADLINE,
               payload: { due_date, data }
            });
         })
         .catch(err => {
            console.log(err);
         });
   } else {
      const data = { id: childrenId };
      dispatch({
         type: PREGNANT_DEADLINE,
         payload: { due_date, data }
      });
   }
};

export const childInfoAction = (baby_name, birthday, memberId) => dispatch => {
   fetch(
      `https://api.careline.dumex.rgb72.net/client/members/${memberId}/children`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            baby_name,
            birthday
         })
      }
   )
      .then(res => {
         fetchStatus = res.status;
         return res.json();
      })
      .then(data => {
         if (fetchStatus === 201) {
            // create new one
            return dispatch({
               type: CHILD_INFO_201,
               payload: { baby_name, birthday, data }
            });
         } else if (fetchStatus === 200) {
            // repeat old one
            return dispatch({
               type: CHILD_INFO_200,
               payload: { baby_name, birthday, data }
            });
         }
      })
      .catch(err => {
         console.log(err);
      });
};

export const childInfo2Action = birth_term => {
   return {
      type: CHILD_INFO2,
      payload: { birth_term }
   };
};

export const childInfo3Action = labor => {
   return {
      type: CHILD_INFO3,
      payload: { labor }
   };
};

export const allergyOrNotAction = (allergy, sibling) => {
   return {
      type: ALLERGY_OR_NOT,
      payload: { allergy, sibling }
   };
};

export const mainQuizAction = (
   state,
   children_id,
   isFetch = true
) => dispatch => {
   const {
      mother_asthma,
      mother_milk_intolerance,
      mother_rhinitis,
      mother_atopic_dermatitis,
      mother_urticaria,
      mother_drug,
      mother_food,
      mother_conjunctivitis,
      father_asthma,
      father_milk_intolerance,
      father_rhinitis,
      father_atopic_dermatitis,
      father_urticaria,
      father_drug,
      father_food,
      father_conjunctivitis,
      brother_asthma,
      brother_milk_intolerance,
      brother_rhinitis,
      brother_atopic_dermatitis,
      brother_urticaria,
      brother_drug,
      brother_food,
      brother_conjunctivitis
   } = state;

   dispatch({
      type: MAIN_QUIZ,
      payload: state
   });

   if (isFetch) {
      fetch("https://api.careline.dumex.rgb72.net/client/allergy-preventions", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            children_id: children_id,
            mother_asthma,
            mother_milk_intolerance,
            mother_rhinitis,
            mother_atopic_dermatitis,
            mother_urticaria,
            mother_drug,
            mother_food,
            mother_conjunctivitis,
            father_asthma,
            father_milk_intolerance,
            father_rhinitis,
            father_atopic_dermatitis,
            father_urticaria,
            father_drug,
            father_food,
            father_conjunctivitis,
            brother_asthma,
            brother_milk_intolerance,
            brother_rhinitis,
            brother_atopic_dermatitis,
            brother_urticaria,
            brother_drug,
            brother_food,
            brother_conjunctivitis
         })
      })
         .then(res => {
            res.json();
         })
         // .then(data => {
         //    return dispatch({
         //       type: MAIN_QUIZ,
         //       payload: state
         //    });
         // })
         .catch(err => {
            console.log(err);
         });
   }
};

export const resultAction = state => dispatch => {
   const {
      baby_name,
      birth_term,
      birthday,
      labor,
      allergy,
      status
   } = state.Children;

   const { firstname, lastname, phone, mom_allergy } = state.Member;

   // status -> born || fetus
   if (status === "born") {
      fetch(
         `https://api.careline.dumex.rgb72.net/client/members/${
            state.memberId
         }/children`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
               baby_name,
               birthday,
               gender: "male",
               labor,
               birth_term,
               allergy,
               status,
               force: true
            })
         }
      )
         .then(res => {
            return res.json();
         })
         .then(data => {
            return dispatch({
               type: RESULT
            });
         })
         .catch(err => {
            console.log(err);
         });
   } else {
      // status = fetus
      fetch("https://api.careline.dumex.rgb72.net/client/members", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            firstname,
            lastname,
            phone,
            mom_allergy,
            force: false
         })
      })
         .then(res => {
            return res.json();
         })
         .catch(err => console.log(err));
   }
};

export const callBackLaterAction = (state, props) => dispatch => {
   const { firstname, lastname, phone, email, is_sms, is_call } = state;
   const { mom_status, mom_allergy } = props;
   const due_date = props.due_date || "2019-04-30";

   return fetch("https://api.careline.dumex.rgb72.net/client/members", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         firstname,
         lastname,
         phone,
         email,
         is_sms,
         is_call,
         is_email: false,
         mom_status,
         due_date,
         mom_allergy,
         force: true
      })
   })
      .then(res => {
         return res.json();
      })
      .catch(err => console.log(err));
};
