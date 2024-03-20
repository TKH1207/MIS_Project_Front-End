import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VaccinationRecord from './Schema/VaccinationRecord';
import Customize from './Schema/Customize';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SchemaTabs(props) {
    const [value, setValue] = React.useState(0);
    const [vaccinationPreview, setVaccinationPreview] = React.useState(false); // 決定 vaccinationPreview 是否出現

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const showVaccinationPreview = () => {
        console.log("preview change");
        setVaccinationPreview(true);
    }

    React.useEffect(() => {
        console.log("vaccinationPreview change:", vaccinationPreview)
    }, [vaccinationPreview])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Covid-19 Vaccination Record" {...a11yProps(0)} />
                    <Tab label="Customize" {...a11yProps(1)} />
                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <VaccinationRecord setStep={props.setStep} setClaims={props.setClaims} vaccinationPreview={true} showVaccinationPreview={showVaccinationPreview} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Customize setStep={props.setStep} setClaims={props.setClaims} vaccinationPreview={false} />
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
                Item Three
            </TabPanel> */}
        </Box>
    );
}
