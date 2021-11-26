import { observable, ObservableSet } from "mobx";
import { Album, getAlbumList, getAlbumWithId } from "../Data/AlbumDO";
import { getImgsByPaging, ImgFile } from "../Data/ImgFileDO";
import { AlbumDO } from "../pages/MyPage";
import { SpringAxios } from "../Utils/Utils";
// id: string;
// albumName: string;
// createdate: string;
// description: string;
// authorIdList: string[];
interface AlbumStore {
  AlbumList: Album[];
  ClickedAlbum: Album | null;
  ImgFileList: ImgFile[];
  fetchAlbumList: () => Promise<void>;
  fetchImgsByPaging: (albumId: string, page: number) => Promise<void>;
  clickAlbum: (albumId: string) => Promise<void>;
}
const AlbumStore = observable<AlbumStore>({
  AlbumList: [],
  ClickedAlbum: null,
  ImgFileList: [],
  async fetchAlbumList() {
    const albumList = await getAlbumList();
    if (albumList) this.AlbumList = albumList;
    console.log(this.AlbumList);
    if (!albumList) {
      //못받아온 경우
    }
  },
  async clickAlbum(albumId: string) {
    const target = await getAlbumWithId(albumId);
    if (target) this.ClickedAlbum = target;
    if (!target) {
    }
  },
  async fetchImgsByPaging(albumId: string, page: number) {
    const imgs = await getImgsByPaging(page, albumId);
    if (imgs) {
      this.ImgFileList = this.ImgFileList.concat(imgs);
      this.ImgFileList=[...this.ImgFileList].reverse();
    }
    console.log(this.AlbumList);
    if (!imgs) {
      //못받아온 경우
    }
  },
});
export default AlbumStore;
