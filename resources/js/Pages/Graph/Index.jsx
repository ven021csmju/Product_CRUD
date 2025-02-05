import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// ลงทะเบียน Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const Graph = () => {
    const [data, setData] = useState({ customer_sales: [], product_sales: [], sales_over_time: [] });

    useEffect(() => {
        axios.get('/graph')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Sales Dashboard</h1>
            
            {/* ยอดขายตามลูกค้า */}
            <h2>Customer Sales</h2>
            <Bar
                data={{
                    labels: data.customer_sales.map(c => c.name),
                    datasets: [{
                        label: 'Total Spent ($)',
                        data: data.customer_sales.map(c => c.total_spent),
                        backgroundColor: 'rgba(75,192,192,0.6)'
                    }]
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }}
            />

            {/* ยอดขายตามสินค้า */}
            <h2>Product Sales</h2>
            <Bar
                data={{
                    labels: data.product_sales.map(p => p.product_name),
                    datasets: [{
                        label: 'Total Sold',
                        data: data.product_sales.map(p => p.total_sold),
                        backgroundColor: 'rgba(255, 99, 132, 0.6)'
                    }]
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }}
            />

            {/* ยอดขายตามช่วงเวลา */}
            <h2>Sales Over Time</h2>
            <Line
                data={{
                    labels: data.sales_over_time.map(s => s.date),
                    datasets: [{
                        label: 'Total Sales ($)',
                        data: data.sales_over_time.map(s => s.total_sales),
                        borderColor: 'rgba(255,99,132,1)',
                        fill: false
                    }]
                }}
                options={{
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }}
            />
        </div>
    );
};

export default Graph;
