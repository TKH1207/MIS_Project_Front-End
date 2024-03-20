import React from "react";
import Issuer from "../../../pages/IssuerPage";
import "../../css/Issuer.css"
import ExcelToJson from "./ExcelToJson";
// import ChooseTemplate from "./ChooseTemplate";
// import Preview from "./Preview";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SchemaTabs from "../SchemaTabs";




class Issue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // step: <ExcelToJson setStep={this.setStep} setClaims={this.setClaims} />,
            step: <SchemaTabs setStep={this.setStep} setClaims={this.setClaims} />,
            claims: null,
            wrappedDoc: null,
        };
    };


    setClaims = (claim) => {
        this.setState({ claims: claim });
        // console.log("test: " + this.state.claims)
    };

    setWrappedDoc = (doc) => {
        this.setState({ wrappedDoc: doc });
    };

    setStep = (nextStep) => {
        this.setState({ step: nextStep });
        console.log("gp next issue step:", nextStep)
        this.props.handleNext();
    };

    // goStep4 = () => {

    //     console.log("testClaims: ", this.state.claims)
    //     this.setState({
    //         step: <ChooseTemplate goStep5={this.goStep5} setWrappedDoc={this.setWrappedDoc} documents={this.state.claims} />,
    //     });

    // };

    // goStep5 = () => {
    //     this.setState({
    //         step: <Preview wrappedDoc={this.state.wrappedDoc} />,
    //     });
    // };



    render() {
        return (
            <div>
                {this.state.step}
            </div >
        );
    };

};
export default Issue;

