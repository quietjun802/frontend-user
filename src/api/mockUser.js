// ⭐ 테스트용 고정 유저
const dummyUser = {
  email: "test@test.com",
  password: "1234",
  nickname: "용준",
  profileImg: "/default_profile.png"
};

export const authenticateUser = (email, password) => {
  if (email === dummyUser.email && password === dummyUser.password) {
    return {
      success: true,
      user: {
        email: dummyUser.email,
        nickname: dummyUser.nickname,
        profileImg: dummyUser.profileImg
      },
      token: "mock-token-123",
    };
  }

  return {
    success: false,
    message: "이메일 또는 비밀번호가 올바르지 않습니다.",
  };
};
