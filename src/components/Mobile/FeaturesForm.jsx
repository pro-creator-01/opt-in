import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function FeaturesForm({ prevStep, nextStep, updateAppOptions, values }) {
    const { t } = useTranslation()
    const options = {
        tech1: "Push-Benachrichti gungen",
        tech2: "NFC",
        tech3: "Bluetooth",
        tech4: "Verschlüsselung",
        tech5: "In-app Töne",
        tech6: "Kamera",
        tech7: "Gyroskop",
        tech8: "GPS",
        tech9: "Werbung",
        tech10: "User Login",
        tech11: "Rollensystem",
        tech12: "Kostenpflichtige App",
        tech13: "In-app Käufe",
        tech14: "Synchronisierung",
        tech15: "Backupfunktion",
        tech16: "App-Bewertung",
        tech17: "Social Media Einbindung",
        tech18: "Kalendarintegration",
        tech19: "Adressbuchintegration",
        tech20: "Analytics Einbindung"
    }

    const [features, setFeatures] = useState(values)

    const toggleFeatures = name => {
        if(features.includes(name)) {
            const newFeatures = features.filter(feature => feature !== name)
            setFeatures(newFeatures)
        } else {
            const newFeatures = [...features, name]
            setFeatures(newFeatures)
        }
    }

    useEffect(() => {
        updateAppOptions('features', features)
    }, [features])

    return (
        <Fragment>
            <div className="heading-container">
            <h2 className="header" style={{marginTop: '70px'}}>{t(`App.Features.Question`)}</h2>
            <h4>{t(`Multiple.Heading`)}</h4>
            </div>
            {features.length < 1 && 
                        <label className="validation-error">*</label>
                    }
            <div className="form-container-scnd">
            <Fragment>
            <div className="grid-selection">
                {Object.entries(options).map(([key, value], idx) => (
                    <div className={classNames("select-box", {"selected": features.includes(value)})} key={idx} onClick={() => toggleFeatures(value)}>
                        <h4>{t(`App.Features.${key}`)}</h4>
                        <div className="tooltip-ex">
                            <span className="more-info" style={features.includes(value) ? { display: 'none'} : {}}>&#63;</span>
                            <span class="tooltip-ex-text">
                            {t(`Tooltip.App.${key}`)}
                            </span>
                        </div>
                        <BiCheck size={16} color='#ffffff' style={!features.includes(value) && { display: 'none' }} />
                    </div>
                ))}
            </div>
            <Buttons prevStep={prevStep} nextStep={nextStep} error={features.length < 1 ? true : false}/>
            </Fragment>
            </div>
            <div style={{marginTop: 130}}>
            <ProgressBar value="5" max="12"/>
            </div>
        </Fragment>
    )
}
