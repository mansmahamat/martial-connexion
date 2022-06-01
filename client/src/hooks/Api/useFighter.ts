/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import GetFighterTypes from '../../types/CreateFighterTypes';






const getFighter = async (id: string): Promise<GetFighterTypes> => {
  const { data } = await axios.get<GetFighterTypes>(
    `https://martial-connexion.herokuapp.com/api/api/fighters/${id}`
  );

  return data;
};

export function useGetFighter(id: string) {
  return useQuery<GetFighterTypes, Error>(['getPrayers'], () => getFighter(id));
}