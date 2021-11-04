import React from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './images/covid19-w.png'

import { Container } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: "#000",
            contrastText: '#fff',
        },
        secondary: {
            main: '#11cb5f',
        },
        text: {
            primary: '#6c757d',
            secondary: '#6c757d',

        },
        background: {
            paper: '#1e1e30',
        },
    },
});
class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.container}>
                    <img className={styles.image} src={coronaImage} alt="COVID-19" />
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                    <Cards data={data} />
                    <Container maxWidth="sm">

                        <Chart data={data} country={country} />
                    </Container>
                </div>
            </ThemeProvider>
        )
    }
}

export default App;