import { useState } from "react";

const Statistics = ({ stats }) => {
    const average = stats.good - stats.bad;
    const sumOfValues = Object.values(stats).reduce((a, c) => a + c, 0);
    const positive = (stats.good / sumOfValues) * 100;
    if (sumOfValues == 0) return <p>No feedback given</p>;
    return (
        <table>
            <tbody>
                <StatisticLine text={"good"} value={stats.good} />
                <StatisticLine text={"neutral"} value={stats.neutral} />
                <StatisticLine text={"bad"} value={stats.bad} />
                <StatisticLine text={"average"} value={average} />
                <StatisticLine text={"positive"} value={positive + "%"} />
            </tbody>
        </table>
    );
};

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h1>give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onClick={() => setBad(bad + 1)} text="bad" />
            <h1>statistics</h1>
            <Statistics stats={{ good, neutral, bad }} />
        </>
    );
};

export default App;
