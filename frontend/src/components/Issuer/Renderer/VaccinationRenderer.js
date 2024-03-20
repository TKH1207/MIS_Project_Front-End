import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Renderer from './Renderer';

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

function createData(dose, productName, dateVaccineGiven, healthcareProfessional, administeringCenter) {
    return { dose, productName, dateVaccineGiven, healthcareProfessional, administeringCenter };
}


function BasicTable(props) {
    const rows = [
        // createData('COVID-19疫苗第1劑', 'BNT', '2021/09/12', '12333333333333333333', '6544444444444444444444'),
        // createData('COVID-19疫苗第2劑', 'BNT', '2021/11/15', '45666666666666666666', '0000000000000000000000'),
        // createData('COVID-19疫苗第3劑', 'AZ', '2022/02/14', '789999999999999999999', '3211111111111111111111'),
        // createData('COVID-19疫苗第4劑', 'BNT', '2022/05/16', '00000000000000000000', '9877777777777777777777'),
        createData(props.vaccinationRecord.dose,
            props.vaccinationRecord.productName,
            props.vaccinationRecord.dateVaccineGiven,
            props.vaccinationRecord.healthcareProfessional,
            props.vaccinationRecord.administeringCenter,
        )
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>疫苗種類/劑次</TableCell>
                        <TableCell align="right">廠牌/名稱</TableCell>
                        <TableCell align="right">接種日期</TableCell>
                        <TableCell align="right">醫師或接種者</TableCell>
                        <TableCell align="right">接種單位</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.dose}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.dose}
                            </TableCell>
                            <TableCell align="right">{row.productName}</TableCell>
                            <TableCell align="right">{row.dateVaccineGiven}</TableCell>
                            <TableCell align="right">{row.healthcareProfessional}</TableCell>
                            <TableCell align="right">{row.administeringCenter}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function VaccinationRendererTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Template" {...a11yProps(0)} />
                    <Tab label="General" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {/* Item One */}
                <Box sx={{ backgroundColor: '#F1C40F', width: 1000, height: '100%', p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography variant="h5" sx={{ color: '#003060' }}>
                                COVID-19 疫苗接種紀錄卡
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>中文姓名：{props.wrappedDoc[0].credentialSubject.name}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>DID：{props.wrappedDoc[0].credentialSubject.did}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>出生日期（西元）：{props.wrappedDoc[0].credentialSubject.dateOfBirth}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>國籍：{props.wrappedDoc[0].credentialSubject.nationality}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>身分證字號：{props.wrappedDoc[0].credentialSubject.idCardNumber}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <BasicTable vaccinationRecord={props.wrappedDoc[0].credentialSubject.vaccinationRecord} />
                        </Grid>
                    </Grid>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* Item Two */}
                <div className="square" style={{ borderColor: '#909090', width: 1200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Renderer doc={props.wrappedDoc[0]} />
                </div>
            </TabPanel>
        </Box>
    );
}
