const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-1/2 my-8">
      <p className="text-red-400 text-3xl mb-2">
        ---------- {subHeading} ----------
      </p>
      <div className="divider"></div>
      <h3 className="text-3xl uppercase py-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
