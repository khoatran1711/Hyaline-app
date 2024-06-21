import { GoogleOAuthProvider } from "@react-oauth/google";
import { Image } from "../../../asset/images/image";
import { Button } from "../../component/button/button.component";
import { GoogleButton } from "../../component/google-button/google-button.component";
import { InputText } from "../../component/input-text/input-text.component";
import { globalNavigation } from "../../../asset/navigation/navigation";
import { PagePath } from "../../../constants/page-path.constant";
import { AuthenticateService } from "../../services/authenticate.service";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ErrorText } from "../../component/error-text/error-text.component";
import { ErrorPopup } from "../../../asset/ultilities/swal.ultilities";
import FacebookLogin from "@greatsumini/react-facebook-login";

interface LoginForm {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>();
  const authenService = new AuthenticateService();

  const login = (username: string, password: string) => {
    setIsLoading(true);
    authenService.login(username, password).then((res) => {
      if (res?.isSuccess && res?.data) {
        // globalReplacePage(PagePath.Account);
      } else {
        ErrorPopup("Đăng nhập thất bại", res?.data?.message);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="w-full min-h-screen xl:h-screen bg-gradient-to-br from-black to-white flex justify-center items-center py-10">
      <div className="w-5/6 xl:w-4/5 xl:h-4/5 bg-white rounded-2xl overflow-hidden relative flex xl:flex-row flex-col">
        <div className="w-full h-60 xl:w-2/5 xl:h-full bg-black">
          <div className="p-10 xl:p-20 w-full h-full">
            <img
              src={Image.LoginPage.HyalineLogin}
              className="w-full h-full object-contain"
              alt="Hyaline"
            />
          </div>
        </div>

        <div className="px-6 xl:px-14 py-9 w-full xl:w-3/5 h-full items-center flex flex-col">
          <div className="font-semibold text-black text-3xl">ĐĂNG NHẬP</div>

          <div className="w-1/2 h-[1px] bg-black my-5"></div>

          <div className="w-full flex flex-col gap-4">
            <Controller
              control={control}
              name="username"
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <InputText
                  title="Tài khoản"
                  placeHolder="Tài khoản đăng nhập"
                  onChange={onChange}
                />
              )}
            />

            <ErrorText
              isShow={errors?.username ? true : false}
              text={"Vui lòng nhập tài khoản"}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({ field: { onChange } }) => (
                <InputText
                  title="Mật khẩu"
                  placeHolder="Mật khẩu"
                  isPassword
                  onChange={onChange}
                />
              )}
            />

            <ErrorText
              isShow={errors?.password ? true : false}
              text={"Vui lòng nhập mật khẩu"}
            />

            <div className="w-full flex flex-col xl:flex-row gap-4 justify-center items-center my-8 mt-5">
              <div className="w-60 mt-2">
                <Button
                  disable={isLoading}
                  isLoading={isLoading}
                  title="Đăng nhập"
                  className="text-center"
                  onClick={handleSubmit((data) =>
                    login(data.username, data.password)
                  )}
                />
              </div>

              <div className="w-60 mt-2">
                <Button
                  disable={isLoading}
                  title="Đăng ký"
                  className="text-center"
                  onClick={() => globalNavigation(PagePath.Signup)}
                />
              </div>
            </div>

            <div className="flex gap-5 xl:gap-2 items-center">
              <div className="flex-1 h-[1px] bg-black" />
              <div className="">Hoặc</div>
              <div className="flex-1 h-[1px] bg-black" />
            </div>

            <div className="xl:w-96 mt-8 self-center">
              <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
              >
                <GoogleButton disable={isLoading} />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
