import React from "react";
import "../../css/Issuer.css"
import Button from '@mui/material/Button';
import SignDialog from "./SignDialog";
import Renderer from "../Renderer/Renderer";
import VaccinationRendererTabs from "../Renderer/VaccinationRenderer";


class Preview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signPopup: false,
            openDialog: false,
            test: true,
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <br />
                <span>VC預覽畫面</span>
                {
                    this.props.vaccinationPreview ?
                        <VaccinationRendererTabs wrappedDoc={this.props.wrappedDoc} />
                        :
                        <div className="square" style={{ borderColor: '#909090', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {/* {JSON.stringify(this.props.wrappedDoc)} */}
                            <Renderer doc={this.props.wrappedDoc[0]} />
                        </div>
                }
                <br />
                <div id="container" >

                    <Button
                        variant="contained"
                        sx={{ bgcolor: "#003060" }}
                        style={{ float: 'right' }}
                        onClick={() => { this.setState({ openDialog: true }) }}>
                        確定
                    </Button>

                    <SignDialog
                        open={this.state.openDialog}
                        setDialogClose={() => { this.setState({ openDialog: false }) }}
                        wd={this.props.wrappedDoc}
                        setStep={this.props.setStep}
                    />

                    <Button
                        variant="contained"
                        sx={{ bgcolor: "#003060" }}
                        style={{ float: 'left' }}>
                        返回
                    </Button>
                </div>
            </div>

        );
    }

};
export default Preview;
