import { observable, ObservableSet } from "mobx";
export class LoginInfoDO{
    constructor(
        public id:string,
      ){}
}
interface LoginStore {
  openLoginDialog:boolean;
  isLoggedIn:boolean;
  loginInfo:LoginInfoDO;
  setLoginDialogVariable:(flag:boolean)=>void;
  setIsLoggedIn:(flag:boolean)=>void;
  setLoginInfo:(data:LoginInfoDO)=>void;
}
const LoginStore = observable<LoginStore>({
    openLoginDialog:false,
    isLoggedIn:false,
    loginInfo: new LoginInfoDO(""),
    setLoginDialogVariable(flag){
        this.openLoginDialog=flag;
    },
    setIsLoggedIn(flag){
        this.isLoggedIn=flag;
    },
    setLoginInfo(data:LoginInfoDO){
        this.loginInfo=data;
    }
});
export default LoginStore;