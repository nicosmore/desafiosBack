const formatUserForDB = (userObj) => {
 
  const newUser = {
    name: userObj.name,
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}