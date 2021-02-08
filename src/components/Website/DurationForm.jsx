import React, { useState, useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons'
import ProgressBar from '../ProgressBar'

export default function DurationForm({ prevStep, nextStep, updateWebsiteOptions, handleSubmit, values }) {
    const [value, setValue] = useState(values ? values : 1)
    const [error, setError] = useState(true)
    const { t } = useTranslation()
    const durations = ['4 Weeks', '8 Weeks', '3 Months', '4 Months', '5 Months', '6 Months', '9 Months', '12 Months', '15 Months', '1 Year 6 Months', '1 Year 9 Months', '2 Years']
    
    const setTime = durations[value - 1]

    useEffect(() => {
        updateWebsiteOptions('duration', setTime)
    }, [setTime])

    return (
        <Fragment>
            <div className="heading-container">
                <h2 className="header">{t('Website.WebsiteSpeed.Question')}</h2>
            </div>
                    {error && 
                        <label className="validation-error">*</label>
                    }
            <div className="form-submit">
            <h4 className="duration-header">{setTime}</h4>
            <div className="slider-parent">
                <input type="range" value={value} min="1" className="duration-slider" max="12" value={value} onChange={({ target: { value: radius } }) => {
                    setValue(radius)
                    setError(false)
                }}/>
            </div>
            <div className="duration-range">
                    <h4>{durations[0]}</h4>
                    <h4>{durations[durations.length - 1]}</h4>
                </div>
                <Buttons prevStep={prevStep} nextStep={nextStep} submit={true} submitForm={handleSubmit} error={error}/>
            </div>
            <ProgressBar value="5" max="6"/>
        </Fragment>
    )
}
