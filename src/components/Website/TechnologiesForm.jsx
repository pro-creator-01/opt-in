import React, { Fragment, useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import Buttons from '../Buttons';
import ProgressBar from '../ProgressBar'

export default function TechnologiesForm({ prevStep, nextStep, updateWebsiteOptions, values }) {
    const { t } = useTranslation()
    const options = {
        tech1: "Push Notifications",
        tech2: "Video Embedding",
        tech3: "Animation Effects",
        tech4: "Encryption",
        tech5: "Blog/ Podcast",
        tech6: "Camera",
        tech7: "Online Shop",
        tech8: "Advertising",
        tech9: "User Login",
        tech10: "Role System",
        tech11: "Analytics Integration",
        tech12: "Synchronization",
        tech13: "Pop-Up Window",
        tech14: "Social Media Integration",
        tech15: "Calendar Integration",
        tech16: "Address Book Integration"
    }

    const [features, setFeatures] = useState([...values])

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
        updateWebsiteOptions('features', features)
    }, [features])

    return (
        <Fragment>
            <div style={{textAlign: 'center'}}>
            <h2 className="header">{t('Website.Technologies.Question')}</h2>
            <h4>{t('Multiple.Heading')}</h4>
            </div>
            <div className="form-container-scnd">
                <div className="inner-container">
                <div className="grid-selection"  style={{marginTop: 40}}>
                    {Object.entries(options).map(([key, value], idx) => (
                        <div className={classNames("select-box", {"selected": features.includes(value)})} key={idx} onClick={() => toggleFeatures(value)}>
                            <h4>{t(`Website.Technologies.${key}`)}</h4>
                            <span className="more-info" style={features.includes(value) ? { display: 'none'} : {}}>
                            <span className="tool" data-tip={t(`Tooltip.App.${key}`)}>&#63;</span>
                            </span>
                            <BiCheck size={16} color='#ffffff' style={!features.includes(value) && { display: 'none' }} />
                        </div>
                    ))}
                </div>
                <Buttons prevStep={prevStep} nextStep={nextStep}/>
                
                </div>
            </div>
            <Fragment>
            <ProgressBar value="2" max="6"/>
            </Fragment>
        </Fragment>
    )
}