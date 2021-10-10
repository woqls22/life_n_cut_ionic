import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import WelcomePage from "./pages/WelcomePage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { images, airplane, person } from "ionicons/icons";
import PlacePage from "./pages/PlacePage";
import MyPage from "./pages/MyPage";
import SignUpPage from "./pages/SignUpPage";
import AlbumPage from "./pages/AlbumPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          
          <Route exact path="/welcome">
            <WelcomePage />
          </Route>
          <Route exact path="/">
            <Redirect to="/welcome" />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/album">
            <MainPage />
          </Route>
          <Route exact path="/album/:albumId" component={AlbumPage}/>
          <Route exact path="/album/:albumId/info" component={AlbumDetailPage}/>
          <Route exact path="/place">
            <PlacePage />
          </Route>
          <Route exact path="/my">
            <MyPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage/>
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="album" href={"/album"}>
            <IonIcon icon={images} />
            <IonLabel>ALBUM</IonLabel>
          </IonTabButton>
          <IonTabButton tab="place" href={"/place"}>
            <IonIcon icon={airplane} />
            <IonLabel>PLACE</IonLabel>
          </IonTabButton>
          <IonTabButton tab="my" href={"/my"}>
            <IonIcon icon={person} />
            <IonLabel>MY</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
