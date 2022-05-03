module.exports = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/forgot",
        destination: "/auth/forgot",
        permanent: true
      },
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true
      },
      {
        source: "/reset",
        destination: "/auth/reset",
        permanent: true
      },
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true
      },
      {
        source: "/jobsApplied",
        destination: "/candidate/jobsApplied",
        permanent: true
      },
      {
        source: "/postJob",
        destination: "/recruiter/postJob",
        permanent: true
      }
    ];
  }
};
