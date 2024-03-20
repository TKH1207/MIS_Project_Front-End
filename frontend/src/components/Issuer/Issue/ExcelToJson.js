import React from "react";
import "../../css/Issuer.css"
import * as XLSX from "xlsx";
import ChooseTemplate from "./ChooseTemplate";
import Button from '@mui/material/Button';

class ExcelToJson extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state = {
            file: "",
        };
    }

    // handleClick(e) {
    //     this.refs.fileUploader.click();
    // }

    filePathset(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        console.log(file);
        this.setState({ file });

        console.log(this.state.file);
    }

    readFile() {
        var f = this.state.file;
        // var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
            // evt = on_file_select event
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            /* Update state */
            console.log("Data>>>" + data);// shows that excel data is read
            // console.log(this.convertToJson(data)); // shows data in json format
            this.convertToJson(data);
        };
        reader.readAsBinaryString(f);
    }

    convertToJson(csv) {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            var claims = {
                claims: obj
            }
            result.push(claims);
        }
        // console.log(result)
        this.props.setClaims(result);
        this.props.setStep(<ChooseTemplate setStep={this.props.setStep} documents={result} />);

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* <div className="wrap">
                    <div className="step3">
                        <div className="wrap2"> */}
                <p>請匯入您的資料</p>
                {/* <div htmlFor="file" className="inputColumn">請將檔案拖曳至此欄位</div> */}
                <input
                    type="file"
                    id="file"
                    ref="fileUploader"
                    className="inputColumn"
                    style={{ width: '100%' }}
                    // style={{ visibility: "hidden" }}
                    placeholder="請將檔案拖曳至此欄位"
                    onChange={this.filePathset.bind(this)}
                />
                {/* </div> */}
                {/* <div className="wrap3"> */}
                {/* <div

                    onClick={() => {
                        this.readFile();
                        // this.props.goStep4();
                    }}>
                    下一步
                </div> */}
                <br />
                <div>
                    <Button
                        variant="contained"
                        style={{ float: 'right' }}
                        onClick={() => {
                            this.readFile();
                        }}
                    >
                        下一步
                    </Button>
                </div>

                {/* </div>
                    </div> */}
                {/* </div> */}
            </div >
        );
    }
}

export default ExcelToJson;
