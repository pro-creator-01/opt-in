import React, { Fragment } from 'react'
import { BiLaptop } from 'react-icons/bi'
import { FaMobileAlt } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import ProgressBar from './ProgressBar'

export default function ChooseProductForm({ chooseProduct, nextStep, selectApp }) {
    const { t } = useTranslation()

    const selectProduct = value => {
        chooseProduct(value);
        if(value === 'website') {
            console.log('fskjkj')
            nextStep();
        } else if (value === 'app') {
            selectApp()
        }
    }

    return (
        <Fragment>
            <h2 className="header">{t('ProductType.Question')}</h2>
        <div className="form-container">
            <div className="card-holder">
                <div className="card-box">
                    <div className="card" onClick={() => selectProduct('website')}>
                        <BiLaptop size={60}/>
                    </div>
                    <h4>Website</h4>
                </div>
                <div className="card-box">
                    <div className="card" onClick={() => selectProduct('app')}>
                        <FaMobileAlt size={60}/>
                    </div>
                    <h4>App</h4>
                </div>
            </div>
        </div>
        <ProgressBar value="0" max="12" text={'Progress'}/>
        </Fragment>
    )
}
