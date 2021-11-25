import AlbumStore from "../Store/AlbumStore";
import { Anniversary } from "../Store/LoginStore";
import { SpringAxios } from "../Utils/Utils";

export class ImgFile {
  constructor(
    public fileId: string,
    public filename: string,
    public date: string,
    public description: string,
    public albumId: string
  ) {}
}
export const getImgsByPaging = async (page: number, albumId: string) => {
  const response = await SpringAxios.get<ImgFile[]>(`/imgs/${albumId}/${page}`);
  if (response) return response.data;
};

export const uploadImg = async (
  file: File,
  date: string,
  albumId: string,
  description: string
) => {
  const formData = new FormData();
  formData.append("albumId", albumId);
  formData.append("file", file);
  formData.append("date", date);
  formData.append("description", description);
  formData.append("fileName", file.name);
  SpringAxios.post(`/img/${albumId}`, formData)
    .then((res: any) => {
        AlbumStore.ImgFileList=[];
        AlbumStore.fetchImgsByPaging(albumId,0);
    })
    .catch(() => {});
};
