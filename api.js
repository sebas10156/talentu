export const getPeople = async () => {
  if (getStorage()) {
    return JSON.parse(getStorage());
  }

  const response = await fetch("https://reqres.in/api/users?page=1")
  const result = await response.json();
  setStorage(result.data)
  return result.data
}

// Storage
function setStorage(data) {
  localStorage.setItem("talentu:people", JSON.stringify(data))
}

function getStorage() {
  return localStorage.getItem("talentu:people")
}