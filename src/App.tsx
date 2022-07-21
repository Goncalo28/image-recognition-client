import { ChangeEvent, useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ReactParticles from "./components/ReactParticles/ReactParticles";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

export interface IFaceBox {
  leftCol: number;
  topRow: number;
  rightCol: number;
  bottomRow: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  entries: number;
  joined: string;
}

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState<IFaceBox | null>(null);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data: IUser) => {
    setUser(data);
  };

  const calculateFaceLocation = (predictionData: any) => {
    const faceDetected =
      predictionData.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image") as HTMLImageElement;
    const width = Number(image?.width);
    const height = Number(image?.height);

    return {
      leftCol: faceDetected.left_col * width,
      topRow: faceDetected.top_row * height,
      rightCol: width - faceDetected.right_col * width,
      bottomRow: height - faceDetected.bottom_row * height,
    };
  };

  const displayFaceBox = (faceBox: IFaceBox) => {
    setBox(faceBox);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = async () => {
    setImageUrl(input);
    try {
      const resp = await fetch(
        "https://serene-lake-49194.herokuapp.com/image-url",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: input,
          }),
        }
      );

      const respJson = await resp.json();

      if (respJson) {
        const imageRes = await fetch(
          "https://serene-lake-49194.herokuapp.com/image",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          }
        );
        const count = await imageRes.json();
        setUser({ ...user, entries: count });
      }

      displayFaceBox(calculateFaceLocation(respJson));
    } catch (error) {
      console.log("ERR", error);
    }
  };

  const onRouteChange = (route: string) => {
    if (route === "signout") {
      setImageUrl("");
      setBox(null);
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
      setRoute("signin");
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ReactParticles />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          {imageUrl.length > 0 && <FaceRecognition box={box} src={imageUrl} />}
        </>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
