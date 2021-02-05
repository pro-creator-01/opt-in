import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar';

export default function DeviceTypeForm({ nextStep, updateAppOptions, deselectApp, values }) {
    const [selectedOptions, setSelectedOptions] = useState([...values])
    const { t } = useTranslation()

    useEffect(() => {
        updateAppOptions('type', selectedOptions)
    }, [selectedOptions])

    const options = {
        Choice1: "Smartphone",
        Choice2: "Tablet", 
        Choice3: "PC", 
        Choice4: "Smartwatch"
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
            <h2 className="header" style={{textAlign: 'center', fontWeight: 500}}>{t('App.Type.Heading')}</h2>
            <h4>{t('App.Type.Subheading')}</h4>
            <div className="form-container">
                <div className="inner-container">
                {Object.entries(options).map(([key, value], idx) => (
                    <div className={classNames("check-box", {"selected": selectedOptions.includes(value)})} key={idx} onClick={() => addOption(value)}>
                        <h3>{value}</h3>
                        <BiCheck size={16} color='#ffffff' style={!selectedOptions.includes(value) && { display: 'none' }} />
                    </div>
                ))}
                <Buttons prevStep={deselectApp} nextStep={nextStep}/>
                </div>
            </div>
            <ProgressBar value="1" max="12"/>
        </Fragment>
    )
}
