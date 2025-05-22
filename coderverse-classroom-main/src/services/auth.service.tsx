// src/services/auth.service.ts
import { convertToMD5password } from "@/utils/api";
import { sendRequest } from "@/utils/api";

export const loginUser = async (email: string, password: string) => {
  const hashedPassword = convertToMD5password(password);
  const body = {
    action: "login",
    uname: email,
    upassword: hashedPassword,
  };

  const response = await sendRequest("http://localhost:8000/user/", "POST", body);

  if (response.resultCode === 1002 && response.data?.length) {
    return response.data[0]; // userData
  }

  throw new Error(response.resultMessage || "Нэвтрэх амжилтгүй боллоо");
};
