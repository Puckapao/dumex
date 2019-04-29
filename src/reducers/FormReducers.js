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
} from "../actions/types";

const INITIAL_STATE = {
   step: "1",

   memberId: "",

   Member: {
      // step 1 InputMumName
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      // step 4 PregnantOrHaveChild
      mom_status: "", // [mom-child, pregnancy]
      // step 5.1A
      due_date: "2015-12-30",
      // step 6 AllergyOrNot
      mom_allergy: "", // [yes, not-sure, no]
      // step 9 CallBackLater
      is_sms: false,
      is_call: false,
      is_email: false,
      force: false
   },

   Children: {
      id: "",
      // step 5.2A
      baby_name: "",
      birthday: "2015-12-30",
      // step 5.2B
      birth_term: "", //[full-term, pre-term]
      // step 5.2C
      labor: "", //[normal, c-section(ผ่าคลอด)]
      // step 6 AllergyOrNot
      allergy: "", //[yes, not-sure, no]

      // ???
      status: "",
      gender: ""
   },

   // step 6
   sibling: "",

   // step 7
   AllergyPrevention: {
      mother_asthma: "yes",
      mother_milk_intolerance: "yes",
      mother_rhinitis: "yes",
      mother_atopic_dermatitis: "yes",
      mother_urticaria: "yes",
      mother_drug: "yes",
      mother_food: "yes",
      mother_conjunctivitis: "yes",

      father_asthma: "yes",
      father_milk_intolerance: "yes",
      father_rhinitis: "yes",
      father_atopic_dermatitis: "yes",
      father_urticaria: "yes",
      father_drug: "yes",
      father_food: "yes",
      father_conjunctivitis: "yes",

      brother_asthma: "yes",
      brother_milk_intolerance: "yes",
      brother_rhinitis: "yes",
      brother_atopic_dermatitis: "yes",
      brother_urticaria: "yes",
      brother_drug: "yes",
      brother_food: "yes",
      brother_conjunctivitis: "yes"
   }
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case CHANGE_STEP:
         return {
            ...state,
            step: action.payload.step
         };
      case INPUT_MUM_NAME:
         let due_date = "";
         if (action.payload.data.due_date) {
            due_date = action.payload.data.due_date.split("T")[0];
         }

         return {
            ...state,
            memberId: action.payload.data.id,
            Member: {
               ...state.Member,
               firstname: action.payload.data.firstname,
               lastname: action.payload.data.lastname,
               phone: action.payload.data.phone,
               email: action.payload.data.email,
               mom_status: action.payload.data.mom_status,
               due_date: due_date,
               mom_allergy: action.payload.data.mom_allergy,
               is_sms: action.payload.data.is_sms,
               is_call: action.payload.data.is_call,
               is_email: action.payload.data.is_email
            },
            step: action.payload.step
         };
      case YOU_OR_WHO:
         return {
            ...state,
            Member: {
               ...state.Member,
               force: action.payload.newMember
            }
         };
      case CHOOSE_YOUR_CHILD:
         let birthday = "";
         if (action.payload.state.birthday) {
            birthday = action.payload.state.birthday.split("T")[0];
         }
         return {
            ...state,
            Children: {
               ...state.Children,
               id: action.payload.state.id,
               baby_name: action.payload.state.baby_name,
               birthday: birthday,
               birth_term: action.payload.state.birth_term,
               labor: action.payload.state.labor,
               allergy: action.payload.state.allergy,
               status: action.payload.state.status,
               gender: action.payload.state.gender
            },
            sibling: action.payload.haveSibling
         };
      case PREGNANT_OR_HAVE_CHILD:
         return {
            ...state,
            Member: {
               ...state.Member,
               mom_status: action.payload.mom_status
            },
            Children: {
               ...state.Children,
               status: action.payload.status
            }
         };
      case PREGNANT_DEADLINE:
         return {
            ...state,
            Member: {
               ...state.Member,
               due_date: action.payload.due_date
            },
            Children: {
               ...state.Children,
               id: action.payload.data.id
            }
         };
      case CHILD_INFO_201:
         return {
            ...state,
            Children: {
               ...state.Children,
               id: action.payload.data.id,
               baby_name: action.payload.baby_name,
               birthday: action.payload.birthday,
               status: "born"
            }
         };
      case CHILD_INFO_200:
         birthday = "";
         if (action.payload.birthday) {
            birthday = action.payload.birthday.split("T")[0];
         }

         return {
            ...state,
            Children: {
               ...state.Children,
               id: action.payload.data.id,
               baby_name: action.payload.baby_name,
               birthday: birthday,
               birth_term: action.payload.data.birth_term,
               labor: action.payload.data.labor,
               allergy: action.payload.data.allergy,
               status: action.payload.data.status,
               gender: action.payload.data.gender
            }
         };
      case CHILD_INFO2:
         return {
            ...state,
            Children: {
               ...state.Children,
               birth_term: action.payload.birth_term
            }
         };
      case CHILD_INFO3:
         return {
            ...state,
            Children: {
               ...state.Children,
               labor: action.payload.labor
            }
         };
      case ALLERGY_OR_NOT:
         if (state.Member.mom_status === "mom-child") {
            return {
               ...state,
               Children: {
                  ...state.Children,
                  allergy: action.payload.allergy
               },
               sibling: action.payload.sibling
            };
         } else {
            return {
               ...state,
               Member: {
                  ...state.Member,
                  mom_allergy: action.payload.allergy
               },
               sibling: action.payload.sibling
            };
         }

      // case CALL_BACK_LATER:
      //    return {
      //       ...state,
      //       Member: {
      //          ...state.Member,
      //          firstname: action.payload.firstname,
      //          lastname: action.payload.lastname,
      //          phone: action.payload.phone,
      //          email: action.payload.email,
      //          is_sms: action.payload.is_sms,
      //          is_call: action.payload.is_call
      //       }
      //    };
      case MAIN_QUIZ:
         return {
            ...state,
            AllergyPrevention: {
               mother_asthma: action.payload.mother_asthma,
               mother_milk_intolerance: action.payload.mother_milk_intolerance,
               mother_rhinitis: action.payload.mother_rhinitis,
               mother_atopic_dermatitis:
                  action.payload.mother_atopic_dermatitis,
               mother_urticaria: action.payload.mother_urticaria,
               mother_drug: action.payload.mother_drug,
               mother_food: action.payload.mother_food,
               mother_conjunctivitis: action.payload.mother_conjunctivitis,

               father_asthma: action.payload.father_asthma,
               father_milk_intolerance: action.payload.father_milk_intolerance,
               father_rhinitis: action.payload.father_rhinitis,
               father_atopic_dermatitis:
                  action.payload.father_atopic_dermatitis,
               father_urticaria: action.payload.father_urticaria,
               father_drug: action.payload.father_drug,
               father_food: action.payload.father_food,
               father_conjunctivitis: action.payload.father_conjunctivitis,

               brother_asthma: action.payload.brother_asthma,
               brother_milk_intolerance:
                  action.payload.brother_milk_intolerance,
               brother_rhinitis: action.payload.brother_rhinitis,
               brother_atopic_dermatitis:
                  action.payload.brother_atopic_dermatitis,
               brother_urticaria: action.payload.brother_urticaria,
               brother_drug: action.payload.brother_drug,
               brother_food: action.payload.brother_food,
               brother_conjunctivitis: action.payload.brother_conjunctivitis
            }
         };
      case RESULT:
         return state;
      default:
         return state;
   }
};
