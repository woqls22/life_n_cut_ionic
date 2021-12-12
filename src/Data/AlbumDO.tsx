import { IonAlert } from "@ionic/react";
import AlbumStore from "../Store/AlbumStore";
import { Anniversary } from "../Store/LoginStore";
import { rootURL } from "../Utils/Constants";
import { SpringAxios } from "../Utils/Utils";
import { ImgFile } from "./ImgFileDO";

export class User {
  constructor(
    public id: string,
    public picUrl: string,
    public birthday: string,
    public anniversary: Anniversary,
    public nickName: string,
    public name: string,
    public email: string
  ) {}
}
export class Album {
  constructor(
    public id: string,
    public albumName: string,
    public createdate: string,
    public createdBy: string,
    public description: string,
    public lastModifiedAt: string,
    public lastModifiedBy: string,
    public userMapping: User[],
    public anniversary: Anniversary | null,
    public ownerId: string
  ) {}
}
export const getAlbumList = async () => {
  const response = await SpringAxios.get<Album[]>(
    `albums/${localStorage.getItem("userid")}`
  );
  if (response) return response.data;
};
export const enrollAlbum = async (item: Album) => {
  SpringAxios.post(`/albums/${localStorage.getItem("userid")}`, item)
    .then((res: any) => {
      if (res) AlbumStore.fetchAlbumList();
    })
    .catch(() => {
      return null;
    });
};
export const deletePhoto = async (photoId: string) => {
  SpringAxios.delete(`/imgs/${photoId}`)
    .then((res: any) => {
      if (res) {
        let imgList: ImgFile[] = [];
        AlbumStore.ImgFileList.map((item: ImgFile) => {
          if (item.fileId != photoId) {
            imgList.push(item);
          }
        });
        AlbumStore.ImgFileList = [...imgList];
      }
    })
    .catch(() => {
      return null;
    });
};
export const inviteMember = async (albumId: string, memberId: string) => {
  SpringAxios.post(`/invite/${albumId}/${memberId}`).then((res: any) => {
    if (res) AlbumStore.fetchAlbumList();
  });
};
export const deleteAlbum = async (albumId: string) => {
  SpringAxios.delete(`/albums/${albumId}`)
    .then((res: any) => {
      if (res) {
        AlbumStore.fetchAlbumList();
        window.location.assign(`${rootURL}/album`);
      }
    })
    .catch(() => {
      return null;
    });
};
export const getAlbumWithId = async (albumId: string) => {
  const response = await SpringAxios.get<Album>(`albums/info/${albumId}`);
  if (response) return response.data;
};
export const removeFromAlbum = async (albumId: string, email: string) => {
  const response = await SpringAxios.delete(`blackusers/${email}/${albumId}`);
  if (response) return response.data;
};
