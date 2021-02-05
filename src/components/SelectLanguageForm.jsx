import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

export default function SelectLanguageForm({ nextStep }) {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        nextStep();
    }

    return (
        <Fragment>
            <h2 className="header">Choose your preferred language</h2>
            <div className="form-container">
            <div className="card-holder">
                <div className="card-box">
                    <div className="card" onClick={() => changeLanguage('en')}>
                        <a>English</a>
                    </div>
                </div>
                <div className="card-box">
                    <div className="card" onClick={() => changeLanguage('de')}>
                        <a>German</a>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    )
}
