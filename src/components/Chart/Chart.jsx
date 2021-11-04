import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import { Typography } from '@material-ui/core';
import styles from './Chart.module.css'

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();

    }, [])

    const lineChart = (
        dailyData.length
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: '#red',
                    backgroundColor: 'rgba(255,0,0,0.5',
                    fill: true,
                }],
            }}
        />) : null
    )

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            '#ff073a',
                            '#28a745',
                            '#6c757d',
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${country}`},
                }}
            />
        ): null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : <Typography variant="h5"></Typography>}
        </div>
    )

}

export default Chart