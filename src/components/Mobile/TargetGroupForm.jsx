import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function TargetGroupForm({ prevStep, nextStep, updateAppOptions, values }) {
    const [selectedOptions, setSelectedOptions] = useState(values)
    const { t } = useTranslation()

    useEffect(() => {
        updateAppOptions('target', selectedOptions)
    }, [selectedOptions])

    const options = {
        Choice1: "End Customers(B2C, everyone)",
        Choice2: "Corporate Customers(B2B)",
        Choice3: "Own company/employees"
    }

    return (
        <Fragment>
            <div className="heading-container">
                <h2 className="header">{t('App.TargetGroup.Question')}</h2>
            </div>
            {selectedOptions === '' && 
                        <label className="validation-error">*</label>
                    }
            <div className="form-container">
                <div className="inner-container">
                <div className="options">
                {Object.entries(options).map(([key, value], idx) => (
                    <div className={classNames("check-box", {"selected": selectedOptions === value})} key={idx} onClick={() => setSelectedOptions(value)}>
                        <h3>{t(`App.TargetGroup.${key}`)}</h3>
                        <BiCheck size={16} color='#ffffff' style={selectedOptions !== value && { display: 'none' }} />
                    </div>
                ))}
            </div>
            <Buttons prevStep={prevStep} nextStep={nextStep} error={selectedOptions === '' ? true : false}/>
                </div>
            </div>
            <Fragment>
            <ProgressBar value="3" max="12"/>
            </Fragment>
        </Fragment>
    )
}
