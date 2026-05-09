import './Contact.sass'

import React from 'react'
import { useForm } from 'react-hook-form'

import ActionButton from './../../components/Buttons/ActionButton/ActionButton'

export default function Contact() {



    const { register, watch, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur" 
    })

    const descrValue = watch("description", "");
    const MAX_LENGTH = 300;

    const onSubmit = (data) => {
    console.log('form data:', data)
    }

    return (
        <section className="contact">
            <div className="container">
                <div className="contact__wrapper">
                    <div className="grid__contact">
                        <form id="contactForm" onSubmit={handleSubmit(onSubmit)} className="contact__left-col contact__form">
                    
                            <div className="contact__input-wrapper">
                                <label htmlFor="name" className="contact__label">ІМ'Я</label>
                                <input 
                                    id="name" 
                                    type="text" 
                                    {...register('name', { 
                                        required: "Це поле є обов'язковим",
                                        minLength: { value: 2, message: "Ім'я занадто коротке" },
                                        pattern: {
                                            value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/, 
                                            message: "Ім'я не може містити цифри або спецсимволи"
                                        }
                                    })}
                                    placeholder="Введіть ваше ім'я або назву компанії"
                                />
                                {errors.name && <span className="contact__error-message">{errors.name.message}</span>}
                            </div>

                            <div className="contact__input-wrapper">
                                <label htmlFor="description" className="contact__label">ОПИС</label>
                                <span className="contact__symbol-counter">
                                    {descrValue.length} / {MAX_LENGTH}
                                </span>
                                <textarea 
                                    id="description" 
                                    rows="6" 
                                    {...register('description', { 
                                        required: "Опис обов'язковий",
                                        maxLength: { value: MAX_LENGTH, message: `Максимальна довжина — ${MAX_LENGTH} символів` },
                                        minLength: { value: 20, message: "Опис має складати щонайменше 20 символів" },
                                    })}
                                    placeholder="Додайте опис пропозиції" 
                                />
                                {errors.description && <span className="contact__error-message">{errors.description.message}</span>}
                            </div>

                            <div className="contact__input-wrapper">
                                <label htmlFor="email" className="contact__label">E-MAIL</label>
                                <input 
                                    id="email" 
                                    type="email" 
                                    {...register('email', { 
                                        required: "E-mail є обов'язковим",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@(?!xn--)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
                                            message: "Невірний формат email"
                                        }
                                    })}
                                    placeholder="Додайте пошту в форматі example@domain.zone"  
                                />
                                {errors.email && <span className="contact__error-message">{errors.email.message}</span>}
                            </div>

                            <div className="contact__input-wrapper">
                                <label htmlFor="phone" className="contact__label">НОМЕР ТЕЛЕФОНУ</label>
                                <input 
                                    id="phone" 
                                    type="tel" 
                                    {...register('phone', { 
                                        required: "Номер телефону обов'язковий",
                                        pattern: {
                                            value: /^\+?380\d{9}$/,
                                            message: "Введіть коректний номер телефону"
                                        }
                                    })}
                                    placeholder="Номер телефону в форматі (+380xxxxxxxxx)"  
                                />
                                {errors.phone && <span className="contact__error-message">{errors.phone.message}</span>}
                            </div>
                        
                        </form>

                        <div className="contact__right-col">
                            <p className="contact__text">
                                Дорога стає цікавішою, коли з'являються нові герої. Якщо у вас є
                                пропозиції щодо співпраці, ідеї для нових оглядів або ви просто хочете
                                обговорити рідкісний кадр із классики нуару — виходьте на зв'язок.
                            </p>
                            
                            <ActionButton formData={{type: "submit", form: "contactForm"}} className="contact_btn">
                                надіслати
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}