import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Buttons from '../Buttons'
import ProgressBar from '../ProgressBar'

export default function FurtherQuestionsForm({ prevStep, nextStep, updateAppOptions, values }) {
    const { t } = useTranslation()
    const [answers, setAnswers] = useState({
        Question1: Object.values(values)[0],
        Question2: Object.values(values)[1],
        Question3: Object.values(values)[2],
        Question4: Object.values(values)[3],
        Question5: Object.values(values)[4]
    })

    const questions = {
        Question1: "Is there a backend?",
        Question2: "Should there be a backend?",
        Question3: "Apple/Google Store account existing?",
        Question4: "Does the app need to be able to run in the background?",
        Question5: "Should we publish the app?"
    }

    const handleAnswers = (que, ans) => {
        setAnswers({...answers, [que]: ans})
    }

    useEffect(() => {
        const question = Object.values(questions).map(question => question)
        const answer = Object.values(answers).map(answer => answer)
        let obj = {}
        for(var i = 0; i < question.length; i++) {
            obj[question[i]] = answer[i]
        }
        updateAppOptions('expert', obj)
    }, [answers])

    return (
        <Fragment>
            <h2 className="header">{t('App.ExpertQuestions.Question')}</h2>
            <div className="form-container-scnd answers">
            {Object.entries(questions).map(([key, value], idx) => (
                <div className="question-box" key={idx}>
                    <div className="question-box-lft">
                    <div className="question">
                        <h3>{t(`App.ExpertQuestions.${key}`)}</h3>
                    </div>
                    </div>
                    <div className="answer-box-rgt">
                        <ul>
                            <li className={classNames({"active": answers[key] === 'Yes'})}
                                onClick={() => handleAnswers(key, 'Yes')}>
                                <a>{t(`Choices.Choice1`)}</a>
                            </li>
                            <li className={classNames({"active": answers[key] === 'No'})}
                                onClick={() => handleAnswers(key, 'No')}>
                                <a>{t(`Choices.Choice2`)}</a>
                            </li>
                            <li className={classNames({"active": answers[key] === 'Not Specified'})}
                                onClick={() => handleAnswers(key, 'Not Specified')}>
                                <a>{t(`Choices.Choice3`)}</a>
                            </li>
                        </ul>                        
                    </div>
                </div>
            ))}
            <Buttons prevStep={prevStep} nextStep={nextStep}/>
            </div>
            <ProgressBar value="8" max="12"/>
        </Fragment>
    )
}