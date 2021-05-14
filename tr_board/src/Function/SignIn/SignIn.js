const users = [
  { email: "kim@test.com", password: "123", name: "Kim" },
  { email: "lee@test.com", password: "456", name: "Lee" },
  { email: "park@test.com", password: "789", name: "Park" },
];

export function signIn({ userID, userPW }) {
  const user = users.find(
    (user) => user.email === userID && user.password === userPW
  );
  if (user === undefined) throw new Error();

  console.log("[SignIn.js] user : ", user);

  return user;
}
