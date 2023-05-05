import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { DataItem } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import '../styles/Dashboard.scss';
import '../styles/Custom-tooltip.scss';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface Props {
  data: DataItem[] | null;
  currentItem: number;
  setData: (data: DataItem[]) => void;
  setCurrentItem: (currentItem: number) => void;
}

interface State {
  editingAttribute: string | null;
  attributeValues: { [key: string]: string };
}

class Dashboard extends Component<Props, State> {
  state: State = {
    editingAttribute: null,
    attributeValues: {},
  };

  componentDidMount() {
    fetch(`/data/data.json`)
      .then(response => response.json())
      .then(data => {console.log("data", data); this.props.setData(data)});
  }

  toggleInput(attributeName: string) {
    this.setState({ editingAttribute: attributeName });
  }

  updateValue(attributeName: string, value: string) {
    this.setState(prevState => ({
      attributeValues: { ...prevState.attributeValues, [attributeName]: value },
    }));
  }

  // for edit cell
  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter' && this.props.data) {
      const updatedData = [...this.props.data];
      updatedData[this.props.currentItem].attributes[index].value = parseFloat(this.state.updatedValue);
      this.props.setData(updatedData);
      //reset the cell value
      // this.setState({ editingCell: null, updatedValue: '' });
    }
  };

  render() {
    const { data, currentItem, setCurrentItem } = this.props;
    const chartData = data ? data[currentItem].attributes : [];

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const { value } = payload[0];

        return (
          <div className="custom-tooltip">
            <p>{`Name: ${label}`}</p>
            <p>{`Value: ${value}`}</p>
            <p>{`Unit: ${payload[0].payload.unit}`}</p>
          </div>
        );
      }
    
      return null;
    };

    // Create a modified chart data with updated attribute values
    const modifiedChartData = chartData.map(attribute => ({
      ...attribute,
      value: this.state.attributeValues[attribute.name] || attribute.value,
    }));
    
    return (
      <div className="dashboard">
        <div className={'dashboard-title'}>{data && data[currentItem].title}</div>
        <div className="dashboard-content">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data[currentItem].attributes.map(attribute => (
                  <tr key={attribute.name}>
                    <td>{attribute.name}</td>
                    <td onClick={() => this.toggleInput(attribute.name)}>
                      {this.state.editingAttribute === attribute.name ? (
                        <input
                          type="text"
                          defaultValue={attribute.value}
                          onBlur={() => this.toggleInput('')}
                          onChange={(e) => this.updateValue(attribute.name, e.target.value)}
                        />
                      ) : (
                        this.state.attributeValues[attribute.name] || attribute.value
                      )}
                    </td>
                    <td>{attribute.unit}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <BarChart
            width={500}
            height={300}
            data={modifiedChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#888400" />
          </BarChart>
        </div>
        <input
          type="range"
          min="0"
          max={data ? data.length - 1 : 0}
          value={currentItem}
          onChange={e => setCurrentItem(parseInt(e.target.value))}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
data: state.data.data,
currentItem: state.data.currentItem,
});

const mapDispatchToProps = (dispatch: any) => ({
setData: (data: DataItem[]) => dispatch({ type: 'SET_DATA', data }),
setCurrentItem: (currentItem: number) => dispatch({ type: 'SET_CURRENT_ITEM', currentItem }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);                 
