import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function DeviceTypeForm({ prevStep, nextStep, updateAppOptions, values }) {
    const [selectedOptions, setSelectedOptions] = useState([...values])
    const { t } = useTranslation()

    useEffect(() => {
        updateAppOptions('platform', selectedOptions)
    }, [selectedOptions])

    const options = {
        Choice1: "Android",
        Choice2: "iOS",
        Choice3: "Browser App"
    }

    const addOption = value => {
        if (selectedOptions.includes(value)) {
            const newOptions = selectedOptions.filter(option => option !== value)
            setSelectedOptions([...newOptions])
        } else {
            setSelectedOptions([...selectedOptions, value])
        }
    }

    return (
        <Fragment>
            <div className="heading-container">
                <h2 className="header" style={{textAlign: 'center', fontWeight: 500}}>{t('App.Platforms.Heading')}</h2>
                <h4>{t('App.Platforms.Subheading')}</h4>
            </div>
            {selectedOptions.length < 1 && 
                        <label className="validation-error">*</label>
                    }
            <div className="form-container">
                <div className="inner-container">
                    {Object.entries(options).map(([key, value], idx) => (
                        <div className={classNames("check-box", {"selected": selectedOptions.includes(value)})} key={idx} onClick={() => addOption(value)}>
                            <h3>{value}</h3>
                            <BiCheck size={16} color='#ffffff' style={!selectedOptions.includes(value) && { display: 'none' }} />
                        </div>
                    ))}
                    <Buttons prevStep={prevStep} nextStep={nextStep} error={selectedOptions.length < 1 ? true : false}/>
                </div>
            </div>
            <ProgressBar value="2" max="12"/>
        </Fragment>
    )
}
