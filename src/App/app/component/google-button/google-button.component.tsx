import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { AuthenticateService } from "../../services/authenticate.service";
import { Button } from "../button/button.component";
import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
  disable?: boolean;
}

export const GoogleButton = (props?: GoogleButtonProps) => {
  const authenService = new AuthenticateService();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => authenService.googleLogin(codeResponse),
    flow: "auth-code",
  });

  return (
    <div className="h-40">
      <Button
        disable={props?.disable}
        title={
          <div
            className="flex gap-2 justify-center items-center"
            onClick={() => login()}
          >
            <div>
              <FcGoogle />
            </div>
            Đăng nhập bằng Google
          </div>
        }
        className="text-center"
      />
    </div>
  );
};
