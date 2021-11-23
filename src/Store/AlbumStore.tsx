import { observable, ObservableSet } from "mobx";
import { Album, getAlbumList } from "../Data/AlbumDO";
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
  fetchAlbumList: () => Promise<void>;
}
const AlbumStore = observable<AlbumStore>({
  AlbumList: [],
  ClickedAlbum: null,
  async fetchAlbumList() {
    const albumList = await getAlbumList();
    if (albumList) this.AlbumList = albumList;
    console.log(this.AlbumList);
    if (!albumList) {
      //못받아온 경우
    }
  },
});
export default AlbumStore;
