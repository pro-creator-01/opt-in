import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Buttons from '../Buttons'
import ProgressBar from '../ProgressBar'

export default function FurtherQuestionsForm({ prevStep, nextStep, updateWebsiteOptions, values }) {
    const { t } = useTranslation()
    const [error, setError] = useState(false)
    const [answers, setAnswers] = useState({
        Question1: Object.values(values)[0],
        Question2: Object.values(values)[1]
    })

    const questions = {
        Question1: "Should the website be translated into other languages?",
        Question2: "Do you want us to take care of your website on an ongoing basis?",
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
            if(answer[i] === undefined) {
                setError(true)
            }
        }
        const empty = Object.values(answers).filter(answer => answer === undefined)
        if(empty.length < 1) {
            setError(false)
        }
        updateWebsiteOptions('furtherQuestions', obj)
    }, [answers])

    return (
        <Fragment>
            <div className="heading-container">
                <h2 className="header">{t('Website.FurtherQuestions.Question')}</h2>
            </div>
            {error &&
            <label className="validation-error">*</label>
            }
            <div className="form-container-scnd answers">
                {Object.entries(questions).map(([key, value], idx) => (
                    <div className="question-box" key={idx}>
                        <div className="question-box-lft">
                            <div className="question1">
                                <h4>{t(`Website.FurtherQuestions.${key}`)}</h4>
                            </div>
                        </div>
                        <div className="answer-box-rgt">
                            <ul>
                                <li className={classNames({"active": answers[key] === 'Yes'})}
                                    onClick={() => handleAnswers(key, 'Yes')}>
                                    <a>{t(`Website.DesignQuestions.Choice1`)}</a>
                                </li>
                                <li className={classNames({"active": answers[key] === 'No'})}
                                    onClick={() => handleAnswers(key, 'No')}>
                                    <a>{t(`Website.DesignQuestions.Choice2`)}</a>
                                </li>
                                <li className={classNames({"active": answers[key] === 'Not Specified'})}
                                    onClick={() => handleAnswers(key, 'Not Specified')}>
                                    <a>{t(`Website.DesignQuestions.Choice3`)}</a>
                                </li>
                            </ul>                        
                        </div>
                    </div>
                ))}
                <Buttons prevStep={prevStep} nextStep={nextStep} error={error}/>
            </div>
            <ProgressBar value="4" max="6"/>
        </Fragment>
    )
}
