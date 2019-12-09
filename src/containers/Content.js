import React, {useState} from "react"
import DataController from "./DataController";
import ButtonController from "./ButtonController";
import styled from "styled-components";
import Display from "./Display";

const ControllerContainer = styled.div`
    display:flex;
    justify-content:space-evenly
`;

const algorithms = ["FCFS","SSTF","SCAN","LOOK"];
const processes = {
    Esimene: "5,19,4,2,20,25,12",
    Teine: "1,10,44,2,12,3,13,20",
    Kolmas: "2,5,13,29,7,1,18,40,49,4",
    Neljas: "45,6,16,9,33,28,11,37,49,25",
};

const Container = () => {

    const [algorithm, setAlgorithm] = useState("FCFS");
    const [process, setProcess] = useState(processes.Esimene);
    const [counter, setCounter] = useState(null);

    const alghorithmChangeHandler = (algorithmIn) => {
        if (algorithm === algorithmIn) {
            setAlgorithm("FCFS");
        } else {
            setAlgorithm(algorithmIn);

        }
    };

    const processChangeHandler = (process) => {
        setProcess(process);
    };

    const resetFields = () => {
        setAlgorithm(algorithms[0]);
        setProcess(processes.Esimene);
    };
    return (
        <div>
            <h1>Graafilise kasutajaliidesega simulaator kettapöörduste algoritmide töö
                visualiseerimiseks</h1>
            <ControllerContainer>
                <DataController processes={processes} processHandler={processChangeHandler} selected={process}/>
                <ButtonController algorithms={algorithms} algorithmHandler={alghorithmChangeHandler}
                                  reset={resetFields}/>
            </ControllerContainer>
            <Display process={process} algorithm={algorithm}/>
        </div>
    )
};

export default Container;