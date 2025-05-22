import { convertToMD5password, sendRequest } from "@/utils/api";

// Нэвтрэх хэрэгцээтэй өгөгдөл авах функц
export const loginUser = async (email: string, password: string) => {
  const hashedPassword = convertToMD5password(password);

  const url = "http://127.0.0.1:8000/user/";
  const method = "POST";
  const body = {
    action: "login",
    uname: email,
    upassword: hashedPassword,
  };

  try {
    const response = await sendRequest(url, method, body);
    if (response.resultCode === 1002 && response.data?.length) {
      return response.data[0];
    }
    throw new Error(response.resultMessage || "Нэвтэрч чадаагүй");
  } catch (error) {
    throw new Error("Алдаа гарлаа. Холболтоо шалгана уу.");
  }
};

// Бүртгүүлэх хэрэгцээтэй өгөгдөл авах функц
export const signUpUser = async (
  email: string,
  password: string,
  fname: string,
  lname: string
) => {
  const hashedPassword = convertToMD5password(password);

  console.log("response");
  const url = "http://127.0.0.1:8000/user/";
  const method = "POST";
  const body = {
    action: "register",
    uname: email,
    upassword: hashedPassword,
    fname: fname,
    lname: lname,
  };

  try {
    const response = await sendRequest(url, method, body);
    console.log("response");
    console.log(response);
    if (response.resultCode === 200 && response.data?.length) {
      return response.data[0]; // Амжилттай бүртгэгдсэн хэрэглэгчийн мэдээллийг буцаана
    }
    throw new Error(response.resultMessage || "Бүртгэл амжилтгүй боллоо");
  } catch (error) {
    throw new Error("Алдаа гарлаа. Холболтоо шалгана уу.");
  }
};