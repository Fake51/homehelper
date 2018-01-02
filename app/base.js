import React from 'react';
import ReactDom from 'react-dom';
import ProjectContainer from './project-container.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDom.render(
    <MuiThemeProvider>
        <ProjectContainer/>
    </MuiThemeProvider>,
    document.getElementById('homeProject')
);
