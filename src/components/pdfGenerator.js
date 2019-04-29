import React, { Component } from "react";

class pdfGenerator extends Component {
   state = {
      storeName: "SOMETHING APPARELS",
      storeAddress: "1234 ยิ้มแย้มโฮสเทล",
      customerName: "นาย กขค",
      customerAddress: "4321 ราชเทวี",
      province: "กรุงเทพมหานคร",
      zipCode: "10400",
      telNumber: "0888888888",
      orders: ["cat", "dog", "bird"],
      paidDate: "11/11/2011",
      shippingType: "ems"
   };

   render() {
      return (
         <React.Fragment>
            <h1>{this.state.storeName}</h1>
            <h2>{this.state.storeAddress}</h2>
            <p>{this.state.customerName}</p>
         </React.Fragment>
      );
   }
}

export default pdfGenerator;
