function isAuth(){
  const postApi = async () => {
    const res = await fetch('http://localhost:3000/auth', {

    });
    console.log(res);
    const data = await res.json();
    return data
  };
  postApi();
}

export default isAuth