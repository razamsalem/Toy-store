import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { toyService } from '../services/toy.service.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ToyChart() {
    const [labelCounts, setLabelCounts] = useState({})

    useEffect(() => {
        const calculateLabelCounts = () => {
            const labels = toyService.getToyLabels()
            const counts = {}

            labels.forEach(label => {
                counts[label] = 0
            })

            const toys = toyService.query()
            toys.then(toyData => {
                toyData.forEach(toy => {
                    toy.labels.forEach(label => {
                        if (counts[label] !== undefined) {
                            counts[label]++
                        }
                    })
                })
                setLabelCounts(counts)
            })
        }

        calculateLabelCounts()
    }, [])

    const data = {
        labels: Object.keys(labelCounts),
        datasets: [
            {
                label: '# of Toys',
                data: Object.values(labelCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(91, 151, 67, 0.4)',
                    'rgba(238, 6, 6, 0.4)',
                    'rgba(146, 99, 255, 0.4)',
                    'rgba(131, 224, 105, 0.4)',
                    'rgba(14, 165, 202, 0.4)',
                    'rgba(211, 32, 32, 0.2)',
                    'rgba(207, 238, 6, 0.4)',
                    'rgba(68, 223, 167, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(146, 99, 255, 1)',
                    'rgba(131, 224, 105, 1)',
                    'rgba(14, 165, 202, 1)',
                    'rgba(211, 32, 32, 1)',
                    'rgba(207, 238, 6, 1)',
                    'rgba(68, 223, 167, 1)',
                ],
                borderWidth: .7,
            },
        ],
    }

    return (
        <section>
            <Pie data={data} />
        </section>
    )

}
