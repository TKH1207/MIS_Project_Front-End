import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IssueStepper from './Issue/IssueStepper';
import IssuerTable from './IssuerTable';
import IssuerWallet from './IssuerWallet';
import Revoke from './Revoke/Revoke';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, width: '100%' }}>
                    {children}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function IssuerTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '50vh', width: '100%', borderRadius: 2, m: 'auto', }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="VC List" {...a11yProps(0)} />
                <Tab label="Issue" {...a11yProps(1)} />
                <Tab label="Revoke" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                {/* List */}
                {/* <IssuerTable /> */}
                <IssuerWallet />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* Issue */}
                <IssueStepper />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {/* Revoke */}
                <Revoke />
            </TabPanel>
        </Box>
    );
}
