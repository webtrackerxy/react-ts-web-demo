import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { DataItem } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import "../styles/Dashboard.scss";
import "../styles/Custom-tooltip.scss";

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

class Dashboard extends Component<Props> {
  // for edit cell
  state = {
    editingCell: null,
    updatedValue: "",
  };

  componentDidMount() {
    fetch(`/data/data.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        this.props.setData(data);
      });

    // Add event listener to handle clicks outside the input box
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    // Remove event listener on component unmount
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // Create a ref for the input element
  inputRef = React.createRef<HTMLInputElement>();

  // Function to handle clicks outside the input box
  handleClickOutside = (event: MouseEvent) => {
    if (
      this.inputRef.current &&
      !this.inputRef.current.contains(event.target as Node)
    ) {
      this.setState({ editingCell: null, updatedValue: "" });
    }
  };

  // for edit cell
  onCellClick = (index: number) => {
    if (this.props.data && this.props.data[this.props.currentItem]) {
      this.setState({
        editingCell: index,
        updatedValue:
          this.props.data[this.props.currentItem].attributes[index].value,
      });
    }
  };

  // for edit cell
  onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    this.setState({ updatedValue: event.target.value });
  };

  // for edit cell
  updateValue(index: number, value: string) {
    this.setState({ updatedValue: value });
    if (this.props.data) {
      const updatedData = [...this.props.data];
      updatedData[this.props.currentItem].attributes[index].value = parseFloat(
        this.state.updatedValue
      );
      this.props.setData(updatedData);
    }
  }

  // for edit cell
  handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Enter" && this.props.data) {
      const updatedData = [...this.props.data];
      updatedData[this.props.currentItem].attributes[index].value = parseFloat(
        this.state.updatedValue
      );
      this.props.setData(updatedData);
      //reset the cell value
      this.setState({ editingCell: null, updatedValue: "" });
    }
  };

  render() {
    const { data, currentItem, setCurrentItem } = this.props;
    const chartData = data ? data[currentItem].attributes : [];

    const CustomTooltip: React.FC<CustomTooltipProps> = ({
      active,
      payload,
      label,
    }) => {
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

    return (
      <div className="dashboard">
        <div className={"dashboard-title"}>
          {data && data[currentItem].title}
        </div>
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
                data[currentItem].attributes.map((attribute, index) => (
                  <tr key={attribute.name}>
                    <td>{attribute.name}</td>
                    <td onClick={() => this.onCellClick(index)}>
                      {this.state.editingCell === index ? (
                        <input
                          ref={this.inputRef} // Assign the ref to the input element
                          type="text"
                          value={this.state.updatedValue}
                          onChange={(e) =>
                            this.updateValue(index, e.target.value)
                          }
                          onKeyPress={(event) =>
                            this.handleKeyPress(event, index)
                          }
                        />
                      ) : (
                        attribute.value
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
            data={chartData}
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
          onChange={(e) => setCurrentItem(parseInt(e.target.value))}
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
  setData: (data: DataItem[]) => dispatch({ type: "SET_DATA", data }),
  setCurrentItem: (currentItem: number) =>
    dispatch({ type: "SET_CURRENT_ITEM", currentItem }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
