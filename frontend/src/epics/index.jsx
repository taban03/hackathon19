import { combineEpics } from 'redux-observable';
import { fetchTilesPollingEpic, fetchUpdatedTilesPollingEpic} from './fetch-tiles';

// eslint-disable-next-line import/prefer-default-export
export const rootEpic = combineEpics(fetchTilesPollingEpic, fetchUpdatedTilesPollingEpic);
