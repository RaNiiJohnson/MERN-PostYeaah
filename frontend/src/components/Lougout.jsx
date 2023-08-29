const handleLogout = () => {
  localStorage.removeItem("user");
  window.location = "/signin";
};

export default function Lougout() {
  return (
    <img
      onClick={handleLogout}
      className="logout"
      src="./public/img/icons/logout.svg"
      alt=""
    />
  );
}
