import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Buttons from './Buttons';

export default function UserDetailsForm({ user, changeUserData, prevStep, nextStep, errors, validateForm }) {
    const { t } = useTranslation()
    return (
        <Fragment>
            <h2 className="header">{t('BasicInfo')}</h2>
            <div className="form-container">
                <div className="inner-container">
                    <form>
                    {errors.name && 
                    <label className="validation-error">{errors.name}</label>
                    }
                    <input type="text" 
                        className="inpt1" 
                        value={user.name}
                        onChange={changeUserData('name')} 
                        id="name"
                        placeholder="Name"/>
                    {errors.phone && 
                    <label className="validation-error">{errors.phone}</label>
                    }
                    <input type="number" 
                        className="inpt1"
                        value={user.phone} 
                        onChange={changeUserData('phone')} 
                        placeholder={t('Phone')}/>
                    {errors.email && 
                    <label className="validation-error">{errors.email}</label>
                    }
                    <input type="email" 
                        className="inpt1"
                        value={user.email} 
                        onChange={changeUserData('email')} 
                        placeholder={t('Email')}/>
                    </form>                    
                    <Buttons prevStep={prevStep} nextStep={nextStep} validateForm={validateForm}/>
                </div>
            </div>
        </Fragment>
    )
}
