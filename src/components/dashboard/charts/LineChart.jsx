
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
// eslint-disable-next-line react/prop-types
const LineChart = ({ data }) => {
    return (
        <ResponsiveContainer width={"100%"} height="100%">
            <AreaChart data={data}
                margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey={"title"} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                <Area type="monotone" dataKey={'value'} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default LineChart