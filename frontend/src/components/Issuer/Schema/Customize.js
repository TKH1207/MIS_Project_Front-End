import * as React from 'react';
import Box from '@mui/material/Box';
import Form from '@rjsf/mui';
import validator from "@rjsf/validator-ajv6";
import ChooseTemplate from '../Issue/ChooseTemplate';
import Preview from "../Issue/Preview";
import { wrapDocuments } from "../../../API/issuerApi";


export default function Customize(props) {

    const [formData, setFormData] = React.useState(null);

    const onSubmit = ({ formData, schema }, e) => {

        // 保留 ChooseTemplate 版本
        // console.log("Data submitted: ", formData);
        // props.setStep(<ChooseTemplate setStep={props.setStep} documents={formData} schema={JSON.stringify(schema)} />);
        // console.log("formData type: ", typeof (formData))
        // console.log("schema type: ", typeof (schema))

        // 捨棄  ChooseTemplate 版本
        console.log("Costomize submit")
        console.log("確認wrapdocuments api的input documents:", props.documents)
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
                } else {
                    alert(res.err);
                    console.log("err: ", res.err)
                    console.log("失敗: ", props.documents)
                };
            });

    };


    const schema = {
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
            // "nestedData": {
            //     "title": "Nested data",
            //     "type": "object",
            //     "additionalProperties": {
            //         "type": "object",
            //         "additionalProperties": {
            //             "type": "string"
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