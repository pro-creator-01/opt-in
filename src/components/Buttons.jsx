import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineArrowUp } from 'react-icons/ai'

export default function Buttons({prevStep, nextStep, step, submit = false, submitForm, validateForm = null, error = false}) {
    const { t } = useTranslation()
    return (
            <div className="buttons-row">
                    <a onClick={e => {
                        e.preventDefault()
                        prevStep()
                    }} style={{cursor: 'pointer'}}>
                        <AiOutlineArrowUp size={14} style={{marginRight: 6}}/>
                        {t('Back')} 
                    </a>
                    {submit
                    ? <a onClick={e => {
                        e.preventDefault()
                        if(!error) {
                            submitForm()
                            nextStep()
                        }
                    }} className="btn1">{t('Send')}</a>
                    : <a onClick={e => {
                        e.preventDefault()
                        if(!error) {
                            validateForm ? validateForm() : nextStep()
                        }
                    }} className="btn1">{t('Continue')}</a>
                    }
                    <a className="button-width"></a>
            </div>
    )
}
