import './Voting.sass'

import liIco from './ico/list_decoration.svg'

export default function Voting() {
    return (
        <div className="voting">
            <h3 className="voting__title">
                Умови конкурсу
            </h3>
            <ul className="voting__list">
                <li>
                    <span>Створити візуал:</span> Зробити фото або коротке відео (до 15 секунд), де ваш байк або елемент екіпірування представлений у кінематографічному стилі (особлива увага до світла, композиції та кольорокорекції)
                    <div className="voting__img">
                        <img src={liIco} alt="прикраса елементу списку" />
                    </div>
                </li>
                <li>
                    <span>Опублікувати пост:</span> Розмістити роботу у своєму профілі з тегом нашої спільноти та коротким описом того, який фільм або режисер надихнув вас на цей кадр.
                    <div className="voting__img">
                        <img src={liIco} alt="прикраса елементу списку" />
                    </div>
                </li>
                <li>
                    <span>Використати хештег:</span> Обов’язково додати тег #MotoCinemaFocus під публікацією для ідентифікації вашої участі.
                    <div className="voting__img">
                        <img src={liIco} alt="прикраса елементу списку" />
                    </div>
                </li>
                <li>
                    <span>Бути підписаним:</span> Перевірити наявність підписки на наш ресурс, де будуть оголошені результати.
                    <div className="voting__img">
                        <img src={liIco} alt="прикраса елементу списку" />
                    </div>
                </li>
                <li>
                    <span>Терміни:</span> Роботи приймаються до кінця поточного місяця; переможця буде визначено за критеріями художньої якості та технічного виконання.
                    <div className="voting__img">
                        <img src={liIco} alt="прикраса елементу списку" />
                    </div>
                </li>
            </ul>
        </div>
    )
}