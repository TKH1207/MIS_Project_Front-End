import * as React from 'react';
import Box from '@mui/material/Box';
import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv6";
import ChooseTemplate from '../Issue/ChooseTemplate';
import Preview from "../Issue/Preview";
import { wrapDocuments } from "../../../API/issuerApi";

export default function VaccinationRecord(props) {

    const [formData, setFormData] = React.useState(null);

    const onSubmit = ({ formData, schema }, e) => {

        // 保留 ChooseTemplate 版本
        // console.log("Data submitted: ", formData);
        // props.setStep(<ChooseTemplate setStep={props.setStep} documents={formData} schema={JSON.stringify(schema)} />);
        // console.log("formData type: ", typeof (formData))
        // console.log("schema type: ", typeof (schema))

        // 捨棄  ChooseTemplate 版本
        console.log("Vaccination submit")
        var wd = null;
        wrapDocuments([formData])
            .then(async (response) => {
                let res = await response.json();
                if (res.success === true) {
                    console.log("成功wrap documents")
                    console.log(res.wrappedDocuments)
                    wd = res.wrappedDocuments
                    console.log("wd:", wd)
                    props.setStep(<Preview wrappedDoc={wd} setStep={props.setStep} vaccinationPreview={props.vaccinationPreview} />);
                    props.showVaccinationPreview(); // 讓 VaccinationRendere 出現
                    console.log("preview test:", props.vaccinationPreview)
                } else {
                    alert(res.err);
                    console.log("err: ", res.err)
                    console.log("失敗: ", props.documents)
                };
            });

    };


    const schema = {
        "title": "疫苗施打VC",
        "type": "object",
        "required": [
            "claims",
            // "issuerVC"
        ],
        "properties": {
            "claims": {
                "title": "Claims",
                "type": "object",
                "required": [
                    "did",
                    "name",
                    "dateOfBirth",
                    "nationality",
                    "idCardNumber",
                    "vaccinationRecord"
                ],
                "properties": {
                    "did": {
                        "title": "DID",
                        "type": "string"
                    },
                    "name": {
                        "title": "Name",
                        "type": "string"
                    },
                    "dateOfBirth": {
                        "title": "Date of Birth",
                        "type": "string",
                        "format": "date"
                    },
                    "nationality": {
                        "title": "Nationality",
                        "type": "string"
                    },
                    "idCardNumber": {
                        "title": "ID Card Number",
                        "type": "string"
                    },
                    "vaccinationRecord": {
                        "title": "Vaccination Record",
                        "type": "object",
                        "required": [
                            "dose",
                            "productName",
                            "dateVaccineGiven",
                            "healthcareProfessional",
                            "administeringCenter"
                        ],
                        "properties": {
                            "dose": {
                                "title": "Dose",
                                "type": "string",
                                "enum": [
                                    'COVID-19疫苗第1劑',
                                    'COVID-19疫苗第2劑',
                                    'COVID-19疫苗第3劑',
                                    'COVID-19疫苗第4劑'
                                ]
                            },
                            "productName": {
                                "title": "Product Name",
                                "type": "string"
                            },
                            "dateVaccineGiven": {
                                "title": "Date Vaccine Given",
                                "type": "string",
                                "format": "date"
                            },
                            "healthcareProfessional": {
                                "title": "Healthcare Professional",
                                "type": "string"
                            },
                            "administeringCenter": {
                                "title": "Administering Center",
                                "type": "string"
                            },
                        }
                    }
                }
            },
            // "issuerVC": {
            //     "title": "Issuer's VC",
            //     "type": "object",
            //     "required": [
            //         "issuerVC"
            //     ],
            //     "properties": {
            //         "issuerVC": {
            //             "type": "string",
            //             "format": "data-url"
            //         }
            //     }
            // }

        }
    };

    const uiSchema = {
        "issuerVC": {
            "issuerVC": {
                "ui:options": {
                    "accept": ".json"
                }
            }
        },
        "ui:submitButtonOptions": {
            "props": {
                "disabled": false,
                "sx": {
                    "bgcolor": "#003060"
                },
            },
            "norender": false,
            "submitText": "Submit"
        }
    };

    return (

        <Box sx={{ p: 4 }}>

            <Form
                schema={schema}
                uiSchema={uiSchema}
                formData={formData}
                onChange={e => { setFormData(e.formData); console.log(formData) }}
                onSubmit={onSubmit}
                validator={validator} />

        </Box>

    );

};