import { Component } from "react";

import imageCoffA from './coffeeA.png';
import imageCoffB from './coffeeB.png';
import imageCoffC from './coffeeC.png';

import MainSection from "../../sections/main-section/main-section"
import AboutSection from "../../sections/about-section/about-section";
import BestSection from "../../sections/best-section/best-section";
import ImgAboutSection from '../../sections/img-about-section/img-about-section'
import Footer from "../../sections/footer/footer";
import CoffeeShopSection from "../../sections/coffee-shop-section/coffee-shop-section";

export default class App extends Component {
	
	state = {
		appState: 'primary', // 'ourCoffee', 'yourPleasure', 'coffeeDesc', 'primary'
		coffeeDescData: {
			img: '',
			country: '',
			desc: '',
			price: ''
		},
		APIData: {
			best: [
				{
					img: {alt: 'coffee', src: imageCoffA}, 
					country: 'Brazil', 
					title:'Solimo Coffee Beans 2 kg', 
					price: 10.73,
					desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				},
				{
					img: {alt: 'coffee', src: imageCoffB}, 
					country: 'Columbia', 
					title:'Solimo Coffee Beans 2 kg', 
					price: 15.99,
					desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				},
				{
					img: {alt: 'coffee', src: imageCoffC}, 
					country: 'China', 
					title:'Solimo Coffee Beans 2 kg', 
					price: 6.99,
					desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				},
			]
		}
	}

	changeAppState = (newAppState) => {
		this.setState({appState: newAppState})
	}

	sendDescData = (img, country, desc ,price) => {
		this.setState({coffeeDescData: {img, country, desc, price}})
	}

	render() {
		const {appState, coffeeDescData, APIData} = this.state;
		return (
			<>
				<MainSection changeAppState={this.changeAppState} appState = {appState}/>
				<AboutSection appState = {appState}/>
				<BestSection 
					appState = {appState}
					changeAppState={this.changeAppState}
					sendDescData={this.sendDescData}
					bestGoods = {APIData.best}
				/>
				<ImgAboutSection 
					appState = {appState}
					coffeeDescData = {coffeeDescData}
				/>
				<CoffeeShopSection
					sendDescData={this.sendDescData} 
					changeAppState={this.changeAppState}
					appState = {appState}
				/>
				<Footer changeAppState={this.changeAppState}/>
			</>
		);
	}
}
