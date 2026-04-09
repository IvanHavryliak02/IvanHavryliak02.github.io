import './Form.sass'
import { useForm } from "react-hook-form"
import Button from './../Button/Button'


export default function Form({createOrder, cartIsEmpty, setGoodsInCart}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        createOrder(data); 
        reset(); 
        setGoodsInCart([]);
    }

    let firstError
    for(let key in errors) {
        firstError = errors[key].message
        break;
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__name-group">
                <input 
                    placeholder='Imie' 
                    className={`form__first-name ${errors.firstName ? 'form__input-incorrect' : ''}`} 
                    {...register("firstName", {
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Imię nie może zawierać liczb lub innych znaków'
                        }, 
                        maxLength: 20 
                    })}
                />
                <input 
                    placeholder='Nazwisko' 
                    className={`form__last-name ${errors.lastName ? 'form__input-incorrect' : ''}`} 
                    {...register("lastName", {
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Nazwisko nie może zawierać liczb lub innych znaków'
                        }, 
                })} />
            </div>
            <div className="form__location-group">
                <input 
                    placeholder='Ulica' 
                    className={`form__street ${errors.street? 'form__input-incorrect' : ''}`} 
                    {...register("street", { 
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Ulica nie może zawierać liczb lub innych znaków'
                        }
                })} />
                <input 
                    placeholder='Nr' 
                    className={`form__building-number ${errors.buildingNumber ? 'form__input-incorrect' : ''}`} 
                    {...register("buildingNumber", { 
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[1-9]\d*$/i,
                            message: 'Numer domu musi zawierać wyłącznie liczby'
                        },  
                })} />
                <input 
                    placeholder='Miasto' 
                    className={`form__city ${errors.city ? 'form__input-incorrect' : ''}`}  
                    {...register("city", {
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Miasto nie może zawierać liczb lub innych znaków'
                        }
                })} />
                <input 
                    placeholder='Kraj' 
                    className={`form__country ${errors.country ? 'form__input-incorrect' : ''}`}  
                    {...register("country", {
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: 'Kraj nie może zawierać liczb lub innych znaków'
                        }
                })} />
            </div>
            <div className="form__contact-group">
                <input 
                    placeholder='E-mail' 
                    className={`form__email ${errors.email ? 'form__input-incorrect' : ''}`}  
                    {...register("email", {
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Wprowadzony e-mail zawiera błędy'
                        } 
                })} />
                <input 
                    placeholder='Numer telefonu' 
                    className={`form__phone ${errors.phone ? 'form__input-incorrect' : ''}`} 
                    {...register("phone", {
                        required: 'Proszę wypełnić wszystkie pola',
                        pattern: {
                            value: /^\+?[0-9\s\-()]{9,15}$/,
                            message: 'Wprowadzony numer telefonu zawiera błędy'
                        } 
                })} />
            </div>
            {firstError && (
                <span 
                    className="form__main-error" 
                    style={{ color: 'red', display: 'block', margin: '10px 0' }}
                >
                    {firstError}
                </span>
            )}
            <Button
                disabled={cartIsEmpty} 
                type='submit'
                style={{marginTop: '10px'}}
            >
                Zamawiam
            </Button>
        </form>
    )   
}