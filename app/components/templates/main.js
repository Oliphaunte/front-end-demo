import React from 'react'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import QS from 'qs'
import SliderWrapperMain from '@/app/components/organisms/show/wrapper-main'
import SliderWrapperNav from '@/app/components/organisms/show/wrapper-nav'
import Container from '@/app/components/organisms/container'

const History = createBrowserHistory()
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
      .then(() => this.updateParams())
      .then(() => this.updateSlider())
      .catch(err => {
        console.error(err)
      });
  }

  componentDidUpdate() {
    window.onpopstate = this.onPopState
  }

  onPopState = async() => {
    this.setState({ history_active: false })
    await this.updateParams()
    await this.updateSlider()
  }

  updateParams = () => {
    let { search } = this.props.location,
        query_param = QS.parse(search, { ignoreQueryPrefix: true })

    if (search) return this.setState({ query_param })
    else return this.updateHistory(-1, 0)
  }

  updateHistory = (old_i, new_i) => {
    let param = this.state.shows[new_i],
        location = {
          pathname: '/',
          search: `?id=${param['id']}`
        };

    if (old_i === -1) return History.replace(location)
    if (this.state.history_active) return History.push(location)
  }

  updateSlider = () => {
    let { shows, query_param } = this.state,
        slider_index  = shows.findIndex(v => v['id'] === query_param['id']);

    this.slider.slider_nav.slickGoTo(slider_index)
  }

  sliderBeforeChange = (old_i, new_i) => {
    this.updateHistory(null, new_i)
  }

  sliderAfterChange = () => {
    this.setState({ history_active: true })
  }
  
  render() {
    let {shows, query_param} = this.state

    return(
      <main className="t__main-page">
        {/* <SliderWrapperMain shows={shows} ref={slider => this.slider_main = slider} sliderNav={this.slider_nav}/> */}
        {/* <SliderWrapperNav shows={shows} ref={slider => this.slider_nav = slider} sliderMain={this.slide_main}/> */}
        <Container  ref={slider => this.slider = slider} 
                    shows={shows} 
                    queryParam={query_param}
                    sliderBeforeChange={this.sliderBeforeChange} 
                    sliderAfterChange={this.sliderAfterChange} />
      </main>
    )
  }
}

export default Main