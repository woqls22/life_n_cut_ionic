import { observable, ObservableSet } from "mobx";
import { SpringAxios } from "../Utils/Utils";
export class LoginInfoDO{
    constructor(
        public id:string,
      ){}
}
export class UserDO{
    constructor(
        public nickName :string,
        public relation:string,
        public anniversaryDate:string,
        public name:string,
        public picUrl:string,
        public anniversary:string,
        public birthday:string,
    ){}
}

interface LoginStore {
  openLoginDialog:boolean;
  isLoggedIn:boolean;
  loginInfo:LoginInfoDO;
  userInfo:UserDO;
  setLoginDialogVariable:(flag:boolean)=>void;
  setIsLoggedIn:(flag:boolean)=>void;
  setLoginInfo:(data:LoginInfoDO)=>void;
  fetchUserInfo:()=>Promise<void>;
}
const LoginStore = observable<LoginStore>({
    openLoginDialog:false,
    isLoggedIn:false,
    loginInfo: new LoginInfoDO(""),
    userInfo: new UserDO("","","","","","",""),
    setLoginDialogVariable(flag){
        this.openLoginDialog=flag;
    },
    setIsLoggedIn(flag){
        this.isLoggedIn=flag;
    },
    setLoginInfo(data:LoginInfoDO){
        this.loginInfo=data;
    },
    async fetchUserInfo(){
        SpringAxios.get(`/user/${localStorage.getItem("userid")}`).then((res:any)=>{
            this.userInfo.relation=res.data.relation;
            this.userInfo.picUrl=res.data.picUrl;
            this.userInfo.name=res.data.name;
            this.userInfo.anniversary=res.data.anniversary;
            this.userInfo.anniversaryDate=res.data.anniversaryDate;
            this.userInfo.nickName=res.data.nickname;
            this.userInfo.birthday=res.data.birthday;
        })
    }
});
export default LoginStore;