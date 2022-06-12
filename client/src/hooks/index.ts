import { useLocation } from 'react-router-dom';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppDispatch, RootState } from '../store';
import { TThemeName } from '../types';
import { Theme } from '../constants';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQuery = () => {
  const query: {
    [x: string]: string;
  } = {};
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  params.forEach((val, key) => {
    query[key] = val;
  });

  return query;
};

export const useSystemTheme = () => {
  const [name, setName] = useState<TThemeName>(Theme.Light);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setName(Theme.Dark);
    } else {
      setName(Theme.Light);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event: MediaQueryListEvent) => {
        if (event.matches) {
          setName(Theme.Dark);
        } else {
          setName(Theme.Light);
        }
      });
  }, []);

  return {
    name,
    isDarkMode: name === Theme.Dark,
    isLightMode: name === Theme.Light,
  };
};

export const useDocumentTitle = (title: string) => {
  const { t } = useTranslation();
  const previousTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = `${title} - ${t('title')}`;
  }, [title]);

  useEffect(
    () => () => {
      document.title = previousTitle;
    },
    [previousTitle]
  );
};
