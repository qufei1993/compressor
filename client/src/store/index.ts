import { configureStore } from '@reduxjs/toolkit';
import compressSlice from './features/compress.slice';
import compressOptionsSlice from './features/compress-options.slice';
import themeSlice from './features/theme.slice';

export const store = configureStore({
  reducer: {
    compress: compressSlice,
    compressOptions: compressOptionsSlice,
    theme: themeSlice,
  },

  // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { chunk: ChunkState }
export type AppDispatch = typeof store.dispatch;
