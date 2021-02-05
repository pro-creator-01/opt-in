import React from 'react'
import {useTranslation} from 'react-i18next'

export default function SuccessPage() {
    const { t } = useTranslation()
    return (
        <div style={{textAlign: 'center'}}>
            <h3>Done!</h3>
            <progress value={2} max={2} style={{height: '10px', width: '300px'}}></progress>
            <div style={{marginTop: 50}}>
                <h2>{t('Success.line1')}</h2>
                <h2>{t('Success.line2')}</h2>
            </div>
        </div>
    )
}
