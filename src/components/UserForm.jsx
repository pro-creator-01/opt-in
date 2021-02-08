import React, { Component } from 'react'
import axios from 'axios'
import emailjs from 'emailjs-com';
import ChooseProductForm from './ChooseProductForm';
import SelectLanguageForm from './SelectLanguageForm'
import UserDetailsForm from './UserDetailsForm'
import SelectPagesForm from './Website/SelectPagesForm';
import TechnologiesForm from './Website/TechnologiesForm';
import QuestionsForm from './Website/QuestionsForm';
import FurtherQuestionsForm from './Website/FurtherQuestionsForm';
import DurationForm from './Website/DurationForm';

import DeviceTypeForm from './Mobile/DeviceTypeForm';
import ChooseSystemForm from './Mobile/ChooseSystemForm';
import TargetGroupForm from './Mobile/TargetGroupForm';
import ApplicationPurposeForm from './Mobile/ApplicationPurposeForm';
import FeaturesForm from './Mobile/FeaturesForm';
import ScreenAlignmentForm from './Mobile/ScreenAlignmentForm';
import AppFurtherQuestionsForm from './Mobile/FurtherQuestionsForm';
import ExpertQuestionsForm from './Mobile/ExpertQuestionsForm';
import ContentForm from './Mobile/ContentForm';
import BudgetForm from './Mobile/BudgetForm';
import ExplanationForm from './Mobile/ExplanationForm';
import SuccessPage from './SuccessPage';

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            user: {
                name: '',
                phone: '',
                email: ''
            },
            errors: {
                name: '',
                phone: '',
                email: ''
            },
            productType: '',
            app: {
                deviceType: [],
                platforms: [],
                targetGroup: '',
                applicationPurpose: {
                    options: [],
                    description: ''
                },
                features: [],
                screenAlignment: '',
                furtherQuestions: {},
                expertQuestions: {},
                content: '',
                budget: [],
                explanation: ''
            },
            website: {
                numberOfPages: '',
                features: [],
                designQuestions: {},
                furtherQuestions: {},
                duration: ''
            }
        }
    } 

    formSubmitted = false;
    valid = false;

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        });
    }

    validate = () => {
        const {name, email, phone} = this.state.user
        const error = {}

        if(this.formSubmitted) {
            if (name.trim() === '') {
                error['name'] = 'Name is required'
            } else {
                error['name'] = ''
            }
            
            if (!validateEmail(email) || email.trim() === '') {
                if(email.trim() === '') {
                    error['email'] = 'Email is required'
                } else {
                    error['email'] = 'Email must be in format john@example.com'
                } 
            } else {
                error['email'] = ''
            }
    
            if (phone.trim() === '') {
                error['phone'] = 'Phone Number is required'
            } else {
                error['phone'] = ''
            }
    
            this.setState({ errors: error })
        }

        return new Promise((resolve, reject) => {
            error ? resolve(error) : reject('Error')
        })
    }

    validateAndNext = async () => {
        this.formSubmitted = true
        await this.validate().then(error => {
            this.next(error)
        })
    }

    next = error => {
        if(error.name === '' && error.email === '' && error.phone === '') {            
            this.setState({step: this.state.step + 1})
        }
    }

    selectApp = () => {
        this.setState({
            step: 10
        });
    }

    deselectApp = () => {
        this.setState({
            step: 3
        });
    }

    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        });
    }

    updateWebsiteOptions = (type, values) => {
        if(type === 'designQuestions') {
            this.setState({ website: {
                ...this.state.website, designQuestions: values
            }})
        } else if(type === 'furtherQuestions') {
            this.setState({ website: {
                ...this.state.website, furtherQuestions: values
            }})
        } else if (type === 'features') {
            this.setState({ website: {
                ...this.state.website, features: [...values]
            }})
        } else if (type === 'numberOfPages') {
            this.setState({ website: {
                ...this.state.website, numberOfPages: values
            }})
        } else if (type === 'duration') {
            this.setState({ website: {
                ...this.state.website, duration: values
            }})
        }
    }

    updateAppOptions = (type, values) => {
        if(type === 'type') {
            this.setState({ app: {
                ...this.state.app, deviceType: [...values]
            }})
        } else if(type === 'platform') {
            this.setState({ app: {
                ...this.state.app, platforms: [...values]
            }})
        } else if(type === 'target') {
            this.setState({ app: {
                ...this.state.app, targetGroup: [...values]
            }})
        } else if(type === 'purpose') {
            this.setState({ app: {
                ...this.state.app, applicationPurpose: {
                    options: [...values.options], description: values.description
                }
            }})
        } else if(type === 'features') {
            this.setState({ app: {
                ...this.state.app, features: [...values]
            }})
        } else if(type === 'alignment') {
            this.setState({ app: {
                ...this.state.app, screenAlignment: values
            }})
        } else if(type === 'questions') {
            this.setState({ app: {
                ...this.state.app, furtherQuestions: values
            }})
        } else if(type === 'expert') {
            this.setState({ app: {
                ...this.state.app, expertQuestions: values
            }})
        } else if(type === 'content') {
            this.setState({ app: {
                ...this.state.app, content: values
            }})
        } else if(type === 'budget') {
            this.setState({ app: {
                ...this.state.app, budget: [...values]
            }})
        } else if(type === 'explanation') {
            this.setState({ app: {
                ...this.state.app, explanation: values
            }})
        }
    }

    changeUserData = input => e => {
        if(this.formSubmitted) {
            this.validate()
        }
        this.setState({
            user: {...this.state.user, [input]: e.target.value}
        })
    }

    chooseProduct = product => {
        this.setState({ productType: product })
    }

    handleWebsiteFormSubmit = () => {
        const { user, website: { numberOfPages, designQuestions, furtherQuestions, features, duration } } = this.state
        const message = `
            <p>Customer Name: ${user.name}</p>
            <p>Customer Email: ${user.email}</p>
            <p>Phone Number: ${user.phone}</p>
            <h2>Needs a Website</h2>
            <ul>
                <li>Number of Pages: ${numberOfPages}</li>
                <li>Design Questions: 
                <p>${JSON.stringify(designQuestions)}</p>
                </li>
                <li>Further Questions: 
                <p>${JSON.stringify(furtherQuestions)}</p>
                </li>
                <li>Features: 
                <p>${features}</p>
                </li>
                <li>Needed in: ${duration}</li>
            </ul>
        `;
        axios.post('https://optin-emailer.herokuapp.com/send', {
            name: user.name,
            messageHtml: message
        });
    }

    handleAppFormSubmit = () => {
        const { user, app: { 
            deviceType,
                platforms,
                targetGroup,
                applicationPurpose: {
                    options,
                    description
                },
                features,
                screenAlignment,
                furtherQuestions,
                expertQuestions,
                content,
                budget,
                explanation
         } } = this.state
        const message = `
            <p>Customer Name: ${user.name}</p>
            <p>Customer Email: ${user.email}</p>
            <p>Phone Number: ${user.phone}</p>
            <h2>Needs an App</h2>
            <ul>
                <li>Device Type: ${deviceType}</li>
                <li>Platforms: ${platforms}</li>
                <li>Target Devices: ${targetGroup}</li>
                <li>Screen Alignment: ${screenAlignment}</li>
                <li>Application Purpose: ${options}<br>${description}</li>
                <li>Further Questions: 
                ${JSON.stringify(furtherQuestions)}
                </li>
                <li>Expert Questions: 
                ${JSON.stringify(expertQuestions)}
                </li>
                <li>Features: 
                <p>${features}</p>
                </li>
                <li>Content: ${content}</li>
                <li>Budget: ${budget[0]} - ${budget[1]}</li>
                <li>Explanation: ${explanation}</li>
            </ul>
        `;
        axios.post('https://optin-emailer.herokuapp.com/send', {
            name: user.name,
            messageHtml: message
        });
    }

    multiStepForm = () => {
        const { step, user } = this.state;
        switch (step) {
            case 1:
                return (
                    <SelectLanguageForm nextStep={this.nextStep}/>
                )
            
            case 2:
                return (                    
                    <UserDetailsForm user={user} changeUserData={this.changeUserData} prevStep={this.prevStep} nextStep={this.nextStep} errors={this.state.errors} validateForm={this.validateAndNext}/>
                )

            case 3:
                return (
                    <ChooseProductForm chooseProduct={this.chooseProduct} prevStep={this.prevStep} nextStep={this.nextStep} selectApp={this.selectApp}/>
                )
            
            case 4:
                return (
                    <SelectPagesForm prevStep={this.prevStep} nextStep={this.nextStep} updateWebsiteOptions={this.updateWebsiteOptions} values={this.state.website.numberOfPages}/>
                )
                
            case 5:
                return (
                    <TechnologiesForm prevStep={this.prevStep} nextStep={this.nextStep} updateWebsiteOptions={this.updateWebsiteOptions} values={this.state.website.features}/>
                )
                
            case 6:
                return (
                    <QuestionsForm prevStep={this.prevStep} nextStep={this.nextStep} updateWebsiteOptions={this.updateWebsiteOptions} values={this.state.website.designQuestions}/>
                )
                
            case 7:
                return (
                    <FurtherQuestionsForm prevStep={this.prevStep} nextStep={this.nextStep} updateWebsiteOptions={this.updateWebsiteOptions} values={this.state.website.furtherQuestions}/>
                )
                
            case 8:
                return (
                    <DurationForm prevStep={this.prevStep} nextStep={this.nextStep} updateWebsiteOptions={this.updateWebsiteOptions} handleSubmit={this.handleWebsiteFormSubmit} values={this.state.website.duration}/>
                )
                
            case 9:
                return (
                    <SuccessPage/>
                )

            case 10:
                return (
                    <DeviceTypeForm nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} deselectApp={this.deselectApp} values={this.state.app.deviceType}/>
                )
            
            case 11:
                return (
                    <ChooseSystemForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.platforms}/>
                )

            case 12:
                return (
                    <TargetGroupForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.targetGroup}/>
                )

            case 13:
                return (
                    <ApplicationPurposeForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.applicationPurpose}/>
                )

            case 14:
                return (
                    <FeaturesForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.features}/>
                )

            case 15:
                return (
                    <ScreenAlignmentForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.screenAlignment}/>
                )

            case 16:
                return (
                    <AppFurtherQuestionsForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.furtherQuestions}/>
                )
            
            case 17:
                return (
                    <ExpertQuestionsForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.expertQuestions}/>
                )

            case 18:
                return (
                    <ContentForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.content}/>
                )
            
            case 19:
                return (
                    <BudgetForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.budget}/>
                )

            case 20:
                return (
                    <ExplanationForm prevStep={this.prevStep} nextStep={this.nextStep} updateAppOptions={this.updateAppOptions} values={this.state.app.explanation} handleSubmit={this.handleAppFormSubmit}/>
                )
            
            case 21:
                return (
                    <SuccessPage/>
                )
        }
    }

    render() {
        return (
            <div className="container">
                {this.multiStepForm()}                
            </div>
        )
    }
}
