/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import getTeamsTypes from '../../types/getTeamsTypes';


const getTeams = async () => {
  const r = await axios.get<getTeamsTypes[]>(
    `${process.env.REACT_APP_SERVER}/teams`
  );

  return r.data;
};

export function useGetTeams() {
 // @ts-ignore
  return useQuery<getTeamsTypes, Error>(['getTeams'], () => getTeams())
}

const getTeamByID = async (id: string) : Promise<getTeamsTypes> => {
  const  {data}  = await axios.get<getTeamsTypes>(
    `${process.env.REACT_APP_SERVER}/team/${id}`
  );

  return data;
};

export function useGetTeamByID(id : string) {
 // @ts-ignore
  return useQuery<getTeamsTypes, Error>(['getTeamByID'], () => getTeamByID(id))
}