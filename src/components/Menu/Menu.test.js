import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Menu', () => {
  it('displays correct information in the Card', () => {
    const { getByText } = render(<Menu
                                    items={["entertainment", "local", "health", "technology", "science"]}
                                    clickHandler={jest.fn()}
                                    resetPage={jest.fn()}
                                  />);

    expect(getByText("entertainment")).toBeInTheDocument();
    expect(getByText("local")).toBeInTheDocument();
    expect(getByText("health")).toBeInTheDocument();
    expect(getByText("technology")).toBeInTheDocument();
    expect(getByText("science")).toBeInTheDocument();
  });

  it("captures clicks", done => {
    function changeTopic() {
      done();
    }
    const { getByText } = render(<Menu
                                    items={["entertainment", "local", "health", "technology", "science"]}
                                    clickHandler={changeTopic}
                                    resetPage={jest.fn()}
                                  />);

    const entertainment = getByText("entertainment");
    const local = getByText("local");
    const health = getByText("health");
    const technology = getByText("technology");
    const science = getByText("science");

    fireEvent.click(entertainment);
    fireEvent.click(local);
    fireEvent.click(health);
    fireEvent.click(technology);
    fireEvent.click(science);
  });
});
