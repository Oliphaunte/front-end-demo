import React from 'react'
import Slider from 'react-slick';

class SliderWrapperNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let {shows} = this.props
    console.log(this.props)

    const settings_nav = {
      beforeChange: this.props.updateParams,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
      focusOnSelect: true,
      responsive: [
      { breakpoint: 1024,
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
          arrows: false,
        }
      }]
    }

    return (
      <div className="o__show-nav-container">
        <Slider {...settings_nav} asNavFor={this.props.sliderMain}>
          {shows.map((show, i) =>
            <div className="m__show-item-nav" id={show.id} key={`nav_item_${show.id}`}>
              <div className="nav-block"></div>
              <p>{i+1}</p>
            </div>
          )}
        </Slider>
      </div>
    )
  }
}

export default SliderWrapperNav