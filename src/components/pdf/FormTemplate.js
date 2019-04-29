import React, { Component } from "react";
import { connect } from "react-redux";

import {
   PDFViewer,
   Page,
   Text,
   View,
   Document,
   StyleSheet
} from "@react-pdf/renderer";

class FormTemplate extends Component {
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

   // Create styles
   styles = StyleSheet.create({
      page: {
         flexDirection: "row",
         backgroundColor: "#E4E4E4"
      },
      section: {
         margin: 10,
         padding: 10,
         flexGrow: 1
      }
   });

   render() {
      return (
         <PDFViewer>
            <Document>
               <Page size="A4" style={this.styles.page}>
                  <Text>Hello World!</Text>
               </Page>
            </Document>
         </PDFViewer>
      );
   }
}

const mapStateToProps = state => {
   return {
      AllergyPrevention: state.form.AllergyPrevention
   };
};

export default connect(mapStateToProps)(FormTemplate);
