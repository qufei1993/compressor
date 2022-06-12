import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '..';
import { FileStage } from '../../constants/compress';
import { deleteFilesApi } from '../../services';
import { TCompress, TFile, TFileExtra } from '../../types/compress';

const fileInitialState = {
  jpg: false,
  png: false,
  gif: false,
  webp: false,
};
const initialState: TCompress = {
  fileList: [],
  compression: { ...fileInitialState },
  isCompressCompleted: { ...fileInitialState },
};

export const compressSlice = createSlice({
  name: 'compress',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addFile: (state: TCompress, action: PayloadAction<TFile>) => {
      state.fileList.push(action.payload);
    },

    removeFile: (
      state: TCompress,
      action: PayloadAction<string | string[]>
    ) => {
      const uids =
        typeof action.payload === 'string' ? [action.payload] : action.payload;
      const newFileList = state.fileList.filter(
        (file) => !uids.includes(file.uid)
      );
      state.fileList = newFileList;
    },

    removeFilesByFilename: (
      state: TCompress,
      action: PayloadAction<string[]>
    ) => {
      state.fileList = state.fileList.filter(
        (file) => !action.payload.includes(file.compressFileName || '')
      );
    },

    updateFilePercent: (
      state: TCompress,
      action: PayloadAction<Pick<TFile, 'uid' | 'percent'> & { index: number }>
    ) => {
      const file = state.fileList.find(({ uid }) => uid === action.payload.uid);
      if (file) {
        if (file.chunkPercent === undefined) {
          file.chunkPercent = {};
        }
        file.chunkPercent[action.payload.index] = action.payload.percent;
      }
    },

    updatePartialChunkFilePercent: (
      state: TCompress,
      action: PayloadAction<
        Pick<TFile, 'uid'> & { partialChunkIndexs: number[] }
      >
    ) => {
      const file = state.fileList.find(({ uid }) => uid === action.payload.uid);
      if (file) {
        const { partialChunkIndexs } = action.payload;
        partialChunkIndexs.forEach((index) => {
          file.chunkPercent[index] = 100;
        });
      }
    },

    updateFile: (
      state: TCompress,
      action: PayloadAction<{
        uid: string;
        data: Partial<TFile>;
      }>
    ) => {
      state.fileList = state.fileList.map((file) => {
        if (file.uid === action.payload.uid) {
          return {
            ...file,
            ...action.payload.data,
          };
        }

        return file;
      });

      return state;
    },

    updateCompressStatus: (
      state: TCompress,
      action: PayloadAction<{
        uid: string;
        compressFileExtraType: TFileExtra;
        data: Partial<TFile>;
      }>
    ) => {
      const { compressFileExtraType } = action.payload;
      let completeCount = 0;
      state.fileList = state.fileList.map((file) => {
        if (file.compressFileExtraType !== compressFileExtraType) {
          return file;
        }

        let newFile = { ...file };
        if (file.uid === action.payload.uid) {
          newFile = {
            ...file,
            ...action.payload.data,
          };
        }

        if (
          newFile.stage === FileStage.Done ||
          newFile.stage === FileStage.Error
        ) {
          completeCount += 1;
        }

        return newFile;
      });

      if (
        completeCount ===
        state.fileList.filter(
          (file) => file.compressFileExtraType === compressFileExtraType
        ).length
      ) {
        state.compression[compressFileExtraType] = false;
        state.isCompressCompleted[compressFileExtraType] = true;
      }

      return state;
    },

    updateCompression: (
      state: TCompress,
      action: PayloadAction<{
        compressFileExtraType: TFileExtra;
        compression: boolean;
      }>
    ) => ({
      ...state,
      compression: {
        ...state.compression,
        [action.payload.compressFileExtraType]: action.payload.compression,
      },
    }),
  },
});

export const {
  addFile,
  removeFile,
  removeFilesByFilename,
  updateCompression,
  updateFile,
  updateFilePercent,
  updatePartialChunkFilePercent,
  updateCompressStatus,
} = compressSlice.actions;

export const deleteFiles = (fileList: TFile[]) => (dispatch: AppDispatch) => {
  const compressDoneList: string[] = [];
  const otherList: string[] = [];

  fileList.forEach((file) => {
    if (file.stage === FileStage.Done && file.compressFileName) {
      compressDoneList.push(file.compressFileName);
    } else if (file.uid) {
      otherList.push(file.uid);
    }
  });

  if (otherList.length) {
    dispatch(removeFile(otherList));
  }

  return deleteFilesApi(compressDoneList).then(() =>
    dispatch(removeFilesByFilename(compressDoneList))
  );
};

export default compressSlice.reducer;
