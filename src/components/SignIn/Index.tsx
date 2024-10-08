import { ChangeEvent, FC, useState } from "react";
import { loginHandler } from "../../api/apiHandlers";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import { useNavigate } from "react-router-dom";

export const SignIn: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [loginInputState, setLoginInputState] = useState({
    username: "",
    password: "",
  });

  const [userState, setUserState] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  console.log("userState :", userState);

  const submitHandler = async () => {
    setUserState({
      isLoading: true,
      data: null,
      error: null,
    });

    const res = await loginHandler(loginInputState);

    if (!res.error) {
      setLoginInputState({
        username: "",
        password: "",
      });
    }

    setUserState({
      isLoading: false,
      data: res.data,
      error: res.error,
    });

    navigate("/");
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInputState((prev) => {
      return {
        ...prev,
        [e.target?.name]: e.target?.value,
      };
    });
  };

  console.log("loginInputState :", loginInputState);

  return (
    <div className="w-full min-h-[100vh] flex justify-center items-center bg-[#272838] text-white bg-dot-black/[1] relative">
      <div className="w-[500px] p-8 bg-[#2E2F40] rounded-lg">
        <h2 className="text-center text-3xl text-[#05D397]">Sign In</h2>
        <div className="mt-4">
          {!userState.isLoading && userState.error && (
            <h2 className="text-center my-8 py-4 text-base border-[3px] border-dashed border-[#272838] rounded-md text-red-400">
              Incorrect user name or password
            </h2>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
            className="login-form"
          >
            <div className="mt-5">
              <Label htmlFor="email">User Name</Label>
              <Input
                id="username"
                placeholder="Enter User Name"
                type="text"
                name="username"
                value={loginInputState.username}
                required={true}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required={true}
                placeholder="Enter Password"
                type="password"
                name="password"
                value={loginInputState.password}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className="mt-5">
              <button
                className={`flex items-center justify-center px-4 w-full text-black ${
                  !userState.isLoading ? "hover:text-white" : "cursor-progress"
                }  rounded-md h-10 font-medium shadow-input bg-[#05D397] transition-all ease-in-out duration-500 delay-75`}
                type="submit"
                disabled={userState.isLoading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
