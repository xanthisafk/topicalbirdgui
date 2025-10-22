const Me = () => {

  const user = JSON.parse(localStorage.getItem("topicalbird_current_user"));
  if (user == null) window.location.href = "/auth";
  
  window.location.href = `/u/${user.handle}`;

  return (
    <div>Redirecting...</div>
  )
}

export default Me