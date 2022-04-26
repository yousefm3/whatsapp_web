const readFormData = (form) => {
  const formData = new FormData(form.target);
  const formObject = Object.fromEntries(formData.entries());

  // Get The Image File
  const avatar = [...form.target][4]?.files[0];
  return { ...formObject, avatar };
};

export default readFormData;
