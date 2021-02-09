import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function ExplanationForm({ prevStep, nextStep, updateAppOptions, values, handleSubmit }) {
    const [description, setDescription] = useState(values)
    const { t } = useTranslation()

    useEffect(() => {
        updateAppOptions('explanation', description)
    }, [description])

    const handleChange = (event) => {
        setDescription(event.target.value)
    }

    return (
        <Fragment>
            <div className="heading-container">
            <h2 className="header" style={{textAlign: 'center', fontWeight: 500}}>{t('App.Idea.Question')}</h2>
            </div>
            {description === '' && <label className="validation-error">*</label>}
            <div className="form-container-scnd">
            <textarea value={description} className="text-area" style={{height: '300px'}} placeholder={t(`App.Idea.Textarea`)} onChange={handleChange}></textarea>
            <Buttons prevStep={prevStep} nextStep={nextStep} submit={true} submitForm={handleSubmit} error={description === '' ? true : false}/>
            </div>
            <div style={{marginTop: 50}}>
            <ProgressBar value="11" max="12"/>
            </div>
        </Fragment>
    )
}
