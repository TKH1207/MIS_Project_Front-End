import React from 'react';
import ReactDOM from 'react-dom';
import Content from './Content'
import PersistentDrawerLeft from './menu';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <PersistentDrawerLeft />
    // </React.StrictMode>
);