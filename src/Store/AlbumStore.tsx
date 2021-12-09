import { observable, ObservableSet } from "mobx";
import { Album, getAlbumList, getAlbumWithId } from "../Data/AlbumDO";
import { getImgsByPaging, ImgFile } from "../Data/ImgFileDO";
import { getWishList, Wish } from "../Data/WishDO";
import { AlbumDO } from "../pages/MyPage";
import { SpringAxios } from "../Utils/Utils";
import _ from "lodash";
// id: string;
// albumName: string;
// createdate: string;
// description: string;
// authorIdList: string[];
interface AlbumStore {
  AlbumList: Album[];
  ClickedAlbum: Album | null;
  ImgFileList: ImgFile[];
  WishList:Wish[];
  fetchAlbumList: () => Promise<void>;
  fetchImgsByPaging: (albumId: string, page: number) => Promise<void>;
  fetchWishList:(albumId:string)=>Promise<void>;
  clickAlbum: (albumId: string) => Promise<void>;
  initialize:()=>void;
}
const AlbumStore = observable<AlbumStore>({
  AlbumList: [],
  ClickedAlbum: null,
  ImgFileList: [],
  WishList:[],
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
    console.log(target);
    if (target) {
        this.ClickedAlbum = target;
    }
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
  async fetchWishList(albumId){
      const List = await getWishList(albumId);
      if(List){
          let items = [...List];
          this.WishList=_.sortBy(items,'visited').reverse();
      }
  },
  initialize(){
      this.ClickedAlbum=null;
      this.ImgFileList=[];
      this.WishList=[];
  }
});
export default AlbumStore;
