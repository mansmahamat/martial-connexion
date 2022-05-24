/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import GetFighterTypes from '../../types/CreateFighterTypes';



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


const getFighter = async (id: string): Promise<GetFighterTypes> => {
  const { data } = await axios.get<GetFighterTypes>(
    `${process.env.REACT_APP_SERVER}/api/fighters/${id}`
  );

  return data;
};

export function useGetFighter(id: string) {
  return useQuery<GetFighterTypes, Error>(['getPrayers'], () => getFighter(id));
}