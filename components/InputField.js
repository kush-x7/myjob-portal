import clsx from "clsx";
import { ErrorMessage } from "formik";

const InputField = ({ label, applyStar, name, type, errors, ...props }) => {
  return (
    <>
      <label className="text-sm font-light">{label}</label>
      {applyStar && <span className="text-red-500">*</span>}

      <div className="mb-[20px]">
        <input
          autoComplete="off"
          className={clsx(
            " mt-2 block w-full rounded-lg border-[1px] border-solid bg-[#E8E8E833] py-2 px-4 text-xs font-light sm:text-sm md:py-[14px]  md:px-[17px] ",
            {
              "border-red-500": errors
            }
          )}
          name={name}
          type={type}
          onPaste={(e) => {
            if (type === "password") {
              e.preventDefault();
            }
          }}
          {...props}
        />
        <div className=" absolute right-0 mt-2 text-xs text-red-500">
          <ErrorMessage name={name} />
        </div>
      </div>
    </>
  );
};

InputField.defaultProps = {
  label: "",
  applyStar: false,
  name: "",
  type: "text"
};

export default InputField;
