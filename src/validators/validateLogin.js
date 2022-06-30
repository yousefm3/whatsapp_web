const validateLogin = (enteredCredintals, users) => {
  console.log(users);
  if (!users?.find((user)=>user.username===enteredCredintals.username&&user.password===enteredCredintals.password)) {
    return {
      isValid: false,
      type: "danger",
      msg: "Username or password is incorrect",
    };
  } else {
    return {
      isValid: true,
      type: "success",
      msg: "Logged In successfully",
      loggedUser: users?.find((user)=>user.username===enteredCredintals.username&&user.password===enteredCredintals.password)
    };
  }
};
export default validateLogin;
