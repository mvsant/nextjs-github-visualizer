import React from 'react'
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {default as Header} from './Header';
import { globalStyledComponent } from '../globalStyles/styledComponents';
import { globalMaterialUI } from '../globalStyles/materialUI';


const Layout = ({ children }) => {

    const themePalette = useSelector(state => state.themeMode.theme)
    const theme = globalMaterialUI(themePalette);
    const GlobalStyle = globalStyledComponent(themePalette);

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <GlobalStyle />
            <CssBaseline />
            <Header title="Busca Github" />
            <Container maxWidth="md">
                {children}
            </Container>
        </ThemeProvider>
    )
};
export default Layout;