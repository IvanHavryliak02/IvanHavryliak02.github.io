import styled from "styled-components";

import womenDrinkCoffeeImg from './women-drink-coffee.png';
import coffeeCup from './coffee-cup.png';

import Container from '../../Components/container/container';
import ImgDescription from "../../Components/img-description/img-description";

const ImgAboutSectionEl = styled.section`
    min-height: 485px;
    padding: 70px 0 60px 0;
    background: #fff;
    position: relative;
    display: ${({$hideSection}) => $hideSection ? 'none' : 'block'}
`

const Divider = styled.div`
    width: 240px;
    height: 1px;
    background: #000;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    display: ${({$hideDivider}) => $hideDivider ? 'none' : 'block'}
`

export default function ImgAboutSection({appState, coffeeDescData}){
    const hideSection = appState === 'primary';
    const hideDivider = appState === 'coffeeDesc';
    const {img, country,desc,price} = coffeeDescData;
    let settings;

    const setTextStyle = (text, rules) => {    
        return <span key={text} style={rules}>{text}</span>
    }

    const CountryBolded = setTextStyle('Country: ', {fontWeight: 'bold'});
    const DescBolded = setTextStyle('Description: ', {fontWeight: 'bold'});
    const PriceBolded = setTextStyle('Price: ', {fontWeight: 'bold'})
    const PriceSized = setTextStyle(`${price}$`, {fontSize: '24px'})

    switch(appState){
        case 'yourPleasure': 
            settings = {
                img: {alt: 'cup of coffee', src: coffeeCup}, 
                title: 'About our goods',
                paragraphs:[
                    `Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.`,
                    `Afraid at highly months do things on at. `,
                    `Situation recommend objection do intention
                    so questions. `,
                    `As greatly removed calling pleased improve an. Last ask him cold feel`,
                    `met spot shy want. Children me laughing we `,
                    `prospect answered followed. At it went`,
                    `is song that held help face.`
                ],
            };
            break;
        case 'coffeeDesc':
            settings = {
                img: {alt: 'choosed coffee', src: img}, 
                title: 'About it',
                paragraphs:[
                    [CountryBolded, country],
                    [DescBolded, desc],
                    [PriceBolded, PriceSized],
                ],
            };
            break;
        default: {
            settings = {
                img: {alt: 'women drinks coffee' ,src: womenDrinkCoffeeImg}, 
                title: 'About our beans',
                paragraphs:[
                    `Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible.`,
                    `Afraid at highly months do things on at. `,
                    `Situation recommend objection do intention
                    so questions. `,
                    `As greatly removed calling pleased improve an. Last ask him cold feel`,
                    `met spot shy want. Children me laughing we `,
                    `prospect answered followed. At it went`,
                    `is song that held help face.`
                ]
            };
            break;
        }
    }
    return (
        <ImgAboutSectionEl $hideSection={hideSection}>
            <Container>
                <ImgDescription 
                    img={settings.img}
                    title={settings.title}
                    paragraphs={settings.paragraphs}
                    appState={appState}
                />
            </Container>
            <Divider $hideDivider={hideDivider}/>
        </ImgAboutSectionEl>
    )
}