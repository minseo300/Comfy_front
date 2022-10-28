import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import QuestionListItem from './QuestionListItem';

const Select = styled.select`
	display: block;
	width: 100px;
    height:40px;
    margin:25px;
	padding: 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	&:focus {
		border-color: red;
	}
`;

const QuestionList = (props) => {
    const { questions } = props;

    const options = [];
    for(let i=0; i<questions.length; i++){
        questions[i].question.id = i+1;
        options.push({value: questions[i].question.id, label: '문항 ' + (i+1)})
    }

    const [value, setValue] = useState(1);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div style={{ display: "flex" }}>
            <Select value={value} onChange={handleChange}>
                {options && options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </Select>

            <div>
                {questions && questions.map((question) => {
                    return (
                        <QuestionListItem
                            questions={question}
                            value={value}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default QuestionList;