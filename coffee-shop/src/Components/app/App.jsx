import { Component } from "react";

import MainSection from "../../sections/main-section/main-section"
import AboutSection from "../../sections/about-section/about-section";
import BestSection from "../../sections/best-section/best-section";
import ImgAboutSection from '../../sections/img-about-section/img-about-section'
import Footer from "../../sections/footer/footer";

export default class App extends Component {
	
	state = {
		appState: 'ourCoffee' // 'ourCoffee', 'yourPleasure', 'coffeeDesc'
	}

	changeAppState = (newAppState) => {
		this.setState({appState: newAppState})
	}

	render() {
		const {appState} = this.state;
		return (
			<>
				<MainSection changeAppState={this.changeAppState} appState = {appState}/>
				<AboutSection appState = {appState}/>
				<BestSection appState = {appState}/>
				<ImgAboutSection appState = {appState}/>
				<Footer changeAppState={this.changeAppState}/>
			</>
		);
	}
}
