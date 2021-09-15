import { createActions, createReducer } from 'reduxsauce';
const { Types, Creators } = createActions({
  //Overview
  getLiveData: [''],
  setLiveData: ['liveData'],
  setOverViewLoading: ['isOverViewLoading'],
  setOverViewMode: ['overViewMode'],
  //EventView
  getEventView: ['eventId'],
  setEventView: ['eventViewData'],
  setEventViewLoading: ['isEventViewLoading'],
  //Calendar
  getCalendarData: [''],
  setCalendarData: ['calendarData'],
  setCalendarLoading: ['isCalendarLoading'],
  setCalendarMode: ['calendarMode'],
  //Other
  setLiveMenuSearchBox: ['liveMenuSearchBox'],
  handleLiveSocket: ['data'],
});

export const LiveTypes = Types;
export default Creators;

const INITIAL_STATE = {
  //Overview
  liveData: {},
  isOverViewLoading: true,
  overViewMode: 1,
  //EventView
  eventViewData: {},
  isEventViewLoading: true,
  //Calendar
  calendarData: {},
  isCalendarLoading: true,
  calendarMode: Number(localStorage.getItem('calendarMode') || '1'),
  //Other
  liveMenuSearchBox: '',
};
export const reducer = createReducer(INITIAL_STATE, {
  //Loading Reducers
  SET_OVER_VIEW_LOADING: (state, { isOverViewLoading }) => ({
    ...state,
    isOverViewLoading,
  }),
  SET_EVENT_VIEW_LOADING: (state, { isEventViewLoading }) => ({
    ...state,
    isEventViewLoading,
  }),
  SET_CALENDAR_LOADING: (state, { isCalendarLoading }) => ({
    ...state,
    isCalendarLoading,
  }),
  //Data set Reducers (from Api)
  SET_LIVE_DATA: (state, { liveData }) => {
    //console.log('live data reducer', liveData);
    return {
      ...state,
      liveData,
    };
  },
  SET_EVENT_VIEW: (state, { eventViewData }) => ({
    ...state,
    eventViewData,
  }),
  SET_CALENDAR_DATA: (state, { calendarData }) => ({
    ...state,
    calendarData,
  }),
  //Live redux handlers
  SET_OVER_VIEW_MODE: (state, { overViewMode }) => ({
    ...state,
    overViewMode,
  }),
  SET_CALENDAR_MODE: (state, { calendarMode }) => ({
    ...state,
    calendarMode,
  }),
  SET_LIVE_MENU_SEARCH_BOX: (state, { liveMenuSearchBox }) => ({
    ...state,
    liveMenuSearchBox,
  }),
});
