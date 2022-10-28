import React from 'react'
import axios from 'axios';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import ManageService from '../../../../services/ManageService';
import { deleteSurvey, updateSurveyStatus } from "../../../../services/SurveyService";
import { useNavigate } from 'react-router-dom';

function SurveyingItem(props) {

    const { surveyItemList } = props;
    let [isOpen, setIsOpen] = useState(false);
    const [selectSurveyId, setSelectSurveyId] = useState()
    const [emptyThumbnail,setEmptyThumnail]=useState([]);
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function showModal(surveyId) {
        setSelectSurveyId(surveyId)
        openModal();
    }
    const navigate = useNavigate();

    function finishSurvey(surveyId) {
        updateSurveyStatus(surveyId).then((response)=>{
            console.log('updateSurveyStatus response',response);
            closeModal();
        })
    }
    
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900"> 설문 진행 중인 설문지</h2>

                <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {surveyItemList.map((survey) => (
                        <div key={survey.surveyId} className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-70">
                                <img
                                    src= {(survey.thumbnail==='images/null.jpg' ? '/images/question-mark.png' : survey.thumbnail)}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700"> {survey.title} </h3>
                                    <p className= {"mt-1 text-sm" + (survey.status === 'finish' ?  " text-red-500" :  " text-blue-500")}> {survey.status === 'finish' ? '설문 종료' : '설문 중' } </p>
                                </div>
                                <div>
                                    {survey.status === 'surveying' ?
                                        <button
                                            type="button"
                                            onClick={() => showModal(survey.surveyId)}
                                            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                        >
                                            설문 끝내기
                                        </button>
                                        :
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigate(`/resultSurvey/${survey.surveyId}`);
                                            }}
                                            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                        >
                                            설문 결과보기
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            설문 끝내기
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                설문을 끝내면 결과를 확인 할 수 있어요.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => finishSurvey(selectSurveyId)}
                                            >
                                                설문을 끝낼래요.
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

        </div>



    )
}

export default SurveyingItem