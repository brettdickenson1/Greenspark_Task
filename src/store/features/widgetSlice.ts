import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WidgetData, WidgetState } from "../../types/globalTypes";
import axios from "axios";

const initialState: WidgetState = {
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

export const fetchWidgetData = createAsyncThunk(
  "widgetData/fetch",
  async () => {
    try {
      const url = String(process.env.REACT_APP_API_KEY);
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
);

export const WidgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    updateWidget: (
      state,
      action: PayloadAction<{
        id: number;
        selectedColor: string;
        colorID: number;
      }>
    ) => {
      const index = action.payload.id;
      const colorIndex = action.payload.colorID;
      return {
        ...state,
        widgetData: state.widgetData.map((content, i) =>
          index === content.id
            ? {
                ...content,
                selectedColor: action.payload.selectedColor,
                boxColors: state.boxColors.map((item) =>
                  colorIndex === item.colorID
                    ? { ...item, setFocus: true }
                    : { ...item, setFocus: false }
                ),
              }
            : index !== content.id
            ? {
                ...content,
                active: false,
                linked: false,
                setFocus: false,
                boxColors: [],
              }
            : content
        ),
      };
    },
    updateWidgetState: (state) => {
      return {
        ...state,
        widgetData: state.widgetData.map((content, i) =>
          content.selectedColor === "green"
            ? {
                ...content,
                selectedColor: "#2E3A8C",
                active: false,
                linked: false,
              }
            : content.selectedColor === "black"
            ? {
                ...content,
                selectedColor: "#3B755F",
                active: false,
                linked: false,
              }
            : content.selectedColor === "blue"
            ? {
                ...content,
                selectedColor: "#F2EBDB",
                active: false,
                linked: false,
                amount: 100,
              }
            : content
        ),
      };
    },
    activateLinked: (state, action: PayloadAction<{ id: number }>) => {
      return {
        ...state,
        widgetData: state.widgetData.map((content, i) =>
          action.payload.id === content.id
            ? { ...content, linked: !content.linked }
            : action.payload.id !== content.id
            ? { ...content, linked: false, active: false, boxColors: [] }
            : content
        ),
      };
    },
    activateBadge: (state, action: PayloadAction<{ id: number }>) => {
      return {
        ...state,
        widgetData: state.widgetData.map((content, i) =>
          action.payload.id === content.id
            ? { ...content, active: !content.active }
            : action.payload.id !== content.id
            ? { ...content, active: false, linked: false, boxColors: [] }
            : content
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWidgetData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWidgetData.fulfilled,
      (state, action: PayloadAction<WidgetData[]>) => {
        state.loading = false;
        state.widgetData = action.payload;
      }
    );
    builder.addCase(fetchWidgetData.rejected, (state, action) => {
      state.loading = false;
      state.widgetData = [];
    });
  },
});

export default WidgetSlice.reducer;
export const {
  updateWidget,
  activateBadge,
  activateLinked,
  updateWidgetState,
} = WidgetSlice.actions;
export * from "../../types/globalTypes";
