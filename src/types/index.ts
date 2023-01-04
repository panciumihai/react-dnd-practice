import React from 'react';

export interface BasicProps {
  className?: string;
  children?: React.ReactNode;
}

export interface XYCoord {
  x: number;
  y: number;
}

export interface CharactersType {
  info: CharactersInfoType;
  results: CharacterOverviewType[];
}

export interface CharactersInfoType {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;

  [x: string | number | symbol]: unknown;
}

export interface CharacterOverviewType {
  id: number;
  name: string;
  status: string;
  image: string;

  [x: string | number | symbol]: unknown;
}

export interface CharacterDetailsType {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: OriginType;
  location: LocationType;
  image: string;
  episode: string[];
  episodesTitles: string[];
}

export interface OriginType {
  name: string;
  url: string;
}

export interface LocationType {
  name: string;
  url: string;
}

export interface EpisodeType {
  id: number;
  name: string;
  episode: string;
  title: string;
}
