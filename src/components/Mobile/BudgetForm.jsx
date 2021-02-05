import React, { useState, useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons'
import ProgressBar from '../ProgressBar'

export default function BudgetForm({ prevStep, nextStep, updateAppOptions, values }) {
    const [value, setValue] = useState(values ? values : 19000)
    const { t } = useTranslation()

    useEffect(() => {
        updateAppOptions('budget', value)
    }, [value])

    return (
        <Fragment>
            <h2 className="header">{t('App.Budget.Question')}</h2>
            <div style={{textAlign: 'center', marginBlock: 20}}>
            <h4 style={{fontWeight: 300}}>{value}€</h4>
            <h4 style={{fontWeight: 400}}>{t('App.Budget.Answer')}</h4>
            </div>
            <div className="form-submit">
            <div className="slider-parent">
                <input type="range" value={value} min="19000" max="250000" step="10000" className="duration-slider" value={value} onChange={({ target: { value: radius } }) => setValue(radius)}/>
                <div className="slider-range">
                    <h4>19,000€</h4>
                    <h4>250,000€</h4>
                </div>
                <Buttons prevStep={prevStep} nextStep={nextStep}/>
            </div>
            </div>
            <ProgressBar value="10" max="12"/>
        </Fragment>
    )
}
