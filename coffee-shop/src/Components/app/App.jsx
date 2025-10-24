import { Component } from "react";
import MainSection from "../../sections/main-section/main-section"
import AboutSection from "../../sections/about-section/about-section";
import BestSection from "../../sections/best-section/best-section";
import Footer from "../../sections/footer/footer";

export default class App extends Component {
	
	state = {
		appState: 'primary' // 'ourCoffee', 'yourPleasure', 'coffeeDesc'
	}

	changeAppState = (newAppState) => {
		this.setState({appState: newAppState})
	}

	render() {
		const {appState} = this.state;
		const hideSection = appState !== 'primary';
		return (
			<>
				<MainSection changeAppState={this.changeAppState} appState = {appState}/>
				<AboutSection hideSection = {hideSection}/>
				<BestSection hideSection = {hideSection}/>
				<Footer changeAppState={this.changeAppState}/>
			</>
		);
	}
}
