import { Component } from "react";

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
		}
	}

	changeAppState = (newAppState) => {
		this.setState({appState: newAppState})
	}

	sendDescData = (img, country, desc ,price) => {
		this.setState({coffeeDescData: {img, country, desc, price}})
	}

	render() {
		const {appState, coffeeDescData} = this.state;
		return (
			<>
				<MainSection changeAppState={this.changeAppState} appState = {appState}/>
				<AboutSection appState = {appState}/>
				<BestSection appState = {appState}/>
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
