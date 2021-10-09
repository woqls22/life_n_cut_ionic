import { observable, ObservableSet } from "mobx";
export class LoginInfoDO{
    constructor(
        public id:string,
      ){}
}
interface LoginStore {
  openLoginDialog:boolean;
  isLoggedIn:boolean;
  
}
const LoginStore = observable<LoginStore>({
    openLoginDialog:false,
    isLoggedIn:false,
   
});
export default LoginStore;