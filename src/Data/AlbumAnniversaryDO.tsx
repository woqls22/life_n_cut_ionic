import { IonAlert } from "@ionic/react";
import AlbumStore from "../Store/AlbumStore";
import { Anniversary } from "../Store/LoginStore";
import { rootURL } from "../Utils/Constants";
import { SpringAxios } from "../Utils/Utils";
import { ImgFile } from "./ImgFileDO";

export class AlbumAnniversary {
  constructor(
    public id: string,
    public name: string,
    public date: string
  ) {}
}
export const getAnniversaries = async (albumId:string) => {
  const response = await SpringAxios.get<AlbumAnniversary[]>(
    `anniversaries/${albumId}`
  );
  if (response) return response.data;
};
export const enrollAnniversaryToAlbum = async (item: AlbumAnniversary, albumId:string) => { 
  const response = await SpringAxios.post(`/anniversaries/${albumId}`, item);
  if(response) return response.data;
};
export const deleteAlbumAnniversary = async (anniversaryId:string)=>{
    const response = await SpringAxios.delete(`/anniversaries/${anniversaryId}`);
    if(response) return response.data;
}