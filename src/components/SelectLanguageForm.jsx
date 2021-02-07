import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import EngFlag from '../images/eng.svg'
import GermanFlag from '../images/de.svg'

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
            <div className="flag-holder">
                <div className="flag-box">
                    <img src={EngFlag} className="flag" alt="English" srcset="" onClick={() => changeLanguage('en')}/>
                    <img src={GermanFlag} alt="German" srcset="" className="flag" onClick={() => changeLanguage('de')}/> 
                </div>
            </div>
        </div>
        </Fragment>
    )
}
