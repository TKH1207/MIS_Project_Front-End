import React, { useState, useEffect } from "react";
import "../components/css/Issuer.css"
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv6";
import Renderer from "../components/Issuer/Renderer/Renderer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function TestPage() {

    const [formData, setFormData] = useState(null);
    const onSubmit = ({ formData }) => console.log("Data submitted: ", formData);

    const schema = {
        "title": "疫苗施打VC",
        "type": "object",
        "required": [
            "claims",
            "issuerVC"
        ],
        "properties": {
            "claims": {
                "title": "Claims",
                "type": "object",
                "required": [
                    "did",
                    "name",
                    "idCardNumber",
                    "NHICNumber",
                    "vaccinationRecord"
                ],
                "properties": {
                    "did": {
                        "title": "Did",
                        "type": "string"
                    },
                    "name": {
                        "title": "Name",
                        "type": "string"
                    },
                    "idCardNumber": {
                        "title": "ID card number",
                        "type": "string"
                    },
                    "NHICNumber": {
                        "title": "Health insurance card number",
                        "type": "string"
                    },
                    "vaccinationRecord": {
                        "title": "Vaccination Record",
                        "type": "object",
                        "required": [
                            "dose",
                            "productName",
                            "dateVaccineGiven",
                            "healthcareProfessional"
                        ],
                        "properties": {
                            "dose": {
                                "title": "Dose",
                                "type": "number",
                                "enum": [
                                    1,
                                    2,
                                    3,
                                    4
                                ]
                            },
                            "productName": {
                                "title": "Product name",
                                "type": "string"
                            },
                            "dateVaccineGiven": {
                                "title": "Date vaccine given",
                                "type": "string",
                                "format": "date"
                            },
                            "healthcareProfessional": {
                                "title": "Healthcare professional",
                                "type": "string"
                            }
                        }
                    }
                }
            },
            "issuerVC": {
                "title": "Issuer's VC",
                "type": "object",
                "required": [
                    "issuerVC"
                ],
                "properties": {
                    "issuerVC": {
                        "type": "string",
                        "format": "data-url"
                    }
                }
            }

        }
    };

    const schema2 = {
        "title": "VC",
        "type": "object",
        "properties": {
            "claims": {
                "title": "Claims",
                "type": "object",
                "required": [
                    "did"
                ],
                "additionalProperties": {
                    "type": "string"
                },
                "properties": {
                    "did": {
                        "title": "Did",
                        "type": "string"
                    }
                }
            },
            "nestedData": {
                "title": "Nested data",
                "type": "object",
                "additionalProperties": {
                    "type": "object",
                    "additionalProperties": {
                        "type": "string"
                    }
                }
            }
        }
    };

    const uiSchema = {
        "issuerVC": {
            "issuerVC": {
                "ui:options": {
                    "accept": ".json"
                }
            }
        }
    };

    function createData(dose, productName, dateVaccineGiven, healthcareProfessionalDID, administeringCenterDID) {
        return { dose, productName, dateVaccineGiven, healthcareProfessionalDID, administeringCenterDID };
    }

    const rows = [
        createData('COVID-19疫苗第1劑', 'BNT', '2021/09/12', '12333333333333333333', '6544444444444444444444'),
        createData('COVID-19疫苗第2劑', 'BNT', '2021/11/15', '45666666666666666666', '0000000000000000000000'),
        createData('COVID-19疫苗第3劑', 'AZ', '2022/02/14', '789999999999999999999', '3211111111111111111111'),
        createData('COVID-19疫苗第4劑', 'BNT', '2022/05/16', '00000000000000000000', '9877777777777777777777'),
    ];

    function BasicTable() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>疫苗種類/劑次</TableCell>
                            <TableCell align="right">廠牌/名稱</TableCell>
                            <TableCell align="right">接種日期</TableCell>
                            <TableCell align="right">醫師或接種者DID</TableCell>
                            <TableCell align="right">接種單位DID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <div>
            <Box sx={{ p: 4, backgroundColor: '#FDF6E7', width: '100vw' }}>
                <Toolbar />
                <p>test</p>
                {/* <Form
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={e => { setFormData(e.formData); console.log(formData) }}
                    onSubmit={onSubmit}
                    validator={validator} /> */}
                {/* <Renderer /> */}

                <Box sx={{ backgroundColor: '#F1C40F', width: 900, height: '100%', p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography variant="h5" sx={{ color: '#003060' }}>
                                COVID-19 疫苗接種紀錄卡
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>中文姓名：王小明</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography>英文姓名：Xiao-Ming Wang</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>出生日期（西元）：1999/10/23</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>國籍：台灣</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography>身分證字號：A123456789</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <BasicTable />
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </div>
    );

};