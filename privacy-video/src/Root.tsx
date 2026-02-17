import { Composition } from "remotion";
import { PrivacyVideo } from "./PrivacyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PrivacyExplainer"
        component={PrivacyVideo}
        durationInFrames={6240} // 3:28 at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
