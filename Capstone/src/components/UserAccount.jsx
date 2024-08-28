import { useGetUserQuery } from "../api/index.js";

function UserAccount({ token }) {
  const { data={}, error, isLoading, isSuccess } = useGetUserQuery(token);

  console.log(data);
  let message;

  if (isLoading) {
    message = "Loading your account details...";
  }

  if (error) {
    message = "Failed to load your account details. Please try again.";
  }

  return (
    <section id="user-account-page">
      <div id="account-intro-container">
        <h2 id="account-intro-title">My Account</h2>
      </div>
      <div id="account-details-container" key={data.id}>
        <p>{data.username}</p>
        <p>{data.first_name}</p>
        <p>{data.last_name}</p>
        <p>{data.email}</p>
      </div>
    </section>
  );
}

export default UserAccount;
