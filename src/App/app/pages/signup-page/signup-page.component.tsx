import { GoogleOAuthProvider } from "@react-oauth/google";
import { Image } from "../../../asset/images/image";
import { Button } from "../../component/button/button.component";
import { GoogleButton } from "../../component/google-button/google-button.component";
import { InputText } from "../../component/input-text/input-text.component";
import { globalNavigation } from "../../../asset/navigation/navigation";
import { PagePath } from "../../../constants/page-path.constant";

export const SignupPage = () => {
  return (
    <div className="w-full min-h-screen xl:h-screen bg-gradient-to-br from-black to-white flex justify-center items-center py-10">
      <div className="w-5/6 xl:w-4/5 xl:h-4/5 bg-white rounded-2xl overflow-hidden relative flex xl:flex-row flex-col-reverse">
        <div className="px-6 xl:px-14 py-9 w-full xl:w-2/3 h-full items-center flex flex-col overflow-y-auto">
          <div className="font-semibold text-black text-3xl">ĐĂNG KÝ</div>

          <div className="w-1/2 h-[1px] bg-black my-5"></div>

          <div className="w-full flex flex-col gap-4">
            <InputText title="Tài khoản" placeHolder="Tài khoản đăng nhập" />
            <InputText title="Mật khẩu" placeHolder="Mật khẩu" isPassword />
            <InputText
              title="Xác nhận mật khẩu"
              placeHolder="Mật khẩu"
              isPassword
            />
            <InputText title="Email" placeHolder="Email" />
            <InputText title="Số điện thoại" placeHolder="Số điện thoại" />

            <div className="w-full flex flex-col xl:flex-row gap-4 justify-center items-center my-8">
              <div className="w-60 mt-2">
                <Button title="Tạo tài khoản" className="text-center" />
              </div>
            </div>

            <div className="flex gap-5 xl:gap-2 items-center">
              <div className="flex-1 h-[1px] bg-black" />
              <div className="">Đã có tài khoản</div>
              <div className="flex-1 h-[1px] bg-black" />
            </div>

            <div className="w-60 mt-2 self-center">
              <Button
                title="Đăng nhập ngay"
                className="text-center"
                onClick={() => globalNavigation(PagePath.Login)}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-60 xl:w-1/3 xl:h-full bg-black">
          <div className="p-10 xl:p-20 w-full h-full">
            <img
              src={Image.RegisterPage.HyalineRegister}
              className="w-full h-full object-contain"
              alt="Hyaline"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
