import { Anniversary } from "../Store/LoginStore";
import { SpringAxios } from "../Utils/Utils";

export class User{
    constructor(
        public id:string,
        public picUrl:string,
        public birthday:string,
        public anniversary:Anniversary,
        public nickName:string,
        public name:string,
        public email:string,
    ){}
}
export class Album{
    constructor(
        public id:string,
        public albumName:string,
        public createdAt:string,
        public createdBy:string,
        public description:string,
        public lastModifiedAt:string,
        public lastModifiedBy:string,
        public userMapping : User[]
    ){}
}
export const getAlbumList = async () => {
    const response = await SpringAxios.get<Album[]>(
      `albums/${localStorage.getItem("userid")}`
    );
    if (response) return response.data;
  };
