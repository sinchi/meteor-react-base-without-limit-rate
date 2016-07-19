import React from 'react';
import InputRange from 'react-input-range';

export class PriceRange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        min: 2,
        max: 10,
      },
    };
  }

  handleValuesChange(component, values) {
    this.setState({
      values: values,
    });
  }

  render() {
    return (
      <InputRange
        maxValue={20}
        minValue={0}
        value={this.state.values}
        onChange={this.handleValuesChange.bind(this)}
      />
    );
  }
}
