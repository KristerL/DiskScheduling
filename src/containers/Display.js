import React, {useEffect, useState} from "react";
import styled from "styled-components";

const RowContainer = styled.div`
    display:flex;
    align-items: center;
    h1{
        margin:0;
        margin-right:10px;
        width:60px;
        font-size:18px;
    }
`;

const Block = styled.div`
    width:20px;
    height:20px;
    border: 0.5px solid black;
`;

const MemoryContainer = styled.div`
width: 1050px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin:auto;
    margin-top:50px;
`;

function draw(ctx, positions) {
    const start = 10;
    ctx.beginPath();
    ctx.moveTo(215, 20);
    ctx.fillRect(210, 15, 10, 10);
    if (positions[0] === "10") {
        positions.shift();
    }
    positions.forEach((position, idx) => {
        const x = position * 21 + 5;
        const y = 30 * (idx + 1);
        ctx.lineTo(x, y);
        ctx.fillRect(x - 5, y - 5, 10, 10);

    });
    ctx.stroke();
}

const Display = ({process, algorithm}) => {

    const [visualize, setVisualize] = useState();
    const [totalDistance, setTotalDistance] = useState([]);
    const canvasRef = React.useRef(null);

    useEffect(() => {
        const processList = process.split(",");
        switch (algorithm) {
            case "FCFS":
                FCFS(processList);
                break;
            case "SSTF":
                SSTF(processList);
                break;
            case "SCAN":
                SCAN(processList);
                break;
            case "LOOK":
                LOOK(processList);
                break;
        }
    }, [process, algorithm]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        console.log(ctx, ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (visualize !== undefined) {
            draw(ctx, visualize)
        }
    });

    const FCFS = (positions) => {
        setter(positions);
    };

    const SSTF = (positions) => {
        let current = 10;
        let answer = [];
        while (positions.length != 0) {
            const closest = positions.reduce((prev, curr) => Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev);
            answer.push(closest);
            current = closest;
            positions.splice(positions.indexOf(closest), 1);
        }
        setter(answer);
    };

    const SCAN = (positions) => {
        const leftPart = positions.filter(el => el < 10).sort(function (a, b) {
            return b - a
        });
        const rightPart = positions.filter(el => el >= 10).sort(function (a, b) {
            return a - b
        });
        if (!rightPart.includes("49")) rightPart.push(49);
        leftPart.length !== 0 ? setter([...rightPart, ...leftPart]) : setter(rightPart);

    };

    const LOOK = (positions) => {
        const leftPart = positions.filter(el => el < 10).sort(function (a, b) {
            return b - a
        });
        const rightPart = positions.filter(el => el >= 10).sort(function (a, b) {
            return a - b
        });
        setter([...rightPart, ...leftPart]);
    };

    const setter = (positions) => {
        setVisualize(positions);
        let copy = [...positions];
        //copy.shift(10);
        let teepikkus = 0;
        teepikkus += Math.abs(copy[0] - 10);
        for (let i = 1; i < copy.length; i++) {
            teepikkus += Math.abs(parseInt(copy[i - 1]) - parseInt(copy[i]));
        }
        setTotalDistance(teepikkus);
    };

    return (
        <MemoryContainer>
            <h1>Valitud algoritm: {algorithm}</h1>
            <h1>{totalDistance}</h1>
            <RowContainer>{[...Array(50).keys()].map((el) => <Block key={el}>{el}</Block>)}</RowContainer>
            {visualize && <RowContainer>{[...Array(50).keys()].map((el) => <Block
                key={el}>{visualize.includes(el.toString()) ? "X" : ""}</Block>)}</RowContainer>}
            <canvas
                ref={canvasRef}
                width={1050}
                height={window.innerHeight}
            />
        </MemoryContainer>
    )
};

export default Display;