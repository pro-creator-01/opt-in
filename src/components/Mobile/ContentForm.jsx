import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function ContentForm({ prevStep, nextStep, updateAppOptions, values }) {
    const [selectedOptions, setSelectedOptions] = useState(values)
    const { t } = useTranslation()

    useEffect(() => {
        updateAppOptions('content', selectedOptions)
    }, [selectedOptions])

    const options = {
        Choice1: "We will deliver them",
        Choice2: "They need to be created",
        Choice3: "Not sure yet"
    }

    return (
        <Fragment>
            <h2 className="header" style={{textAlign: 'center', fontWeight: 500}}>{t('App.Content.Question')}</h2>
            <div className="form-container">
            <div className="inner-container">
                {Object.entries(options).map(([key, value], idx) => (
                    <div className={classNames("check-box", {"selected": selectedOptions === value})} key={idx} onClick={() => setSelectedOptions(value)}>
                        <h3>{t(`App.Content.${key}`)}</h3>
                        <BiCheck size={16} color='#ffffff' style={selectedOptions !== value && { display: 'none' }} />
                    </div>
                ))}
                <Buttons prevStep={prevStep} nextStep={nextStep}/>
            </div>
            </div>
            <ProgressBar value="9" max="12"/>
        </Fragment>
    )
}
