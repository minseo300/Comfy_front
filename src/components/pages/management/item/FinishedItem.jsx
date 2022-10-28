import React from 'react'
import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'

function FinishedItem(props) {

    const navigate = useNavigate();

    const { surveyItemList } = props;

    return (
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 mb-10 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900"> 설문 완료 된 설문지 </h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {surveyItemList.map((survey) => (
                            
                            <div key={survey.surveyId} className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-70">
                                    <img
                                        src={'/images/'+survey.thumbnail+'.jpg'}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700"> {survey.title} </h3>
                                        <p className={"mt-1 text-sm" + (survey.status === 'finish' ? " text-red-500" : " text-blue-500")}> {survey.status === 'finish' ? '설문 종료' : '설문 중'} </p>
                                    </div>
                                    <div>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate(`/resultSurvey/${survey.surveyId}`);
                                            }}
                                            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                        >
                                            설문 결과보기
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
   
    )
}

export default FinishedItem