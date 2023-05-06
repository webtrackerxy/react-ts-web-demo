import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import "../../setupTests";
import Dashboard from "../Dashboard";

describe("Dashboard component", () => {
  const mockStore = configureStore();
  const initialState = { data: { data: null, currentItem: 0 } };
  const store = mockStore(initialState);

  const data = [
    {
      title: "Data Item 1",
      attributes: [
        { name: "Attribute 1", value: "1", unit: "m" },
        { name: "Attribute 2", value: "2", unit: "s" },
        { name: "Attribute 3", value: "3", unit: "kg" },
      ],
    },
    {
      title: "Data Item 2",
      attributes: [
        { name: "Attribute 1", value: "4", unit: "m" },
        { name: "Attribute 2", value: "5", unit: "s" },
        { name: "Attribute 3", value: "6", unit: "kg" },
      ],
    },
  ];

  const mockSetData = jest.fn();
  const mockSetCurrentItem = jest.fn();
  const mockUpdateValue = jest.fn();

  const props = {
    data,
    currentItem: 0,
    setData: mockSetData,
    setCurrentItem: mockSetCurrentItem,
    updateValue: mockUpdateValue,
  };

  it("renders correctly", () => {
    const props = {
      data: [{ title: "Test Title", attributes: [] }],
      currentItem: 0,
      setData: jest.fn(),
      setCurrentItem: jest.fn(),
      updateValue: jest.fn(),
    };
    const wrapper = shallow(<Dashboard {...props} store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});
