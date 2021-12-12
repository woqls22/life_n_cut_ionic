import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "../Styles/Home.css";
import "../Styles/Album.css";
import { useEffect, useState } from "react";
import SkeletonLoading from "../components/SkeletonLoading";
import {
  arrowBack,
  checkmarkCircleOutline,
  calendarOutline,
  closeCircleOutline,
  removeCircleSharp,
} from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import AlbumStore from "../Store/AlbumStore";
import { getDDay, getYYYYMMDD } from "../Utils/Utils";
import { Album, deleteAlbum, removeFromAlbum, User } from "../Data/AlbumDO";
import { FrontURL, rootURL } from "../Utils/Constants";
import { checkWishItem, deleteWishItem, postWish, Wish } from "../Data/WishDO";
import { useObserver } from "mobx-react";
import LoginStore from "../Store/LoginStore";
import { userInfo } from "os";
export class WishItemDO {
  val: string;
  isChecked: boolean;
  id: string;
  constructor(val: string, isChecked: boolean, id: string) {
    this.val = val;
    this.isChecked = isChecked;
    this.id = id;
  }
}
const checkboxList = [
  { val: "파리여행 가기", isChecked: true, id: "1" },
  { val: "에버랜드 가기", isChecked: false, id: "2" },
  { val: "맛집 놀러가기", isChecked: false, id: "3" },
  { val: "낚시하기", isChecked: false, id: "4" },
  { val: "원데이클래스 해보기", isChecked: false, id: "5" },
  { val: "전시보러가기", isChecked: false, id: "6" },
  { val: "단풍 구경하러가기", isChecked: false, id: "7" },
];

const AlbumDetailPage: React.FC = (props: any) => {
  const [showLoading, setShowLoading] = useState(true);
  const [wishList, setWishList] = useState<WishItemDO[]>(checkboxList);
  const params = useParams<{ albumId: string }>();
  const history = useHistory();
  const [wishItem, setWishItem] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [clickedUser, setClickedUser] = useState<User | null>(null);
  const [present] = useIonAlert();

  function onScroll(e: any) {
    console.log(e);
    // setPosition(e.target.scrollTop);
    // console.log(position);
  }
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      window.location.assign("/login");
    }
    AlbumStore.clickAlbum(params.albumId).then(() => {
      AlbumStore.fetchWishList(params.albumId).then(() => {
        if (AlbumStore.ClickedAlbum) {
          setShowLoading(false);
        }
      });
    });
  }, []);
  return useObserver(() => {
    return (
      <IonPage ref={onScroll}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="secondary">
              <IonButton
                onClick={() => {
                  history.goBack();
                }}
              >
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>
              <div className="toolbar">
                {AlbumStore.ClickedAlbum ? (
                  <>{AlbumStore.ClickedAlbum!.albumName}</>
                ) : (
                  <>로딩중</>
                )}
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {showLoading || AlbumStore.ClickedAlbum == null ? (
          <>{SkeletonLoading()}</>
        ) : (
          <>
            <IonContent className="ion-padding">
              {/* <IonListHeader>
                <IonLabel>앨범이름</IonLabel>
              </IonListHeader> */}
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>앨범</IonCardSubtitle>
                  <IonCardTitle>
                    <div className="user_title">
                      <div className="user_pic">
                        <IonAvatar>
                          <img src="https://i.pinimg.com/564x/0d/8e/2f/0d8e2fd4c4e15ed96491d7f15a08ec04.jpg" />
                        </IonAvatar>
                      </div>
                      <div>{AlbumStore.ClickedAlbum!.albumName}</div>
                    </div>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="card_section">
                    <div className="card_title">앨범 생성일</div>
                    <div className="card_value">
                      {getYYYYMMDD(AlbumStore.ClickedAlbum!.createdate)}
                    </div>
                  </div>
                  <div className="card_section">
                    <div className="card_title">대표 기념일</div>
                    <div className="card_value">
                      {getDDay(
                        AlbumStore.ClickedAlbum!.anniversary!.anniversaryDate
                      )}
                      <div style={{ fontSize: "smaller" }}>
                        {getYYYYMMDD(
                          AlbumStore.ClickedAlbum!.anniversary!.anniversaryDate
                        )}
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
              <div>
                {AlbumStore.ClickedAlbum!.userMapping == null ? (
                  <></>
                ) : (
                  <>
                    <div className="frined_title">
                      <h4>앨범을 함께 공유하는 사람</h4>
                    </div>
                    <div className="freind_list">
                      {AlbumStore.ClickedAlbum!.userMapping.map(
                        (user: User) => {
                          return (
                            <>
                              {user.email != localStorage.getItem("userid") ? (
                                <>
                                  <IonChip
                                    onClick={() => {
                                      if (
                                        AlbumStore.ClickedAlbum?.ownerId ==
                                        localStorage.getItem("userid")
                                      ) {
                                        setClickedUser(user);
                                        setDeleteModal(true);
                                      }
                                    }}
                                  >
                                    <IonAvatar>
                                      <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                                    </IonAvatar>
                                    <IonLabel>{user.name}</IonLabel>
                                  </IonChip>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        }
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="bucket_list_container">
                <div className="bucketList">
                  <div
                    className="anniversary_enroll_btn"
                    style={{ alignItems: "center" }}
                  >
                    <div
                      style={{
                        marginRight: "auto",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <IonIcon
                          icon={calendarOutline}
                          style={{
                            marginRight: "1vw",
                            zoom: "1.9",
                            marginTop: 4,
                          }}
                        />
                      </div>
                      <div>
                        <h4>버킷리스트</h4>
                      </div>
                    </div>
                    <div>
                      <IonButton
                        onClick={() => setOpen(true)}
                        fill="outline"
                        size="small"
                      >
                        추가하기
                      </IonButton>
                    </div>
                  </div>
                  {/* <IonIcon
                    icon={calendarOutline}
                    style={{ marginLeft: "2vw" }}
                    onClick={() => setOpen(true)}
                  /> */}
                </div>
                <IonList>
                  {AlbumStore.WishList.map((item: Wish, i) => (
                    <>
                      <div className="wishList">
                        <IonItem key={i}>
                          <IonLabel>
                            {item.visited ? (
                              <>
                                <IonIcon
                                  icon={checkmarkCircleOutline}
                                  style={{ color: "green", marginRight: "1vw" }}
                                />
                                {item.job}
                              </>
                            ) : (
                              <>{item.job}</>
                            )}
                          </IonLabel>
                        </IonItem>
                        <IonCheckbox
                          slot="end"
                          value={item.job}
                          checked={item.visited}
                          onClick={() => {
                            checkWishItem(item.id).then(() => {
                              item.visited = !item.visited;
                              let tmp = [...wishList];
                              setWishList(tmp);
                            });
                          }}
                        />
                        <div>
                          <IonIcon
                            icon={closeCircleOutline}
                            style={{ color: "red", width: "6vw", zoom: "1.1" }}
                            onClick={() => {
                              present({
                                header: "다음 버킷리스트를 삭제합니다 ",
                                cssClass: "my-css",
                                message: item.job,
                                buttons: [
                                  {
                                    text: "확인",
                                    handler: (d) => {
                                      deleteWishItem(item.id).then(() => {
                                        window.location.assign(
                                          `album/${params.albumId}/info`
                                        );
                                      });
                                    },
                                  },
                                  "취소",
                                ],
                                onDidDismiss: (e) => {},
                              });
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </IonList>
              </div>
              {AlbumStore.ClickedAlbum?.ownerId ==
              localStorage.getItem("userid") ? (
                <>
                  <IonButton
                    onClick={() => {
                      present({
                        header: "앨범을 삭제합니다",
                        cssClass: "my-css",
                        message: "삭제된 앨범은 복구할 수 없습니다.",
                        buttons: [
                          {
                            text: "확인",
                            handler: (d) => {
                              deleteAlbum(params.albumId).then(() => {
                                window.location.assign(`${FrontURL}/album`);
                              });
                            },
                          },
                          "취소",
                        ],
                        onDidDismiss: (e) => {},
                      });
                    }}
                    expand="full"
                    color="primary"
                    style={{ marginBottom: "2vh" }}
                  >
                    앨범 삭제하기
                  </IonButton>
                </>
              ) : (
                <></>
              )}

              <IonModal isOpen={open}>
                <div className="albumModal">
                  <IonLabel position="stacked">
                    함께 하고싶은 일을 추가해주세요!
                  </IonLabel>
                  <IonItem style={{ marginBottom: "10vh", marginTop: "2vh" }}>
                    <IonInput
                      value={wishItem}
                      placeholder="ex) 해외여행 가기"
                      type="text"
                      onIonChange={(e) => setWishItem(e.detail.value!)}
                    ></IonInput>
                  </IonItem>
                  <IonButton
                    onClick={() => {
                      //버킷리스트 추가 post요청
                      postWish(
                        new Wish(
                          "",
                          wishItem,
                          false,
                          AlbumStore.ClickedAlbum!.albumName,
                          ""
                        ),
                        params.albumId
                      ).then(() => {
                        window.location.assign(`album/${params.albumId}/info`);
                      });
                    }}
                    expand="full"
                    style={{ marginBottom: "2vh" }}
                  >
                    버킷리스트에 추가하기
                  </IonButton>
                  <IonButton
                    onClick={() => handleClose()}
                    expand="full"
                    color="light"
                  >
                    닫기
                  </IonButton>
                </div>
              </IonModal>
              <IonModal isOpen={deleteModal}>
                <div className="albumModal">
                  <div>
                    {clickedUser === null ? (
                      <></>
                    ) : (
                      <>
                        <IonCard>
                          <IonCardHeader>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <IonAvatar>
                                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                              </IonAvatar>
                              <div style={{ marginLeft: "4vw" }}>
                                <IonCardTitle>{clickedUser.email}</IonCardTitle>
                              </div>
                            </div>
                          </IonCardHeader>
                          <IonCardContent>
                            <div className="card_section">
                              <div className="card_title">닉네임</div>
                              <div className="card_value">
                                {clickedUser.nickName}
                              </div>
                            </div>
                            <div className="card_section">
                              <div className="card_title">이름</div>
                              <div className="card_value">
                                {clickedUser.name}
                              </div>
                            </div>
                          </IonCardContent>
                        </IonCard>
                      </>
                    )}
                  </div>
                  <IonLabel position="stacked"></IonLabel>
                  <IonButton
                    onClick={() => {
                      //앨범강퇴 api
                      removeFromAlbum(params.albumId, clickedUser!.email).then(
                        () => {
                          AlbumStore.clickAlbum(params.albumId).then(() => {
                            AlbumStore.fetchWishList(params.albumId).then(
                              () => {
                                if (AlbumStore.ClickedAlbum) {
                                  setShowLoading(false);
                                  setDeleteModal(false);
                                }
                              }
                            );
                          });
                        }
                      );
                    }}
                    expand="full"
                    style={{ marginBottom: "2vh" }}
                  >
                    앨범에서 강퇴
                  </IonButton>
                  <IonButton
                    onClick={() => setDeleteModal(false)}
                    expand="full"
                    color="light"
                  >
                    닫기
                  </IonButton>
                </div>
              </IonModal>
            </IonContent>
          </>
        )}
      </IonPage>
    );
  });
};

export default AlbumDetailPage;
