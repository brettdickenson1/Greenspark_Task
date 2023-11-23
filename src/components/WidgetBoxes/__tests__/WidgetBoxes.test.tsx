import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import reducer, {
  activateBadge,
  activateLinked,
} from "../../../store/features/widgetSlice";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import WidgetBoxes from "../WidgetBoxes";
import { setupStore } from "../../../store/store";
import { Provider } from "react-redux";

const store = setupStore();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// SOME REDUX STATE TESTS
test("renders expected title", () => {
  render(
    <Provider store={store}>
      <WidgetBoxes />
    </Provider>
  );
  const titleElement = screen.getByTestId("widgetBox");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent("Per product widgets");
});

// apps inital state before updates
const testInitalState = {
  loading: false,
  widgetData: [],
  boxColors: [
    {
      colorID: 1,
      color: "#2E3A8C",
      setFocus: false,
    },
    {
      colorID: 2,
      color: "#3B755F",
      setFocus: false,
    },
    {
      colorID: 3,
      color: "#F2EBDB",
      setFocus: false,
    },
    {
      colorID: 4,
      color: "white",
      setFocus: false,
    },
    {
      colorID: 5,
      color: "black",
      setFocus: false,
    },
  ],
};

const fetchedData = {
  loading: false,
  widgetData: [
    {
      id: 1,
      type: "plastic bottles",
      amount: 100,
      action: "collects",
      active: true,
      linked: true,
      selectedColor: "green",
    },
    {
      id: 2,
      type: "trees",
      amount: 10,
      action: "plants",
      active: false,
      linked: false,
      selectedColor: "black",
    },
    {
      id: 3,
      type: "carbon",
      amount: 20,
      action: "offsets",
      active: false,
      linked: false,
      selectedColor: "blue",
    },
  ],
  boxColors: [
    {
      colorID: 1,
      color: "#2E3A8C",
      setFocus: false,
    },
    {
      colorID: 2,
      color: "#3B755F",
      setFocus: false,
    },
    {
      colorID: 3,
      color: "#F2EBDB",
      setFocus: false,
    },
    {
      colorID: 4,
      color: "white",
      setFocus: false,
    },
    {
      colorID: 5,
      color: "black",
      setFocus: false,
    },
  ],
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(testInitalState);
});

describe("State Redux Tests", () => {
  it("onClick passes id of 'Linked to Public Profile' input & sets boolean === !boolean", () => {
    const initialState = fetchedData;
    const store = mockStore(initialState);
    store.dispatch(activateLinked({ id: 1 }));

    const actions = store.getActions();
    const expectedActions = [
      { type: "widget/activateLinked", payload: { id: 1 } },
    ];

    expect(actions).toEqual(expectedActions);
  });

  it("onClick passes id of 'Activate badge' input & sets boolean === !boolean", () => {
    const initialState = fetchedData;
    const store = mockStore(initialState);
    store.dispatch(activateBadge({ id: 1 }));

    const actions = store.getActions();
    const expectedActions = [
      { type: "widget/activateBadge", payload: { id: 1 } },
    ];

    expect(actions).toEqual(expectedActions);
  });
});
