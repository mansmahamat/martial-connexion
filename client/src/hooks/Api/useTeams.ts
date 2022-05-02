/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import getTeamsTypes from '../../types/getTeamsTypes';



// //@ts-ignore
// const createFighter = async (FormData): Promise<CreateFighterTypes> => {
//   const { data } = await axios.post('http://localhost:8080/api/fighter', FormData);

//   localStorage.setItem('fighter', JSON.stringify(data.user));

//   return data;
// };

// //@ts-ignore
// export function useCreateFighter(FormData) {
//   return useMutation(() => createFighter(FormData));
// }


const getTeams = async () => {
  const r = await axios.get<getTeamsTypes[]>(
    `/teams`
  );

  return r.data;
};

export function useGetTeams() {
 // @ts-ignore
  return useQuery<getTeamsTypes, Error>(['getTeams'], () => getTeams())
}

const getTeamByID = async (id: string) : Promise<getTeamsTypes> => {
  const  {data}  = await axios.get<getTeamsTypes>(
    `/team/${id}`
  );

  return data;
};

export function useGetTeamByID(id : string) {
 // @ts-ignore
  return useQuery<getTeamsTypes, Error>(['getTeamByID'], () => getTeamByID(id))
}