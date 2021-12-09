import AlbumStore from "../Store/AlbumStore";
import { Anniversary } from "../Store/LoginStore";
import { SpringAxios } from "../Utils/Utils";
import { Album } from "./AlbumDO";

export class Wish {
  constructor(
    public id: string,
    public job: string,
    public visited: boolean,
    public albumName: string,
    public albumId: string
  ) {}
}
export const getWishList = async (albumId: string) => {
  const response = await SpringAxios.get<Wish[]>(`/wish/${albumId}`);
  if (response) return response.data;
};
export const postWish = async (item: Wish, albumId: string) => {
  SpringAxios.post(`/wish/${albumId}`, item)
    .then((res: any) => {
      return res.data;
    })
    .catch(() => {
      return null;
    });
};
export const checkWishItem=async (wishId:string) => {
  SpringAxios.post(`/check/${wishId}`)
  .then((res: any) => {
    return res.data;
  })
  .catch(() => {
    return null;
  });
};
export const deleteWishItem=async (wishId:string) => {
  SpringAxios.delete(`/wish/${wishId}`)
  .then((res: any) => {
    return res.data;
  })
  .catch(() => {
    return null;
  });
};