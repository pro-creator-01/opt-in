import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function DeviceTypeForm({ prevStep, nextStep, updateAppOptions, values }) {
    const [selectedOptions, setSelectedOptions] = useState([...values.options])
    const [description, setDescription] = useState(values.description)
    const [error, setError] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        const form = {
            options: [...selectedOptions],
            description
        }
        updateAppOptions('purpose', form)
        if(selectedOptions.length < 1 || description === '') {
            setError(true)
        } else {
            setError(false)
        }
    }, [selectedOptions, description])

    const options = {
        "Choice1": "Collecting data",
        "Choice2": "Processing data",
        "Choice3": "Displaying data"
    }

    const addOption = value => {
        if (selectedOptions.includes(value)) {
            const newOptions = selectedOptions.filter(option => option !== value)
            setSelectedOptions([...newOptions])
        } else {
            setSelectedOptions([...selectedOptions, value])
        }
    }

    const handleChange = (event) => {
        setDescription(event.target.value)
    }

    return (
        <Fragment>
            <div className="heading-container">
                <h2 className="header">{t('App.Purpose.Question')}</h2>
            </div>
            {error && 
                        <label className="validation-error">*</label>
                    }
            <div className="form-container">
                <div className="inner-container">
                {Object.entries(options).map(([key, value], idx) => (
                    <div className={classNames("check-box", {"selected": selectedOptions.includes(value)})} key={idx} onClick={() => addOption(value)}>
                        <h3>{t(`App.Purpose.${key}`)}</h3>
                        <BiCheck size={16} color='#ffffff' style={!selectedOptions.includes(value) && { display: 'none' }} />
                    </div>
                ))}
                <textarea value={description} className="text-area" placeholder={t(`App.Purpose.Choice4`)} onChange={handleChange}></textarea>
                <Buttons prevStep={prevStep} nextStep={nextStep} error={error}/>
            </div>
            </div>
            <ProgressBar value="4" max="12"/>
        </Fragment>
    )
}
