import React from 'react'
import Slider from 'react-slick';

class SliderContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let {shows} = this.props

    const settings_main = {
      infinite: false,
      fade: true,
      arrows: false,
    }

    const settings_nav = {
      beforeChange: this.props.sliderBeforeChange,
      afterChange: this.props.sliderAfterChange,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
      focusOnSelect: true,
      arrows: false,
      responsive: [
      { breakpoint: 980,
        settings: {
          centerMode: true,
          centerPadding: '60px',
          slidesToShow: 3,
        }
      }, {
        breakpoint: 520,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
          arrows: false,
        }
      }]
    }

    return (
      <React.Fragment>
        <div className="o__show-container">
          <Slider {...settings_main} ref={slider => this.slider_main = slider} asNavFor={this.slider_nav}>
            {shows.map(show =>
              <div className="m__show-item" key={`item_${show.id}`}>
                <img src={require(`@/app/assets/images/${show.product_image_url}`)} />
                <p>{show.episodes} episodes</p>
                <h2>{show.title}</h2>
              </div>
            )}
          </Slider>
        </div>

        <div className="o__show-nav-container">
          <Slider {...settings_nav} ref={slider => this.slider_nav = slider} asNavFor={this.slider_main}>
            {shows.map((show, i) =>
              <div className="m__show-item-nav" id={show.id} key={`nav_item_${show.id}`}>
                <div className="nav-block"></div>
                <p>{i+1}</p>
              </div>
            )}
          </Slider>
        </div>
      </React.Fragment>
    )
  }
}

export default SliderContainer