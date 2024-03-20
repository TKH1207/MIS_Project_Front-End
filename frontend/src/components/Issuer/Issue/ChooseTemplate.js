import * as React from 'react';
import "../../css/Issuer.css";
import Preview from "./Preview";
import { wrapDocuments } from "../../../API/issuerApi";
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default function ChooseTemplate(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleClick = () => {

        console.log("確認wrapdocuments api的input documents:", props.documents)
        var wd = null;

        wrapDocuments([props.documents], 'test')
            .then(async (response) => {
                let res = await response.json();
                if (res.success === true) {
                    console.log("成功wrap documents")
                    console.log(res.wrappedDocuments)
                    wd = res.wrappedDocuments
                    console.log("wd:", wd)
                    props.setStep(<Preview wrappedDoc={wd} setStep={props.setStep} />);
                } else {
                    alert(res.err);
                    console.log("err: ", res.err)
                    console.log("失敗: ", props.documents)
                };
            });

    };

    return (
        <Box sx={{ mb: 8 }}>
            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <Typography >請選擇下列模板</Typography>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="模板1" {...a11yProps(0)} />
                        <Tab label="模板2" {...a11yProps(1)} />
                        <Tab label="模板3" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                {/* <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            > */}
                <TabPanel value={value} index={0} dir={theme.direction}>
                    模板1
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    模板2
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    模板3
                </TabPanel>
                {/* </SwipeableViews> */}
            </Box>
            <Button
                variant="contained"
                sx={{ bgcolor: "#003060" }}
                style={{ float: 'right' }}
                onClick={() => { handleClick() }}
            >
                下一步
            </Button>
        </Box>
    );
}

// class ChooseTemplate extends React.Component {
//     constructor(props) {
//         super(props);
//         // this.state = { wrappedDoc: null };
//     }

//     handleClick = () => {

//         console.log("確認wrapdocuments api的input:", this.props.documents)
//         var wd = null;

//         wrapDocuments(this.props.documents)
//             .then(async (response) => {
//                 let res = await response.json();
//                 if (res.success === true) {
//                     // this.props.setWrappedDoc(res.wrapDocuments);
//                     console.log("成功wrap documents")
//                     console.log(res.wrappedDocuments)
//                     // this.setState({ wrappedDoc: res.wrappedDocuments })
//                     wd = res.wrappedDocuments
//                     console.log("wd:", wd)
//                     this.props.setStep(<Preview wrappedDoc={wd} />);
//                     // this.props.setStep(<Preview wrappedDoc={this.state.wrappedDoc} />);
//                     // console.log("wrappedDoc:", this.state.wrappedDoc)
//                 } else {
//                     alert(res.err);
//                     console.log(res.err)
//                     console.log("失敗: ", this.props.documents)
//                 };

//             });



//         // this.props.goStep5()

//     };




//     render() {
//         return (
//             <div className="wrap" >
//                 <div className="step4">
//                     <div className="wrap2">
//                         <span>請選擇下列模板</span>
//                         <div id="container">
//                             <div className="model1">預設模板一</div>
//                             <div className="model2">預設模板二</div>
//                             <div className="model3">預設模板三</div>
//                             <div className="model4">預設模板四</div>
//                             <div className="choseBtn" onClick={() => { this.handleClick(); }}>套用</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );

//     };

// };
// export default ChooseTemplate;