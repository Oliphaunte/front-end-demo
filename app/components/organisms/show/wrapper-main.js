import React from 'react'
import Slider from 'react-slick';

class SliderWrapperMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let {shows} = this.props

    const settings_main = {
      infinite: false,
      fade: true,
    }

    return (
      <div className="o__show-container">
        <Slider {...settings_main} asNavFor={this.props.sliderNav}>
          {shows.map(show =>
            <div className="m__show-item" key={`item_${show.id}`}>
              <img src={show.product_image_url} />
              <p>{show.episodes} episodes</p>
              <h2>{show.title}</h2>
            </div>
          )}
        </Slider>
      </div>
    )
  }
}

export default SliderWrapperMain