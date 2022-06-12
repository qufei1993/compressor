import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import compressOptions from '../../config/compress-options.json';
import {
  TFileExtra,
  TUpdateCompressOptionsPayload,
} from '../../types/compress';
import { clearEmptyValue } from '../../utils';

const initialState = compressOptions;

export const compressOptionsSlice = createSlice({
  name: 'compressOptions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Reason: Incompatible types for property 'type'
    // Resolve reference: https://cache.one/read/16840458 | https://redux-toolkit.js.org/api/createSlice#customizing-generated-action-creators
    update: {
      reducer: (
        state: typeof compressOptions,
        action: PayloadAction<
          TUpdateCompressOptionsPayload,
          string,
          { type: TFileExtra }
        >
      ) => {
        const { payload } = action;

        return {
          ...state,
          [action.meta.type]: {
            ...state[action.meta.type],
            ...clearEmptyValue(payload),
          },
        };
      },

      prepare: (payload: TUpdateCompressOptionsPayload, type: TFileExtra) => ({
        payload,
        meta: {
          type,
        },
      }),
    },
  },
});

export const { update } = compressOptionsSlice.actions;

export default compressOptionsSlice.reducer;
