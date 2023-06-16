import useAuth from "../../../hooks/useAuth";

import SectionTitle from "../../../hooks/SectionTitle";

const InstructorHome = () => {
  const { user } = useAuth();

  return (
    <div className="w-full m-4">
      <SectionTitle heading={user.displayName} subHeading="Welcome" />
      <h2 className="text-3xl">Hi-------------, {user.displayName}</h2>
    </div>
  );
};

export default InstructorHome;
