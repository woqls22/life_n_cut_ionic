import { observable, ObservableSet } from "mobx";
import { SpringAxios } from "../Utils/Utils";
export class LoginInfoDO {
  constructor(public id: string) {}
}
export class Anniversary {
  constructor(
    public anniversaryDate: string,
    public description: string,
    public relation: string
  ) {}
}
export class UserDO {
  constructor(
    public nickName: string,
    public relation: string,
    public name: string,
    public picUrl: string,
    public anniversary: Anniversary,
    public birthday: string,
    public email: string
  ) {}
}
export class Friend {
  constructor(
    public nickName: string,
    public name: string,
    public picUrl: string,
    public anniversary: Anniversary,
    public birthday: string,
    public email: string
  ) {}
}

interface LoginStore {
  openLoginDialog: boolean;
  isLoggedIn: boolean;
  loginInfo: LoginInfoDO;
  userInfo: UserDO;
  friendsList: Friend[];
  setLoginDialogVariable: (flag: boolean) => void;
  setIsLoggedIn: (flag: boolean) => void;
  setLoginInfo: (data: LoginInfoDO) => void;
  fetchUserInfo: () => Promise<void>;
}
const LoginStore = observable<LoginStore>({
  openLoginDialog: false,
  isLoggedIn: false,
  friendsList: [],
  loginInfo: new LoginInfoDO(""),
  userInfo: new UserDO("", "", "", "", new Anniversary("", "", ""), "", ""),
  setLoginDialogVariable(flag) {
    this.openLoginDialog = flag;
  },
  setIsLoggedIn(flag) {
    this.isLoggedIn = flag;
  },
  setLoginInfo(data: LoginInfoDO) {
    this.loginInfo = data;
  },
  async fetchUserInfo() {
    SpringAxios.get(`/users/${localStorage.getItem("userid")}`).then(
      (res: any) => {
        this.userInfo.relation = res.data.relation;
        this.userInfo.picUrl = res.data.picUrl;
        this.userInfo.name = res.data.name;
        this.userInfo.anniversary = res.data.anniversary;
        this.userInfo.nickName = res.data.nickname;
        this.userInfo.birthday = res.data.birthday;
        this.friendsList = res.data.friends;
      }
    );
  },
});
export default LoginStore;
