import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

export default function ProgressBar({ value, max, text }) {
    const { t } = useTranslation()
    return (
        <div className="progress-bar">
                {!text ? <h4 className="progress-title">{value}/{max} {t('Answered')}</h4>
                : <h4 className="progress-title">{t('Progress')}</h4>}
                <progress value={value} max={max} className="progress-bar"></progress>
        </div>
    )
}
