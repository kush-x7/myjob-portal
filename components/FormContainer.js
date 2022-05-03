const FormContainer = ({ children, formTitle }) => {
  return (
    <div className="mx-auto mt-24 mb-8 w-10/12 rounded-2xl bg-white p-8 drop-shadow-2xl md:w-[557px] ">
      <h2 className=" mb-[23px] text-lg md:text-[22px]">{formTitle}</h2>
      {children}
    </div>
  );
};

FormContainer.defaultProps = {
  children: <></>,
  formTitle: ""
};

export default FormContainer;
