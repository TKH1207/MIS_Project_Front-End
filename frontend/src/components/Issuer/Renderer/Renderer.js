import { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import "./App.css";

const TreeObj = ({ data }) => {
    const [obj, setObj] = useState(data);
    useEffect(() => {
        setObj(data);
    }, [data]);
    return (
        <div className="flex-col jc:left t:left">
            {Object.keys(obj).map((key) => {
                console.log('key:', key)
                if (typeof obj[key] === "object") {
                    if (key === 'nestedData') {
                        return (
                            <Box sx={{ pl: 5 }}>
                                <TreeObj data={obj[key]} />
                            </Box>
                        );
                    }
                    if (key === 'vaccinationRecord') {
                        return (
                            <Box >
                                <Typography sx={{ fontWeight: 'bold', color: '#909090', pl: -5 }} >{key}：</Typography>
                                <Box sx={{ pl: 5 }}>
                                    <TreeObj data={obj[key]} />
                                </Box>
                            </Box>
                        );
                    }
                    return (
                        <Box >
                            <Typography sx={{ fontWeight: 'bold', color: '#909090' }} >{key}：</Typography>
                            <Box sx={{ pl: 5, width: 1000 }}>
                                <TreeObj data={obj[key]} />
                            </Box>
                        </Box>
                    );
                }

                return (
                    <Box >
                        <Typography sx={{ color: '#909090' }}>
                            <span style={{ fontWeight: 'bold' }}>{key}：</span>
                            <span style={{ width: 1000 }}>{obj[key]}</span>
                        </Typography>
                    </Box>
                );
            })}
        </div >
    );
};
function Renderer(props) {
    // const doc2 = {
    //     name: "John",
    //     age: 30,
    //     city: "New York",
    //     address: {
    //         country: "USA",
    //         street: "Main Street",
    //         number: 123,
    //     },
    //     friend: {
    //         Peter: {
    //             name: "Peter",
    //             age: 40,
    //             city: "Paris",
    //             friend: {
    //                 Mark: {
    //                     name: "Mark",
    //                     age: 20,
    //                     city: "Taiwan",
    //                 },
    //             },
    //         },
    //     },
    // };
    return (
        <div className="App">
            <header className="App-header">
                <TreeObj data={props.doc} />
            </header>
        </div>
    );
}

export default Renderer;
