import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

import QS from 'qs'
import Container from '@/app/components/organisms/container'

const api_url = 'http://localhost:3000/shows'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      history_active: true
    }
  }

  componentDidMount() {
    fetch(api_url)
      .then(res => res.json())
      .then(shows => this.setState({shows}) )
      .then(() => this.updateHistory())
      .catch(err => console.error(err));
    
    window.onpopstate = this.onPopState
  }

  onPopState = () => {
    this.setState({ history_active: false }, () => {
      this.updateSliderOnDesync()
    })
  }

  updateHistory = async(id) => {
    let {history, location} = this.props,
        param = id || this.parseParams(location),
        new_location = { pathname: '/', search: `?id=${param['id']}` }

    await location.search ? history.push(new_location) : history.replace(new_location)
    return this.updateSlider()
  }

  updateSlider = async(p) => {
    let {shows} = this.state,
        param = p || this.parseParams(location),
        slider_index = shows.findIndex(v => v['id'] === param['id'])

    await this.slider.slider_nav.slickGoTo(slider_index)
  }

  updateSliderOnDesync = async() => {
    let {location} = this.props,
        curr_param = this.parseParams(location)
    
    await this.updateSlider(curr_param)
  }

  // Returns params object e.x. {id: 'a1'}; If params empty, return first show id
  parseParams = (location) => {
    let {search} = location;

    return search ? QS.parse(search, { ignoreQueryPrefix: true }) : this.state.shows[0]
  }

  sliderAfterChange = async(i) => {
    let id = this.state.shows[i]
  
    await this.state.history_active ? this.updateHistory(id) : this.setState({ history_active: true })
    // React-Slick bug causes syncing issues with repeat scrolling. 
    // In case of de-sync, re-sync slider_main with slicer_nav
    this.slider.slider_main.slickGoTo(i)
  }
  
  render() {
    let {shows} = this.state

    return(
      <main className="t__main-page">
        <Container  ref={slider => this.slider = slider} 
                    shows={shows} 
                    sliderAfterChange={this.sliderAfterChange} />
      </main>
    )
  }
}

export default Main