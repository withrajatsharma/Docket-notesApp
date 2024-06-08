import React from "react";

const SignUp = () => {

    

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Login</h4>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
